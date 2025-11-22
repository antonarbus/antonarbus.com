import { $ } from 'bun'
import { logger } from '../output'

type Props = {
  cloudRunServiceName: string
  region: string
  projectId: string
}

/** Get Cloud Run service URL */
export const getCloudRunServiceUrl = async (props: Props): Promise<string> => {
  const result =
    await $`gcloud run services describe ${props.cloudRunServiceName} --region ${props.region} --project ${props.projectId} --format=json`.json()

  return result.status.url
}
