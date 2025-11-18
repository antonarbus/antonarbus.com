import { readFileSync } from 'fs'
import { resolve } from 'path'
import { z } from 'zod'
import { logger } from './logger'
import type { Config, Environment } from '../types'

const ConfigSchema = z.object({
  project_id: z.string(),
  project_number: z.string().optional(),
  region: z.string(),
  bucket_for_terraform_state_name: z.string(),
  artifact_registry_name: z.string(),
  cloud_run_service_name: z.string(),
  docker_image_name: z.string(),
  github_actions_sa_name: z.string(),
  cloud_run_sa_name: z.string(),
  min_instances: z.string(),
  max_instances: z.string(),
  cpu_limit: z.string(),
  memory_limit: z.string(),
  container_port: z.string(),
  custom_domain: z.string(),
})

export class ConfigLoader {
  private configDir: string

  constructor() {
    // Assuming scripts are in /scripts and config is in /config
    this.configDir = resolve(__dirname, '../../config')
  }

  /**
   * Parse a .tfvars file and return key-value pairs
   */
  private parseTfvars(content: string): Record<string, string> {
    const result: Record<string, string> = {}

    const lines = content.split('\n')
    for (const line of lines) {
      const trimmed = line.trim()

      // Skip comments and empty lines
      if (!trimmed || trimmed.startsWith('#')) continue

      // Check if line contains assignment
      if (!trimmed.includes('=')) continue

      const [key, ...valueParts] = trimmed.split('=')
      const trimmedKey = key.trim()
      let value = valueParts.join('=').trim()

      // Remove inline comments
      const commentIndex = value.indexOf('#')
      if (commentIndex !== -1) {
        // Only remove comment if it's outside quotes
        const beforeComment = value.substring(0, commentIndex)
        if (beforeComment.includes('"') && beforeComment.lastIndexOf('"') < commentIndex) {
          value = beforeComment.trim()
        }
      }

      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1)
      }

      result[trimmedKey] = value
    }

    return result
  }

  /**
   * Load and validate config for a specific environment
   * @param silent - If true, suppress logging (used by load-config command)
   */
  loadConfig(env: Environment, silent = false): Config {
    const configPath = resolve(this.configDir, `${env}.tfvars`)

    if (!silent) {
      logger.info(`Loading config from: ${configPath}`)
    }

    try {
      const content = readFileSync(configPath, 'utf-8')
      const parsed = this.parseTfvars(content)

      // Validate with Zod
      const validated = ConfigSchema.parse(parsed)

      // Convert snake_case to camelCase
      const config: Config = {
        projectId: validated.project_id,
        projectNumber: validated.project_number,
        region: validated.region,
        bucketForTerraformStateName: validated.bucket_for_terraform_state_name,
        artifactRegistryName: validated.artifact_registry_name,
        cloudRunServiceName: validated.cloud_run_service_name,
        dockerImageName: validated.docker_image_name,
        githubActionsSaName: validated.github_actions_sa_name,
        cloudRunSaName: validated.cloud_run_sa_name,
        minInstances: validated.min_instances,
        maxInstances: validated.max_instances,
        cpuLimit: validated.cpu_limit,
        memoryLimit: validated.memory_limit,
        containerPort: validated.container_port,
        customDomain: validated.custom_domain,
      }

      if (!silent) {
        logger.success('Config loaded and validated successfully')
      }
      return config
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error('Config validation failed:')
        error.errors.forEach(err => {
          logger.error(`  ${err.path.join('.')}: ${err.message}`)
        })
      } else {
        logger.error(`Failed to load config: ${error}`)
      }
      throw error
    }
  }

  /**
   * Validate a config file
   */
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
      `CUSTOM_DOMAIN=${cleanValue(config.customDomain)}`,
    ].filter(Boolean)

    return envVars.join('\n')
  }
}

export const configLoader = new ConfigLoader()
