# Terraform Bootstrap Guide

This guide walks you through the **one-time initial setup** for Terraform with remote state backend.

## Why Bootstrap?

Terraform has a chicken-and-egg problem:
- Terraform needs a GCS bucket to store its state
- But we use Terraform to create that bucket

**Solution**: Bootstrap in two phases:
1. **Phase 1**: Create the state bucket (using local state temporarily)
2. **Phase 2**: Migrate to remote state backend (stored in the bucket)

---

## Prerequisites

Before starting, ensure you have:

### 1. Google Cloud Project
- **Project ID**: `antonarbus` (or your project)
- **Billing enabled**: Required for Cloud Run, Artifact Registry
- **APIs enabled**:
  ```bash
  gcloud services enable run.googleapis.com \
    artifactregistry.googleapis.com \
    iam.googleapis.com \
    storage.googleapis.com \
    cloudresourcemanager.googleapis.com
  ```

### 2. Local Tools Installed
```bash
# Terraform (>= 1.0)
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

# Google Cloud SDK
brew install google-cloud-sdk
```

### 3. Authentication
```bash
# Login to Google Cloud
gcloud auth login

# Set default project
gcloud config set project antonarbus

# Set application default credentials (for Terraform)
gcloud auth application-default login
```

### 4. Permissions
Your Google Cloud user account needs these roles:
- **Owner** or **Editor** (for bootstrap only)
- After bootstrap, you can use service accounts with limited permissions

To check your permissions:
```bash
gcloud projects get-iam-policy antonarbus \
  --flatten="bindings[].members" \
  --filter="bindings.members:user:$(gcloud config get-value account)"
```

---

## Bootstrap Process

### Phase 1: Create State Bucket (Local State)

1. **Navigate to terraform directory**:
   ```bash
   cd terraform
   ```

2. **Comment out the backend block** in `backend.tf`:
   - Open `backend.tf`
   - Find the `terraform { backend "gcs" { ... } }` block
   - Comment it out like this:
   ```hcl
   # terraform {
   #   backend "gcs" {
   #     bucket = "antonarbus-terraform-state"
   #     prefix = "terraform/state"
   #   }
   # }
   ```

3. **Initialize Terraform** (creates `.terraform` directory):
   ```bash
   terraform init
   ```

4. **Review what will be created**:
   ```bash
   terraform plan
   ```

   You should see ~11 resources to be created:
   - GCS bucket for state
   - Artifact Registry
   - 2 Service Accounts
   - Cloud Run service
   - IAM bindings
   - Domain mapping
   - etc.

5. **Create the infrastructure**:
   ```bash
   terraform apply
   ```

   Type `yes` when prompted.

   **Note**: This will create a local `terraform.tfstate` file temporarily.

6. **Verify the state bucket was created**:
   ```bash
   gcloud storage buckets describe gs://antonarbus-terraform-state
   ```

### Phase 2: Migrate to Remote State

1. **Uncomment the backend block** in `backend.tf`:
   - Remove the `#` comments from the backend configuration
   - Save the file

2. **Reinitialize Terraform** (migrates state to GCS):
   ```bash
   terraform init -migrate-state
   ```

   When prompted "Do you want to copy existing state to the new backend?", type `yes`.

3. **Verify state was migrated**:
   ```bash
   # Check if state exists in GCS
   gcloud storage ls gs://antonarbus-terraform-state/terraform/state/

   # You should see: default.tfstate
   ```

4. **Test that remote state works**:
   ```bash
   terraform plan
   ```

   Should show "No changes" since infrastructure already exists.

5. **Remove local state files** (no longer needed):
   ```bash
   rm -f terraform.tfstate terraform.tfstate.backup

   # Also check for any stray state files
   find .. -maxdepth 2 -name "*.tfstate*" -type f 2>/dev/null
   # If any found, remove them
   ```

6. **Format Terraform files** (prevents CI/CD failures):
   ```bash
   terraform fmt -recursive
   ```

   This ensures all Terraform files are properly formatted. The CI/CD workflow validates formatting and will fail if files aren't formatted correctly.

