# Terraform Infrastructure

## Quick Start

```bash
cd terraform
bash terraform.sh
```

If you get "409: already exists" errors, just import that resource (see below).

---

## Architecture: Fully Isolated Environments

Each environment (dev, test, pilot, prod) has its own completely isolated resources:

**Per Environment:**
- ✅ Artifact Registry (docker-images-dev, docker-images-prod, etc.)
- ✅ GitHub Actions Service Account (github-actions-sa-dev, github-actions-sa-prod, etc.)
- ✅ Cloud Run Service Account (cloud-run-sa-dev, cloud-run-sa-prod, etc.)
- ✅ Cloud Run Service (web-app-dev, web-app-prod, etc.)
- ✅ Domain Mapping (dev.antonarbus.com, antonarbus.com, etc.)
- ✅ All IAM permissions (scoped to each environment)

**Benefits:**
- 🔒 Complete security isolation
- 🔑 Separate credentials per environment
- 👥 Different teams can own different environments
- 🛡️ Compromised dev doesn't affect prod
- 📋 Compliance-friendly

## Simple Usage

### First Time Setup
```bash
cd terraform
bash terraform.sh
```

That's it. Terraform will create everything for your current environment.

### If You Get "409: Already Exists" Errors

**This means a resource was created manually before Terraform.**

Just import it:

```bash
cd terraform/infrastructure

# Terraform shows: Error: google_service_account.github_actions already exists
# Import it:
terraform import -var-file="../../config/dev.tfvars" \
  google_service_account.github_actions \
  "projects/antonarbus/serviceAccounts/github-actions-sa-dev@antonarbus.iam.gserviceaccount.com"

# Then apply:
terraform apply -var-file="../../config/dev.tfvars"
```

**How to find the import ID?** See examples below.

---

## How to Find Resource IDs for Import

Terraform errors tell you the resource name. Here's how to find the ID:

**Service Account:**
```bash
gcloud iam service-accounts list
# Format: projects/{project}/serviceAccounts/{email}
```

**Artifact Registry:**
```bash
gcloud artifacts repositories list --location=us-central1
# Format: projects/{project}/locations/{region}/repositories/{name}
```

**Cloud Run Service:**
```bash
gcloud run services list --region=us-central1
# Format: projects/{project}/locations/{region}/services/{name}
```

**IAM Binding:**
```bash
# Don't bother importing - just delete and let Terraform recreate them
# They're just permissions, no data loss

# Delete all roles for a service account:
gcloud projects remove-iam-policy-binding antonarbus \
  --member="serviceAccount:github-actions-sa-dev@antonarbus.iam.gserviceaccount.com" \
  --role="roles/run.admin"

# Or delete the entire service account (deletes all its roles):
gcloud iam service-accounts delete github-actions-sa-dev@antonarbus.iam.gserviceaccount.com

# Then let Terraform recreate everything fresh
```

**Domain Mapping:**
```bash
gcloud run domain-mappings list --region=us-central1
# Format: locations/{region}/namespaces/{project}/domainmappings/{domain}
```

---

## That's All

Simple workflow:
1. Run `terraform.sh`
2. If "409: already exists" error → Import that resource
3. Run `terraform.sh` again
4. Done

No complex scripts needed. Terraform tells you exactly what already exists.
