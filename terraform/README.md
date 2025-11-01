# Terraform Configuration for antonarbus.com

Infrastructure as Code for Google Cloud Run deployment.

## Table of Contents

- [What's Managed](#whats-managed)
- [Prerequisites](#prerequisites)
- [First-Time Setup (Bootstrap)](#first-time-setup-bootstrap)
- [Migration (Existing Setup)](#migration-existing-setup)
- [GitHub Actions Setup](#github-actions-setup)
- [Daily Usage](#daily-usage)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)
- [Using as a Reusable Template](#using-as-a-reusable-template)
- [File Structure](#file-structure)
- [Learn More](#learn-more)

---

## What's Managed

- **Cloud Run Service** (`cloud-run`) - Serverless container
- **Artifact Registry** (`artifact-registry`) - Docker image storage
- **Service Accounts** - `github-actions-sa` and `cloud-run-sa`
- **IAM Permissions** - Roles for deployments
- **Custom Domain** - `antonarbus.com` → Cloud Run
- **GCS Backend** - Remote state storage

---

## Prerequisites

### 1. Google Cloud Project

```bash
# Set your project
gcloud config set project antonarbus

# Enable required APIs
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  iam.googleapis.com \
  storage.googleapis.com \
  cloudresourcemanager.googleapis.com
```

### 2. Install Tools

```bash
# Terraform (>= 1.0)
brew install hashicorp/tap/terraform

# Google Cloud SDK
brew install google-cloud-sdk
```

### 3. Authenticate

```bash
gcloud auth login
gcloud auth application-default login
```

---

## First-Time Setup (Bootstrap)

Terraform has a chicken-and-egg problem: it needs a GCS bucket to store state, but we use Terraform to create that bucket.

**Solution:** Bootstrap in two phases.

### Phase 1: Create State Bucket (Local State)

1. **Comment out backend block** in `backend.tf`:
   ```hcl
   # terraform {
   #   backend "gcs" {
   #     bucket = "antonarbus-terraform-state"
   #     prefix = "terraform/state"
   #   }
   # }
   ```

2. **Initialize and apply:**
   ```bash
   cd terraform
   terraform init
   terraform plan
   terraform apply  # Type "yes"
   ```

   Creates ~11 resources including the state bucket.

3. **Verify bucket exists:**
   ```bash
   gcloud storage buckets describe gs://antonarbus-terraform-state
   ```

### Phase 2: Migrate to Remote State

1. **Uncomment backend block** in `backend.tf`

2. **Migrate state:**
   ```bash
   terraform init -migrate-state  # Type "yes" when prompted
   ```

3. **Verify migration:**
   ```bash
   gcloud storage ls gs://antonarbus-terraform-state/terraform/state/
   # Should show: default.tfstate
   ```

4. **Clean up local state:**
   ```bash
   rm -f terraform.tfstate terraform.tfstate.backup
   find .. -maxdepth 2 -name "*.tfstate*" -type f -delete
   ```

5. **Format files (prevents CI/CD failures):**
   ```bash
   terraform fmt -recursive
   ```

6. **Test:**
   ```bash
   terraform plan  # Should show "No changes"
   ```

---

## Migration (Existing Setup)

If you already have Terraform infrastructure with local state:

### Quick Migration

1. **Check current state:**
   ```bash
   cd terraform
   ls terraform.tfstate  # Should exist
   ```

2. **Comment out backend block** in `backend.tf` (if uncommented)

3. **Initialize:**
   ```bash
   terraform init
   terraform state list  # Verify resources exist
   ```

4. **Apply (creates state bucket):**
   ```bash
   terraform plan
   terraform apply  # Type "yes"
   ```

5. **Uncomment backend block** in `backend.tf`

6. **Migrate to remote state:**
   ```bash
   terraform init -migrate-state  # Type "yes"
   ```

7. **Clean up and verify:**
   ```bash
   rm -f terraform.tfstate terraform.tfstate.backup
   terraform plan  # Should show "No changes"
   terraform fmt -recursive
   ```

---

## GitHub Actions Setup

After infrastructure exists, configure automated deployments:

### 1. Create Service Account Key

```bash
gcloud iam service-accounts keys create ~/github-key.json \
  --iam-account=github-actions-sa@antonarbus.iam.gserviceaccount.com
```

### 2. Add to GitHub Secrets

1. Go to: **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `GCP_SA_KEY`
4. Value: Paste entire contents of `~/github-key.json`
5. Click **Add secret**

### 3. Delete Local Key

```bash
rm ~/github-key.json
```

### 4. Test Workflow

```bash
git commit --allow-empty -m "test: trigger workflow"
git push origin master
```

Check the **Actions** tab to verify the Deploy workflow succeeds.

---

## Daily Usage

### Quick Commands

```bash
# Initialize (first time)
terraform init

# Preview changes
terraform plan

# Apply changes
terraform apply

# View outputs
terraform output

# Format files
terraform fmt -recursive
```

### Modify Infrastructure

**Option 1: Manually**
1. Edit `variables.tf` (e.g., change memory/CPU)
2. Run `terraform plan` to preview
3. Run `terraform apply` to apply

**Option 2: Via CI/CD (recommended)**
1. Edit Terraform files
2. Commit and push to master
3. GitHub Actions automatically detects changes and applies

### How CI/CD Works

The unified Deploy workflow runs on every push to master:

1. **Detects changes** - Checks which files changed
2. **Runs Terraform** - Only if `terraform/` or `deploy.yml` changed
3. **Deploys Docker** - Only if app code or terraform changed
4. **Sequential execution** - Terraform always completes before Docker

**Examples:**
- Change app code → Skip Terraform, deploy Docker (~3 min)
- Change terraform → Run Terraform, then Docker (~5 min)
- Change both → Run both sequentially (~5 min)

### Custom Domain Setup

After Terraform applies:

1. Go to [Cloud Run Console](https://console.cloud.google.com/run)
2. Click service → "Manage Custom Domains"
3. Copy DNS records
4. Add to your domain registrar (GoDaddy, Namecheap, etc.)
5. Wait 24-48 hours for DNS propagation

---

## Verification

### Automated Checks

```bash
# State bucket exists
gcloud storage buckets describe gs://antonarbus-terraform-state

# State file in bucket
gcloud storage ls gs://antonarbus-terraform-state/terraform/state/

# No local state files
find . -name "*.tfstate*" -type f 2>/dev/null

# Terraform works
terraform plan  # Should show "No changes"

# Files formatted
terraform fmt -check -recursive
```

### Manual Checks

- [ ] Cloud Run service exists: https://console.cloud.google.com/run
- [ ] Artifact Registry exists: https://console.cloud.google.com/artifacts
- [ ] GitHub secret `GCP_SA_KEY` configured
- [ ] GitHub Actions Deploy workflow passes

---

## Troubleshooting

### "Terraform files are not properly formatted"

```bash
terraform fmt -recursive
git add .
git commit -m "style: format Terraform files"
git push
```

### "Error: Backend initialization required"

Expected if backend is already uncommented. Just comment it out and continue setup.

### "Error creating Bucket: already exists"

```bash
# Option 1: Import existing bucket
terraform import google_storage_bucket.terraform_state antonarbus-terraform-state

# Option 2: Use different bucket name in backend.tf
```

### "Permission denied"

```bash
# Re-authenticate
gcloud auth application-default login

# Or grant permissions
gcloud projects add-iam-policy-binding antonarbus \
  --member="user:your-email@example.com" \
  --role="roles/editor"
```

### "Resource already exists"

Import the existing resource:

```bash
# Cloud Run service
terraform import google_cloud_run_v2_service.main \
  projects/antonarbus/locations/us-central1/services/cloud-run

# Artifact Registry
terraform import google_artifact_registry_repository.docker_repo \
  projects/antonarbus/locations/us-central1/repositories/artifact-registry

# Service accounts
terraform import google_service_account.github_actions \
  projects/antonarbus/serviceAccounts/github-actions-sa@antonarbus.iam.gserviceaccount.com
```

### "No terraform.tfstate file found"

You need to import all existing resources or start fresh. Run `terraform import` commands above for each resource.

### State shows changes for existing resources

Small differences are normal during migration (IAM format changes, labels, computed fields). Review with `terraform plan` - if no destroys, safe to apply.

### API not enabled

```bash
gcloud services enable <service-name>.googleapis.com
```

### Debug mode

```bash
export TF_LOG=DEBUG
terraform plan
```

---

## Using as a Reusable Template

Copy this Terraform setup to a new project for production-ready Cloud Run deployment.

### What You Get

- **Cloud Run** - Serverless container with auto-scaling
- **Artifact Registry** - Docker image storage
- **Remote State** - GCS backend with state locking
- **CI/CD** - Automated validation and deployment
- **Security** - Service accounts with minimal permissions
- **Health Checks** - Startup and liveness probes

**Stack:** Cloud Run + Artifact Registry + Terraform + GitHub Actions

### Quick Start for New Project

#### 1. Copy Files

```bash
# Copy terraform directory to new project
cp -r terraform /path/to/new-project/

# Copy GitHub workflows
cp -r .github/workflows /path/to/new-project/.github/
```

#### 2. Update Configuration

**`terraform/variables.tf`** (or create `terraform.tfvars`):
```hcl
project_id             = "your-project-id"      # Change!
region                 = "us-central1"
cloud_run_service_name = "your-app"            # Change!
artifact_registry_name = "your-registry"       # Change!
custom_domain          = "yourdomain.com"      # Change!
```

**`terraform/backend.tf`**:
```hcl
terraform {
  backend "gcs" {
    bucket = "your-project-terraform-state"  # Change! Must be globally unique
    prefix = "terraform/state"
  }
}

resource "google_storage_bucket" "terraform_state" {
  name = "your-project-terraform-state"  # Same as above
  # ...
}
```

**`.github/workflows/deploy.yml`**:
```yaml
env:
  PROJECT_ID: 'your-project-id'              # Change!
  REGION: 'us-central1'
  ARTIFACTS_REGISTRY_NAME: 'your-registry'   # Match terraform
  DOCKER_IMAGE_NAME: 'your-image'
  SERVICE_NAME: 'your-app'                   # Match terraform
```

#### 3. Bootstrap New Project

Follow the [First-Time Setup](#first-time-setup-bootstrap) section above.

### Customization Examples

#### Environment Variables

Add to `main.tf` Cloud Run service:

```hcl
resource "google_cloud_run_v2_service" "main" {
  template {
    containers {
      env {
        name  = "NODE_ENV"
        value = "production"
      }
    }
  }
}
```

#### Secrets (Secret Manager)

```hcl
resource "google_secret_manager_secret" "api_key" {
  secret_id = "api-key"
  replication { automatic = true }
}

resource "google_cloud_run_v2_service" "main" {
  template {
    containers {
      env {
        name = "API_KEY"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.api_key.secret_id
            version = "latest"
          }
        }
      }
    }
  }
}
```

#### Different Environments

Create separate `.tfvars` files:

**`production.tfvars`**:
```hcl
project_id    = "myapp-prod"
min_instances = 2
cpu_limit     = "2"
memory_limit  = "1Gi"
```

**`staging.tfvars`**:
```hcl
project_id    = "myapp-staging"
min_instances = 0
cpu_limit     = "1"
memory_limit  = "512Mi"
```

Use: `terraform apply -var-file="production.tfvars"`

#### Multiple Services

```hcl
resource "google_cloud_run_v2_service" "frontend" {
  name     = "frontend"
  location = var.region
  # ...
}

resource "google_cloud_run_v2_service" "backend" {
  name     = "backend"
  location = var.region
  # ...
}
```

### Cost Estimate

With default settings:
- **Cloud Run**: $0/month (scales to zero when idle)
- **Artifact Registry**: ~$0.10/month
- **GCS State**: ~$0.02/month
- **Total**: ~$0.12/month when idle

---

## File Structure

```
terraform/
├── main.tf              # Infrastructure resources
├── variables.tf         # Configuration (edit this!)
├── outputs.tf          # Output values
├── backend.tf          # Remote state config
└── README.md           # This file
```

---

## Learn More

- [Terraform Google Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [Cloud Run Resource](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service)
- [GCS Backend Docs](https://www.terraform.io/language/settings/backends/gcs)
- [Terraform Language](https://www.terraform.io/language)
