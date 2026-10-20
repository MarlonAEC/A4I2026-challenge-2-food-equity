-- ============================================================================
-- A4I 2026 - Challenge 2: Resilient Food Equity & Surplus Broker
-- Vector Search Reference Queries
-- Author: beshermahrouka
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. MATERIALIZE RECIPIENT EMBEDDINGS TABLE
-- Embeds the profile_text of every recipient organization using gemini-embedding-2.
-- Note:
--  - .result extracts the ARRAY<FLOAT64> from STRUCT<result, status>.
--  - WHERE embedded.status = '' filters out any failed API responses.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE TABLE `a4i_food.recipient_embeddings` AS
SELECT
  * EXCEPT (embedded),
  embedded.result AS embedding
FROM (
  SELECT r.*, AI.EMBED(r.profile_text, endpoint => 'gemini-embedding-2') AS embedded
  FROM `a4i_food.recipients` r
)
WHERE embedded.status = '';


-- ----------------------------------------------------------------------------
-- 2. VERIFY EMBEDDING TABLE
-- Confirms row count and vector dimensions (should be 3072 for gemini-embedding-2).
-- ----------------------------------------------------------------------------
SELECT
  COUNT(*) AS total_recipients_embedded,
  ARRAY_LENGTH(embedding) AS vector_dimensions
FROM `a4i_food.recipient_embeddings`
GROUP BY vector_dimensions;


-- ----------------------------------------------------------------------------
-- 3. CANDIDATE GENERATION: BASIC VECTOR SEARCH
-- Finds top 10 recipients matching an incoming donor offer.
-- Options: use_brute_force is required for tables < 10MB where vector index won't populate.
-- ----------------------------------------------------------------------------
SELECT
  base.recipient_id,
  base.name,
  base.cold_storage,
  base.max_pallets,
  base.pickup_window_hours,
  distance
FROM VECTOR_SEARCH(
  TABLE `a4i_food.recipient_embeddings`, 'embedding',
  (SELECT AI.EMBED(
     '10 crates of spinach, harvested yesterday, needs cold storage, must leave dock by 8pm',
     endpoint => 'gemini-embedding-2'
   ).result AS embedding),
  top_k => 10,
  options => '{"use_brute_force":true}'
);


-- ----------------------------------------------------------------------------
-- 4. CANDIDATE FILTERING (POST-VECTOR SEARCH CONSTRAINT LOGIC)
-- Vector search generates candidates; operational logic ensures the match works.
-- E.g., for perishable fresh greens needing refrigeration with 4 hours remaining:
-- ----------------------------------------------------------------------------
WITH vector_candidates AS (
  SELECT
    base.*,
    distance
  FROM VECTOR_SEARCH(
    TABLE `a4i_food.recipient_embeddings`, 'embedding',
    (SELECT AI.EMBED(
       '10 crates of spinach, harvested yesterday, needs cold storage, must leave dock by 8pm',
       endpoint => 'gemini-embedding-2'
     ).result AS embedding),
    top_k => 20,
    options => '{"use_brute_force":true}'
  )
)
SELECT
  name,
  cold_storage,
  max_pallets,
  pickup_window_hours,
  weekly_households,
  distance
FROM vector_candidates
WHERE
  -- Hard Constraint 1: Must have cold storage (eliminates Greenline decoy)
  cold_storage IN ('walk-in', 'commercial', 'domestic')
  -- Hard Constraint 2: Must be able to store at least 1 pallet/crate volume
  AND max_pallets >= 1
  -- Hard Constraint 3: Can collect inside the clock (e.g. <= 8 hours)
  AND pickup_window_hours <= 8
ORDER BY distance ASC;


-- ----------------------------------------------------------------------------
-- 5. DECOY TEST CASE VERIFICATION
-- Inspects Greenline Community Pantry (planted case that matches semantically
-- but lacks refrigeration).
-- ----------------------------------------------------------------------------
SELECT
  name,
  cold_storage,
  profile_text
FROM `a4i_food.recipients`
WHERE name = 'Greenline Community Pantry';
