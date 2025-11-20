import { $ } from 'bun'
import { resolve } from 'path'
import { logger } from '../lib/output'
import { configLoader } from '../lib/config'
import { Env } from '/config/configVariables'

export async function terraformApply(env: Env): Promise<void> {
  logger.info(`Environment: ${env}`)

  // Load config
  const config = configLoader.loadConfig(env)

  // Resolve paths
  const terraformDir = resolve(__dirname, '../../terraform/infrastructure')
  const configFilePath = resolve(__dirname, `../../config/${env}.tfvars`)

  logger.info(`Config: ${configFilePath}`)
  logger.emptyLine()

  logger.section(`Deploying main infrastructure for environment: ${env}`)
  logger.emptyLine()

  logger.info('Initializing Terraform with remote backend...')

  // Change to terraform directory
  process.chdir(terraformDir)

  await $`terraform init -backend-config=bucket=${config.bucketForTerraformStateName} -backend-config=prefix=terraform/state`

  logger.emptyLine()
  logger.info(`Selecting workspace: ${env}`)

  // Create workspace if it doesn't exist, otherwise select it
  try {
    await $`terraform workspace select ${env}`.quiet()
  } catch {
    await $`terraform workspace new ${env}`
  }

  logger.emptyLine()
  logger.info('Applying Terraform configuration...')
  logger.info(`Config file: ${configFilePath}`)
  logger.emptyLine()

  await $`terraform apply -auto-approve -var-file=${configFilePath}`

  logger.emptyLine()
  logger.success('Terraform apply completed successfully')
  logger.emptyLine()

  logger.info('Terraform Outputs:')
  await $`terraform output`

  logger.emptyLine()
  logger.success('Infrastructure deployment complete!')
  logger.emptyLine()
}
