#!/usr/bin/env bun
import { Command } from 'commander'
import { detectEnvironment } from './commands/detect-env'
import { validate } from './commands/validate'
import { loadConfig } from './commands/load-config'
import { detectChanges } from './commands/detect-changes'
import { setupGcp } from './commands/setup-gcp'
import { scanVulnerabilities } from './commands/scan-vulnerabilities'
import { deployCloudRun } from './commands/deploy-cloudrun'
import { verifyDeployment } from './commands/verify-deployment'
import { terraformApply } from './commands/terraform-apply'
import type { Environment } from './types'

const program = new Command()

program
  .name('deploy-cli')
  .description('Deployment automation for antonarbus.com')
  .version('1.0.0')

program
  .command('detect-env')
  .description('Detect deployment environment from git branch')
  .action(async () => {
    await detectEnvironment()
  })

program
  .command('validate')
  .description('Validate all config files')
  .action(async () => {
    await validate()
  })

program
  .command('load-config <environment>')
  .description('Load config for specified environment and output as env vars')
  .action(async (environment: Environment) => {
    await loadConfig(environment)
  })

program
  .command('detect-changes')
  .description('Detect what changed between commits')
  .action(async () => {
    await detectChanges()
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
  .command('terraform-apply <environment>')
  .description('Apply Terraform configuration for environment')
  .action(async (environment: Environment) => {
    await terraformApply(environment)
  })

program.parse()
