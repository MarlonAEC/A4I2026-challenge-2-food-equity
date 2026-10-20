# Match Brief: temperature-sensitive nutritional supplements for a clinic, cold chain required

Generated Tue 20 Oct 2026, 2:33 PM CT · Live BigQuery vector search · equity-weighted routing

> “temperature-sensitive nutritional supplements for a clinic, cold chain required” · 1 pallet · keep cold · must move by 10:33 PM

## 1. Ridgeway Avenue Food Ministry

**Address:** Street address not on file (Chicago, IL)

- **Why them:** They have a walk-in cooler with room for 3 pallets, but no vehicle, so a volunteer driver would deliver it. Their profile doesn't mention this kind of food, so they were picked on storage, capacity and timing. Confirm they want it before dispatching.
- **What they can take:** All 1 pallet (room for up to 3). Must stay cold: they have a walk-in cooler.
- **The clock:** Food must move by **10:33 PM** (8 h). They can collect within 6 h via a volunteer driver, by 8:33 PM, leaving **2 h** of margin. Drive is about 16 min (2 min of that is traffic).
- **Who it helps:** North Lawndale: the surrounding census tract has 29.5% of people in poverty and 25.4% of households without a car.

**Outreach message, ready to send:**

```text
Hi Ridgeway Avenue Food Ministry, this is the food rescue coordinator. A donor is offering 1 pallet: “temperature-sensitive nutritional supplements for a clinic, cold chain required.” It needs to stay cold. We'd send a volunteer driver from the Loop. Could you receive it before 10:33 PM today? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## If they say no

### 2. Cedar Street Produce Alliance

**Address:** Street address not on file (Chicago, IL)

- **Why them:** They have a walk-in cooler with room for 10 pallets, and their own refrigerated van to collect it. Their profile doesn't mention this kind of food, so they were picked on storage, capacity and timing. Confirm they want it before dispatching.
- **What they can take:** All 1 pallet (room for up to 10). Must stay cold: they have a walk-in cooler.
- **The clock:** Food must move by **10:33 PM** (8 h). They can collect within 4 h via their van, by 6:33 PM, leaving **4 h** of margin. Drive is about 16 min (2 min of that is traffic).
- **Who it helps:** South Lawndale: the surrounding census tract has 34.8% of people in poverty and 31.2% of households without a car.

**Outreach message, ready to send:**

```text
Hi Cedar Street Produce Alliance, this is the food rescue coordinator. A donor is offering 1 pallet: “temperature-sensitive nutritional supplements for a clinic, cold chain required.” It needs to stay cold. Could your van collect it from the Loop before 10:33 PM today? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

### 3. Maple Street Produce Alliance

**Address:** Street address not on file (Chicago, IL)

- **Why them:** They have a walk-in cooler with room for 10 pallets, and their own refrigerated van to collect it. Their profile doesn't mention this kind of food, so they were picked on storage, capacity and timing. Confirm they want it before dispatching.
- **What they can take:** All 1 pallet (room for up to 10). Must stay cold: they have a walk-in cooler.
- **The clock:** Food must move by **10:33 PM** (8 h). They can collect within 4 h via their van, by 6:33 PM, leaving **4 h** of margin. Drive is about 19 min (2 min of that is traffic).
- **Who it helps:** Outside Chicago's 77 community areas: the surrounding census tract has 14.2% of people in poverty and 12.8% of households without a car.

**Outreach message, ready to send:**

```text
Hi Maple Street Produce Alliance, this is the food rescue coordinator. A donor is offering 1 pallet: “temperature-sensitive nutritional supplements for a clinic, cold chain required.” It needs to stay cold. Could your van collect it from the Loop before 10:33 PM today? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## Blocked by the constraint checks

These matched the offer on meaning, but can't safely take it:

- **Brookfield Family Resource Center**: Matched #2 on meaning, but BLOCKED by clock filter: pickup_window_hours=12h exceeds the 8h effective spoilage/donor deadline.
- **Harborview Neighbors Trust** (#3 on meaning): Profile contradicts itself and its storage flags: claims 'large walk-in freezer and can accept full pallets of frozen protein' in sentence 1, but states 'Storage is a single shelf in a shared cupboard and we have no freezer at present' in sentence 2. Blocked for data integrity validation.
- **Southline Neighbors Pantry**: Matched #4 on meaning, but BLOCKED by clock filter: pickup_window_hours=12h exceeds the 8h effective spoilage/donor deadline.
- **Third Ward Community Table** (#5 on meaning): Contradiction detected: cold_storage column is 'walk-in', but profile_text describes only household/cupboard storage.
- **Greenline Community Pantry**: Matched #6 on meaning ('Our families ask for fresh greens and salad vegetables more than anything else'), but BLOCKED by constraint filter: cold_storage='none' (no refrigeration on site).
- …and 23 more lower-ranked candidates (17 too slow to collect, 5 can't store it, 1 contradictory profile).

## Notes

- FDA recall check: ADVISORY_VERIFY_LOT. ⚠️ PROCEED WITH LOT VERIFICATION: 1 active openFDA recall(s) exist in the 'temperature sensitive' category (e.g., F-0619-2025 — NutriCare Infant Nutrition: Potential Cronobacter sakazakii contamination in specific powdered lot #NC-8831.). Unbranded/bulk rescue may proceed after verifying donor packaging does not match recalled lot (Lot #NC-8831 only (sealed liquid RTD cases unaffected)).
- Shelf life: Matched USDA FoodKeeper 'Formula (prepared)' (24h refrigerated) - consumer home-storage guidance, capped by donor's 8h deadline.
- Tie-break: Cedar Street Produce Alliance and Maple Street Produce Alliance are operationally identical (both have walk-in coolers, reefer vans, loading docks, 10-pallet capacity, and serve ~600 households/wk). Ranked Cedar Street Produce Alliance ahead based on higher neighborhood food-equity need (34.8% poverty & 31.2% no-vehicle households vs. 14.2% poverty & 12.8% no-vehicle) and shorter distance (8.74 km vs. 9.91 km).
- Clock times assume the offer was posted when this brief was generated.
- Data: Organization names, addresses and NTEE codes are IRS records. Cold storage, capacity, pickup windows and service days are generated (no public data exists for them). Locations are ZIP centroids, so the neighborhood is approximate. Shelf life is USDA FoodKeeper consumer home-storage guidance, not a commercial cold-chain guarantee. Neighborhoods: City of Chicago community area boundaries.
