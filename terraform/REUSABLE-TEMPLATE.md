# Using This Terraform Configuration as a Reusable Template

This guide shows how to copy this Terraform setup to a **new project** and get it running quickly.

---

## What This Template Provides

This is a **production-ready Terraform configuration** for deploying a containerized web application to Google Cloud Run with:

✅ **Infrastructure as Code** - All infrastructure in version control
✅ **Remote State Backend** - Team collaboration with GCS
✅ **CI/CD Integration** - Automated validation and deployment
✅ **Security Best Practices** - Minimal permissions, no secrets in git
✅ **Full Documentation** - Bootstrap, migration, and daily usage guides
✅ **Auto-scaling** - Scale to zero for cost savings
✅ **Custom Domains** - Map your domain to Cloud Run
✅ **Health Checks** - Startup and liveness probes

**Stack:**
- **Compute**: Google Cloud Run (serverless containers)
- **Storage**: Google Artifact Registry (Docker images)
- **State**: Google Cloud Storage (Terraform state)
- **CI/CD**: GitHub Actions
- **IaC**: Terraform

---

## Quick Start: Copy to New Project

### 1. Copy Files

Copy the entire `terraform/` directory to your new project:

```bash
# From the source project
cp -r terraform /path/to/new-project/

# Or if cloning for a new project
git clone <this-repo>
cd <new-repo>
# Keep the terraform directory as-is
```

### 2. Update Configuration

Edit these files with your values:

**`terraform/variables.tf`** (or create `terraform/terraform.tfvars`):
```hcl
project_id = "your-gcp-project-id"          # Change this!
region = "us-central1"                      # Or your preferred region
cloud_run_service_name = "your-app-name"   # Change this!
artifact_registry_name = "your-registry"    # Change this!
custom_domain = "yourdomain.com"            # Change this!

# Optionally customize:
min_instances = 0
max_instances = 100
cpu_limit = "1"
memory_limit = "512Mi"
container_port = 8080
```

**`terraform/backend.tf`** (lines 16-17):
```hcl
terraform {
  backend "gcs" {
    bucket = "your-project-terraform-state"  # Change this! Must be globally unique
    prefix = "terraform/state"
  }
}
```

Also update the bucket resource name (line 45):
```hcl
resource "google_storage_bucket" "terraform_state" {
  name = "your-project-terraform-state"  # Same as backend bucket name
  # ...
}
```

**`.github/workflows/google-cloudrun-docker.yml`**:
```yaml
env:
  PROJECT_ID: 'your-gcp-project-id'      # Change this!
  REGION: 'us-central1'
  ARTIFACTS_REGISTRY_NAME: 'your-registry'  # Match terraform variables
  DOCKER_IMAGE_NAME: 'your-image'
  SERVICE_NAME: 'your-app-name'          # Match terraform variables
```

### 3. Update .gitignore

Make sure your root `.gitignore` includes:

```gitignore
# Terraform
terraform/.terraform/
terraform/.terraform.lock.hcl
terraform/*.tfstate
terraform/*.tfstate.*
terraform/*.tfvars
terraform/*.tfvars.json

# GCP Service Account Keys
*.json
!package.json
!tsconfig.json
```

### 4. Prerequisites Setup

Before running Terraform, ensure you have:

#### A. Google Cloud Project
```bash
# Create project (or use existing)
gcloud projects create your-project-id --name="Your Project Name"

# Set as default
gcloud config set project your-project-id

# Enable billing (required!)
# Go to: https://console.cloud.google.com/billing/linkedaccount?project=your-project-id
```

#### B. Enable Required APIs
```bash
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  iam.googleapis.com \
  storage.googleapis.com \
  cloudresourcemanager.googleapis.com
```

#### C. Install Tools
```bash
# Terraform
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

# Google Cloud SDK
brew install google-cloud-sdk

# Authenticate
gcloud auth login
gcloud auth application-default login
```

### 5. Bootstrap Terraform

Follow the [BOOTSTRAP.md](./BOOTSTRAP.md) guide:

**Phase 1: Create Infrastructure**
```bash
cd terraform

# Comment out backend block in backend.tf
terraform init
terraform plan
terraform apply  # Type "yes"
```

