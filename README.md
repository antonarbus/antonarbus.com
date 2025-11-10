# antonarbus.com

Next.js web application deployed to Google Cloud Run with Terraform infrastructure as code.

## Architecture

**Project**: All environments run in GCP project `antonarbus`

| Environment | Branch   | Cloud Run Service | Domain                 | Memory | Max Instances |
| ----------- | -------- | ----------------- | ---------------------- | ------ | ------------- |
| **Prod**    | `master` | `web-app`         | antonarbus.com         | 512Mi  | 100           |
| **Pilot**   | `pilot`  | `web-app-pilot`   | pilot.antonarbus.com   | 512Mi  | 50            |
| **Test**    | `test`   | `web-app-test`    | test.antonarbus.com    | 512Mi  | 10            |
| **Dev**     | `dev`    | `web-app-dev`     | dev.antonarbus.com     | 256Mi  | 5             |

**Shared resources:**
- Docker images: `us-central1-docker.pkg.dev/antonarbus/docker-images/web-app:<tag>`
- Terraform state: `gs://antonarbus-terraform-state/terraform/state/<env>/`
- Service accounts: `github-actions-sa`, `cloud-run-sa`

## Development

```bash
npm install
npm run dev              # Local development
npm run build            # Build production
npm run docker-build     # Build Docker image
```

## Deployment

**Automatic via GitHub Actions:**
1. Push to branch → GitHub Actions detects environment
2. Builds Docker image with environment tag
3. Runs Terraform if infrastructure changed
4. Deploys to Cloud Run

**Manual deployment:**
```bash
# Infrastructure changes
cd terraform
./terraform.sh          # Detects environment from branch, applies Terraform

# Or specify environment
ENV=prod ./terraform.sh
```

## Configuration

**Single source of truth:** `/config/<env>.tfvars`
- Both Terraform and GitHub Actions read from these files
- No duplicate variables, no manual syncing needed

**To change infrastructure:** Edit `/config/prod.tfvars` and push to master

## Infrastructure (Terraform)

**Managed resources:**
- Cloud Run services (web-app, web-app-pilot, web-app-test, web-app-dev)
- Artifact Registry (docker-images)
- Service accounts and IAM permissions
- Custom domain mappings
- Auto-scaling, health probes

**Structure:**
```
terraform/
├── bootstrap/          # Creates state bucket (one-time)
├── infrastructure/     # Main infrastructure
└── terraform.sh        # Smart deployment script
```

## GitHub Actions Setup

**Required secret:** `GCP_SA_KEY`

Create service account key:
```bash
gcloud iam service-accounts keys create key.json \
  --iam-account=github-actions-sa@antonarbus.iam.gserviceaccount.com
```

Add to GitHub: Settings → Secrets → Actions → New secret → Name: `GCP_SA_KEY` → Paste key.json contents

## Monitoring

- **Cloud Run**: https://console.cloud.google.com/run?project=antonarbus
- **Logs**: https://console.cloud.google.com/logs/query?project=antonarbus
- **Artifact Registry**: https://console.cloud.google.com/artifacts?project=antonarbus

## DNS Setup (One-time per environment)

After deploying a new environment:
1. Go to Cloud Run → Manage Custom Domains
2. Copy DNS records for your domain
3. Add them to your domain registrar
