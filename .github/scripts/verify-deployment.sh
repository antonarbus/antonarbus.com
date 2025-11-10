#!/bin/bash

# ==============================================================================
# DEPLOYMENT VERIFICATION
# ==============================================================================
# Verifies that the Cloud Run service is deployed and responding
#
# Usage (from GitHub Actions):
#   .github/scripts/verify-deployment.sh
#
# Requirements:
#   - SERVICE_NAME environment variable must be set
#   - REGION environment variable must be set
#   - PROJECT_ID environment variable must be set
#   - gcloud CLI must be authenticated
# ==============================================================================

set -e

if [ -z "$SERVICE_NAME" ]; then
  echo "❌ Error: SERVICE_NAME environment variable not set"
  exit 1
fi

if [ -z "$REGION" ]; then
  echo "❌ Error: REGION environment variable not set"
  exit 1
fi

if [ -z "$PROJECT_ID" ]; then
  echo "❌ Error: PROJECT_ID environment variable not set"
  exit 1
fi

echo "Waiting for deployment to be ready..."
sleep 10

echo ""
echo "Getting service URL..."

# Get the service URL
URL=$(gcloud run services describe "$SERVICE_NAME" \
  --region "$REGION" \
  --project "$PROJECT_ID" \
  --format="value(status.url)")

echo "Testing URL: $URL"
echo ""

# Test if site responds with 200 OK
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")

if [ "$HTTP_CODE" -eq 200 ]; then
  echo "✅ Site is live and responding (HTTP $HTTP_CODE)"
  echo "🌐 Deployment URL: $URL"
  echo ""

  # Add to GitHub Actions summary if available
  if [ -n "$GITHUB_STEP_SUMMARY" ]; then
    echo "## Deployment Verification" >> "$GITHUB_STEP_SUMMARY"
    echo "" >> "$GITHUB_STEP_SUMMARY"
    echo "✅ **Status**: Live and responding" >> "$GITHUB_STEP_SUMMARY"
    echo "🌐 **URL**: $URL" >> "$GITHUB_STEP_SUMMARY"
    echo "📊 **HTTP Status**: $HTTP_CODE" >> "$GITHUB_STEP_SUMMARY"
  fi

  exit 0
else
  echo "❌ Site returned HTTP $HTTP_CODE"
  echo ""

  # Add to GitHub Actions summary if available
  if [ -n "$GITHUB_STEP_SUMMARY" ]; then
    echo "## Deployment Verification" >> "$GITHUB_STEP_SUMMARY"
    echo "" >> "$GITHUB_STEP_SUMMARY"
    echo "❌ **Status**: Failed" >> "$GITHUB_STEP_SUMMARY"
    echo "📊 **HTTP Status**: $HTTP_CODE" >> "$GITHUB_STEP_SUMMARY"
    echo "" >> "$GITHUB_STEP_SUMMARY"
    echo "Expected HTTP 200, got $HTTP_CODE" >> "$GITHUB_STEP_SUMMARY"
  fi

  exit 1
fi
