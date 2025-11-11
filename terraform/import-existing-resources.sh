#!/bin/bash

# ==============================================================================
# IMPORT EXISTING GCP RESOURCES INTO TERRAFORM STATE
# ==============================================================================
# Run this script if you get "Error 409: already exists" errors
# This imports existing GCP resources into Terraform's state
#
# Usage:
#   cd terraform/infrastructure
#   bash ../import-existing-resources.sh prod
#
# ==============================================================================
# WHEN DO YOU NEED THIS?
# ==============================================================================
# You need this script if you get errors like:
#   Error 409: the repository already exists
#   Error 409: Service account already exists
#
# This happens when:
#   1. Resources were created manually in Google Cloud Console
#   2. Resources were created by a different Terraform run
#   3. Terraform state file was deleted but resources still exist in GCP
#   4. You're migrating existing infrastructure to Terraform
#
# What this script does:
#   - Tells Terraform: "These resources already exist in GCP"
#   - Adds them to Terraform state so Terraform can manage them
#   - After importing, Terraform won't try to recreate them
#
# ==============================================================================
# WHEN DON'T YOU NEED THIS?
# ==============================================================================
# Skip this script if:
#   ✅ This is a fresh project with no existing resources
#   ✅ Terraform created all resources from the start
#   ✅ You're not getting 409 errors
#
# ==============================================================================
# SETUP ORDER (if you're getting both 403 and 409 errors)
# ==============================================================================
# 1. Grant permissions first:
#    bash terraform/grant-github-actions-permissions.sh prod
#
# 2. Import existing resources (this script):
#    cd terraform/infrastructure
#    bash ../import-existing-resources.sh prod
#
# 3. Run Terraform:
#    terraform plan -var-file="../../config/prod.tfvars"
#    terraform apply -var-file="../../config/prod.tfvars"
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

# Parse tfvars file to get variable values
PROJECT_ID=$(grep "^project_id" "$CONFIG_FILE" | cut -d'=' -f2 | tr -d ' "')
REGION=$(grep "^region" "$CONFIG_FILE" | cut -d'=' -f2 | tr -d ' "')
ARTIFACT_REGISTRY_NAME=$(grep "^artifact_registry_name" "$CONFIG_FILE" | cut -d'=' -f2 | tr -d ' "')
GITHUB_ACTIONS_SA_NAME=$(grep "^github_actions_sa_name" "$CONFIG_FILE" | cut -d'=' -f2 | tr -d ' "')
CLOUD_RUN_SA_NAME=$(grep "^cloud_run_sa_name" "$CONFIG_FILE" | cut -d'=' -f2 | tr -d ' "')

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

echo ""
echo "✅ Import complete!"
echo ""

# Ask if user wants to run terraform plan automatically
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
