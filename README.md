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

| Environment | Cloud Run Service | Domain               |
| ----------- | ----------------- | -------------------- |
| **Dev**     | `web-app-dev`     | dev.antonarbus.com   |
| **Test**    | `web-app-test`    | test.antonarbus.com  |
| **Pilot**   | `web-app-pilot`   | pilot.antonarbus.com |
| **Prod**    | `web-app-prod`    | antonarbus.com       |

**Git workflow**: Single `master` branch. Environments are deployment targets.

**Deployment mode** (configured via `MASTER_DEPLOYS_TO_ENV` in `config/configVariables.ts`):

- `prod`: Master deploys directly to production (single-stage workflow, current setup)
- `dev`: Master deploys to dev, promotion workflow for test -> pilot -> prod (not in use)

### Shared Resources (bootstrap)

- Artifact Registry: `docker-images` (shared across all environments)
- Docker images: `us-central1-docker.pkg.dev/antonarbus/docker-images/web-app:<env>`
- Terraform state bucket: `gs://antonarbus-terraform-state/`
- Service accounts: `github-actions-sa`, `cloud-run-sa`
- Workload Identity Federation: keyless GitHub Actions authentication

### Per-Environment Resources

- Cloud Run services: `web-app-{dev,test,pilot,prod}`
- Custom domain mappings to antonarbus.com subdomains
- Auto-scaling configuration (max instances may vary by environment)
- Terraform state isolation via workspaces: `terraform/state/<env>/default.tfstate`

---

## Development

```bash
bun install              # Install dependencies
bun run dev              # Local development at http://localhost:3000
bun run build            # Build production
bun run docker-build     # Build Docker image locally
bun deploy-scripts/cli.ts       # Interactive deployment CLI
```

---

## First-Time Setup

### 1. Prerequisites

**Install Bun:**

```bash
# Install Bun runtime
curl -fsSL https://bun.sh/install | bash

# Verify installation
bun --version

# Install project dependencies
bun install
```

**Configure GCP:**

```bash
# Authenticate with GCP (requires Owner/Admin permissions)
gcloud auth application-default login

# Verify project
gcloud projects describe antonarbus

# Enable bootstrap APIs
# IMPORTANT: These APIs have a circular dependency and must be enabled manually
# before Terraform can manage other APIs. One-time operation, requires Owner/Admin permissions.
# See: https://github.com/hashicorp/terraform-provider-google/issues/8544
gcloud services enable serviceusage.googleapis.com --project=antonarbus
gcloud services enable cloudresourcemanager.googleapis.com --project=antonarbus

# Verify bootstrap APIs are enabled
gcloud services list --enabled --filter="name:serviceusage.googleapis.com OR name:cloudresourcemanager.googleapis.com"
```

### 2. Run Bootstrap (One-Time)

Bootstrap creates shared resources that all environments use.

