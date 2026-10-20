#!/usr/bin/env python3
"""Generate Match Brief Markdown files from the live matcher.

With no arguments, runs all 10 canonical surplus postings and writes one brief per posting to
`briefs/`, plus `briefs/README.md` linking them. Pass `--posting` (repeatable) to brief your own
offers instead.

    python3 scripts/generate_match_briefs.py
    python3 scripts/generate_match_briefs.py --posting "40 lbs of chicken thighs, frozen" --hours 10
    python3 scripts/generate_match_briefs.py --donor-address "1200 W Fulton Market" --out /tmp/briefs
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from agent.brief import build_match_brief, to_markdown  # noqa: E402
from agent.tools import CANONICAL_SURPLUS_POSTINGS, find_and_rank_recipients  # noqa: E402


def _slug(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:48].rstrip("-")


def main() -> int:
    parser = argparse.ArgumentParser(description="Write Match Brief .md files for surplus postings.")
    parser.add_argument("--posting", action="append", default=[], help="Offer text (repeatable). Default: the 10 canonical postings.")
    parser.add_argument("--hours", type=float, default=0.0, help="Donor deadline in hours for --posting offers (0 = infer from text).")
    parser.add_argument("--pallets", type=int, default=0, help="Pallets offered for --posting offers (0 = infer from text).")
    parser.add_argument("--donor-address", default="", help="Pickup address to put in the outreach message.")
    parser.add_argument("--routing-policy", default="equity_weighted", choices=["equity_weighted", "logistics_first"])
    parser.add_argument("--out", type=Path, default=ROOT / "briefs", help="Output directory (default: briefs/).")
    args = parser.parse_args()

    if args.posting:
        postings = [
            {"posting_id": i, "track": "CUSTOM", "posting_text": text, "hours_available": args.hours}
            for i, text in enumerate(args.posting, start=1)
        ]
    else:
        postings = CANONICAL_SURPLUS_POSTINGS

    args.out.mkdir(parents=True, exist_ok=True)
    index = ["# Match Briefs", "", "| # | Track | Offer | #1 match | Backend |", "|---|---|---|---|---|"]
    for p in postings:
        result = find_and_rank_recipients(
            posting_text=p["posting_text"],
            donor_deadline_hours=float(p.get("hours_available") or 0),
            pallets_offered=args.pallets if args.posting else 0,
            routing_policy=args.routing_policy,
        )
        brief = build_match_brief(result, donor_address=args.donor_address)
        name = f"{int(p['posting_id']):02d}-{_slug(brief['posting']['title'])}.md"
        (args.out / name).write_text(to_markdown(brief), encoding="utf-8")

        top = brief["options"][0]["name"] if brief["options"] else "no viable match"
        backend = "live" if result.get("search_backend") == "bigquery_vector_search" else "**demo data**"
        index.append(f"| {p['posting_id']} | {p['track']} | [{p['posting_text']}]({name}) | {top} | {backend} |")
        print(f"wrote {args.out / name}  ->  {top}")

    (args.out / "README.md").write_text("\n".join(index) + "\n", encoding="utf-8")
    print(f"wrote {args.out / 'README.md'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
