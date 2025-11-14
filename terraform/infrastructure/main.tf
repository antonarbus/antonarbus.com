# ==============================================================================
# TERRAFORM CONFIGURATION
# ==============================================================================
# This file defines infrastructure for antonarbus.com:
#
# ARCHITECTURE: Hybrid - Shared + Isolated Resources
#
# SHARED ACROSS ALL ENVIRONMENTS:
#   - GCP Project (antonarbus)
#   - GCS Bucket for Terraform state
#   - Region (us-central1)
#   - GitHub Actions Service Account (github-actions-sa) - shared CI/CD
#   - Cloud Run Service Account (cloud-run-sa) - shared runtime identity
#   - 6 IAM permissions for GitHub Actions SA
#
# PER ENVIRONMENT (dev/test/pilot/prod):
#   - Artifact Registry (docker-images-{env}) - isolated image storage
#   - Cloud Run Service (web-app-{env}) - isolated app instances
#   - Public Access IAM binding
#   - Custom Domain Mapping
#
# For first-time setup, see README.md

# https://developer.hashicorp.com/terraform/language/terraform
terraform {
  required_version = ">= 1.0"

  # https://developer.hashicorp.com/terraform/language/providers/requirements
  required_providers {
    google = {
      source  = "hashicorp/google" # Official Google Cloud provider
      version = "~> 5.0"           # Use version 5.x (any minor/patch version)
    }
  }
}

# ==============================================================================
# CHOOSE GOOGLE PROVIDER
# ==============================================================================

# Configure the Google Cloud provider with our project and region
# https://registry.terraform.io/providers/hashicorp/google/latest/docs
provider "google" {
  project = var.project_id # Which GCP project to use (from variables.tf)
  region  = var.region     # Default region for resources (from variables.tf)
}

# ==============================================================================
# NOTE: GCS BUCKET FOR TERRAFORM STATE
# ==============================================================================
# The Terraform state bucket is created separately in the bootstrap/ directory
# This infrastructure assumes the bucket already exists

# ==============================================================================
# ARTIFACT REGISTRY
# ==============================================================================
# Each environment has its own isolated Docker registry
# Examples: docker-images-dev, docker-images-test, docker-images-pilot, docker-images-prod

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/artifact_registry_repository
resource "google_artifact_registry_repository" "docker_repo" {
  location      = var.region                 # Where to store images "us-central1"
  repository_id = var.artifact_registry_name # Name: "docker-images-{env}"
  description   = "Docker repository for antonarbus.com (${var.artifact_registry_name})"
  format        = "DOCKER" # This repo stores Docker images

  # Cleanup policy: automatically delete old, unused images to save storage costs
  cleanup_policies {
    id     = "delete-old-images"
    action = "DELETE"
    condition {
      tag_state  = "UNTAGGED" # Only delete images without tags
      older_than = "2592000s" # Delete if older than 30 days (in seconds)
    }
  }
}

# ==============================================================================
# REFERENCE SHARED SERVICE ACCOUNTS
# ==============================================================================
# Service accounts are created in bootstrap/ and shared across all environments
# We reference them here using data sources instead of creating them
#
# WHY DATA SOURCES?
# - Service accounts are singleton resources (one per project)
# - Created once in bootstrap/, referenced by all environment workspaces
# - Prevents conflicts when multiple workspaces try to create the same SA
# ==============================================================================

# Reference the GitHub Actions service account created in bootstrap
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/service_account
data "google_service_account" "github_actions" {
  account_id = var.github_actions_sa_name
}

# Reference the Cloud Run service account created in bootstrap
data "google_service_account" "cloud_run_service" {
  account_id = var.cloud_run_sa_name
}

# ==============================================================================
# DOMAIN VERIFICATION FOR SERVICE ACCOUNT
# ==============================================================================
# IMPORTANT: One-time manual setup required!
#
# Before domain mappings can be created automatically, the GitHub Actions
# service account must be added as a verified owner of antonarbus.com.
#
# This is a ONE-TIME setup that enables all environments (dev, test, pilot, prod).
#
# Setup instructions: See terraform/bootstrap/DOMAIN_VERIFICATION_SETUP.md
#
# Quick steps:
#   1. Go to https://search.google.com/search-console
#   2. Select antonarbus.com property
#   3. Settings → Users and permissions → Add user
#   4. Add: github-actions-sa@antonarbus.iam.gserviceaccount.com
#   5. Grant Owner permission
#
# After this setup, all automated domain mappings will work.
# ==============================================================================

# ==============================================================================
# CLOUD RUN SERVICE
# ==============================================================================
# This is the main application - a containerized web app that runs your site
# Cloud Run automatically scales up/down based on traffic (even to zero!)

