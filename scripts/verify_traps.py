#!/usr/bin/env python3
"""Lane 5 (Deploy & QA Lead): Automated Verification Suite for All 4 Planted Judge Traps.

Can be run locally against `agent/tools.py` OR against a live Cloud Run URL:
    python3 scripts/verify_traps.py
    python3 scripts/verify_traps.py https://food-rescue-broker-xxxx.run.app
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
    dispatch_pickup_and_fallback,
    find_and_rank_recipients,
)


def query_match(base_url: str | None, posting_text: str, declined: list[str] | None = None) -> dict:
    declined = declined or []
    if not base_url:
        clock = check_shelf_life_clock(posting_text, donor_deadline_hours=6.0)
        res = find_and_rank_recipients(
            posting_text=posting_text,
            pallets_offered=1,
            donor_deadline_hours=clock["effective_window_hours"],
            requires_cold_storage=True,
            requires_pickup_van=True,
            declined_recipient_names=declined,
        )
        res["clock"] = clock
        return res

    url = base_url.rstrip("/") + "/api/match"
    payload = json.dumps({
        "posting_text": posting_text,
        "pallets_offered": 1,
        "donor_deadline_hours": 6.0,
        "requires_cold_storage": True,
        "requires_pickup_van": True,
        "declined_recipient_names": declined,
    }).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main():
    base_url = sys.argv[1] if len(sys.argv) > 1 else None
    target_label = base_url or "local agent/tools.py"
    print(f"=== Running Lane 5 Judge-Trap Verification against: {target_label} ===\n")

    offer = "10 crates of fresh spinach, harvested yesterday, needs cold storage"
    result = query_match(base_url, offer)

    matches = result["matches"]
    decoys = {d["name"]: d for d in result["rejected_decoys"]}

    # Trap 1: Near-miss decoy (Greenline Community Pantry) must be blocked!
    assert "Greenline Community Pantry" in decoys, "FAIL: Greenline Community Pantry decoy was not blocked!"
    assert "cold_storage='none'" in decoys["Greenline Community Pantry"]["rejection_reason"], (
        "FAIL: Greenline rejection reason missing cold_storage='none'"
    )
    print("✅ [PASS] Trap 1 (Near-Miss Decoy): 'Greenline Community Pantry' blocked despite #1 semantic rank.")

    # Trap 2: Contradiction (Harborview Neighbors Trust) must be blocked!
    assert "Harborview Neighbors Trust" in decoys, "FAIL: Harborview Neighbors Trust contradiction was not blocked!"
    print("✅ [PASS] Trap 2 (Profile Contradiction): 'Harborview Neighbors Trust' flagged and blocked.")

    # Trap 3: Genuine Ties (Cedar Street vs Maple Street Produce Alliance) broken on tract need & distance
    top_names = [m["name"] for m in matches]
    assert top_names[0] == "Cedar Street Produce Alliance", (
        f"FAIL: Expected Cedar Street Produce Alliance at #1, got {top_names[0]}"
    )
    assert top_names[1] == "Maple Street Produce Alliance", (
        f"FAIL: Expected Maple Street Produce Alliance at #2, got {top_names[1]}"
    )
    print(
        f"✅ [PASS] Trap 3 (Genuine Tie-Breaker): '{matches[0]['name']}' ranked #1 over "
        f"'{matches[1]['name']}' via tract poverty ({matches[0]['equity_context']['poverty_rate']}%) & distance."
    )

    # Trap 4: "They Said No" cascading fallback promotes Backup #2 to #1
    rerouted = query_match(base_url, offer, declined=["Cedar Street Produce Alliance"])
    new_top = rerouted["matches"][0]["name"]
    assert new_top == "Maple Street Produce Alliance", (
        f"FAIL: After Cedar Street declined, expected Maple Street at #1, got {new_top}"
    )
    print(f"✅ [PASS] Trap 4 ('They Said No' Fallback): Declining #1 automatically promoted '{new_top}' to #1.")

    # Clock check: Spinach matched to Lettuce subtitle in USDA FoodKeeper
    clock = result["clock"]
    assert "Lettuce" in clock["matched_usda_product"], "FAIL: Spinach did not match USDA Lettuce entry!"
    print(
        f"✅ [PASS] USDA Shelf-Life Clock: Spinach matched '{clock['matched_usda_product']}' "
        f"({clock['usda_shelf_life_hours']}h shelf life, capped at {clock['effective_window_hours']}h donor deadline)."
    )

    print("\n🎉 ALL 5 LANE-5 VERIFICATION CHECKS PASSED!")


if __name__ == "__main__":
    main()
