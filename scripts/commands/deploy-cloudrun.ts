import { logger } from '../lib/logger'
import { githubEnv } from '../lib/github-env'
import { gcp } from '../lib/gcp'

export async function deployCloudRun(): Promise<void> {
  // Validate required environment variables
  const requiredVars = [
    'CLOUD_RUN_SERVICE_NAME',
    'REGION',
    'PROJECT_ID',
    'ARTIFACT_REGISTRY_NAME',
    'DOCKER_IMAGE_NAME',
    'DOCKER_IMAGE_TAG',
  ]

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      logger.error(`${varName} environment variable not set`)
      process.exit(1)
    }
  }

  const serviceName = process.env.CLOUD_RUN_SERVICE_NAME!
  const region = process.env.REGION!
  const projectId = process.env.PROJECT_ID!
  const artifactRegistryName = process.env.ARTIFACT_REGISTRY_NAME!
  const dockerImageName = process.env.DOCKER_IMAGE_NAME!
  const dockerImageTag = process.env.DOCKER_IMAGE_TAG!

  // Construct the image URL
  const imageUrl = `${region}-docker.pkg.dev/${projectId}/${artifactRegistryName}/${dockerImageName}:${dockerImageTag}`

  // Capture current image for potential rollback
  logger.info('Capturing current image for rollback capability...')
  const previousImage = await gcp.getCurrentCloudRunImage(serviceName, region, projectId)

  logger.info(`  Previous image: ${previousImage || 'none'}`)

  // Export for use in verify-deployment
  if (previousImage) {
    githubEnv.set('PREVIOUS_IMAGE', previousImage)
  }

  logger.plain('')

  // Deploy to Cloud Run
  await gcp.updateCloudRunService(serviceName, imageUrl, region, projectId)
}
