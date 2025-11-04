# ==============================================================================
# TERRAFORM VARIABLES
# ==============================================================================
# Variables allow you to configure values without editing the main Terraform code
# You can override these defaults by:
# 1. Creating a terraform.tfvars file (not in git - for secrets/personal values)
# 2. Using -var flag: terraform apply -var="min_instances=1"
# 3. Setting environment variables: TF_VAR_min_instances=1
# https://developer.hashicorp.com/terraform/language/values/variables

# ⚠️ IMPORTANT: The default values below MUST stay in sync with .github/workflows/deploy.yml
# If you change these defaults, also update the GitHub Actions workflow environment variables

# ==============================================================================
# PROJECT & REGION
# ==============================================================================

variable "project_id" {
  description = "The GCP project ID where all resources will be created"
  type        = string
  default     = "antonarbus"
  # This is your Google Cloud project name
  # Find it in: https://console.cloud.google.com/ (top dropdown)
}

variable "region" {
  description = "The GCP region where resources will be deployed"
  type        = string
  default     = "us-central1"
  # Regions are physical locations of data centers
  # us-central1 = Iowa, USA (good for North America)
  # Other options: europe-west1 (Belgium), asia-northeast1 (Tokyo)
  # List: https://cloud.google.com/about/locations
}

# ==============================================================================
# ARTIFACT REGISTRY
# ==============================================================================

variable "artifact_registry_name" {
  description = "Name of the Artifact Registry repository for Docker images"
  type        = string
  default     = "artifact-registry"
  # This is where your Docker images are stored
  # Must be lowercase, hyphens allowed, no underscores
}

# ==============================================================================
# CLOUD RUN
# ==============================================================================

variable "cloud_run_service_name" {
  description = "Name of the Cloud Run service"
  type        = string
  default     = "cloud-run"
  # This is the name of your running application
  # Will appear in Google Cloud Console and URLs
}

variable "docker_image_name" {
  description = "Name of the Docker image in Artifact Registry"
  type        = string
  default     = "docker-image"
  # The name for your Docker image
  # Full path will be: REGION-docker.pkg.dev/PROJECT/REGISTRY/IMAGE:TAG
}

# ==============================================================================
# SERVICE ACCOUNTS
# ==============================================================================
# Service accounts are like "robot users" that services use to authenticate

variable "github_actions_sa_name" {
  description = "Name of the service account used by GitHub Actions for deployments"
  type        = string
  default     = "github-actions-sa"
  # This service account is used by your CI/CD pipeline (GitHub Actions)
  # It needs permissions to push Docker images and deploy to Cloud Run
}

variable "cloud_run_sa_name" {
  description = "Name of the service account used by the Cloud Run service"
  type        = string
  default     = "cloud-run-sa"
  # This service account is used BY your running app
  # It determines what Google Cloud APIs your app can access
  # Best practice: give it only the permissions your app needs
}

# ==============================================================================
# SCALING & PERFORMANCE
# ==============================================================================

variable "min_instances" {
  description = "Minimum number of Cloud Run instances to keep running"
  type        = number
  default     = 0
  # 0 = Scale to zero when idle (saves money, but first request is slower)
  # 1+ = Keep instances warm (faster response, but costs money even when idle)
  # For production with traffic: consider 1-2 min instances
}

variable "max_instances" {
  description = "Maximum number of Cloud Run instances allowed"
  type        = number
  default     = 100
  # Prevents runaway costs if you get sudden traffic spike
  # Each instance handles ~80 concurrent requests by default
  # Adjust based on expected traffic
}

variable "cpu_limit" {
  description = "CPU limit for each Cloud Run container"
  type        = string
  default     = "1"
  # Options: "1" (1 CPU), "2" (2 CPUs), "4" (4 CPUs), "8" (8 CPUs)
  # More CPU = faster processing but higher cost
  # 1 CPU is good for most web apps
  # Pricing: https://cloud.google.com/run/pricing
}

variable "memory_limit" {
  description = "Memory limit for each Cloud Run container"
  type        = string
  default     = "512Mi"
  # Options: 128Mi, 256Mi, 512Mi, 1Gi, 2Gi, 4Gi, 8Gi, 16Gi, 32Gi
  # Mi = Mebibytes, Gi = Gibibytes
  # More memory = can handle larger requests but higher cost
  # 512Mi is good for small/medium apps
  # Monitor actual usage in Cloud Console to optimize
}

variable "container_port" {
  description = "Port that the container listens on for HTTP requests"
  type        = number
  default     = 8080
  # Your application must listen on this port
  # Cloud Run forwards HTTP/HTTPS traffic to this port
  # Common values: 8080, 3000, 8000
  # Must match the port your app uses (check your Dockerfile)
}

# ==============================================================================
# CUSTOM DOMAIN
# ==============================================================================

variable "custom_domain" {
  description = "Custom domain name to map to the Cloud Run service"
  type        = string
  default     = "antonarbus.com"
  # Your domain name (without www or https://)
  # After Terraform creates the mapping, you need to:
  # 1. Go to Cloud Run > Manage custom domains in Google Cloud Console
  # 2. Copy the DNS records shown
  # 3. Add them to your domain registrar (GoDaddy, Namecheap, etc.)
}
