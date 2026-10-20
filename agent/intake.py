"""Milestone 2D: Conversational Pantry Intake Agent.

A sub-agent that onboards a NEW pantry by interviewing its coordinator in plain language
("What kind of cold storage do you have?" -> "Can you take a pallet off a truck, or does it
need hand-carry boxes through a regular door?") and turning the answers into the same
structured row every other recipient carries:

1. `build_pantry_profile`: Parses the coordinator's own words into `cold_storage`,
   `frozen_storage`, `loading_dock`, `max_pallets`, `pickup_window_hours`, and
   `refrigerated_transport`, returns the follow-up questions for anything ambiguous, and
   synthesizes a `profile_text` that cannot contradict those flags (it is run through the
   same contradiction detector the matcher uses).
2. `register_pantry`: After the coordinator confirms, appends the pantry to
   `a4i_food.recipients`, embeds it into `recipient_embeddings` with `AI.EMBED` (offline:
   appends to `data/intake_recipients.json`, which the fallback corpus reads), then runs a
   probe search to prove the pantry is immediately searchable.

Parsing is deterministic on purpose: the LLM conducts the interview and passes the
coordinator's answers through verbatim, but the decision "a household fridge is
`domestic`, not `walk-in`" lives here where it can be tested, not in a prompt.
"""

from __future__ import annotations

import json
import os
import re
from typing import Any

from .tools import (
    DEFAULT_DATASET,
    DEFAULT_DONOR_LAT,
    DEFAULT_DONOR_LON,
    EMBED_ENDPOINT,
    INTAKE_REGISTRY_PATH,
    _build_local_fallback_corpus,
    _detect_profile_contradiction,
    _fetch_candidates,
    _get_bq_client,
    _haversine_km,
)

DEFAULT_STATE = os.environ.get("METRO_STATE", "IL")
DEFAULT_WEEKLY_HOUSEHOLDS = 100

# Ordered weakest -> strongest; when an answer mentions several, the strongest wins.
COLD_STORAGE_LEVELS = ("none", "vehicle", "domestic", "commercial", "walk-in", "medical")

_COLD_STORAGE_KEYWORDS: dict[str, re.Pattern[str]] = {
    "medical": re.compile(r"medical|pharma|vaccine|clinical|lab(oratory)?[- ]grade"),
    "walk-in": re.compile(r"walk[- ]?in|cold room|cooler room|refrigerated (warehouse|room)"),
    "commercial": re.compile(
        r"commercial|reach[- ]?in|restaurant|glass[- ]door|display (fridge|cooler)|\bcoolers?\b"
    ),
    "domestic": re.compile(r"fridge|refrigerator|household|domestic|kitchen|\bhome\b"),
    "vehicle": re.compile(r"refrigerated (van|truck|vehicle)|reefer"),
}

_NEGATION = re.compile(r"\b(no|not|none|never|without|lack|nothing)\b|n't\b")
_CLAUSE_SPLIT = re.compile(r"[,.;!?]|\bbut\b|\bjust\b|\bonly\b|\bexcept\b|\band\b")
_YES = re.compile(r"^\s*(yes|yeah|yep|yup|sure|we do|we can|we have|absolutely|of course|correct|true)\b")
_NO = re.compile(r"^\s*(no|nope|nah|we don't|we do not|we can't|we cannot|not really|none|false)\b")

_NUMBER_WORDS = {
    "a": 1, "an": 1, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6,
    "seven": 7, "eight": 8, "nine": 9, "ten": 10, "eleven": 11, "twelve": 12,
    "a couple of": 2, "a couple": 2, "couple of": 2, "a few": 3, "few": 3, "half a": 0.5,
    "half an": 0.5,
}
_NUMBER_PATTERN = (
    r"(?<![a-z\d])(\d+(?:\.\d+)?|(?:"
    + "|".join(sorted((re.escape(w) for w in _NUMBER_WORDS), key=len, reverse=True))
    + r")(?![a-z]))"
)
_NUMBER_RE = re.compile(_NUMBER_PATTERN)
_DURATION_RE = re.compile(_NUMBER_PATTERN + r"\s*(hours?|hrs?|h\b|days?|weeks?|minutes?|mins?)")
_PALLET_COUNT_RE = re.compile(_NUMBER_PATTERN + r"\s+(?:[a-z-]+\s+)?pallets?")
_HOUR_PHRASES: list[tuple[re.Pattern[str], int]] = [
    (re.compile(r"within the hour|right away|immediately|straight away|asap"), 1),
    (re.compile(r"same[- ]day|same afternoon|by (tonight|this evening|end of day)|that day"), 8),
    (re.compile(r"next[- ]day|tomorrow|overnight"), 24),
    (re.compile(r"(this|next|within a) week"), 168),
]

