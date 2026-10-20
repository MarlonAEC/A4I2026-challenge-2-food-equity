"""Match Brief: turn a `find_and_rank_recipients` result into a coordinator-ready Markdown brief.

The brief answers the seven questions from README "Your output artifact: the Match Brief"
for the #1 match and the next two options:

1. Which organization, by name, with its address
2. Why them, in a sentence a human would accept
3. What they can actually take, against the pallets and storage on offer
4. The clock: how long the food has, whether they can collect inside it, and the margin
5. Who it helps: the neighborhood their location serves
6. The drafted outreach message, ready to send
7. The next two options

It is laid out as a decision card: the #1 match as a short fact table plus its message, the
backups as one comparison table, then what was skipped and why, in plain language.

Nothing here re-ranks or re-filters. It only explains the matcher's own output, so the brief
can never disagree with what the UI and the agent show for the same posting.
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timedelta
from functools import lru_cache
from pathlib import Path
from typing import Any

try:
    from zoneinfo import ZoneInfo

    CHICAGO_TZ: Any = ZoneInfo("America/Chicago")
    TZ_LABEL = "CT"
except Exception:  # tzdata missing (e.g. slim container): fall back to the machine's clock
    CHICAGO_TZ = None
    TZ_LABEL = "local time"

COMMUNITY_AREAS_PATH = Path(__file__).resolve().parent.parent / "data" / "chicago_community_areas.json"

STORAGE_LABELS = {
    "walk-in": "Walk-in cooler",
    "commercial": "Commercial fridge",
    "medical": "Medical-grade fridge",
    "domestic": "Household fridges",
    "vehicle": "Van cold hold only (no building)",
    "none": "Dry storage only",
}

# Posting words -> (label, profile words that show an organization handles that kind of food).
# Used only to pick the profile sentence to quote and to flag a weak fit, never to rank.
FIT_TOPICS: dict[str, tuple[set[str], str, tuple[str, ...]]] = {
    "produce": (
        {"spinach", "greens", "lettuce", "salad", "produce", "vegetable", "vegetables", "fruit",
         "berries", "blueberries", "potatoes", "squash"},
        "fresh produce",
        ("produce", "fruit", "vegetable", "greens", "salad"),
    ),
    "dairy": ({"milk", "dairy", "yogurt", "cheese"}, "dairy", ("dairy", "milk", "chilled", "perishable")),
    "bakery": (
        {"bread", "loaves", "pastries", "bakery"},
        "bread or baked goods",
        ("bread", "bakery", "baked", "dry goods"),
    ),
    "prepared": (
        {"sandwiches", "prepared", "deli", "meals", "salads"},
        "prepared food",
        ("prepared", "meal", "kitchen", "short-date", "same day", "perishable"),
    ),
    "infant": (
        {"infant", "formula", "baby"},
        "infant formula",
        ("infant", "formula", "baby", "children under"),
    ),
    "diapers": (
        {"diapers", "diaper", "wipes"},
        "diapers",
        ("diaper", "baby", "essentials", "children under"),
    ),
    "medical": (
        {"clinic", "supplements", "nutritional", "medical"},
        "medical supplies",
        ("clinic", "medical", "patient", "health"),
    ),
    "frozen": ({"frozen", "freezer"}, "frozen food", ("frozen", "freezer")),
    "bulk": ({"tons", "truckload", "bins"}, "bulk loads", ("warehouse", "pallet", "dock", "bulk")),
}
COLD_PROFILE_WORDS = ("cooler", "fridge", "refrigerat", "cold", "chilled", "reefer")

BLOCKED_SHOWN = 5
QUOTE_MAX_CHARS = 140

DATA_NOTE = (
    "Names and addresses are IRS records. Storage, capacity and pickup windows are generated "
    "(no public data exists). Locations are ZIP centroids, so neighborhoods are approximate. "
    "Neighborhoods are City of Chicago community areas."
)


# ---------------------------------------------------------------------------
# Neighborhood lookup (City of Chicago community areas)
# ---------------------------------------------------------------------------


@lru_cache(maxsize=1)
def _community_areas() -> list[dict[str, Any]]:
    try:
        with open(COMMUNITY_AREAS_PATH, encoding="utf-8") as f:
            return json.load(f)["areas"]
    except (OSError, ValueError, KeyError):
        return []


def _in_ring(lon: float, lat: float, ring: list[list[float]]) -> bool:
    """Ray-casting point-in-polygon test for one ring of [lon, lat] vertices."""
    inside = False
    j = len(ring) - 1
    for i in range(len(ring)):
        xi, yi = ring[i]
        xj, yj = ring[j]
        if (yi > lat) != (yj > lat) and lon < (xj - xi) * (lat - yi) / (yj - yi) + xi:
            inside = not inside
        j = i
    return inside


def community_area_for(lat: float | None, lon: float | None) -> str | None:
    """Return the Chicago community area containing (lat, lon), or None outside the city."""
    if lat is None or lon is None:
        return None
    for area in _community_areas():
        for poly in area["polygons"]:
            if _in_ring(lon, lat, poly[0]) and not any(_in_ring(lon, lat, h) for h in poly[1:]):
                return area["name"]
    return None


# ---------------------------------------------------------------------------
# Formatting helpers
# ---------------------------------------------------------------------------


def _now() -> datetime:
    return datetime.now(CHICAGO_TZ) if CHICAGO_TZ else datetime.now()


def _fmt_time(dt: datetime, now: datetime, today: bool = False) -> str:
    clock = dt.strftime("%I:%M %p").lstrip("0")
    if dt.date() == now.date():
        return f"{clock} today" if today else clock
    return f"{dt.strftime('%a')} {dt.day} {dt.strftime('%b')}, {clock}"


def _fmt_hours(hours: float) -> str:
    if hours < 1:
        return f"{round(hours * 60)} min"
    if hours < 48:
        return f"{hours:g} h"
    return f"{hours / 24:.1f}".rstrip("0").rstrip(".") + " days"


def _plural(n: int, word: str) -> str:
    return f"{n} {word}" if n == 1 else f"{n} {word}s"


def _display_name(name: str) -> str:
    """Tidy IRS-style names: 'WESTSIDE KITCHEN' -> 'Westside Kitchen', 'Place Ii' -> 'Place II'."""
    if name.isupper():
        name = name.title()
    name = re.sub(r"\b(?:Ii|Iii|Iv|Vi|Vii|Viii|Ix)\b", lambda m: m.group().upper(), name)
    return re.sub(r"\b(?:Nfp|Llc|Usa)\b", lambda m: m.group().upper(), name)


def _address(m: dict[str, Any]) -> str:
    city = str(m.get("city") or "").title()
    state_zip = f"IL {m['zip_code']}" if m.get("zip_code") else "IL"
    tail = f"{city}, {state_zip}" if city else state_zip
    street = str(m.get("street") or "").strip()
    if not street:
        return f"Street address not on file ({tail})"
    return f"{street.title()}, {tail}"


def _short_title(ps: dict[str, Any]) -> str:
    """A short name for the offer: the matcher's food_item, or the first clause of the posting."""
    item = str(ps.get("food_item") or "").strip()
    text = str(ps.get("posting_text") or "").strip()
    if not item or item == text:
        item = re.split(r"\s[-–]\s|[,;]", text)[0].strip()
        if len(item) > 45:
            item = item[:45].rsplit(" ", 1)[0] + "…"
    return item[:1].upper() + item[1:] if item else "Surplus offer"


