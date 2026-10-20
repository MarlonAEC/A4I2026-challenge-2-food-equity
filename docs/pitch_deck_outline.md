# Lane 5: 5-Slide Pitch Deck & Recorded Demo Script

> **Crucial Reminder from README:** Judges grade asynchronously from your uploaded Deck + Recorded Pitch Video (no live Q&A). Make sure the narrator says the bolded points out loud during the screen-share!

---

## Slide 1: The Scenario & Ticking Clock
- **Metro:** Chicago (`a4i_food`) — 183 food-rescue organizations, 20% of households without a vehicle.
- **Track:** Retail & Grocer Rescue ("Uber for expiring restaurant & grocery pickups").
- **Opening Hook:** *"At 2:10 PM in Chicago, a grocer pulls 10 crates of fresh spinach off the shelf. It has 6 hours before the compactor truck arrives. Our agent answers the 4 questions needed to save it—who wants it, who can refrigerate it, who has a reefer van to pick it up in time, and whose neighborhood needs it most—in under 5 seconds."*

## Slide 2: 100% Google Stack Architecture
- **ADK + Gemini 2.5 Flash** (`agent/agent.py`)
- **BigQuery `VECTOR_SEARCH` + `gemini-embedding-2`** (`sql/match_recipients.sql`)
- **Managed BigQuery MCP / MCP Toolbox** + **3 Custom Python Tools** (`agent/tools.py`)
- **Cloud Run** (`--min-instances=1` for zero cold start)

## Slide 3: Why Vector Search Alone Fails (Catching the Judge Traps)
- **Trap 1 Caught (`Greenline Community Pantry`):** Ranked #1 by semantic search because they ask for *"fresh greens and salad vegetables"*—but our post-search constraint filter blocks them because `cold_storage = 'none'`.
- **Trap 2 Caught (`Harborview Neighbors Trust`):** Flagged for contradicting itself (claims walk-in freezer in sentence 1, single cupboard shelf in sentence 2).
- **Trap 3 Solved (`Cedar Street` vs. `Maple Street Produce Alliance`):** Both have identical capacity; our agent breaks the tie using `tract_demographics` (`poverty_rate` & `pct_no_vehicle`) + distance.
- **"They Said No" Solved:** Live button re-dispatches to Backup #2 in one click.

## Slide 4: Data Honesty, Equity Audit & Limitations (25% Rigor Score!)
- **Which half of the data is real?**
  - **Real:** Organization names, EINs, street addresses, NTEE codes, and `reported_income` come from the **IRS Exempt Organizations Business Master File**.
  - **Generated:** Operational attributes (`cold_storage`, `max_pallets`, `pickup_window_hours`, `profile_text`) are synthesized from 14 archetypes seeded by EIN because no public database in the US tracks pantry fridge capacity.
- **Equity Audit Results (`sql/equity_audit.sql`):** Compare our matched recipients' tract poverty rate and no-vehicle rate against the Chicago baseline.
- **Honest Limitations:**
  1. `shelf_life` (USDA FoodKeeper) is consumer home-storage freshness guidance, not a commercial pathogen cold-chain guarantee.
  2. Recipient coordinates are ZIP-centroids (`zip_lat`, `zip_lon`).
  3. BigQuery is an analytics warehouse—preventing two drivers from claiming the same pallet simultaneously requires a transactional store like **Firestore** or **Cloud SQL**.

## Slide 5: Going Further — Conversational Pantry Intake Agent
- Because pantry operational capacity isn't public anywhere in the US, our next step is an **ADK Conversational Intake Agent** that interviews new pantries (*"Can you take a full pallet, or hand-carry only?"*), writes their `profile_text`, embeds it into BigQuery, and makes them immediately searchable.