# The two questions the roadmap calls out, plus the rest of the schema, in interview order.
FOLLOW_UP_QUESTIONS: dict[str, str] = {
    "name": "What's the name of your pantry?",
    "street": "What's the street address where food is dropped off?",
    "city": "Which city is that in?",
    "zip_code": "And the ZIP code?",
    "cold_storage": (
        "What kind of cold storage do you have - a household fridge, a commercial reach-in, "
        "a walk-in cooler, or no refrigeration at all?"
    ),
    "frozen_storage": "Do you have any freezer space?",
    "loading_dock": (
        "Can you take a pallet off a truck, or does it need hand-carry boxes through a "
        "regular door?"
    ),
    "max_pallets": "How many pallets could you hold at once?",
    "pickup_window_hours": (
        "If a donor calls with food that expires today, how many hours would you need to "
        "collect it or have it received?"
    ),
    "refrigerated_transport": (
        "Do you have your own refrigerated van or truck, or would perishables need a "
        "volunteer driver or delivery?"
    ),
}

_VAN_NOT_REFRIGERATED_FOLLOW_UP = (
    "Is that vehicle refrigerated, or would cold food sit at room temperature on the way?"
)


# ---------------------------------------------------------------------------
# Answer parsing: the coordinator's words -> schema values (None = ask again)
# ---------------------------------------------------------------------------
def _clauses(answer: str) -> list[tuple[str, bool]]:
    """Split an answer into (clause, negated) pairs so "no walk-in, just a fridge" reads right."""
    return [
        (c.strip(), bool(_NEGATION.search(c)))
        for c in _CLAUSE_SPLIT.split(answer.lower())
        if c.strip()
    ]


def _parse_yes_no(answer: str) -> bool | None:
    text = (answer or "").strip().lower()
    if not text:
        return None
    if _NO.search(text):
        return False
    if _YES.search(text):
        return True
    return None


def _parse_number(text: str) -> float | None:
    match = _NUMBER_RE.search(text.lower())
    if not match:
        return None
    token = match.group(1)
    return float(token) if token[0].isdigit() else float(_NUMBER_WORDS[token])


def _parse_pallet_count(text: str) -> float | None:
    """Prefer "4 pallets" over the first number in the sentence ("a dock ... 4 pallets")."""
    match = _PALLET_COUNT_RE.search((text or "").lower())
    if match:
        return _parse_number(match.group(1))
    return None


def _classify_cold_storage(answer: str) -> str | None:
    """Map a free-text cold-storage answer to the corpus vocabulary, or None if unclear."""
    text = (answer or "").strip().lower()
    if not text:
        return None
    if re.search(r"dry (storage|goods) only|shelf[- ]stable only", text):
        return "none"

    found: set[str] = set()
    negated_cold = False
    for clause, negated in _clauses(text):
        for level, pattern in _COLD_STORAGE_KEYWORDS.items():
            if pattern.search(clause):
                if negated:
                    negated_cold = True
                else:
                    found.add(level)
        if negated and re.search(r"refrigerat|cold|chill|cool|fridge", clause):
            negated_cold = True

    # A refrigerated van counts as cold storage only when nothing on site does (mobile pantry).
    if found - {"vehicle"}:
        found.discard("vehicle")
    if found:
        return max(found, key=COLD_STORAGE_LEVELS.index)
    if negated_cold or _parse_yes_no(text) is False:
        return "none"
    return None


def _mentions_freezer(answer: str) -> bool | None:
    for clause, negated in _clauses(answer or ""):
        if "freez" in clause:
            return not negated
    return None


