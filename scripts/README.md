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

## Project Structure

```
scripts/
├── cli.ts                          # Main CLI entry point
├── commands/                       # Command implementations
│   ├── detect-env.ts
│   ├── validate.ts
│   ├── load-config.ts
│   ├── detect-changes.ts
│   ├── setup-gcp.ts
│   ├── scan-vulnerabilities.ts
│   ├── deploy-cloudrun.ts
│   ├── verify-deployment.ts
│   └── terraform-apply.ts
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

The CLI is integrated into `.github/workflows/deploy.yml`:

```yaml
- name: 'Detect Environment'
  run: bun scripts/cli.ts detect-env

- name: 'Validate Config Files'
  run: bun scripts/cli.ts validate

- name: 'Load Config'
  run: bun scripts/cli.ts load-config ${{ env.ENVIRONMENT }} >> $GITHUB_ENV
```

## Dependencies

- **commander**: CLI framework
- **zod**: Schema validation for configs
- **chalk**: Colored terminal output
- **execa**: Shell command execution (not actively used but available)
- **bun**: TypeScript runtime

## Migration from Bash

This CLI replaces the following bash scripts:

- `.github/scripts/detect-and-load-env-from-github-branch.sh` → `detect-env`
- `config/validate.sh` → `validate`
- `.github/scripts/get-config-variables.sh` → `load-config`
- `.github/scripts/detect-changes.sh` → `detect-changes`
- `.github/scripts/setup-gcp.sh` → `setup-gcp`
- `.github/scripts/scan-vulnerabilities.sh` → `scan-vulnerabilities`
- `.github/scripts/deploy-to-cloudrun.sh` → `deploy-cloudrun`
- `.github/scripts/verify-deployment.sh` → `verify-deployment`
- `terraform/infrastructure/smart-apply.sh` → `terraform-apply`

The bash scripts are kept for reference but are no longer used in the workflow.
