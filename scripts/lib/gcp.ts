import { $ } from 'bun'
import { logger } from './output'

export const gcp = {
  /**
   * Set the default GCP project
   */
  async setProject(projectId: string): Promise<void> {
    logger.info(`Setting default GCP project: ${projectId}`)
    await $`gcloud config set project ${projectId}`
  },

  /** Check if required APIs are enabled   */
  async ensureAPIsEnabled(projectId: string): Promise<void> {
    const requiredApis = [
      'iam.googleapis.com',
      'cloudresourcemanager.googleapis.com',
      'storage.googleapis.com',
      'containerscanning.googleapis.com'
    ]

    // Check if all required APIs are already enabled
    try {
      const result =
        await $`gcloud services list --enabled --project=${projectId} --format=value(name)`.text()

      const enabledApis = result.trim().split('\n')

      const allEnabled = requiredApis.every((api) => enabledApis.includes(api))

      if (allEnabled) {
        logger.success('All required APIs already enabled')
        return
      }

      logger.info('Some APIs need to be enabled')
    } catch (error) {
      logger.warning('Could not check API status, will attempt to enable anyway')
    }

    logger.info('Enabling required Google Cloud APIs...')
    await $`gcloud services enable ${requiredApis.join(' ')} --project=${projectId}`

    logger.success('GCP APIs enabled')
  },

  /**
   * Check if Terraform state exists for an environment
   */
  async checkTerraformStateExists(bucket: string, environment: string): Promise<boolean> {
    const statePath = `gs://${bucket}/terraform/state/${environment}.tfstate`

    try {
      await $`gcloud storage objects describe ${statePath} --format=value(name)`.quiet()
      return true
    } catch {
      return false
    }
  },

  /**
   * Configure Docker authentication for Artifact Registry
   */
  async configureDockerAuth(region: string): Promise<void> {
    logger.info('Configuring Docker authentication for Artifact Registry...')
    await $`gcloud auth configure-docker ${region}-docker.pkg.dev`
    logger.success('Docker authentication configured')
  },

  /**
   * Update Cloud Run service with new image
   */
  async updateCloudRunService(
    serviceName: string,
    imageUrl: string,
    region: string,
    projectId: string
  ): Promise<void> {
    logger.info('Deploying Docker image to Cloud Run...')
    logger.info(`  Service: ${serviceName}`)
    logger.info(`  Region: ${region}`)
    logger.info(`  Project: ${projectId}`)
    logger.info(`  Image: ${imageUrl}`)
    logger.emptyLine()

    await $`gcloud run services update ${serviceName} --image ${imageUrl} --region ${region} --project ${projectId}`

    logger.emptyLine()
    logger.success('Docker image deployed to Cloud Run successfully')
  },

  /**
   * Get current image of Cloud Run service
   */
  async getCurrentCloudRunImage(
    serviceName: string,
    region: string,
    projectId: string
  ): Promise<string | null> {
    try {
      const format = 'value(spec.template.spec.containers[0].image)'

      const result =
        await $`gcloud run services describe ${serviceName} --region ${region} --project ${projectId} --format=${format}`.text()

      return result.trim() || null
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.warning(`Could not retrieve current image: ${errorMessage}`)
      return null
    }
  },

  /**
   * Get Cloud Run service URL
   */
  async getCloudRunServiceUrl(
    serviceName: string,
    region: string,
    projectId: string
  ): Promise<string> {
    const result =
      await $`gcloud run services describe ${serviceName} --region ${region} --project ${projectId} --format=json`.json()
    return result.status.url
  },

  /**
   * Rollback Cloud Run service to previous image
   */
  async rollbackCloudRunService(
    serviceName: string,
    previousImage: string,
    region: string,
    projectId: string
  ): Promise<void> {
    logger.warning('Attempting rollback to previous image...')
    logger.info(`  Rolling back to: ${previousImage}`)

    await $`gcloud run services update ${serviceName} --image ${previousImage} --region ${region} --project ${projectId}`

    logger.success('Rollback successful')
  }
}
