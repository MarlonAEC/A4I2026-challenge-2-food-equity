-- sql/rescue_deserts.sql
-- Milestone 1D: Spatial Equity Analysis & "Rescue Deserts" Query
-- Identifies Cook County census tracts with severe food insecurity & transit dependency
-- (poverty_rate > 30% AND no_vehicle_rate > 40%) that have ZERO verified commercial
-- or walk-in cold storage food rescue recipients within a 5 km radius.

CREATE OR REPLACE VIEW `a4i_food.v_rescue_deserts` AS
WITH bulk_cold_recipients AS (
  SELECT
    recipient_id,
    name,
    latitude,
    longitude,
    cold_storage
  FROM `a4i_food.recipients`
  WHERE cold_storage IN ('walk-in', 'commercial')
),
high_need_tracts AS (
  SELECT
    geo_id,
    tract_lat,
    tract_lon,
    total_pop,
    ROUND(poverty_rate * 100, 1) AS poverty_pct,
    ROUND(no_vehicle_rate * 100, 1) AS no_vehicle_pct
  FROM `a4i_food.tract_demographics`
  WHERE poverty_rate > 0.30
    AND no_vehicle_rate > 0.40
)
SELECT
  t.geo_id,
  t.total_pop,
  t.poverty_pct,
  t.no_vehicle_pct,
  t.tract_lat,
  t.tract_lon,
  MIN(ROUND(ST_DISTANCE(ST_GEOGPOINT(t.tract_lon, t.tract_lat), ST_GEOGPOINT(c.longitude, c.latitude)) / 1000, 2)) AS min_dist_km,
  COUNTIF(ST_DWITHIN(ST_GEOGPOINT(t.tract_lon, t.tract_lat), ST_GEOGPOINT(c.longitude, c.latitude), 5000)) AS bulk_cold_within_5km
FROM high_need_tracts t
CROSS JOIN bulk_cold_recipients c
GROUP BY
  t.geo_id,
  t.total_pop,
  t.poverty_pct,
  t.no_vehicle_pct,
  t.tract_lat,
  t.tract_lon
HAVING bulk_cold_within_5km = 0
ORDER BY min_dist_km DESC;
