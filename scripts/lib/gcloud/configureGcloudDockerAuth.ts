import { $ } from 'bun'
import { logger } from '../output'

type Props = {
  region: string
}

/** Configure Docker authentication for Artifact Registry */
export const configureGcloudDockerAuth = async (props: Props): Promise<void> => {
  logger.info('Configuring Docker authentication for Artifact Registry...')
  await $`gcloud auth configure-docker ${props.region}-docker.pkg.dev`
  logger.success('Docker authentication configured')
}
