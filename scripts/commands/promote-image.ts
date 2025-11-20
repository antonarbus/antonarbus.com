import { $ } from 'bun'
import { logger } from '../lib/logger'
import { githubOutput } from '../lib/output'
import { sharedConfigVariables, Env } from '../../config/configVariables'

export async function promoteImage(sourceEnv: Env, targetEnv: Env): Promise<void> {
  // Use shared config for common values
  const { region, projectId, artifactRegistryName, dockerImageName } = sharedConfigVariables

  // Construct image URLs (same registry, different tags)
  const baseImage = `${region}-docker.pkg.dev/${projectId}/${artifactRegistryName}/${dockerImageName}`
  const sourceImage = `${baseImage}:${sourceEnv}`
  const targetImage = `${baseImage}:${targetEnv}`

  logger.info('Promoting Docker image...')
  logger.info(`  Registry: ${artifactRegistryName}`)
  logger.info(`  Source tag: ${sourceEnv}`)
  logger.info(`  Target tag: ${targetEnv}`)
  logger.plain('')

  // Verify source image exists
  logger.info('Verifying source image exists...')

  try {
    await $`gcloud artifacts docker images describe ${sourceImage} --project=${projectId}`.quiet()
  } catch {
    logger.error(`Source image not found: ${sourceImage}`)
    logger.error('Make sure the source environment has been deployed first.')
    process.exit(1)
  }

  logger.success('Source image found')
  logger.plain('')

  // Get the digest (hash) of the source image for traceability
  let sourceDigest = 'unknown'
  try {
    const digestOutput = await $`gcloud artifacts docker images describe ${sourceImage} --project=${projectId} --format=value(image_summary.digest)`.text()
    sourceDigest = digestOutput.trim()
  } catch {
    logger.warning('Could not retrieve source image digest')
  }

  logger.info(`Source image digest (hash): ${sourceDigest}`)

  // Add target environment tag to the same image (no pull/push needed)
  // This is much faster than copying between registries
  logger.info('Adding target environment tag...')
  await $`gcloud artifacts docker tags add ${sourceImage} ${targetImage} --quiet`

  logger.plain('')
  logger.success('Image promoted successfully')
  logger.info(`  Source: ${sourceImage}`)
  logger.info(`  Target: ${targetImage}`)
  logger.info(`  Digest: ${sourceDigest} (same image, new tag)`)

  // Export promoted image tag for deployment step
  githubOutput({
    PROMOTED_IMAGE_TAG: targetEnv,
    SOURCE_IMAGE_DIGEST: sourceDigest,
  })
}
