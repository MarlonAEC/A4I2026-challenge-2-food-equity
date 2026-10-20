# 🚀 Team Roadmap — Challenge 2: "Uber for Food Rescue"

> **How to use this file:**
> 1. Fill in your name next to your role below.
> 2. As you complete tasks on your branch (or directly on GitHub), change `- [ ]` to `- [x]`.
> 3. Follow the **Shared JSON Contract** at the bottom so all 5 branches plug together cleanly at integration time.

---

## 👥 Team Roster & Branches
- **Shared GCP Project ID:** `qwiklabs-gcp-04-300332596f08`
- **BigQuery Dataset:** `qwiklabs-gcp-04-300332596f08.a4i_food` (Region: `US`)

| Role | Teammate Name | Git Branch | Primary Folder / Files |
| :--- | :--- | :--- | :--- |
| **1. Data & Vector Search Lead** | `@beshermahrouka` | `data` | `notebooks/`, `scripts/load.sh`, `sql/` |
| **2. ADK Agent & MCP Lead** | `@TODO_Name_2` | `agent` | `agent/agent.py`, `agent/prompt.py` |
| **3. Custom "Uber" Tools Lead** | `Andrea ✅` | `tools` | `agent/tools.py` |
| **4. Frontend & Map UI Lead** | `@braysh` | `frontend` | `app/` |
| **5. Cloud Run, QA & Pitch Lead** | `@MarlonAEC` | `deploy-story` | `Dockerfile`, `deploy.sh`, `scripts/verify_traps.py`, `docs/` |

---

## ⏱️ Phase 0: Team Kickoff (0:00 – 0:15) — *Everyone Together*

- [x] **Pick our Metro:** `chicago` *(Recommended: `chicago`, `philadelphia`, or `new-york` for high no-vehicle signal)*
- [x] **Pick our Track:** **Retail & Grocer Rescue** ("Uber for expiring restaurant & grocery pickups")
- [x] **Write our 1-sentence opening scenario:**
  > *"We coordinate food rescue in **Chicago**. A **local grocer** has just offered us **10 crates of spinach**, and it has to move within **6 hours**. Here is who we call first, why the top keyword match would have spoiled it, and who gets pinged automatically if #1 says no."*
- [x] **Git Setup:** Everyone added as a GitHub Collaborator, repo cloned in Cloud Shell, and each person checked out their branch (`git checkout -b <branch>`).

---

## 💬 Product Voice & Human Language Guide (For All 5 Lanes!)

> **Why this matters:** A busy pantry volunteer or grocer on a loading dock doesn't talk about "ingesting surplus payloads" or "cascading failovers." When our UI, Agent Prompts, Custom Tools, and Pitch Deck all speak the same simple, empathetic language, judges immediately see a tool real humans would actually use at 4 PM on a Thursday.

| What's Happening | Tech Jargon (Do NOT Use) | **Plain Human Words (Use Everywhere!)** |
| :--- | :--- | :--- |
| **Supply (Donor)** | *Post Surplus / Ingest Payload / Yield* | **"We have extra food" / Give / Donate** |
| **Urgency (Clock)** | *Interception Window / Expiry Horizon* | **"Needs to go by..." / Time Left on Clock** |
| **Coordinator Job** | *Run Vector Match / Triage & Query* | **"Find who can take it" / Match** |
| **Storage Check** | *Cold-Chain Physical Constraint Filter* | **"Can they keep it cold?" / Do they have room?** |
| **Demand (Pantry)** | *Absorption Partner / Claim Entity* | **"Who can take it" / Pantry / Community Kitchen** |
| **Transport** | *Reefer Haulage Dispatch* | **"Who will pick it up?" / Bring it / Van** |
| **Backup Flow** | *Failover Cascade to Backup Target* | **"They said no? Try next pantry"** |
| **Decoy Safeguard** | *Hard Filter Reject Decoy Exception* | **"Why we skipped Greenline: No refrigerator"** |
| **Dispatched SMS** | *Serialized Outbound Notification Payload* | **"Text message to send to the pantry"** |

