import { configLoader } from '../lib/config'
import { Env } from '/config/configVariables'
import { logger } from '../lib/output'

export async function loadConfig(env: Env): Promise<void> {
  logger.info(`Loading config for environment: ${env}`)

  try {
    // Use silent mode to suppress logger output to stdout
    const config = configLoader.loadConfig(env, true)

    // Output as KEY=value format for GitHub Actions to stdout
    const envVars = configLoader.exportAsEnvVars(config)

    // Output ONLY the env vars to stdout (no extra messages)
    console.log(envVars)

    logger.success('Config loaded successfully')
  } catch (error) {
    logger.error(`Failed to load config: ${error}`)
    process.exit(1)
  }
}
