#!/bin/bash

# ==============================================================================
# LOAD CONFIG FOR CI/CD
# ==============================================================================
# Loads all variables from config/*.tfvars files for the specified environment
# Exports all variables to GITHUB_ENV for use in subsequent workflow steps
#
# Usage (from GitHub Actions):
#   .github/scripts/load-config.sh prod
#
# Outputs to GITHUB_ENV:
#   - All variables from the config file (uppercase)
# ==============================================================================

set -e

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
  echo "❌ Error: Environment parameter is required"
  echo "Usage: $0 <environment>"
  exit 1
fi

echo "📄 Loading config for environment: $ENVIRONMENT"

# Capture the output from load-config-variables.sh and write to GITHUB_ENV
# The script outputs lines like: export PROJECT_ID="antonarbus"
# We extract the variable assignments and write them to GITHUB_ENV
while IFS= read -r line; do
  # Skip lines that don't start with "export "
  [[ ! "$line" =~ ^export\ ]] && continue

  # Extract: export VAR="value" → VAR=value
  var_assignment=$(echo "$line" | sed 's/^export //' | sed 's/"//g')

  # Write to GITHUB_ENV
  echo "$var_assignment" >> "$GITHUB_ENV"
  echo "  $var_assignment"
done < <(config/load-config-variables.sh "$ENVIRONMENT" 2>/dev/null)

echo ""
echo "✅ Config loaded successfully"
