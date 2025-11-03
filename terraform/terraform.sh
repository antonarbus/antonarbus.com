#!/bin/bash

# ==============================================================================
# TERRAFORM DEPLOYMENT SCRIPT WITH SMART BOOTSTRAP
# ==============================================================================
#
# This script manages Terraform infrastructure with automatic bootstrap:
# - Checks if the state bucket exists
# - If not: runs bootstrap to create it
# - Then applies main infrastructure with remote backend
#
# DIRECTORY STRUCTURE:
#   bootstrap/      - Creates the GCS bucket for state (local state)
#   infrastructure/ - Main infrastructure (uses remote backend)
#
# USAGE:
#   ./terraform.sh  # Runs from GitHub Actions or locally
# ==============================================================================

set -e # exit immediately if any command fails

BUCKET_NAME="antonarbus-terraform-state"

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

echo_info "Checking if Terraform state bucket exists..."
set +e # Temporarily disable 'exit on error' for bucket check

gcloud storage buckets describe "gs://${BUCKET_NAME}" &> /tmp/bucket_check.txt
EXIT_CODE=$?

set -e  # Re-enable 'exit on error'

if [ $EXIT_CODE -eq 0 ]; then
  BUCKET_EXISTS=true
  echo_success "Bucket exists."
else
  BUCKET_EXISTS=false
  echo_warning "Bucket does not exist. Starting bootstrap..."
fi

if [ "$BUCKET_EXISTS" = false ]; then
  # Bootstrap: create the state bucket
  echo_info "Running bootstrap to create state bucket..."

  cd bootstrap/
  terraform init
  terraform apply -auto-approve
  cd ..

  echo_success "Bootstrap complete! Bucket created."
fi

# Deploy main infrastructure
echo_info "Deploying main infrastructure..."

cd infrastructure/
terraform init \
  -backend-config="bucket=${BUCKET_NAME}" \
  -backend-config="prefix=terraform/state"

terraform apply -auto-approve
cd ..

echo_success "Deployment complete!"