def _sentences(text: str) -> list[str]:
    return [s.strip() for s in re.split(r"(?<=[.!?])\s+", text or "") if s.strip()]


def _posting_topics(posting_text: str) -> list[str]:
    words = set(re.findall(r"[a-z]+", posting_text.lower()))
    return [topic for topic, (triggers, _, _) in FIT_TOPICS.items() if words & triggers]


def _plain_reason(reason: str) -> str:
    """Rewrite a matcher rejection reason as a short coordinator-facing phrase."""
    low = reason.lower()
    clock = re.search(r"pickup_window_hours=(\d+(?:\.\d+)?)h exceeds the (\d+(?:\.\d+)?)h", reason)
    if clock:
        return f"needs {clock.group(1)} h to collect, but the food only has {clock.group(2)} h"
    if "volume filter" in low:
        return "hand-carry only, can't receive pallets"
    if "capacity filter" in low:
        return "household fridge only, too small for this load"
    if "clinical cold-chain" in low:
        return "fridge isn't suitable for temperature-sensitive clinical supplies"
    if "frozen_storage=false" in low:
        return "no freezer"
    if "logistics filter" in low:
        return "no van, and this donor needs the recipient to collect"
    if "profile contradicts itself" in low:
        return "profile contradicts itself about its storage, so it can't be trusted yet"
    if "cold_storage column is 'none'" in low:
        return "profile says it refrigerates, but its record says no fridge"
    if "cold_storage column is 'walk-in'" in low:
        return "record says walk-in cooler, but the profile describes household storage only"
    if "frozen_storage flag is true" in low:
        return "record says freezer, but the profile says there isn't one"
    if "cold_storage='none'" in low:
        return "no refrigeration on site"
    if "declined" in low:
        return "already declined"
    return reason


