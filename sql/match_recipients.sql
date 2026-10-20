-- ============================================================================
-- Lane 1 & 3: Live Vector Search + Spatial Geo Distance + Census Tract Need Join
-- Connects directly to `a4i_food.recipient_embeddings` (created in queries/vector_search_reference.sql)
-- and `a4i_food.tract_demographics`.
--
-- Mirrors the query in `_fetch_candidates` (agent/tools.py), which is what the agent runs.
-- Keep the two in sync. Parameters: @query_text, @donor_lat, @donor_lon, @top_k.
--
-- `distance` is COSINE distance, so 1 - distance is cosine similarity. Census rates are
-- fractions (0.145 = 14.5%); a candidate with no tract keeps NULL rates rather than an
-- invented default. Hard filters (storage, clock, capacity, contradictions) run after
-- this query, in the agent, and are not repeated here.
-- ============================================================================

WITH vs AS (
  SELECT
    base.recipient_id,
    base.name,
    base.street,
    base.city,
    base.state,
    base.zip_code,
    base.latitude,
    base.longitude,
    base.archetype,
    base.archetype_label,
    base.cold_storage,
    base.frozen_storage,
    base.loading_dock,
    base.refrigerated_transport,
    base.max_pallets,
    base.pickup_window_hours,
    base.weekly_households,
    base.reported_income,
    base.populations_served,
    base.service_days,
    base.profile_text,
    base.profile_source,
    distance AS vector_distance,
    ROUND(1.0 - distance, 4) AS semantic_similarity,
    -- Straight-line distance in km from donor coordinates (@donor_lon, @donor_lat)
    ROUND(
      ST_DISTANCE(
        ST_GEOGPOINT(base.longitude, base.latitude),
        ST_GEOGPOINT(@donor_lon, @donor_lat)
      ) / 1000.0,
      2
    ) AS distance_km
  FROM VECTOR_SEARCH(
    TABLE `a4i_food.recipient_embeddings`,
    'embedding',
    (
      SELECT AI.EMBED(
        @query_text,
        endpoint => 'gemini-embedding-2'
      ).result AS embedding
    ),
    top_k => @top_k,
    distance_type => 'COSINE',
    options => '{"use_brute_force": true}'
  )
)
SELECT
  vs.*,
  t.geo_id AS tract_geo_id,
  t.poverty_rate,
  t.no_vehicle_rate,
  t.assistance_rate
FROM vs
-- Nearest tract with coordinates (a NULL distance would otherwise sort first).
LEFT JOIN `a4i_food.tract_demographics` t
  ON t.tract_lat IS NOT NULL AND t.tract_lon IS NOT NULL
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY vs.recipient_id
  ORDER BY ST_DISTANCE(
    ST_GEOGPOINT(vs.longitude, vs.latitude),
    ST_GEOGPOINT(t.tract_lon, t.tract_lat)
  ) ASC
) = 1
ORDER BY vs.vector_distance ASC;
