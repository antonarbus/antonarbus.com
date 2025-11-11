#!/bin/bash

# ==============================================================================
# CHECK GITHUB ACTIONS IAM PERMISSIONS
# ==============================================================================
# This script verifies that the GitHub Actions service account has all
# required IAM permissions. Run this in CI/CD to fail fast with a helpful
# error message if permissions are missing.
#
# Usage:
#   bash terraform/check-github-actions-permissions.sh prod
#
# Exit codes:
#   0 - All permissions are present
#   1 - Missing permissions or errors
# ==============================================================================

set -e

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
  echo "❌ Error: Environment parameter is required"
  echo "Usage: $0 <environment>"
  exit 1
fi

# Get the script directory to find config files
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CONFIG_FILE="$REPO_ROOT/config/${ENVIRONMENT}.tfvars"

# Check if config file exists
if [ ! -f "$CONFIG_FILE" ]; then
  echo "❌ Error: Config file not found: config/${ENVIRONMENT}.tfvars"
  exit 1
fi

# Parse tfvars file to get variable values (strip inline comments)
PROJECT_ID=$(grep "^project_id" "$CONFIG_FILE" | cut -d'=' -f2 | sed 's/#.*//' | tr -d ' "')
GITHUB_ACTIONS_SA_NAME=$(grep "^github_actions_sa_name" "$CONFIG_FILE" | cut -d'=' -f2 | sed 's/#.*//' | tr -d ' "')

if [ -z "$PROJECT_ID" ] || [ -z "$GITHUB_ACTIONS_SA_NAME" ]; then
  echo "❌ Error: Could not parse project_id or github_actions_sa_name from config file"
  exit 1
fi

SERVICE_ACCOUNT_EMAIL="${GITHUB_ACTIONS_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

echo "🔍 Checking IAM permissions for: $SERVICE_ACCOUNT_EMAIL"
echo ""

# Required roles
REQUIRED_ROLES=(
  "roles/iam.serviceAccountAdmin"
  "roles/artifactregistry.admin"
  "roles/run.admin"
  "roles/resourcemanager.projectIamAdmin"
  "roles/storage.admin"
)

# Get current IAM policy
echo "Fetching IAM policy..."
if ! POLICY=$(gcloud projects get-iam-policy "$PROJECT_ID" --format=json 2>&1); then
  echo "❌ Error: Could not fetch IAM policy for project: $PROJECT_ID"
  echo ""
  echo "Error details:"
  echo "$POLICY"
  echo ""
  echo "Common causes:"
  echo "  1. Not authenticated - run: gcloud auth login"
  echo "  2. Wrong project - run: gcloud config set project $PROJECT_ID"
  echo "  3. Missing permissions - you need resourcemanager.projects.getIamPolicy"
  echo ""
  exit 1
fi

if [ -z "$POLICY" ]; then
  echo "❌ Error: Empty IAM policy returned for project: $PROJECT_ID"
  exit 1
fi

MISSING_ROLES=()

# Check each required role
for ROLE in "${REQUIRED_ROLES[@]}"; do
  if echo "$POLICY" | grep -q "serviceAccount:${SERVICE_ACCOUNT_EMAIL}" && \
     echo "$POLICY" | grep -A 10 "\"role\": \"${ROLE}\"" | grep -q "serviceAccount:${SERVICE_ACCOUNT_EMAIL}"; then
    echo "  ✅ $ROLE"
  else
    echo "  ❌ $ROLE - MISSING"
    MISSING_ROLES+=("$ROLE")
  fi
done

echo ""

if [ ${#MISSING_ROLES[@]} -eq 0 ]; then
  echo "✅ All required IAM permissions are present!"
  exit 0
else
  echo "❌ Missing ${#MISSING_ROLES[@]} required IAM role(s)"
  echo ""
  echo "To fix this, run:"
  echo "  bash terraform/grant-github-actions-permissions.sh $ENVIRONMENT"
  echo ""
  echo "Or grant permissions manually in Google Cloud Console:"
  echo "  https://console.cloud.google.com/iam-admin/iam?project=$PROJECT_ID"
  echo ""
  exit 1
fi
