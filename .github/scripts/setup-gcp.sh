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
echo "Enabling required Google Cloud APIs..."
gcloud services enable \
  iam.googleapis.com \
  cloudresourcemanager.googleapis.com \
  storage.googleapis.com \
  --project="$PROJECT_ID"

echo ""
echo "Waiting 15s for API activation to propagate..."
sleep 15

echo ""
echo "✅ GCP project setup complete"
