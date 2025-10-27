# ==============================================================================
# TERRAFORM CONFIGURATION
# ==============================================================================
# This file defines all the Google Cloud infrastructure for antonarbus.com
# It creates these resources:
#
# 1. ✅ Artifact Registry - Docker image storage
# 2. ✅ GitHub Actions Service Account - For CI/CD deployments
# 3. ✅ Cloud Run Service Account - For the running app
# 4. ✅ 5 IAM Permissions - Permissions for GitHub Actions SA
# 5. ✅ Cloud Run Service - Your app (named cloud-run)
# 6. ✅ Public Access - Makes your site publicly accessible
# 7. ✅ Domain Mapping - Maps antonarbus.com to the service
# 8. ✅ GCS Bucket - For Terraform remote state storage (in backend.tf)
#
# Backend configuration is in backend.tf
# For first-time setup, see BOOTSTRAP.md

terraform {
  # Require Terraform version 1.0 or higher
  required_version = ">= 1.0"

  # Specify which providers (cloud platforms) we're using
  required_providers {
    google = {
      source  = "hashicorp/google" # Official Google Cloud provider
      version = "~> 5.0"           # Use version 5.x (any minor/patch version)
    }
  }
}

# Configure the Google Cloud provider with our project and region
provider "google" {
  project = var.project_id # Which GCP project to use (from variables.tf)
  region  = var.region     # Default region for resources (from variables.tf)
}

# ==============================================================================
# ARTIFACT REGISTRY
# ==============================================================================
# This is where Docker images are stored before being deployed to Cloud Run
# Think of it as a private Docker Hub for your project

resource "google_artifact_registry_repository" "docker_repo" {
  location      = var.region                 # Where to store images (us-central1)
  repository_id = var.artifact_registry_name # Name: "artifact-registry"
  description   = "Docker repository for antonarbus.com"
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
# This service account is used by GitHub Actions to:
# 1. Push Docker images to Artifact Registry
# 2. Deploy to Cloud Run
# Think of it as a "robot user" that GitHub uses to interact with Google Cloud

resource "google_service_account" "github_actions" {
  account_id   = var.github_actions_sa_name # Name: "github-actions-sa"
  display_name = "GitHub Actions Service Account"
  description  = "Service account for GitHub Actions to deploy to Cloud Run"
}

# Give GitHub Actions permission to manage Cloud Run services
# "roles/run.admin" allows: create, update, delete Cloud Run services
resource "google_project_iam_member" "github_actions_cloud_run_admin" {
  project = var.project_id
  role    = "roles/run.admin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# Give GitHub Actions permission to push/pull Docker images
# "roles/artifactregistry.admin" allows: push, pull, delete Docker images
resource "google_project_iam_member" "github_actions_artifact_registry_admin" {
  project = var.project_id
  role    = "roles/artifactregistry.admin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# Give GitHub Actions permission to act as other service accounts
# "roles/iam.serviceAccountUser" is needed to deploy Cloud Run with a specific service account
resource "google_project_iam_member" "github_actions_service_account_user" {
  project = var.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# Give GitHub Actions permission to manage storage buckets
# "roles/storage.admin" allows: read bucket metadata, manage objects, needed for Terraform state
resource "google_project_iam_member" "github_actions_storage_admin" {
  project = var.project_id
  role    = "roles/storage.admin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# Give GitHub Actions permission to view IAM policies
# "roles/iam.securityReviewer" allows: reading IAM policies, needed for Terraform state operations
resource "google_project_iam_member" "github_actions_iam_viewer" {
  project = var.project_id
  role    = "roles/iam.securityReviewer"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# ==============================================================================
# SERVICE ACCOUNT FOR CLOUD RUN
# ==============================================================================
# This service account is used BY the Cloud Run container when it's running
# It determines what Google Cloud APIs the running app can access
# Best practice: use a custom SA instead of the default compute SA

resource "google_service_account" "cloud_run_service" {
  account_id   = var.cloud_run_sa_name # Name: "cloud-run-sa"
  display_name = "Cloud Run Service Account"
  description  = "Service account used by the Cloud Run service"
}

# ==============================================================================
# CLOUD RUN SERVICE
# ==============================================================================
# This is the main application - a containerized web app that runs your site
# Cloud Run automatically scales up/down based on traffic (even to zero!)

resource "google_cloud_run_v2_service" "main" {
  name     = var.cloud_run_service_name # Name: "cloud-run"
  location = var.region                 # Where to run: us-central1
  ingress  = "INGRESS_TRAFFIC_ALL"      # Accept traffic from internet

  # Configuration for how the container runs
  template {
    # Scaling settings: how many instances (copies) of your app can run
    scaling {
      min_instance_count = var.min_instances # Minimum: 0 (scales to zero when idle = no cost!)
      max_instance_count = var.max_instances # Maximum: 100 (prevents runaway costs)
    }

    # Container configuration: what Docker image to run and how
    containers {
      # The Docker image to run
      # Format: REGION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE:TAG
      # GitHub Actions tags images with the branch name (master)
      # This matches the workflow in .github/workflows/google-cloudrun-docker.yml
      image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.artifact_registry_name}/${var.docker_image_name}:master"

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
