#!/bin/bash

# ==============================================================================
# TERRAFORM DEPLOYMENT SCRIPT (INFRASTRUCTURE ONLY)
# ==============================================================================
#
# This script deploys main infrastructure using Terraform.
# Bootstrap resources (state bucket + Workload Identity) are created separately.
#
# DIRECTORY STRUCTURE:
#   bootstrap/      - One-time setup (run locally, see bootstrap/README.md)
#   infrastructure/ - Main infrastructure (uses remote backend, runs in CI/CD)
#
# USAGE:
#   ./terraform.sh  # Runs from GitHub Actions or can be run manually
# ==============================================================================

set -e # exit immediately if any command fails

# Get script directory and ensure we're in terraform/
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Detect environment from git branch or ENV variable
if [ -z "$ENV" ]; then
  BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "master")

  case "$BRANCH" in
    master|main)
      ENV="prod"
      ;;
    test)
      ENV="test"
      ;;
    pilot)
      ENV="pilot"
      ;;
    dev)
      ENV="dev"
      ;;
    *)
      echo "❌ Error: Unknown branch '$BRANCH'"
      echo "Allowed branches: master, main, test, pilot, dev"
      echo "Or set ENV variable explicitly: ENV=prod ./terraform.sh"
      exit 1
      ;;
  esac
fi

echo "📋 Environment: $ENV"

# Validate config file before proceeding
echo ""
echo "Validating config file..."
if ! ../config/validate.sh "$ENV"; then
  echo "❌ Config validation failed"
  exit 1
fi
echo ""

# Load all variables using shared utility
eval "$(../config/load-config-variables.sh "$ENV")"

# Resolve config path for Terraform var-file
CONFIG_VARIABLES_FILE_PATH=$(realpath "../config/${ENV}.tfvars")
echo "📄 Config: $CONFIG_VARIABLES_FILE_PATH"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NO_COLOR='\033[0m'

echo_info() { echo -e "${BLUE}ℹ ${1}${NO_COLOR}"; }
echo_success() { echo -e "${GREEN}✓ ${1}${NO_COLOR}"; }
echo_warning() { echo -e "${YELLOW}⚠ ${1}${NO_COLOR}"; }
echo_error() { echo -e "${RED}✗ ${1}${NO_COLOR}"; }

echo ""
echo_info "Deploying main infrastructure for environment: $ENV"
echo ""

cd infrastructure/

echo_info "Initializing Terraform with remote backend..."

terraform init \
  -backend-config="bucket=${BUCKET_FOR_TERRAFORM_STATE_NAME}" \
  -backend-config="prefix=terraform/state/${ENV}"

echo ""
echo_info "Applying Terraform configuration..."
echo_info "Config file: $CONFIG_VARIABLES_FILE_PATH"
echo ""

terraform apply -auto-approve -var-file="$CONFIG_VARIABLES_FILE_PATH"

echo ""
echo_success "Terraform apply completed successfully"
echo ""

echo_info "Terraform Outputs:"
terraform output

cd ..

echo ""
echo_success "Infrastructure deployment complete!"
echo ""

# Summary for GitHub Actions (if GITHUB_STEP_SUMMARY is available)
if [ -n "$GITHUB_STEP_SUMMARY" ]; then
  echo "## Terraform Apply Summary" >> "$GITHUB_STEP_SUMMARY"
  echo "" >> "$GITHUB_STEP_SUMMARY"
  echo "**Environment**: $ENV" >> "$GITHUB_STEP_SUMMARY"
  echo "**Config**: \`$CONFIG_VARIABLES_FILE_PATH\`" >> "$GITHUB_STEP_SUMMARY"
  echo "**Status**: ✅ Success" >> "$GITHUB_STEP_SUMMARY"
  echo "" >> "$GITHUB_STEP_SUMMARY"
  echo "Infrastructure updated successfully" >> "$GITHUB_STEP_SUMMARY"
fi
