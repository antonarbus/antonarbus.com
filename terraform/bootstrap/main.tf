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
# ENABLE REQUIRED GOOGLE CLOUD APIS
# ==============================================================================
# These APIs must be enabled before creating infrastructure resources
# Note: iam.googleapis.com, cloudresourcemanager.googleapis.com, and
# storage.googleapis.com must be enabled manually first (see README.md)

resource "google_project_service" "required_services" {
  for_each = toset([
    "iamcredentials.googleapis.com",   # Required for Workload Identity (GitHub Actions)
    "artifactregistry.googleapis.com", # Required for Docker image storage
    "run.googleapis.com",              # Required for Cloud Run services
    "logging.googleapis.com",          # Required for Cloud Run logs
    "monitoring.googleapis.com",       # Required for Cloud Run metrics
  ])

  project            = var.project_id
  service            = each.key
  disable_on_destroy = false # Keep APIs enabled even if this resource is destroyed
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

# ==============================================================================
# ARTIFACT REGISTRY (SHARED)
# ==============================================================================
# Single Docker registry shared by all environments
# Images are tagged per environment: web-app:dev, web-app:test, web-app:pilot, web-app:prod
# This enables image promotion without cross-registry copying

resource "google_artifact_registry_repository" "docker_repo" {
  location      = var.region
  repository_id = var.artifact_registry_name
  description   = "Shared Docker repository for antonarbus.com (all environments)"
  format        = "DOCKER"

  # Cleanup policy: automatically delete old, unused images to save storage costs
  cleanup_policies {
    id     = "delete-old-untagged-images"
    action = "DELETE"
    condition {
      tag_state  = "UNTAGGED"
      older_than = "2592000s" # 30 days
    }
  }

  # Keep tagged images longer (they're promoted releases)
  cleanup_policies {
    id     = "keep-tagged-images"
    action = "KEEP"
    condition {
      tag_state = "TAGGED"
    }
  }
}
