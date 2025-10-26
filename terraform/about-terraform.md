# About Terraform - Complete Beginner's Guide

## What is Terraform?

**Terraform is Infrastructure as Code (IaC)** - it's a tool that lets you define your cloud infrastructure (servers, databases, networks, etc.) using configuration files instead of clicking around in web consoles.

## How Terraform Works

```
┌─────────────────┐
│  Your .tf files │  ← You write what you want
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Terraform     │  ← Terraform reads your files
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Google Cloud   │  ← Terraform talks to Google Cloud API
└─────────────────┘     and creates/updates resources
```

Terraform keeps track of what it created in a **state file** (`terraform.tfstate`) - this is like Terraform's memory of what exists.

## Installation

Before you can use Terraform, you need to install it along with Google Cloud SDK.

```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

```bash
brew install google-cloud-sdk
```

```bash
terraform --version
```

```bash
gcloud --version
```

After installing both tools, authenticate:

```bash
# Credentials that applications (like Terraform) use to authenticate with Google Cloud APIs
gcloud auth application-default login

```

This will open a browser window for you to login with your Google account.

### Check Installation

Verify everything is ready:

```bash
# Check Terraform
terraform --version

# Check Google Cloud SDK
gcloud --version

# Check authentication
gcloud auth list
```

If all three commands work, you're ready to use Terraform!

---

## The Main Commands (You only need 5!)

### 1. `terraform init`

**When to use**: First time in a new Terraform directory, or after adding new providers

**What it does**:

- Downloads the Google Cloud provider plugin
- Sets up the working directory
- Prepares Terraform to work

```bash
cd terraform
terraform init
```

**Output**: You'll see it downloading plugins. Should end with "Terraform has been successfully initialized!"

---

### 2. `terraform plan`

**When to use**: Before making any changes - ALWAYS run this first!

**What it does**:

- Compares your .tf files with current state
- Shows you what will be created/changed/destroyed
- **Does NOT actually make changes** (safe to run anytime)

```bash
terraform plan
```

**Output**:

```
Terraform will perform the following actions:

  # google_cloud_run_v2_service.main will be created
  + resource "google_cloud_run_v2_service" "main" {
      + name     = "cloud-run"
      + location = "us-central1"
      ...
    }

Plan: 8 to add, 0 to change, 0 to destroy.
```

**Reading the output**:

- `+` = will be created (green)
- `~` = will be modified (yellow)
- `-` = will be deleted (red)
- `+/-` = will be replaced (recreated)

---

### 3. `terraform apply`

**When to use**: After `terraform plan` looks good, and you want to actually create/update resources

**What it does**:

- Shows you the plan again
- Asks for confirmation
- Makes the actual changes to Google Cloud

```bash
terraform apply
```

**What happens**:

1. Shows the plan
2. Prompts: "Do you want to perform these actions? (yes/no)"
3. Type `yes` and press Enter
4. Terraform creates/updates resources
5. Updates the state file

---

### 4. `terraform destroy`

**When to use**: When you want to delete ALL resources managed by Terraform

**What it does**:

- Deletes everything defined in your .tf files
- **DANGEROUS** - use with caution!

```bash
terraform destroy
```

You'll be asked to confirm by typing `yes`.

---

### 5. `terraform output`

**When to use**: To see values from your outputs.tf (like URLs, service account emails, etc.)

**What it does**:

- Shows the output values from your infrastructure

```bash
terraform output
```

**Example output**:

```
cloud_run_url = "https://cloud-run-abc123.run.app"
github_actions_service_account_email = "github-actions-sa@antonarbus.iam.gserviceaccount.com"
```

---

## Common Workflow

Here's what you'll do in practice:

```bash
# 1. First time only - initialize
cd terraform
terraform init

# 2. Preview what will happen
terraform plan

# 3. If it looks good, apply it
terraform apply
# Type "yes" when prompted

# 4. Check the outputs
terraform output
```

## When You Want to Change Something

Example: You want to change min_instances from 0 to 1

```bash
# 1. Edit terraform.tfvars or variables.tf
# Change: min_instances = 1

# 2. Preview the change
terraform plan
# Output shows: ~ google_cloud_run_v2_service.main will be updated

