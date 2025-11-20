#!/usr/bin/env bun
import { Command } from 'commander'
import { detectEnvironment } from './commands/detect-env'
import { loadConfig } from './commands/load-config'
import { setupGcp } from './commands/setup-gcp'
import { deployCloudRun } from './commands/deploy-cloudrun'
import { verifyDeployment } from './commands/verify-deployment'
import { terraformApply } from './commands/terraform-apply'
import { promoteImage } from './commands/promote-image'
import { validatePromotion } from './commands/validate-promotion'
import { envSchema } from '/config/configVariables'

const program = new Command()

program.name('deploy-cli').description('Deployment automation for antonarbus.com').version('1.0.0')

program
  .command('detect-env')
  .description('Detect deployment environment from git branch')
  .action(async () => {
    await detectEnvironment()
  })

program
  .command('load-config')
  .description('Load config for specified environment and output as env vars')
  .requiredOption('--env <environment>', 'Environment name (dev, test, pilot, prod)')
  .action(async (options: { env: string }) => {
    const validatedEnv = envSchema.parse(options.env)
    await loadConfig(validatedEnv)
  })

program
  .command('setup-gcp')
  .description('Setup GCP project and enable required APIs')
  .action(async () => {
    await setupGcp()
  })

program
  .command('terraform-apply')
  .description('Apply Terraform configuration for environment')
  .requiredOption('--env <environment>', 'Environment name (dev, test, pilot, prod)')
  .action(async (options: { env: string }) => {
    const validatedEnv = envSchema.parse(options.env)
    await terraformApply(validatedEnv)
  })

program
  .command('deploy-cloudrun')
  .description('Deploy Docker image to Cloud Run')
  .requiredOption('--env <environment>', 'Environment name (dev, test, pilot, prod)')
  .action(async (options: { env: string }) => {
    const validatedEnv = envSchema.parse(options.env)
    await deployCloudRun(validatedEnv)
  })

program
  .command('verify-deployment')
  .description('Verify Cloud Run deployment')
  .requiredOption('--env <environment>', 'Environment name (dev, test, pilot, prod)')
  .option('--previous-image <image>', 'Previous image URL for rollback')
  .action(async (options: { env: string; previousImage?: string }) => {
    const validatedEnv = envSchema.parse(options.env)
    await verifyDeployment(validatedEnv, options.previousImage)
  })

program
  .command('validate-promotion')
  .description('Validate promotion path between environments')
  .requiredOption('--source-env <environment>', 'Source environment name')
  .requiredOption('--target-env <environment>', 'Target environment name')
  .action((options: { sourceEnv: string; targetEnv: string }) => {
    const validatedSourceEnv = envSchema.parse(options.sourceEnv)
    const validatedTargetEnv = envSchema.parse(options.targetEnv)
    validatePromotion({ sourceEnv: validatedSourceEnv, targetEnv: validatedTargetEnv })
  })

program
  .command('promote-image')
  .description('Promote Docker image from source to target environment')
  .requiredOption('--source-env <environment>', 'Source environment name')
  .requiredOption('--target-env <environment>', 'Target environment name')
  .action(async (options: { sourceEnv: string; targetEnv: string }) => {
    const validatedSourceEnv = envSchema.parse(options.sourceEnv)
    const validatedTargetEnv = envSchema.parse(options.targetEnv)
    await promoteImage(validatedSourceEnv, validatedTargetEnv)
  })

program.parse()
