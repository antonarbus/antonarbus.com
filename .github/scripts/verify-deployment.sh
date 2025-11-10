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
#   - CLOUD_RUN_SERVICE_NAME environment variable must be set
#   - REGION environment variable must be set
#   - PROJECT_ID environment variable must be set
#   - gcloud CLI must be authenticated
# ==============================================================================

set -e

if [ -z "$CLOUD_RUN_SERVICE_NAME" ]; then
  echo "❌ Error: CLOUD_RUN_SERVICE_NAME environment variable not set"
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
URL=$(gcloud run services describe "$CLOUD_RUN_SERVICE_NAME" \
  --region "$REGION" \
  --project "$PROJECT_ID" \
  --format="value(status.url)")

echo "Testing URL: $URL"
echo ""

# Test if site responds with 200 OK
if ! HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL" 2>&1); then
  echo "❌ curl command failed"
  exit 1
fi

# Validate HTTP_CODE is a number
if ! [[ "$HTTP_CODE" =~ ^[0-9]+$ ]]; then
  echo "❌ Invalid HTTP response code: $HTTP_CODE"
  exit 1
fi

if [ "$HTTP_CODE" -eq 200 ]; then
  echo "✅ Site is live and responding (HTTP $HTTP_CODE)"
  echo ""

  # Smoke tests: Verify actual content
  echo "Running smoke tests..."
  SMOKE_TEST_FAILURES=0

  # Test 1: Check that response contains HTML
  echo "  1. Checking for HTML content..."
  RESPONSE=$(curl -s "$URL")
  if echo "$RESPONSE" | grep -qi "<html\|<!DOCTYPE"; then
    echo "     ✅ HTML content detected"
  else
    echo "     ❌ No HTML content found"
    SMOKE_TEST_FAILURES=$((SMOKE_TEST_FAILURES + 1))
  fi

  # Test 2: Check response size (should be more than 100 bytes)
  echo "  2. Checking response size..."
  RESPONSE_SIZE=${#RESPONSE}
  if [ "$RESPONSE_SIZE" -gt 100 ]; then
    echo "     ✅ Response size: ${RESPONSE_SIZE} bytes"
  else
    echo "     ❌ Response too small: ${RESPONSE_SIZE} bytes (expected > 100)"
    SMOKE_TEST_FAILURES=$((SMOKE_TEST_FAILURES + 1))
  fi

  # Test 3: Check response time
  echo "  3. Checking response time..."
  RESPONSE_TIME=$(curl -s -o /dev/null -w "%{time_total}" "$URL")
  # Convert to milliseconds for display
  RESPONSE_TIME_MS=$(echo "$RESPONSE_TIME * 1000" | bc)
  echo "     Response time: ${RESPONSE_TIME_MS}ms"
  
  if (( $(echo "$RESPONSE_TIME < 10.0" | bc -l) )); then
    echo "     ✅ Response time acceptable"
  else
    echo "     ⚠️  Response time slow (> 10s)"
  fi

  echo ""

  if [ $SMOKE_TEST_FAILURES -eq 0 ]; then
    echo "✅ All smoke tests passed"
    echo "🌐 Deployment URL: $URL"
    echo ""

    # Add to GitHub Actions summary if available
    if [ -n "$GITHUB_STEP_SUMMARY" ]; then
      echo "## Deployment Verification" >> "$GITHUB_STEP_SUMMARY"
      echo "" >> "$GITHUB_STEP_SUMMARY"
      echo "✅ **Status**: Live and responding" >> "$GITHUB_STEP_SUMMARY"
      echo "🌐 **URL**: $URL" >> "$GITHUB_STEP_SUMMARY"
      echo "📊 **HTTP Status**: $HTTP_CODE" >> "$GITHUB_STEP_SUMMARY"
      echo "🧪 **Smoke Tests**: All passed (${RESPONSE_SIZE} bytes, ${RESPONSE_TIME_MS}ms)" >> "$GITHUB_STEP_SUMMARY"
    fi

    exit 0
  else
    echo "❌ ${SMOKE_TEST_FAILURES} smoke test(s) failed"
    echo "⚠️  Site is responding but content may be incorrect"
    echo "🌐 URL: $URL"
    echo ""

    # Treat smoke test failures as deployment failures
    if [ -n "$GITHUB_STEP_SUMMARY" ]; then
      echo "## Deployment Verification" >> "$GITHUB_STEP_SUMMARY"
      echo "" >> "$GITHUB_STEP_SUMMARY"
      echo "⚠️ **Status**: Responding but smoke tests failed" >> "$GITHUB_STEP_SUMMARY"
      echo "📊 **HTTP Status**: $HTTP_CODE" >> "$GITHUB_STEP_SUMMARY"
      echo "🧪 **Smoke Tests**: ${SMOKE_TEST_FAILURES} failed" >> "$GITHUB_STEP_SUMMARY"
    fi

    # Trigger rollback for smoke test failures
    if [ -n "$PREVIOUS_IMAGE" ] && [ "$PREVIOUS_IMAGE" != "none" ]; then
      echo "⚠️  Attempting rollback due to smoke test failures..."
      echo "  Rolling back to: $PREVIOUS_IMAGE"

      if gcloud run services update "$CLOUD_RUN_SERVICE_NAME" \
        --image "$PREVIOUS_IMAGE" \
        --region "$REGION" \
        --project "$PROJECT_ID"; then

        echo "✅ Rollback successful"
      else
        echo "❌ Rollback failed"
      fi
    fi

    exit 1
  fi
else
  echo "❌ Site returned HTTP $HTTP_CODE"
  echo ""

  # Attempt rollback if previous image is available
  if [ -n "$PREVIOUS_IMAGE" ] && [ "$PREVIOUS_IMAGE" != "none" ]; then
    echo "⚠️  Attempting rollback to previous image..."
    echo "  Rolling back to: $PREVIOUS_IMAGE"

    if gcloud run services update "$CLOUD_RUN_SERVICE_NAME" \
      --image "$PREVIOUS_IMAGE" \
      --region "$REGION" \
      --project "$PROJECT_ID"; then

      echo ""
      echo "✅ Rollback successful"
      echo "⏳ Waiting 10s for rollback to stabilize..."
      sleep 10

      # Verify rollback worked
      ROLLBACK_HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL" 2>&1 || echo "000")
      if [ "$ROLLBACK_HTTP_CODE" -eq 200 ]; then
        echo "✅ Service restored and responding (HTTP $ROLLBACK_HTTP_CODE)"
      else
        echo "⚠️  Rollback completed but service still not responding properly (HTTP $ROLLBACK_HTTP_CODE)"
      fi
    else
      echo "❌ Rollback failed"
    fi
  else
    echo "⚠️  No previous image available for rollback"
  fi

  echo ""

  # Add to GitHub Actions summary if available
  if [ -n "$GITHUB_STEP_SUMMARY" ]; then
    echo "## Deployment Verification" >> "$GITHUB_STEP_SUMMARY"
    echo "" >> "$GITHUB_STEP_SUMMARY"
    echo "❌ **Status**: Failed" >> "$GITHUB_STEP_SUMMARY"
    echo "📊 **HTTP Status**: $HTTP_CODE" >> "$GITHUB_STEP_SUMMARY"
    echo "" >> "$GITHUB_STEP_SUMMARY"
    echo "Expected HTTP 200, got $HTTP_CODE" >> "$GITHUB_STEP_SUMMARY"

    if [ -n "$PREVIOUS_IMAGE" ] && [ "$PREVIOUS_IMAGE" != "none" ]; then
      echo "" >> "$GITHUB_STEP_SUMMARY"
      echo "🔄 **Rollback**: Attempted to previous image" >> "$GITHUB_STEP_SUMMARY"
    fi
  fi

  exit 1
fi
