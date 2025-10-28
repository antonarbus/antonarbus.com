# ==============================================================================
# TERRAFORM OUTPUTS
# ==============================================================================
# Outputs display important information after Terraform creates resources
# Use: terraform output (to see all outputs)
# Use: terraform output cloud_run_url (to see specific output)
# https://developer.hashicorp.com/terraform/language/values/outputs

output "cloud_run_url" {
  description = "The public URL where your Cloud Run service is accessible"
  value       = google_cloud_run_v2_service.main.uri
  # Example: https://cloud-run-abc123-uc.a.run.app
  # This is the auto-generated URL for your app
  # You can visit this URL immediately after deployment
}

output "artifact_registry_repository" {
  description = "Full resource name of the Artifact Registry repository"
  value       = google_artifact_registry_repository.docker_repo.name
  # Example: projects/antonarbus/locations/us-central1/repositories/artifact-registry
  # This is the unique identifier for your Docker image storage
}

output "github_actions_service_account_email" {
  description = "Email address of the GitHub Actions service account"
  value       = google_service_account.github_actions.email
  # Example: github-actions-sa@antonarbus.iam.gserviceaccount.com
  # Use this email when:
  # 1. Creating service account keys for GitHub Actions
  # 2. Granting additional permissions
  # 3. Troubleshooting deployment issues
}

output "cloud_run_service_account_email" {
  description = "Email address of the Cloud Run service account"
  value       = google_service_account.cloud_run_service.email
  # Example: cloud-run-sa@antonarbus.iam.gserviceaccount.com
  # This is the identity your running application uses
  # Grant this SA permissions to access Google Cloud APIs your app needs
}

output "docker_image_path" {
  description = "Full path for pushing/pulling Docker images"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${var.artifact_registry_name}/${var.docker_image_name}"
  # Example: us-central1-docker.pkg.dev/antonarbus/artifact-registry/docker-image
  # Use this path in:
  # 1. Docker build commands: docker tag myapp:latest THIS_PATH:latest
  # 2. Docker push commands: docker push THIS_PATH:latest
  # 3. GitHub Actions workflows (already configured in your workflow file)
}

output "custom_domain" {
  description = "Custom domain mapped to your Cloud Run service"
  value       = google_cloud_run_domain_mapping.main.name
  # Example: antonarbus.com
  # The DNS records should already be configured from the previous setup
}
