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
    "walk-in": "a walk-in cooler",
    "commercial": "commercial refrigeration",
    "medical": "medical-grade refrigeration",
    "domestic": "household fridges only",
    "vehicle": "a refrigerated van but no building storage",
    "none": "dry storage only, no refrigeration",
}

# Posting words -> profile words that show an organization actually handles that kind of food.
# Used only to pick the profile sentence to quote and to flag a weak fit, never to rank.
FIT_TOPICS: dict[str, tuple[set[str], tuple[str, ...]]] = {
    "produce": (
        {"spinach", "greens", "lettuce", "salad", "produce", "vegetable", "vegetables", "fruit",
         "berries", "blueberries", "potatoes", "squash"},
        ("produce", "fruit", "vegetable", "greens", "salad"),
    ),
    "dairy": ({"milk", "dairy", "yogurt", "cheese"}, ("dairy", "milk", "chilled")),
    "bakery": ({"bread", "loaves", "pastries", "bakery"}, ("bread", "bakery", "baked", "dry goods")),
    "prepared": (
        {"sandwiches", "prepared", "deli", "meals", "salads"},
        ("prepared", "meal", "kitchen", "short-date", "same day"),
    ),
    "infant": ({"infant", "formula", "baby"}, ("infant", "formula", "baby", "children under")),
    "diapers": ({"diapers", "diaper", "wipes"}, ("diaper", "baby", "essentials", "children under")),
    "medical": (
        {"clinic", "supplements", "nutritional", "medical"},
        ("clinic", "medical", "patient", "health"),
    ),
    "frozen": ({"frozen", "freezer"}, ("frozen", "freezer")),
    "bulk": ({"tons", "truckload", "bins"}, ("warehouse", "pallet", "dock", "bulk")),
}
COLD_PROFILE_WORDS = ("cooler", "fridge", "refrigerat", "cold", "chilled", "reefer")


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


def _fmt_time(dt: datetime, now: datetime) -> str:
    clock = dt.strftime("%I:%M %p").lstrip("0")
    if dt.date() == now.date():
        return clock
    return f"{dt.strftime('%a')} {dt.day} {dt.strftime('%b')}, {clock}"


def _fmt_hours(hours: float) -> str:
    if hours < 1:
        return f"{round(hours * 60)} min"
    if hours < 48:
        return f"{hours:g} h"
    return f"{hours / 24:.1f}".rstrip("0").rstrip(".") + " days"


def _plural(n: int, word: str) -> str:
    return f"{n} {word}" if n == 1 else f"{n} {word}s"


def _address(m: dict[str, Any]) -> str:
    city = str(m.get("city") or "").title()
    state_zip = f"IL {m['zip_code']}" if m.get("zip_code") else "IL"
    tail = f"{city}, {state_zip}" if city else state_zip
    street = str(m.get("street") or "").strip()
    if not street:
        return f"Street address not on file ({tail})"
    return f"{street.title()}, {tail}"


def _sentences(text: str) -> list[str]:
    return [s.strip() for s in re.split(r"(?<=[.!?])\s+", text or "") if s.strip()]


def _posting_topics(posting_text: str) -> list[str]:
    words = set(re.findall(r"[a-z]+", posting_text.lower()))
    return [topic for topic, (triggers, _) in FIT_TOPICS.items() if words & triggers]


# ---------------------------------------------------------------------------
# The seven sections
# ---------------------------------------------------------------------------


def _why_them(m: dict[str, Any], posting_text: str, needs_cold: bool) -> tuple[str, bool]:
    """Return (sentence, weak_fit). weak_fit is True when the profile never mentions the food."""
    storage = STORAGE_LABELS.get(m.get("cold_storage", "none"), f"{m.get('cold_storage')} storage")
    if m.get("frozen_storage"):
        storage += " plus a freezer"
    room = _plural(int(m.get("max_pallets") or 1), "pallet")
    if m.get("cold_storage") == "vehicle":
        capability = (
            f"Their storage is the cold hold of their own refrigerated van (no building), with room "
            f"for {room}, so they collect it themselves."
        )
    elif m.get("refrigerated_transport"):
        capability = f"They have {storage} with room for {room}, and their own refrigerated van to collect it."
    else:
        capability = (
            f"They have {storage} with room for {room}, but no vehicle, so a volunteer driver "
            f"would deliver it."
        )

    topics = _posting_topics(posting_text)
    profile_words = [w for t in topics for w in FIT_TOPICS[t][1]]
    if needs_cold:
        profile_words += list(COLD_PROFILE_WORDS)
    food_words = [w for t in topics for w in FIT_TOPICS[t][1]]

    best, best_score = "", 0
    for sentence in _sentences(m.get("profile_text", "")):
        low = sentence.lower()
        score = sum(2 for w in food_words if w in low) + sum(1 for w in profile_words if w in low)
        if score > best_score:
            best, best_score = sentence, score

    weak_fit = bool(topics) and not any(
        w in m.get("profile_text", "").lower() for w in food_words
    )
    if weak_fit:
        return (
            f"{capability} Their profile doesn't mention this kind of food, so they were picked on "
            f"storage, capacity and timing. Confirm they want it before dispatching.",
            True,
        )
    if best:
        return f"{capability} Their profile says: “{best}”", False
    return capability, False


