import { logger } from '../lib/logger'
import { githubEnv } from '../lib/github-env'
import { git } from '../lib/git'
import { gcp } from '../lib/gcp'
import type { ChangeDetection } from '../types'

export async function detectChanges(): Promise<ChangeDetection> {
  const environment = process.env.ENVIRONMENT
  const bucket = process.env.BUCKET_FOR_TERRAFORM_STATE_NAME

  // Check if this is the first infrastructure deployment for this environment
  let firstDeployment = false

  if (environment && bucket) {
    logger.info(`Checking Terraform state for environment: ${environment}`)
    logger.info(`   Bucket: ${bucket}`)
    logger.info(`   State path: gs://${bucket}/terraform/state/${environment}.tfstate`)

    const stateExists = await gcp.checkTerraformStateExists(bucket, environment)

    if (!stateExists) {
      logger.info(`First deployment detected for environment: ${environment}`)
      logger.info('   No Terraform state found - infrastructure needs to be created')
      firstDeployment = true
    } else {
      logger.success(`Terraform state found for environment: ${environment}`)
    }
  }

  // Check if this is the first commit (no HEAD~1)
  let terraformChanged = false
  let appChanged = false

  const hasPreviousCommit = await git.hasCommit('HEAD~1')

  if (!hasPreviousCommit) {
    logger.warning('First commit detected - treating as both terraform and app changes')
    terraformChanged = true
    appChanged = true
  } else {
    const files = await git.listChangedFiles()

    terraformChanged = await git.hasTerraformChanges(files)
    appChanged = await git.hasAppChanges(files)

    if (terraformChanged) {
      logger.success('Terraform changes detected')
    }

    if (appChanged) {
      logger.success('App code changes detected')
    }
  }

  // Force Terraform to run on first deployment
  if (firstDeployment) {
    logger.info('Forcing Terraform run for first-time infrastructure setup')
    terraformChanged = true
  }

  // Determine change location
  let changesDetectedAt: ChangeDetection

  if (terraformChanged && appChanged) {
    changesDetectedAt = 'both'
    logger.info('Changes at: both (terraform + app)')
  } else if (terraformChanged) {
    changesDetectedAt = 'terraform'
    logger.info('Changes at: terraform')
  } else if (appChanged) {
    changesDetectedAt = 'app'
    logger.info('Changes at: app')
  } else {
    changesDetectedAt = 'none'
    logger.info('No changes detected')
  }

  githubEnv.set('CHANGES_DETECTED_AT', changesDetectedAt)

  logger.plain('')
  logger.success('Change detection complete')

  return changesDetectedAt
}
