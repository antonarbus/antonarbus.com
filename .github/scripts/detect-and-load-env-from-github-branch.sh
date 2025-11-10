#!/bin/bash

# ==============================================================================
# DETECT AND LOAD ENVIRONMENT FROM GITHUB BRANCH
# ==============================================================================
# Detects environment from GitHub branch name and loads it to GITHUB_ENV
# Exports ENVIRONMENT to GITHUB_ENV for use in subsequent workflow steps
#
# Usage (from GitHub Actions):
#   .github/scripts/detect-and-load-env-from-github-branch.sh
#
# Outputs to GITHUB_ENV:
#   - ENVIRONMENT (prod, test, pilot, dev)
# ==============================================================================

set -e

# Determine environment from branch name
BRANCH="${GITHUB_REF_NAME:-$(git rev-parse --abbrev-ref HEAD)}"

case "$BRANCH" in
  master|main)
    ENVIRONMENT="prod"
    ;;
  test)
    ENVIRONMENT="test"
    ;;
  pilot)
    ENVIRONMENT="pilot"
    ;;
  dev)
    ENVIRONMENT="dev"
    ;;
  *)
    echo "❌ Error: Unknown branch '$BRANCH'"
    echo "Allowed branches: master, main, test, pilot, dev"
    exit 1
    ;;
esac

echo "📋 Environment detected: $ENVIRONMENT (from branch: $BRANCH)"

# Export ENVIRONMENT to GITHUB_ENV
echo "ENVIRONMENT=${ENVIRONMENT}" >> "$GITHUB_ENV"

echo "✅ Environment detection complete"
