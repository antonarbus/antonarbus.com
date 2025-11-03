#!/bin/bash

# ==============================================================================
# SMART TERRAFORM WRAPPER
# ==============================================================================

# This script solves the 🐓-🥚 problem of Terraform state storage:
# - Terraform needs a GCS bucket to store state
# - The bucket is part of infrastructure and we want it to be documented & create in Terraform

# HOW IT WORKS:

# 1. Checks if the GCS bucket exists (using gsutil)
# 2. If bucket doesn't exist (first time):
#    - Runs 'terraform init -backend=false' (uses local state temporarily)
#    - Creates only the bucket: 'terraform apply -target=google_storage_bucket.terraform_state'
#    - Migrates state to bucket: 'terraform init -force-copy'
#    - Cleans up local state files
# 3. If bucket exists (ongoing):
#    - Runs terraform normally with remote backend
#
# USAGE:
#   ./terraform.sh          # Runs 'terraform apply' with auto-bootstrap in GitHub Actions ci/cd at deploy.yml
# ==============================================================================

set -e # exit immediately if any command fails

BUCKET_NAME="antonarbus-terraform-state"
BACKEND_CONFIG_FILE="backend-config.tfvars"

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
gsutil ls -b "gs://${BUCKET_NAME}" &> /dev/null
EXIT_CODE=$?
set -e  # Re-enable 'exit on error'

if [ $EXIT_CODE -eq 0 ]; then
  BUCKET_EXISTS=true
  echo_success "Bucket exists."
else
  BUCKET_EXISTS=false
  echo_warning "Bucket does not exist. Starting bootstrap..."
fi

if [ "$BUCKET_EXISTS" = true ]; then
  # Initialize with remote backend when:
  # first time running terraform or backend configuration changed or providers changed or after cloning the repo
  echo_info "Initializing Terraform with remote backend..."
  terraform init
else
  # Bootstrap: create bucket with local state, then migrate
  # https://developer.hashicorp.com/terraform/cli/commands/init
  echo_info "Creating bucket with local state (no bucket needed yet)..."
  terraform init -backend=false

  echo_info "Creating only bucket for Terraform state..."
  terraform apply -target=google_storage_bucket.terraform_state -auto-approve
  echo_success "Bucket created!"

  echo_info "Migrating state to remote backend..."
  terraform init -force-copy

  echo_info "Cleaning up local state files..."
  rm -f terraform.tfstate terraform.tfstate.backup .terraform/terraform.tfstate
  echo_success "Bootstrap complete! State is now in GCS bucket."
fi

# Run terraform apply (happens in both cases)
echo_info "Running terraform apply..."
terraform apply -auto-approve
echo_success "'terraform apply' done!"
