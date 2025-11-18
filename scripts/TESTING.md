# Testing Guide for TypeScript CLI

## Quick Local Tests

### 1. Test Help
```bash
bun scripts/cli.ts --help
# or
bun run deploy:help
```

### 2. Test Config Validation
```bash
bun scripts/cli.ts validate
# or
bun run deploy:validate
```

Expected output: All config files validated successfully.

### 3. Test Environment Detection
```bash
bun scripts/cli.ts detect-env
```

Expected behavior:
- On `master`/`main` branch: Sets ENVIRONMENT=dev
- On other branches: Exits with error (expected)

### 4. Test Config Loading
```bash
bun scripts/cli.ts load-config dev
```

Expected output: Environment variables in KEY=value format.

### 5. Test Individual Commands

```bash
# These require environment variables to be set

# Detect changes (requires git history)
bun scripts/cli.ts detect-changes

# Setup GCP (requires PROJECT_ID env var)
PROJECT_ID=your-project bun scripts/cli.ts setup-gcp

# Other commands require more env vars - see README.md
```

## Testing in GitHub Actions

The workflow is configured in `.github/workflows/deploy.yml`.

### Test Workflow

1. **Push to master branch** to trigger deployment
2. **Use workflow_dispatch** for manual testing without code changes

### What to Verify

After pushing to master or triggering manually:

1. ✅ Checkout completes
2. ✅ Bun setup works
3. ✅ Environment detected as 'dev'
4. ✅ Config validation passes
5. ✅ Config loads correctly
6. ✅ Changes detected properly
7. ✅ (If terraform changes) Terraform apply succeeds
8. ✅ (If app changes) Docker build/deploy succeeds
9. ✅ Deployment verification passes

### Monitoring

Check GitHub Actions logs for:
- Colored output from logger
- Proper error messages
- GITHUB_ENV variable setting
- GITHUB_STEP_SUMMARY content

## Common Issues

### Issue: "Command not found"
**Solution**: Make sure Bun is installed and in PATH.

### Issue: Config validation fails
**Solution**: Check `.tfvars` files for missing required variables.

### Issue: Git commands fail
**Solution**: Ensure you're in a git repository with commit history.

### Issue: GCP commands fail
**Solution**:
- Authenticate with `gcloud auth login`
- Set project with `gcloud config set project PROJECT_ID`
- Ensure APIs are enabled

## Test Checklist

### Before Merging to Master

- [ ] `bun scripts/cli.ts --help` shows all commands
- [ ] `bun scripts/cli.ts validate` passes
- [ ] `bun scripts/cli.ts load-config dev` outputs env vars
- [ ] All TypeScript files compile without errors
- [ ] No lint errors in new code

### After Merging to Master

- [ ] GitHub Actions workflow triggers
- [ ] All steps complete successfully
- [ ] Logs show colored output
- [ ] Environment variables set correctly
- [ ] Deployment succeeds (if changes present)

### Production Verification

- [ ] Website accessible
- [ ] No errors in Cloud Run logs
- [ ] Smoke tests passed
- [ ] No critical vulnerabilities reported

## Debugging

### Enable Verbose Logging

Add console.log statements in commands for debugging:

```typescript
console.log('DEBUG:', variableName)
```

### Check Environment Variables

In GitHub Actions, add a debug step:

```yaml
- name: Debug Env
  run: env | sort
```

### Test with Local Environment Variables

```bash
# Set required env vars
export PROJECT_ID=your-project
export REGION=us-central1
export ENVIRONMENT=dev

# Run command
bun scripts/cli.ts setup-gcp
```

### Rollback if Needed

If the TypeScript CLI causes issues:

1. Revert `.github/workflows/deploy.yml` to use bash scripts
2. Old bash scripts are still present and functional
3. Push revert to master

## Performance

TypeScript CLI is expected to be **as fast or faster** than bash scripts:

- Bun executes TypeScript natively (no compilation)
- Shared utilities reduce redundant operations
- Better error handling reduces retry loops

## Next Steps After Testing

1. Monitor first production deployment
2. Delete old bash scripts once confident
3. Add more commands as needed
4. Improve error messages based on real usage
