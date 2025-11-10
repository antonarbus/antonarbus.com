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
