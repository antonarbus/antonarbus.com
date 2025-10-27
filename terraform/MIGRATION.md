# Migration Guide: Upgrading Existing Terraform Setup

This guide is for **existing installations** that need to migrate from local state to remote state backend.

**If you're setting up from scratch**, use [BOOTSTRAP.md](./BOOTSTRAP.md) instead.

---

## Migration Overview

**Estimated time**: 15-20 minutes
**Downtime**: Zero (resources are not changed)
**Difficulty**: Easy to Medium
**Prerequisites**: Local Terraform state file, authenticated to GCP

## What Changed?

Your Terraform setup has been upgraded with:

✅ **Remote State Backend** - State stored in GCS instead of locally
✅ **CI/CD Validation** - Automatic Terraform checks on pull requests
✅ **Better Security** - State files removed from git
✅ **Team Collaboration** - Multiple people can work on infrastructure
✅ **Comprehensive Documentation** - Clear prerequisites and setup instructions

**What gets created:**
- GCS bucket for state storage (with versioning enabled)
- IAM binding for GitHub Actions to access the bucket

**What doesn't change:**
- Your running infrastructure (Cloud Run, Artifact Registry, etc.)
- Your website (stays operational throughout)
- Resource configuration (only state location changes)

---

## Migration Steps

### Step 1: Check Current State

First, verify your current infrastructure is working:

```bash
cd terraform

# Make sure you have a valid state file
ls -lah terraform.tfstate*

# Check what resources exist (this will fail if backend.tf is uncommented - that's OK)
terraform state list 2>/dev/null || echo "Will check state after init"
```

**⚠️ IMPORTANT**:
- If you don't have a local `terraform.tfstate` file, you'll need to import existing resources. See "Troubleshooting" section below.
- If you get an error about backend initialization, that's expected - we'll fix it in the next steps.

### Step 2: Create State Bucket

The backend needs a GCS bucket to store state. Let's create it:

```bash
# Make sure you're authenticated
gcloud auth application-default login

# Enable Storage API if not already enabled
gcloud services enable storage.googleapis.com

# Check if bucket exists
gcloud storage buckets describe gs://antonarbus-terraform-state 2>&1

# If bucket doesn't exist, we'll create it via Terraform
```

### Step 3: Initialize Terraform (Without Backend)

```bash
cd terraform

# Comment out the backend block in backend.tf first
# Open backend.tf and comment the entire terraform { backend "gcs" { ... } } block
# It should look like this:
# terraform {
#   backend "gcs" {
#     bucket = "antonarbus-terraform-state"
#     prefix = "terraform/state"
#   }
# }

# Initialize Terraform
terraform init

# Verify state is readable
terraform state list
```

**Expected output**: You should see a list of your existing resources (service accounts, Cloud Run, etc.).

### Step 4: Apply Changes (Creates State Bucket)

```bash
# Review what will change
terraform plan

# You should see:
# - google_storage_bucket.terraform_state will be created
# - google_storage_bucket_iam_member.terraform_state_admin will be created
# - All other resources should show "No changes" (or minor updates like label changes)

# Apply changes
terraform apply

# Type "yes" when prompted
```

**Note**: Terraform might detect small differences in existing resources, such as:
- IAM bindings format changes
- Label updates (removing temporary deployment labels)
- Computed field values being set explicitly

These are normal and safe to apply. Review the plan carefully, but don't worry about minor formatting changes.

### Step 5: Migrate State to GCS

Now let's move the state file to the cloud:

```bash
# Uncomment the backend block in backend.tf
# Remove the # comments to restore the terraform { backend "gcs" { ... } } block

# Reinitialize Terraform (this triggers state migration)
terraform init -migrate-state

# When prompted: "Do you want to copy existing state to the new backend?"
# Type: yes
```

**What happens:**
1. Terraform uploads your local state file to GCS
2. Configures itself to use remote state going forward
3. Keeps a local backup as `terraform.tfstate.backup` (you can delete this later)

