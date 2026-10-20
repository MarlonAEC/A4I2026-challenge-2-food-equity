# Match Brief: prepared sandwiches and salads from the deli case, must move tonight

Generated Tue 20 Oct 2026, 2:32 PM CT · Live BigQuery vector search · equity-weighted routing

> “prepared sandwiches and salads from the deli case, must move tonight” · 1 pallet · keep cold · must move by 6:32 PM

## 1. Cedar Street Produce Alliance

**Address:** Street address not on file (Chicago, IL)

- **Why them:** They have a walk-in cooler with room for 10 pallets, and their own refrigerated van to collect it. Their profile doesn't mention this kind of food, so they were picked on storage, capacity and timing. Confirm they want it before dispatching.
- **What they can take:** All 1 pallet (room for up to 10). Must stay cold: they have a walk-in cooler.
- **The clock:** Food must move by **6:32 PM** (4 h). They can collect within 4 h via their van, by 6:32 PM, leaving **0 min** of margin. Drive is about 16 min (2 min of that is traffic). ⚠️ Tight: under an hour to spare, so call rather than text.
- **Who it helps:** South Lawndale: the surrounding census tract has 34.8% of people in poverty and 31.2% of households without a car.

**Outreach message, ready to send:**

```text
Hi Cedar Street Produce Alliance, this is the food rescue coordinator. A donor is offering 1 pallet: “prepared sandwiches and salads from the deli case, must move tonight.” It needs to stay cold. Could your van collect it from the Loop before 6:32 PM today? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## If they say no

### 2. Shakespear Rose Community Table Incorporated

**Address:** 6200 S Vernon Ave Apt 1B, Chicago, IL 60637

- **Why them:** Their storage is the cold hold of their own refrigerated van (no building), with room for 3 pallets, so they collect it themselves. Their profile says: “Short-dated items work well here - everything moves the same day.”
- **What they can take:** All 1 pallet (room for up to 3). Must stay cold: they have a refrigerated van but no building storage.
- **The clock:** Food must move by **6:32 PM** (4 h). They can collect within 4 h via their van, by 6:32 PM, leaving **0 min** of margin. Drive is about 20 min (2 min of that is traffic). ⚠️ Tight: under an hour to spare, so call rather than text.
- **Who it helps:** Woodlawn: the surrounding census tract has 44.7% of people in poverty and 51.5% of households without a car.

**Outreach message, ready to send:**

```text
Hi Shakespear Rose Community Table Incorporated, this is the food rescue coordinator. A donor is offering 1 pallet: “prepared sandwiches and salads from the deli case, must move tonight.” It needs to stay cold. Could your van collect it from the Loop before 6:32 PM today? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

### 3. Word Faith Believers Ministries

**Address:** 8736 S Winchester Ave, Chicago, IL 60620

- **Why them:** Their storage is the cold hold of their own refrigerated van (no building), with room for 3 pallets, so they collect it themselves. Their profile doesn't mention this kind of food, so they were picked on storage, capacity and timing. Confirm they want it before dispatching.
- **What they can take:** All 1 pallet (room for up to 3). Must stay cold: they have a refrigerated van but no building storage.
- **The clock:** Food must move by **6:32 PM** (4 h). They can collect within 3 h via their van, by 5:32 PM, leaving **1 h** of margin. Drive is about 28 min (3 min of that is traffic).
- **Who it helps:** Auburn Gresham: the surrounding census tract has 27.2% of people in poverty and 23.6% of households without a car.

**Outreach message, ready to send:**

```text
Hi Word Faith Believers Ministries, this is the food rescue coordinator. A donor is offering 1 pallet: “prepared sandwiches and salads from the deli case, must move tonight.” It needs to stay cold. Could your van collect it from the Loop before 6:32 PM today? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## Blocked by the constraint checks

These matched the offer on meaning, but can't safely take it:

- **Greenline Community Pantry**: Matched #1 on meaning ('Our families ask for fresh greens and salad vegetables more than anything else'), but BLOCKED by constraint filter: cold_storage='none' (no refrigeration on site).
- **Lakeshore Mutual Aid Collective** (#2 on meaning): Contradiction detected: cold_storage column is 'none', but profile_text claims active refrigeration ('Neighborhood food distribution serving local families. Chilled holding for short...').
- **Ridgeway Avenue Food Ministry**: Matched #3 on meaning, but BLOCKED by clock filter: pickup_window_hours=6h exceeds the 4h effective spoilage/donor deadline.
- **Brookfield Family Resource Center**: Matched #5 on meaning, but BLOCKED by clock filter: pickup_window_hours=12h exceeds the 4h effective spoilage/donor deadline.
- **Harborview Neighbors Trust** (#6 on meaning): Profile contradicts itself and its storage flags: claims 'large walk-in freezer and can accept full pallets of frozen protein' in sentence 1, but states 'Storage is a single shelf in a shared cupboard and we have no freezer at present' in sentence 2. Blocked for data integrity validation.
- …and 22 more lower-ranked candidates (20 too slow to collect, 1 contradictory profile, 1 too small).

## Notes

- FDA recall check: ADVISORY_VERIFY_LOT. ⚠️ PROCEED WITH LOT VERIFICATION: 5 active openFDA recall(s) exist in the 'sandwich' category (e.g., H-1346-2026 — Taylor Fresh Foods Inc: Potential contamination with Salmonella.). Unbranded/bulk rescue may proceed after verifying donor packaging does not match recalled lot (Tennessee: TFTN2171, 8/11/2026. Texas: TFTX211, 8/7/2026; TFTX212, 8/8/2026; TFTX213, 8/9/2026; TFTX214, 8/10/2026; TFTX215, 8/11/2026; TFTX).
- Shelf life: Matched USDA FoodKeeper 'Leftovers (with meat, fish, poultry, or egg)' (96h refrigerated) - consumer home-storage guidance, capped by donor's 4h deadline.
- Tie-break: Cedar Street Produce Alliance and Maple Street Produce Alliance are operationally identical (both have walk-in coolers, reefer vans, loading docks, 10-pallet capacity, and serve ~600 households/wk). Ranked Cedar Street Produce Alliance ahead based on higher neighborhood food-equity need (34.8% poverty & 31.2% no-vehicle households vs. 14.2% poverty & 12.8% no-vehicle) and shorter distance (8.74 km vs. 9.91 km).
- Clock times assume the offer was posted when this brief was generated.
- Data: Organization names, addresses and NTEE codes are IRS records. Cold storage, capacity, pickup windows and service days are generated (no public data exists for them). Locations are ZIP centroids, so the neighborhood is approximate. Shelf life is USDA FoodKeeper consumer home-storage guidance, not a commercial cold-chain guarantee. Neighborhoods: City of Chicago community area boundaries.
