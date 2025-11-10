#!/bin/bash

# ==============================================================================
# DEPLOY DOCKER IMAGE TO CLOUD RUN
# ==============================================================================
# Updates the Cloud Run service with the new Docker image
#
# Usage (from GitHub Actions):
#   .github/scripts/deploy-to-cloudrun.sh
#
# Requirements:
#   - SERVICE_NAME environment variable must be set
#   - REGION environment variable must be set
#   - PROJECT_ID environment variable must be set
#   - ARTIFACT_REGISTRY_NAME environment variable must be set
#   - DOCKER_IMAGE_NAME environment variable must be set
#   - DOCKER_IMAGE_TAG environment variable must be set
#   - gcloud CLI must be authenticated
# ==============================================================================

set -e

# Validate required environment variables
required_vars=(
  "SERVICE_NAME"
  "REGION"
  "PROJECT_ID"
  "ARTIFACT_REGISTRY_NAME"
  "DOCKER_IMAGE_NAME"
  "DOCKER_IMAGE_TAG"
)

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌ Error: $var environment variable not set"
    exit 1
  fi
done

# Construct the image URL
IMAGE_URL="${REGION}-docker.pkg.dev/${PROJECT_ID}/${ARTIFACT_REGISTRY_NAME}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"

echo "Deploying Docker image to Cloud Run..."
echo "  Service: $SERVICE_NAME"
echo "  Region: $REGION"
echo "  Project: $PROJECT_ID"
echo "  Image: $IMAGE_URL"
echo ""

# Deploy to Cloud Run
gcloud run services update "$SERVICE_NAME" \
  --image "$IMAGE_URL" \
  --region "$REGION" \
  --project "$PROJECT_ID"

echo ""
echo "✅ Docker image deployed to Cloud Run successfully"
