import { $ } from 'bun'
import { logger } from '../output'

type Props = {
  projectId: string
}

/** Set the default GCP project */
export const setGoogleCloudProject = async (props: Props): Promise<void> => {
  logger.info(`Setting default GCP project: ${props.projectId}`)
  await $`gcloud config set project ${props.projectId}`
}