def _parse_pallet_handling(answer: str) -> bool | None:
    """True = can receive a pallet (dock, forklift, pallet jack); False = hand-carry only."""
    text = (answer or "").strip().lower()
    if not text:
        return None
    if re.search(r"hand[- ]?carr|by hand|regular door|front door|side door|carry (it|them|boxes)|boxes only", text):
        return False
    for clause, negated in _clauses(text):
        if re.search(r"dock|forklift|pallet jack|lift ?gate|liftgate|pallet", clause):
            return not negated
    return _parse_yes_no(text)


def _parse_hours(answer: str) -> int | None:
    text = (answer or "").strip().lower()
    if not text:
        return None
    unit = _DURATION_RE.search(text)
    if unit:
        qty = _parse_number(unit.group(1)) or 1.0
        scale = {"d": 24, "w": 168, "m": 1 / 60}.get(unit.group(2)[0], 1)
        return max(1, round(qty * scale))
    for pattern, hours in _HOUR_PHRASES:
        if pattern.search(text):
            return hours
    number = _parse_number(text)
    return max(1, round(number)) if number else None


def _parse_transport(answer: str) -> tuple[bool | None, str | None]:
    """Return (refrigerated_transport, follow_up) - a plain "van" earns a follow-up, not a True."""
    text = (answer or "").strip().lower()
    if not text:
        return None, None
    for clause, negated in _clauses(text):
        if re.search(r"refrigerated|reefer|chilled|cold (van|truck)", clause) and re.search(
            r"van|truck|vehicle|reefer|transport", clause
        ):
            return (not negated), None
    if re.search(r"volunteer|driver|deliver|personal (car|vehicle)|\bcars?\b|we can't|cannot collect", text):
        return False, None
    if re.search(r"\b(van|truck|vehicle)\b", text) and _parse_yes_no(text) is not False:
        return None, _VAN_NOT_REFRIGERATED_FOLLOW_UP
    return _parse_yes_no(text), None


# ---------------------------------------------------------------------------
# Profile synthesis
# ---------------------------------------------------------------------------
_STORAGE_SENTENCES = {
    "none": "We have no refrigeration of any kind - dry storage only.",
    "vehicle": "Our only cold storage is the refrigerated vehicle itself; nothing chilled on site.",
    "domestic": "Cold storage is household refrigeration only, so perishables have to move fast.",
    "commercial": "We have commercial reach-in refrigeration on site.",
    "walk-in": "We have a walk-in cooler on site for fresh produce, dairy, and other perishables.",
    "medical": "We have medical-grade temperature-controlled refrigeration for sensitive goods.",
}


def _synthesize_profile_text(record: dict[str, Any], food_needs: str) -> str:
    """Write profile_text in the corpus voice, derived only from the structured flags."""
    parts = [
        f"Community food pantry serving about {record['weekly_households']} households a week "
        f"({record['populations_served']})."
    ]
    parts.append(_STORAGE_SENTENCES[record["cold_storage"]])
    parts.append("We also have freezer space for frozen protein." if record["frozen_storage"] else "No freezer.")
    if record["loading_dock"]:
        parts.append(
            f"We can take pallets off a truck at our loading dock, up to {record['max_pallets']} at a time."
        )
    else:
        parts.append(
            "No loading dock - deliveries are hand-carried in boxes through a regular door, "
            "so we cannot take pallets."
        )
    if record["refrigerated_transport"]:
        parts.append("We run our own refrigerated van and can collect perishables ourselves.")
    else:
        parts.append(
            "We have no refrigerated vehicle; perishables must be delivered or collected by a "
            "volunteer driver."
        )
    parts.append(
        f"We can collect or receive a donation within {record['pickup_window_hours']} hours of a call. "
        f"Open {record['service_days']}."
    )
    if food_needs.strip():
        parts.append(f"What we need most: {food_needs.strip().rstrip('.')}.")
    return " ".join(parts)


def _nearest_tract_context(lat: float, lon: float) -> dict[str, Any]:
    """Borrow the census-tract signals of the nearest corpus organization (offline only)."""
    corpus = [r for r in _build_local_fallback_corpus() if r.get("poverty_rate") is not None]
    if not corpus:
        return {}
    nearest = min(corpus, key=lambda r: _haversine_km(lat, lon, float(r["latitude"]), float(r["longitude"])))
    return {"poverty_rate": nearest.get("poverty_rate"), "no_vehicle_rate": nearest.get("no_vehicle_rate")}