def _can_take(m: dict[str, Any], ps: dict[str, Any], split_by_name: dict[str, dict[str, Any]],
              split_needed: bool) -> str:
    offered = int(ps.get("pallets_offered") or 1)
    max_p = int(m.get("max_pallets") or 1)
    storage = STORAGE_LABELS.get(m.get("cold_storage", "none"), str(m.get("cold_storage")))
    split = split_by_name.get(m["name"])
    if split_needed and split:
        taken = int(split["allocated_pallets"])
        text = (
            f"Their share of a split load: {taken} of {_plural(offered, 'pallet')} "
            f"(site holds up to {max_p}). See the split plan below."
        )
    elif int(m.get("pallets_allocated") or 0) >= offered:
        text = f"All {_plural(offered, 'pallet')} (room for up to {max_p})."
    else:
        taken = int(m.get("pallets_allocated") or max_p)
        text = (
            f"Only {taken} of {_plural(offered, 'pallet')} (max {max_p}). The rest needs another "
            f"recipient; see the split plan below."
        )
    if ps.get("requires_frozen"):
        text += f" Needs a freezer: {'yes, they have one' if m.get('frozen_storage') else 'NOT confirmed'}."
    elif ps.get("requires_cold_storage"):
        text += f" Must stay cold: they have {storage}."
        if m.get("cold_storage") == "domestic":
            text += " Household fridges fill up fast, so ask whether they have room today."
    else:
        text += " No refrigeration needed."
    return text


def _clock(m: dict[str, Any], ps: dict[str, Any], now: datetime) -> str:
    window = float(ps.get("effective_window_hours") or 0)
    pickup = float(m.get("pickup_window_hours") or 0)
    margin = float(m.get("margin_hours") or 0)
    move_by = now + timedelta(hours=window)
    collect_by = now + timedelta(hours=pickup)
    who = "their van" if m.get("refrigerated_transport") else "a volunteer driver"
    text = (
        f"Food must move by **{_fmt_time(move_by, now)}** ({_fmt_hours(window)}). "
        f"They can collect within {_fmt_hours(pickup)} via {who}, by {_fmt_time(collect_by, now)}, "
        f"leaving **{_fmt_hours(margin)}** of margin. Drive is about "
        f"{int(m.get('drive_time_minutes') or 0)} min"
    )
    delay = int(m.get("traffic_delay_minutes") or 0)
    text += f" ({delay} min of that is traffic)." if delay else "."
    if margin < 1:
        text += " ⚠️ Tight: under an hour to spare, so call rather than text."
    return text


def _who_it_helps(m: dict[str, Any]) -> tuple[str, str]:
    place = community_area_for(m.get("lat"), m.get("lon")) or "Outside Chicago's 77 community areas"
    eq = m.get("equity_context") or {}
    text = (
        f"{place}: the surrounding census tract has {eq.get('poverty_rate')}% of people in poverty "
        f"and {eq.get('pct_no_vehicle')}% of households without a car."
    )
    return place, text


def _outreach(m: dict[str, Any], ps: dict[str, Any], now: datetime, pickup_from: str,
              split_by_name: dict[str, dict[str, Any]], split_needed: bool) -> str:
    split = split_by_name.get(m["name"])
    pallets = int(split["allocated_pallets"]) if split_needed and split else int(m.get("pallets_allocated") or 1)
    move_dt = now + timedelta(hours=float(ps.get("effective_window_hours") or 0))
    move_by = _fmt_time(move_dt, now) + (" today" if move_dt.date() == now.date() else "")
    if ps.get("requires_frozen"):
        cold = " It needs to stay frozen."
    elif ps.get("requires_cold_storage"):
        cold = " It needs to stay cold."
    else:
        cold = ""
    if m.get("refrigerated_transport"):
        ask = f"Could your van collect it from {pickup_from} before {move_by}?"
    else:
        ask = f"We'd send a volunteer driver from {pickup_from}. Could you receive it before {move_by}?"
    offer = str(ps.get("posting_text") or ps.get("food_item") or "surplus food").rstrip(".")
    return (
        f"Hi {m['name']}, this is the food rescue coordinator. A donor is offering "
        f"{_plural(pallets, 'pallet')}: “{offer}.”{cold} {ask} "
        f"Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry."
    )


