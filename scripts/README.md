# Deployment CLI

TypeScript-based CLI for managing deployment workflows for antonarbus.com.

## Overview

This CLI replaces the previous bash scripts with a unified TypeScript interface, providing:
- Type safety and better error handling
- Cleaner code organization and reusability
- Better IDE support and autocomplete
- Easier testing and maintenance
- Native TypeScript execution with Bun (no compilation needed)

## Installation

The CLI requires Bun to be installed. Dependencies are already included in the project:

```bash
bun install
```

## Usage

```bash
bun scripts/cli.ts <command> [options]
```

### Available Commands

#### `detect-env`
Detect deployment environment from the current git branch.

```bash
bun scripts/cli.ts detect-env
```

Sets `ENVIRONMENT` in GitHub Actions environment variables.

---

#### `validate`
Validate all configuration files (dev, test, pilot, prod).

```bash
bun scripts/cli.ts validate
```

Checks all `.tfvars` files for required variables and proper formatting.

---

#### `load-config <environment>`
Load configuration for a specific environment.

```bash
bun scripts/cli.ts load-config dev
bun scripts/cli.ts load-config prod
```

Outputs environment variables in `KEY=value` format for GitHub Actions.

---

#### `detect-changes`
Detect what changed between commits.

```bash
bun scripts/cli.ts detect-changes
```

Sets `CHANGES_DETECTED_AT` to one of: `terraform`, `app`, `both`, or `none`.

---

#### `setup-gcp`
Setup GCP project and enable required APIs.

```bash
bun scripts/cli.ts setup-gcp
```

Requires `PROJECT_ID` environment variable.

---

#### `scan-vulnerabilities`
Scan Docker image for vulnerabilities using GCP Container Analysis.

```bash
bun scripts/cli.ts scan-vulnerabilities
```

Requires: `REGION`, `PROJECT_ID`, `ARTIFACT_REGISTRY_NAME`, `DOCKER_IMAGE_NAME`, `DOCKER_IMAGE_TAG`.

---

#### `deploy-cloudrun`
Deploy Docker image to Cloud Run.

```bash
bun scripts/cli.ts deploy-cloudrun
```

Requires: `CLOUD_RUN_SERVICE_NAME`, `REGION`, `PROJECT_ID`, `ARTIFACT_REGISTRY_NAME`, `DOCKER_IMAGE_NAME`, `DOCKER_IMAGE_TAG`.

---

#### `verify-deployment`
Verify Cloud Run deployment with smoke tests and automatic rollback on failure.

```bash
bun scripts/cli.ts verify-deployment
```

Requires: `CLOUD_RUN_SERVICE_NAME`, `REGION`, `PROJECT_ID`.

---

#### `terraform-apply <environment>`
Apply Terraform configuration for a specific environment.

```bash
bun scripts/cli.ts terraform-apply dev
bun scripts/cli.ts terraform-apply prod
```

---

#### `promote-image`
Promote a Docker image from source environment to target environment.

```bash
bun scripts/cli.ts promote-image
```

Re-tags a tested Docker image with the target environment tag. This ensures the exact same binary runs across all environments.

Requires: `SOURCE_ENV`, `TARGET_ENV`, `REGION`, `PROJECT_ID`, `ARTIFACT_REGISTRY_NAME`, `DOCKER_IMAGE_NAME`.

---

#### `validate-promotion <source_env> <target_env>`
Validate that a promotion path is allowed.

```bash
bun scripts/cli.ts validate-promotion dev test      # Valid
bun scripts/cli.ts validate-promotion test pilot    # Valid
bun scripts/cli.ts validate-promotion pilot prod    # Valid
bun scripts/cli.ts validate-promotion dev prod      # Invalid
```

Allowed promotion paths:
- `dev` → `test`
- `test` → `pilot`
- `pilot` → `prod`

Outputs `valid=true` or `valid=false` for `GITHUB_OUTPUT`.

## Project Structure

