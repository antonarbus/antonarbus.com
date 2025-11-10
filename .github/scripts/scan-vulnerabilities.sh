#!/bin/bash

# ==============================================================================
# CONTAINER VULNERABILITY SCANNING
# ==============================================================================
# Checks vulnerability scan results from GCP Container Analysis
# GCP automatically scans all images pushed to Artifact Registry
#
# Usage (from GitHub Actions):
#   .github/scripts/scan-vulnerabilities.sh
#
# Requirements:
#   - REGION environment variable must be set
#   - PROJECT_ID environment variable must be set
#   - ARTIFACT_REGISTRY_NAME environment variable must be set
#   - DOCKER_IMAGE_NAME environment variable must be set
#   - DOCKER_IMAGE_TAG environment variable must be set
#   - containerscanning.googleapis.com API must be enabled
# ==============================================================================

set -e

# Validate required environment variables
required_vars=(
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

# Construct image URL
IMAGE_URL="${REGION}-docker.pkg.dev/${PROJECT_ID}/${ARTIFACT_REGISTRY_NAME}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"

echo "Checking vulnerability scan for image..."
echo "  Image: $IMAGE_URL"
echo ""

# Wait for scan to complete (GCP scans asynchronously)
echo "Waiting 30s for automatic vulnerability scan to complete..."
sleep 30

echo "Fetching scan results..."

# Get vulnerability summary
SCAN_OUTPUT=$(gcloud artifacts docker images describe "$IMAGE_URL" \
  --show-package-vulnerability \
  --format="value(package_vulnerability_summary.vulnerabilityCounts)" 2>/dev/null || echo "")

if [ -n "$SCAN_OUTPUT" ]; then
  echo "✅ Vulnerability scan completed"
  echo ""
  echo "Scan summary: $SCAN_OUTPUT"
  echo ""

  # Parse vulnerability counts
  CRITICAL_COUNT=$(echo "$SCAN_OUTPUT" | grep -oP "CRITICAL=\K\d+" || echo "0")
  HIGH_COUNT=$(echo "$SCAN_OUTPUT" | grep -oP "HIGH=\K\d+" || echo "0")
  MEDIUM_COUNT=$(echo "$SCAN_OUTPUT" | grep -oP "MEDIUM=\K\d+" || echo "0")
  LOW_COUNT=$(echo "$SCAN_OUTPUT" | grep -oP "LOW=\K\d+" || echo "0")

  echo "Vulnerability breakdown:"
  echo "  🔴 CRITICAL: $CRITICAL_COUNT"
  echo "  🟠 HIGH:     $HIGH_COUNT"
  echo "  🟡 MEDIUM:   $MEDIUM_COUNT"
  echo "  🟢 LOW:      $LOW_COUNT"
  echo ""

  # Check for critical vulnerabilities
  if [ "$CRITICAL_COUNT" -gt 0 ]; then
    echo "⚠️  WARNING: Found $CRITICAL_COUNT CRITICAL vulnerabilities"
    echo ""
    echo "View details in GCP Console:"
    echo "https://console.cloud.google.com/artifacts/docker/${PROJECT_ID}/${REGION}/${ARTIFACT_REGISTRY_NAME}/${DOCKER_IMAGE_NAME}"
    echo ""
    echo "Note: Deployment will continue, but please review and remediate vulnerabilities"
    echo ""

    # Add to GitHub Actions summary if available
    if [ -n "$GITHUB_STEP_SUMMARY" ]; then
      echo "## Vulnerability Scan Results" >> "$GITHUB_STEP_SUMMARY"
      echo "" >> "$GITHUB_STEP_SUMMARY"
      echo "⚠️ **Warning**: Critical vulnerabilities detected" >> "$GITHUB_STEP_SUMMARY"
      echo "" >> "$GITHUB_STEP_SUMMARY"
      echo "| Severity | Count |" >> "$GITHUB_STEP_SUMMARY"
      echo "|----------|-------|" >> "$GITHUB_STEP_SUMMARY"
      echo "| 🔴 Critical | $CRITICAL_COUNT |" >> "$GITHUB_STEP_SUMMARY"
      echo "| 🟠 High | $HIGH_COUNT |" >> "$GITHUB_STEP_SUMMARY"
      echo "| 🟡 Medium | $MEDIUM_COUNT |" >> "$GITHUB_STEP_SUMMARY"
      echo "| 🟢 Low | $LOW_COUNT |" >> "$GITHUB_STEP_SUMMARY"
      echo "" >> "$GITHUB_STEP_SUMMARY"
      echo "[View Details in GCP Console](https://console.cloud.google.com/artifacts/docker/${PROJECT_ID}/${REGION}/${ARTIFACT_REGISTRY_NAME}/${DOCKER_IMAGE_NAME})" >> "$GITHUB_STEP_SUMMARY"
    fi

    # Exit with warning (0 = continue deployment, 1 = block deployment)
    # Currently set to 0 (warning only), change to 1 if you want to block on critical CVEs
    exit 0
  else
    echo "✅ No critical vulnerabilities detected"
    echo ""

    if [ -n "$GITHUB_STEP_SUMMARY" ]; then
      echo "## Vulnerability Scan Results" >> "$GITHUB_STEP_SUMMARY"
      echo "" >> "$GITHUB_STEP_SUMMARY"
      echo "✅ **Status**: No critical vulnerabilities" >> "$GITHUB_STEP_SUMMARY"
      echo "" >> "$GITHUB_STEP_SUMMARY"
      echo "| Severity | Count |" >> "$GITHUB_STEP_SUMMARY"
      echo "|----------|-------|" >> "$GITHUB_STEP_SUMMARY"
      echo "| 🟠 High | $HIGH_COUNT |" >> "$GITHUB_STEP_SUMMARY"
      echo "| 🟡 Medium | $MEDIUM_COUNT |" >> "$GITHUB_STEP_SUMMARY"
      echo "| 🟢 Low | $LOW_COUNT |" >> "$GITHUB_STEP_SUMMARY"
    fi

    exit 0
  fi
else
  echo "ℹ️  Vulnerability scan not yet available"
  echo ""
  echo "GCP Container Analysis runs scans asynchronously."
  echo "Results will be available in a few minutes."
  echo ""
  echo "Check results later in GCP Console:"
  echo "https://console.cloud.google.com/artifacts/docker/${PROJECT_ID}/${REGION}/${ARTIFACT_REGISTRY_NAME}/${DOCKER_IMAGE_NAME}"
  echo ""
  echo "Continuing with deployment..."

  if [ -n "$GITHUB_STEP_SUMMARY" ]; then
    echo "## Vulnerability Scan Results" >> "$GITHUB_STEP_SUMMARY"
    echo "" >> "$GITHUB_STEP_SUMMARY"
    echo "ℹ️ **Status**: Scan results not yet available" >> "$GITHUB_STEP_SUMMARY"
    echo "" >> "$GITHUB_STEP_SUMMARY"
    echo "Check back in a few minutes in GCP Console" >> "$GITHUB_STEP_SUMMARY"
  fi

  exit 0
fi
