#!/bin/bash

# ==============================================================================
# IMPORT EXISTING GCP RESOURCES INTO TERRAFORM STATE
# ==============================================================================
# This script imports existing GCP resources into Terraform state to prevent
# "Error 409: already exists" errors.
#
# AUTOMATIC USAGE (via terraform.sh):
#   This script is called automatically by terraform.sh during deployment
#   You don't need to run it manually in most cases!
#
# MANUAL USAGE (for troubleshooting):
#   cd terraform/infrastructure
#   bash ../import-existing-resources.sh prod
#
# ==============================================================================
# HOW THIS SCRIPT IS USED
# ==============================================================================
#
# AUTOMATICALLY (CI/CD and terraform.sh):
#   - terraform.sh calls this script before running terraform apply
#   - Runs in non-interactive mode (no prompts)
#   - Prevents 409 errors by importing existing resources
#   - Output is integrated into terraform.sh workflow
#
# MANUALLY (Local troubleshooting):
#   - Run directly when debugging state issues
#   - Interactive mode - asks if you want to run terraform plan
#   - Shows detailed import output
#   - Useful for testing before pushing to CI/CD
#
# ==============================================================================
# WHEN TO RUN THIS MANUALLY
# ==============================================================================
# Only run manually when:
#   1. Testing imports locally before committing changes
#   2. Troubleshooting state issues (resources exist but not in state)
#   3. Initial migration of existing infrastructure to Terraform
#   4. Debugging why automatic imports aren't working
#
# You DON'T need to run manually if:
#   ✅ terraform.sh is working fine (it calls this automatically)
#   ✅ CI/CD is running successfully
#   ✅ Fresh project with no existing resources
#
# ==============================================================================
# WHAT THIS SCRIPT IMPORTS
# ==============================================================================
# Attempts to import these resources if they exist:
#   - Artifact Registry repository
#   - GitHub Actions Service Account
#   - Cloud Run Service Account
#   - Cloud Run Service
#
# If a resource doesn't exist or is already imported, the import is skipped.
#
# ==============================================================================

set -e

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
  echo "❌ Error: Environment parameter is required"
  echo "Usage: $0 <environment>"
  echo "Example: $0 prod"
  exit 1
fi

# Load config variables
CONFIG_FILE="../../config/${ENVIRONMENT}.tfvars"

if [ ! -f "$CONFIG_FILE" ]; then
  echo "❌ Error: Config file not found: $CONFIG_FILE"
  exit 1
fi

echo "📦 Importing existing GCP resources for environment: $ENVIRONMENT"
echo ""

# Parse tfvars file to get variable values (strip inline comments)
PROJECT_ID=$(grep "^project_id" "$CONFIG_FILE" | cut -d'=' -f2 | sed 's/#.*//' | tr -d ' "')
REGION=$(grep "^region" "$CONFIG_FILE" | cut -d'=' -f2 | sed 's/#.*//' | tr -d ' "')
ARTIFACT_REGISTRY_NAME=$(grep "^artifact_registry_name" "$CONFIG_FILE" | cut -d'=' -f2 | sed 's/#.*//' | tr -d ' "')
GITHUB_ACTIONS_SA_NAME=$(grep "^github_actions_sa_name" "$CONFIG_FILE" | cut -d'=' -f2 | sed 's/#.*//' | tr -d ' "')
CLOUD_RUN_SA_NAME=$(grep "^cloud_run_sa_name" "$CONFIG_FILE" | cut -d'=' -f2 | sed 's/#.*//' | tr -d ' "')
CLOUD_RUN_SERVICE_NAME=$(grep "^cloud_run_service_name" "$CONFIG_FILE" | cut -d'=' -f2 | sed 's/#.*//' | tr -d ' "')

echo "Project ID: $PROJECT_ID"
echo "Region: $REGION"
echo ""

# Import Artifact Registry (if exists)
echo "Importing Artifact Registry..."
terraform import \
  -var-file="$CONFIG_FILE" \
  google_artifact_registry_repository.docker_repo \
  "projects/${PROJECT_ID}/locations/${REGION}/repositories/${ARTIFACT_REGISTRY_NAME}" \
  2>/dev/null || echo "  ⚠️  Already imported or doesn't exist"

# Import GitHub Actions Service Account (if exists)
echo "Importing GitHub Actions Service Account..."
terraform import \
  -var-file="$CONFIG_FILE" \
  google_service_account.github_actions \
  "projects/${PROJECT_ID}/serviceAccounts/${GITHUB_ACTIONS_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  2>/dev/null || echo "  ⚠️  Already imported or doesn't exist"

# Import Cloud Run Service Account (if exists)
echo "Importing Cloud Run Service Account..."
terraform import \
  -var-file="$CONFIG_FILE" \
  google_service_account.cloud_run_service \
  "projects/${PROJECT_ID}/serviceAccounts/${CLOUD_RUN_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  2>/dev/null || echo "  ⚠️  Already imported or doesn't exist"

# Import Cloud Run Service (if exists)
echo "Importing Cloud Run Service..."
terraform import \
  -var-file="$CONFIG_FILE" \
  google_cloud_run_v2_service.main \
  "projects/${PROJECT_ID}/locations/${REGION}/services/${CLOUD_RUN_SERVICE_NAME}" \
  2>/dev/null || echo "  ⚠️  Already imported or doesn't exist"

echo ""
echo "✅ Import complete!"
echo ""

# Only prompt for terraform plan if not in non-interactive mode (CI/CD)
if [ -t 0 ]; then
  # Interactive mode (terminal attached) - ask user
  read -p "Run 'terraform plan' now to verify? (y/n) " -n 1 -r
  echo ""

  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Running: terraform plan -var-file=\"$CONFIG_FILE\""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    terraform plan -var-file="$CONFIG_FILE"

    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "If the plan looks good, apply the changes with:"
    echo "  terraform apply -var-file=\"$CONFIG_FILE\""
  else
    echo ""
    echo "Skipped. You can verify the import manually:"
    echo "  terraform plan -var-file=\"$CONFIG_FILE\""
    echo ""
    echo "Then apply any pending changes:"
    echo "  terraform apply -var-file=\"$CONFIG_FILE\""
  fi
else
  # Non-interactive mode (CI/CD) - skip prompt
  echo "Running in non-interactive mode (CI/CD) - skipping terraform plan prompt"
fi
