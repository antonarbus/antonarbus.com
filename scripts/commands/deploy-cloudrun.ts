import { logger, githubOutput } from '../lib/output'
import { gcloud } from '../lib/gcloud'
import { configVariables, Env } from '../../config/configVariables'

type Props = {
  env: Env
}

export async function deployCloudRun(props: Props): Promise<void> {
  const { region, projectId, artifactRegistryName, dockerImageName, cloudRunServiceName } =
    configVariables[props.env]

  // Use environment name as the docker image tag
  const dockerImageTag = props.env

  // Construct the image URL
  const imageUrl = `${region}-docker.pkg.dev/${projectId}/${artifactRegistryName}/${dockerImageName}:${dockerImageTag}`

  // Capture current image for potential rollback
  logger.info('Capturing current image for rollback capability...')
  const previousImage = await gcloud.getCurrentCloudRunImage(cloudRunServiceName, region, projectId)

  logger.info(`  Previous image: ${previousImage || 'none'}`)

  // Export for use in verify-deployment
  if (previousImage) {
    githubOutput({ PREVIOUS_IMAGE: previousImage })
  }

  // Deploy to Cloud Run
  await gcloud.updateCloudRunService(cloudRunServiceName, imageUrl, region, projectId)
}
