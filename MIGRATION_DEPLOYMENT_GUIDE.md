# Migration Guide: Node → Bun + Terraform Deployment Template

This guide helps you apply the deployment approach from this project to other projects.

## Migration Checklist

### Phase 1: Runtime Migration (Node → Bun)

**Local Development:**

- [ ] Install Bun: `curl -fsSL https://bun.sh/install | bash`
- [ ] Update package.json scripts:
  - [ ] Replace `npm run` with `bun run`
  - [ ] Replace `npx` with `bunx`
- [ ] Test all npm scripts work with Bun
- [ ] Update `.gitignore` to include `bun.lockb` (Bun's lockfile)
- [ ] Run `bun install` to generate lockfile
- [ ] Commit `bun.lockb` to git

**Docker:**

- [ ] Update `Dockerfile` base image:
  ```dockerfile
  # FROM node:20-alpine
  FROM oven/bun:1 AS base
  ```
- [ ] Replace `npm install` → `bun install`
- [ ] Replace `npm run build` → `bun run build`
- [ ] Replace `npm start` → `bun start`
- [ ] Test Docker build locally
- [ ] Test Docker container runs correctly

**CI/CD (GitHub Actions):**

- [ ] Replace `actions/setup-node@v4` with `oven-sh/setup-bun@v2`
- [ ] Update all `npm` commands to `bun`
- [ ] Test workflows in a feature branch first

### Phase 2: Project Setup

**Prerequisites:**

- [ ] Verify GCP project exists
- [ ] Enable required APIs (copy from current project's README)
- [ ] Install gcloud CLI
- [ ] Authenticate: `gcloud auth application-default login`

**Configuration:**

- [ ] Copy `config/configVariables.ts` template
- [ ] Update domain name (e.g., `example.com`)
- [ ] Update GCP project ID
- [ ] Update service names
- [ ] Update regions if needed
- [ ] Set `MASTER_DEPLOYS_TO_ENV` (usually `'dev'` for new projects)

### Phase 3: Terraform Setup

**Bootstrap (One-time per project):**

- [ ] Copy `terraform/bootstrap/` directory
- [ ] Update `variables.tf` if needed
- [ ] Run bootstrap manually first time:
  ```bash
  cd terraform/bootstrap
  terraform init
  terraform apply -var-file="../../config/prod.tfvars"
  ```
- [ ] Verify:
  - [ ] Terraform state bucket created
  - [ ] Artifact Registry created
  - [ ] Service accounts created
  - [ ] Workload Identity configured

**Infrastructure:**

- [ ] Copy `terraform/infrastructure/` directory
- [ ] Review and adjust resources for project needs
- [ ] Test terraform init with backend:
  ```bash
  bun deploy-scripts/cli.ts terraform-apply --env dev
  ```

### Phase 4: Scripts & CLI

**Copy CLI infrastructure:**

- [ ] Copy `deploy-scripts/` directory entirely
- [ ] Copy `tsconfig.json` (or merge settings)
- [ ] Install dependencies:
  ```bash
  bun add commander zod chalk execa @inquirer/prompts
  ```
- [ ] Update `package.json` scripts:
  ```json
  {
    "cli": "bun deploy-scripts/cli.ts",
    "cli:help": "bun deploy-scripts/cli.ts --help"
  }
  ```
- [ ] Test CLI works: `bun deploy-scripts/cli.ts`

**Customize commands:**

- [ ] Review `deploy-scripts/commands/` - keep what you need
- [ ] Update `deploy-scripts/lib/interactive.ts` with relevant commands
- [ ] Remove promotion workflow if using direct-to-prod

### Phase 5: GitHub Actions

**Copy workflows:**

- [ ] Copy `.github/workflows/deploy.yml`
- [ ] Copy `.github/workflows/promote.yml` (if using multi-stage)
- [ ] Update workflow names/descriptions

**Configure GitHub secrets/environments:**

- [ ] Create GitHub environments (dev, test, pilot, prod)
- [ ] Configure required reviewers per environment
- [ ] Configure Workload Identity Federation (already done via bootstrap)
- [ ] Test workflow on a feature branch first

### Phase 6: Domain & DNS

**Domain verification:**

- [ ] Verify domain ownership in Google Search Console
- [ ] Or add TXT record to DNS
- [ ] Run domain mapping after verification

**DNS Configuration:**

- [ ] Add CNAME records for subdomains:
  ```
  dev.example.com    → ghs.googlehosted.com
  test.example.com   → ghs.googlehosted.com
  pilot.example.com  → ghs.googlehosted.com
  www.example.com    → ghs.googlehosted.com (or A records for apex)
  ```

### Phase 7: First Deployment

**Generate configs:**

- [ ] Run: `bun deploy-scripts/cli.ts generate-tfvars`
- [ ] Verify `.tfvars` files look correct
- [ ] Commit generated files

**Deploy to dev:**

- [ ] Push to master branch
- [ ] Watch GitHub Actions workflow
- [ ] Verify deployment succeeds
- [ ] Test the deployed app
- [ ] Check logs in Cloud Run console

### Phase 8: Documentation

**Update README:**

- [ ] Copy README.md template
- [ ] Update project name
- [ ] Update domain names
- [ ] Update GCP project ID references
- [ ] Update architecture diagram if needed
- [ ] Remove sections not applicable to this project

### Phase 9: Cleanup & Validation

**Remove old stuff:**

- [ ] Remove old deployment scripts
- [ ] Remove old Terraform files (if restructuring)
- [ ] Remove old CI/CD workflows
- [ ] Remove `package-lock.json` or `yarn.lock`

**Validation checklist:**

- [ ] `bun install` works
- [ ] `bun run dev` works locally
- [ ] `bun run build` succeeds
- [ ] Docker build succeeds
- [ ] CLI interactive mode works
- [ ] All CLI commands work
- [ ] Terraform apply succeeds
- [ ] GitHub Actions deployment works
- [ ] App is accessible at custom domain
- [ ] Auto-rollback works (test by deploying broken code)

---

## Pro Tips

**Start with a non-critical project** to test the migration process

**Use feature branches** - don't push directly to master until tested

**One environment at a time** - get dev working first, then add others

**Keep old deployment working** - don't delete until new one is proven

**Document project-specific changes** - each project might have unique needs

**Test rollback** - intentionally deploy broken code to verify auto-rollback

---

## Common Gotchas

1. **Bun compatibility** - Some packages don't work with Bun yet (rare but happens)
2. **Terraform state** - Never manually edit, use `terraform import` for existing resources
3. **Workload Identity** - Must match exactly: repo name, branch name, project ID
4. **Domain verification** - Takes time, don't skip this step
5. **Environment variables** - Cloud Run env vars might need migration
6. **Secrets** - Move secrets to Google Secret Manager, not in config files

---

## Quick Start for Similar Projects

If you're migrating a project that's very similar to this one:

```bash
# 1. Copy these files/directories to new project:
cp -r config/ deploy-scripts/ terraform/ .github/ <new-project>/
cp tsconfig.json package.json bun.lockb <new-project>/

# 2. Update configuration
cd <new-project>
# Edit config/configVariables.ts with new project details

# 3. Install dependencies
bun install

# 4. Run bootstrap
cd terraform/bootstrap
terraform init
terraform apply -var-file="../../config/prod.tfvars"

# 5. Test deployment
cd ../..
bun deploy-scripts/cli.ts
```

---

## Need Help?

Refer to the main README.md in this repository for detailed documentation on each component.
