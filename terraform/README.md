# Terraform Configuration for antonarbus.com

Infrastructure as Code for Google Cloud Run deployment.

## Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup guide (first-time & migration)
- **[README.md](./README.md)** (this file) - Quick reference

## Quick Commands

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

## What's Managed

- **Cloud Run Service** (`cloud-run`) - Serverless container
- **Artifact Registry** (`artifact-registry`) - Docker image storage
- **Service Accounts** - `github-actions-sa` and `cloud-run-sa`
- **IAM Permissions** - Roles for deployments
- **Custom Domain** - `antonarbus.com` → Cloud Run
- **GCS Backend** - Remote state storage

## Daily Usage

**Modify infrastructure:**
1. Edit `variables.tf` (e.g., change memory/CPU)
2. Run `terraform plan` to preview
3. Run `terraform apply` to apply

**Or use CI/CD (recommended):**
1. Edit Terraform files
2. Commit and push to master
3. GitHub Actions automatically applies changes

## File Structure

```
terraform/
├── main.tf              # Infrastructure resources
├── variables.tf         # Configuration (edit this!)
├── outputs.tf          # Output values
├── backend.tf          # Remote state config
├── SETUP.md            # Complete setup guide
└── README.md           # This file
```

## Prerequisites

1. **Terraform** (>= 1.0): `brew install hashicorp/tap/terraform`
2. **Google Cloud SDK**: `brew install google-cloud-sdk`
3. **Authentication**: `gcloud auth application-default login`

## Troubleshooting

**Permission denied:**
```bash
gcloud auth application-default login
```

**API not enabled:**
```bash
gcloud services enable <service-name>.googleapis.com
```

**Debug mode:**
```bash
export TF_LOG=DEBUG
terraform plan
```

## Learn More

- [Terraform Google Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [Cloud Run Resource](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service)
- [Terraform Language](https://www.terraform.io/language)