def _offline_coordinates(zip_code: str) -> tuple[float, float, str]:
    for r in _build_local_fallback_corpus():
        if str(r.get("zip_code") or "") == zip_code:
            return float(r["latitude"]), float(r["longitude"]), f"centroid of known ZIP {zip_code}"
    return DEFAULT_DONOR_LAT, DEFAULT_DONOR_LON, "metro centre (ZIP not in offline corpus)"


# ---------------------------------------------------------------------------
# Tool 1: build_pantry_profile
# ---------------------------------------------------------------------------
def build_pantry_profile(
    name: str = "",
    street: str = "",
    city: str = "",
    zip_code: str = "",
    cold_storage_answer: str = "",
    pallet_handling_answer: str = "",
    pickup_window_answer: str = "",
    transport_answer: str = "",
    freezer_answer: str = "",
    max_pallets_answer: str = "",
    state: str = "",
    weekly_households: int = 0,
    populations_served: str = "",
    service_days: str = "",
    food_needs: str = "",
) -> dict[str, Any]:
    """Turn a pantry coordinator's interview answers into a structured recipient profile.

    Pass the coordinator's answers in their own words - do not pre-classify them. Call this
    after every answer; it reports which fields are still missing or ambiguous and the exact
    follow-up question to ask next. Nothing is written to the database.

    Args:
        name: Pantry name.
        street: Street address where food is dropped off.
        city: City.
        zip_code: 5-digit ZIP code.
        cold_storage_answer: Answer to "What kind of cold storage do you have?".
        pallet_handling_answer: Answer to "Can you take a pallet off a truck, or does it need
            hand-carry boxes through a regular door?".
        pickup_window_answer: How quickly they can collect or receive a donation.
        transport_answer: Whether they have their own refrigerated van or need a driver.
        freezer_answer: Whether they have freezer space (optional if already mentioned).
        max_pallets_answer: How many pallets they can hold (only asked if they take pallets).
        state: Two-letter state code (defaults to the metro's state).
        weekly_households: Households served per week, if mentioned.
        populations_served: Who they serve, if mentioned (e.g. "Seniors 60+").
        service_days: Days they are open, if mentioned.
        food_needs: What food they need most, in their words.

    Returns:
        dict with `status` ("complete" or "needs_follow_up"), the structured `record`,
        the synthesized `profile_text`, `follow_up_questions` (ask the first one next),
        and `interpretation` explaining how each answer was read.
    """
    missing: dict[str, str] = {}
    interpretation: dict[str, str] = {}

    identity = {"name": name, "street": street, "city": city, "zip_code": zip_code}
    for field, value in identity.items():
        if not str(value or "").strip():
            missing[field] = FOLLOW_UP_QUESTIONS[field]
    zip5 = re.sub(r"\D", "", str(zip_code or ""))[:5]
    if zip_code and len(zip5) != 5:
        missing["zip_code"] = "That ZIP didn't look like 5 digits - could you repeat it?"

    cold = _classify_cold_storage(cold_storage_answer)
    if cold is None:
        missing["cold_storage"] = FOLLOW_UP_QUESTIONS["cold_storage"]
    else:
        interpretation["cold_storage"] = f"{cold_storage_answer!r} -> cold_storage='{cold}'"

    dock = _parse_pallet_handling(pallet_handling_answer)
    max_pallets: int | None = None
    if dock is None:
        missing["loading_dock"] = FOLLOW_UP_QUESTIONS["loading_dock"]
    else:
        interpretation["loading_dock"] = f"{pallet_handling_answer!r} -> loading_dock={dock}"
        stated = None
        if max_pallets_answer:
            stated = _parse_pallet_count(max_pallets_answer)
            if stated is None:
                stated = _parse_number(max_pallets_answer)
        if stated is None and dock:
            stated = _parse_pallet_count(pallet_handling_answer)
        if dock and stated is None:
            missing["max_pallets"] = FOLLOW_UP_QUESTIONS["max_pallets"]
        else:
            # Hand-carry only means max_pallets=0: the matcher blocks pallet-scale loads.
            max_pallets = int(stated) if stated is not None else 0
            interpretation["max_pallets"] = (
                f"max_pallets={max_pallets}" + ("" if dock else " (hand-carry only)")
            )

    window = _parse_hours(pickup_window_answer)
    if window is None:
        missing["pickup_window_hours"] = FOLLOW_UP_QUESTIONS["pickup_window_hours"]
    else:
        interpretation["pickup_window_hours"] = f"{pickup_window_answer!r} -> {window}h"

    frozen = _parse_yes_no(freezer_answer) if freezer_answer else None
    if frozen is None:
        frozen = _mentions_freezer(freezer_answer) if freezer_answer else _mentions_freezer(cold_storage_answer)
    if frozen is None:
        if cold == "none":
            frozen = False
        else:
            missing["frozen_storage"] = FOLLOW_UP_QUESTIONS["frozen_storage"]
    if frozen is not None:
        interpretation["frozen_storage"] = f"frozen_storage={frozen}"

    reefer, transport_follow_up = _parse_transport(transport_answer)
    if reefer is None:
        missing["refrigerated_transport"] = transport_follow_up or FOLLOW_UP_QUESTIONS["refrigerated_transport"]
    else:
        interpretation["refrigerated_transport"] = f"{transport_answer!r} -> refrigerated_transport={reefer}"

    record: dict[str, Any] = {
        "name": str(name or "").strip(),
        "street": str(street or "").strip().upper(),
        "city": str(city or "").strip().upper(),
        "state": (state or DEFAULT_STATE).strip().upper()[:2],
        "zip_code": zip5,
        "archetype": "intake",
        "archetype_label": "Registered via conversational intake",
        "cold_storage": cold,
        "frozen_storage": frozen,
        "loading_dock": dock,
        "refrigerated_transport": reefer,
        "max_pallets": max_pallets,
        "pickup_window_hours": window,
        "weekly_households": int(weekly_households or DEFAULT_WEEKLY_HOUSEHOLDS),
        "reported_income": 0.0,
        "populations_served": (populations_served or "General public").strip(),
        "service_days": (service_days or "by appointment - call ahead").strip(),
        "profile_source": "intake",
    }

    if missing:
        return {
            "status": "needs_follow_up",
            "record": record,
            "profile_text": None,
            "follow_up_questions": list(missing.values()),
            "missing_fields": list(missing.keys()),
            "interpretation": interpretation,
        }

    record["profile_text"] = _synthesize_profile_text(record, food_needs)
    contradiction = _detect_profile_contradiction(record)
    return {
        "status": "complete" if contradiction is None else "needs_follow_up",
        "record": record,
        "profile_text": record["profile_text"],
        "follow_up_questions": [] if contradiction is None else [
            f"Something doesn't add up ({contradiction}) - could you describe your storage again?"
        ],
        "missing_fields": [] if contradiction is None else ["cold_storage"],
        "interpretation": interpretation,
    }


