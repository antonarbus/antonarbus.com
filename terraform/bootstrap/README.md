# Bootstrap - One-Time Setup

This directory contains Terraform configuration for project-wide resources that need to be created **once** before any infrastructure can be deployed.

## What Gets Created

### 1. Terraform State Bucket
- **Resource**: `google_storage_bucket.terraform_state`
- **Name**: `antonarbus-terraform-state`
- **Purpose**: Stores Terraform state files for all environments
- **Features**:
  - Versioning enabled (keeps history of state changes)
  - Lifecycle policy (keeps last 10 versions)
  - Uniform bucket-level access (security)

### 2. Workload Identity Federation (Keyless GitHub Actions Authentication)
- **Pool**: `github-pool` - Groups identity providers
- **Provider**: `github-provider` - Configures GitHub as trusted OIDC provider
- **IAM Binding**: Allows GitHub Actions to impersonate `github-actions-sa`

This replaces service account JSON keys with secure, short-lived OIDC tokens.

**Benefits**:
- No secrets stored in GitHub
- No key rotation needed
- More secure (Google's recommended approach)
- Works for ALL environments (dev/test/pilot/prod)

## When to Run

**Run this ONCE** when setting up the project for the first time, or when adding new bootstrap resources.

## How to Run

```bash
cd terraform/bootstrap

# Initialize Terraform
terraform init

# Review what will be created
terraform plan -var-file="../../config/dev.tfvars"

# Create the resources
terraform apply -var-file="../../config/dev.tfvars"
```

## Authentication Required

You need to be authenticated as a GCP user with Owner or Admin permissions:

```bash
gcloud auth application-default login
```

**Why?** These bootstrap resources require elevated permissions that the GitHub Actions service account doesn't have (chicken-and-egg problem).

## After Bootstrap

Once bootstrap is complete:

1. The Terraform state bucket will store all environment states
2. GitHub Actions will authenticate using Workload Identity (no secrets needed)
3. All infrastructure deployments run automatically via CI/CD

## Important Notes

- **Never run bootstrap in CI/CD** - It's designed for local execution only
- **Terraform state is local** - Bootstrap doesn't use remote state (it creates the remote state bucket)
- **Warnings about undeclared variables** - Normal, bootstrap doesn't use infrastructure variables
- **If resources already exist** - Import them instead of recreating:
  ```bash
  terraform import google_storage_bucket.terraform_state antonarbus-terraform-state
  terraform import google_iam_workload_identity_pool.github_pool projects/antonarbus/locations/global/workloadIdentityPools/github-pool
  ```

## Files in This Directory

- `main.tf` - Terraform state bucket configuration
- `workload-identity.tf` - Workload Identity Federation setup
- `variables.tf` - Variable declarations
- `outputs.tf` - Outputs (workload identity provider URL)
- `terraform.tfstate` - Local state file (not in git)
