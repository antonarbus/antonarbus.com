# ==============================================================================
# PILOT ENVIRONMENT CONFIGURATION
# ==============================================================================
# This file is the single source of truth for pilot environment variables
# Both Terraform and GitHub Actions read from this configuration
#
# IMPORTANT: This file should be committed to git (no secrets here!)
# ==============================================================================

# PROJECT & REGION

project_id  = "antonarbus"                    # All environments are under one project
region      = "us-central1"
bucket_for_terraform_state_name = "antonarbus-terraform-state"    # Shared Terraform state bucket

# ARTIFACT REGISTRY

artifact_registry_name = "docker-images"

# CLOUD RUN

cloud_run_service_name = "web-app-pilot"
docker_image_name      = "web-app"            # No need to be env specific, tag is responsible for it
docker_image_tag       = "pilot"              # Overridden by CI/CD with actual branch name

# SERVICE ACCOUNTS

github_actions_sa_name = "github-actions-sa"
cloud_run_sa_name      = "cloud-run-sa"

# SCALING & PERFORMANCE

min_instances  = 0          # Pilot can scale to zero when idle
max_instances  = 50         # Higher limit than test, lower than production
cpu_limit      = "1"
memory_limit   = "512Mi"    # Same as production for realistic testing
container_port = 8080

# CUSTOM DOMAIN

custom_domain = "pilot.antonarbus.com"