---

## 🗄️ Lane 1: Data & Vector Search (`branch: data`) — `@beshermahrouka`

### Milestone 1A: Load & Validate (Target: 0:30)
- [x] Run `bash scripts/load.sh <metro>` (or `notebooks/c2_01_load_explore.ipynb`) to load `a4i_food.recipients`, `a4i_food.surplus_postings`, `a4i_food.shelf_life`, and `a4i_food.tract_demographics`.
- [x] Verify all 4 tables have rows and check distinct `profile_text` percentage.
- [x] Inspect the 4 planted judge traps in `a4i_food.recipients` (`profile_source = 'planted'`):
  - [x] Locate `Greenline Community Pantry` (near-miss decoy: wants greens, `cold_storage = 'none'`).
  - [x] Locate `Harborview Neighbors Trust` (contradiction: claims walk-in freezer AND single cupboard shelf).
  - [x] Locate `Cedar Street` & `Maple Street Produce Alliance` (genuine tie).

### Milestone 1B: Embeddings & Vector Search SQL (Target: 0:45 — *Unblocks Lane 2 & 3!*)
- [x] Create Cloud Resource Connection & Embedding Model (`gemini-embedding-2`) in the same region (`US`).
- [x] Materialize embeddings on `a4i_food.recipients` (`profile_text`) and `a4i_food.shelf_life`.
- [x] Save working `VECTOR_SEARCH` SQL query in `sql/match_recipients.sql` (`options => '{"use_brute_force":true}'`) joined with:
  - [x] `ST_DISTANCE` from donor `(lat, lon)` to recipient `(zip_lat, zip_lon)`
  - [x] Nearest census tract in `a4i_food.tract_demographics` (`poverty_rate`, `pct_no_vehicle`)
- [x] Share the working SQL query with **Lane 2** and **Lane 3**.

### Milestone 1C: Equity Audit for Judges (Target: 2:30)
- [x] Run our matcher across all 10 offers in `a4i_food.surplus_postings`.
- [x] Compare the matched recipients' average `poverty_rate` and `pct_no_vehicle` against the metro-wide average.
- [x] Save numbers in `docs/equity_audit.md` and hand off to **Lane 5** for the slide deck.

### Milestone 1D: "Rescue Deserts" & Spatial Equity Analysis (Going Further — 25% Rigor Score)
- [x] Cross-reference census tracts in Cook County with matched pantry locations to identify **"Rescue Deserts"** (tracts with `poverty_rate > 30%` and `pct_no_vehicle > 40%` that have 0 verified cold-storage recipients within a 5 km radius).
- [x] Document the structural infrastructure deficit: articulate for judges why food rescue algorithms cannot solve food access without municipal investments in cold chain / walk-in coolers.
- [x] Export spatial equity metrics into `docs/equity_audit.md` for Lane 4 (map layer) and Lane 5 (pitch deck).

---

## 🧠 Lane 2: ADK Agent & MCP (`branch: agent`) — `@TODO_Name_2`

### Milestone 2A: Agent Skeleton & MCP Connection (Target: 0:45)
- [x] Create `agent/__init__.py` and `agent/agent.py` with `root_agent` using `gemini-2.5-flash`.
- [x] Verify agent launches cleanly in `adk web`.
- [x] Connect at least **1 Google-managed MCP server** (**MCP Toolbox for Databases**, serving BigQuery `execute_sql`/`get_table_info`/`list_dataset_ids`/etc. via `agent/mcp_tools.yaml`; verified live locally and in CI — `.github/workflows/lane2-mcp.yml`).