```
scripts/
├── cli.ts                          # Main CLI entry point
├── commands/                       # Command implementations (11 total)
│   ├── detect-env.ts
│   ├── validate.ts
│   ├── load-config.ts
│   ├── detect-changes.ts
│   ├── setup-gcp.ts
│   ├── scan-vulnerabilities.ts
│   ├── deploy-cloudrun.ts
│   ├── verify-deployment.ts
│   ├── terraform-apply.ts
│   ├── promote-image.ts
│   └── validate-promotion.ts
├── lib/                            # Shared utilities
│   ├── config.ts                   # Config loading and validation
│   ├── gcp.ts                      # GCP operations
│   ├── git.ts                      # Git operations
│   ├── github-env.ts               # GitHub Actions environment helpers
│   └── logger.ts                   # Colored logging
└── types.ts                        # TypeScript type definitions
```

## Development

### Testing Locally

You can test commands locally before pushing to GitHub:

```bash
# Test environment detection
bun scripts/cli.ts detect-env

# Test config validation
bun scripts/cli.ts validate

# Test config loading
bun scripts/cli.ts load-config dev
```

### Adding New Commands

1. Create a new file in `scripts/commands/`
2. Export an async function
3. Register it in `scripts/cli.ts`

Example:

```typescript
// scripts/commands/my-command.ts
import { logger } from '../lib/logger'

export async function myCommand(): Promise<void> {
  logger.info('Running my command...')
  // Implementation here
}

// scripts/cli.ts
import { myCommand } from './commands/my-command'

program
  .command('my-command')
  .description('Description of my command')
  .action(async () => {
    await myCommand()
  })
```

## GitHub Actions Integration

The CLI is integrated into both workflows:

**`deploy.yml`** (automatic deployment on push to master):
```yaml
- name: 'Detect Environment'
  run: bun scripts/cli.ts detect-env

- name: 'Validate Config Files'
  run: bun scripts/cli.ts validate

- name: 'Load Config'
  run: bun scripts/cli.ts load-config ${{ env.ENVIRONMENT }} >> $GITHUB_ENV
```

**`promote.yml`** (manual image promotion between environments):
```yaml
- name: 'Check promotion path'
  run: bun scripts/cli.ts validate-promotion "$SOURCE_ENV" "$TARGET_ENV"

- name: 'Promote Docker Image'
  run: bun scripts/cli.ts promote-image

- name: 'Deploy promoted image'
  run: bun scripts/cli.ts deploy-cloudrun
```

## Dependencies

- **commander**: CLI framework (v14.0.2)
- **chalk**: Colored terminal output (v5.6.2)
- **bun**: TypeScript runtime (native execution, no compilation needed)

## Migration from Bash

**Migration completed!** All bash scripts have been replaced with TypeScript:

| Old Bash Script | New TypeScript Command | Status |
|----------------|----------------------|--------|
| `detect-and-load-env-from-github-branch.sh` | `detect-env` | ✅ Deleted |
| `validate.sh` | `validate` | ✅ Deleted |
| `get-config-variables.sh` + `load-config-variables.sh` | `load-config` | ✅ Deleted |
| `detect-changes.sh` | `detect-changes` | ✅ Deleted |
| `setup-gcp.sh` | `setup-gcp` | ✅ Deleted |
| `scan-vulnerabilities.sh` | `scan-vulnerabilities` | ✅ Deleted |
| `deploy-to-cloudrun.sh` | `deploy-cloudrun` | ✅ Deleted |
| `verify-deployment.sh` | `verify-deployment` | ✅ Deleted |
| `smart-apply.sh` | `terraform-apply` | ✅ Deleted |
| `promote-image.sh` | `promote-image` | ✅ Deleted |
| `validate-promotion-path.sh` | `validate-promotion` | ✅ Deleted |

**Summary:**
- ✅ 12 bash scripts deleted (1116 lines removed)
- ✅ 11 TypeScript commands created (unified CLI)
- ✅ Both workflows (`deploy.yml`, `promote.yml`) fully migrated
- ✅ Zero bash scripts remaining
