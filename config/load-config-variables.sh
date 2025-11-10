#!/bin/bash

# ==============================================================================
# LOAD CONFIG VARIABLES - SHARED UTILITY
# ==============================================================================
# Loads all variables from config/*.tfvars files and outputs as KEY=VALUE
# Used by both GitHub Actions workflows and Terraform scripts
#
# Usage:
#   eval $(config/load-config-variables.sh prod)
#   # Now all variables are available: $PROJECT_ID, $REGION, etc.
# ==============================================================================

set -e

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
  echo "❌ Error: Environment parameter is required" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/${ENVIRONMENT}.tfvars"

# Verify config file exists
if [ ! -f "$CONFIG_FILE" ]; then
  echo "❌ Error: Config file not found: $CONFIG_FILE" >&2
  exit 1
fi

echo "📄 Loading variables from: $CONFIG_FILE" >&2

# Parse tfvars file and output as KEY=VALUE for eval
# Converts: project_id = "antonarbus" → export PROJECT_ID="antonarbus"
while IFS='=' read -r key value; do
  # Skip comments and empty lines
  [[ "$key" =~ ^#.*$ ]] && continue
  [[ -z "$key" ]] && continue

  # Remove leading/trailing whitespace and quotes from value
  value=$(echo "$value" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//;s/^"//;s/".*$//' | cut -d'#' -f1 | sed 's/[[:space:]]*$//')

  # Convert snake_case to UPPER_CASE
  key=$(echo "$key" | tr '[:lower:]' '[:upper:]' | tr -d '[:space:]')

  # Output as export statement
  echo "export ${key}=\"${value}\""
  echo "  ${key}=${value}" >&2
done < "$CONFIG_FILE"

echo "✅ Variables loaded successfully" >&2
