#!/bin/bash

# ==============================================================================
# CHANGE DETECTION
# ==============================================================================
# Detects what files have changed between commits
# Sets a flag indicating where changes were detected
#
# Usage (from GitHub Actions):
#   .github/scripts/detect-changes.sh
#
# Outputs to GITHUB_ENV:
#   - CHANGES_DETECTED_AT: 'terraform' | 'app' | 'both' | 'none'
# ==============================================================================

set -e

# Check if Terraform state exists for this environment
check_terraform_state_exists() {
  local env=$1
  local bucket="${BUCKET_FOR_TERRAFORM_STATE_NAME}"
  local state_path="gs://${bucket}/terraform/state/${env}.tfstate"

  if gsutil -q stat "${state_path}" 2>/dev/null; then
    return 0  # State exists
  else
    return 1  # State does not exist
  fi
}

# Check if this is the first infrastructure deployment for this environment
FIRST_DEPLOYMENT=false

if [ -n "$ENVIRONMENT" ] && [ -n "$BUCKET_FOR_TERRAFORM_STATE_NAME" ]; then
  echo "🔍 Checking Terraform state for environment: $ENVIRONMENT"
  echo "   Bucket: $BUCKET_FOR_TERRAFORM_STATE_NAME"
  echo "   State path: gs://${BUCKET_FOR_TERRAFORM_STATE_NAME}/terraform/state/${ENVIRONMENT}.tfstate"

  if ! check_terraform_state_exists "$ENVIRONMENT"; then
    echo "🆕 First deployment detected for environment: $ENVIRONMENT"
    echo "   No Terraform state found - infrastructure needs to be created"

    FIRST_DEPLOYMENT=true
  else
    echo "✅ Terraform state found for environment: $ENVIRONMENT"
  fi
fi

# Check if this is the first commit (no HEAD~1)
if ! git rev-parse HEAD~1 &>/dev/null; then
  echo "⚠️  First commit detected - treating as both terraform and app changes"
  TERRAFORM_CHANGED=true
  APP_CHANGED=true
else
  echo "Files changed (between current and previous commit):"
  git diff --name-only HEAD~1 HEAD
  echo ""

  # Check what changed
  TERRAFORM_CHANGED=false
  APP_CHANGED=false

  if git diff --name-only HEAD~1 HEAD | grep -qE '^terraform/|^config/.*\.tfvars$|^\.github/workflows/deploy\.yml'; then
    TERRAFORM_CHANGED=true
    echo "✅ Terraform changes detected"
  fi

  if git diff --name-only HEAD~1 HEAD | grep -qvE '^terraform/|^config/.*\.tfvars$|^\.github/workflows/deploy\.yml'; then
    APP_CHANGED=true
    echo "✅ App code changes detected"
  fi
fi

# Force Terraform to run on first deployment
if [ "$FIRST_DEPLOYMENT" = true ]; then
  echo "🔧 Forcing Terraform run for first-time infrastructure setup"
  TERRAFORM_CHANGED=true
fi

# Determine change location
if [ "$TERRAFORM_CHANGED" = true ] && [ "$APP_CHANGED" = true ]; then
  CHANGES_DETECTED_AT="both"
  echo "📍 Changes at: both (terraform + app)"
elif [ "$TERRAFORM_CHANGED" = true ]; then
  CHANGES_DETECTED_AT="terraform"
  echo "📍 Changes at: terraform"
elif [ "$APP_CHANGED" = true ]; then
  CHANGES_DETECTED_AT="app"
  echo "📍 Changes at: app"
else
  CHANGES_DETECTED_AT="none"
  echo "⏭️  No changes detected"
fi

echo "CHANGES_DETECTED_AT=${CHANGES_DETECTED_AT}" >> "$GITHUB_ENV"

echo ""
echo "✅ Change detection complete"