def _blocked_kind(reason: str) -> str:
    low = reason.lower()
    if "clock filter" in low:
        return "too slow to collect"
    if "volume filter" in low or "capacity filter" in low:
        return "too small"
    if "contradict" in low:
        return "contradictory profile"
    if "cold_storage" in low or "frozen_storage" in low or "refrigerat" in low or "cold-chain" in low:
        return "can't store it"
    if "declined" in low:
        return "already declined"
    return "other checks"


# ---------------------------------------------------------------------------
# One option (rank 1, 2 or 3)
# ---------------------------------------------------------------------------


def _why_them(m: dict[str, Any], ps: dict[str, Any]) -> tuple[str, str | None, str | None]:
    """Return (why sentence, profile quote or None, weak-fit food label or None)."""
    needs_cold = bool(ps.get("requires_cold_storage") or ps.get("requires_frozen"))
    window = float(ps.get("effective_window_hours") or 0)
    pickup = float(m.get("pickup_window_hours") or 0)
    storage = STORAGE_LABELS.get(m.get("cold_storage", "none"), str(m.get("cold_storage")))

    parts = []
    if needs_cold and m.get("cold_storage") != "vehicle":
        parts.append(storage)
    parts.append(f"room for {_plural(int(m.get('max_pallets') or 1), 'pallet')}")
    parts.append("their own refrigerated van" if m.get("refrigerated_transport") else "volunteer-driver delivery")
    why = (
        f"{', '.join(parts)}, and they can take it within {_fmt_hours(pickup)} of the "
        f"{_fmt_hours(window)} available."
    )
    why = why[:1].upper() + why[1:]

    topics = _posting_topics(ps.get("posting_text", ""))
    food_words = [w for t in topics for w in FIT_TOPICS[t][2]]
    score_words = food_words + (list(COLD_PROFILE_WORDS) if needs_cold else [])
    profile = m.get("profile_text", "")

    best, best_score = None, 0
    for sentence in _sentences(profile):
        low = sentence.lower()
        score = sum(2 for w in food_words if w in low) + sum(1 for w in score_words if w in low)
        if score > best_score:
            best, best_score = sentence, score
    if best and len(best) > QUOTE_MAX_CHARS:
        best = best[:QUOTE_MAX_CHARS].rsplit(" ", 1)[0] + "…"

    weak = None
    if topics and not any(w in profile.lower() for w in food_words):
        food_topics = [t for t in topics if t != "bulk"] or topics
        weak = FIT_TOPICS[food_topics[0]][1]
    return why, best, weak


