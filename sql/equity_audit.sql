-- ============================================================================
-- Lane 1 & 5: Required Equity Audit Query (Notebook Section 11)
-- Compares census-tract demographics of matched / capable recipients against
-- the metro-wide baseline using `a4i_food.recipient_embeddings` and
-- `a4i_food.tract_demographics`.
-- ============================================================================

WITH metro_baseline AS (
  SELECT
    '1. Metro Baseline (All Census Tracts)' AS cohort,
    COUNT(*) AS count_units,
    ROUND(AVG(poverty_rate) * 100.0, 1) AS avg_poverty_rate_pct,
    ROUND(AVG(no_vehicle_rate) * 100.0, 1) AS avg_no_vehicle_pct,
    ROUND(AVG(assistance_rate) * 100.0, 1) AS avg_public_assistance_or_snap_pct
  FROM `a4i_food.tract_demographics`
),
recipient_nearest_tract AS (
  SELECT
    r.recipient_id,
    r.name,
    r.cold_storage,
    r.refrigerated_transport,
    r.max_pallets,
    ARRAY_AGG(
      STRUCT(
        t.geo_id,
        t.poverty_rate,
        t.no_vehicle_rate,
        t.assistance_rate
      )
      ORDER BY ST_DISTANCE(
        ST_GEOGPOINT(r.longitude, r.latitude),
        ST_GEOGPOINT(t.tract_lon, t.tract_lat)
      ) ASC
      LIMIT 1
    )[OFFSET(0)] AS tract
  FROM `a4i_food.recipient_embeddings` r
  CROSS JOIN `a4i_food.tract_demographics` t
  WHERE r.longitude IS NOT NULL AND r.latitude IS NOT NULL
    AND t.tract_lon IS NOT NULL AND t.tract_lat IS NOT NULL
  GROUP BY
    r.recipient_id,
    r.name,
    r.cold_storage,
    r.refrigerated_transport,
    r.max_pallets
),
all_recipients_cohort AS (
  SELECT
    '2. All Corpus Recipients (IRS + Planted)' AS cohort,
    COUNT(*) AS count_units,
    ROUND(AVG(tract.poverty_rate) * 100.0, 1) AS avg_poverty_rate_pct,
    ROUND(AVG(tract.no_vehicle_rate) * 100.0, 1) AS avg_no_vehicle_pct,
    ROUND(AVG(tract.assistance_rate) * 100.0, 1) AS avg_public_assistance_or_snap_pct
  FROM recipient_nearest_tract
),
cold_capable_cohort AS (
  SELECT
    '3. Cold-Chain Capable Recipients (Walk-in / Commercial + Reefer)' AS cohort,
    COUNT(*) AS count_units,
    ROUND(AVG(tract.poverty_rate) * 100.0, 1) AS avg_poverty_rate_pct,
    ROUND(AVG(tract.no_vehicle_rate) * 100.0, 1) AS avg_no_vehicle_pct,
    ROUND(AVG(tract.assistance_rate) * 100.0, 1) AS avg_public_assistance_or_snap_pct
  FROM recipient_nearest_tract
  WHERE cold_storage IN ('walk-in', 'commercial', 'medical', 'vehicle')
)
SELECT * FROM metro_baseline
UNION ALL
SELECT * FROM all_recipients_cohort
UNION ALL
SELECT * FROM cold_capable_cohort;
