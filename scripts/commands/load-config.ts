import { configVariables, Env } from '/config/configVariables'
import { logger } from '../lib/output'
import { exit } from 'process'

type Props = {
  env: Env
}

export const loadConfig = async (props: Props): Promise<void> => {
  try {
    logger.info(`Loading config for environment: ${props.env}`)
    const configVariablesEnvSpecific = configVariables[props.env]

    // Output as KEY=value format for GitHub Actions to stdout
    const envVars = [
      `PROJECT_ID=${configVariablesEnvSpecific.projectId}`,
      `PROJECT_NUMBER=${configVariablesEnvSpecific.projectNumber}`,
      `REGION=${configVariablesEnvSpecific.region}`,
      `BUCKET_FOR_TERRAFORM_STATE_NAME=${configVariablesEnvSpecific.bucketForTerraformStateName}`,
      `ARTIFACT_REGISTRY_NAME=${configVariablesEnvSpecific.artifactRegistryName}`,
      `CLOUD_RUN_SERVICE_NAME=${configVariablesEnvSpecific.cloudRunServiceName}`,
      `DOCKER_IMAGE_NAME=${configVariablesEnvSpecific.dockerImageName}`,
      `GITHUB_ACTIONS_SA_NAME=${configVariablesEnvSpecific.githubActionsSaName}`,
      `CLOUD_RUN_SA_NAME=${configVariablesEnvSpecific.cloudRunSaName}`,
      `MIN_INSTANCES=${configVariablesEnvSpecific.minInstances}`,
      `MAX_INSTANCES=${configVariablesEnvSpecific.maxInstances}`,
      `CPU_LIMIT=${configVariablesEnvSpecific.cpuLimit}`,
      `MEMORY_LIMIT=${configVariablesEnvSpecific.memoryLimit}`,
      `CONTAINER_PORT=${configVariablesEnvSpecific.containerPort}`,
      `CUSTOM_DOMAIN=${configVariablesEnvSpecific.customDomain}`
    ].join('\n')

    // Output ONLY the env vars to stdout (no extra messages)
    console.log(envVars)

    logger.success('Config loaded successfully')
  } catch (error) {
    logger.error(`Failed to load config: ${error}`)
    exit(1)
  }
}