**Expected output**: You should see:
```
Successfully configured the backend "gcs"! Terraform will automatically
use this backend unless the backend configuration changes.
```

### Step 6: Verify Migration

```bash
# Check that state exists in GCS
gcloud storage ls gs://antonarbus-terraform-state/terraform/state/

# You should see:
# gs://antonarbus-terraform-state/terraform/state/default.tfstate

# Verify Terraform can read remote state
terraform state list

# Should show all your resources
```

### Step 7: Clean Up Local State Files

```bash
# Remove local state files (they're now in GCS)
rm -f terraform.tfstate terraform.tfstate.backup

# Also check for state files in parent directory and .terraform
find .. -maxdepth 2 -name "*.tfstate*" -type f 2>/dev/null
# If any found, remove them: rm -f ../terraform.tfstate* .terraform/terraform.tfstate

# Verify no local state files remain
ls -lah terraform.tfstate*
# Should show: "No such file or directory"
```

**Important**: Make sure to remove ALL local state files, including any in:
- `terraform/` directory
- Parent directory `./`
- `.terraform/` subdirectory

### Step 8: Format Terraform Files

```bash
# Format all Terraform files (prevents CI/CD failures)
terraform fmt -recursive

# Check if any files were changed
git status
```

**Why**: The CI/CD workflow validates formatting. Running `terraform fmt` now prevents formatting errors later.

### Step 9: Test Everything Works

```bash
# Run a plan - should show "No changes"
terraform plan

# If Terraform asks for input, check that variables are set correctly
```

**Expected output**: `No changes. Your infrastructure matches the configuration.`

---

## Verification Checklist

After migration, verify everything is working:

```bash
# 1. State bucket exists
gcloud storage buckets describe gs://antonarbus-terraform-state --format="value(name)"

# 2. State file in bucket
gcloud storage ls gs://antonarbus-terraform-state/terraform/state/

# 3. No local state files
find . -name "*.tfstate*" -type f 2>/dev/null | wc -l
# Should output: 0

# 4. Terraform can read remote state
terraform state list | wc -l
# Should output: number of resources (e.g., 11)

# 5. Backend config is active
grep -A 3 'backend "gcs"' backend.tf | grep -v '^#'
# Should show uncommented backend configuration

# 6. No unexpected changes
terraform plan -detailed-exitcode
# Exit code 0 = no changes (success!)

# 7. Files are formatted
terraform fmt -check -recursive
# No output = all files properly formatted
```

