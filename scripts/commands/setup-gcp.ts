import { gcloud } from '../lib/gcloud'
import { sharedConfigVariables } from '../../config/configVariables'

export const setupGcp = async (): Promise<void> => {
  await gcloud.setProject(sharedConfigVariables.projectId)
}