def _build_option(m: dict[str, Any], ps: dict[str, Any], now: datetime, pickup_from: str,
                  split_by_name: dict[str, dict[str, Any]], split_needed: bool) -> dict[str, Any]:
    offered = int(ps.get("pallets_offered") or 1)
    max_p = int(m.get("max_pallets") or 1)
    window = float(ps.get("effective_window_hours") or 0)
    pickup = float(m.get("pickup_window_hours") or 0)
    margin = float(m.get("margin_hours") or 0)
    name = _display_name(str(m["name"]))

    split = split_by_name.get(m["name"])
    if split_needed and split:
        pallets = int(split["allocated_pallets"])
        takes = f"Their share: {pallets} of {_plural(offered, 'pallet')} (holds {max_p})"
    elif int(m.get("pallets_allocated") or 0) >= offered:
        pallets = offered
        takes = f"All {_plural(offered, 'pallet')} (holds {max_p})"
    else:
        pallets = int(m.get("pallets_allocated") or max_p)
        takes = f"Only {pallets} of {_plural(offered, 'pallet')}: see split plan"

    storage = STORAGE_LABELS.get(m.get("cold_storage", "none"), str(m.get("cold_storage")))
    if ps.get("requires_frozen"):
        storage += " · freezer ✅" if m.get("frozen_storage") else " · no freezer ⚠️"
    elif ps.get("requires_cold_storage"):
        if m.get("cold_storage") == "domestic":
            storage += " ⚠️ ask if they have room"
    else:
        storage += " (no fridge needed)"

    drive = int(m.get("drive_time_minutes") or 0)
    delay = int(m.get("traffic_delay_minutes") or 0)
    transport = "Own refrigerated van" if m.get("refrigerated_transport") else "Volunteer driver"
    pickup_cell = f"{transport} · {drive} min drive" + (f" (+{delay} traffic)" if delay else "")

    collect_by = _fmt_time(now + timedelta(hours=pickup), now)
    collect_cell = f"{collect_by} · **{_fmt_hours(margin)} margin**" + (" ⚠️ tight, call" if margin < 1 else "")

    place = community_area_for(m.get("lat"), m.get("lon")) or "Outside Chicago's 77 community areas"
    eq = m.get("equity_context") or {}
    need = f"{eq.get('poverty_rate')}% in poverty · {eq.get('pct_no_vehicle')}% of households without a car"

    why, quote, weak = _why_them(m, ps)

    move_by = _fmt_time(now + timedelta(hours=window), now, today=True)
    if ps.get("requires_frozen"):
        keep = " It needs to stay frozen."
    elif ps.get("requires_cold_storage"):
        keep = " It needs to stay cold."
    else:
        keep = ""
    if m.get("refrigerated_transport"):
        ask = f"Can your van collect it from {pickup_from} by {move_by}?"
    else:
        ask = f"We'd send a volunteer driver from {pickup_from}. Can you receive it by {move_by}?"
    offer = str(ps.get("posting_text") or "surplus food").rstrip(".")
    message = (
        f"Hi {name}, this is the food rescue coordinator. A donor is offering "
        f"{_plural(pallets, 'pallet')}: “{offer}.”{keep} {ask} Reply ACCEPT or DECLINE."
    )

    return {
        "rank": m.get("rank"),
        "name": name,
        "raw_name": m["name"],
        "address": _address(m),
        "neighborhood": place,
        "collect_by": collect_by,
        "margin": _fmt_hours(margin),
        "collect_cell": collect_cell,
        "takes": takes,
        "storage": storage,
        "transport": transport,
        "pickup_cell": pickup_cell,
        "need": need,
        "why": why,
        "profile_quote": quote,
        "weak_fit": weak,
        "message": message,
    }


# ---------------------------------------------------------------------------
# The whole brief
# ---------------------------------------------------------------------------


