# Terraform Configuration for Google Cloud Run

This directory contains Terraform configuration to automate the setup of Google Cloud infrastructure for antonarbus.com.

## What This Terraform Configuration Creates

1. **Artifact Registry Repository** - Docker repository for storing container images
2. **Cloud Run Service** - Serverless container service with:
   - Minimum 0 instances (scales to zero)
   - Unauthenticated access allowed
   - Configurable CPU and memory limits
3. **IAM Service Accounts** - Two service accounts:
   - `github-actions-sa` - For GitHub Actions to deploy
   - `cloud-run-sa` - For the Cloud Run service itself
4. **IAM Roles** - Proper permissions for GitHub Actions to deploy

## Prerequisites

1. **Install Terraform** (version >= 1.0)
   ```bash
   # macOS
   brew install terraform

   # Or download from: https://www.terraform.io/downloads
   ```

2. **Install Google Cloud SDK**
   ```bash
   # macOS
   brew install google-cloud-sdk
   ```

3. **Authenticate with Google Cloud**
   ```bash
   gcloud auth application-default login
   gcloud config set project antonarbus
   ```

4. **Enable Required APIs**
   ```bash
   gcloud services enable run.googleapis.com
   gcloud services enable artifactregistry.googleapis.com
   gcloud services enable iam.googleapis.com
   ```

## Initial Setup

1. **Copy the example variables file**
   ```bash
   cd terraform
   cp terraform.tfvars.example terraform.tfvars
   ```

2. **Edit `terraform.tfvars`** (optional - defaults should work)
   Customize any values if needed. The defaults match your current setup.

3. **Initialize Terraform**
   ```bash
   terraform init
   ```

## Usage

### Plan (Preview Changes)
See what Terraform will create/modify without actually making changes:
```bash
terraform plan
```

### Apply (Create/Update Infrastructure)
Apply the configuration to create/update resources:
```bash
terraform apply
```

Type `yes` when prompted to confirm.

### Show Outputs
After applying, view important output values:
```bash
terraform output
```

This will show:
- Cloud Run service URL
- Service account emails
- Artifact Registry path
- Docker image path

### Destroy (Delete All Resources)
To remove all Terraform-managed resources:
```bash
terraform destroy
```

**WARNING**: This will delete your Cloud Run service, Artifact Registry, and service accounts!

## Important Notes

### First-Time Deployment

When running Terraform for the first time, the Cloud Run service will try to deploy with a placeholder image. You have two options:

**Option 1: Import existing resources**
If you already have these resources created manually:
```bash
# Import existing Artifact Registry
terraform import google_artifact_registry_repository.docker_repo projects/antonarbus/locations/us-central1/repositories/artifact-registry

# Import existing Cloud Run service
terraform import google_cloud_run_v2_service.main projects/antonarbus/locations/us-central1/services/cloud-run

# Import existing service accounts
terraform import google_service_account.github_actions projects/antonarbus/serviceAccounts/github-actions-sa@antonarbus.iam.gserviceaccount.com
terraform import google_service_account.cloud_run_service projects/antonarbus/serviceAccounts/cloud-run-sa@antonarbus.iam.gserviceaccount.com
```

**Option 2: Fresh start**
If starting fresh, you may need to push an initial image to Artifact Registry before the Cloud Run service can fully deploy.

### GitHub Actions Integration

After applying Terraform:

1. **Create a service account key** (one-time only):
   ```bash
   gcloud iam service-accounts keys create ~/github-actions-key.json \
     --iam-account=github-actions-sa@antonarbus.iam.gserviceaccount.com
   ```

2. **Add the key to GitHub Secrets**:
   - Copy the contents of `~/github-actions-key.json`
   - Go to GitHub repo → Settings → Secrets and variables → Actions
   - Create secret named `GCP_SA_KEY` with the JSON content
   - Delete the local key file: `rm ~/github-actions-key.json`

3. Your existing GitHub Actions workflow will continue to work as-is!

### Custom Domain

The custom domain mapping is commented out in `main.tf`. To enable:

1. Uncomment the `google_cloud_run_domain_mapping` resource in `main.tf`
2. Uncomment the `custom_domain` variable in `variables.tf`
3. Set your domain in `terraform.tfvars`
4. Run `terraform apply`
5. Configure DNS records as shown in Google Cloud Console

## Terraform State

Terraform keeps track of your infrastructure in a state file (`terraform.tfstate`). This file:
- Is stored locally by default
- Contains sensitive information
- Should **NOT** be committed to git (already in `.gitignore`)

For production use, consider storing state remotely:
- Google Cloud Storage
- Terraform Cloud
- Other remote backends

Example GCS backend configuration:
```hcl
terraform {
  backend "gcs" {
    bucket = "antonarbus-terraform-state"
    prefix = "prod"
  }
}
```

## Benefits Over Manual Configuration

1. **Reproducibility** - Can recreate entire infrastructure with one command
2. **Version Control** - Infrastructure changes are tracked in git
3. **Documentation** - The code documents your infrastructure
4. **Safety** - Preview changes with `terraform plan` before applying
5. **Automation** - Can be integrated into CI/CD pipelines
6. **Drift Detection** - Terraform can detect manual changes

## Programmatic Enhancements

Terraform supports programmatic patterns:

### Using Locals for Computed Values
```hcl
locals {
  common_labels = {
    environment = "production"
    managed_by  = "terraform"
    project     = "antonarbus"
  }
}
```

### Using Loops
```hcl
variable "iam_roles" {
  default = [
    "roles/run.admin",
    "roles/artifactregistry.admin"
  ]
}

resource "google_project_iam_member" "github_actions" {
  for_each = toset(var.iam_roles)
  project  = var.project_id
  role     = each.value
  member   = "serviceAccount:${google_service_account.github_actions.email}"
}
```

### Using Conditionals
```hcl
resource "google_cloud_run_domain_mapping" "main" {
  count = var.enable_custom_domain ? 1 : 0
  # ...
}
```

## Additional Resources

- [Terraform Google Provider Docs](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [Terraform Language Documentation](https://www.terraform.io/language)
- [Google Cloud Run Terraform Resource](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service)

## Troubleshooting

### "Resource already exists" error
If you get errors about existing resources, use `terraform import` (see First-Time Deployment section above).

### Permission denied errors
Ensure your gcloud account has Owner or Editor role:
```bash
gcloud projects get-iam-policy antonarbus
```

### API not enabled
Enable required APIs:
```bash
gcloud services enable run.googleapis.com artifactregistry.googleapis.com iam.googleapis.com
```
