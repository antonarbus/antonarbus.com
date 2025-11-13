# ==============================================================================
# PROD ENVIRONMENT CONFIGURATION
# ==============================================================================
# This file is the single source of truth for prod environment variables
# Both Terraform and GitHub Actions read from this configuration
#
# IMPORTANT: This file should be committed to git (no secrets here!)
# ==============================================================================

# PROJECT & REGION

project_id                      = "antonarbus"                    # All environments are under one project
project_number                  = "850593405209"                  # Shared: GCP project number (find with: gcloud projects describe antonarbus)
region                          = "us-central1"
bucket_for_terraform_state_name = "antonarbus-terraform-state"    # Shared Terraform state bucket

# ARTIFACT REGISTRY

artifact_registry_name = "docker-images-prod"  # Environment-specific (has images)

# CLOUD RUN

cloud_run_service_name = "web-app-prod"
docker_image_name      = "web-app"
docker_image_tag       = "master"

# SERVICE ACCOUNTS (SHARED across all environments)

github_actions_sa_name = "github-actions-sa"  # Shared
cloud_run_sa_name      = "cloud-run-sa"       # Shared

# SCALING & PERFORMANCE

min_instances  = 0
max_instances  = 100
cpu_limit      = "1"
memory_limit   = "512Mi"
container_port = 8080

# CUSTOM DOMAIN

custom_domain = "antonarbus.com"
