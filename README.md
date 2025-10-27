# https://antonarbus.com

## Infrastructure Overview

This project uses **Terraform** to manage all Google Cloud infrastructure as code.

- **Infrastructure configuration**: `/terraform` directory
- **CI/CD pipeline**: `.github/workflows/google-cloudrun-docker.yml`
- **Documentation**: See `/terraform/README.md` for detailed setup instructions

## Quick Start

### Prerequisites

1. Google Cloud account with project `antonarbus`
2. Terraform installed (see [terraform/README.md](terraform/README.md) for installation instructions)
3. GitHub Actions secret `GCP_SA_KEY` configured (see below)

### Infrastructure Management

All infrastructure is managed via Terraform and **automatically applied via CI/CD**.

**To modify infrastructure** (CPU, memory, scaling, etc.):

1. **Create a branch and edit Terraform files**:
   ```bash
   git checkout -b update-infrastructure
   # Edit terraform/*.tf files
   git add terraform/
   git commit -m "feat: update infrastructure configuration"
   git push origin update-infrastructure
   ```

2. **Create Pull Request**:
   - `terraform-check.yml` runs automatically
   - Shows `terraform plan` output in PR comments
   - Team reviews infrastructure changes

3. **Merge to master**:
   - `terraform-apply.yml` runs automatically
   - Applies infrastructure changes
   - No manual `terraform apply` needed!

**What Terraform manages:**
- ✅ Cloud Run service (`cloud-run`)
- ✅ Artifact Registry (`artifact-registry`)
- ✅ Service accounts and IAM permissions
- ✅ Custom domain mapping (`antonarbus.com`)
- ✅ Health probes and scaling configuration

**Local development** (optional):
```bash
cd terraform
terraform plan   # Preview changes locally
# terraform apply is done by CI/CD
```

## CI/CD with GitHub Actions

**Three automated workflows:**

1. **Terraform Check** (`.github/workflows/terraform-check.yml`) - PR validation
   - Runs on every PR that changes Terraform files
   - Validates Terraform syntax and formatting
   - Runs `terraform plan` and comments on PR with changes
   - Prevents merging invalid Terraform code

2. **Terraform Apply** (`.github/workflows/terraform-apply.yml`) - Infrastructure deployment
   - Runs on push to master (after PR merge)
   - Automatically applies Terraform changes
   - Updates infrastructure configuration
   - **Fully automated - no manual terraform apply needed!**

3. **Build and Deploy** (`.github/workflows/google-cloudrun-docker.yml`) - Application deployment
   - Runs on push to master branch
   - Builds Docker image and pushes to Artifact Registry
   - Deploys container to Cloud Run
   - Updates only the container image (infrastructure managed by Terraform)

**Environment variables** (configured in workflows):
- `PROJECT_ID`: `antonarbus`
- `REGION`: `us-central1`
- `ARTIFACTS_REGISTRY_NAME`: `artifact-registry`
- `DOCKER_IMAGE_NAME`: `docker-image`
- `SERVICE_NAME`: `cloud-run`

## GitHub Actions Setup (One-time)

### Required Secret: `GCP_SA_KEY`

The only manual configuration needed is setting up the GitHub Actions service account key:

1. **Get the service account key** (if you don't have it):
   ```bash
   # The service account is created by Terraform
   # You only need to create a key for it
   gcloud iam service-accounts keys create key.json \
     --iam-account=github-actions-sa@antonarbus.iam.gserviceaccount.com
   ```

2. **Add to GitHub**:
   - Go to: GitHub > Repository Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `GCP_SA_KEY`
   - Value: Paste the entire contents of `key.json`

3. **Delete the local key file** (security):
   ```bash
   rm key.json
   ```

**Note**: This secret is referenced in the workflow as `secrets.GCP_SA_KEY`

## What's Managed Where

### ✅ Terraform-Managed (Infrastructure as Code)

Everything in the `/terraform` directory:
- Cloud Run service configuration
- Artifact Registry
- Service accounts (`github-actions-sa`, `cloud-run-sa`)
- IAM roles and permissions
- Domain mapping
- Health probes
- Scaling settings

**To change these**: Edit Terraform files and run `terraform apply`

### ⚠️ Manually Managed (One-time Setup)

1. **GitHub Secret**: `GCP_SA_KEY` (service account key)
2. **DNS Records**: A/AAAA records at your domain registrar pointing to Google Cloud Run
3. **Google Cloud Project**: Project ID `antonarbus` and billing

**You only set these up once** - they don't change during normal operations.

## Monitoring & Logs

- **Cloud Run Metrics**: https://console.cloud.google.com/run/detail/us-central1/cloud-run/metrics?project=antonarbus
- **Artifact Registry**: https://console.cloud.google.com/artifacts/docker/antonarbus/us-central1/artifact-registry?project=antonarbus
- **Service URLs**:
  - Direct: https://cloud-run-okshaenegq-uc.a.run.app
  - Custom domain: https://antonarbus.com

---

## 📚 Documentation

### Terraform Infrastructure Guides

Choose the guide for your situation:

- **[terraform/BOOTSTRAP.md](terraform/BOOTSTRAP.md)** - First-time setup from scratch
- **[terraform/MIGRATION.md](terraform/MIGRATION.md)** - Upgrade existing installation
- **[terraform/REUSABLE-TEMPLATE.md](terraform/REUSABLE-TEMPLATE.md)** - Copy setup to new project
- **[terraform/README.md](terraform/README.md)** - Daily usage and quick reference

### Infrastructure Configuration

- **[terraform/main.tf](terraform/main.tf)** - All resources with detailed comments
- **[terraform/variables.tf](terraform/variables.tf)** - Configuration options
- **[terraform/backend.tf](terraform/backend.tf)** - Remote state configuration

---

<details>
<summary><strong>⚠️ DEPRECATED: Old Manual Configuration (Pre-Terraform)</strong></summary>

**Note**: The instructions below are obsolete. Infrastructure is now managed by Terraform.
Keeping for historical reference only.

### Cloud Run (Manual - Deprecated)

- create a cloud run container with unauthenticated access + min 0 instances + 'us-central1' region
- give it a name "cloud-run"
- env.REGION goes to workflows/google-cloudrun-docker.yml
- it is possible that on first deployment you have to security --> "Allow unauthenticated invocations"
- go to Manage custom domains --> Add mapping --> Select domain --> generate dns settings --> add it to your hosting

https://console.cloud.google.com/run/detail/us-central1/cloud-run/metrics?inv=1&invt=AblLKg&project=antonarbus

### Artifact Registry (Manual - Deprecated)

- create repository for docker + 'us-central1' region + with delete artifacts option
- give it a name "artifact-registry"
- env.ARTIFACTS_REGISTRY_NAME goes to workflows/google-cloudrun-docker.yml

https://console.cloud.google.com/artifacts/docker/antonarbus/us-central1/artifact-registry?inv=1&invt=AblLNw&project=antonarbus

### IAM-Admin (Manual - Deprecated)

- go to Service Accounts --> Create Service Account to let github actions upload docker to Artifact Registry
- give it a name "github-actions-sa"
- add roles: 1. "Cloud Run Admin" 2. "Artifact Registry Administrator" 3. "Service Account User"
- go into created account --> keys --> add key --> create new json key
- copy full content of the key (big object) and add into github --> settings --> secrets & variables --> actions --> New repository secrets --> under "GCP_SA_KEY" name
- secrets.GCP_SA_KEY goes to workflows/google-cloudrun-docker.yml

**Why deprecated**: All service accounts and IAM roles are now created and managed by Terraform automatically.

</details>
