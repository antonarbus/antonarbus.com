# ==============================================================================
# BOOTSTRAP OUTPUTS
# ==============================================================================
#
# Outputs display important information after Terraform creates resources
# Not consumed by other code now, but good to keep for documentation & discoverability
#
# See all outputs
#
# ```
#   cd terraform/bootstrap
#   terraform output
# ```

output "bucket_for_terraform_state_name_output" {
  description = "Name of the created Terraform state bucket"
  value       = google_storage_bucket.terraform_state.name
}

output "bucket_for_terraform_state_url_output" {
  description = "URL of the Terraform state bucket"
  value       = google_storage_bucket.terraform_state.url
}
