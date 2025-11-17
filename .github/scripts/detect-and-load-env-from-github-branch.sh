#!/bin/bash

# ==============================================================================
# DETECT AND LOAD ENVIRONMENT FROM GITHUB BRANCH
# ==============================================================================
# Master branch always deploys to dev environment
# Other environments (test, pilot, prod) use image promotion workflow at GitHub
#
# Outputs to GITHUB_ENV:
#   - ENVIRONMENT (always 'dev' for master branch)
# ==============================================================================

set -e

BRANCH="${GITHUB_REF_NAME:-$(git rev-parse --abbrev-ref HEAD)}"

# Master branch always deploys to dev
# Other environments are reached via promotion workflow at GitHub, not direct push
if [[ "$BRANCH" == "master" || "$BRANCH" == "main" ]]; then
  ENVIRONMENT="dev"
else
  echo "Error: Only master/main branch triggers deployment to dev environment"
  echo "Current branch: $BRANCH"
  echo "Use the Promote Release workflow at GitHub to deploy to other environments"
  exit 1
fi

echo "Environment: $ENVIRONMENT (from branch: $BRANCH)"

# Export ENVIRONMENT to GITHUB_ENV
echo "ENVIRONMENT=${ENVIRONMENT}" >> "$GITHUB_ENV"

echo "Environment detection complete"
