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

echo "Files changed (between current and previous commit):"
git diff --name-only HEAD~1 HEAD
echo ""

# Check what changed
TERRAFORM_CHANGED=false
APP_CHANGED=false

if git diff --name-only HEAD~1 HEAD | grep -qE '^terraform/|^\.github/workflows/deploy\.yml'; then
  TERRAFORM_CHANGED=true
  echo "✅ Terraform changes detected"
fi

if git diff --name-only HEAD~1 HEAD | grep -qvE '^terraform/|^\.github/workflows/deploy\.yml'; then
  APP_CHANGED=true
  echo "✅ App code changes detected"
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
