# Match Brief: 48 cases of sealed infant formula, 8 months to expiry

Generated Tue 20 Oct 2026, 2:33 PM CT · Live BigQuery vector search · equity-weighted routing

> “48 cases of sealed infant formula, 8 months to expiry” · 2 pallets · must move by Tue 27 Oct, 2:33 PM

## 1. Cedar Street Produce Alliance

**Address:** Street address not on file (Chicago, IL)

- **Why them:** They have a walk-in cooler with room for 10 pallets, and their own refrigerated van to collect it. Their profile doesn't mention this kind of food, so they were picked on storage, capacity and timing. Confirm they want it before dispatching.
- **What they can take:** All 2 pallets (room for up to 10). No refrigeration needed.
- **The clock:** Food must move by **Tue 27 Oct, 2:33 PM** (7 days). They can collect within 4 h via their van, by 6:33 PM, leaving **6.8 days** of margin. Drive is about 16 min (2 min of that is traffic).
- **Who it helps:** South Lawndale: the surrounding census tract has 34.8% of people in poverty and 31.2% of households without a car.

**Outreach message, ready to send:**

```text
Hi Cedar Street Produce Alliance, this is the food rescue coordinator. A donor is offering 2 pallets: “48 cases of sealed infant formula, 8 months to expiry.” Could your van collect it from the Loop before Tue 27 Oct, 2:33 PM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## If they say no

### 2. Green Thumbs Up

**Address:** 516 E 67Th St, Chicago, IL 60637

- **Why them:** They have dry storage only, no refrigeration with room for 1 pallet, but no vehicle, so a volunteer driver would deliver it. Their profile says: “Non-food essentials bank focused on families with children under three.”
- **What they can take:** Only 1 of 2 pallets (max 1). The rest needs another recipient; see the split plan below. No refrigeration needed.
- **The clock:** Food must move by **Tue 27 Oct, 2:33 PM** (7 days). They can collect within 28 h via a volunteer driver, by Wed 21 Oct, 6:33 PM, leaving **5.8 days** of margin. Drive is about 20 min (2 min of that is traffic).
- **Who it helps:** Woodlawn: the surrounding census tract has 44.7% of people in poverty and 51.5% of households without a car.

**Outreach message, ready to send:**

```text
Hi Green Thumbs Up, this is the food rescue coordinator. A donor is offering 1 pallet: “48 cases of sealed infant formula, 8 months to expiry.” We'd send a volunteer driver from the Loop. Could you receive it before Tue 27 Oct, 2:33 PM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

### 3. Delovely Heart

**Address:** 6446 South Sangamon Apt2B, Chicago, IL 60621

- **Why them:** They have dry storage only, no refrigeration with room for 2 pallets, but no vehicle, so a volunteer driver would deliver it. Their profile says: “Infant supplies and shelf-stable formula only.”
- **What they can take:** All 2 pallets (room for up to 2). No refrigeration needed.
- **The clock:** Food must move by **Tue 27 Oct, 2:33 PM** (7 days). They can collect within 2.4 days via a volunteer driver, by Thu 22 Oct, 11:33 PM, leaving **4.6 days** of margin. Drive is about 21 min (3 min of that is traffic).
- **Who it helps:** Englewood: the surrounding census tract has 45.6% of people in poverty and 66.9% of households without a car.

**Outreach message, ready to send:**

```text
Hi Delovely Heart, this is the food rescue coordinator. A donor is offering 2 pallets: “48 cases of sealed infant formula, 8 months to expiry.” We'd send a volunteer driver from the Loop. Could you receive it before Tue 27 Oct, 2:33 PM? Reply ACCEPT to claim it or DECLINE so we can offer it to the next pantry.
```

## Blocked by the constraint checks

These matched the offer on meaning, but can't safely take it:

- **Lakeshore Mutual Aid Collective** (#1 on meaning): Contradiction detected: cold_storage column is 'none', but profile_text claims active refrigeration ('Neighborhood food distribution serving local families. Chilled holding for short...').
- **Harborview Neighbors Trust** (#5 on meaning): Profile contradicts itself and its storage flags: claims 'large walk-in freezer and can accept full pallets of frozen protein' in sentence 1, but states 'Storage is a single shelf in a shared cupboard and we have no freezer at present' in sentence 2. Blocked for data integrity validation.
- **Third Ward Community Table** (#7 on meaning): Contradiction detected: cold_storage column is 'walk-in', but profile_text describes only household/cupboard storage.
- **One Patient - Global Health Initiative Ltd**: Matched #18 on meaning, but BLOCKED by volume filter: max_pallets=0 (hand-carry only, cannot receive crate/pallet loads).
- **Am-Resch Foundation**: Matched #30 on meaning, but BLOCKED by volume filter: max_pallets=0 (hand-carry only, cannot receive crate/pallet loads).
- …and 1 more lower-ranked candidates (1 too small).

## Notes

- FDA recall check: ADVISORY_VERIFY_LOT. ⚠️ PROCEED WITH LOT VERIFICATION: 5 active openFDA recall(s) exist in the 'infant formula' category (e.g., H-1137-2026 — NARA ORGANICS INC: Product may be contaminated with Clostridium botulinum.). Unbranded/bulk rescue may proceed after verifying donor packaging does not match recalled lot (Recalled Lot Codes   -  408125075E14F2 -  708125076E14F2 -  708125083E14F2 -  408125139E14F2 -  708125141E14F2 -  708125145E14F2 -  70812517).
- Shelf life: Matched USDA FoodKeeper 'Liquid concentrate or ready-to-feed formula'. FoodKeeper only tracks formula AFTER opening; because this donation is factory-sealed, effective clock keeps the donor's 168h window (consumer home-storage guidance caveat applies).
- Tie-break: Cedar Street Produce Alliance and Maple Street Produce Alliance are operationally identical (both have walk-in coolers, reefer vans, loading docks, 10-pallet capacity, and serve ~600 households/wk). Ranked Cedar Street Produce Alliance ahead based on higher neighborhood food-equity need (34.8% poverty & 31.2% no-vehicle households vs. 14.2% poverty & 12.8% no-vehicle) and shorter distance (8.74 km vs. 9.91 km).
- Clock times assume the offer was posted when this brief was generated.
- Data: Organization names, addresses and NTEE codes are IRS records. Cold storage, capacity, pickup windows and service days are generated (no public data exists for them). Locations are ZIP centroids, so the neighborhood is approximate. Shelf life is USDA FoodKeeper consumer home-storage guidance, not a commercial cold-chain guarantee. Neighborhoods: City of Chicago community area boundaries.
