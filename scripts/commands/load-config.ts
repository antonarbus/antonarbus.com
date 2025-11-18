import { logger } from '../lib/logger'
import { configLoader } from '../lib/config'
import type { Environment } from '../types'

export async function loadConfig(environment: Environment): Promise<void> {
  if (!environment) {
    logger.error('Environment parameter is required')
    logger.error('Usage: load-config <environment>')
    logger.error('Available environments: prod, pilot, test, dev')
    process.exit(1)
  }

  logger.info(`Loading config for environment: ${environment}`)

  try {
    const config = configLoader.loadConfig(environment)

    // Output as KEY=value format for GitHub Actions to append to GITHUB_ENV
    const envVars = configLoader.exportAsEnvVars(config)

    // Output to stdout so GitHub Actions can capture it
    console.log(envVars)

    logger.plain('')
    logger.success('Config loaded successfully')
  } catch (error) {
    logger.error(`Failed to load config: ${error}`)
    process.exit(1)
  }
}
