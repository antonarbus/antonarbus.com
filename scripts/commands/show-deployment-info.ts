import { $ } from 'bun'
import { configVariables, Env } from '../../config/configVariables'
import { logger } from '../lib/output/logger'

type Props = {
  env: Env
}

/**
 * Show deployment info for a specific environment
 * Displays git commit SHA and message for currently deployed image
 */
export const showDeploymentInfo = async (props: Props): Promise<void> => {
  const { region, projectId, cloudRunServiceName } = configVariables[props.env]

  try {
    // Get current image URL
    const format = 'value(spec.template.spec.containers[0].image)'
    const imageOutput =
      await $`gcloud run services describe ${cloudRunServiceName} --region ${region} --project ${projectId} --format=${format}`.text()

    const imageUrl = imageOutput.trim()

    // Extract tag from image URL (e.g., "dev" or git SHA)
    const tag = imageUrl.split(':').pop() || 'unknown'

    logger.info(`Environment: ${props.env}`)
    logger.info(`Service: ${cloudRunServiceName}`)
    logger.info(`Image tag: ${tag}`)

    // Try to find git SHA - could be the tag itself or get it from the image digest
    let gitSha: string | null = null

    // Check if tag itself is a git SHA (40 chars hex)
    if (tag.match(/^[0-9a-f]{40}$/)) {
      gitSha = tag
    } else {
      // Tag is environment name, find other tags for the same image
      try {
        const baseImageUrl = imageUrl.split(':')[0]
        const imagesOutput =
          await $`gcloud artifacts docker images list ${baseImageUrl} --project=${projectId} --format=value(tags)`.text()

        // Parse the output to find tags
        const allTags = imagesOutput
          .trim()
          .split('\n')
          .flatMap((line) => line.split(','))
          .map((t) => t.trim())

        // Find a tag that looks like a git SHA (40 hex chars)
        gitSha = allTags.find((t) => t.match(/^[0-9a-f]{40}$/)) || null
      } catch (error) {
        logger.warning('Could not fetch git SHA from image tags')
      }
    }

    // If we found a git SHA, get commit details
    if (gitSha) {
      try {
        const commitMessage = await $`git log -1 --format=%s ${gitSha}`.text()
        const commitAuthor = await $`git log -1 --format=%an ${gitSha}`.text()
        const commitDate = await $`git log -1 --format=%ar ${gitSha}`.text()

        logger.info(`Git SHA: ${gitSha.substring(0, 7)}`)
        logger.info(`Message: ${commitMessage.trim()}`)
        logger.info(`Author: ${commitAuthor.trim()}`)
        logger.info(`Date: ${commitDate.trim()}`)
      } catch {
        logger.warning('Could not fetch git commit info from repository')
      }
    } else {
      logger.warning('Could not determine git commit SHA')
    }
  } catch (error) {
    logger.error(`Failed to get deployment info for ${props.env}`)
    throw error
  }
}
