# ==============================================================================
# BOOTSTRAP: GCS BUCKET FOR TERRAFORM STATE
# ==============================================================================
# This is a one-time setup to create the bucket that stores Terraform state
#
# AUTOMATIC USAGE (via terraform.sh at deploy.yml):
#   cd terraform/
#   ./terraform.sh
#
# MANUAL USAGE:
#   cd bootstrap/
#   terraform init
#   terraform apply -var-file="../../config/prod.tfvars"
#
# After the bucket is created, you never need to run this again unless
# you want to modify the bucket configuration

terraform {
  required_version = ">= 1.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  # No backend configuration - uses local state
  # This is intentional for bootstrap
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# ==============================================================================
# TERRAFORM STATE BUCKET
# ==============================================================================

resource "google_storage_bucket" "terraform_state" {
  name          = var.bucket_for_terraform_state_name
  location      = var.region
  project       = var.project_id
  force_destroy = false

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      num_newer_versions = 10
    }
  }

  labels = {
    purpose     = "terraform-state"
    managed_by  = "terraform"
    environment = "production"
  }
}
