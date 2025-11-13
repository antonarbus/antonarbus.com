# ==============================================================================
# TERRAFORM CONFIGURATION
# ==============================================================================
# This file defines infrastructure for antonarbus.com:
#
# ARCHITECTURE: Fully Isolated Environments
# Each environment (dev/test/pilot/prod) has completely separate resources:
#
# PER ENVIRONMENT:
#   - Artifact Registry (docker-images-{env})
#   - GitHub Actions Service Account (github-actions-sa-{env})
#   - Cloud Run Service Account (cloud-run-sa-{env})
#   - 6 IAM permissions for GitHub Actions SA
#   - Cloud Run Service (web-app-{env})
#   - Public Access IAM binding
#   - Custom Domain Mapping
#
# SHARED ACROSS ENVIRONMENTS:
#   - GCP Project (antonarbus)
#   - GCS Bucket for Terraform state
#   - Region (us-central1)
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
# SERVICE ACCOUNT FOR GITHUB ACTIONS
# ==============================================================================
# Each environment has its own isolated service account for CI/CD
# Examples: github-actions-sa-dev, github-actions-sa-prod
# This ensures dev CI/CD can't accidentally deploy to prod

# Service account resource
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_service_account
resource "google_service_account" "github_actions" {
  account_id   = var.github_actions_sa_name
  display_name = "GitHub Actions Service Account (${var.github_actions_sa_name})"
  description  = "Service account for GitHub Actions to deploy to this environment"
}

# ==============================================================================
# IAM PERMISSIONS (Principle of Least Privilege)
# ==============================================================================
# Following security best practices, we grant only the minimum permissions needed
# for GitHub Actions to deploy the application

# Cloud Run: Full management including domain mappings
# "roles/run.admin" allows: deploy services, manage domain mappings, update traffic
# Required for automated domain mapping creation via Terraform
# Note: This role includes domain mapping permissions which run.developer lacks
resource "google_project_iam_member" "github_actions_cloud_run_admin" {
  project = var.project_id
  role    = "roles/run.admin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# Artifact Registry: Push and read Docker images only
# "roles/artifactregistry.writer" allows: push and pull images
# Does NOT allow: deleting repositories, changing settings
resource "google_project_iam_member" "github_actions_artifact_registry_writer" {
  project = var.project_id
  role    = "roles/artifactregistry.writer"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# Service Account: Act as Cloud Run service account
# "roles/iam.serviceAccountUser" allows: deploy Cloud Run with specific service account
# Required for setting the service account that the deployed container runs as
resource "google_project_iam_member" "github_actions_service_account_user" {
  project = var.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# Storage: Read/write Terraform state files
# "roles/storage.objectUser" allows: read, write, delete objects in buckets
# Does NOT allow: deleting buckets, changing bucket settings
resource "google_project_iam_member" "github_actions_storage_object_user" {
  project = var.project_id
  role    = "roles/storage.objectUser"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# IAM: Read IAM policies (for Terraform state)
# "roles/iam.securityReviewer" allows: reading IAM policies
# Read-only, needed for Terraform to detect changes
resource "google_project_iam_member" "github_actions_iam_security_reviewer" {
  project = var.project_id
  role    = "roles/iam.securityReviewer"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# APIs: Enable required Google Cloud APIs
# "roles/serviceusage.serviceUsageAdmin" allows: enable/disable APIs
# Needed for Terraform to enable required APIs (run.googleapis.com, etc.)
# Note: This is a powerful permission but required for Terraform automation
resource "google_project_iam_member" "github_actions_service_usage_admin" {
  project = var.project_id
  role    = "roles/serviceusage.serviceUsageAdmin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
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
# SERVICE ACCOUNT FOR CLOUD RUN
# ==============================================================================
# Each environment has its own service account for running the app
# Examples: cloud-run-sa-dev, cloud-run-sa-prod
# This provides isolation - dev app runs as different identity than prod

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_service_account
resource "google_service_account" "cloud_run_service" {
  account_id   = var.cloud_run_sa_name
  display_name = "Cloud Run Service Account (${var.cloud_run_sa_name})"
  description  = "Service account used by Cloud Run service in this environment"
}

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
      # Format: REGION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE:TAG
      # GitHub Actions tags images with the branch name
      # This matches the workflow in .github/workflows/deploy.yml
      image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.artifact_registry_name}/${var.docker_image_name}:${var.docker_image_tag}"

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
    service_account = google_service_account.cloud_run_service.email
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
