# `agent/tools.py` — Known Issues (Lane 3)

Review of `agent/tools.py` at commit `69cbe86` (branch `agent`), 2026-10-20. Line numbers refer to that version.

> **Status:** all 19 issues are addressed on branch `fix/tools-issues`. See [Resolution](#resolution) at the end.

**How issues were checked**
- **Confirmed (live)**: reproduced through `adk web` / direct tool calls against BigQuery project `qwiklabs-gcp-04-300332596f08`.
- **Confirmed (offline)**: reproduced with `DISABLE_BQ=1` (local fallback corpus).
- **From reading**: found in code review, not yet reproduced.

`scripts/verify_traps.py` and `python -m agent.tools` both pass, but they run offline, which is why issues 1–4 and 8 below never showed up. Run them against live BigQuery before a demo.

## Summary

| # | Severity | Issue | Lines | Status |
|---|---|---|---|---|
| 1 | High | Pickup time silently shortened to fit the clock | 1873-1876 | Confirmed (offline) |
| 2 | High | Cedar/Maple forced to the top of every ranking | 1953-1981 | Confirmed (live) |
| 3 | High | Hand-coded scores and data override live BigQuery | 1342-1350, 1422-1457, 1491-1541 | From reading; effect seen live |
| 4 | High | Fake placeholder addresses in live briefs | 1535, 2021-2030 | Confirmed (live) |
| 5 | High | Silent fallback to fake local corpus on any BigQuery error | 1489, 1547 | From reading |
| 6 | High | "Who's next?" re-ranks posting #1 by default and drops the original filters | 2107, 2176-2182 | Confirmed (offline) |
| 7 | Medium | `loading_dock` never checked; `max_pallets=0` is unmatchable | 1891 | Confirmed (offline) |
| 8 | Medium | Live shelf-life lookup picks an arbitrary product (spinach → canned goods) | 561-606 | Confirmed (live) |
| 9 | Medium | Equity audit: fixed baseline, fixed conclusion, wrong tract count, slow | 2240-2344 | Confirmed (live) |
| 10 | Medium | Greenline rejection fabricated for every cold posting | 2067-2081 | From reading |
| 11 | Medium | Posting's own deadline ignored by `check_shelf_life_clock` | 456, 302 | From reading |
| 12 | Medium | "Not recommended" room-temp storage gets the full donor window | 745-758, 776-780 | From reading |
| 13 | Medium | Loads of 2–3 pallets partly unallocated; split plan never warns about shortfall | 1945, 2045-2065 | From reading |
| 14 | Low | Declined names matched as substrings | 1774 | From reading |
| 15 | Low | Defaults that make up data when fields are missing | 1769, 1905-1913, 2019-2030 | From reading |
| 16 | Low | Logic that only works for the 10 sample postings / named orgs | 313-318, 421-422, 430-432, 1588 | From reading |
| 17 | Low | Unbounded BigQuery calls and swallowed errors | 583, 605, 2157-2161, 2294-2299 | From reading |
| 18 | Low | `_normalize_pct` misreads small percentages | 1624-1636 | From reading |
| 19 | Low | Dead code | 36, 2347, 2351 | From reading |

---

## High

### 1. Pickup time silently shortened to fit the clock — `1873-1876`
If a recipient with a refrigerated van needs up to 2 h more than the effective window, the code doesn't reject them. It replaces their stated pickup time with `effective_window - 1` and reports that made-up number in `pickup_window_hours`, `margin_hours`, `why_them`, and the SMS ("fits your 2h reefer van window").

- **Repro (offline):** `find_and_rank_recipients("10 crates of spinach, needs cold storage", donor_deadline_hours=3)` → Cedar Street (needs 4 h) is shown as "pickup 2h, margin 1h". The food would actually arrive an hour after it's no longer safe.
- If `effective_window < 1`, the replacement is `1`, which is still longer than the window.
- The comment says this is about volunteer drivers, but the code applies it to `has_reefer`.
- **Fix:** reject when `pickup_win > effective_window`, and never overwrite the recipient's stated window.

### 2. Cedar/Maple forced to the top of every ranking — `1953-1981`
Whenever both Cedar Street and Maple Street pass the filters, the list is rebuilt as `[winner, runner_up] + others`, so both go above every other candidate whatever their `composite_score`. If only Maple passes, it's forced to #1 (`1978-1981`).

- **Repro (live):** `run_equity_audit_across_postings()` matches **Cedar Street for all 10 postings**, including diapers, sealed infant formula and clinic supplements. The audit's "+19.4 pts poverty" result is just Cedar's census tract.
- The tie-break note (`1967-1975`) always says "both have walk-in coolers, reefer vans, loading docks, 10-pallet capacity, and serve ~600 households/wk", whatever the data says.
- **Fix:** delete the reordering. If an explicit tie-break is wanted, apply it only when two composite scores are within a small epsilon, and build the note from the actual fields.

### 3. Hand-coded scores and data override live BigQuery — `1342-1350`, `1422-1457`, `1491-1541`
The "BigQuery VECTOR_SEARCH" ranking isn't what decides the order:
- **Scores:** `semantic_score = max(BigQuery similarity, local keyword score)` (`1540`). The local scorer forces Greenline to `0.96` and Cedar/Maple to `0.89` (`1342-1350`), so "Greenline ranks #1 on meaning" comes from code, not from the embeddings.
- **Injected rows:** `planted_extra` adds every `profile_source = 'planted'` row to **every** query at a fixed distance of `0.25` (similarity 0.75). That is above many real embedding similarities, so demo organizations push out real ones, even for diapers.
- **Overwritten data:** for 5 named organizations, `planted_enrichments` overwrites `pickup_window_hours`, `refrigerated_transport`, `poverty_rate` and `no_vehicle_rate` with fixed values even when BigQuery has data (`1535`).
- **Effect seen live:** after two declines, Ridgeway (0 h margin, no van) ranked above Shakespear Rose (own van, 2 h margin, 44.7% poverty), because semantic score is 40% of `composite_score`.
- **Fix:** use the BigQuery similarity as-is, drop `planted_extra`, and fix the demo rows in the `recipients` table instead of patching them at query time.

### 4. Fake placeholder addresses in live briefs — `1535`, `2021-2030`
All 9 `profile_source = 'planted'` rows in BigQuery have `street = ''` (checked: 9/9 empty, 0 NULL). The enrichment only fills fields that are `None` (`1535`), so `''` passes through. Output then falls back to `"METRO CENTER AVE"`, `"CHICAGO"` and `"60607"` (`2021-2023`).

- **Repro (live):** the spinach brief lists Cedar, Maple and Ridgeway all at "METRO CENTER AVE, Chicago, IL 60607", and a coordinator would send a driver there.
- **Fix:** fill the real addresses into BigQuery, treat `''` as missing, and return `null` rather than a made-up address so the agent can say the address is unknown.

### 5. Silent fallback to fake local corpus on any BigQuery error — `1489`, `1547`
Any exception in the vector search, including the 12 s timeout on a slow `AI.EMBED` call, is swallowed (`except Exception: pass`). Matching then runs on `_build_local_fallback_corpus()`, which has made-up organizations and addresses. Nothing is logged. `search_backend` does say `local_fallback_corpus`, and the agent prompt now tells the model to warn about it, but the tool should not do this silently.

- **Fix:** log the exception and return it in an `error` / `search_error` field. Only allow the fallback when explicitly enabled (e.g. `ALLOW_OFFLINE_FALLBACK=1`), never in a deployed environment.

### 6. "Who's next?" re-ranks posting #1 by default and drops the original filters — `2107`, `2176-2182`
- `posting_id_or_text` defaults to `"1"`, so `dispatch_pickup_and_fallback(declined_recipient_ids="Cedar Street Produce Alliance")` re-ranks the **spinach** posting no matter what was posted. Confirmed offline.
- The tool doesn't accept or forward `requires_pickup_van`, `pallets_estimate`, `requires_cold_storage`, `requires_frozen`, `donor_lat` or `donor_lon`, so the promoted "Backup #2" can differ from the backup the coordinator was shown.
- **Agent-side mitigation already in place:** `agent/prompt.py` now tells the model to pass `posting_text` plus all declines, or to re-call `find_and_rank_recipients` with the original args. This worked in the live test, but the tool should not depend on it.
- **Fix:** make `posting_text` / `posting_id_or_text` required (no default), and add and forward the missing filter parameters.

## Medium

### 7. `loading_dock` never checked; `max_pallets=0` is unmatchable — `1891`
- **`loading_dock` is ignored:** no filter in `find_and_rank_recipients` reads it, so a no-dock, hand-carry pantry can be offered a full pallet. The intake agent told a test coordinator they'd "never be sent full unbroken pallets", which isn't enforced.
- **`max_pallets <= 0` is always rejected,** even for "a few boxes". Intake used to write `0` for hand-carry pantries, which made them unmatchable; intake now writes `1` (matching the corpus's no-dock rows). Any other row with `0` is still unmatchable.
- **Fix:** add a filter like "`pallets_needed >= 1 and not loading_dock` → offer boxed/broken-down load only, or reject if the donor can't break pallets down". Treat `max_pallets=0` as "small boxed loads only" rather than "never".

### 8. Live shelf-life lookup picks an arbitrary product — `561-606`
The BigQuery path does `LIKE '%<first 30 chars of the posting>%' ... LIMIT 5` with **no `ORDER BY`** and takes `rows[0]`.

- **Repro (live):** `check_shelf_life_clock("10 crates of fresh spinach", 6)` → **"Canned goods (low acid … spinach …)", 96 h** instead of "Lettuce (leaf, spinach)", 72 h. The window still comes out at 6 h only because the donor deadline is shorter. The agent then paraphrased the match as "refrigerated greens/produce (~96 hours)", which hides the error.
- **Other problems:**
  - It runs before, and bypasses, the local `preferred_name` rules (`614-634`) that do get spinach right.
  - Multi-word postings ("mixed dairy - about 60 gallons…") never match, so this costs a BigQuery round trip for nothing.
  - It doesn't select `frozen_hours` / `frozen_note`, so `storage_state="frozen"` falls back to the refrigerated hours.
  - `.result()` has no timeout (`583`).
- **Fix:** resolve the product with the local rules or keyword scoring first, then fetch that product's row from BigQuery by `product_id`. Select the frozen columns and add a timeout.

### 9. Equity audit: fixed baseline, fixed conclusion, wrong tract count, slow — `2240-2344`
- **Fixed fallback baseline:** if the baseline query fails, `17.2%` / `20.0%` is used silently (`2282-2283`, error swallowed at `2298`). The output has no field saying which one was used.
- **Fixed conclusion:** `audit_conclusion` always says the tie-breaker "directed food to" higher-need tracts and always adds the FARM-track caveat, whatever the deltas or per-posting results show (`2321-2328`).
- **Wrong tract count:** `count_units: 1332` is hard-coded (`2333`); live `tract_demographics` has **1004** rows.
- **Hidden backend:** `search_backend` from the per-posting runs isn't included, so a partly offline audit looks the same as a live one.
- **Slow:** about 20 sequential BigQuery jobs (10 × shelf-life + vector search); took **43 s** live.
- **Depends on #2:** with #2 in place the audit measures only Cedar Street's tract.
- **Fix:** return `baseline_source` and per-posting `search_backend`, generate the conclusion from the signs of the deltas, query the tract count, and consider batching the 10 postings in one query.

### 10. Greenline rejection fabricated for every cold posting — `2067-2081`
If Greenline isn't already in `rejected_decoys`, it's inserted as "Matched #1 on meaning ('wants fresh greens and salad vegetables')" for **any** posting that needs cold storage: milk, blueberries, clinic supplements. That includes when Greenline was declined or isn't in the data. The agent prompt tells the model to always report blocked decoys, so it repeats this reasoning to the coordinator.

- **Fix:** delete the block, and report only decoys that were actually retrieved and filtered.

### 11. Posting's own deadline ignored by `check_shelf_life_clock` — `456`, `302`
`donor_deadline_hours` defaults to `6.0`, but `_infer_posting_attributes` only reads the deadline from the posting text when the value is `None` or `<= 0` (`302`). Called without a deadline, "potatoes, 3 days left" gets a 6 h clock.

- **Fix:** default to `0.0` / `None`, as `find_and_rank_recipients` does.

### 12. "Not recommended" room-temp storage gets the full donor window — `745-758`, `776-780`
When pantry (room-temperature) storage is `not recommended` for the product (e.g. milk with `storage_state="pantry"`), `usda_hours` is `None` and the effective window becomes the full donor deadline. The note says "Using donor's Xh window". This is a food-safety case: it should force `requires_cold_storage=True` or flag that the food can't be held at room temperature, not grant the whole window.

### 13. Loads of 2–3 pallets partly unallocated; split plan never warns about shortfall — `1945`, `2045-2065`
Candidates with `max_pallets < pallets_needed` aren't rejected; they get `pallets_assigned = min(max_pallets, pallets_needed)`. The split plan only runs when `pallets_needed >= 4`, so for 2–3 pallets the remainder is silently left over. When it does run, it doesn't report if total capacity is less than the load.

- **Fix:** run the split whenever the #1 match can't take the whole load, and return `unallocated_pallets`.

## Low

### 14. Declined names matched as substrings — `1774`
`any(dn in name.lower() for dn in declined_names)`, so declining "Pantry" or "Street" removes every organization whose name contains it. Match exact names or IDs.

### 15. Defaults that make up data when fields are missing
- `pickup_window_hours or 12` (`1769`)
- poverty `20.0` and no-vehicle `18.0` defaults (`1905-1911`)
- `distance_km or 3.5` (`1912`), `semantic_score or 0.75` (`1913`)
- `recipient_id or idx` (`2019`)
- `distance_km or 2.4` and `max_pallets or 1` in the output (`2026`, `2030`)
- plus #4's address fallbacks

Missing data should stay missing (and lower the rank or be flagged), not be filled with plausible-looking numbers.

### 16. Logic that only works for the 10 sample postings / named orgs
- **Deadline heuristics:** `"spinach"` → 6 h, `"deli case"` → 4 h, `"blueberries"` → 12 h (`313-318`).
- **Food item:** `food_item = "Fresh spinach (10 crates)"` special case (`421-422`).
- **Medical cold chain:** `requires_medical_cold` only when the text contains both "clinic" and "temperature-sensitive" (`430-432`), so "insulin, keep at 2–8 °C" isn't treated as medical.
- **Contradiction check:** Harborview is blocked by **name** (`1588`), whatever its data says.
- **Hard-coded concept groups:** the local semantic scorer's concept groups are tuned to the sample postings (`1320-1332`).

### 17. Unbounded BigQuery calls and swallowed errors
- **No timeout on `.result()`:** shelf-life (`583`), posting lookup (`2157`), audit baseline (`2294`).
- **`except Exception` with no logging:** `605`, `1547`, `2160`, `2298`.

A hung query blocks the agent turn; a failed one is invisible.

### 18. `_normalize_pct` misreads small percentages — `1624-1636`
Values `<= 1.0` are treated as fractions, so a percent-scale `0.8` (0.8%) becomes 80%. This is safe only while every source stays in fraction scale. Better to normalize once at the query, not by guessing from the value.

### 19. Dead code
`MATCH_SQL_PATH` (`36`) and `sql/match_recipients.sql` are never used; the vector search SQL is copied inline at `1375-1480` and has drifted from the file. `UBER_RESCUE_TOOLS` (`2351`) and the `run_equity_audit` alias (`2347`) are unused.

---

## Suggested order

1. **#2, #1, #4:** wrong recipient, unsafe timing and fake address in every live brief. These are small, local changes.
2. **#3, #5:** make the live ranking actually come from BigQuery, and make failures visible.
3. **#6, #8, #9, #10:** correctness of follow-ups, shelf life and the audit.
4. The rest.

After fixing, run `scripts/verify_traps.py` **against live BigQuery**: set `GOOGLE_CLOUD_PROJECT` and make sure `DISABLE_BQ` is unset. Several traps currently pass only because of the hard-coding in #2, #3 and #10, so expect to update the checks rather than just re-run them.

---

## Resolution

Fixed on branch `fix/tools-issues`. Verified with `scripts/verify_traps.py` against **both** live BigQuery (`qwiklabs-gcp-04-300332596f08`) and the offline corpus (as CI runs it), plus `python -m agent.tools`.

### What the live data showed while fixing

These findings changed the fixes, and they change the demo:

- **The demo rows have no street address by design.** The notebook (Section 7) says the 9 `profile_source = 'planted'` rows "announce themselves: … no street address" and should be filtered out of anything called real. So #4 wasn't missing data; the tool was inventing addresses.
- **Cedar and Maple really have 12h pickup windows.** The "4h" came only from `tools.py`'s overrides. With honest data they can't take a 6h spinach offer; they qualify for longer windows (e.g. a 24h produce offer).
- **The hard-coded tract numbers were invented.** Cedar's nearest tract is 14.5% poverty / 16.2% no-vehicle (not 34.8% / 31.2%); Maple's is 8.9% / 10.9% (not 14.2% / 12.8%). Cedar still ranks ahead of Maple when both qualify, but neither is a high-need tract.
- **67 of 192 recipients (30 of them neighborhood pantries) have `max_pallets = 0`.** The generated corpus uses 0 for small hand-carry pantries; the old filter excluded all of them from every offer.
- **`VECTOR_SEARCH` defaulted to Euclidean distance.** `1 - distance` gave "similarities" around 0.2, below the 0.25 floor of the local keyword score, so `max(BigQuery, local)` meant the keyword scorer decided every live ranking.
- **With the app's default settings (van required, 6h), live data has only one qualified recipient for spinach.** Without the van requirement there are several.

### Per issue

| # | Fix |
|---|---|
| 1 | A pickup window longer than the effective clock is rejected; the recipient's stated window is never rewritten. |
| 2 | No reordering by name. `_explain_operational_ties` explains any pair with identical capability fields (cold/frozen storage, dock, van, pallets, pickup window) from their actual score components. |
| 3 | Raw cosine similarity from BigQuery (`distance_type => 'COSINE'`). `planted_extra`, `planted_enrichments` and the local scorer's Greenline/Cedar/Maple boosts are gone. The offline corpus's 9 demo rows now mirror `a4i_food.recipients` exactly. |
| 4 | No placeholder addresses. Matches carry `address` (null when there is no street), `address_note`, and `is_planted_teaching_case`; the agent prompt says never to make an address up. |
| 5 | BigQuery errors are logged and returned as `search_backend = "bigquery_error"` with `search_error` and no matches. The offline corpus is used only when BigQuery isn't configured, or with `ALLOW_OFFLINE_FALLBACK=1`. |
| 6 | `dispatch_pickup_and_fallback` refuses to run without a posting, and accepts and forwards `pallets_estimate`, `requires_cold_storage`, `requires_frozen`, `requires_pickup_van`, `donor_lat`, `donor_lon`. |
| 7 | `max_pallets = 0` means hand-carry boxes: eligible for loads up to one pallet, rejected (with that reason) above it. `loading_dock` is returned and called out in `why_them` when pallets go to a site without a dock. It is not a hard filter, since the corpus has many no-dock sites with pallet capacity (liftgate / pallet jack). Intake writes `max_pallets = 0` for hand-carry pantries again. |
| 8 | The product is resolved with the local rules, then its own `shelf_life` row (by `product_id`) is fetched with a timeout; per storage state the shorter figure wins (`shelf_life_source` says which). Spinach now gets Lettuce (leaf, spinach), 72h, live. |
| 9 | Postings run in parallel (43s → ~9s live). `baseline_source`, real tract count, per-posting `search_backend`, numeric `equity_lift`, and a conclusion generated from the numbers (direction, few distinct winners, tracks below baseline, unmatched postings, non-live search or baseline). |
| 10 | Removed: only decoys that were retrieved and filtered are reported. |
| 11 | `check_shelf_life_clock` defaults `donor_deadline_hours` to 0 (infer from text). |
| 12 | A product with no room-temperature figure (or "not recommended") but a refrigerated one is treated as needing cold storage, and the matcher uses that. Plain milk has no figure for either state in FoodKeeper ("see package"), so it still falls back to the donor's window. |
| 13 | The split plan runs for bulk loads (≥ 4 pallets) or whenever #1 can't take the whole load, skips zero-capacity sites, and reports `unallocated_pallets`. |
| 14 | Declines match exact names (case-insensitive) or IDs. |
| 15 | Missing data stays missing: unknown pickup window → rejected with that reason; unknown tract rates → `null` and a neutral equity score; no default distance, ID, address, or capacity. |
| 16 | Removed the food-name deadline guesses ("spinach" → 6h, …), the spinach `food_item` special case, and Harborview's by-name block (caught by what its text says instead). Clinical cold chain now covers vaccines/insulin and temperature-sensitive goods for clinics. The local concept groups remain, but only for the offline scorer. |
| 17 | Every BigQuery call has a timeout (`BQ_TIMEOUT_S`, default 30s); every caught exception is logged. |
| 18 | `_rate_to_pct` treats census rates as fractions, which both sources use, and returns `null` when missing. |
| 19 | Removed `MATCH_SQL_PATH`, `UBER_RESCUE_TOOLS`, and the `run_equity_audit` alias. `sql/match_recipients.sql` now mirrors the live query (checked with a BigQuery dry run). |

### Test changes

`scripts/verify_traps.py` no longer asserts which organization wins, since that depended on the hard-coding:
- **Trap 2** uses a frozen-protein offer, where Harborview is actually retrieved.
- **Trap 3** checks that, of the tied pair, the higher-need one ranks first and the tie is explained, on a 24h produce offer both can take. It's skipped against a Cloud Run URL, because `/api/match` returns only 3 matches.
- **Trap 4** declines whoever is #1 and checks the previous #2 is promoted. It runs without the van requirement, so live data has a backup to promote.
