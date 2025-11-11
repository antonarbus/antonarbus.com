#!/bin/bash

# ==============================================================================
# GRANT IAM PERMISSIONS TO GITHUB ACTIONS SERVICE ACCOUNT
# ==============================================================================
# This script grants all necessary permissions to the GitHub Actions service
# account so it can run Terraform and deploy your application
#
# Usage:
#   bash terraform/grant-github-actions-permissions.sh prod
#
# Prerequisites:
#   - You must be authenticated with gcloud (run: gcloud auth login)
#   - You must have Owner or Project IAM Admin role on the project
#
# ==============================================================================
# PROBLEM THIS SOLVES
# ==============================================================================
# If you see errors like:
#   Error: Error creating service account: googleapi: Error 403:
#   Permission 'iam.serviceAccounts.create' denied
#
# This means the account running Terraform doesn't have sufficient permissions.
#
# ==============================================================================
# IAM ROLES GRANTED
# ==============================================================================
# This script grants 5 roles to the GitHub Actions service account:
#
# 1. roles/iam.serviceAccountAdmin
#    - Create/manage service accounts for GitHub Actions and Cloud Run
#    - Permissions: iam.serviceAccounts.{create,delete,update,get,list}
#
# 2. roles/artifactregistry.admin
#    - Create and manage the Docker image repository
#    - Permissions: artifactregistry.repositories.{create,delete,update,get}
#
# 3. roles/run.admin
#    - Create and manage Cloud Run services
#    - Permissions: run.services.{create,update,delete,setIamPolicy}
#
# 4. roles/resourcemanager.projectIamAdmin
#    - Grant permissions to other service accounts
#    - Permissions: resourcemanager.projects.{getIamPolicy,setIamPolicy}
#
# 5. roles/storage.admin
#    - Manage Terraform state bucket and objects
#    - Permissions: storage.{buckets,objects}.{create,delete}
#
# ==============================================================================
# SECURITY NOTE
# ==============================================================================
# These are POWERFUL permissions. In production, consider:
#
# 1. Separate accounts for different purposes:
#    - One account for initial Terraform setup (with all permissions)
#    - One account for CI/CD (with limited permissions for updates only)
#
# 2. Use conditions to limit when permissions apply
#
# 3. Regular audits of who has these permissions
#
# ==============================================================================
# TROUBLESHOOTING
# ==============================================================================
# If you still get permission errors after running this script:
#
# 1. Wait 1-2 minutes - IAM changes take time to propagate
#
# 2. Verify the roles were granted:
#    gcloud projects get-iam-policy PROJECT_ID \
#      --flatten="bindings[].members" \
#      --filter="bindings.members:SERVICE_ACCOUNT_EMAIL"
#
# 3. Check you're using the right project:
#    gcloud config get-value project
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

# Get the script directory to find config files
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CONFIG_FILE="$REPO_ROOT/config/${ENVIRONMENT}.tfvars"

# Check if config file exists
if [ ! -f "$CONFIG_FILE" ]; then
  echo "❌ Error: Config file not found: config/${ENVIRONMENT}.tfvars"
  echo "Available environments: prod, pilot, test, dev"
  exit 1
fi

echo "🔐 Granting IAM permissions for GitHub Actions"
echo "Environment: $ENVIRONMENT"
echo ""

# Parse tfvars file to get variable values
PROJECT_ID=$(grep "^project_id" "$CONFIG_FILE" | cut -d'=' -f2 | tr -d ' "')
GITHUB_ACTIONS_SA_NAME=$(grep "^github_actions_sa_name" "$CONFIG_FILE" | cut -d'=' -f2 | tr -d ' "')

if [ -z "$PROJECT_ID" ] || [ -z "$GITHUB_ACTIONS_SA_NAME" ]; then
  echo "❌ Error: Could not parse project_id or github_actions_sa_name from config file"
  exit 1
fi

SERVICE_ACCOUNT_EMAIL="${GITHUB_ACTIONS_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

echo "Project ID: $PROJECT_ID"
echo "Service Account: $SERVICE_ACCOUNT_EMAIL"
echo ""

# Check if service account exists
if ! gcloud iam service-accounts describe "$SERVICE_ACCOUNT_EMAIL" --project="$PROJECT_ID" &>/dev/null; then
  echo "⚠️  Warning: Service account does not exist yet."
  echo "Creating service account: $SERVICE_ACCOUNT_EMAIL"
  gcloud iam service-accounts create "$GITHUB_ACTIONS_SA_NAME" \
    --project="$PROJECT_ID" \
    --display-name="GitHub Actions Service Account" \
    --description="Service account for GitHub Actions to deploy to Cloud Run"
  echo "✅ Service account created"
  echo ""
fi

# Array of roles to grant
ROLES=(
  "roles/iam.serviceAccountAdmin"
  "roles/artifactregistry.admin"
  "roles/run.admin"
  "roles/resourcemanager.projectIamAdmin"
  "roles/storage.admin"
)

echo "Granting roles to service account..."
echo ""

for ROLE in "${ROLES[@]}"; do
  echo "  📌 Granting: $ROLE"

  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
    --role="$ROLE" \
    --condition=None \
    --quiet \
    > /dev/null

  echo "     ✅ Granted"
done

echo ""
echo "✅ All permissions granted successfully!"
echo ""
echo "📋 Summary of granted roles:"
echo "   • Service Account Admin     - Create/manage service accounts"
echo "   • Artifact Registry Admin   - Manage Docker images"
echo "   • Cloud Run Admin           - Deploy and manage Cloud Run services"
echo "   • Project IAM Admin         - Grant permissions to other service accounts"
echo "   • Storage Admin             - Manage Terraform state bucket"
echo ""
echo "🔍 To verify permissions, run:"
echo "   gcloud projects get-iam-policy $PROJECT_ID \\"
echo "     --flatten=\"bindings[].members\" \\"
echo "     --filter=\"bindings.members:${SERVICE_ACCOUNT_EMAIL}\""
echo ""
echo "⏱️  Note: IAM changes may take 1-2 minutes to propagate"
