# ==============================================================================
# TEST ENVIRONMENT CONFIGURATION
# ==============================================================================
# This file is the single source of truth for test environment variables
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

cloud_run_service_name = "web-app-test"
docker_image_name      = "web-app"        # No need to be env specific, tag is responsible for it
docker_image_tag       = "test"           # Overridden by CI/CD with actual branch name

# SERVICE ACCOUNTS

github_actions_sa_name = "github-actions-sa"
cloud_run_sa_name      = "cloud-run-sa"

# SCALING & PERFORMANCE

min_instances  = 0          # Test can scale to zero to save costs
max_instances  = 10         # Lower limit for test
cpu_limit      = "1"
memory_limit   = "512Mi"
container_port = 8080

# CUSTOM DOMAIN

custom_domain = "test.antonarbus.com"
