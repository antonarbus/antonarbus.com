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

  // Print section header
  logger.section(`${props.env.toUpperCase()}`)

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
      // Tag is environment name, try to get digest and find SHA tag
      try {
        logger.info(`Looking for git SHA tag for image: ${imageUrl}`)

        // Get the digest of the current deployed image
        const digestFormat = 'value(image_summary.digest)'
        const digestOutput =
          await $`gcloud artifacts docker images describe ${imageUrl} --project=${projectId} --format=${digestFormat}`.text()
        const digest = digestOutput.trim()
        logger.info(`Image digest: ${digest}`)

        // Now find all tags that point to this same digest
        const baseImageUrl = imageUrl.split(':')[0]
        logger.info(`Base image URL: ${baseImageUrl}`)

        const listFormat = 'json'
        const listOutput =
          await $`gcloud artifacts docker images list ${baseImageUrl} --project=${projectId} --include-tags --format=${listFormat}`.text()

        logger.info(`Found ${listOutput.length} chars of JSON output`)

        const images = JSON.parse(listOutput)
        logger.info(`Parsed ${images.length} images from registry`)

        // Find the image with matching digest and extract its tags
        for (const image of images) {
          logger.info(`Checking image with digest: ${image.digest}`)
          if (image.digest === digest && image.tags) {
            logger.info(`Found matching image with tags: ${image.tags.join(', ')}`)
            // Look for a git SHA tag (40 hex chars)
            gitSha = image.tags.find((t: string) => t.match(/^[0-9a-f]{40}$/)) || null
            if (gitSha) {
              logger.info(`Found git SHA: ${gitSha}`)
              break
            }
          }
        }

        if (!gitSha) {
          logger.warning('No git SHA tag found in any image')
        }
      } catch (error) {
        logger.error(`Error fetching git SHA: ${error}`)
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
