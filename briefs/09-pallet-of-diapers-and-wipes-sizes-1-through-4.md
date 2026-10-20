# Match Brief: pallet of diapers and wipes, sizes 1 through 4

Generated Tue 20 Oct 2026, 2:33 PM CT · Live BigQuery vector search · equity-weighted routing

> “pallet of diapers and wipes, sizes 1 through 4” · 1 pallet · must move by Thu 19 Nov, 2:33 PM

## 1. Cedar Street Produce Alliance

**Address:** Street address not on file (Chicago, IL)

- **Why them:** They have a walk-in cooler with room for 10 pallets, and their own refrigerated van to collect it. Their profile doesn't mention this kind of food, so they were picked on storage, capacity and timing. Confirm they want it before dispatching.
- **What they can take:** All 1 pallet (room for up to 10). No refrigeration needed.
- **The clock:** Food must move by **Thu 19 Nov, 2:33 PM** (30 days). They can collect within 4 h via their van, by 6:33 PM, leaving **29.8 days** of margin. Drive is about 16 min (2 min of that is traffic).
- **Who it helps:** South Lawndale: the surrounding census tract has 34.8% of people in poverty and 31.2% of households without a car.

**Outreach message, ready to send:**

```text
Hi Cedar Street Produce Alliance, this is the food rescue coordinator. A donor is offering 1 pallet: “pallet of diapers and wipes, sizes 1 through 4.” Could your van collect it from the Loop before Thu 19 Nov, 2:33 PM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## If they say no

### 2. Khaan Foundation

**Address:** 6712 South Halsted Street, Chicago, IL 60621

- **Why them:** They have dry storage only, no refrigeration with room for 1 pallet, but no vehicle, so a volunteer driver would deliver it. Their profile says: “Baby essentials pantry operating alongside a family resource center.”
- **What they can take:** All 1 pallet (room for up to 1). No refrigeration needed.
- **The clock:** Food must move by **Thu 19 Nov, 2:33 PM** (30 days). They can collect within 3.7 days via a volunteer driver, by Sat 24 Oct, 7:33 AM, leaving **26.3 days** of margin. Drive is about 21 min (3 min of that is traffic).
- **Who it helps:** Englewood: the surrounding census tract has 45.6% of people in poverty and 66.9% of households without a car.

**Outreach message, ready to send:**

```text
Hi Khaan Foundation, this is the food rescue coordinator. A donor is offering 1 pallet: “pallet of diapers and wipes, sizes 1 through 4.” We'd send a volunteer driver from the Loop. Could you receive it before Thu 19 Nov, 2:33 PM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

### 3. Ridgeway Avenue Food Ministry

**Address:** Street address not on file (Chicago, IL)

- **Why them:** They have a walk-in cooler with room for 3 pallets, but no vehicle, so a volunteer driver would deliver it. Their profile doesn't mention this kind of food, so they were picked on storage, capacity and timing. Confirm they want it before dispatching.
- **What they can take:** All 1 pallet (room for up to 3). No refrigeration needed.
- **The clock:** Food must move by **Thu 19 Nov, 2:33 PM** (30 days). They can collect within 6 h via a volunteer driver, by 8:33 PM, leaving **29.8 days** of margin. Drive is about 16 min (2 min of that is traffic).
- **Who it helps:** North Lawndale: the surrounding census tract has 29.5% of people in poverty and 25.4% of households without a car.

**Outreach message, ready to send:**

```text
Hi Ridgeway Avenue Food Ministry, this is the food rescue coordinator. A donor is offering 1 pallet: “pallet of diapers and wipes, sizes 1 through 4.” We'd send a volunteer driver from the Loop. Could you receive it before Thu 19 Nov, 2:33 PM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## Blocked by the constraint checks

These matched the offer on meaning, but can't safely take it:

- **Lakeshore Mutual Aid Collective** (#1 on meaning): Contradiction detected: cold_storage column is 'none', but profile_text claims active refrigeration ('Neighborhood food distribution serving local families. Chilled holding for short...').
- **Third Ward Community Table** (#7 on meaning): Contradiction detected: cold_storage column is 'walk-in', but profile_text describes only household/cupboard storage.
- **Lolas Community Kitchen**: Matched #21 on meaning, but BLOCKED by volume filter: max_pallets=0 (hand-carry only, cannot receive crate/pallet loads).
- **Women Of Esther Ministries**: Matched #23 on meaning, but BLOCKED by volume filter: max_pallets=0 (hand-carry only, cannot receive crate/pallet loads).
- **Harborview Neighbors Trust** (#24 on meaning): Profile contradicts itself and its storage flags: claims 'large walk-in freezer and can accept full pallets of frozen protein' in sentence 1, but states 'Storage is a single shelf in a shared cupboard and we have no freezer at present' in sentence 2. Blocked for data integrity validation.
- …and 4 more lower-ranked candidates (4 too small).

## Notes

- FDA recall check: CLEAR. ✅ CLEAR: No active openFDA enforcement recalls matched 'diapers and'. Standard USDA FoodKeeper cold-chain and shelf-life protocols apply.
- Shelf life: Non-food essential (diapers/wipes) — not tracked in USDA FoodKeeper. Effective clock defaults to donor's 720h window.
- Tie-break: Cedar Street Produce Alliance and Maple Street Produce Alliance are operationally identical (both have walk-in coolers, reefer vans, loading docks, 10-pallet capacity, and serve ~600 households/wk). Ranked Cedar Street Produce Alliance ahead based on higher neighborhood food-equity need (34.8% poverty & 31.2% no-vehicle households vs. 14.2% poverty & 12.8% no-vehicle) and shorter distance (8.74 km vs. 9.91 km).
- Clock times assume the offer was posted when this brief was generated.
- Data: Organization names, addresses and NTEE codes are IRS records. Cold storage, capacity, pickup windows and service days are generated (no public data exists for them). Locations are ZIP centroids, so the neighborhood is approximate. Shelf life is USDA FoodKeeper consumer home-storage guidance, not a commercial cold-chain guarantee. Neighborhoods: City of Chicago community area boundaries.
