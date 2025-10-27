# Migration Guide: Upgrading Existing Terraform Setup

This guide is for **existing installations** that need to migrate from local state to remote state backend.

**If you're setting up from scratch**, use [BOOTSTRAP.md](./BOOTSTRAP.md) instead.

---

## What Changed?

Your Terraform setup has been upgraded with:

✅ **Remote State Backend** - State stored in GCS instead of locally
✅ **CI/CD Validation** - Automatic Terraform checks on pull requests
✅ **Better Security** - State files removed from git
✅ **Team Collaboration** - Multiple people can work on infrastructure
✅ **Comprehensive Documentation** - Clear prerequisites and setup instructions

---

## Migration Steps

### Step 1: Check Current State

First, verify your current infrastructure is working:

```bash
cd terraform

# Check what resources exist
terraform state list

# Make sure you have a valid state file
ls -lah terraform.tfstate*
```

**⚠️ IMPORTANT**: If you don't have a local `terraform.tfstate` file, you'll need to import existing resources. See "Troubleshooting" section below.

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
# Open backend.tf and comment lines 15-21:
# terraform {
#   backend "gcs" {
#     bucket = "antonarbus-terraform-state"
#     prefix = "terraform/state"
#   }
# }

# Initialize Terraform
terraform init
```

### Step 4: Apply Changes (Creates State Bucket)

```bash
# Review what will change
terraform plan

# You should see:
# - google_storage_bucket.terraform_state will be created
# - google_storage_bucket_iam_member.terraform_state_admin will be created
# - All other resources should show "No changes"

# Apply changes
terraform apply

# Type "yes" when prompted
```

**Note**: Terraform might detect small differences in existing resources (like IAM bindings format). This is normal and safe to apply.

### Step 5: Migrate State to GCS

Now let's move the state file to the cloud:

```bash
# Uncomment the backend block in backend.tf
# Remove the # comments from lines 15-21

# Reinitialize Terraform (this triggers state migration)
terraform init -migrate-state

# When prompted: "Do you want to copy existing state to the new backend?"
# Type: yes
```

Terraform will:
1. Upload your local state file to GCS
2. Configure itself to use remote state
3. Keep a local backup as `terraform.tfstate.backup`

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

# Verify no local state files remain
ls -lah terraform.tfstate*
# Should show: "No such file or directory"
```

### Step 8: Test Everything Works

```bash
# Run a plan - should show "No changes"
terraform plan

# If Terraform asks for input, check that variables are set correctly
```

---

## Verification Checklist

After migration, verify:

- [ ] State bucket exists: `gcloud storage ls gs://antonarbus-terraform-state`
- [ ] State file in bucket: `gcloud storage ls gs://antonarbus-terraform-state/terraform/state/`
- [ ] Local state files deleted: `ls terraform.tfstate*` (should error)
- [ ] Terraform plan works: `terraform plan` (should show "No changes" or minimal diffs)
- [ ] Backend config uncommented in `backend.tf`
- [ ] All resources still exist in Cloud Console

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