# ---------------------------------------------------------------------------
# Tool 2: register_pantry
# ---------------------------------------------------------------------------
_LEGACY_TO_STANDARD_SQL = {"INTEGER": "INT64", "FLOAT": "FLOAT64", "BOOLEAN": "BOOL"}


def _bq_param(bigquery: Any, name: str, field_type: str, value: Any) -> Any:
    # Table schemas report legacy names (BOOLEAN); query parameters only accept standard ones.
    field_type = _LEGACY_TO_STANDARD_SQL.get(field_type, field_type)
    if value is not None:
        if field_type in ("INTEGER", "INT64"):
            value = int(value)
        elif field_type in ("FLOAT", "FLOAT64", "NUMERIC", "BIGNUMERIC"):
            value = float(value)
        elif field_type in ("BOOLEAN", "BOOL"):
            value = bool(value)
        else:
            value = str(value)
    return bigquery.ScalarQueryParameter(name, field_type, value)


def _register_in_bigquery(client: Any, record: dict[str, Any]) -> dict[str, Any]:
    """INSERT into recipients, then AI.EMBED that one row into recipient_embeddings.

    Column lists come from each table's live schema, so this survives teams that loaded
    `recipients` with extra columns (e.g. `ntee_code`) or dropped ones.
    """
    from google.cloud import bigquery  # type: ignore

    ds = f"{client.project}.{DEFAULT_DATASET}"
    recipients_schema = {f.name: f.field_type for f in client.get_table(f"{ds}.recipients").schema}
    embeddings_cols = [f.name for f in client.get_table(f"{ds}.recipient_embeddings").schema]

    dup = client.query(
        f"SELECT recipient_id FROM `{ds}.recipients` "
        "WHERE LOWER(name) = LOWER(@name) AND zip_code = @zip LIMIT 1",
        job_config=bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("name", "STRING", record["name"]),
                _bq_param(bigquery, "zip", recipients_schema.get("zip_code", "STRING"), record["zip_code"]),
            ]
        ),
    ).result(timeout=30)
    existing = [dict(r) for r in dup]
    if existing:
        return {"status": "already_registered", "recipient_id": existing[0]["recipient_id"]}

    insert_cols = [c for c in record if c in recipients_schema and c != "recipient_id"]
    params = [_bq_param(bigquery, c, recipients_schema[c], record[c]) for c in insert_cols]
    # Some teams' `recipients` also carries an `embedding` column; the fresh vector replaces it.
    shared_cols = [c for c in embeddings_cols if c in recipients_schema and c != "embedding"]

    script = f"""
    DECLARE new_id INT64 DEFAULT (SELECT IFNULL(MAX(recipient_id), 0) + 1 FROM `{ds}.recipients`);
    INSERT INTO `{ds}.recipients` (recipient_id, {", ".join(insert_cols)})
    VALUES (new_id, {", ".join("@" + c for c in insert_cols)});
    INSERT INTO `{ds}.recipient_embeddings` ({", ".join(shared_cols)}, embedding)
    SELECT {", ".join(shared_cols)}, embedded.result
    FROM (
      SELECT r.*, AI.EMBED(r.profile_text, endpoint => '{EMBED_ENDPOINT}') AS embedded
      FROM `{ds}.recipients` r
      WHERE r.recipient_id = new_id
    )
    WHERE embedded.status = '';
    SELECT
      new_id AS recipient_id,
      (SELECT COUNT(*) FROM `{ds}.recipient_embeddings` WHERE recipient_id = new_id) AS embedded_rows,
      (SELECT ANY_VALUE(latitude) FROM `{ds}.recipients` WHERE recipient_id = new_id) AS latitude,
      (SELECT ANY_VALUE(longitude) FROM `{ds}.recipients` WHERE recipient_id = new_id) AS longitude;
    """
    row = dict(next(iter(client.query(
        script, job_config=bigquery.QueryJobConfig(query_parameters=params)
    ).result(timeout=90))))
    return {
        "status": "registered" if row["embedded_rows"] else "registered_without_embedding",
        "recipient_id": int(row["recipient_id"]),
        "embedded_rows": int(row["embedded_rows"]),
    }


