#!/bin/bash

# ==============================================================================
# GCP PROJECT SETUP AND API ENABLEMENT
# ==============================================================================
# Sets the default GCP project and enables required APIs
#
# Usage (from GitHub Actions):
#   .github/scripts/setup-gcp.sh
#
# Requirements:
#   - PROJECT_ID environment variable must be set
#   - gcloud CLI must be authenticated
# ==============================================================================

set -e

if [ -z "$PROJECT_ID" ]; then
  echo "❌ Error: PROJECT_ID environment variable not set"
  exit 1
fi

echo "Setting default GCP project: $PROJECT_ID"
gcloud config set project "$PROJECT_ID"

echo ""
echo "Checking if required Google Cloud APIs are enabled..."

# Quick check if APIs are already enabled (common case)
if gcloud services list --enabled --project="$PROJECT_ID" --filter="name:iam.googleapis.com" --format="value(name)" 2>/dev/null | grep -q "iam.googleapis.com"; then
  echo "✅ APIs already enabled"
else
  echo "Enabling required Google Cloud APIs..."
  gcloud services enable \
    iam.googleapis.com \
    cloudresourcemanager.googleapis.com \
    storage.googleapis.com \
    containerscanning.googleapis.com \
    --project="$PROJECT_ID"

  echo ""
  echo "Waiting for API activation to propagate..."

  # Retry loop with shorter intervals (max 30 seconds)
  MAX_ATTEMPTS=6
  ATTEMPT=1
  while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
    echo "  Checking API status (attempt $ATTEMPT/$MAX_ATTEMPTS)..."

    if gcloud services list --enabled --project="$PROJECT_ID" --filter="name:iam.googleapis.com" --format="value(name)" 2>/dev/null | grep -q "iam.googleapis.com"; then
      echo "  ✅ APIs are active"
      break
    fi

    if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
      echo "  ⚠️  APIs may still be propagating, continuing anyway..."
      break
    fi

    sleep 5
    ATTEMPT=$((ATTEMPT + 1))
  done
fi

echo ""
echo "✅ GCP project setup complete"
