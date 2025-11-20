import { logger, githubOutput } from '../lib/output'
import { gcp } from '../lib/gcp'
import { sharedConfigVariables, configVariables, Env } from '../../config/configVariables'

export async function deployCloudRun(env: Env): Promise<void> {
  // Get environment-specific config
  const config = configVariables[env]
  const serviceName = config.cloudRunServiceName

  // Use shared config for common values
  const { region, projectId, artifactRegistryName, dockerImageName } = sharedConfigVariables

  // Use environment name as the docker image tag
  const dockerImageTag = env

  // Construct the image URL
  const imageUrl = `${region}-docker.pkg.dev/${projectId}/${artifactRegistryName}/${dockerImageName}:${dockerImageTag}`

  // Capture current image for potential rollback
  logger.info('Capturing current image for rollback capability...')
  const previousImage = await gcp.getCurrentCloudRunImage(serviceName, region, projectId)

  logger.info(`  Previous image: ${previousImage || 'none'}`)

  // Export for use in verify-deployment
  if (previousImage) {
    githubOutput({ PREVIOUS_IMAGE: previousImage })
  }

  // Deploy to Cloud Run
  await gcp.updateCloudRunService(serviceName, imageUrl, region, projectId)
}
