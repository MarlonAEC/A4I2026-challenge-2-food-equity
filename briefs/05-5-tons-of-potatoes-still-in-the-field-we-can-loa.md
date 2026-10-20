# Match Brief: 5 tons of potatoes still in the field, we can load pallets if someone collects

Generated Tue 20 Oct 2026, 2:33 PM CT · Live BigQuery vector search · equity-weighted routing

> “5 tons of potatoes still in the field, we can load pallets if someone collects” · 10 pallets · must move by Fri 23 Oct, 2:33 PM

## 1. Feeding America

**Address:** 161 N Clark St Ste 700, Chicago, IL 60601

- **Why them:** They have a walk-in cooler plus a freezer with room for 24 pallets, and their own refrigerated van to collect it. Their profile says: “County-wide food bank operating a 40,000 square foot warehouse.”
- **What they can take:** All 10 pallets (room for up to 24). No refrigeration needed.
- **The clock:** Food must move by **Fri 23 Oct, 2:33 PM** (3 days). They can collect within 28 h via their van, by Wed 21 Oct, 6:33 PM, leaving **44 h** of margin. Drive is about 4 min (1 min of that is traffic).
- **Who it helps:** Loop: the surrounding census tract has 12.6% of people in poverty and 53.8% of households without a car.

**Outreach message, ready to send:**

```text
Hi Feeding America, this is the food rescue coordinator. A donor is offering 10 pallets: “5 tons of potatoes still in the field, we can load pallets if someone collects.” Could your van collect it from the Loop before Fri 23 Oct, 2:33 PM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## If they say no

### 2. Shakespear Rose Community Table Incorporated

**Address:** 6200 S Vernon Ave Apt 1B, Chicago, IL 60637

- **Why them:** Their storage is the cold hold of their own refrigerated van (no building), with room for 3 pallets, so they collect it themselves. Their profile doesn't mention this kind of food, so they were picked on storage, capacity and timing. Confirm they want it before dispatching.
- **What they can take:** Only 3 of 10 pallets (max 3). The rest needs another recipient; see the split plan below. No refrigeration needed.
- **The clock:** Food must move by **Fri 23 Oct, 2:33 PM** (3 days). They can collect within 4 h via their van, by 6:33 PM, leaving **2.8 days** of margin. Drive is about 20 min (2 min of that is traffic).
- **Who it helps:** Woodlawn: the surrounding census tract has 44.7% of people in poverty and 51.5% of households without a car.

**Outreach message, ready to send:**

```text
Hi Shakespear Rose Community Table Incorporated, this is the food rescue coordinator. A donor is offering 3 pallets: “5 tons of potatoes still in the field, we can load pallets if someone collects.” Could your van collect it from the Loop before Fri 23 Oct, 2:33 PM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

### 3. Shepherds Hope Ltd

**Address:** Po Box 21013, Chicago, IL 60621

- **Why them:** Their storage is the cold hold of their own refrigerated van (no building), with room for 5 pallets, so they collect it themselves. Their profile says: “Produce and dairy.”
- **What they can take:** Only 5 of 10 pallets (max 5). The rest needs another recipient; see the split plan below. No refrigeration needed.
- **The clock:** Food must move by **Fri 23 Oct, 2:33 PM** (3 days). They can collect within 12 h via their van, by Wed 21 Oct, 2:33 AM, leaving **2.5 days** of margin. Drive is about 21 min (3 min of that is traffic).
- **Who it helps:** Englewood: the surrounding census tract has 45.6% of people in poverty and 66.9% of households without a car.

**Outreach message, ready to send:**

```text
Hi Shepherds Hope Ltd, this is the food rescue coordinator. A donor is offering 5 pallets: “5 tons of potatoes still in the field, we can load pallets if someone collects.” Could your van collect it from the Loop before Fri 23 Oct, 2:33 PM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## Split plan

Optional: share the load across several sites instead of sending it all to #1.

- Stop 1: **Feeding America**, 5 pallets (holds up to 24), 1.04 km away
- Stop 2: **Shakespear Rose Community Table Incorporated**, 3 pallets (holds up to 3), 10.96 km away
- Stop 3: **Shepherds Hope Ltd**, 2 pallets (holds up to 5), 11.36 km away

## Blocked by the constraint checks

These matched the offer on meaning, but can't safely take it:

- **Lakeshore Mutual Aid Collective** (#1 on meaning): Contradiction detected: cold_storage column is 'none', but profile_text claims active refrigeration ('Neighborhood food distribution serving local families. Chilled holding for short...').
- **Harborview Neighbors Trust** (#4 on meaning): Profile contradicts itself and its storage flags: claims 'large walk-in freezer and can accept full pallets of frozen protein' in sentence 1, but states 'Storage is a single shelf in a shared cupboard and we have no freezer at present' in sentence 2. Blocked for data integrity validation.
- **Third Ward Community Table** (#6 on meaning): Contradiction detected: cold_storage column is 'walk-in', but profile_text describes only household/cupboard storage.
- **Mission Of Love**: Matched #11 on meaning, but BLOCKED by clock filter: pickup_window_hours=89h exceeds the 72h effective spoilage/donor deadline.
- **Boys To Men Nfp Inc**: Matched #12 on meaning, but BLOCKED by clock filter: pickup_window_hours=77h exceeds the 72h effective spoilage/donor deadline.
- …and 9 more lower-ranked candidates (9 too small).

## Notes

- FDA recall check: ADVISORY_VERIFY_LOT. ⚠️ PROCEED WITH LOT VERIFICATION: 5 active openFDA recall(s) exist in the 'potatoes' category (e.g., H-1244-2026 — Grand Central Bakery - Oregon Inc. dba Grand Central Bakery, Inc.: Foreign object: May contain metal pieces). Unbranded/bulk rescue may proceed after verifying donor packaging does not match recalled lot (No codes. Product was sold on 8/10/26.).
- Shelf life: Matched USDA FoodKeeper 'Potatoes' (1440h pantry) - consumer home-storage guidance, capped by donor's 72h deadline.
- Tie-break: Cedar Street Produce Alliance and Maple Street Produce Alliance are operationally identical (both have walk-in coolers, reefer vans, loading docks, 10-pallet capacity, and serve ~600 households/wk). Ranked Cedar Street Produce Alliance ahead based on higher neighborhood food-equity need (34.8% poverty & 31.2% no-vehicle households vs. 14.2% poverty & 12.8% no-vehicle) and shorter distance (8.74 km vs. 9.91 km).
- Clock times assume the offer was posted when this brief was generated.
- Data: Organization names, addresses and NTEE codes are IRS records. Cold storage, capacity, pickup windows and service days are generated (no public data exists for them). Locations are ZIP centroids, so the neighborhood is approximate. Shelf life is USDA FoodKeeper consumer home-storage guidance, not a commercial cold-chain guarantee. Neighborhoods: City of Chicago community area boundaries.