**Phase 2: Migrate to Remote State**
```bash
# Uncomment backend block in backend.tf
terraform init -migrate-state  # Type "yes"

# Clean up local state files
rm -f terraform.tfstate terraform.tfstate.backup

# Format Terraform files (prevents CI/CD failures)
terraform fmt -recursive
```

### 6. Setup GitHub Actions

Create service account key:
```bash
gcloud iam service-accounts keys create ~/github-key.json \
  --iam-account=github-actions-sa@your-project-id.iam.gserviceaccount.com

# Add to GitHub: Settings → Secrets → Actions → New secret
# Name: GCP_SA_KEY
# Value: <contents of github-key.json>

rm ~/github-key.json
```

### 7. Configure DNS (If Using Custom Domain)

After Terraform applies:

1. Go to [Cloud Run Console](https://console.cloud.google.com/run)
2. Click your service → "Manage Custom Domains"
3. Copy the DNS records shown
4. Add them to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)

DNS propagation can take 24-48 hours.

---

## What Gets Created

When you run `terraform apply`, these resources are created:

| Resource | Name | Purpose |
|----------|------|---------|
| **GCS Bucket** | `{project}-terraform-state` | Stores Terraform state |
| **Artifact Registry** | `artifact-registry` | Stores Docker images |
| **Service Account** | `github-actions-sa` | GitHub Actions automation |
| **Service Account** | `cloud-run-sa` | Cloud Run runtime identity |
| **Cloud Run Service** | `cloud-run` | Your running application |
| **IAM Bindings** | Various | Permissions for service accounts |
| **Public Access** | On Cloud Run | Makes app publicly accessible |
| **Domain Mapping** | `yourdomain.com` | Custom domain → Cloud Run |

**Cost Estimate** (with defaults):
- Cloud Run: ~$0/month (scale to zero when idle)
- Artifact Registry: ~$0.10/month (storage for images)
- GCS State Bucket: ~$0.02/month (tiny state file)
- **Total: ~$0.12/month** when idle

---

## Customization Options

### Different Environments

Create separate `.tfvars` files:

**`terraform.production.tfvars`**:
```hcl
project_id = "myapp-production"
min_instances = 2
max_instances = 50
cpu_limit = "2"
memory_limit = "1Gi"
```

**`terraform.staging.tfvars`**:
```hcl
project_id = "myapp-staging"
min_instances = 0
max_instances = 10
cpu_limit = "1"
memory_limit = "512Mi"
```

Use with:
```bash
terraform apply -var-file="terraform.production.tfvars"
```

### Add Environment Variables

Update `main.tf` Cloud Run service:

```hcl
resource "google_cloud_run_v2_service" "main" {
  # ...
  template {
    containers {
      # ...
      env {
        name  = "NODE_ENV"
        value = "production"
      }
      env {
        name  = "API_URL"
        value = "https://api.example.com"
      }
    }
  }
}
```

### Add Secrets

For sensitive values, use Secret Manager:

```hcl
# Create secret
resource "google_secret_manager_secret" "api_key" {
  secret_id = "api-key"
  replication {
    automatic = true
  }
}

# Grant Cloud Run access
resource "google_secret_manager_secret_iam_member" "cloud_run_secret_access" {
  secret_id = google_secret_manager_secret.api_key.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

# Reference in Cloud Run
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

### Add Database

Add Cloud SQL:

```hcl
resource "google_sql_database_instance" "main" {
  name             = "my-database"
  database_version = "POSTGRES_15"
  region           = var.region

  settings {
    tier = "db-f1-micro"
  }
}

# Connect Cloud Run to database
resource "google_cloud_run_v2_service" "main" {
  template {
    containers {
      env {
        name  = "DB_HOST"
        value = google_sql_database_instance.main.connection_name
      }
    }
  }
}
```

### Multiple Services

Deploy multiple Cloud Run services:

```hcl
# Frontend service
resource "google_cloud_run_v2_service" "frontend" {
  name     = "frontend"
  location = var.region
  # ... config
}

