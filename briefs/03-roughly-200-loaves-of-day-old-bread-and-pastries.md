# Match Brief: roughly 200 loaves of day-old bread and pastries from three store locations

Generated Tue 20 Oct 2026, 2:32 PM CT · Live BigQuery vector search · equity-weighted routing

> “roughly 200 loaves of day-old bread and pastries from three store locations” · 1 pallet · must move by Wed 21 Oct, 2:32 PM

## 1. Shepherds Hope Ltd

**Address:** Po Box 21013, Chicago, IL 60621

- **Why them:** Their storage is the cold hold of their own refrigerated van (no building), with room for 5 pallets, so they collect it themselves. Their profile doesn't mention this kind of food, so they were picked on storage, capacity and timing. Confirm they want it before dispatching.
- **What they can take:** All 1 pallet (room for up to 5). No refrigeration needed.
- **The clock:** Food must move by **Wed 21 Oct, 2:32 PM** (24 h). They can collect within 12 h via their van, by Wed 21 Oct, 2:32 AM, leaving **12 h** of margin. Drive is about 21 min (3 min of that is traffic).
- **Who it helps:** Englewood: the surrounding census tract has 45.6% of people in poverty and 66.9% of households without a car.

**Outreach message, ready to send:**

```text
Hi Shepherds Hope Ltd, this is the food rescue coordinator. A donor is offering 1 pallet: “roughly 200 loaves of day-old bread and pastries from three store locations.” Could your van collect it from the Loop before Wed 21 Oct, 2:32 PM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## If they say no

### 2. Ridgeway Avenue Food Ministry

**Address:** Street address not on file (Chicago, IL)

- **Why them:** They have a walk-in cooler with room for 3 pallets, but no vehicle, so a volunteer driver would deliver it. Their profile doesn't mention this kind of food, so they were picked on storage, capacity and timing. Confirm they want it before dispatching.
- **What they can take:** All 1 pallet (room for up to 3). No refrigeration needed.
- **The clock:** Food must move by **Wed 21 Oct, 2:32 PM** (24 h). They can collect within 6 h via a volunteer driver, by 8:32 PM, leaving **18 h** of margin. Drive is about 16 min (2 min of that is traffic).
- **Who it helps:** North Lawndale: the surrounding census tract has 29.5% of people in poverty and 25.4% of households without a car.

**Outreach message, ready to send:**

```text
Hi Ridgeway Avenue Food Ministry, this is the food rescue coordinator. A donor is offering 1 pallet: “roughly 200 loaves of day-old bread and pastries from three store locations.” We'd send a volunteer driver from the Loop. Could you receive it before Wed 21 Oct, 2:32 PM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

### 3. A Hand Up Recovery Homes Nfp

**Address:** 4030-32 W Van Vuren St Ste 1E, Chicago, IL 60624

- **Why them:** They have household fridges only with room for 1 pallet, but no vehicle, so a volunteer driver would deliver it. Their profile doesn't mention this kind of food, so they were picked on storage, capacity and timing. Confirm they want it before dispatching.
- **What they can take:** All 1 pallet (room for up to 1). No refrigeration needed.
- **The clock:** Food must move by **Wed 21 Oct, 2:32 PM** (24 h). They can collect within 10 h via a volunteer driver, by Wed 21 Oct, 12:32 AM, leaving **14 h** of margin. Drive is about 14 min (2 min of that is traffic).
- **Who it helps:** West Garfield Park: the surrounding census tract has 42.4% of people in poverty and 47.3% of households without a car.

**Outreach message, ready to send:**

```text
Hi A Hand Up Recovery Homes Nfp, this is the food rescue coordinator. A donor is offering 1 pallet: “roughly 200 loaves of day-old bread and pastries from three store locations.” We'd send a volunteer driver from the Loop. Could you receive it before Wed 21 Oct, 2:32 PM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## Blocked by the constraint checks

These matched the offer on meaning, but can't safely take it:

- **Lakeshore Mutual Aid Collective** (#1 on meaning): Contradiction detected: cold_storage column is 'none', but profile_text claims active refrigeration ('Neighborhood food distribution serving local families. Chilled holding for short...').
- **Harborview Neighbors Trust** (#4 on meaning): Profile contradicts itself and its storage flags: claims 'large walk-in freezer and can accept full pallets of frozen protein' in sentence 1, but states 'Storage is a single shelf in a shared cupboard and we have no freezer at present' in sentence 2. Blocked for data integrity validation.
- **Third Ward Community Table** (#6 on meaning): Contradiction detected: cold_storage column is 'walk-in', but profile_text describes only household/cupboard storage.
- **Safe In His Hands Llc**: Matched #8 on meaning, but BLOCKED by volume filter: max_pallets=0 (hand-carry only, cannot receive crate/pallet loads).
- **Cross Roads Transitional Housing Nfp**: Matched #10 on meaning, but BLOCKED by volume filter: max_pallets=0 (hand-carry only, cannot receive crate/pallet loads).
- …and 8 more lower-ranked candidates (6 too small, 2 too slow to collect).

## Notes

- FDA recall check: ADVISORY_VERIFY_LOT. ⚠️ PROCEED WITH LOT VERIFICATION: 5 active openFDA recall(s) exist in the 'bread' category (e.g., H-1305-2026 — Prince Bakery Inc: Sesame is not declared in the ingredient statement but is declared in the statement of identity.). Unbranded/bulk rescue may proceed after verifying donor packaging does not match recalled lot (No codes).
- Shelf life: Matched USDA FoodKeeper 'Bread (homemade)' (120h pantry) - consumer home-storage guidance, capped by donor's 24h deadline.
- Tie-break: Cedar Street Produce Alliance and Maple Street Produce Alliance are operationally identical (both have walk-in coolers, reefer vans, loading docks, 10-pallet capacity, and serve ~600 households/wk). Ranked Cedar Street Produce Alliance ahead based on higher neighborhood food-equity need (34.8% poverty & 31.2% no-vehicle households vs. 14.2% poverty & 12.8% no-vehicle) and shorter distance (8.74 km vs. 9.91 km).
- Clock times assume the offer was posted when this brief was generated.
- Data: Organization names, addresses and NTEE codes are IRS records. Cold storage, capacity, pickup windows and service days are generated (no public data exists for them). Locations are ZIP centroids, so the neighborhood is approximate. Shelf life is USDA FoodKeeper consumer home-storage guidance, not a commercial cold-chain guarantee. Neighborhoods: City of Chicago community area boundaries.
