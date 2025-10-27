# Terraform Configuration for antonarbus.com

This directory contains Terraform configuration to manage all Google Cloud infrastructure for antonarbus.com.

## 📚 Documentation

Choose the guide for your situation:

- **[BOOTSTRAP.md](./BOOTSTRAP.md)** - First-time setup from scratch
- **[MIGRATION.md](./MIGRATION.md)** - Upgrade existing installation to remote state
- **[REUSABLE-TEMPLATE.md](./REUSABLE-TEMPLATE.md)** - Copy this setup to a new project
- **[README.md](./README.md)** (this file) - Daily usage reference

## Quick Reference

```bash
# First time
terraform init                   # Initialize (download plugins)
terraform plan                   # Preview changes
terraform apply                  # Create/update infrastructure

# Daily use
terraform plan                   # Preview changes
terraform apply                  # Apply changes
terraform output                 # Show URLs, emails, etc.

# View state
terraform state list             # List all resources
terraform state show <resource>  # Show resource details

# Troubleshooting
terraform validate               # Check syntax
terraform fmt                    # Format files
export TF_LOG=DEBUG             # Enable debug logging
```

## What This Configuration Manages

- ✅ **Cloud Run Service** (`cloud-run`) - Serverless container with auto-scaling
- ✅ **Artifact Registry** (`artifact-registry`) - Docker image storage
- ✅ **Service Accounts** - `github-actions-sa` and `cloud-run-sa`
- ✅ **IAM Permissions** - Proper roles for deployments and service access
- ✅ **Custom Domain Mapping** - `antonarbus.com` → Cloud Run
- ✅ **Health Probes** - Startup and liveness checks

## Quick Start

### Prerequisites

1. **Install Terraform** (>= 1.0):
   ```bash
   brew tap hashicorp/tap
   brew install hashicorp/tap/terraform
   ```

2. **Install Google Cloud SDK**:
   ```bash
   brew install google-cloud-sdk
   ```

3. **Authenticate**:
   ```bash
   gcloud auth application-default login

   # Enable required APIs
   gcloud services enable run.googleapis.com \
     artifactregistry.googleapis.com \
     iam.googleapis.com
   ```

### First Time Setup

```bash
cd terraform
terraform init
terraform plan
terraform apply  # Type "yes" when prompted
terraform output
```

## Daily Usage

**To modify infrastructure** (CPU, memory, scaling):
1. Edit `variables.tf`
2. Run `terraform plan` to preview
3. Run `terraform apply` to apply

**Example:**
```bash
# Edit variables.tf: memory_limit = "1Gi"
terraform plan
terraform apply
```

## GitHub Actions Setup (One-time)

```bash
# Create service account key
gcloud iam service-accounts keys create ~/github-key.json \
  --iam-account=github-actions-sa@antonarbus.iam.gserviceaccount.com

# Add to GitHub: Settings → Secrets → Actions → New secret "GCP_SA_KEY"
# Delete local key
rm ~/github-key.json
```

## Understanding Terraform

**What is Terraform?**
Infrastructure as Code (IaC) - define cloud infrastructure in files instead of clicking through web consoles.

**How it works:**
```
Your .tf files  →  Terraform  →  Google Cloud
(what you want)    (reads)       (creates resources)
```

**State file (`terraform.tfstate`):**
Terraform's memory of your infrastructure. Contains sensitive data - never commit to git.

**Reading `terraform plan` output:**
- `+` = will be created
- `~` = will be modified
- `-` = will be deleted
- `+/-` = will be replaced

**Key tips:**
- Always run `terraform plan` before `apply` - it shows what will happen
- Terraform is idempotent - running `apply` multiple times is safe
- Manual changes are detected and can be reverted
- Change `variables.tf` to modify settings (CPU, memory, etc.)

## File Structure

```
terraform/
├── main.tf              # Infrastructure definition
├── variables.tf         # Configuration variables
├── outputs.tf          # Values shown after apply
├── .gitignore          # Excludes secrets from git
└── terraform.tfstate   # State (gitignored)
```

## Troubleshooting

**"Permission denied"**
```bash
gcloud auth application-default login
```

**"API not enabled"**
```bash
gcloud services enable <service-name>.googleapis.com
```

**"Resource already exists"**
```bash
# Import existing resource
terraform import google_artifact_registry_repository.docker_repo \
  projects/antonarbus/locations/us-central1/repositories/artifact-registry
```

**Debug mode**
```bash
export TF_LOG=DEBUG
terraform plan
```

## Learn More

- [Google Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [Cloud Run Resource](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service)
- [Terraform Language](https://www.terraform.io/language)