7. **Commit the changes to git**:
   ```bash
   cd ..
   git add terraform/backend.tf terraform/BOOTSTRAP.md
   git commit -m "feat: add remote state backend configuration"
   git push
   ```

---

## Post-Bootstrap: GitHub Actions Setup

Now that infrastructure exists, set up GitHub Actions to deploy automatically:

### 1. Create Service Account Key

```bash
# Create a key for the GitHub Actions service account
gcloud iam service-accounts keys create ~/github-actions-key.json \
  --iam-account=github-actions-sa@antonarbus.iam.gserviceaccount.com
```

### 2. Add to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `GCP_SA_KEY`
5. Value: Paste the entire contents of `~/github-actions-key.json`
6. Click **Add secret**

### 3. Delete Local Key (Security)

```bash
rm ~/github-actions-key.json
```

### 4. Test GitHub Actions

Push a commit to trigger the workflow:
```bash
git commit --allow-empty -m "test: trigger GitHub Actions"
git push
```

Check the Actions tab in GitHub to see the deployment.

---

## Verification Checklist

After bootstrap, verify everything works:

- [ ] State bucket exists: `gcloud storage ls gs://antonarbus-terraform-state`
- [ ] State file in bucket: `gcloud storage ls gs://antonarbus-terraform-state/terraform/state/`
- [ ] Local state files deleted: `ls terraform/*.tfstate` (should be empty)
- [ ] Terraform plan works: `terraform plan` (should show "No changes")
- [ ] Cloud Run service exists: https://console.cloud.google.com/run
- [ ] Artifact Registry exists: https://console.cloud.google.com/artifacts
- [ ] GitHub secret configured: `GCP_SA_KEY` in repository settings
- [ ] GitHub Actions works: Check Actions tab after push

---

## Troubleshooting

### GitHub Actions Fails with "Terraform files are not properly formatted"

After pushing changes, if the terraform-check workflow fails:

```bash
# Fix formatting
cd terraform
terraform fmt -recursive

# Commit and push
git add .
git commit -m "style: format Terraform files"
git push
```

The CI/CD workflow validates formatting with `terraform fmt -check`. Always run `terraform fmt -recursive` before committing Terraform changes.

### "Error creating Bucket: googleapi: Error 409: already exists"

The bucket already exists. Options:
1. **Import existing bucket**:
   ```bash
   terraform import google_storage_bucket.terraform_state antonarbus-terraform-state
   ```
2. **Use different bucket name**: Edit `backend.tf` and `backend.tf` to use a unique name

### "Error: Failed to get existing workspaces: querying Cloud Storage failed"

Authentication issue. Re-authenticate:
```bash
gcloud auth application-default login
```

### "Error: resource ... already exists"

Resource was created manually. Import it:
```bash
# Example for Cloud Run service
terraform import google_cloud_run_v2_service.main projects/antonarbus/locations/us-central1/services/cloud-run
```

### "Permission denied" errors

Your user needs more permissions. Ask project owner to grant:
- `roles/editor` or `roles/owner`

Or grant specific roles:
```bash
gcloud projects add-iam-policy-binding antonarbus \
  --member="user:your-email@example.com" \
  --role="roles/editor"
```

---

## Using in a New Project

To copy this setup to a new project:

1. **Copy terraform directory** to new project
2. **Update variables** in `variables.tf`:
   - `project_id`: Your new GCP project ID
   - `region`: Your preferred region
   - `custom_domain`: Your domain name
   - State bucket name in `backend.tf`
3. **Follow bootstrap process** above
4. **Update GitHub Actions** workflow with new environment variables

---

## Next Steps

After bootstrap is complete:

1. **Daily usage**: Edit `.tf` files → `terraform plan` → `terraform apply`
2. **CI/CD**: GitHub Actions automatically validates and deploys
3. **Collaboration**: Team members run `terraform init` to download remote state

See main [README.md](../README.md) for daily usage instructions.