# Backend API service
resource "google_cloud_run_v2_service" "backend" {
  name     = "backend"
  location = var.region
  # ... config
}
```

---

## CI/CD Workflows

This template includes two GitHub Actions workflows:

### 1. Terraform Validation (`.github/workflows/terraform-check.yml`)

**Triggers**: PRs that change Terraform files

**Actions**:
- Validates Terraform syntax
- Checks formatting
- Runs `terraform plan`
- Comments results on PR

**Required Secrets**: `GCP_SA_KEY`

### 2. Build & Deploy (`.github/workflows/google-cloudrun-docker.yml`)

**Triggers**: Push to master branch

**Actions**:
- Builds Docker image
- Pushes to Artifact Registry
- Deploys to Cloud Run

**Required Secrets**: `GCP_SA_KEY`

---

## File Structure

```
project/
├── .github/
│   └── workflows/
│       ├── terraform-check.yml      # Terraform CI validation
│       └── google-cloudrun-docker.yml  # Build & deploy
├── terraform/
│   ├── main.tf                      # Infrastructure resources
│   ├── variables.tf                 # Configuration variables
│   ├── outputs.tf                   # Output values
│   ├── backend.tf                   # Remote state config
│   ├── terraform.tfvars.example     # Example configuration
│   ├── .gitignore                   # Exclude secrets
│   ├── BOOTSTRAP.md                 # First-time setup guide
│   ├── MIGRATION.md                 # Upgrade existing setup
│   ├── REUSABLE-TEMPLATE.md         # This file
│   └── README.md                    # Daily usage guide
├── .gitignore                       # Project gitignore
└── README.md                        # Project README
```

---

## Best Practices Included

✅ **Remote State** - Team collaboration, state locking
✅ **State Versioning** - GCS bucket has versioning enabled
✅ **Gitignored Secrets** - `.tfvars` and `.tfstate` not in git
✅ **Minimal Permissions** - Service accounts with least privilege
✅ **Health Checks** - Startup and liveness probes configured
✅ **Auto-scaling** - Scale to zero for cost savings
✅ **CI/CD Validation** - Prevent invalid Terraform from merging
✅ **Automated Formatting** - `terraform fmt` in workflow prevents merge issues
✅ **Comprehensive Docs** - Multiple guides for different scenarios
✅ **Production Ready** - Used in real production environments

---

## Maintenance

### Update Terraform Provider

```bash
# Update to latest Google provider
terraform init -upgrade

# Review changes
terraform plan

# Apply if safe
terraform apply
```

### Update Resources (Automated via CI/CD)

**Recommended approach** (fully automated):

```bash
# 1. Create branch
git checkout -b increase-memory

# 2. Edit terraform files
# Example: Edit variables.tf
memory_limit = "1Gi"

# 3. Commit and push
git add terraform/
git commit -m "feat: increase Cloud Run memory to 1Gi"
git push origin increase-memory

# 4. Create PR on GitHub
# - terraform-check.yml runs (shows plan)
# - Review the plan

# 5. Merge PR
# - terraform-apply.yml runs automatically
# - Infrastructure updated!
# - No manual terraform apply needed
```

**Local approach** (if you prefer):

```bash
# Edit variables.tf or terraform.tfvars
memory_limit = "1Gi"

# Review and apply locally
terraform plan
terraform apply

# Push changes
git add . && git commit -m "feat: update config"
git push
```

**Note**: With automated CI/CD, terraform apply runs on merge to master.
This is safer and more consistent than local applies.

### Destroy Infrastructure

```bash
# ⚠️ WARNING: This deletes everything!
terraform destroy

# Or target specific resource
terraform destroy -target=google_cloud_run_v2_service.main
```

---

## Support & Resources

- **Terraform Google Provider**: https://registry.terraform.io/providers/hashicorp/google/latest/docs
- **Cloud Run Docs**: https://cloud.google.com/run/docs
- **Artifact Registry Docs**: https://cloud.google.com/artifact-registry/docs
- **Terraform Backend Docs**: https://www.terraform.io/language/settings/backends/gcs
- **GitHub Actions for GCP**: https://github.com/google-github-actions

---

## License

This Terraform configuration is reusable and can be freely copied/modified for your projects.
