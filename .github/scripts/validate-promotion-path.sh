#!/usr/bin/env bash
set -euo pipefail

# Validates that the promotion path is allowed
# Usage: validate-promotion-path.sh <source_env> <target_env>
# Outputs: valid=true or valid=false (for GITHUB_OUTPUT)

SOURCE="${1:-}"
TARGET="${2:-}"

if [[ -z "$SOURCE" || -z "$TARGET" ]]; then
  echo "Usage: $0 <source_env> <target_env>" >&2
  exit 1
fi

# Define valid promotion paths
case "$SOURCE-$TARGET" in
  dev-test|test-pilot|pilot-prod)
    echo "Valid promotion path: $SOURCE -> $TARGET" >&2
    echo "valid=true"
    ;;
  *)
    echo "Invalid promotion path: $SOURCE -> $TARGET" >&2
    echo "Allowed paths: dev->test, test->pilot, pilot->prod" >&2
    echo "valid=false"
    ;;
esac
