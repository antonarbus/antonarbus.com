# ==============================================================================
# BOOTSTRAP VARIABLES
# ==============================================================================

variable "project_id" {
  description = "The GCP project ID"
  type        = string
  default     = "antonarbus"
}

variable "region" {
  description = "The GCP region"
  type        = string
  default     = "us-central1"
}

variable "bucket_name" {
  description = "Name of the GCS bucket for Terraform state"
  type        = string
  default     = "antonarbus-terraform-state"
}
