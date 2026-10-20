#!/usr/bin/env bash
# Lane 5 (Cloud Run Deployment Lead): One-command deploy to Google Cloud Run
set -euo pipefail

SERVICE_NAME="${1:-food-rescue-broker}"
REGION="${2:-us-central1}"
PROJECT_ID="$(gcloud config get-value project)"

echo "Deploying ${SERVICE_NAME} to Cloud Run in project ${PROJECT_ID} (${REGION})..."

gcloud run deploy "${SERVICE_NAME}" \
  --source . \
  --region "${REGION}" \
  --allow-unauthenticated \
  --min-instances=1 \
  --set-env-vars="GOOGLE_CLOUD_PROJECT=${PROJECT_ID},BQ_DATASET=a4i_food"

echo "Deployment complete!"
