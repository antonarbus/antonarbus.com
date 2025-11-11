#!/bin/bash

# ==============================================================================
# LOAD CONFIG FOR CI/CD
# ==============================================================================
# Loads all variables from config/*.tfvars files for the specified environment
# Outputs variables in KEY=value format (one per line) to stdout
#
# Usage:
#   .github/scripts/load-config.sh prod
#
# Output format:
#   PROJECT_ID=antonarbus
#   REGION=us-central1
#   ...
# ==============================================================================

set -e

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
  echo "❌ Error: Environment parameter is required" >&2
  echo "Usage: $0 <environment>" >&2
  exit 1
fi

# Get the script directory to find config files
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
CONFIG_FILE="$REPO_ROOT/config/${ENVIRONMENT}.tfvars"

# Check if config file exists
if [ ! -f "$CONFIG_FILE" ]; then
  echo "❌ Error: Config file not found: config/${ENVIRONMENT}.tfvars" >&2
  echo "Available environments: prod, pilot, test, dev" >&2
  exit 1
fi

echo "📄 Loading config for environment: $ENVIRONMENT" >&2

# Capture the output from load-config-variables.sh
# The script outputs lines like: export PROJECT_ID="antonarbus"
# We extract the variable assignments and output them
while IFS= read -r line; do
  # Skip lines that don't start with "export "
  [[ ! "$line" =~ ^export[[:space:]] ]] && continue

  # Extract: export VAR="value" → VAR=value
  var_assignment=$(echo "$line" | sed 's/^export //' | sed 's/"//g')

  # Output to stdout
  echo "$var_assignment"
done < <(config/load-config-variables.sh "$ENVIRONMENT" 2>/dev/null)

echo "" >&2
echo "✅ Config loaded successfully" >&2
