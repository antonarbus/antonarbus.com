# Terraform Configuration

Infrastructure as Code for antonarbus.com on Google Cloud Run.

## What's Managed

- Cloud Run Service (`cloud-run`)
- Artifact Registry (`artifact-registry`)
- Service Accounts (`github-actions-sa`, `cloud-run-sa`)
- IAM Permissions
- Custom Domain (`antonarbus.com`)
- GCS Backend (state storage)

## Directory Structure

```
terraform/
├── bootstrap/          # Creates state bucket (local state)
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── infrastructure/     # Main infrastructure (remote backend)
│   ├── backend.tf
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── terraform.sh        # Smart deployment script
└── README.md           # This file
```

### Bootstrap Directory

The bootstrap directory solves the chicken-and-egg problem:
- Terraform needs a GCS bucket to store state
- But Terraform needs to run to create the bucket

**Solution:** Bootstrap uses **local state** to create just the bucket, then the main infrastructure uses that bucket as a **remote backend**.

You only need to run this **once** when setting up for the first time, or if you've deleted the state bucket. The `terraform.sh` script automatically handles this.

## Quick Commands

### Deployment: Smart Wrapper Script

```bash
./terraform.sh          # Runs deployment with auto-bootstrap
```

**Used by:** GitHub Actions CI/CD (automatically on push to master)
**Handles:**
1. Checks if state bucket exists
2. If not: runs bootstrap to create it
3. Deploys main infrastructure with remote backend

### For Development: Direct Terraform

```bash
# In infrastructure/ directory
terraform plan          # Preview changes
terraform apply         # Apply changes
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
./terraform.sh    # Handles everything automatically
```

The script automatically:
- Detects if GCS bucket exists
- If not: runs bootstrap to create bucket
- If yes: skips bootstrap
- Deploys main infrastructure with remote backend

### Manual Bootstrap (Fallback Only)

If you need to run bootstrap manually:

```bash
cd bootstrap/
terraform init
terraform apply
cd ../infrastructure/
terraform init -backend-config="bucket=antonarbus-terraform-state" \
  -backend-config="prefix=terraform/state"
terraform apply
```

## GitHub Actions

The workflow uses `./terraform.sh`:

- Push to master → Detect changes → Run `./terraform.sh` → Deploy Docker
- First time: Creates bucket, deploys infrastructure
- Ongoing: Deploys infrastructure with remote backend

## Troubleshooting

```bash
# Format files
terraform fmt -recursive

# Auth
gcloud auth application-default login

# Reset backend (in infrastructure/)
terraform init -reconfigure -backend-config="bucket=antonarbus-terraform-state" \
  -backend-config="prefix=terraform/state"

# Import Cloud Run
terraform import google_cloud_run_v2_service.main \
  projects/antonarbus/locations/us-central1/services/cloud-run
```

## Variables

Key variables in `infrastructure/variables.tf`:

- Project: `antonarbus`, Region: `us-central1`
- Service: `cloud-run`, Domain: `antonarbus.com`
- Resources: CPU `1`, Memory `512Mi`, Instances `0-100`

Variables align with `deploy.yml` workflow environment variables.

## Resource Creation Order

```
BOOTSTRAP (one-time):
1. GCS BUCKET          ← Created in bootstrap/ with local state

INFRASTRUCTURE (ongoing):
2. ARTIFACT REGISTRY   ← Uses remote backend
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