def _bq_zip_centroid(client: Any, zip_code: str) -> tuple[float, float] | None:
    from google.cloud import bigquery  # type: ignore

    rows = list(client.query(
        "SELECT internal_point_lat AS lat, internal_point_lon AS lon "
        "FROM `bigquery-public-data.geo_us_boundaries.zip_codes` WHERE zip_code = @zip LIMIT 1",
        job_config=bigquery.QueryJobConfig(
            query_parameters=[bigquery.ScalarQueryParameter("zip", "STRING", zip_code)]
        ),
    ).result(timeout=30))
    return (float(rows[0]["lat"]), float(rows[0]["lon"])) if rows else None


def _register_offline(record: dict[str, Any]) -> dict[str, Any]:
    corpus = _build_local_fallback_corpus()
    for r in corpus:
        if str(r.get("name", "")).lower() == record["name"].lower() and str(r.get("zip_code")) == record["zip_code"]:
            return {"status": "already_registered", "recipient_id": r["recipient_id"]}

    record["recipient_id"] = max(int(r.get("recipient_id") or 0) for r in corpus) + 1
    record.update(_nearest_tract_context(record["latitude"], record["longitude"]))

    registry: list[dict[str, Any]] = []
    if INTAKE_REGISTRY_PATH.exists():
        try:
            registry = json.loads(INTAKE_REGISTRY_PATH.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            registry = []
    registry.append(record)
    INTAKE_REGISTRY_PATH.parent.mkdir(parents=True, exist_ok=True)
    INTAKE_REGISTRY_PATH.write_text(json.dumps(registry, indent=2), encoding="utf-8")
    return {"status": "registered", "recipient_id": record["recipient_id"], "embedded_rows": 1}


def _probe_posting(record: dict[str, Any], food_needs: str) -> str:
    """A surplus offer this pantry should plausibly win, used to prove it is searchable."""
    if food_needs.strip():
        return food_needs.strip()
    if record["cold_storage"] in ("walk-in", "commercial", "medical"):
        return "fresh produce and dairy that needs refrigeration, pickup today"
    if record["cold_storage"] == "domestic":
        return "a few boxes of fresh vegetables and milk, small quantity"
    return "shelf-stable canned goods, rice and pasta"


def register_pantry(
    name: str = "",
    street: str = "",
    city: str = "",
    zip_code: str = "",
    cold_storage_answer: str = "",
    pallet_handling_answer: str = "",
    pickup_window_answer: str = "",
    transport_answer: str = "",
    freezer_answer: str = "",
    max_pallets_answer: str = "",
    state: str = "",
    weekly_households: int = 0,
    populations_served: str = "",
    service_days: str = "",
    food_needs: str = "",
    confirmed: bool = False,
) -> dict[str, Any]:
    """Add a new pantry to the recipient corpus and embed it so it is searchable immediately.

    Takes exactly the same answers as `build_pantry_profile`. Only call with
    `confirmed=True` after reading the profile back to the coordinator and hearing them
    agree; with `confirmed=False` it returns the preview and writes nothing.

    Writes to BigQuery (`a4i_food.recipients` + `AI.EMBED` into `recipient_embeddings`) when
    a project is configured; otherwise to the local intake registry the offline matcher reads.
    Then runs a probe `find`-style search to confirm the new pantry shows up.

    Returns:
        dict with `status`, `recipient_id`, `storage` (where it was written), the final
        `record`, and `searchable_check` showing the pantry's semantic rank for a probe offer.
    """
    profile = build_pantry_profile(
        name=name, street=street, city=city, zip_code=zip_code,
        cold_storage_answer=cold_storage_answer, pallet_handling_answer=pallet_handling_answer,
        pickup_window_answer=pickup_window_answer, transport_answer=transport_answer,
        freezer_answer=freezer_answer, max_pallets_answer=max_pallets_answer, state=state,
        weekly_households=weekly_households, populations_served=populations_served,
        service_days=service_days, food_needs=food_needs,
    )
    if profile["status"] != "complete":
        return {**profile, "status": "needs_follow_up", "written": False}
    if not confirmed:
        return {
            **profile,
            "status": "awaiting_confirmation",
            "written": False,
            "next_step": "Read the profile back to the coordinator; call again with confirmed=True once they agree.",
        }

    record = dict(profile["record"])
    client = _get_bq_client()
    if client is not None:
        try:
            centroid = _bq_zip_centroid(client, record["zip_code"])
            record["latitude"], record["longitude"] = centroid or (DEFAULT_DONOR_LAT, DEFAULT_DONOR_LON)
            location_note = f"ZIP {record['zip_code']} centroid" if centroid else "metro centre (ZIP not found)"
            result = _register_in_bigquery(client, record)
            storage = f"bigquery:{client.project}.{DEFAULT_DATASET}.recipients"
        except Exception as exc:
            # Do not fall back to the local registry here: the live matcher searches BigQuery,
            # so a local write would claim "searchable" for a pantry the demo cannot find.
            return {
                "status": "error",
                "written": False,
                "error": f"BigQuery registration failed: {exc}",
                "record": record,
            }
    else:
        record["latitude"], record["longitude"], location_note = _offline_coordinates(record["zip_code"])
        result = _register_offline(record)
        storage = f"local_registry:{INTAKE_REGISTRY_PATH.name}"

    probe = _probe_posting(record, food_needs)
    candidates, source = _fetch_candidates(probe, record["latitude"], record["longitude"], top_k=20)
    hit = next((c for c in candidates if int(c.get("recipient_id") or -1) == int(result["recipient_id"])), None)

    return {
        "status": result["status"],
        "written": result["status"] != "already_registered",
        "recipient_id": result["recipient_id"],
        "storage": storage,
        "location_basis": location_note,
        "embedding": (
            f"AI.EMBED(endpoint='{EMBED_ENDPOINT}') -> recipient_embeddings ({result.get('embedded_rows', 0)} row)"
            if storage.startswith("bigquery") else "offline concept-similarity fallback (no vector stored)"
        ),
        "record": record,
        "searchable_check": {
            "probe_posting": probe,
            "search_source": source,
            "found": hit is not None,
            "semantic_rank": hit.get("semantic_rank") if hit else None,
            "semantic_score": hit.get("semantic_score") if hit else None,
            "of_candidates": len(candidates),
        },
    }


# ---------------------------------------------------------------------------
# ADK sub-agent
# ---------------------------------------------------------------------------
INTAKE_INSTRUCTION = """You are the **Pantry Intake Agent** for the Resilient Food Equity & Surplus Broker.
A new pantry coordinator wants to start receiving rescued food. Your job is a short, warm
conversation that ends with their pantry in the recipient corpus and searchable.

## How to interview
- Ask ONE question at a time, in plain language. Never show field names like `cold_storage`.
- Start with their pantry name and drop-off address (street, city, ZIP).
- Then ask, in this order:
  1. "What kind of cold storage do you have?"
  2. "Can you take a pallet off a truck, or does it need hand-carry boxes through a regular door?"
  3. How quickly they could collect or receive a donation that expires today.
  4. Whether they have their own refrigerated van, or need a volunteer driver / delivery.
  5. Optionally: households per week, who they serve, open days, and what food they need most.
- After EVERY answer, call `build_pantry_profile` with all answers so far, passing the
  coordinator's words verbatim (don't translate "a fridge in the church kitchen" into
  "domestic" yourself). Ask the first item in `follow_up_questions` next.

## Confirm before writing
- When `build_pantry_profile` returns `status = "complete"`, read the profile back in plain
  words (storage, pallets vs. hand-carry, pickup timing, transport) and ask if it's right.
- Only after they say yes, call `register_pantry` with the same answers and `confirmed=True`.
- Report the result honestly: where it was written (`storage`), and from `searchable_check`
  whether the probe search found them and at what rank. If `status` is "error" or
  "registered_without_embedding", say so plainly - do not claim they are searchable.
- If `status` is "already_registered", tell them they're already in the system.

## Be honest about what the profile does
Explain that hard limits matter: a pantry with no refrigeration will never be sent
perishables even if they ask for greens, and hand-carry-only pantries won't be offered
pallet loads. That protects them from food they can't store.

When the pantry is registered (or the coordinator wants to do something else, like post
surplus), transfer back to `food_equity_surplus_broker`.
"""

try:
    from google.adk.agents import Agent

    intake_agent = Agent(
        name="pantry_intake_agent",
        model=os.environ.get("ADK_MODEL", "gemini-3.8-flash"),
        description=(
            "Onboards a NEW pantry or food bank: interviews its coordinator about cold storage, "
            "pallet handling, pickup timing, and transport, then adds it to the recipient corpus "
            "with an AI.EMBED embedding so it is immediately searchable."
        ),
        instruction=INTAKE_INSTRUCTION,
        tools=[build_pantry_profile, register_pantry],
    )
except ImportError:
    intake_agent = None


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Pantry intake - scripted demo interview")
    parser.add_argument("--register", action="store_true", help="Actually write the demo pantry")
    args = parser.parse_args()

    # A scripted coordinator, answering the way people actually talk.
    answers = {
        "name": "Pilsen Pantry Collective",
        "street": "1801 S Loomis St",
        "city": "Chicago",
        "zip_code": "60608",
        "cold_storage_answer": "No walk-in, just two fridges in the church kitchen",
        "pallet_handling_answer": "Hand-carry, it all comes in through the side door",
        "pickup_window_answer": "We could get someone there in about 3 hours",
        "transport_answer": "No van - a volunteer would drive over in their car",
        "freezer_answer": "There's a small chest freezer",
        "weekly_households": 150,
        "food_needs": "fresh greens and vegetables for families, small amounts we can hand out the same week",
    }
    step = {}
    for key, value in answers.items():
        step[key] = value
        res = build_pantry_profile(**step)
        nxt = res["follow_up_questions"][0] if res["follow_up_questions"] else "(complete)"
        print(f"answered {key:<24} -> next: {nxt}")
    print("\nprofile_text:", res["profile_text"])
    print("record:", json.dumps({k: res["record"][k] for k in (
        "cold_storage", "frozen_storage", "loading_dock", "max_pallets",
        "pickup_window_hours", "refrigerated_transport")}))
    if args.register:
        print("\n", json.dumps(register_pantry(**answers, confirmed=True), indent=2, default=str))
