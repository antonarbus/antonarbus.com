#!/bin/bash

# ==============================================================================
# ADD SERVICE ACCOUNT TO DOMAIN VERIFICATION
# ==============================================================================
# One-time setup script to add the GitHub Actions service account as a verified
# owner of antonarbus.com, allowing it to create domain mappings for subdomains.
#
# WHEN TO RUN THIS:
#   - Once before first automated deployment to a new environment
#   - Only needs to be run one time total (not per environment)
#
# USAGE:
#   bash terraform/add-service-account-to-domain-verification.sh
#
# ==============================================================================

set -e

DOMAIN="antonarbus.com"
SERVICE_ACCOUNT="github-actions-sa@antonarbus.iam.gserviceaccount.com"
PROJECT_ID="antonarbus"

echo "=========================================================================="
echo "Adding Service Account to Domain Verification"
echo "=========================================================================="
echo ""
echo "Domain: $DOMAIN"
echo "Service Account: $SERVICE_ACCOUNT"
echo ""

# Check if domain is verified
echo "Checking if domain is verified..."
SITE_ID="dns://$DOMAIN"

# Get verification status using gcloud
gcloud auth application-default print-access-token > /dev/null 2>&1 || {
  echo "Error: Please authenticate with gcloud first:"
  echo "  gcloud auth application-default login"
  exit 1
}

ACCESS_TOKEN=$(gcloud auth print-access-token)
ENCODED_SITE_ID=$(printf %s "$SITE_ID" | jq -sRr @uri)

# Get current verification info
echo "Fetching current verification info..."
RESPONSE=$(curl -s \
  "https://www.googleapis.com/siteVerification/v1/webResource/$ENCODED_SITE_ID" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

if echo "$RESPONSE" | grep -q "error"; then
  echo ""
  echo "❌ Domain is not verified in this project."
  echo ""
  echo "Please verify $DOMAIN first at:"
  echo "https://www.google.com/webmasters/verification/"
  echo ""
  exit 1
fi

echo "✅ Domain is verified"
echo ""

# Get current owners
CURRENT_OWNERS=$(echo "$RESPONSE" | jq -r '.owners[]?' 2>/dev/null || echo "")

if echo "$CURRENT_OWNERS" | grep -q "$SERVICE_ACCOUNT"; then
  echo "✅ Service account is already a verified owner!"
  echo ""
  echo "Your automation should now work for all environments."
  exit 0
fi

echo "Current owners:"
echo "$CURRENT_OWNERS"
echo ""

# Add service account to owners
echo "Adding $SERVICE_ACCOUNT as a verified owner..."

# Prepare the owners array (add to existing owners)
OWNERS_JSON=$(echo "$RESPONSE" | jq -r '.owners' | jq --arg sa "$SERVICE_ACCOUNT" '. + [$sa]')

# Update the verification
UPDATE_RESPONSE=$(curl -s -X PUT \
  "https://www.googleapis.com/siteVerification/v1/webResource/$ENCODED_SITE_ID" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"site\": {
      \"type\": \"INET_DOMAIN\",
      \"identifier\": \"$DOMAIN\"
    },
    \"owners\": $OWNERS_JSON
  }")

if echo "$UPDATE_RESPONSE" | grep -q "error"; then
  echo ""
  echo "❌ Failed to add service account automatically."
  echo ""
  echo "Error: $(echo "$UPDATE_RESPONSE" | jq -r '.error.message')"
  echo ""
  echo "Please add manually at:"
  echo "https://www.google.com/webmasters/verification/"
  echo ""
  echo "Add this service account as an owner: $SERVICE_ACCOUNT"
  exit 1
fi

echo ""
echo "✅ Successfully added service account as a verified owner!"
echo ""
echo "The GitHub Actions service account can now create domain mappings"
echo "for all subdomains of $DOMAIN"
echo ""
