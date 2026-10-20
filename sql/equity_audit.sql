-- ============================================================================
-- Lane 1 (Data Lead): Required Equity Audit Query (README "Auditing the outcome")
-- Compares neighborhoods of matched recipients against the metro-wide average.
-- ============================================================================

WITH metro_baseline AS (
  SELECT
    'Metro Baseline (All Tracts)' AS cohort,
    COUNT(*) AS tract_count,
    ROUND(AVG(poverty_rate), 2) AS avg_poverty_rate_pct,
    ROUND(AVG(pct_no_vehicle), 2) AS avg_no_vehicle_pct
  FROM `a4i_food.tract_demographics`
),
recipient_pool AS (
  SELECT
    'All Capable Recipients (Cold Storage + Van)' AS cohort,
    COUNT(*) AS tract_count,
    ROUND(AVG(t.poverty_rate), 2) AS avg_poverty_rate_pct,
    ROUND(AVG(t.pct_no_vehicle), 2) AS avg_no_vehicle_pct
  FROM `a4i_food.recipients` r
  JOIN `a4i_food.tract_demographics` t
    ON ST_DWITHIN(
         ST_GEOGPOINT(r.zip_lon, r.zip_lat),
         ST_GEOGPOINT(t.intpt_lon, t.intpt_lat),
         3000
       )
  WHERE r.cold_storage != 'none'
)
SELECT * FROM metro_baseline
UNION ALL
SELECT * FROM recipient_pool;
