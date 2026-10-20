# Match Brief: half a truckload of blueberries, picked this morning, extremely perishable

Generated Tue 20 Oct 2026, 2:33 PM CT · Live BigQuery vector search · equity-weighted routing

> “half a truckload of blueberries, picked this morning, extremely perishable” · 6 pallets · keep cold · must move by Wed 21 Oct, 2:33 AM

## 1. Cedar Street Produce Alliance

**Address:** Street address not on file (Chicago, IL)

- **Why them:** They have a walk-in cooler with room for 10 pallets, and their own refrigerated van to collect it. Their profile says: “We turn fresh fruit and vegetables within 48 hours and serve about 600 households a week.”
- **What they can take:** All 6 pallets (room for up to 10). Must stay cold: they have a walk-in cooler.
- **The clock:** Food must move by **Wed 21 Oct, 2:33 AM** (12 h). They can collect within 4 h via their van, by 6:33 PM, leaving **8 h** of margin. Drive is about 16 min (2 min of that is traffic).
- **Who it helps:** South Lawndale: the surrounding census tract has 34.8% of people in poverty and 31.2% of households without a car.

**Outreach message, ready to send:**

```text
Hi Cedar Street Produce Alliance, this is the food rescue coordinator. A donor is offering 6 pallets: “half a truckload of blueberries, picked this morning, extremely perishable.” It needs to stay cold. Could your van collect it from the Loop before Wed 21 Oct, 2:33 AM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## If they say no

### 2. Shepherds Hope Ltd

**Address:** Po Box 21013, Chicago, IL 60621

- **Why them:** Their storage is the cold hold of their own refrigerated van (no building), with room for 5 pallets, so they collect it themselves. Their profile says: “Produce and dairy.”
- **What they can take:** Only 5 of 6 pallets (max 5). The rest needs another recipient; see the split plan below. Must stay cold: they have a refrigerated van but no building storage.
- **The clock:** Food must move by **Wed 21 Oct, 2:33 AM** (12 h). They can collect within 12 h via their van, by Wed 21 Oct, 2:33 AM, leaving **0 min** of margin. Drive is about 21 min (3 min of that is traffic). ⚠️ Tight: under an hour to spare, so call rather than text.
- **Who it helps:** Englewood: the surrounding census tract has 45.6% of people in poverty and 66.9% of households without a car.

**Outreach message, ready to send:**

```text
Hi Shepherds Hope Ltd, this is the food rescue coordinator. A donor is offering 5 pallets: “half a truckload of blueberries, picked this morning, extremely perishable.” It needs to stay cold. Could your van collect it from the Loop before Wed 21 Oct, 2:33 AM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

### 3. Shakespear Rose Community Table Incorporated

**Address:** 6200 S Vernon Ave Apt 1B, Chicago, IL 60637

- **Why them:** Their storage is the cold hold of their own refrigerated van (no building), with room for 3 pallets, so they collect it themselves. Their profile doesn't mention this kind of food, so they were picked on storage, capacity and timing. Confirm they want it before dispatching.
- **What they can take:** Only 3 of 6 pallets (max 3). The rest needs another recipient; see the split plan below. Must stay cold: they have a refrigerated van but no building storage.
- **The clock:** Food must move by **Wed 21 Oct, 2:33 AM** (12 h). They can collect within 4 h via their van, by 6:33 PM, leaving **8 h** of margin. Drive is about 20 min (2 min of that is traffic).
- **Who it helps:** Woodlawn: the surrounding census tract has 44.7% of people in poverty and 51.5% of households without a car.

**Outreach message, ready to send:**

```text
Hi Shakespear Rose Community Table Incorporated, this is the food rescue coordinator. A donor is offering 3 pallets: “half a truckload of blueberries, picked this morning, extremely perishable.” It needs to stay cold. Could your van collect it from the Loop before Wed 21 Oct, 2:33 AM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## Split plan

Optional: share the load across several sites instead of sending it all to #1.

- Stop 1: **Cedar Street Produce Alliance**, 3 pallets (holds up to 10), 8.74 km away
- Stop 2: **Shepherds Hope Ltd**, 2 pallets (holds up to 5), 11.36 km away
- Stop 3: **Shakespear Rose Community Table Incorporated**, 1 pallet (holds up to 3), 10.96 km away

## Blocked by the constraint checks

These matched the offer on meaning, but can't safely take it:

- **Lakeshore Mutual Aid Collective** (#3 on meaning): Contradiction detected: cold_storage column is 'none', but profile_text claims active refrigeration ('Neighborhood food distribution serving local families. Chilled holding for short...').
- **Harborview Neighbors Trust** (#6 on meaning): Profile contradicts itself and its storage flags: claims 'large walk-in freezer and can accept full pallets of frozen protein' in sentence 1, but states 'Storage is a single shelf in a shared cupboard and we have no freezer at present' in sentence 2. Blocked for data integrity validation.
- **Third Ward Community Table** (#8 on meaning): Contradiction detected: cold_storage column is 'walk-in', but profile_text describes only household/cupboard storage.
- **Anso Child Development**: Matched #9 on meaning, but BLOCKED by clock filter: pickup_window_hours=19h exceeds the 12h effective spoilage/donor deadline.
- **Feeding America**: Matched #10 on meaning, but BLOCKED by clock filter: pickup_window_hours=28h exceeds the 12h effective spoilage/donor deadline.
- …and 12 more lower-ranked candidates (5 too small, 4 can't store it, 3 too slow to collect).

## Notes

- FDA recall check: ADVISORY_VERIFY_LOT. ⚠️ PROCEED WITH LOT VERIFICATION: 1 active openFDA recall(s) exist in the 'berries' category (e.g., F-1548-2019 — Riverside Foods Llc: The firm was informed by their customer that a random sample tested by the FDA test positive for norovirus.). Unbranded/bulk rescue may proceed after verifying donor packaging does not match recalled lot (PRODUCT OF USA CHILE PERU EXP 4/22/2021 LOT# AP 1700).
- Shelf life: Matched USDA FoodKeeper 'Blueberries' (336h refrigerated) - consumer home-storage guidance, capped by donor's 12h deadline.
- Tie-break: Cedar Street Produce Alliance and Maple Street Produce Alliance are operationally identical (both have walk-in coolers, reefer vans, loading docks, 10-pallet capacity, and serve ~600 households/wk). Ranked Cedar Street Produce Alliance ahead based on higher neighborhood food-equity need (34.8% poverty & 31.2% no-vehicle households vs. 14.2% poverty & 12.8% no-vehicle) and shorter distance (8.74 km vs. 9.91 km).
- Clock times assume the offer was posted when this brief was generated.
- Data: Organization names, addresses and NTEE codes are IRS records. Cold storage, capacity, pickup windows and service days are generated (no public data exists for them). Locations are ZIP centroids, so the neighborhood is approximate. Shelf life is USDA FoodKeeper consumer home-storage guidance, not a commercial cold-chain guarantee. Neighborhoods: City of Chicago community area boundaries.