# Cloud Run service (v2 API)
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service
resource "google_cloud_run_v2_service" "main" {
  name     = var.cloud_run_service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL" # Accept traffic from internet

  # Configuration for how the container runs
  template {
    # Labels for the template (managed by Terraform)
    labels = {
      managed-by  = "terraform"
      environment = "production"
    }

    # Scaling settings: how many instances (copies) of your app can run
    scaling {
      min_instance_count = var.min_instances # Minimum: 0 (scales to zero when idle = no cost!)
      max_instance_count = var.max_instances # Maximum: 100 (prevents runaway costs)
    }

    # Container configuration: what Docker image to run and how
    containers {
      # The Docker image to run
      # Note: We use a public hello-world image for initial creation
      # The real app image is deployed by GitHub Actions after Terraform creates the service
      # lifecycle.ignore_changes prevents Terraform from reverting to this placeholder
      image = "us-docker.pkg.dev/cloudrun/container/hello"

      # Resource limits: how much CPU and memory the container can use
      resources {
        limits = {
          cpu    = var.cpu_limit    # CPU: "1" = 1 full CPU core
          memory = var.memory_limit # Memory: "512Mi" = 512 megabytes of RAM
        }
      }

      # Network port configuration
      ports {
        container_port = var.container_port # Port 8080: where your app listens for HTTP requests
      }

      # Startup probe: Checks if the container is ready to receive traffic
      # This runs when the container first starts up
      # Cloud Run waits for this to succeed before routing traffic
      startup_probe {
        http_get {
          path = "/"                # HTTP GET request to root path
          port = var.container_port # Port 8080
        }
        initial_delay_seconds = 10 # Wait 10 seconds before first check (Next.js startup time)
        timeout_seconds       = 3  # Each check times out after 3 seconds
        period_seconds        = 5  # Check every 5 seconds
        failure_threshold     = 3  # Fail after 3 consecutive failures
      }

      # Liveness probe: Checks if the container is still healthy
      # If this fails, Cloud Run restarts the container
      # This helps recover from deadlocks or hung processes
      liveness_probe {
        http_get {
          path = "/"                # HTTP GET request to root path
          port = var.container_port # Port 8080
        }
        initial_delay_seconds = 30 # Wait 30 seconds after startup before checking
        timeout_seconds       = 1  # Each check times out after 1 second
        period_seconds        = 10 # Check every 10 seconds
        failure_threshold     = 3  # Restart after 3 consecutive failures
      }
    }

    # Which service account the running container uses
    # This determines what Google Cloud APIs your app can access
    service_account = data.google_service_account.cloud_run_service.email
  }

  # Traffic routing: send 100% of traffic to the latest deployed version
  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST" # Always use latest revision
    percent = 100                                     # Send all traffic to it
  }

  # Ignore fields set by gcloud CLI during deployments
  # This prevents Terraform from trying to remove metadata added by GitHub Actions
  lifecycle {
    ignore_changes = [
      client,                          # Set by gcloud CLI
      client_version,                  # Set by gcloud CLI
      template[0].containers[0].image, # Image is managed by GitHub Actions workflow
    ]
  }

  # Don't try to create Cloud Run until Artifact Registry exists
  # This ensures resources are created in the correct order
  depends_on = [
    google_artifact_registry_repository.docker_repo
  ]
}

# ==============================================================================
# PUBLIC ACCESS CONFIGURATION
# ==============================================================================
# By default, Cloud Run requires authentication
# This grants public access so anyone can visit your website

# Cloud Run IAM member binding for public access
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service_iam
resource "google_cloud_run_v2_service_iam_member" "public_access" {
  name     = google_cloud_run_v2_service.main.name
  location = google_cloud_run_v2_service.main.location
  role     = "roles/run.invoker" # Permission to invoke (call/access) the service
  member   = "allUsers"          # Give this permission to everyone on the internet
}

# ==============================================================================
# CUSTOM DOMAIN MAPPING
# ==============================================================================
# Maps your custom domain (antonarbus.com) to the Cloud Run service
# This will import and update the existing domain mapping to point to cloud-run

# Cloud Run domain mapping (v1 API)
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_domain_mapping
resource "google_cloud_run_domain_mapping" "main" {
  name     = var.custom_domain # Domain: "antonarbus.com"
  location = var.region        # Same region as Cloud Run service

  # Project namespace
  metadata {
    namespace = var.project_id
  }

  # Which Cloud Run service this domain points to
  spec {
    route_name = google_cloud_run_v2_service.main.name
  }
}