**Manual checks:**
- [ ] All resources visible in [Cloud Console](https://console.cloud.google.com)
- [ ] Website is still working at your domain
- [ ] Backend configuration uncommented in `backend.tf`

---

## Next Steps

### 1. Push Changes to Git

The state files are now removed from git and gitignored:

```bash
cd ..
git status

# You should see the new files:
# - terraform/backend.tf
# - terraform/BOOTSTRAP.md
# - terraform/MIGRATION.md
# - .github/workflows/terraform-check.yml
# - Updated .gitignore

# These are already committed, just push
git push origin master
```

### 2. Team Onboarding

Share with your team:

```bash
# Other team members just need to:
cd terraform
terraform init  # Downloads remote state
terraform plan  # Verify it works
```

### 3. Test CI/CD

Create a test PR to verify Terraform validation works:

```bash
# Create a branch
git checkout -b test-terraform-ci

# Make a small change
echo "# test" >> terraform/README.md

# Commit and push
git add terraform/README.md
git commit -m "test: verify Terraform CI works"
git push origin test-terraform-ci

# Create PR on GitHub and check that:
# - Terraform validation runs
# - Workflow comments on PR with validation results
```

---

## Troubleshooting

### "Error: Backend initialization required" at Step 1

If you get this error when trying `terraform state list`:

```bash
Error: Backend initialization required, please run "terraform init"
```

**This is expected!** The backend.tf file is already uncommented. Just proceed to Step 3 and comment it out, then continue normally.

### GitHub Actions Fails with "Terraform files are not properly formatted"

After pushing changes, if the terraform-check workflow fails with formatting errors:

```bash
# Fix it locally
cd terraform
terraform fmt -recursive

# Commit and push
git add .
git commit -m "style: format Terraform files"
git push origin master
```

The workflow validates formatting with `terraform fmt -check`. Always run `terraform fmt` before committing.

### "No terraform.tfstate file found"

If you don't have a local state file, you need to import existing resources:

```bash
# List what should exist
gcloud run services list
gcloud artifacts repositories list
gcloud iam service-accounts list

# Import resources one by one
terraform import google_cloud_run_v2_service.main projects/antonarbus/locations/us-central1/services/cloud-run
terraform import google_artifact_registry_repository.docker_repo projects/antonarbus/locations/us-central1/repositories/artifact-registry
terraform import google_service_account.github_actions projects/antonarbus/serviceAccounts/github-actions-sa@antonarbus.iam.gserviceaccount.com
terraform import google_service_account.cloud_run_service projects/antonarbus/serviceAccounts/cloud-run-sa@antonarbus.iam.gserviceaccount.com

# Continue for all resources...
```

### "Backend configuration changed"

If Terraform complains about backend changes:

```bash
# Reinitialize
terraform init -reconfigure

# Or start fresh
rm -rf .terraform
terraform init
```

### "Error: resource already exists"

This means Terraform wants to create a resource that already exists:

```bash
# Import the existing resource instead
terraform import <resource_type>.<resource_name> <resource_id>

# Example:
terraform import google_storage_bucket.terraform_state antonarbus-terraform-state
```

### "Permission denied" on GCS bucket

Make sure your service account has access:

```bash
# Check current account
gcloud auth list

# Grant storage permissions
gcloud storage buckets add-iam-policy-binding gs://antonarbus-terraform-state \
  --member="user:$(gcloud config get-value account)" \
  --role="roles/storage.objectAdmin"
```

### "Terraform shows changes for existing resources"

Small differences are normal when importing or migrating. Common ones:

- IAM binding format changes
- Computed fields being set
- Default values being explicit

**What to do**:
1. Review the changes carefully with `terraform plan`
2. If they look safe (no destroys, just updates), apply them
3. If unsure, backup current state first: `terraform state pull > backup.tfstate`

---

## Rollback Procedure

If something goes wrong, you can rollback:

### Option 1: Use Local Backup

```bash
# Copy backup back
cp terraform.tfstate.backup terraform.tfstate

# Comment out backend block in backend.tf

# Reinitialize with local backend
terraform init -reconfigure
```

### Option 2: Download from GCS

```bash
# Download state from GCS
gcloud storage cp gs://antonarbus-terraform-state/terraform/state/default.tfstate terraform.tfstate

# Comment out backend block in backend.tf

# Reinitialize with local backend
terraform init -reconfigure
```

---

## FAQ

**Q: Will this break my running infrastructure?**
A: No! Migration only moves the state file location. Resources are unchanged.

**Q: Can I still run terraform apply locally?**
A: Yes! You run the same commands, Terraform just reads/writes state to GCS instead of local file.

**Q: What if multiple people run terraform apply at the same time?**
A: GCS backend includes automatic state locking, preventing conflicts.

**Q: How do I backup the state?**
A: GCS versioning is enabled. Previous versions are kept automatically. You can also:
```bash
terraform state pull > backup.tfstate
```

**Q: Can I migrate back to local state?**
A: Yes, follow the rollback procedure above.

---

## Support

If you encounter issues:

1. Check [BOOTSTRAP.md](./BOOTSTRAP.md) for setup instructions
2. Review [Terraform Backend Documentation](https://www.terraform.io/language/settings/backends/gcs)
3. Check GCS bucket permissions
4. Verify GCP authentication is working

For team members joining after migration, see [BOOTSTRAP.md](./BOOTSTRAP.md) section "Daily Usage".