### Milestone 2B: System Prompt & Tool Wiring (Target: 1:30)
- [x] Write system instructions in `agent/prompt.py` requiring the **7-Part Match Brief**:
  1. Primary Organization (`NAME` + street address)
  2. Why Them (quote/reason from `profile_text`)
  3. Capacity Fit (`cold_storage`, `frozen_storage`, `max_pallets` vs. offer)
  4. The Clock & Safety Margin (donor deadline vs. `shelf_life` hours vs. `pickup_window_hours`)
  5. Who It Helps (`tract_demographics` poverty & no-vehicle %)
  6. Ready-to-Send Pickup Alert Message
  7. Backups #2 and #3 ("If They Say No") + Rejected Decoys warning
- [x] Plug in **Lane 3's** custom tools from `agent/tools.py`.
- [x] Connect `run_equity_audit_across_postings` into `tools_list` in `agent/agent.py` so the agent can execute real-time Responsible AI audits on demand.

### Milestone 2C: Coordinator Q&A Verification (Target: 2:15)
- [x] Test all coordinator questions from `README.md` (7 original + Responsible AI audit):
  - [x] *"Who can take 10 crates of spinach and collect before 8pm?"*
  - [x] *"Why them and not the other pantry?"* (explains why `Greenline` decoy was rejected)
  - [x] *"They said no. Who's next?"* (promotes Backup #2)
  - [x] *"How long does spinach actually last?"* (cites `shelf_life` + consumer guidance caveat)
  - [x] *"Can they pick it up themselves or do we need a driver?"* (`refrigerated_transport`)
  - [x] *"Whose neighborhood does this help?"* (`tract_demographics`)
  - [x] *"Write the pickup message."*
  - [x] *"Run an equity audit across our dispatches — are we favoring loading docks over high-need tracts?"* (cites live `run_equity_audit_across_postings` findings)

### Milestone 2D: Conversational Pantry Intake Agent (Going Further — "The 4-Hour Add-on")
- [x] Implement conversational intake prompt / subagent (`agent/intake.py`):
  - [x] Interviews a new pantry coordinator conversationally: *"What kind of cold storage do you have?"* -> follow-up: *"Can you take a pallet off a truck, or does it need hand-carry boxes through a regular door?"*
  - [x] Generates structured schema (`cold_storage`, `max_pallets`, `pickup_window_hours`, `refrigerated_transport`) and synthesizes `profile_text`.
  - [x] Appends new recipient to `a4i_food.recipients`, calls `AI.EMBED` (or offline fallback), making the pantry immediately searchable in the demo!

---

## 🛠️ Lane 3: Custom "Uber Logistics" Tools (`branch: tools`) — `Andrea ✅`

### Milestone 3A: Shelf-Life Clock Tool (Target: 1:00)
- [x] Build `check_shelf_life_clock(food_description, donor_deadline_hours)` in `agent/tools.py`:
  - [x] Searches `a4i_food.shelf_life` via vector/text search (handles `"Spinach"` living under `"Lettuce"` subtitle!).
  - [x] Safely handles sentinel strings (`indefinitely`, `not recommended`, `package use-by date`, `when ripe`) so they never become `0` hours.
  - [x] Returns `effective_window_hours = min(donor_deadline_hours, usda_hours)`.

### Milestone 3B: Smart Match, Filter & Tie-Breaker Tool (Target: 1:30)
- [x] Build `find_and_rank_recipients(...)` in `agent/tools.py`:
  - [x] Calls **Lane 1's** `VECTOR_SEARCH` SQL to get top 15 semantic candidates.
  - [x] **Hard Filter 1 (Cold Chain):** If perishable/frozen, reject `cold_storage == 'none'` (catches `Greenline Community Pantry` decoy and saves it in `rejected_decoys` list so the UI/agent can show *why* it was blocked!).
  - [x] **Hard Filter 2 (Contradiction Check):** Flag/reject `Harborview Neighbors Trust` where `profile_text` contradicts `cold_storage`.
  - [x] **Hard Filter 3 (Clock & Volume):** Check `pickup_window_hours <= effective_window_hours` and `max_pallets` (or propose a multi-pantry split if load is huge).
  - [x] **Defensible Tie-Breaker:** Rank valid candidates using semantic score + distance + `tract_demographics` (`poverty_rate` & `pct_no_vehicle`) so `Cedar Street` vs. `Maple Street` is broken on real neighborhood need.

### Milestone 3C: Cascading Uber Dispatch Tool (Target: 2:00)
- [x] Build `dispatch_pickup_and_fallback(posting_id, declined_recipient_ids=[])` in `agent/tools.py`:
  - [x] Formats the ready-to-send SMS/email dispatch card for the highest-ranked non-declined recipient.
  - [x] Supports instant re-dispatch to Backup #2 / #3 when #1 declines.

### Milestone 3D: Dual Routing Policy & Multi-Pantry Split Tool (Going Further)
- [x] Add `routing_policy` toggle (`"logistics_first"` vs. `"equity_weighted"`) in `agent/tools.py`:
  - [x] **Logistics-First Mode (Default):** Prioritizes largest intake capacity and fastest pickup window.
  - [x] **Equity-Weighted Mode:** Strongly boosts pantries situated in severe transit-desert tracts (`pct_no_vehicle > 35%` or `poverty_rate > 25%`).
- [x] Implement Multi-Pantry Load Splitting for large bulk farm offers (e.g., 5 tons of potatoes / 10 pallets):
  - [x] When `pallets_offered > top_recipient.max_pallets`, automatically partition the load across 2–3 nearby neighborhood pantries.
  - [x] Output a grouped allocation schedule with individual tailored dispatch messages.

### Milestone 3E: Real-Time openFDA Food Safety Guardrail (Going Further — CC0 External API)
- [x] Implement `check_food_recalls(product_name)` in `agent/tools.py` using openFDA Food Enforcement API (`https://api.fda.gov/food/enforcement.json`):
  - [x] Checks incoming surplus postings for active food recall alerts (e.g., listeria in bagged spinach, undeclared allergens).
  - [x] Halts or flags high-risk surplus items before dispatching to community pantries.

### Milestone 3F: Real-Time Traffic & Congestion Calculator (Going Further — Civic Open Data)
- [ ] Implement `calculate_transit_time_with_traffic(...)` and `get_chicago_traffic_congestion(...)` in `agent/tools.py`:
  - [ ] Queries live traffic conditions (City of Chicago Live Traffic Tracker API `https://data.cityofchicago.org/resource/8v9j-b3ed.json` with fallback to Google Maps Routes / OSRM and peak rush-hour grid congestion curve).
  - [ ] Computes exact driving transit time, average speed, and congestion delay (e.g. +14 min delay).
  - [ ] Adjusts pantry collection window and safety margin (`margin_hours`), alerting coordinators when traffic threatens perishable shelf-life windows.

---

## 🖥️ Lane 4: Frontend UI & Story Lead (`branch: frontend`) — `@braysh`

### Milestone 4A: Clean Human UI Layout (Target: 1:15)
- [x] Build `app/` using the **Shared JSON Contract** & **Product Voice Guide**:
  - [x] **Donor Post Panel ("We have extra food"):** 1-click scenario buttons ("Grocer Spinach Call" with 6h clock) + simple description & deadline inputs.
  - [x] **Live City Map:** Leaflet map showing Donor pin, Match #1 (Green), Backups #2 & #3 (Amber), and Blocked Decoys (Red). *(built as: red pins show once the matcher sends their location)*
  - [x] **Match Brief Card:** Simple traffic-light checks (❄️ Can keep cold?, 🚐 Can pick up?, ⏱️ Time margin safe?, 📍 Who it feeds).
  - [x] **"They Said No" Action:** `[❌ They said no — Show who's next]` immediately activates and displays Backup #2.
  - [x] **Safeguard Inspector Card:** Simple explanation ("Why we skipped Greenline: wants greens, but has no refrigerator").

### Milestone 4B: Live Backend Connection & Story Integration (Target: 2:15)
- [x] Connect UI to `POST /api/match` FastAPI endpoint.
- [ ] Add interactive preview for Slide 5: **Conversational Pantry Intake Agent** mockup.
- [ ] Align with **Lane 5** on the 5-Slide Pitch Deck and 3-minute video recording.

### Milestone 4C: Live Equity Audit Dashboard & Policy Switch (Going Further)
Blocked: needs an endpoint that does not exist yet (`/api/equity-audit`).
- [ ] Add an interactive **"📊 Live Equity Audit & Baseline Comparison"** view/modal in `app/main.py`:
  - [ ] Connects to `/api/equity-audit` (backed by `run_equity_audit_across_postings()`).
  - [ ] Displays live comparison badges: Matched Cohort (16.4% poverty, 25.8% transit insecure) vs. Metro Baseline (17.0% poverty, 21.9% transit insecure) -> **+3.9% lift in reaching vehicle-insecure households!**
  - [ ] Visual indicator highlighting matches in high-vulnerability tracts (>40% poverty, >50% no-car).
- [ ] Add a **Routing Policy Toggle Switch** in the UI (`[ ⚡ Logistics First ]` vs. `[ 🎯 Equity-Weighted ]`) so coordinators can see how ranking shifts between warehouse loading docks and high-need community storefronts.

### Milestone 4D: Conversational Pantry Onboarding Modal (Going Further)
Blocked: needs an endpoint that does not exist yet (intake agent over HTTP).
- [ ] Add a "Register New Pantry" modal in `app/main.py`:
  - [ ] Coordinator enters natural-language description (e.g. *"St. Jude Pantry in Pilsen, walk-in cooler, no loading dock"*).
  - [ ] Wires to Lane 2's intake agent endpoint, saves new recipient, and proves they appear immediately in subsequent vector searches.

### Milestone 4E: Live Traffic Congestion & Delay Badge (Going Further)
- [ ] Display real-time traffic status pill and route delay on Match card (e.g. `🚗 Congestion: Moderate (+9 min delay) · Live City of Chicago Traffic Tracker`).
- [ ] Display traffic-aware transit time and ETA in Recipient Smartphone Simulator SMS and driver dispatch badge.

---

## 🚢 Lane 5: Cloud Run Deploy, Trap QA & Pitch (`branch: deploy-story`) — `@MarlonAEC`

### Milestone 5A: Early Cloud Run Deployment (Target: 2:00)
- [x] Create `Dockerfile` and `deploy.sh` (`gcloud run deploy --min-instances=1`).
- [x] Deploy initial container to **Google Cloud Run** (`bash deploy.sh`) and share live URL with the team.

### Milestone 5B: Judge Trap QA Checklist (Target: 3:00)
- [x] Verify **Trap 1 (Decoy):** Spinach posting ranks a real refrigerated pantry #1 and explicitly shows `Greenline Community Pantry` rejected due to `cold_storage = 'none'` (`scripts/verify_traps.py`).
- [x] Verify **Trap 2 (Contradiction):** `Harborview Neighbors Trust` is flagged for contradicting itself (`scripts/verify_traps.py`).
- [x] Verify **Trap 3 (Ties):** `Cedar Street` vs. `Maple Street` tie-breaker explains the neighborhood/distance reason (`scripts/verify_traps.py`).
- [x] Verify **Trap 4 ("They Said No"):** Declining #1 smoothly promotes #2 with a new outreach message (`scripts/verify_traps.py`).

### Milestone 5C: Pitch Deck, Video Recording & Submission (Target: 3:30 – 4:15)
- [ ] **Slide 1:** The Problem, our City (Chicago: 183 orgs, 20% no-vehicle rate), and our Opening Scenario.
- [ ] **Slide 2:** Architecture (ADK + Gemini 2.5 Flash + BigQuery `VECTOR_SEARCH` + Managed MCP Toolbox + Custom Constraint Tools on Cloud Run).
- [ ] **Slide 3:** Why Vector Search Alone Fails (Live proof catching the `Greenline` decoy + cascading backup dispatch).
- [ ] **Slide 4: Data Rigor & Equity Audit (25% Rigor Score!):**
  - [ ] **Responsible AI Design:** Explain why race/ethnicity was deliberately excluded as an input feature (structural proxies vs. causal drivers) and evaluated strictly in the output audit.
  - [ ] **Need vs. Loading Docks Trade-off:** Present real findings from `docs/equity_audit.md`—bulk farm produce must route to industrial corridors with docks (6%–9% poverty), while immediate prepared meals and diapers route to severe transit-desert tracts (40%–45% poverty, 54%–68% transit insecure, +3.9% metro lift).
  - [ ] **Honest Limitations:** FoodKeeper is consumer guidance, ZIP-centroid coordinates, transactional store (Firestore/Cloud SQL) needed for claim locking.
- [ ] **Slide 5: Going Further (The Winning Edge):**
  - [ ] Conversational Pantry Intake Agent to solve the national lack of public pantry capacity data.
  - [ ] Multi-pantry load splitting (the 5-ton potato problem).
  - [ ] openFDA food safety recall guardrail.
- [ ] **Record Narrated Pitch Video** (screen-share walking through live demo + equity audit tab + slides).
- [ ] **Upload all 4 items to Portal (`https://portal.angelhack.com/a4i-console`):**
  - [ ] 1. GitHub Repo Link
  - [ ] 2. Google Skills / Qwiklabs Project Link
  - [ ] 3. Pitch Deck
  - [ ] 4. Pitch Video

---

## 🤝 Shared JSON Contract (Between Backend Lanes 2/3 & Frontend Lane 4)

Use this structure so **Lane 4** can build the UI immediately while **Lanes 2 & 3** wire the agent:

```json
{
  "posting_summary": {
    "food_item": "Fresh spinach (10 crates)",
    "pallets_estimate": 1,
    "requires_cold_storage": true,
    "requires_frozen": false,
    "donor_deadline_hours": 6,
    "usda_shelf_life_hours": 168,
    "effective_window_hours": 6,
    "shelf_life_note": "Matched USDA FoodKeeper 'Lettuce (spinach)' - consumer home-storage guidance.",
    "routing_policy": "equity_weighted"
  },
  "matches": [
    {
      "rank": 1,
      "recipient_id": 14,
      "name": "WESTSIDE COMMUNITY KITCHEN",
      "street": "1420 W MADISON ST",
      "city": "CHICAGO",
      "zip_code": "60607",
      "lat": 41.8819,
      "lon": -87.6624,
      "distance_km": 2.4,
      "cold_storage": "commercial",
      "frozen_storage": true,
      "refrigerated_transport": true,
      "max_pallets": 3,
      "pickup_window_hours": 3,
      "margin_hours": 3,
      "why_them": "Has commercial walk-in cooler, own refrigerated van for pickup within 3 hours (3h safety margin), and high need for salad greens.",
      "equity_context": {
        "poverty_rate": 31.4,
        "pct_no_vehicle": 26.8
      },
      "draft_message": "URGENT PICKUP AVAILABLE: 10 crates (~1 pallet) of fresh spinach available now at 2.4 km away. Must be collected within 6h (fits your 3h reefer van window). Reply ACCEPT to claim."
    }
  ],
  "rejected_decoys": [
    {
      "name": "Greenline Community Pantry",
      "semantic_rank": 1,
      "rejection_reason": "Matched #1 on meaning ('wants fresh greens and salad vegetables'), but BLOCKED by constraint filter: cold_storage='none' (no refrigeration)."
    }
  ],
  "equity_audit_summary": {
    "metro_baseline_poverty_pct": 17.0,
    "metro_baseline_no_vehicle_pct": 21.9,
    "matched_cohort_poverty_pct": 16.4,
    "matched_cohort_no_vehicle_pct": 25.8,
    "transit_insecurity_lift_pct": 3.9,
    "audit_verdict": "Intelligently balances cold-chain logistics for bulk produce with direct equity routing to severe transit-desert tracts (+3.9% lift)."
  }
}
```
