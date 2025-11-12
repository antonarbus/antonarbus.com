# Domain Verification Setup for Automated Deployments

## Problem

When Terraform tries to create domain mappings for Cloud Run, it fails with:
```
Caller is not authorized to administer the domain
```

This happens because domain verification is tied to individual users/service accounts, not just IAM permissions.

## One-Time Setup Required

To enable automated domain mapping creation across all environments (dev, test, pilot, prod), you need to add the GitHub Actions service account as a verified owner of `antonarbus.com`.

### Option 1: Add via Google Search Console (Recommended - Simplest)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select the `antonarbus.com` property (or add it if not already there)
3. Go to **Settings** → **Users and permissions**
4. Click **Add user**
5. Add this email: `github-actions-sa@antonarbus.iam.gserviceaccount.com`
6. Grant **Owner** permission
7. Click **Add**

That's it! Once added:
- ✅ All subdomains (dev.antonarbus.com, test.antonarbus.com, etc.) will work automatically
- ✅ The GitHub Actions workflow can create domain mappings for any environment
- ✅ This is a one-time setup - never needs to be done again

### Option 2: Add via Site Verification API

Run the provided script:
```bash
bash terraform/add-service-account-to-domain-verification.sh
```

This automates the process using the Site Verification API.

## Verification

After adding the service account, you can verify it worked:

```bash
# Check verified owners
gcloud domains list-user-verified --project=antonarbus
```

The service account should appear in the list.

## Why Is This Needed?

- Domain verification in GCP is **per-user/service-account**, not per-project
- When YOU manually created domain mappings through the console, Google verified YOU
- When the **service account** tries to create mappings via Terraform, it needs its own verification
- By adding the service account to the verified owners list, it inherits the verification

## After Setup

Once the service account is added as a verified owner:

1. Re-run the failed Terraform deployment (push to the branch again)
2. The domain mapping will be created successfully
3. All future environments will work automatically

## Related Files

- `terraform/infrastructure/main.tf` - Contains domain mapping resource
- `terraform/add-service-account-to-domain-verification.sh` - Automated setup script
- `.github/workflows/deploy.yml` - Workflow that creates domain mappings
