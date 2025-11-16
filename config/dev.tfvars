# ==============================================================================
# DEV ENVIRONMENT CONFIGURATION
# ==============================================================================
# This file is the single source of truth for dev environment variables
# Both Terraform and GitHub Actions read from this configuration
#
# IMPORTANT: This file should be committed to git (no secrets here!)
# ==============================================================================

# PROJECT & REGION

project_id     = "antonarbus"                 # Shared: All environments in one GCP project
project_number = "850593405209"               # Shared: GCP project number (find with: gcloud projects describe antonarbus)
region         = "us-central1"                # Shared: Same region for all environments
bucket_for_terraform_state_name = "antonarbus-terraform-state"    # Shared: Terraform state bucket

# ARTIFACT REGISTRY (SHARED across all environments)

artifact_registry_name = "docker-images"      # Shared: Single registry for all environments
docker_image_name      = "web-app"            # Shared: Same image name, different tags

# CLOUD RUN (environment-specific)

cloud_run_service_name = "web-app-dev"

# SERVICE ACCOUNTS (SHARED across all environments)

github_actions_sa_name = "github-actions-sa"  # Shared
cloud_run_sa_name      = "cloud-run-sa"       # Shared

# SCALING & PERFORMANCE

min_instances  = 0          # Dev can scale to zero to save costs
max_instances  = 5          # Lower limit for dev
cpu_limit      = "1"
memory_limit   = "512Mi"    # Minimum required for Cloud Run with always-allocated CPU
container_port = 8080

# CUSTOM DOMAIN

custom_domain = "dev.antonarbus.com"
