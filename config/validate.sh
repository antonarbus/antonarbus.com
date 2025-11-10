#!/bin/bash

# ==============================================================================
# CONFIG VALIDATION SCRIPT
# ==============================================================================
# Validates that environment config files are properly formatted and contain
# all required variables
#
# Usage:
#   ./validate.sh                 # Validate all config files
#   ./validate.sh production      # Validate specific environment
# ==============================================================================

set -e

# Required variables that must be present in every config file
REQUIRED_VARS=(
  "project_id"
  "region"
  "bucket_for_terraform_state_name"
  "artifact_registry_name"
  "cloud_run_service_name"
  "docker_image_name"
  "docker_image_tag"
  "github_actions_sa_name"
  "cloud_run_sa_name"
  "min_instances"
  "max_instances"
  "cpu_limit"
  "memory_limit"
  "container_port"
  "custom_domain"
)

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NO_COLOR='\033[0m'

echo_info() { echo -e "${BLUE}ℹ ${1}${NO_COLOR}"; }
echo_success() { echo -e "${GREEN}✓ ${1}${NO_COLOR}"; }
echo_warning() { echo -e "${YELLOW}⚠ ${1}${NO_COLOR}"; }
echo_error() { echo -e "${RED}✗ ${1}${NO_COLOR}"; }

validate_file() {
  local file=$1
  local errors=0

  echo_info "Validating: $file"

  if [ ! -f "$file" ]; then
    echo_error "File not found: $file"
    return 1
  fi

  # Check for required variables
  for var in "${REQUIRED_VARS[@]}"; do
    if grep -q "^${var}[[:space:]]*=" "$file"; then
      echo "  ✓ $var"
    else
      echo_error "  Missing required variable: $var"
      ((errors++))
    fi
  done

  # Check for basic syntax issues
  # Look for lines that have = but aren't comments and don't have quotes around string values
  while IFS= read -r line; do
    # Skip comments and empty lines
    [[ "$line" =~ ^[[:space:]]*# ]] && continue
    [[ -z "${line// }" ]] && continue

    # Check if line contains assignment
    if [[ "$line" =~ = ]]; then
      # Extract value part (after =)
      value=$(echo "$line" | cut -d'=' -f2- | sed 's/^[[:space:]]*//')

      # Remove inline comments (everything after # including leading spaces)
      value=$(echo "$value" | sed 's/[[:space:]]*#.*$//')

      # Trim trailing whitespace
      value=$(echo "$value" | sed 's/[[:space:]]*$//')

      # Check if value looks like a string (not a number) without quotes
      if [[ ! "$value" =~ ^[0-9]+$ ]] && [[ ! "$value" =~ ^\".*\"$ ]]; then
        # Could be unquoted string or missing quotes
        echo_warning "  Possible missing quotes: $line"
      fi
    fi
  done < "$file"

  if [ $errors -eq 0 ]; then
    echo_success "Validation passed: $file"
    return 0
  else
    echo_error "Validation failed: $file ($errors errors)"
    return 1
  fi
}

# Main
cd "$(dirname "$0")"

if [ $# -eq 0 ]; then
  # Validate all files
  echo_info "Validating all config files..."
  echo ""

  total_errors=0

  for file in prod.tfvars test.tfvars pilot.tfvars dev.tfvars; do
    if validate_file "$file"; then
      echo ""
    else
      ((total_errors++))
      echo ""
    fi
  done

  if [ $total_errors -eq 0 ]; then
    echo_success "All config files are valid!"
    exit 0
  else
    echo_error "$total_errors file(s) failed validation"
    exit 1
  fi
else
  # Validate specific file
  ENV=$1
  FILE="${ENV}.tfvars"

  validate_file "$FILE"
fi
