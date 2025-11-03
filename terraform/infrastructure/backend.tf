# GCS backend for storing Terraform state remotely
# https://developer.hashicorp.com/terraform/language/backend/gcs
#
# NOTE: The bucket must be created first using bootstrap/ directory
# Backend configuration is provided via command line flags
terraform {
  backend "gcs" {}
}
