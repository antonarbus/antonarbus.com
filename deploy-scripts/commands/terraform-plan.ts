import { $ } from 'bun'
import { resolve } from 'path'
import { configVariables, Env } from '../../config/configVariables'
import { chdir } from 'process'
import { logger } from '../lib/output/logger'

type Props = {
  env: Env
}

export async function terraformPlan(props: Props): Promise<void> {
  logger.info(`Environment: ${props.env}`)

  const { bucketForTerraformStateName } = configVariables[props.env]

  const TERRAFORM_DIR = resolve(__dirname, '../../terraform/infrastructure')
  const TFVARS_FILE_PATH = resolve(__dirname, `../../config/${props.env}.tfvars`)

  logger.info(`Config: ${TFVARS_FILE_PATH}`)
  logger.emptyLine()

  logger.warning(`Planning infrastructure changes for environment: ${props.env}`)
  logger.emptyLine()

  logger.info('Initializing Terraform with remote backend...')

  // Change to terraform directory
  chdir(TERRAFORM_DIR)

  await $`terraform init -backend-config=bucket=${bucketForTerraformStateName} -backend-config=prefix=terraform/state`

  logger.emptyLine()
  logger.info(`Selecting workspace: ${props.env}`)

  // Create workspace if it doesn't exist, otherwise select it
  try {
    await $`terraform workspace select ${props.env}`.quiet()
  } catch {
    await $`terraform workspace new ${props.env}`
  }

  logger.emptyLine()
  logger.info('Running Terraform plan...')
  logger.info(`Config file: ${TFVARS_FILE_PATH}`)
  logger.emptyLine()

  await $`terraform plan -var-file=${TFVARS_FILE_PATH}`

  logger.emptyLine()
  logger.success('Terraform plan completed successfully')
  logger.emptyLine()
}
