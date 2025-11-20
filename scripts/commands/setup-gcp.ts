import { gcp } from '../lib/gcp'
import { sharedConfigVariables } from '../../config/configVariables'

export async function setupGcp(): Promise<void> {
  const projectId = sharedConfigVariables.projectId

  await gcp.setProject(projectId)
  await gcp.ensureAPIsEnabled(projectId)
}
