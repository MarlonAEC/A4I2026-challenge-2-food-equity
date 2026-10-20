# Deploy hand-off for Marlon (Lane 5)

> From Andrew (Lane 4). One command puts the new console on Cloud Run. Branch: `bud/deploy-handoff-0a3c52`.

## What is on this branch and why

- **The new console** (`app/static/index.html`): the map with the cards beside it. A coordinator types "We have extra food", presses **Find who can take it**, and sees the #1 pantry, the backups, and "Why we skipped Greenline: no refrigerator".
- **Lane 1's work, merged**: `sql/semantic_views.sql` (with the fixed `AI.EMBED(..., endpoint => 'gemini-embedding-2')` syntax), `queries/vector_search_reference.sql` and the equity audit.
- **A switch that keeps the demo on the demo data** (`MATCH_SOURCE`). On Cloud Run the app may now be allowed to read BigQuery. If it does, live results replace the four judge traps. Lane 1's audit shows the live #1 for spinach is Anso Child Development, not Cedar Street. `deploy.sh` now sets `MATCH_SOURCE=seeded`, so the site always shows the demo data and says **Demo data** on screen. `MATCH_SOURCE=auto bash deploy.sh` turns live BigQuery back on (and step 1 below will then likely stop on Trap 3).
- **`.gcloudignore`**, so the upload skips `.git`, notebooks, design reference files and any `.env` or credentials files.

## Deploy (Cloud Shell, logged in as the Qwiklabs student)

```bash
gcloud config set project qwiklabs-gcp-04-300332596f08
git clone https://github.com/MarlonAEC/A4I2026-challenge-2-food-equity.git && cd A4I2026-challenge-2-food-equity
git fetch origin && git checkout bud/deploy-handoff-0a3c52
bash deploy.sh
```

Already have a clone? Skip the `git clone` line and run the last two lines inside it. It takes about 5 minutes. The address stays the same: **https://food-rescue-broker-jn4tjmr2xq-uc.a.run.app/**. The new version replaces the old one.

## What deploy.sh does, step by step

| Step | What you see | If it fails, it means |
|---|---|---|
| Start | Project, service, region and `Data : MATCH_SOURCE=seeded` | "No Google Cloud project is set": run the `gcloud config set project` line above. Wrong project shown: run `PROJECT_ID=qwiklabs-gcp-04-300332596f08 bash deploy.sh`. |
| 1/4 | The 5 trap checks run on your machine and print `ALL 5 ... PASSED` | Someone changed the matching rules or the demo pantries. Don't deploy; tell Andrew. If it says Anso (or anyone other than Cedar Street) is #1, you are not on `seeded`. |
| 2/4 | Turns on Cloud Run, Cloud Build, Artifact Registry, BigQuery, Vertex AI | `PERMISSION_DENIED`: wrong Google account (`gcloud auth list`) or the lab has expired. |
| 3/4 | Uploads the code, Cloud Build builds the Dockerfile, Cloud Run starts it | Build error: open the Cloud Build log link it prints (usually a `pip install` problem). "Failed to start and listen on port 8080": the app crashed on start. Run `gcloud run services logs read food-rescue-broker --region us-central1`. |
| 4/4 | `/healthz OK`, then the 5 trap checks again, this time against the live site | `/healthz` 404: the old version is still serving. 403: the lab blocks public access, so tell the facilitator. Trap 3 fails on the live site: the switch did not reach Cloud Run (fix below). |

Fix for "live site is showing live data": `gcloud run services update food-rescue-broker --region us-central1 --update-env-vars MATCH_SOURCE=seeded`

## The one check after deploy

1. Open the live address. The spinach offer is already filled in.
2. Press **🔍 Find who can take it**.
3. Check that the badge at the top says **🧪 Demo data** and that **Cedar Street Produce Alliance** is the #1 match. The badge shows even before results load, so the #1 match is the real proof.
4. Open the **Skipped** tab. **Greenline Community Pantry** must be there: "Why we skipped Greenline: wants greens, but has no refrigerator." It also shows as a red ✕ on the map.

Badge says **Live BigQuery vector search** instead? Run the fix line above, then reload.

## The live BigQuery shot for the video

This shows that the vector search is real. Run **section 3** of `queries/vector_search_reference.sql` in the BigQuery console (paste it and press Run; this looks best on video), or in Cloud Shell:

```bash
bq query --project_id=qwiklabs-gcp-04-300332596f08 --use_legacy_sql=false <<'SQL'
SELECT base.recipient_id, base.name, base.cold_storage, base.max_pallets, base.pickup_window_hours, distance
FROM VECTOR_SEARCH(
  TABLE `a4i_food.recipient_embeddings`, 'embedding',
  (SELECT AI.EMBED('10 crates of spinach, harvested yesterday, needs cold storage, must leave dock by 8pm',
     endpoint => 'gemini-embedding-2').result AS embedding),
  top_k => 10, options => '{"use_brute_force":true}');
SQL
```

If BigQuery says `recipient_embeddings` is not found, change that one table name to `a4i_food.recipients` (Lane 1 also put the `embedding` column there; the app searches that table). Don't run section 1 on camera, because it re-embeds every pantry.

**What to say over it (plain words):**

> "This is BigQuery doing the search for real. Gemini turns the grocer's words into numbers, and vector search finds the ten pantries whose own description means the closest thing. That's only a shortlist. Meaning alone can't tell who has a fridge: look at the cold storage column. So the next step checks every pantry on the shortlist: can they keep it cold, do they have a van, can they get there before the clock runs out. Those checks pick the pantry. The app you're about to see runs on our demo set, marked **Demo data** on screen, so all four tricky cases show up every time."

## Also available (not needed for the console)

Andrew has a Track B branch, `bud/track-b-brief-8d5fc5`. It is on his machine only, not pushed and not merged. It has:

- the live search rewritten onto Lane 1's view `a4i_food.v_recipient_candidates` with real neighbourhood numbers
- `POST /api/brief`: the ADK agent writes the Match Brief, with a fixed template when Gemini can't be reached
- `GET /api/equity_audit`

Lanes 2, 3 and 5 can ask Andrew to push it if they want it. The console works without it. If you merge it, keep the `MATCH_SOURCE` check on the `if project_id ...` line in `agent/tools.py`. On Cloud Run the brief needs the service account to have **Vertex AI User**, and `BRIEF_FORCE_TEMPLATE=1` keeps the brief text the same on every run for recording.
