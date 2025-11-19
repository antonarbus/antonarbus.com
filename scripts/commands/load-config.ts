import { configLoader } from '../lib/config'
import { Env } from '/config/configVariables'

export async function loadConfig(env: Env): Promise<void> {
  if (!env) {
    console.error('❌ Error: Environment parameter is required')
    console.error('Usage: load-config <environment>')
    console.error('Available environments: prod, pilot, test, dev')
    process.exit(1)
  }

  // Send info to stderr so it doesn't interfere with stdout (GitHub Actions reads stdout)
  console.error(`📄 Loading config for environment: ${env}`)

  try {
    // Use silent mode to suppress logger output to stdout
    const config = configLoader.loadConfig(env, true)

    // Output as KEY=value format for GitHub Actions to append to GITHUB_ENV
    const envVars = configLoader.exportAsEnvVars(config)

    // Output ONLY the env vars to stdout (no extra messages)
    console.log(envVars)

    console.error('')
    console.error('✅ Config loaded successfully')
  } catch (error) {
    console.error(`❌ Failed to load config: ${error}`)
    process.exit(1)
  }
}
