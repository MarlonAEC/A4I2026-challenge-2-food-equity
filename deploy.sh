#!/usr/bin/env bash
# ============================================================================
# Lane 5 (Cloud Run Deployment Lead - @MarlonAEC)
# One-command build, deploy, and live Judge-Trap QA verification on Cloud Run.
#
# Usage:
#   bash deploy.sh                          # deploys food-rescue-broker to us-central1
#   PROJECT_ID=my-gcp-proj bash deploy.sh   # explicit project override
# ============================================================================
set -euo pipefail

SERVICE_NAME="${1:-food-rescue-broker}"
REGION="${2:-us-central1}"
DEFAULT_PROJECT_ID="qwiklabs-gcp-04-300332596f08"
GCLOUD_PROJECT="$(gcloud config get-value project 2>/dev/null || true)"
if [[ -z "${GCLOUD_PROJECT}" || "${GCLOUD_PROJECT}" == "(unset)" ]]; then
  GCLOUD_PROJECT="${DEFAULT_PROJECT_ID}"
fi
PROJECT_ID="${PROJECT_ID:-${GCLOUD_PROJECT}}"

if [[ -z "${PROJECT_ID}" || "${PROJECT_ID}" == "(unset)" ]]; then
  echo "❌ ERROR: No Google Cloud project is set."
  echo "Run:  gcloud config set project YOUR_PROJECT_ID"
  echo "  or: PROJECT_ID=your-project-id bash deploy.sh"
  exit 1
fi

echo "============================================================"
echo "🚀 Lane 5 Cloud Run Deployment"
echo "   Project : ${PROJECT_ID}"
echo "   Service : ${SERVICE_NAME}"
echo "   Region  : ${REGION}"
echo "============================================================"
echo

echo "1/4 Running pre-deploy Judge-Trap verification suite..."
python3 scripts/verify_traps.py
echo

echo "2/4 Ensuring Cloud Run & Cloud Build APIs are enabled..."
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  bigquery.googleapis.com \
  aiplatform.googleapis.com \
  --project="${PROJECT_ID}" --quiet
echo

echo "3/4 Deploying ${SERVICE_NAME} to Cloud Run (min-instances=1 to prevent cold starts)..."
gcloud run deploy "${SERVICE_NAME}" \
  --project="${PROJECT_ID}" \
  --source=. \
  --region="${REGION}" \
  --allow-unauthenticated \
  --port=8080 \
  --min-instances=1 \
  --max-instances=5 \
  --memory=1Gi \
  --set-env-vars="GOOGLE_CLOUD_PROJECT=${PROJECT_ID},BQ_DATASET=a4i_food" \
  --quiet

SERVICE_URL="$(gcloud run services describe "${SERVICE_NAME}" \
  --project="${PROJECT_ID}" \
  --region="${REGION}" \
  --format='value(status.url)')"

echo
echo "4/4 Verifying live Cloud Run endpoint: ${SERVICE_URL}"
curl -fsS "${SERVICE_URL}/healthz" && echo " <- /healthz OK"
python3 scripts/verify_traps.py "${SERVICE_URL}"

echo
echo "============================================================"
echo "✅ LIVE ON GOOGLE CLOUD RUN: ${SERVICE_URL}"
echo "============================================================"
