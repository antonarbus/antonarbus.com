import { $ } from 'bun'
import { resolve } from 'path'
import { logger } from '../lib/output'
import { configVariables, Env } from '/config/configVariables'

type Props = {
  env: Env
}

export async function terraformApply(props: Props): Promise<void> {
  logger.info(`Environment: ${props.env}`)

  // Load config
  const config = configVariables[props.env]

  // Resolve paths
  const terraformDir = resolve(__dirname, '../../terraform/infrastructure')
  const configFilePath = resolve(__dirname, `../../config/${props.env}.tfvars`)

  logger.info(`Config: ${configFilePath}`)
  logger.emptyLine()

  logger.section(`Deploying main infrastructure for environment: ${props.env}`)
  logger.emptyLine()

  logger.info('Initializing Terraform with remote backend...')

  // Change to terraform directory
  process.chdir(terraformDir)

  await $`terraform init -backend-config=bucket=${config.bucketForTerraformStateName} -backend-config=prefix=terraform/state`

  logger.emptyLine()
  logger.info(`Selecting workspace: ${props.env}`)

  // Create workspace if it doesn't exist, otherwise select it
  try {
    await $`terraform workspace select ${props.env}`.quiet()
  } catch {
    await $`terraform workspace new ${props.env}`
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
