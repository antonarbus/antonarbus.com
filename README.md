# antonarbus.com

Next.js web application deployed to Google Cloud Run with Terraform infrastructure as code.

## Table of Contents

- [Architecture](#architecture)
- [Development](#development)
- [First-Time Setup](#first-time-setup)
- [Deployment](#deployment)
- [Release Promotion](#release-promotion)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Monitoring](#monitoring)

---

## Architecture

**Project**: All environments run in GCP project `antonarbus`

| Environment | Branch   | Cloud Run Service | Domain                 | Memory | Max Instances |
| ----------- | -------- | ----------------- | ---------------------- | ------ | ------------- |
| **Prod**    | `master` | `web-app-prod`    | antonarbus.com         | 512Mi  | 100           |
| **Pilot**   | `pilot`  | `web-app-pilot`   | pilot.antonarbus.com   | 512Mi  | 50            |
| **Test**    | `test`   | `web-app-test`    | test.antonarbus.com    | 512Mi  | 10            |
| **Dev**     | `dev`    | `web-app-dev`     | dev.antonarbus.com     | 512Mi  | 5             |

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

### Benefits

- Single credentials management (one GitHub Actions SA for all environments)
- Isolated app deployments (dev can't break prod)
- Cost-effective (shared infrastructure)
- Immutable deployments (same image promoted through environments)

---

## Development

```bash
npm install
npm run dev              # Local development at http://localhost:3000
npm run build            # Build production
npm run docker-build     # Build Docker image locally
```

---

## First-Time Setup

### 1. Prerequisites

```bash
# Authenticate with GCP (requires Owner/Admin permissions)
gcloud auth application-default login

# Verify project
gcloud projects describe antonarbus
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

**Verify it worked:**
- Go back to Search Console → Settings → Users and permissions
- Confirm `github-actions-sa@antonarbus.iam.gserviceaccount.com` is listed as Owner
- Or test by deploying: if domain mapping creates successfully, verification worked

This enables ALL environments (dev, test, pilot, prod) to create domain mappings automatically.

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

### 5. DNS Setup (Per Environment)

After first deployment to each environment:
1. Go to Cloud Run → Manage Custom Domains
2. Copy DNS records shown
3. Add them to your domain registrar (e.g., GoDaddy, Namecheap)

---

## Deployment

### Automatic (via GitHub Actions)

1. Push to branch (`dev`, `test`, `pilot`, or `master`)
2. GitHub Actions detects environment
3. Builds Docker image (tagged with environment + git SHA)
4. Runs Terraform if infrastructure changed
5. Deploys to Cloud Run
6. Verifies deployment (auto-rollback on failure)

### Manual

```bash
cd terraform/infrastructure

# Uses current git branch to detect environment
bash smart-apply.sh

# Or specify environment explicitly
ENV=prod bash smart-apply.sh
```

---

## Release Promotion

**Promote tested images between environments** (instead of rebuilding):

```
dev → test → pilot → prod
```

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

### Why Image Promotion?

- **Consistency**: Same binary tested in dev runs in prod
- **Traceability**: Images tagged with git SHA and environment
- **Safety**: Required approvals before promoting
- **Speed**: Instant re-tagging (no rebuild)
- **Audit trail**: Clear record of who promoted what and when

---

## Configuration

### Single Source of Truth

All configuration lives in `/config/<env>.tfvars`:
- `dev.tfvars`, `test.tfvars`, `pilot.tfvars`, `prod.tfvars`

Both Terraform and GitHub Actions read from these files. No duplication.

### Key Variables

| Variable | Environment-Specific | Shared |
|----------|---------------------|--------|
| `project_id` | | X |
| `region` | | X |
| `artifact_registry_name` | | X |
| `cloud_run_service_name` | X | |
| `custom_domain` | X | |
| `max_instances` | X | |
| `memory_limit` | X | |

### Changing Configuration

1. Edit `/config/<env>.tfvars`
2. Push to the corresponding branch
3. GitHub Actions applies changes automatically

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
gsutil ls -r gs://antonarbus-terraform-state/terraform/state/ | grep -i lock

# Remove specific lock
gsutil rm gs://antonarbus-terraform-state/terraform/state/dev.tflock

# Or remove all locks (use with caution!)
gsutil rm gs://antonarbus-terraform-state/terraform/state/**/*.tflock
```

### "Caller is not authorized to administer the domain"

Domain verification missing. See [Domain Verification](#3-domain-verification-one-time) section.

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
├── config/                    # Environment configurations (single source of truth)
│   ├── dev.tfvars
│   ├── test.tfvars
│   ├── pilot.tfvars
│   └── prod.tfvars
├── terraform/
│   ├── bootstrap/             # One-time setup (state bucket, shared registry, SAs)
│   └── infrastructure/        # Per-environment resources (Cloud Run, domains)
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml         # Auto-deploy on push
│   │   └── promote.yml        # Image promotion workflow
│   └── scripts/               # Deployment helper scripts
├── dockerfile.prod            # Production Docker image
└── README.md                  # This file
```
