import { logger } from '../lib/logger'
import { gcp } from '../lib/gcp'

export async function setupGcp(): Promise<void> {
  const projectId = process.env.PROJECT_ID

  if (!projectId) {
    logger.error('PROJECT_ID environment variable not set')
    process.exit(1)
  }

  await gcp.setProject(projectId)
  await gcp.ensureAPIsEnabled(projectId)
}
