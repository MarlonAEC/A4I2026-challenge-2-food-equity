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
| **4. Frontend & Map UI Lead** | `@TODO_Name_4` | `frontend` | `app/` |
| **5. Cloud Run, QA & Pitch Lead** | `@MarlonAEC` | `deploy-story` | `Dockerfile`, `deploy.sh`, `scripts/verify_traps.py`, `docs/` |

---

## ⏱️ Phase 0: Team Kickoff (0:00 – 0:15) — *Everyone Together*

- [x] **Pick our Metro:** `chicago` *(Recommended: `chicago`, `philadelphia`, or `new-york` for high no-vehicle signal)*
- [x] **Pick our Track:** **Retail & Grocer Rescue** ("Uber for expiring restaurant & grocery pickups")
- [x] **Write our 1-sentence opening scenario:**
  > *"We coordinate food rescue in **Chicago**. A **local grocer** has just offered us **10 crates of spinach**, and it has to move within **6 hours**. Here is who we call first, why the top keyword match would have spoiled it, and who gets pinged automatically if #1 says no."*
- [x] **Git Setup:** Everyone added as a GitHub Collaborator, repo cloned in Cloud Shell, and each person checked out their branch (`git checkout -b <branch>`).

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

### Milestone 2C: Coordinator Q&A Verification (Target: 2:15)
- [ ] Test all 7 coordinator questions from `README.md`:
  - [ ] *"Who can take 10 crates of spinach and collect before 8pm?"*
  - [ ] *"Why them and not the other pantry?"* (explains why `Greenline` decoy was rejected)
  - [ ] *"They said no. Who's next?"* (promotes Backup #2)
  - [ ] *"How long does spinach actually last?"* (cites `shelf_life` + consumer guidance caveat)
  - [ ] *"Can they pick it up themselves or do we need a driver?"* (`refrigerated_transport`)
  - [ ] *"Whose neighborhood does this help?"* (`tract_demographics`)
  - [ ] *"Write the pickup message."*

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

---

## 🖥️ Lane 4: Frontend "Uber Dispatch" UI (`branch: frontend`) — `@TODO_Name_4`

### Milestone 4A: UI Layout with Mock Data (Target: 1:15)
- [ ] Build `app/` using the **Shared JSON Contract** below (don't wait for backend!):
  - [ ] **Donor Post Panel:** 3 one-click demo scenario buttons + free-text input + coordinator follow-up chat box.
  - [ ] **Live City Map:** Shows Donor pin, Match #1 (Green), Backups #2 & #3 (Amber), and Blocked Decoy (Red/Gray).
  - [ ] **Match Brief & Dispatch Panel:** Displays countdown clock badge, capacity badges (`🚐 Has Reefer Van`, `❄️ Walk-in Cooler`), equity stats, and drafted SMS message.
  - [ ] **"They Said No" Button:** Clicking `[❌ Decline Pickup -> Ping Backup #2]` animates/switches the active dispatch to #2 immediately.

### Milestone 4B: Connect Live Agent Backend (Target: 2:15)
- [ ] Wire UI to **Lane 2's** ADK agent runner / FastAPI endpoint.
- [ ] Test end-to-end flow on the presentation laptop.

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
- [ ] **Slide 1:** The Problem, our City, and our Opening Scenario.
- [ ] **Slide 2:** Architecture (ADK + Gemini + BigQuery `VECTOR_SEARCH` + Managed MCP + Custom Constraint Tools on Cloud Run).
- [ ] **Slide 3:** Why Vector Search Alone Fails (Live proof catching the `Greenline` decoy + cascading backup dispatch).
- [ ] **Slide 4:** Data Rigor & Equity Audit (Real IRS BMF orgs/income vs. generated operational profiles + **Lane 1's** 10-posting Equity Audit numbers + Honest Limitations: FoodKeeper is consumer guidance, ZIP-centroid locations, Firestore needed for claim locking).
- [ ] **Slide 5:** Going Further (Conversational Pantry Intake Agent to collect real pantry capacity data).
- [ ] **Record Narrated Pitch Video** (screen-share walking through the live demo + slides).
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
    "shelf_life_note": "Matched USDA FoodKeeper 'Lettuce (spinach)' - consumer home-storage guidance."
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
  ]
}
```
