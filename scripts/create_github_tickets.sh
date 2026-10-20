#!/usr/bin/env bash
# Creates GitHub Issues (and links them to a GitHub Project if available)
# for all 5 team lanes in MarlonAEC/A4I2026-challenge-2-food-equity.
set -euo pipefail

REPO="MarlonAEC/A4I2026-challenge-2-food-equity"

echo "Creating GitHub Issues for ${REPO}..."

# 0. Kickoff Issue
gh issue create --repo "${REPO}" \
  --title "[Phase 0] Team Kickoff: Lock Metro, Track, Opening Scenario & Branches" \
  --body "## Goal (First 15 Minutes - All 5 Teammates)
- [ ] Pick our Metro (\`chicago\`, \`philadelphia\`, or \`new-york\` recommended for >=20% no-vehicle signal)
- [ ] Confirm Track: **Retail & Grocer Rescue** ('Uber for expiring restaurant & grocery pickups')
- [ ] Fill in team names in \`ROADMAP.md\`
- [ ] Everyone clone repo and checkout lane branch (\`data\`, \`agent\`, \`tools\`, \`frontend\`, \`deploy-story\`)"

# 1. Lane 1: Data & Vector Search Lead
gh issue create --repo "${REPO}" \
  --title "[Lane 1 - Data] Load BigQuery Tables, Build Embeddings & VECTOR_SEARCH SQL" \
  --body "## Owner: Data & Vector Search Lead (\`branch: data\`)
**Files:** \`notebooks/c2_01_load_explore.ipynb\`, \`scripts/load.sh\`, \`sql/match_recipients.sql\`, \`sql/equity_audit.sql\`

### Checklist
- [ ] Run \`bash scripts/load.sh chicago\` (or notebook) to populate \`a4i_food.recipients\`, \`surplus_postings\`, \`shelf_life\`, and \`tract_demographics\`
- [ ] Create Cloud Resource Connection & Embedding Model (\`gemini-embedding-2\`) in \`US\` region
- [ ] Materialize embeddings on \`a4i_food.recipients\` (\`profile_text\`)
- [ ] Test \`sql/match_recipients.sql\` (\`VECTOR_SEARCH\` with \`use_brute_force=true\`) and share with Lanes 2 & 3
- [ ] Run \`sql/equity_audit.sql\` across all 10 \`surplus_postings\` and hand numbers to Lane 5"

# 2. Lane 2: ADK Agent & MCP Lead
gh issue create --repo "${REPO}" \
  --title "[Lane 2 - Agent] Wire ADK Agent, Managed BigQuery MCP & 7-Part Match Brief Prompt" \
  --body "## Owner: ADK Agent & MCP Lead (\`branch: agent\`)
**Files:** \`agent/agent.py\`, \`agent/prompt.py\`, \`agent/__init__.py\`

### Checklist
- [ ] Verify \`agent/agent.py\` runs locally via \`adk web\`
- [ ] Connect at least 1 Google-managed MCP server (BigQuery MCP or MCP Toolbox for Databases)
- [ ] Refine \`agent/prompt.py\` to enforce the 7-part Match Brief output
- [ ] Test all 7 coordinator follow-up questions from \`README.md\` (including *'Why them?'* and *'They said no, who is next?'*)"

# 3. Lane 3: Custom "Uber Logistics" Tools Lead
gh issue create --repo "${REPO}" \
  --title "[Lane 3 - Tools] Build Shelf-Life Clock, Decoy Filter & Cascading Uber Dispatch Tools" \
  --body "## Owner: Custom Tools Lead (\`branch: tools\`)
**Files:** \`agent/tools.py\`

### Checklist
- [ ] Test \`check_shelf_life_clock\` against USDA FoodKeeper sentinel values (\`indefinitely\`, \`package use-by date\`, and \`Spinach\` under \`Lettuce\`)
- [ ] Connect \`find_and_rank_recipients\` to Lane 1's BigQuery \`VECTOR_SEARCH\` table
- [ ] Verify hard constraint filters block **Judge Trap #1** (\`Greenline Community Pantry\` with \`cold_storage='none'\`) and **Judge Trap #2** (\`Harborview Neighbors Trust\` contradiction)
- [ ] Verify tie-breaker ranks \`Cedar Street\` vs \`Maple Street Produce Alliance\` using \`tract_demographics\` (\`poverty_rate\`, \`pct_no_vehicle\`) and distance
- [ ] Test \`dispatch_pickup_and_fallback\` when #1 declines pickup"

# 4. Lane 4: Frontend "Uber Dispatch" UI Lead
gh issue create --repo "${REPO}" \
  --title "[Lane 4 - Frontend] Build Interactive Uber Dispatch Dashboard & 'They Said No' Flow" \
  --body "## Owner: Frontend UI Lead (\`branch: frontend\`)
**Files:** \`app/main.py\`

### Checklist
- [ ] Run \`uvicorn app.main:app --reload --port 8080\` and test the starter dashboard
- [ ] Add city map pins for Donor, #1 Primary Match, Backups #2 & #3, and Blocked Semantic Decoys
- [ ] Test the **[❌ 'They Said No' -> Auto-Route to Backup #2]** button live
- [ ] Connect coordinator follow-up chat input to Lane 2's ADK agent"

# 5. Lane 5: Cloud Run Deploy, Trap QA & Pitch Lead
gh issue create --repo "${REPO}" \
  --title "[Lane 5 - Deploy & Pitch] Deploy to Cloud Run, Verify Judge Traps & Record Pitch Video" \
  --body "## Owner: Cloud Run, QA & Pitch Lead (\`branch: deploy-story\`)
**Files:** \`Dockerfile\`, \`deploy.sh\`, \`docs/pitch_deck_outline.md\`

### Checklist
- [ ] Run \`bash deploy.sh\` early to deploy container to Google Cloud Run (\`--min-instances=1\`)
- [ ] Verify all 4 planted Judge Traps pass on the live Cloud Run URL
- [ ] Finalize 5-slide Pitch Deck using \`docs/pitch_deck_outline.md\` (including IRS real vs generated data explanation, Equity Audit table, and honest limitations)
- [ ] Record narrated screen-share Pitch Video and submit all 4 links to \`https://portal.angelhack.com/a4i-console\`"

echo "✅ All 6 GitHub Issues created! View them at: https://github.com/${REPO}/issues"