**IMPORTANT**: Before running bootstrap, you must first generate the `.tfvars` files from TypeScript config (see [Generate Terraform Variables](#5-generate-terraform-variables) below).

```bash
# First, generate .tfvars files if you haven't already
bun deploy-scripts/cli.ts generate-tfvars

# Then run bootstrap
cd terraform/bootstrap

# Remove any leftovers from the template or old project
rm -rf .terraform .terraform.lock.hcl terraform.tfstate terraform.tfstate.backup

# Initialize Terraform
terraform init

# Review what will be created
terraform plan -var-file="../../config/prod.tfvars"

# Create resources
terraform apply -var-file="../../config/prod.tfvars"
```

**Resources created:**

- GCS bucket: Terraform state storage with versioning
- Artifact Registry: `docker-images` (shared)
- Service accounts: `github-actions-sa`, `cloud-run-sa`
- IAM permissions: 6 roles for GitHub Actions SA
- Workload Identity Federation: Keyless GitHub Actions authentication

### 3. Domain Verification (One-Time)

To allow automated domain mapping creation, add the service account as a verified owner:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select `antonarbus.com` property
3. **Settings** → **Users and permissions** → **Add user**
4. Enter: `github-actions-sa@antonarbus.iam.gserviceaccount.com` (github-actions-sa@<PROJECT_ID>.iam.gserviceaccount.com)
5. Grant **Owner** permission
6. Click **Add**

### 4. Configure GitHub Environments

Set up approval gates for release promotion:

1. Go to **Repository Settings** → **Environments**
2. Click **New environment**, create: `dev`, `test`, `pilot`, `prod`
3. Click on each environment name to configure it
4. Enable **Required reviewers** checkbox (under "Deployment protection rules" at top)
5. Add GitHub usernames who must approve deployments

### 5. Generate Terraform Variables

Generate `.tfvars` files from the TypeScript configuration:

```bash
bun deploy-scripts/cli.ts generate-tfvars
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
3. Generates `.tfvars` files from TypeScript config
4. Runs Terraform format check
5. Applies Terraform infrastructure (idempotent - runs every time)
6. Builds and pushes Docker image (tagged with environment + git SHA)
7. Deploys image to Cloud Run service
8. Verifies deployment (auto-rollback on failure)

- **`MASTER_DEPLOYS_TO_ENV='prod'`**: Direct to production deployment. Other environments remain as config templates.
- **`MASTER_DEPLOYS_TO_ENV='dev'`**: Master deploys to dev, then use [Release Promotion](#release-promotion) for test/pilot/prod.

---

## CLI Commands

All deployment automation is handled by an interactive TypeScript CLI:

```bash
bun deploy-scripts/cli.ts
```

This will prompt you to:

1. Select a command (generate-tfvars, show-deployment-info, terraform-apply)
2. Select an environment (if needed)
3. Execute the command

**Direct usage:** You can also run commands directly with arguments. Use `bun run cli:help` to see all available commands.

---

## Release Promotion

**Promote tested images between environments** (instead of rebuilding):

```
dev → test → pilot → prod
```

**NOTE**: Promotion workflow applies only when `MASTER_DEPLOYS_TO_ENV='dev'`. When set to `'prod'`, deployment goes directly to production and promotion workflow is unused.

### Using the Promotion Workflow

1. Go to **Actions** → **Promote Release** → **Run workflow**
2. Select source environment (e.g., `dev`)
3. Select target environment (e.g., `test`)
4. Click **Run workflow**

The workflow:

- Validates promotion path (dev → test, test → pilot, pilot → prod only)
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

The `.tfvars` files are **generated** from this TypeScript config using `bun deploy-scripts/cli.ts generate-tfvars`.

### Key Variables

| Variable               | Environment-Specific | Shared |
| ---------------------- | -------------------- | ------ |
| `projectId`            |                      | ✓      |
| `region`               |                      | ✓      |
| `artifactRegistryName` |                      | ✓      |
| `cloudRunServiceName`  | ✓                    |        |
| `customDomain`         | ✓                    |        |
| `maxInstances`         | ✓                    |        |
| `memoryLimit`          | ✓                    |        |

### Changing Configuration

1. Edit `config/configVariables.ts`
2. Run `bun deploy-scripts/cli.ts generate-tfvars` to regenerate `.tfvars` files
3. Commit both files
4. Push to `master` (auto-applies to target environment)
5. For non-target environments: manual Terraform or promotion workflow

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
terraform import -var-file="../../config/<env>.tfvars" \
  google_artifact_registry_repository.docker_repo \
  projects/antonarbus/locations/us-central1/repositories/docker-images
```

**Cloud Run Service:**

```bash
terraform import -var-file="../../config/<env>.tfvars" \
  google_cloud_run_v2_service.main \
  projects/antonarbus/locations/us-central1/services/web-app-<env>
```

**Domain Mapping:**

```bash
terraform import -var-file="../../config/<env>.tfvars" \
  google_cloud_run_domain_mapping.main \
  locations/us-central1/namespaces/antonarbus/domainmappings/<env>.antonarbus.com
```

**Public Access IAM:**

```bash
terraform import -var-file="../../config/<env>.tfvars" \
  google_cloud_run_v2_service_iam_member.public_access \
  "projects/antonarbus/locations/us-central1/services/web-app-<env> roles/run.invoker allUsers"
```

### "Error acquiring the state lock"

Terraform is already running or has a stale lock from a crashed operation.

**Check lock owner** (from error message):

```
Who: runner@runnervmw9dnm    # CI/CD
Who: sherb@MAC-KX909470LX    # Your local machine
```

```bash
# Find locks
gcloud storage ls --recursive gs://antonarbus-terraform-state/terraform/state/ | grep -i lock

# Remove specific lock
gcloud storage rm gs://antonarbus-terraform-state/terraform/state/<env>.tflock

# Or remove all locks (use with caution!)
gcloud storage rm gs://antonarbus-terraform-state/terraform/state/**/*.tflock
```

### "Caller is not authorized to administer the domain"

Domain verification missing. See [Domain Verification](#3-domain-verification-one-time) section.

### CLI Command Errors

**"Command not found"**

- Install Bun: `bun --version` to verify
- Run `bun install` in project root

**Config validation fails**

- Check `config/configVariables.ts` for missing properties
- Regenerate: `bun deploy-scripts/cli.ts generate-tfvars`

**GCP commands fail**

- Authenticate: `gcloud auth login`
- Set project: `gcloud config set project antonarbus`
- Verify APIs enabled (see [Prerequisites](#1-prerequisites))

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

- [Cloud Run Console](https://console.cloud.google.com/run?project=antonarbus)
- [Logs](https://console.cloud.google.com/logs/query?project=antonarbus)
- [Artifact Registry](https://console.cloud.google.com/artifacts?project=antonarbus)
- GitHub Actions: Repository → Actions tab

---

## Project Structure

```
/
├── config/                       # Single source of truth for configuration
│   ├── configVariables.ts        # TypeScript config (authoritative)
│   ├── dev.tfvars                # Generated from configVariables.ts
│   ├── test.tfvars               # Generated from configVariables.ts
│   ├── pilot.tfvars              # Generated from configVariables.ts
│   └── prod.tfvars               # Generated from configVariables.ts
├── deploy-scripts/                      # TypeScript CLI for deployment automation
│   ├── cli.ts                    # Main CLI entry point
│   ├── commands/                 # Command implementations
│   └── lib/                      # Shared utilities (gcloud, output, etc.)
├── terraform/
│   ├── bootstrap/                # One-time setup (shared resources)
│   └── infrastructure/           # Per-environment resources
├── .github/
│   └── workflows/
│       ├── deploy.yml            # Auto-deploy on push to master
│       └── promote.yml           # Manual image promotion
├── dockerfile.prod               # Production Docker image
└── README.md                     # This file
```

## Move away from cloud-run to Cloudflare

Option 3: Cloudflare Pages (easiest, FREE)

Your Domain → Cloudflare DNS → Cloudflare CDN (300+ locations) → your static files

Setup:

1. Sign up for Cloudflare
2. Deploy out/ folder (CLI or git)
3. Point your domain nameservers to Cloudflare OR add a CNAME record
4. Cloudflare handles everything: HTTPS, CDN, routing
