#!/usr/bin/env python3
"""Lane 5 (Deploy & QA Lead): Automated Verification Suite for All 4 Planted Judge Traps.

Can be run locally against `agent/tools.py` OR against a live Cloud Run URL:
    python3 scripts/verify_traps.py
    python3 scripts/verify_traps.py https://food-rescue-broker-xxxx.run.app

The checks are data-driven: they assert how the matcher treats each planted case, not
which organization wins, so they hold on live BigQuery and on the offline corpus alike.
"""

from __future__ import annotations

import json
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from agent.tools import (
    check_shelf_life_clock,
    find_and_rank_recipients,
)

SPINACH = "10 crates of fresh spinach, harvested yesterday, needs cold storage"
FROZEN = "3 pallets of frozen chicken and beef, needs freezer space"
# Long enough for the 12h pickup windows of the two planted "genuine tie" organizations.
PRODUCE_24H = "2 pallets of fresh produce - lettuce, peppers and tomatoes - needs cold storage"


def query_match(
    base_url: str | None,
    posting_text: str,
    deadline: float = 6.0,
    declined: list[str] | None = None,
    requires_pickup_van: bool = True,
    top_n: int = 3,
) -> dict:
    declined = declined or []
    if not base_url:
        clock = check_shelf_life_clock(posting_text, donor_deadline_hours=deadline)
        res = find_and_rank_recipients(
            posting_text=posting_text,
            donor_deadline_hours=clock["effective_window_hours"],
            requires_pickup_van=requires_pickup_van,
            declined_recipient_names=declined,
            top_n=top_n,
        )
        res["clock"] = clock
        return res

    url = base_url.rstrip("/") + "/api/match"
    payload = json.dumps({
        "posting_text": posting_text,
        "pallets_offered": 0,
        "donor_deadline_hours": deadline,
        "requires_cold_storage": True,
        "requires_pickup_van": requires_pickup_van,
        "declined_recipient_names": declined,
    }).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main():
    base_url = sys.argv[1] if len(sys.argv) > 1 else None
    target_label = base_url or "local agent/tools.py"
    print(f"=== Running Lane 5 Judge-Trap Verification against: {target_label} ===\n")

    result = query_match(base_url, SPINACH)
    print(f"(search backend: {result.get('search_backend')})")
    assert not result.get("search_error"), f"FAIL: search error: {result.get('search_error')}"
    decoys = {d["name"]: d for d in result["rejected_decoys"]}

    # Trap 1: Near-miss decoy (Greenline Community Pantry) retrieved on meaning, blocked on storage
    assert "Greenline Community Pantry" in decoys, "FAIL: Greenline Community Pantry decoy was not blocked!"
    assert "cold_storage='none'" in decoys["Greenline Community Pantry"]["rejection_reason"], (
        "FAIL: Greenline rejection reason missing cold_storage='none'"
    )
    assert all(m["cold_storage"] != "none" for m in result["matches"]), "FAIL: a no-refrigeration site was matched"
    print(
        "✅ [PASS] Trap 1 (Near-Miss Decoy): 'Greenline Community Pantry' blocked "
        f"(semantic rank #{decoys['Greenline Community Pantry']['semantic_rank']})."
    )

    # Trap 2: Contradiction (Harborview Neighbors Trust) is retrieved for frozen protein and blocked
    frozen = query_match(base_url, FROZEN, deadline=24.0, requires_pickup_van=False)
    frozen_decoys = {d["name"]: d for d in frozen["rejected_decoys"]}
    assert "Harborview Neighbors Trust" in frozen_decoys, (
        "FAIL: Harborview Neighbors Trust contradiction was not blocked!"
    )
    assert "contradict" in frozen_decoys["Harborview Neighbors Trust"]["rejection_reason"].lower(), (
        "FAIL: Harborview was blocked, but not for its contradiction"
    )
    print("✅ [PASS] Trap 2 (Profile Contradiction): 'Harborview Neighbors Trust' flagged and blocked.")

    # Trap 3: Genuine tie (Cedar Street vs Maple Street) explained on need, not capability.
    # Needs enough matches to see both; /api/match returns only the top 3.
    if base_url:
        print("⏭️  [SKIP] Trap 3 (Genuine Tie-Breaker): needs top_n > 3, which /api/match does not expose.")
    else:
        produce = query_match(None, PRODUCE_24H, deadline=24.0, top_n=25)
        ranked = {m["name"]: m for m in produce["matches"]}
        cedar, maple = ranked.get("Cedar Street Produce Alliance"), ranked.get("Maple Street Produce Alliance")
        assert cedar and maple, "FAIL: both tied organizations should qualify for a 24h produce offer"
        need = lambda m: (m["equity_context"]["poverty_rate"] or 0) + (m["equity_context"]["pct_no_vehicle"] or 0)  # noqa: E731
        first, second = sorted((cedar, maple), key=lambda m: m["rank"])
        assert need(first) >= need(second), "FAIL: the lower-need organization of the tied pair ranked first"
        note = produce["tie_breaker_explanation"] or ""
        assert cedar["name"] in note and maple["name"] in note, "FAIL: tie not explained"
        print(
            f"✅ [PASS] Trap 3 (Genuine Tie-Breaker): '{first['name']}' (#{first['rank']}) ahead of "
            f"'{second['name']}' (#{second['rank']}) on tract need "
            f"({first['equity_context']['poverty_rate']}% vs {second['equity_context']['poverty_rate']}% poverty)."
        )

    # Trap 4: "They Said No" cascading fallback promotes Backup #2 to #1. Without the van
    # requirement, so live data has backups to promote (with it, a 6h offer may have one).
    cascade = query_match(base_url, SPINACH, requires_pickup_van=False)
    names = [m["name"] for m in cascade["matches"]]
    assert len(names) >= 2, f"FAIL: need a primary and a backup to test the cascade, got {names}"
    rerouted = query_match(base_url, SPINACH, declined=[names[0]], requires_pickup_van=False)
    new_top = rerouted["matches"][0]["name"]
    assert new_top == names[1], f"FAIL: after '{names[0]}' declined, expected '{names[1]}' at #1, got '{new_top}'"
    assert names[0] not in [m["name"] for m in rerouted["matches"]], "FAIL: declined recipient still matched"
    print(f"✅ [PASS] Trap 4 ('They Said No' Fallback): Declining '{names[0]}' promoted '{new_top}' to #1.")

    # Clock check: Spinach matched to Lettuce subtitle in USDA FoodKeeper
    clock = result["clock"]
    assert "Lettuce" in clock["matched_usda_product"], "FAIL: Spinach did not match USDA Lettuce entry!"
    assert clock["effective_window_hours"] <= 6, "FAIL: effective window exceeds the donor deadline"
    print(
        f"✅ [PASS] USDA Shelf-Life Clock: Spinach matched '{clock['matched_usda_product']}' "
        f"({clock['usda_shelf_life_hours']}h shelf life, capped at {clock['effective_window_hours']}h donor deadline)."
    )

    print("\n🎉 ALL LANE-5 VERIFICATION CHECKS PASSED!")


if __name__ == "__main__":
    main()
