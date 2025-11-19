import { $ } from 'bun'
import { resolve } from 'path'
import { logger } from '../lib/logger'
import { configLoader } from '../lib/config'
import { Env } from '/config/configVariables'

export async function terraformApply(env: Env): Promise<void> {
  if (!env) {
    logger.error('Environment argument required')
    logger.error('Usage: terraform-apply <environment>')
    logger.error('Example: terraform-apply dev')
    logger.error('Valid environments: dev, test, pilot, prod')
    process.exit(1)
  }

  logger.info(`Environment: ${env}`)

  // Validate config file before proceeding
  logger.plain('')
  logger.info('Validating config file...')
  if (!configLoader.validateConfig(env)) {
    logger.error('Config validation failed')
    process.exit(1)
  }
  logger.plain('')

  // Load config
  const config = configLoader.loadConfig(env)

  // Resolve paths
  const terraformDir = resolve(__dirname, '../../terraform/infrastructure')
  const configFilePath = resolve(__dirname, `../../config/${env}.tfvars`)

  logger.info(`Config: ${configFilePath}`)
  logger.plain('')

  logger.section(`Deploying main infrastructure for environment: ${env}`)
  logger.plain('')

  logger.info('Initializing Terraform with remote backend...')

  // Change to terraform directory
  process.chdir(terraformDir)

  await $`terraform init -backend-config=bucket=${config.bucketForTerraformStateName} -backend-config=prefix=terraform/state`

  logger.plain('')
  logger.info(`Selecting workspace: ${env}`)

  // Create workspace if it doesn't exist, otherwise select it
  try {
    await $`terraform workspace select ${env}`.quiet()
  } catch {
    await $`terraform workspace new ${env}`
  }

  logger.plain('')
  logger.info('Applying Terraform configuration...')
  logger.info(`Config file: ${configFilePath}`)
  logger.plain('')

  await $`terraform apply -auto-approve -var-file=${configFilePath}`

  logger.plain('')
  logger.success('Terraform apply completed successfully')
  logger.plain('')

  logger.info('Terraform Outputs:')
  await $`terraform output`

  logger.plain('')
  logger.success('Infrastructure deployment complete!')
  logger.plain('')

  // Summary for GitHub Actions
  logger.summary.write('## Terraform Apply Summary')
  logger.summary.write('')
  logger.summary.write(`**Environment**: ${env}`)
  logger.summary.write(`**Config**: \`${configFilePath}\``)
  logger.summary.write('**Status**: ✅ Success')
  logger.summary.write('')
  logger.summary.write('Infrastructure updated successfully')
}