# 3. Apply if it looks good
terraform apply
```

---

## How to See Errors/Bugs

### During `terraform plan` or `terraform apply`

Terraform gives detailed error messages:

**Example error**:

```
Error: Error creating Service: googleapi: Error 403: Permission denied

  with google_cloud_run_v2_service.main,
  on main.tf line 45, in resource "google_cloud_run_v2_service" "main":
  45: resource "google_cloud_run_v2_service" "main" {
```

**What it tells you**:

- **What failed**: Creating Cloud Run Service
- **Why**: Permission denied (403)
- **Where**: main.tf line 45
- **Which resource**: google_cloud_run_v2_service.main

### Common Errors and Fixes

**1. "API not enabled"**

```
Error: Error 403: Cloud Run API has not been used in project
```

**Fix**:

```bash
gcloud services enable run.googleapis.com
```

**2. "Permission denied"**

```
Error: Error 403: Permission denied
```

**Fix**: Authenticate with gcloud

```bash
gcloud auth application-default login
```

**3. "Resource already exists"**

```
Error: Error creating Repository: googleapi: Error 409: already exists
```

**Fix**: Either delete the existing resource or import it:

```bash
terraform import google_artifact_registry_repository.docker_repo \
  projects/antonarbus/locations/us-central1/repositories/artifact-registry
```

---

## Checking What Terraform Manages

### See current state:

```bash
terraform show
```

Shows everything Terraform currently manages

### List all resources:

```bash
terraform state list
```

**Example output**:

```
google_artifact_registry_repository.docker_repo
google_cloud_run_v2_service.main
google_service_account.github_actions
```

### See details of specific resource:

```bash
terraform state show google_cloud_run_v2_service.main
```

---

## Debugging Tips

### 1. Enable detailed logging:

```bash
export TF_LOG=DEBUG
terraform plan
```

### 2. Validate your configuration:

```bash
terraform validate
```

Checks for syntax errors without connecting to Google Cloud

### 3. Format your code:

```bash
terraform fmt
```

Auto-formats your .tf files

### 4. See the execution plan in detail:

```bash
terraform plan -out=plan.out
terraform show plan.out
```

---

## Important Files to Know

```
terraform/
├── main.tf              ← Your infrastructure definition
├── variables.tf         ← Variable definitions
├── outputs.tf          ← Values to display after apply
├── terraform.tfvars    ← Your actual values (SECRET - not in git)
├── terraform.tfstate   ← Terraform's memory (SECRET - not in git)
├── .terraform/         ← Downloaded plugins
└── .gitignore         ← Keeps secrets out of git
```

**Never commit to git**:

- `terraform.tfstate` (contains secrets)
- `terraform.tfvars` (contains your values)
- `.terraform/` (large plugin files)

---

## Safe Learning Approach

1. **Always run `terraform plan` first** - it shows you what will happen without doing it
2. **Start with small changes** - change one thing, run plan, see the diff
3. **Keep backups** - Terraform state file is important
4. **Use version control** - Commit your .tf files (not .tfstate!)

---

## Real Example Walkthrough

Let's say you want to increase memory limit:

```bash
# 1. Check current state
cd terraform
terraform show | grep memory
# Output: memory_limit = "512Mi"

# 2. Edit the variable
nano terraform.tfvars
# Change: memory_limit = "1Gi"

# 3. Preview change
terraform plan
# Output shows:
#   ~ resource "google_cloud_run_v2_service" "main" {
#       ~ memory_limit = "512Mi" -> "1Gi"
#     }

# 4. Apply if looks good
terraform apply
# Type: yes

# 5. Verify
terraform output cloud_run_url
# Visit the URL to check it works
```

---

## Questions to Test Understanding

**Q: Can I run `terraform apply` multiple times?**
A: Yes! Terraform is idempotent - if nothing changed, it does nothing.

**Q: What if I manually change something in Google Cloud Console?**
A: Next `terraform plan` will show the difference and offer to fix it back to what's in your code.

**Q: How do I undo an `terraform apply`?**
A: Either:

- Change the .tf files back and run `terraform apply` again
- Use `terraform destroy` to delete everything

**Q: Is it safe to experiment?**
A: `terraform plan` is 100% safe - it never changes anything. Only `apply` and `destroy` make changes.

---

## Next Steps

After you understand the basics, check out the [README.md](./README.md) for specific instructions on setting up your Google Cloud Run infrastructure with Terraform.