def build_match_brief(result: dict[str, Any], *, donor_address: str = "",
                      now: datetime | None = None) -> dict[str, Any]:
    """Assemble the seven Match Brief sections from a `find_and_rank_recipients` result.

    Args:
        result: The dict returned by `find_and_rank_recipients`.
        donor_address: Optional pickup address for the outreach message. When empty, the
            donor's community area (from the posting's donor coordinates) is used instead.
        now: Time the offer was posted; clock times are computed from it. Defaults to now.

    Returns:
        A dict with `posting`, `options` (ranks 1–3, each with the seven sections),
        `split_plan`, `blocked`, `warnings` and `notes`, ready for `to_markdown`.
    """
    now = now or _now()
    ps = result.get("posting_summary", {})
    posting_text = ps.get("posting_text", "")
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

    options = []
    for m in result.get("matches", [])[:3]:
        why, weak = _why_them(m, posting_text, bool(ps.get("requires_cold_storage")))
        place, helps = _who_it_helps(m)
        options.append(
            {
                "rank": m.get("rank"),
                "name": m["name"],
                "address": _address(m),
                "why_them": why,
                "weak_fit": weak,
                "can_take": _can_take(m, ps, split_by_name, split_needed),
                "clock": _clock(m, ps, now),
                "neighborhood": place,
                "who_it_helps": helps,
                "outreach_message": _outreach(m, ps, now, pickup_from, split_by_name, split_needed),
            }
        )

    warnings = []
    safety = result.get("food_safety_guardrail") or {}
    if ps.get("halt_dispatch") or safety.get("halt_dispatch"):
        warnings.append(
            f"🛑 **Do not dispatch.** The FDA recall check flagged this item: "
            f"{safety.get('safety_recommendation', 'see recall status')}"
        )
    if result.get("search_backend") != "bigquery_vector_search":
        warnings.append(
            "⚠️ **Demo data.** Live BigQuery search was unreachable, so these are offline sample "
            "records. Don't contact anyone until a live search succeeds."
        )
    if not options:
        warnings.append("No recipient passed every storage, capacity and clock check for this offer.")
    elif len(options) < 3:
        warnings.append(f"Only {len(options)} recipient(s) passed every check, so there are fewer backups than usual.")

    notes = []
    if safety.get("recall_status") and not ps.get("halt_dispatch"):
        notes.append(f"FDA recall check: {safety['recall_status']}. {safety.get('safety_recommendation', '')}".strip())
    if ps.get("shelf_life_note"):
        notes.append(f"Shelf life: {ps['shelf_life_note']}")
    if result.get("tie_breaker_explanation"):
        tie = re.sub(r"^TIE-BREAKER NOTE:\s*", "", result["tie_breaker_explanation"])
        notes.append(f"Tie-break: {tie}")

    return {
        "generated_at": now,
        "posting": {
            "text": posting_text,
            "food_item": ps.get("food_item"),
            "pallets_offered": int(ps.get("pallets_offered") or 1),
            "requires_cold_storage": bool(ps.get("requires_cold_storage")),
            "requires_frozen": bool(ps.get("requires_frozen")),
            "move_by": _fmt_time(now + timedelta(hours=float(ps.get("effective_window_hours") or 0)), now),
            "routing_policy": result.get("routing_policy", ps.get("routing_policy", "equity_weighted")),
            "search_backend": result.get("search_backend"),
        },
        "options": options,
        "split_plan": split_plan,
        "split_needed": split_needed,
        "split_reason": (result.get("multi_pantry_split") or {}).get("trigger_reason", ""),
        "blocked": result.get("rejected_decoys") or [],
        "warnings": warnings,
        "notes": notes,
    }


# ---------------------------------------------------------------------------
# Markdown
# ---------------------------------------------------------------------------

DATA_NOTE = (
    "Organization names, addresses and NTEE codes are IRS records. Cold storage, capacity, pickup "
    "windows and service days are generated (no public data exists for them). Locations are ZIP "
    "centroids, so the neighborhood is approximate. Shelf life is USDA FoodKeeper consumer "
    "home-storage guidance, not a commercial cold-chain guarantee. Neighborhoods: City of Chicago "
    "community area boundaries."
)


