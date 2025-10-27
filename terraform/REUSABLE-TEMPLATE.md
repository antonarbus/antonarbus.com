# Using This as a Reusable Template

Copy this Terraform setup to a new project for production-ready Cloud Run deployment.

## What You Get

- **Cloud Run** - Serverless container with auto-scaling
- **Artifact Registry** - Docker image storage
- **Remote State** - GCS backend with state locking
- **CI/CD** - Automated validation and deployment
- **Security** - Service accounts with minimal permissions
- **Health Checks** - Startup and liveness probes

**Stack:** Cloud Run + Artifact Registry + Terraform + GitHub Actions

---

## Quick Start

### 1. Copy Files

```bash
# Copy terraform directory to new project
cp -r terraform /path/to/new-project/

# Copy GitHub workflows
cp -r .github/workflows /path/to/new-project/.github/
```

### 2. Update Configuration

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

### 3. Setup GCP Project

```bash
# Set project
gcloud config set project your-project-id

# Enable APIs
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  iam.googleapis.com \
  storage.googleapis.com \
  cloudresourcemanager.googleapis.com

# Authenticate
gcloud auth application-default login
```

### 4. Bootstrap Terraform

```bash
cd terraform

# Phase 1: Comment out backend block in backend.tf
terraform init
terraform apply

# Phase 2: Uncomment backend block
terraform init -migrate-state
rm -f terraform.tfstate*
terraform fmt -recursive
```

See [SETUP.md](./SETUP.md) for detailed instructions.

### 5. Setup GitHub Actions

```bash
# Create key
gcloud iam service-accounts keys create ~/github-key.json \
  --iam-account=github-actions-sa@your-project-id.iam.gserviceaccount.com

# Add to GitHub: Settings → Secrets → Actions
# Name: GCP_SA_KEY
# Value: <contents of github-key.json>

rm ~/github-key.json
```

---

## Customization

### Environment Variables

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

### Secrets (Secret Manager)

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

### Different Environments

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

### Multiple Services

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

---

## File Structure

```
project/
├── .github/workflows/
│   └── deploy.yml                 # Unified deployment workflow
├── terraform/
│   ├── main.tf                    # Infrastructure resources
│   ├── variables.tf               # Configuration (edit this!)
│   ├── outputs.tf                 # Output values
│   ├── backend.tf                 # Remote state config
│   ├── SETUP.md                   # Setup guide
│   ├── REUSABLE-TEMPLATE.md       # This file
│   └── README.md                  # Quick reference
└── .gitignore
```

---

## Cost Estimate

With default settings:
- **Cloud Run**: $0/month (scales to zero when idle)
- **Artifact Registry**: ~$0.10/month
- **GCS State**: ~$0.02/month
- **Total**: ~$0.12/month when idle

---

## Unified Deploy Workflow

**Trigger:** Every push to master

**How it works:**
1. **Detects changes** - Determines which files changed
2. **Conditional Terraform** - Runs only if `terraform/` or `deploy.yml` changed
3. **Conditional Docker** - Runs only if app code or terraform changed
4. **Sequential execution** - Terraform always completes before Docker

**Smart behavior:**
- App code only → Skip Terraform, deploy Docker (~3 min)
- Terraform only → Run Terraform, then Docker (~5 min)
- Both changed → Run both sequentially (~5 min)
- Workflow changed → Run both to verify (~5 min)

---

## Maintenance

### Update Infrastructure

```bash
# Edit variables.tf
memory_limit = "1Gi"

# Commit and push (CI/CD applies automatically)
git add terraform/
git commit -m "feat: increase memory"
git push
```

### Update Terraform Provider

```bash
terraform init -upgrade
terraform plan
terraform apply
```

### Destroy Infrastructure

```bash
terraform destroy  # ⚠️ Deletes everything!
```

---

## Support

- [Terraform Google Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [Cloud Run Docs](https://cloud.google.com/run/docs)
- [GCS Backend](https://www.terraform.io/language/settings/backends/gcs)
