import { sharedConfigVariables } from '../../config/configVariables'
import { setGoogleCloudProject } from '../lib/gcloud/setGoogleCloudProject'

export const setupGcp = async (): Promise<void> => {
  await setGoogleCloudProject({ projectId: sharedConfigVariables.projectId })
}
