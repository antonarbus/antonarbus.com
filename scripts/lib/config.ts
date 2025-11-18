import { logger } from './logger'
import type { Config, Environment } from '../types'
import { configs } from '../../config/environments'

export class ConfigLoader {

  /**
   * Load and validate config for a specific environment
   *
   * Now loads directly from TypeScript config for full type safety!
   * The .tfvars files are only used by Terraform.
   *
   * @param silent - If true, suppress logging (used by load-config command)
   */
  loadConfig(env: Environment, silent = false): Config {
    if (!silent) {
      logger.info(`Loading config for environment: ${env}`)
    }

    try {
      // Load directly from TypeScript config - single source of truth!
      const config = configs[env]

      if (!config) {
        throw new Error(`No configuration found for environment: ${env}`)
      }

      if (!silent) {
        logger.success('Config loaded successfully')
      }

      // Return the config - TypeScript ensures type safety at compile time!
      return config as Config
    } catch (error) {
      logger.error(`Failed to load config: ${error}`)
      throw error
    }
  }

  /** Validate a config exists for an environment  */
  validateConfig(env: Environment): boolean {
    try {
      this.loadConfig(env)
      return true
    } catch {
      return false
    }
  }

  /**
   * Validate all config files
   */
  validateAllConfigs(): boolean {
    const environments: Environment[] = ['dev', 'test', 'pilot', 'prod']
    let allValid = true

    logger.section('Validating all config files...')

    for (const env of environments) {
      logger.plain('')
      const isValid = this.validateConfig(env)
      if (!isValid) {
        allValid = false
      }
    }

    return allValid
  }

  /**
   * Export config as environment variables (for GitHub Actions compatibility)
   * Removes inline comments from values
   */
  exportAsEnvVars(config: Config): string {
    const cleanValue = (value: string) => {
      // Remove inline comments (everything after # including leading spaces)
      const commentIndex = value.indexOf('#')
      if (commentIndex !== -1) {
        return value.substring(0, commentIndex).trim()
      }
      return value.trim()
    }

    const envVars = [
      `PROJECT_ID=${config.projectId}`,
      config.projectNumber ? `PROJECT_NUMBER=${config.projectNumber}` : null,
      `REGION=${config.region}`,
      `BUCKET_FOR_TERRAFORM_STATE_NAME=${config.bucketForTerraformStateName}`,
      `ARTIFACT_REGISTRY_NAME=${config.artifactRegistryName}`,
      `CLOUD_RUN_SERVICE_NAME=${config.cloudRunServiceName}`,
      `DOCKER_IMAGE_NAME=${config.dockerImageName}`,
      `GITHUB_ACTIONS_SA_NAME=${config.githubActionsSaName}`,
      `CLOUD_RUN_SA_NAME=${config.cloudRunSaName}`,
      `MIN_INSTANCES=${cleanValue(config.minInstances)}`,
      `MAX_INSTANCES=${cleanValue(config.maxInstances)}`,
      `CPU_LIMIT=${cleanValue(config.cpuLimit)}`,
      `MEMORY_LIMIT=${cleanValue(config.memoryLimit)}`,
      `CONTAINER_PORT=${cleanValue(config.containerPort)}`,
      `CUSTOM_DOMAIN=${cleanValue(config.customDomain)}`
    ].filter(Boolean)

    return envVars.join('\n')
  }
}

export const configLoader = new ConfigLoader()
