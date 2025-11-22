import { gcp } from '../lib/gcp'
import { sharedConfigVariables } from '../../config/configVariables'

export const setupGcp = async (): Promise<void> => {
  const projectId = sharedConfigVariables.projectId

  await gcp.setProject(projectId)
  await gcp.ensureAPIsEnabled(projectId)
}
