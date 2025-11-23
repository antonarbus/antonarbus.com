# antonarbus.com

Next.js web application deployed to Google Cloud Run with Terraform infrastructure as code.

## Table of Contents

- [Architecture](#architecture)
- [Development](#development)
- [First-Time Setup](#first-time-setup)
- [Deployment](#deployment)
- [CLI Commands](#cli-commands)
- [Release Promotion](#release-promotion)
- [Configuration](#configuration)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Monitoring](#monitoring)

---

## Architecture

**Project**: All environments run in GCP project `antonarbus`

| Environment | Cloud Run Service | Domain               | Memory | Max Instances |
| ----------- | ----------------- | -------------------- | ------ | ------------- |
| **Prod**    | `web-app-prod`    | antonarbus.com       | 512Mi  | 100           |
| **Pilot**   | `web-app-pilot`   | pilot.antonarbus.com | 512Mi  | 50            |
| **Test**    | `web-app-test`    | test.antonarbus.com  | 512Mi  | 10            |
| **Dev**     | `web-app-dev`     | dev.antonarbus.com   | 512Mi  | 5             |

**Git workflow**: Single `master` branch. Environments are deployment targets, not branches.

**Deployment mode**: Configured via `MASTER_DEPLOYS_TO_ENV` in `config/configVariables.ts`:
- Set to `prod`: Master deploys directly to production (single-stage workflow)
- Set to `dev`: Master deploys to dev, other environments use promotion workflow

### Shared Resources (created in bootstrap)

- **Artifact Registry**: `docker-images` (single registry for all environments)
- **Docker images**: `us-central1-docker.pkg.dev/antonarbus/docker-images/web-app:<env>`
- **Terraform state bucket**: `gs://antonarbus-terraform-state/`
- **Service accounts**: `github-actions-sa`, `cloud-run-sa`
- **Workload Identity Federation**: Keyless GitHub Actions authentication

### Per-Environment Resources

- Cloud Run services (web-app-dev, web-app-test, web-app-pilot, web-app-prod)
- Custom domain mappings
- Auto-scaling configuration
- **Terraform state files** (isolated via workspaces): `terraform/state/<env>/default.tfstate`

---

## Development

```bash
bun install
bun run dev              # Local development at http://localhost:3000
bun run build            # Build production
bun run docker-build     # Build Docker image locally
```

---

## First-Time Setup

### 1. Prerequisites

```bash
# Authenticate with GCP (requires Owner/Admin permissions)
gcloud auth application-default login

# Verify project
gcloud projects describe antonarbus

# Enable required Google Cloud APIs
# IMPORTANT: These must be enabled BEFORE running bootstrap terraform
# One-time operation, requires Owner/Admin permissions
gcloud services enable \
  iam.googleapis.com \
  cloudresourcemanager.googleapis.com \
  storage.googleapis.com \
  artifactregistry.googleapis.com \
  run.googleapis.com \
  containerscanning.googleapis.com \
  --project=antonarbus

# Verify APIs are enabled
gcloud services list --enabled --filter="name:(iam.googleapis.com OR cloudresourcemanager.googleapis.com OR storage.googleapis.com OR artifactregistry.googleapis.com OR run.googleapis.com)" --format="table(name)"
```

### 2. Run Bootstrap (One-Time)

Bootstrap creates shared resources that all environments use.

```bash
cd terraform/bootstrap

# Initialize Terraform
terraform init

# Review what will be created
terraform plan -var-file="../../config/prod.tfvars"

# Create resources
terraform apply -var-file="../../config/prod.tfvars"
```

**What gets created:**

- GCS bucket for Terraform state (with versioning)
- Shared Artifact Registry (`docker-images`)
- Service accounts (`github-actions-sa`, `cloud-run-sa`)
- IAM permissions (6 roles for GitHub Actions SA)
- Workload Identity Federation (keyless auth for GitHub Actions)

### 3. Domain Verification (One-Time)

To allow automated domain mapping creation, add the service account as a verified owner:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select `antonarbus.com` property
3. **Settings** → **Users and permissions** → **Add user**
4. Enter: `github-actions-sa@antonarbus.iam.gserviceaccount.com`
5. Grant **Owner** permission
6. Click **Add**

### 4. Configure GitHub Environments

Set up approval gates for release promotion:

1. Go to **Repository Settings** → **Environments**
2. Click **New environment**, create: `dev`, `test`, `pilot`, `prod`
3. Click on each environment name to configure it
4. Enable **Required reviewers** checkbox (under "Deployment protection rules" at top)
5. Add GitHub usernames who must approve deployments

Suggested configuration:

- **dev**: No protection rules (leave unchecked)
- **test**: Enable "Required reviewers", add 1 reviewer
- **pilot**: Enable "Required reviewers", add 2 reviewers
- **prod**: Enable "Required reviewers", add 2 reviewers, optionally add "Wait timer" (15 min)

### 5. Generate Terraform Variables

Generate `.tfvars` files from the TypeScript configuration:

```bash
bun run generate-tfvars
```

This creates/updates all environment `.tfvars` files from `config/configVariables.ts`.

### 6. DNS Setup (Per Environment)

After first deployment to each environment:

1. Go to Cloud Run → Manage Custom Domains
2. Copy DNS records shown
3. Add them to your domain registrar (e.g., GoDaddy, Namecheap)

---

## Deployment

### Automatic (via GitHub Actions)

Push to `master` branch triggers deployment to the environment specified by `MASTER_DEPLOYS_TO_ENV`:

1. Push/merge to `master` branch
2. Detects target environment from `MASTER_DEPLOYS_TO_ENV` config
3. Detects changes (Terraform and/or application code)
4. If Terraform changed: applies infrastructure updates
5. If code changed: builds Docker image (tagged with environment + git SHA)
6. Deploys to Cloud Run service
7. Verifies deployment (auto-rollback on failure)

**When `MASTER_DEPLOYS_TO_ENV='prod'`**: Master deploys directly to production. Other environments (dev, test, pilot) are kept as templates and do not harm the workflow.

**When `MASTER_DEPLOYS_TO_ENV='dev'`**: Master deploys to dev. Other environments (test, pilot, prod) use the [Release Promotion](#release-promotion) workflow.

### Manual Terraform (Infrastructure Only)

For infrastructure changes without code deployment:

```bash
cd terraform/infrastructure

# Specify environment explicitly
bash smart-apply.sh dev
bash smart-apply.sh prod
```

**Note**: This only applies Terraform (scaling, domains, etc.). It does NOT deploy application code. For code deployments, push to master or use the promotion workflow.

---

## CLI Commands

All deployment automation is handled by a TypeScript CLI located in `scripts/cli.ts`.

### Available Commands

```bash
# Show all available commands
bun scripts/cli.ts --help

# Or use the npm script alias
bun run deploy:help
```

#### `generate-tfvars`

Generate `.tfvars` files from TypeScript config.

```bash
bun scripts/cli.ts generate-tfvars
# or
bun run generate-tfvars
```

Reads `config/configVariables.ts` and generates `.tfvars` files for all environments.

#### `detect-env`

Detect deployment environment from git branch.

```bash
bun scripts/cli.ts detect-env
```

Outputs: `env=dev` (for master branch)

#### `load-config`

Load configuration for a specific environment.

```bash
bun scripts/cli.ts load-config --env dev
bun scripts/cli.ts load-config --env prod
```

Outputs environment variables in `key=value` format for GitHub Actions.

#### `terraform-apply`

Apply Terraform configuration for an environment.

```bash
bun scripts/cli.ts terraform-apply --env dev
bun scripts/cli.ts terraform-apply --env prod
```

#### `deploy-cloudrun`

Deploy Docker image to Cloud Run.

```bash
bun scripts/cli.ts deploy-cloudrun --env dev
```

Captures current image for rollback, deploys new image, outputs `previousImage` for verification step.

#### `verify-deployment`

Verify Cloud Run deployment with smoke tests.

```bash
bun scripts/cli.ts verify-deployment --env dev --previous-image <image-url>
```

Performs health checks, auto-rollback on failure.

#### `validate-promotion`

Validate promotion path between environments.

```bash
bun scripts/cli.ts validate-promotion --source-env dev --target-env test
```

Allowed paths: `dev→test`, `test→pilot`, `pilot→prod`

#### `promote-image`

Promote Docker image from source to target environment.

```bash
bun scripts/cli.ts promote-image --source-env dev --target-env test
```

Re-tags the exact same Docker image, ensuring binary consistency across environments.

### CLI Architecture

```
scripts/
├── cli.ts                     # Main CLI entry point (Commander.js)
├── commands/                  # Command implementations
│   ├── generate-tfvars.ts
│   ├── detect-env.ts
│   ├── load-config.ts
│   ├── terraform-apply.ts
│   ├── deploy-cloudrun.ts
│   ├── verify-deployment.ts
│   ├── validate-promotion.ts
│   └── promote-image.ts
├── lib/
│   ├── gcloud/               # Google Cloud operations
│   │   ├── getCurrentCloudRunImage.ts
│   │   ├── updateCloudRunService.ts
│   │   ├── rollbackCloudRunService.ts
│   │   └── getCloudRunServiceUrl.ts
│   └── output/               # Logging and GitHub Actions output
│       ├── logger.ts
│       └── githubOutput.ts
└── config/
    └── configVariables.ts    # Single source of truth for all config
```

---

## Release Promotion

**Promote tested images between environments** (instead of rebuilding):

```
dev → test → pilot → prod
```

**NOTE**: This promotion workflow is only applicable when `MASTER_DEPLOYS_TO_ENV` is set to `dev`.
When set to `prod`, deployment happens directly from master branch to production,
and the promotion workflow is not used. The environment definitions (dev, test, pilot)
remain in config as templates and do not interfere with the production-only workflow.

### Using the Promotion Workflow

1. Go to **Actions** → **Promote Release** → **Run workflow**
2. Select source environment (e.g., `dev`)
3. Select target environment (e.g., `test`)
4. Click **Run workflow**

The workflow:

- Validates promotion path (dev→test, test→pilot, pilot→prod only)
- Requires approval from configured reviewers
- Re-tags the Docker image (instant, no rebuild)
- Deploys to target Cloud Run service
- Verifies with smoke tests
- Auto-rollback on failure

---

## Configuration

### Single Source of Truth

All configuration lives in `config/configVariables.ts`:

```typescript
export const configVariables = {
  dev: { ... },
  test: { ... },
  pilot: { ... },
  prod: { ... }
}
```

The `.tfvars` files are **generated** from this TypeScript config using `bun run generate-tfvars`.

### Key Variables

| Variable                 | Environment-Specific | Shared |
| ------------------------ | -------------------- | ------ |
| `projectId`              |                      | ✓      |
| `region`                 |                      | ✓      |
| `artifactRegistryName`   |                      | ✓      |
| `cloudRunServiceName`    | ✓                    |        |
| `customDomain`           | ✓                    |        |
| `maxInstances`           | ✓                    |        |
| `memoryLimit`            | ✓                    |        |

### Changing Configuration

1. Edit `config/configVariables.ts`
2. Run `bun run generate-tfvars` to update `.tfvars` files
3. Commit both files
4. Push to `master` branch (dev environment applies automatically)
5. For other environments, run manual Terraform or use promotion workflow

---

## Testing

### Local Testing

Test CLI commands locally before pushing:

```bash
# Test help
bun scripts/cli.ts --help

# Test config generation
bun run generate-tfvars

# Test environment detection
bun scripts/cli.ts detect-env

# Test config loading
bun scripts/cli.ts load-config --env dev
```

### GitHub Actions Testing

The workflow can be triggered manually for testing:

1. Go to **Actions** → **Deploy** → **Run workflow**
2. Select branch: `master`
3. Click **Run workflow**

### What to Verify

After deployment:

- ✓ Environment detected correctly
- ✓ Config loaded successfully
- ✓ Terraform apply succeeds
- ✓ Docker build/push succeeds
- ✓ Cloud Run deployment succeeds
- ✓ Health checks pass
- ✓ No errors in logs

### Test Checklist

**Before Merging to Master:**

- [ ] `bun scripts/cli.ts --help` shows all commands
- [ ] `bun run generate-tfvars` succeeds
- [ ] `bun scripts/cli.ts load-config --env dev` outputs correct values
- [ ] TypeScript compiles without errors
- [ ] No linting errors

**After Merging to Master:**

- [ ] GitHub Actions workflow triggers
- [ ] All steps complete successfully
- [ ] Deployment succeeds
- [ ] Website accessible
- [ ] No errors in Cloud Run logs

---

## Troubleshooting

### "409: Already Exists" Errors

Resource was created manually before Terraform. **Import it:**

```bash
cd terraform/infrastructure
terraform workspace select <env>
```

**Artifact Registry:**

```bash
terraform import -var-file="../../config/dev.tfvars" \
  google_artifact_registry_repository.docker_repo \
  projects/antonarbus/locations/us-central1/repositories/docker-images
```

**Cloud Run Service:**

```bash
terraform import -var-file="../../config/dev.tfvars" \
  google_cloud_run_v2_service.main \
  projects/antonarbus/locations/us-central1/services/web-app-dev
```

**Domain Mapping:**

```bash
terraform import -var-file="../../config/dev.tfvars" \
  google_cloud_run_domain_mapping.main \
  locations/us-central1/namespaces/antonarbus/domainmappings/dev.antonarbus.com
```

**Public Access IAM:**

```bash
terraform import -var-file="../../config/dev.tfvars" \
  google_cloud_run_v2_service_iam_member.public_access \
  "projects/antonarbus/locations/us-central1/services/web-app-dev roles/run.invoker allUsers"
```

### "Error acquiring the state lock"

Terraform is already running or crashed with stale lock.

**Check who has the lock** (shown in error message):

```
Who: runner@runnervmw9dnm    # CI/CD has it
Who: sherb@MAC-KX909470LX    # Your machine has it
```

**Option 1: Wait** for the other operation to finish

**Option 2: Force remove** (only if operation crashed):

```bash
# Find locks
gcloud storage ls --recursive gs://antonarbus-terraform-state/terraform/state/ | grep -i lock

# Remove specific lock
gcloud storage rm gs://antonarbus-terraform-state/terraform/state/dev.tflock

# Or remove all locks (use with caution!)
gcloud storage rm gs://antonarbus-terraform-state/terraform/state/**/*.tflock
```

### "Caller is not authorized to administer the domain"

Domain verification missing. See [Domain Verification](#3-domain-verification-one-time) section.

### CLI Command Errors

**"Command not found"**
- Ensure Bun is installed: `bun --version`
- Run `bun install` in project root

**Config validation fails**
- Check `config/configVariables.ts` for missing required properties
- Run `bun run generate-tfvars` to regenerate `.tfvars` files

**GCP commands fail**
- Authenticate: `gcloud auth login`
- Set project: `gcloud config set project antonarbus`
- Verify APIs are enabled (see Prerequisites section)

### Finding Resource IDs for Import

```bash
# Service accounts
gcloud iam service-accounts list

# Artifact Registry
gcloud artifacts repositories list --location=us-central1

# Cloud Run services
gcloud run services list --region=us-central1

# Domain mappings
gcloud run domain-mappings list --region=us-central1
```

---

## Monitoring

- **Cloud Run Console**: https://console.cloud.google.com/run?project=antonarbus
- **Logs**: https://console.cloud.google.com/logs/query?project=antonarbus
- **Artifact Registry**: https://console.cloud.google.com/artifacts?project=antonarbus
- **GitHub Actions**: Repository → Actions tab

---

## Project Structure

```
/
├── config/                       # Single source of truth for configuration
│   ├── configVariables.ts        # TypeScript config (authoritative)
│   ├── dev.tfvars               # Generated from configVariables.ts
│   ├── test.tfvars              # Generated from configVariables.ts
│   ├── pilot.tfvars             # Generated from configVariables.ts
│   └── prod.tfvars              # Generated from configVariables.ts
├── scripts/                      # TypeScript CLI for deployment automation
│   ├── cli.ts                   # Main CLI entry point
│   ├── commands/                # Command implementations
│   └── lib/                     # Shared utilities (gcloud, output, etc.)
├── terraform/
│   ├── bootstrap/               # One-time setup (shared resources)
│   └── infrastructure/          # Per-environment resources
├── .github/
│   └── workflows/
│       ├── deploy.yml           # Auto-deploy on push to master
│       └── promote.yml          # Manual image promotion
├── dockerfile.prod              # Production Docker image
└── README.md                    # This file
```
