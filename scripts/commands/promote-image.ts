import { $ } from 'bun'
import { logger } from '../lib/logger'
import { githubEnv } from '../lib/github-env'

export async function promoteImage(): Promise<void> {
  // Validate required environment variables
  const requiredVars = [
    'SOURCE_ENV',
    'TARGET_ENV',
    'REGION',
    'PROJECT_ID',
    'ARTIFACT_REGISTRY_NAME',
    'DOCKER_IMAGE_NAME',
  ]

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      logger.error(`${varName} environment variable not set`)
      process.exit(1)
    }
  }

  const sourceEnv = process.env.SOURCE_ENV!
  const targetEnv = process.env.TARGET_ENV!
  const region = process.env.REGION!
  const projectId = process.env.PROJECT_ID!
  const artifactRegistryName = process.env.ARTIFACT_REGISTRY_NAME!
  const dockerImageName = process.env.DOCKER_IMAGE_NAME!

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
  githubEnv.set('PROMOTED_IMAGE_TAG', targetEnv)
  githubEnv.set('SOURCE_IMAGE_DIGEST', sourceDigest)
}
