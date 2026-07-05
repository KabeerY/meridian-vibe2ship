#!/usr/bin/env bash

set -euo pipefail

: "${PROJECT_ID:?Set PROJECT_ID to the Google Cloud project id.}"

REGION="${REGION:-asia-south1}"
SERVICE="${SERVICE:-meridian}"
SECRET="${SECRET:-meridian-gemini-key}"
RUNTIME_SA="${RUNTIME_SA:-meridian-runtime}"
RUNTIME_EMAIL="${RUNTIME_SA}@${PROJECT_ID}.iam.gserviceaccount.com"

if ! command -v gcloud >/dev/null 2>&1; then
  echo "gcloud is required. Install the Google Cloud CLI or run this script in Cloud Shell." >&2
  exit 1
fi

echo "Preparing ${SERVICE} in ${PROJECT_ID} (${REGION})..."
gcloud config set project "${PROJECT_ID}"
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com \
  firestore.googleapis.com

if ! gcloud iam service-accounts describe "${RUNTIME_EMAIL}" >/dev/null 2>&1; then
  gcloud iam service-accounts create "${RUNTIME_SA}" \
    --display-name="Meridian Cloud Run runtime"
fi

gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --member="serviceAccount:${RUNTIME_EMAIL}" \
  --role="roles/datastore.user" \
  --condition=None \
  --quiet

if ! gcloud firestore databases describe --database="(default)" >/dev/null 2>&1; then
  echo "Creating the Firestore database in ${REGION}..."
  gcloud firestore databases create \
    --database="(default)" \
    --location="${REGION}" \
    --type=firestore-native \
    --delete-protection \
    --quiet
fi

if gcloud secrets describe "${SECRET}" >/dev/null 2>&1; then
  if [[ -n "${GEMINI_API_KEY:-}" ]]; then
    echo "Adding the explicitly provided Gemini key as a new secret version."
    printf '%s' "${GEMINI_API_KEY}" | gcloud secrets versions add "${SECRET}" --data-file=-
  else
    echo "Reusing the existing Gemini key in Secret Manager."
  fi
else
  if [[ -z "${GEMINI_API_KEY:-}" ]]; then
    read -r -s -p "Paste the Gemini API key (input is hidden): " GEMINI_API_KEY
    echo
  fi
  printf '%s' "${GEMINI_API_KEY}" | gcloud secrets create "${SECRET}" \
    --data-file=- \
    --replication-policy=automatic
fi
unset GEMINI_API_KEY

gcloud secrets add-iam-policy-binding "${SECRET}" \
  --member="serviceAccount:${RUNTIME_EMAIL}" \
  --role="roles/secretmanager.secretAccessor" \
  --quiet

gcloud run deploy "${SERVICE}" \
  --source=. \
  --region="${REGION}" \
  --allow-unauthenticated \
  --service-account="${RUNTIME_EMAIL}" \
  --set-secrets="GEMINI_API_KEY=${SECRET}:latest" \
  --set-env-vars="GEMINI_MODEL=gemini-3.5-flash,NODE_ENV=production,ENABLE_FIRESTORE=true,FIRESTORE_DATABASE=(default)" \
  --memory=512Mi \
  --cpu=1 \
  --concurrency=20 \
  --timeout=120 \
  --min=0 \
  --max=3

echo "Deployment complete. Cloud Run printed the public service URL above."
