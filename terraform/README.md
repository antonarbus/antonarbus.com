# Terraform Configuration

Infrastructure as Code for antonarbus.com on Google Cloud Run.

## What's Managed

- Cloud Run Service (`cloud-run`)
- Artifact Registry (`artifact-registry`)
- Service Accounts (`github-actions-sa`, `cloud-run-sa`)
- IAM Permissions
- Custom Domain (`antonarbus.com`)
- GCS Backend (state storage)

## Quick Commands

### Deployment: Smart Wrapper Script
```bash
./terraform.sh          # Runs 'terraform apply' with auto-bootstrap
```

**Used by:** GitHub Actions CI/CD (automatically on push to master)
**Handles:** Bucket bootstrap + terraform apply, no manual steps needed

### For Development: Direct Terraform
```bash
terraform plan          # Preview changes
terraform apply         # Apply changes (if bucket exists)
terraform destroy       # Destroy infrastructure
terraform output        # View outputs
terraform fmt -recursive # Format files
```

**Note:** Use wrapper script for deployment. Use direct terraform for planning/debugging.

## Setup

### Automated (Recommended)

Just push to master - GitHub Actions runs `./terraform.sh` automatically!

**For local deployment:**
```bash
cd terraform
./terraform.sh    # Runs terraform apply with auto-bootstrap
```

The script automatically handles everything:
- Detects if GCS bucket exists
- If not: creates bucket, migrates state to remote
- If yes: runs terraform apply normally

### Manual Bootstrap (Fallback Only)

If `terraform.sh` fails for some reason, you can bootstrap manually:

```bash
terraform init -backend=false
terraform apply -target=google_storage_bucket.terraform_state
terraform init -force-copy
rm -f terraform.tfstate*
terraform apply
```

## GitHub Actions

The workflow uses `./terraform.sh` (hardcoded to run `terraform apply`):
- Push to master → Detect changes → Run `./terraform.sh` → Deploy Docker
- First time: Creates bucket, migrates state, applies infrastructure
- Ongoing: Applies infrastructure with remote backend

## Troubleshooting

```bash
# Format files
terraform fmt -recursive

# Auth
gcloud auth application-default login

# Reset backend
terraform init -reconfigure

# Import bucket
terraform import google_storage_bucket.terraform_state antonarbus-terraform-state

# Import Cloud Run
terraform import google_cloud_run_v2_service.main \
  projects/antonarbus/locations/us-central1/services/cloud-run
```

## File Structure

```
terraform/
├── main.tf         # All resources and backend configuration
├── variables.tf    # Configuration variables
├── outputs.tf      # Output values
├── terraform.sh    # Smart wrapper script (handles bootstrap automatically)
└── README.md       # This file
```

## Variables

Key variables in `variables.tf`:
- Project: `antonarbus`, Region: `us-central1`
- Service: `cloud-run`, Domain: `antonarbus.com`
- Resources: CPU `1`, Memory `512Mi`, Instances `0-100`

Variables align with `deploy.yml` workflow environment variables.

## Resource Creation Order

The GCS bucket is resource #1 and created first during bootstrap:

```
1. GCS BUCKET          ← Created FIRST (bootstrap)
2. ARTIFACT REGISTRY   ← Then infrastructure
3. SERVICE ACCOUNTS
4. IAM PERMISSIONS
5. CLOUD RUN SERVICE
6. PUBLIC ACCESS
7. DOMAIN MAPPING
```

## Learn More

- [Terraform Google Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [Cloud Run Docs](https://cloud.google.com/run/docs)
- [GCS Backend](https://www.terraform.io/language/settings/backends/gcs)