BLOCKED_SHOWN = 5


def _blocked_kind(reason: str) -> str:
    low = reason.lower()
    if "clock filter" in low:
        return "too slow to collect"
    if "volume filter" in low or "capacity filter" in low:
        return "too small"
    if "contradict" in low:
        return "contradictory profile"
    if "cold_storage" in low or "frozen_storage" in low or "refrigerat" in low:
        return "can't store it"
    if "declined" in low:
        return "already declined"
    return "other checks"


def _option_md(o: dict[str, Any], heading: str) -> list[str]:
    return [
        f"{heading} {o['rank']}. {o['name']}",
        "",
        f"**Address:** {o['address']}",
        "",
        f"- **Why them:** {o['why_them']}",
        f"- **What they can take:** {o['can_take']}",
        f"- **The clock:** {o['clock']}",
        f"- **Who it helps:** {o['who_it_helps']}",
        "",
        "**Outreach message, ready to send:**",
        "",
        "```text",
        o["outreach_message"],
        "```",
        "",
    ]


def to_markdown(brief: dict[str, Any]) -> str:
    """Render one Match Brief (from `build_match_brief`) as Markdown."""
    p = brief["posting"]
    gen = brief["generated_at"]
    backend = "Live BigQuery vector search" if p["search_backend"] == "bigquery_vector_search" else "Offline demo data"
    policy = "equity-weighted" if p["routing_policy"] == "equity_weighted" else "logistics-first"
    needs = []
    if p["requires_frozen"]:
        needs.append("keep frozen")
    elif p["requires_cold_storage"]:
        needs.append("keep cold")
    needs.append(f"must move by {p['move_by']}")

    lines = [
        f"# Match Brief: {p['food_item']}",
        "",
        f"Generated {gen.strftime('%a')} {gen.day} {gen.strftime('%b %Y')}, "
        f"{_fmt_time(gen, gen)} {TZ_LABEL} · {backend} · {policy} routing",
        "",
        f"> “{p['text']}” · {_plural(p['pallets_offered'], 'pallet')} · " + " · ".join(needs),
        "",
    ]
    for w in brief["warnings"]:
        lines += [w, ""]

    options = brief["options"]
    if options:
        lines += _option_md(options[0], "##")
    if len(options) > 1:
        lines += ["## If they say no", ""]
        for o in options[1:]:
            lines += _option_md(o, "###")

    if len(brief["split_plan"]) >= 2:
        total = sum(int(s["allocated_pallets"]) for s in brief["split_plan"])
        if brief["split_needed"]:
            intro = f"No single site can take all {_plural(p['pallets_offered'], 'pallet')}. {brief['split_reason']}"
        else:
            intro = "Optional: share the load across several sites instead of sending it all to #1."
        lines += ["## Split plan", "", intro.strip(), ""]
        if total < p["pallets_offered"]:
            lines += [f"⚠️ This plan places {total} of {p['pallets_offered']} pallets; the rest still needs a home.", ""]
        for s in brief["split_plan"]:
            lines.append(
                f"- Stop {s.get('stop_number')}: **{s['name']}**, {_plural(int(s['allocated_pallets']), 'pallet')} "
                f"(holds up to {s.get('max_pallets')}), {s.get('distance_km')} km away"
            )
        lines.append("")

    if brief["blocked"]:
        lines += [
            "## Blocked by the constraint checks",
            "",
            "These matched the offer on meaning, but can't safely take it:",
            "",
        ]
        for d in brief["blocked"][:BLOCKED_SHOWN]:
            reason = d.get("rejection_reason", "")
            rank = "" if reason.startswith("Matched #") or not d.get("semantic_rank") else f" (#{d['semantic_rank']} on meaning)"
            lines.append(f"- **{d['name']}**{rank}: {reason}")
        rest = brief["blocked"][BLOCKED_SHOWN:]
        if rest:
            counts: dict[str, int] = {}
            for d in rest:
                why = _blocked_kind(d.get("rejection_reason", ""))
                counts[why] = counts.get(why, 0) + 1
            summary = ", ".join(f"{n} {why}" for why, n in sorted(counts.items(), key=lambda kv: -kv[1]))
            lines.append(f"- …and {len(rest)} more lower-ranked candidates ({summary}).")
        lines.append("")

    lines += ["## Notes", ""]
    lines += [f"- {n}" for n in brief["notes"]]
    lines += ["- Clock times assume the offer was posted when this brief was generated.", f"- Data: {DATA_NOTE}", ""]
    return "\n".join(lines)
