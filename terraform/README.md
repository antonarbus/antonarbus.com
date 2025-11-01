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

```bash
terraform init          # Initialize
terraform plan          # Preview changes
terraform apply         # Apply changes
terraform output        # View outputs
terraform fmt -recursive # Format files
```

## First-Time Setup

Terraform needs a GCS bucket for state, but we use Terraform to create that bucket. Solution: bootstrap in two phases.

### Phase 1: Create State Bucket

1. Comment out `backend` block in `backend.tf`:
   ```hcl
   # terraform {
   #   backend "gcs" {
   #     bucket = "antonarbus-terraform-state"
   #     prefix = "terraform/state"
   #   }
   # }
   ```

2. Initialize and apply:
   ```bash
   cd terraform
   terraform init
   terraform apply
   ```

### Phase 2: Migrate to Remote State

1. Uncomment `backend` block in `backend.tf`

2. Migrate state:
   ```bash
   terraform init -migrate-state
   ```

3. Clean up:
   ```bash
   rm -f terraform.tfstate*
   find .. -maxdepth 2 -name "*.tfstate*" -type f -delete
   terraform fmt -recursive
   terraform plan  # Should show "No changes"
   ```

## GitHub Actions Setup

1. Create service account key:
   ```bash
   gcloud iam service-accounts keys create ~/github-key.json \
     --iam-account=github-actions-sa@antonarbus.iam.gserviceaccount.com
   ```

2. Add to GitHub:
   - Settings → Secrets and variables → Actions
   - New repository secret
   - Name: `GCP_SA_KEY`
   - Value: (contents of `github-key.json`)

3. Delete local key:
   ```bash
   rm ~/github-key.json
   ```

## CI/CD Workflow

Every push to master triggers:

1. **Detect changes** - Check which files changed
2. **Run Terraform** - If `terraform/` or `deploy.yml` changed
3. **Deploy Docker** - If app code or Terraform changed
4. **Sequential** - Terraform completes before Docker

Examples:
- App code only → Deploy Docker (~3 min)
- Terraform only → Terraform + Docker (~5 min)
- Both → Terraform + Docker (~5 min)

## Custom Domain

After Terraform applies:

1. Cloud Run Console → service → "Manage Custom Domains"
2. Copy DNS records
3. Add to domain registrar
4. Wait 24-48 hours for DNS propagation

## Troubleshooting

**Terraform files not formatted:**
```bash
terraform fmt -recursive
```

**Backend initialization error:**
Comment out backend block in `backend.tf` and continue setup.

**Bucket already exists:**
```bash
terraform import google_storage_bucket.terraform_state antonarbus-terraform-state
```

**Permission denied:**
```bash
gcloud auth application-default login
```

**Resource already exists:**
```bash
# Cloud Run
terraform import google_cloud_run_v2_service.main \
  projects/antonarbus/locations/us-central1/services/cloud-run

# Artifact Registry
terraform import google_artifact_registry_repository.docker_repo \
  projects/antonarbus/locations/us-central1/repositories/artifact-registry

# Service Accounts
terraform import google_service_account.github_actions \
  projects/antonarbus/serviceAccounts/github-actions-sa@antonarbus.iam.gserviceaccount.com
terraform import google_service_account.cloud_run_service \
  projects/antonarbus/serviceAccounts/cloud-run-sa@antonarbus.iam.gserviceaccount.com
```

## File Structure

```
terraform/
├── main.tf         # Resources
├── variables.tf    # Configuration
├── outputs.tf      # Output values
├── backend.tf      # State backend
└── README.md       # This file
```

## Variables

Key variables in `variables.tf`:

- `project_id` = "antonarbus"
- `region` = "us-central1"
- `cloud_run_service_name` = "cloud-run"
- `artifact_registry_name` = "artifact-registry"
- `docker_image_name` = "docker-image"
- `custom_domain` = "antonarbus.com"
- `min_instances` = 0 (scales to zero)
- `max_instances` = 100
- `cpu_limit` = "1"
- `memory_limit` = "512Mi"
- `container_port` = 8080

Edit `variables.tf` to change values.

## Alignment with deploy.yml

Workflow environment variables match Terraform:
- `PROJECT_ID` → `project_id`
- `REGION` → `region`
- `ARTIFACTS_REGISTRY_NAME` → `artifact_registry_name`
- `DOCKER_IMAGE_NAME` → `docker_image_name`
- `SERVICE_NAME` → `cloud_run_service_name`

## Learn More

- [Terraform Google Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [Cloud Run Docs](https://cloud.google.com/run/docs)
- [GCS Backend](https://www.terraform.io/language/settings/backends/gcs)
