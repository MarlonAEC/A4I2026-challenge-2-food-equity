# Match Brief: surplus winter squash, about 30 bins, no refrigeration needed

Generated Tue 20 Oct 2026, 2:33 PM CT · Live BigQuery vector search · equity-weighted routing

> “surplus winter squash, about 30 bins, no refrigeration needed” · 8 pallets · must move by Sun 25 Oct, 2:33 PM

## 1. Feeding America

**Address:** 161 N Clark St Ste 700, Chicago, IL 60601

- **Why them:** They have a walk-in cooler plus a freezer with room for 24 pallets, and their own refrigerated van to collect it. Their profile says: “County-wide food bank operating a 40,000 square foot warehouse.”
- **What they can take:** All 8 pallets (room for up to 24). No refrigeration needed.
- **The clock:** Food must move by **Sun 25 Oct, 2:33 PM** (5 days). They can collect within 28 h via their van, by Wed 21 Oct, 6:33 PM, leaving **3.8 days** of margin. Drive is about 4 min (1 min of that is traffic).
- **Who it helps:** Loop: the surrounding census tract has 12.6% of people in poverty and 53.8% of households without a car.

**Outreach message, ready to send:**

```text
Hi Feeding America, this is the food rescue coordinator. A donor is offering 8 pallets: “surplus winter squash, about 30 bins, no refrigeration needed.” Could your van collect it from the Loop before Sun 25 Oct, 2:33 PM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## If they say no

### 2. Shepherds Hope Ltd

**Address:** Po Box 21013, Chicago, IL 60621

- **Why them:** Their storage is the cold hold of their own refrigerated van (no building), with room for 5 pallets, so they collect it themselves. Their profile says: “Produce and dairy.”
- **What they can take:** Only 5 of 8 pallets (max 5). The rest needs another recipient; see the split plan below. No refrigeration needed.
- **The clock:** Food must move by **Sun 25 Oct, 2:33 PM** (5 days). They can collect within 12 h via their van, by Wed 21 Oct, 2:33 AM, leaving **4.5 days** of margin. Drive is about 21 min (3 min of that is traffic).
- **Who it helps:** Englewood: the surrounding census tract has 45.6% of people in poverty and 66.9% of households without a car.

**Outreach message, ready to send:**

```text
Hi Shepherds Hope Ltd, this is the food rescue coordinator. A donor is offering 5 pallets: “surplus winter squash, about 30 bins, no refrigeration needed.” Could your van collect it from the Loop before Sun 25 Oct, 2:33 PM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

### 3. Ridgeway Avenue Food Ministry

**Address:** Street address not on file (Chicago, IL)

- **Why them:** They have a walk-in cooler with room for 3 pallets, but no vehicle, so a volunteer driver would deliver it. Their profile says: “We have cold chain capacity for palletized perishables and can receive at dock height.”
- **What they can take:** Only 3 of 8 pallets (max 3). The rest needs another recipient; see the split plan below. No refrigeration needed.
- **The clock:** Food must move by **Sun 25 Oct, 2:33 PM** (5 days). They can collect within 6 h via a volunteer driver, by 8:33 PM, leaving **4.8 days** of margin. Drive is about 16 min (2 min of that is traffic).
- **Who it helps:** North Lawndale: the surrounding census tract has 29.5% of people in poverty and 25.4% of households without a car.

**Outreach message, ready to send:**

```text
Hi Ridgeway Avenue Food Ministry, this is the food rescue coordinator. A donor is offering 3 pallets: “surplus winter squash, about 30 bins, no refrigeration needed.” We'd send a volunteer driver from the Loop. Could you receive it before Sun 25 Oct, 2:33 PM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## Split plan

Optional: share the load across several sites instead of sending it all to #1.

- Stop 1: **Feeding America**, 4 pallets (holds up to 24), 1.04 km away
- Stop 2: **Shepherds Hope Ltd**, 3 pallets (holds up to 5), 11.36 km away
- Stop 3: **Ridgeway Avenue Food Ministry**, 1 pallet (holds up to 3), 8.56 km away

## Blocked by the constraint checks

These matched the offer on meaning, but can't safely take it:

- **Lakeshore Mutual Aid Collective** (#1 on meaning): Contradiction detected: cold_storage column is 'none', but profile_text claims active refrigeration ('Neighborhood food distribution serving local families. Chilled holding for short...').
- **Harborview Neighbors Trust** (#4 on meaning): Profile contradicts itself and its storage flags: claims 'large walk-in freezer and can accept full pallets of frozen protein' in sentence 1, but states 'Storage is a single shelf in a shared cupboard and we have no freezer at present' in sentence 2. Blocked for data integrity validation.
- **Third Ward Community Table** (#5 on meaning): Contradiction detected: cold_storage column is 'walk-in', but profile_text describes only household/cupboard storage.
- **Indo-American Medical Foundation**: Matched #9 on meaning, but BLOCKED by volume filter: max_pallets=0 (hand-carry only, cannot receive crate/pallet loads).
- **Concerned Citizens Incorporated**: Matched #14 on meaning, but BLOCKED by volume filter: max_pallets=0 (hand-carry only, cannot receive crate/pallet loads).
- …and 5 more lower-ranked candidates (5 too small).

## Notes

- FDA recall check: CLEAR. ✅ CLEAR: No active openFDA enforcement recalls matched 'surplus winter'. Standard USDA FoodKeeper cold-chain and shelf-life protocols apply.
- Shelf life: Matched USDA FoodKeeper 'Spaghetti squash (whole)' (1440h pantry) - consumer home-storage guidance, capped by donor's 120h deadline.
- Tie-break: Cedar Street Produce Alliance and Maple Street Produce Alliance are operationally identical (both have walk-in coolers, reefer vans, loading docks, 10-pallet capacity, and serve ~600 households/wk). Ranked Cedar Street Produce Alliance ahead based on higher neighborhood food-equity need (34.8% poverty & 31.2% no-vehicle households vs. 14.2% poverty & 12.8% no-vehicle) and shorter distance (8.74 km vs. 9.91 km).
- Clock times assume the offer was posted when this brief was generated.
- Data: Organization names, addresses and NTEE codes are IRS records. Cold storage, capacity, pickup windows and service days are generated (no public data exists for them). Locations are ZIP centroids, so the neighborhood is approximate. Shelf life is USDA FoodKeeper consumer home-storage guidance, not a commercial cold-chain guarantee. Neighborhoods: City of Chicago community area boundaries.
