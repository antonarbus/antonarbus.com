# ==============================================================================
# TERRAFORM BACKEND CONFIGURATION
# ==============================================================================
# This configures where Terraform stores its state file
# Instead of storing locally, we use Google Cloud Storage (GCS) for:
# 1. Team collaboration - everyone sees the same state
# 2. State locking - prevents concurrent modifications
# 3. Security - state not in git, contains sensitive data
# 4. Backup - GCS versioning enabled for disaster recovery

terraform {
  backend "gcs" {
    bucket = "antonarbus-terraform-state" # GCS bucket name
    prefix = "terraform/state"            # Path within bucket

    # State locking is automatic with GCS backend
    # No additional configuration needed
  }
}

# ==============================================================================
# BACKEND BUCKET RESOURCE (Bootstrap only)
# ==============================================================================
# This creates the GCS bucket for storing Terraform state
#
# IMPORTANT: This is a chicken-and-egg situation:
# - You need the bucket to store state
# - But you need Terraform to create the bucket
#
# SOLUTION: Bootstrap process (one-time only):
# 1. Comment out the "backend" block above
# 2. Run terraform init && terraform apply (creates bucket with local state)
# 3. Uncomment the "backend" block
# 4. Run terraform init -migrate-state (moves state to GCS)
# 5. Delete local terraform.tfstate files
#
# After bootstrap, this resource is managed like any other

resource "google_storage_bucket" "terraform_state" {
  name     = "antonarbus-terraform-state"
  location = var.region
  project  = var.project_id

  # Force destroy allows bucket deletion even if it contains files
  # Set to false in production to prevent accidental state deletion
  force_destroy = false

  # Uniform bucket-level access (recommended)
  uniform_bucket_level_access = true

  # Enable versioning for state file backup/recovery
  versioning {
    enabled = true
  }

  # Lifecycle rules to manage old versions
  lifecycle_rule {
    # Keep last 10 versions of state file
    action {
      type = "Delete"
    }
    condition {
      num_newer_versions = 10
    }
  }

  # Encryption at rest uses Google-managed keys by default
  # No explicit configuration needed

  # Labels for organization
  labels = {
    purpose     = "terraform-state"
    managed_by  = "terraform"
    environment = "production"
  }
}

# Grant the GitHub Actions service account access to the state bucket
resource "google_storage_bucket_iam_member" "terraform_state_admin" {
  bucket = google_storage_bucket.terraform_state.name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.github_actions.email}"
}