def build_match_brief(result: dict[str, Any], *, donor_address: str = "",
                      now: datetime | None = None) -> dict[str, Any]:
    """Assemble the Match Brief from a `find_and_rank_recipients` result.

    Args:
        result: The dict returned by `find_and_rank_recipients`.
        donor_address: Optional pickup address for the outreach message. When empty, the
            donor's community area (from the posting's donor coordinates) is used instead.
        now: Time the offer was posted; clock times are computed from it. Defaults to now.

    Returns:
        A dict with `posting`, `options` (ranks 1–3), `split_plan`, `blocked`, `warnings`
        and `notes`, ready for `to_markdown`.
    """
    now = now or _now()
    ps = result.get("posting_summary", {})
    donor = ps.get("donor") or {}
    donor_area = community_area_for(donor.get("lat"), donor.get("lon"))
    if donor_address:
        pickup_from = donor_address
    elif donor_area:
        pickup_from = "the Loop" if donor_area == "Loop" else f"near {donor_area}"
    else:
        pickup_from = "the donor's site"

    split_plan = result.get("split_plan") or []
    split_needed = bool((result.get("multi_pantry_split") or {}).get("split_triggered_by_capacity"))
    split_by_name = {s["name"]: s for s in split_plan}
    options = [
        _build_option(m, ps, now, pickup_from, split_by_name, split_needed)
        for m in result.get("matches", [])[:3]
    ]

    safety = result.get("food_safety_guardrail") or {}
    term = safety.get("search_term") or "this item"
    recalls = int(safety.get("active_recalls_count") or 0)

    warnings = []
    if ps.get("halt_dispatch") or safety.get("halt_dispatch"):
        triggers = ", ".join(safety.get("risk_triggers_detected") or [])
        warnings.append(
            f"🛑 **Do not dispatch.** The FDA recall check flagged this item"
            f"{f' ({triggers})' if triggers else ''}: {_plural(recalls, 'active recall')} for “{term}”."
        )
    if result.get("search_backend") != "bigquery_vector_search":
        warnings.append(
            "⚠️ **Demo data.** Live BigQuery search was unreachable, so these are offline sample "
            "records. Don't contact anyone until a live search succeeds."
        )
    if not options:
        warnings.append("⚠️ No recipient passed every storage, capacity and clock check for this offer.")
    elif len(options) < 3:
        warnings.append(f"⚠️ Only {len(options)} recipient(s) passed every check, so there are fewer backups than usual.")

    notes = []
    if not (ps.get("halt_dispatch") or safety.get("halt_dispatch")):
        if recalls:
            notes.append(f"FDA recalls: {recalls} active for “{term}”. Check the donor's lot numbers before pickup.")
        elif safety.get("recall_status"):
            notes.append(f"FDA recalls: none active for “{term}”.")
    usda = ps.get("usda_shelf_life_hours")
    deadline = float(ps.get("donor_deadline_hours") or 0)
    if usda is None:
        notes.append(
            f"Shelf life: USDA FoodKeeper gives no fixed time for this item, so the donor's "
            f"{_fmt_hours(deadline)} deadline sets the clock."
        )
    elif float(usda) > deadline:
        notes.append(
            f"Shelf life: USDA FoodKeeper (home storage) gives {_fmt_hours(float(usda))}; the donor's "
            f"{_fmt_hours(deadline)} deadline is shorter, so it sets the clock."
        )
    else:
        notes.append(
            f"Shelf life: USDA FoodKeeper (home storage) gives {_fmt_hours(float(usda))}, shorter than "
            f"the donor's deadline, so it sets the clock."
        )
    tie = re.match(r"(?:TIE-BREAKER NOTE:\s*)?(.+?) and (.+?) are operationally identical",
                   result.get("tie_breaker_explanation") or "")
    ranked = [o["raw_name"] for o in options]
    if tie and tie.group(1) in ranked and tie.group(2) in ranked:
        first, second = sorted(tie.groups(), key=ranked.index)
        notes.append(
            f"Tie-break: {_display_name(first)} and {_display_name(second)} are operationally "
            f"identical; {_display_name(first)} ranks higher on neighborhood need and distance."
        )
    notes.append("Clock times assume the offer was posted when this brief was generated.")
    notes.append(DATA_NOTE)

    return {
        "generated_at": now,
        "posting": {
            "title": _short_title(ps),
            "text": ps.get("posting_text", ""),
            "pallets_offered": int(ps.get("pallets_offered") or 1),
            "requires_cold_storage": bool(ps.get("requires_cold_storage")),
            "requires_frozen": bool(ps.get("requires_frozen")),
            "window": _fmt_hours(float(ps.get("effective_window_hours") or 0)),
            "move_by": _fmt_time(now + timedelta(hours=float(ps.get("effective_window_hours") or 0)), now, today=True),
            "routing_policy": result.get("routing_policy", ps.get("routing_policy", "equity_weighted")),
            "search_backend": result.get("search_backend"),
        },
        "options": options,
        "split_plan": split_plan,
        "split_needed": split_needed,
        "blocked": result.get("rejected_decoys") or [],
        "warnings": warnings,
        "notes": notes,
    }


# ---------------------------------------------------------------------------
# Markdown
# ---------------------------------------------------------------------------


def _why_lines(o: dict[str, Any]) -> list[str]:
    lines = [o["why"]]
    if o["weak_fit"]:
        lines.append(f"⚠️ Their profile doesn't mention {o['weak_fit']}: confirm they want it.")
    elif o["profile_quote"]:
        lines.append(f"Profile: “{o['profile_quote']}”")
    return lines


