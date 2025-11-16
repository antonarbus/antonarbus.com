#!/bin/bash

# ==============================================================================
# PROMOTE DOCKER IMAGE BETWEEN ENVIRONMENTS
# ==============================================================================
# Re-tags a tested Docker image for the target environment
# Since all environments share one registry, this is just adding new tags
# This ensures the exact same binary runs in all environments
#
# Example: After promoting dev → test → pilot, the same image has multiple tags:
#   myimage:dev    → sha256:abc123
#   myimage:test   → sha256:abc123
#   myimage:pilot  → sha256:abc123
# All tags point to the same digest (same image content)
#
# Usage (from GitHub Actions):
#   .github/scripts/promote-image.sh
#
# Requirements:
#   - SOURCE_ENV environment variable (e.g., dev)
#   - TARGET_ENV environment variable (e.g., test)
#   - REGION environment variable must be set
#   - PROJECT_ID environment variable must be set
#   - ARTIFACT_REGISTRY_NAME environment variable must be set
#   - DOCKER_IMAGE_NAME environment variable must be set
#   - gcloud CLI must be authenticated
# ==============================================================================

set -e

# Validate required environment variables
required_vars=(
  "SOURCE_ENV"
  "TARGET_ENV"
  "REGION"
  "PROJECT_ID"
  "ARTIFACT_REGISTRY_NAME"
  "DOCKER_IMAGE_NAME"
)

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "Error: $var environment variable not set"
    exit 1
  fi
done

# Construct image URLs (same registry, different tags)
BASE_IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${ARTIFACT_REGISTRY_NAME}/${DOCKER_IMAGE_NAME}"
SOURCE_IMAGE="${BASE_IMAGE}:${SOURCE_ENV}"
TARGET_IMAGE="${BASE_IMAGE}:${TARGET_ENV}"

echo "Promoting Docker image..."
echo "  Registry: ${ARTIFACT_REGISTRY_NAME}"
echo "  Source tag: ${SOURCE_ENV}"
echo "  Target tag: ${TARGET_ENV}"
echo ""

# Verify source image exists
echo "Verifying source image exists..."

if ! gcloud artifacts docker images describe "$SOURCE_IMAGE" --project="$PROJECT_ID" > /dev/null 2>&1; then
  echo "Error: Source image not found: $SOURCE_IMAGE"
  echo "Make sure the source environment has been deployed first."
  exit 1
fi

echo "Source image found"
echo ""

# Get the digest (hash) of the source image for traceability
SOURCE_DIGEST=$(gcloud artifacts docker images describe "$SOURCE_IMAGE" \
  --project="$PROJECT_ID" \
  --format="value(image_summary.digest)" 2>/dev/null || echo "unknown")

echo "Source image digest (hash): $SOURCE_DIGEST"

# Add target environment tag to the same image (no pull/push needed)
# This is much faster than copying between registries
echo "Adding target environment tag..."
gcloud artifacts docker tags add "$SOURCE_IMAGE" "$TARGET_IMAGE" --quiet

echo ""
echo "Image promoted successfully"
echo "  Source: $SOURCE_IMAGE"
echo "  Target: $TARGET_IMAGE"
echo "  Digest: $SOURCE_DIGEST (same image, new tag)"

# Export promoted image tag for deployment step
if [ -n "$GITHUB_ENV" ]; then
  echo "PROMOTED_IMAGE_TAG=${TARGET_ENV}" >> "$GITHUB_ENV"
  echo "SOURCE_IMAGE_DIGEST=${SOURCE_DIGEST}" >> "$GITHUB_ENV"
fi
