-- ============================================================================
-- A4I 2026 - Challenge 2: Resilient Food Equity & Surplus Broker
-- Semantic Layer & Anti-Hallucination Guardrail Views
-- ============================================================================
-- Purpose:
-- 1. Encapsulate business rules into deterministic SQL boolean flags.
-- 2. Prevent LLM hallucinations on operational constraints (cold chain, capacity).
-- 3. Detect planted contradiction decoys (e.g., Harborview Neighbors Trust).
-- 4. Pre-join Census tract poverty & vehicle access for zero-latency equity auditing.
-- ============================================================================

CREATE OR REPLACE VIEW `a4i_food.v_recipient_candidates` AS
WITH recipient_tracts AS (
  SELECT
    r.recipient_id,
    t.geo_id AS tract_geoid,
    ROUND(t.poverty_rate * 100, 1) AS tract_poverty_pct,
    ROUND(t.no_vehicle_rate * 100, 1) AS tract_no_vehicle_pct
  FROM `a4i_food.recipients` r
  CROSS JOIN `a4i_food.tract_demographics` t
  QUALIFY ROW_NUMBER() OVER (
    PARTITION BY r.recipient_id 
    ORDER BY ST_DISTANCE(ST_GEOGPOINT(r.longitude, r.latitude), ST_GEOGPOINT(t.tract_lon, t.tract_lat)) ASC
  ) = 1
)
SELECT
  r.recipient_id,
  r.ein,
  r.name,
  r.street,
  r.city,
  r.state,
  r.zip_code,
  r.latitude,
  r.longitude,
  r.cold_storage,
  r.frozen_storage,
  r.loading_dock,
  r.refrigerated_transport,
  r.max_pallets,
  r.pickup_window_hours,
  r.weekly_households,
  r.reported_income,
  r.service_days,
  r.profile_text,

  -- 1. DETERMINISTIC OPERATIONAL GUARDRAILS (Stops LLM Capacity Hallucinations)
  (r.cold_storage IN ('walk-in', 'commercial', 'domestic')) AS can_take_refrigerated,
  (r.frozen_storage = TRUE) AS can_take_frozen,
  (r.max_pallets >= 1) AS can_handle_bulk_pallets,
  (r.loading_dock = TRUE) AS has_loading_dock,
  (r.refrigerated_transport = TRUE) AS has_refrigerated_van,

  -- 2. CONTRADICTION DETECTOR (Stops Planted Decoy #2: Harborview Neighbors Trust)
  CASE
    WHEN r.cold_storage IN ('walk-in', 'commercial')
     AND (LOWER(r.profile_text) LIKE '%no freezer%' OR LOWER(r.profile_text) LIKE '%single shelf%')
    THEN TRUE
    ELSE FALSE
  END AS has_profile_contradiction,

  -- 3. PRE-COMPUTED DEMOGRAPHIC EQUITY INDICATORS (Stops GIS Join Hallucinations)
  rt.tract_geoid,
  rt.tract_poverty_pct,
  rt.tract_no_vehicle_pct

FROM `a4i_food.recipients` r
LEFT JOIN recipient_tracts rt
  ON r.recipient_id = rt.recipient_id;


-- ----------------------------------------------------------------------------
-- EXAMPLE CANDIDATE MATCHING QUERY (Vector Search + Semantic Guardrails)
-- ----------------------------------------------------------------------------
-- BigQuery Note: VECTOR_SEARCH takes a TABLE as its 1st argument, then joins
-- the semantic view to enforce guardrails deterministically.
-- ----------------------------------------------------------------------------
/*
WITH candidates AS (
  SELECT
    base.recipient_id,
    distance
  FROM VECTOR_SEARCH(
    TABLE `a4i_food.recipients`,
    'embedding',
    (
      SELECT AI.EMBED(@query_text, endpoint => 'gemini-embedding-2').result AS embedding
    ),
    top_k => 15,
    options => '{"use_brute_force": true}'
  )
)
SELECT
  v.recipient_id,
  v.name,
  v.can_take_refrigerated,
  v.can_take_frozen,
  v.can_handle_bulk_pallets,
  v.has_profile_contradiction,
  v.tract_poverty_pct,
  v.tract_no_vehicle_pct,
  c.distance AS cosine_distance,
  ROUND(1.0 - c.distance, 4) AS semantic_similarity
FROM candidates c
JOIN `a4i_food.v_recipient_candidates` v
  ON c.recipient_id = v.recipient_id
WHERE
  -- Hard Guardrails:
  v.can_take_refrigerated = TRUE
  AND v.has_profile_contradiction = FALSE
ORDER BY c.distance ASC;
*/
