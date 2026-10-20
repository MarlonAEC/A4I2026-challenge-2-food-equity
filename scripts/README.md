# scripts/

## `load.sh`

A headless fallback that reaches the same end state as `notebooks/c2_01_load_explore.ipynb`,
rebuilding all four BigQuery tables from a pre-staged snapshot in Cloud Storage.

```bash
bash scripts/load.sh                # defaults to seattle
bash scripts/load.sh philadelphia
bash scripts/load.sh --list         # show available metros
```

Invoke it with `bash`, not `./scripts/load.sh`—that way it works regardless of whether the
file arrived with its executable bit set, which depends on how your repo was created.

Safe to run repeatedly. Every table load uses `--replace`, so the script is idempotent and
interrupting it breaks nothing.

**Use the notebook if you can.** This script gets you the tables without the teaching, and one
piece of that teaching—which half of the recipient data is real and which half is generated—is
something judges look for directly.

## `generate_match_briefs.py`

Writes a Match Brief as Markdown for each posting: the #1 recipient with its address, why them,
what they can take, the clock and margin, the neighborhood it helps, a ready-to-send outreach
message, and the next two options. It runs the same `find_and_rank_recipients` the app and agent
use, so the brief never disagrees with them.

```bash
python3 scripts/generate_match_briefs.py                      # all 10 canonical postings -> briefs/
python3 scripts/generate_match_briefs.py --posting "40 lbs of frozen chicken thighs" --hours 10
python3 scripts/generate_match_briefs.py --donor-address "1200 W Fulton Market" --out /tmp/briefs
```

Each run writes `briefs/<id>-<food>.md` plus `briefs/README.md` as an index. Clock times are
computed from the moment the script runs. If BigQuery is unreachable the briefs are built from the
offline demo corpus and say so at the top. Neighborhoods come from
`data/chicago_community_areas.json` (City of Chicago community area boundaries, simplified).
