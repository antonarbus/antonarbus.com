# ==============================================================================
# BOOTSTRAP VARIABLES
# ==============================================================================
#
# Actual values are taken config/*.tfvars files (single source of truth) and added with 'var-file' with command
# `terraform apply -auto-approve -var-file="$CONFIG_PATH"` at `terraform.sh` script

# ==============================================================================
# PROJECT & REGION
# ==============================================================================

variable "project_id" {
  description = "The GCP project ID"
  type        = string
  # Value provided by config/*.tfvars file
}

variable "region" {
  description = "The GCP region"
  type        = string
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# BUCKET
# ==============================================================================

variable "bucket_for_terraform_state_name" {
  description = "Name of the GCS bucket for Terraform state"
  type        = string
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# SERVICE ACCOUNTS
# ==============================================================================

variable "github_actions_sa_name" {
  description = "Name of the service account used by GitHub Actions for deployments"
  type        = string
  # Value provided by config/*.tfvars file
}

variable "cloud_run_sa_name" {
  description = "Name of the service account used by the Cloud Run service"
  type        = string
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# ARTIFACT REGISTRY (SHARED)
# ==============================================================================

variable "artifact_registry_name" {
  description = "Name of the shared Artifact Registry repository for Docker images"
  type        = string
  # Single registry for all environments (dev, test, pilot, prod)
  # Images differentiated by tags: web-app:dev, web-app:test, etc.
  # Value provided by config/*.tfvars file
}
