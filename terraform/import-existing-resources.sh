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
# Automatically imports ALL resources that Terraform manages (12 total):
#   - Artifact Registry repository
#   - GitHub Actions Service Account
#   - Cloud Run Service Account
#   - 6 IAM role bindings for GitHub Actions SA
#   - Cloud Run Service
#   - Cloud Run Public Access IAM binding
#   - Cloud Run Domain Mapping
#
# This is FULLY AUTOMATIC - no manual intervention needed!
# If a resource exists in GCP, it's imported.
# If it doesn't exist, Terraform will create it.
# If it's already in state, it's skipped.
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
CUSTOM_DOMAIN=$(grep "^custom_domain" "$CONFIG_FILE" | cut -d'=' -f2 | sed 's/#.*//' | tr -d ' "')

echo "Project ID: $PROJECT_ID"
echo "Region: $REGION"
echo ""

# Helper function to check if resource is already in state
resource_in_state() {
  terraform state list 2>/dev/null | grep -q "^${1}$"
}

# Helper function to safely import a resource
# Usage: safe_import "resource_name" "resource_id"
safe_import() {
  local resource_name=$1
  local resource_id=$2

  echo "Importing $resource_name..."
  if resource_in_state "$resource_name"; then
    echo "  ✓ Already in state"
  else
    if terraform import -var-file="$CONFIG_FILE" "$resource_name" "$resource_id" >/dev/null 2>&1; then
      echo "  ✓ Imported successfully"
    else
      echo "  ⚠️  Doesn't exist in GCP (will be created)"
    fi
  fi
}

# ==============================================================================
# IMPORT ALL RESOURCES THAT TERRAFORM MANAGES
# ==============================================================================
# This automatically tries to import all resources defined in main.tf
# If they exist in GCP but not in state, they'll be imported
# If they don't exist, Terraform will create them
# ==============================================================================

echo "Attempting to import all existing resources..."
echo ""

# 1. Artifact Registry
safe_import \
  "google_artifact_registry_repository.docker_repo" \
  "projects/${PROJECT_ID}/locations/${REGION}/repositories/${ARTIFACT_REGISTRY_NAME}"

# 2. GitHub Actions Service Account
safe_import \
  "google_service_account.github_actions" \
  "projects/${PROJECT_ID}/serviceAccounts/${GITHUB_ACTIONS_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

# 3. Cloud Run Service Account
safe_import \
  "google_service_account.cloud_run_service" \
  "projects/${PROJECT_ID}/serviceAccounts/${CLOUD_RUN_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

# 4. IAM Bindings for GitHub Actions SA
# Note: IAM member bindings use a special ID format
safe_import \
  "google_project_iam_member.github_actions_cloud_run_admin" \
  "${PROJECT_ID} roles/run.admin serviceAccount:${GITHUB_ACTIONS_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

safe_import \
  "google_project_iam_member.github_actions_artifact_registry_writer" \
  "${PROJECT_ID} roles/artifactregistry.writer serviceAccount:${GITHUB_ACTIONS_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

safe_import \
  "google_project_iam_member.github_actions_service_account_user" \
  "${PROJECT_ID} roles/iam.serviceAccountUser serviceAccount:${GITHUB_ACTIONS_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

safe_import \
  "google_project_iam_member.github_actions_storage_object_user" \
  "${PROJECT_ID} roles/storage.objectUser serviceAccount:${GITHUB_ACTIONS_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

safe_import \
  "google_project_iam_member.github_actions_iam_security_reviewer" \
  "${PROJECT_ID} roles/iam.securityReviewer serviceAccount:${GITHUB_ACTIONS_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

safe_import \
  "google_project_iam_member.github_actions_service_usage_admin" \
  "${PROJECT_ID} roles/serviceusage.serviceUsageAdmin serviceAccount:${GITHUB_ACTIONS_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

# Note: Domain verification (null_resource.add_service_account_domain_verification)
# is handled by local-exec provisioner, not imported

# 5. Cloud Run Service
safe_import \
  "google_cloud_run_v2_service.main" \
  "projects/${PROJECT_ID}/locations/${REGION}/services/${CLOUD_RUN_SERVICE_NAME}"

# 6. Cloud Run Public Access IAM
safe_import \
  "google_cloud_run_v2_service_iam_member.public_access" \
  "projects/${PROJECT_ID}/locations/${REGION}/services/${CLOUD_RUN_SERVICE_NAME} roles/run.invoker allUsers"

# 7. Cloud Run Domain Mapping
safe_import \
  "google_cloud_run_domain_mapping.main" \
  "locations/${REGION}/namespaces/${PROJECT_ID}/domainmappings/${CUSTOM_DOMAIN}"

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