def to_markdown(brief: dict[str, Any]) -> str:
    """Render one Match Brief (from `build_match_brief`) as Markdown."""
    p = brief["posting"]
    gen = brief["generated_at"]
    backend = "Live BigQuery vector search" if p["search_backend"] == "bigquery_vector_search" else "Offline demo data"
    policy = "equity-weighted" if p["routing_policy"] == "equity_weighted" else "logistics-first"
    facts = [_plural(p["pallets_offered"], "pallet")]
    if p["requires_frozen"]:
        facts.append("keep frozen")
    elif p["requires_cold_storage"]:
        facts.append("keep cold")
    facts.append(f"move by {p['move_by']} ({p['window']})")

    lines = [
        f"# Match Brief: {p['title']}",
        "",
        f"**{' · '.join(facts)}**",
        "",
        f"Donor's words: “{p['text']}”",
        "",
        f"<sub>{backend} · {policy} routing · generated {gen.strftime('%a')} {gen.day} "
        f"{gen.strftime('%b %Y')}, {_fmt_time(gen, gen)} {TZ_LABEL}</sub>",
        "",
    ]
    for w in brief["warnings"]:
        lines += [f"> {w}", ""]

    options = brief["options"]
    if options:
        o = options[0]
        lines += [
            f"## Send to: {o['name']}",
            "",
            f"{o['address']} · **{o['neighborhood']}**",
            "",
            "| | |",
            "|---|---|",
            f"| **Collect by** | {o['collect_cell']} |",
            f"| **Takes** | {o['takes']} |",
            f"| **Storage** | {o['storage']} |",
            f"| **Pickup** | {o['pickup_cell']} |",
            f"| **Need nearby** | {o['need']} |",
            "",
        ]
        why = _why_lines(o)
        lines += [f"**Why them:** {why[0]}", ""] + [f"{x}" for x in why[1:]]
        lines += ["", "**Message to send:**", "", f"> {o['message']}", ""]

    if len(options) > 1:
        lines += [
            "## If they say no",
            "",
            "| # | Organization | Neighborhood | Collect by | Margin | Pickup | Takes |",
            "|---|---|---|---|---|---|---|",
        ]
        for o in options[1:]:
            lines.append(
                f"| {o['rank']} | {o['name']} | {o['neighborhood']} | {o['collect_by']} | {o['margin']} "
                f"| {o['transport']} | {o['takes']} |"
            )
        lines.append("")
        for o in options[1:]:
            why = _why_lines(o)
            lines += [f"**{o['rank']}. {o['name']}** · {o['address']}", "", " ".join(why), "", f"> {o['message']}", ""]

    if len(brief["split_plan"]) >= 2:
        total = sum(int(s["allocated_pallets"]) for s in brief["split_plan"])
        if brief["split_needed"]:
            intro = f"No single site can take all {_plural(p['pallets_offered'], 'pallet')}, so split it:"
        else:
            intro = "Optional: share the load across several sites instead of sending it all to one."
        lines += [
            "## Split plan",
            "",
            intro,
            "",
            "| Stop | Organization | Pallets | Holds | Distance |",
            "|---|---|---|---|---|",
        ]
        for s in brief["split_plan"]:
            lines.append(
                f"| {s.get('stop_number')} | {_display_name(s['name'])} | {s['allocated_pallets']} "
                f"| {s.get('max_pallets')} | {s.get('distance_km')} km |"
            )
        lines.append("")
        if total < p["pallets_offered"]:
            lines += [f"⚠️ This plan places {total} of {p['pallets_offered']} pallets; the rest still needs a home.", ""]

    if brief["blocked"]:
        lines += ["## Skipped", "", "These matched on meaning but failed a hard check:", ""]
        for d in brief["blocked"][:BLOCKED_SHOWN]:
            rank = f" (#{d['semantic_rank']} on meaning)" if d.get("semantic_rank") else ""
            lines.append(f"- **{_display_name(d['name'])}**{rank}: {_plain_reason(d.get('rejection_reason', ''))}")
        rest = brief["blocked"][BLOCKED_SHOWN:]
        if rest:
            counts: dict[str, int] = {}
            for d in rest:
                kind = _blocked_kind(d.get("rejection_reason", ""))
                counts[kind] = counts.get(kind, 0) + 1
            summary = ", ".join(f"{n} {kind}" for kind, n in sorted(counts.items(), key=lambda kv: -kv[1]))
            lines.append(f"- Plus {len(rest)} lower-ranked: {summary}.")
        lines.append("")

    lines += ["## Notes", ""] + [f"- {n}" for n in brief["notes"]] + [""]
    return "\n".join(lines)
