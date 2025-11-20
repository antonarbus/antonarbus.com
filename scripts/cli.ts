#!/usr/bin/env bun
import { Command } from 'commander'
import { detectEnvironment } from './commands/detect-env'
import { loadConfig } from './commands/load-config'
import { setupGcp } from './commands/setup-gcp'
import { scanVulnerabilities } from './commands/scan-vulnerabilities'
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
  .command('scan-vulnerabilities')
  .description('Scan Docker image for vulnerabilities')
  .action(async () => {
    await scanVulnerabilities()
  })

program
  .command('deploy-cloudrun')
  .description('Deploy Docker image to Cloud Run')
  .action(async () => {
    await deployCloudRun()
  })

program
  .command('verify-deployment')
  .description('Verify Cloud Run deployment')
  .action(async () => {
    await verifyDeployment()
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
  .command('promote-image')
  .description('Promote Docker image from source to target environment')
  .action(async () => {
    await promoteImage()
  })

program
  .command('validate-promotion')
  .description('Validate promotion path between environments')
  .requiredOption('--source <environment>', 'Source environment name')
  .requiredOption('--target <environment>', 'Target environment name')
  .action((options: { source: string; target: string }) => {
    const validatedSourceEnv = envSchema.parse(options.source)
    const validatedTargetEnv = envSchema.parse(options.target)
    validatePromotion({ sourceEnv: validatedSourceEnv, targetEnv: validatedTargetEnv })
  })

program.parse()
