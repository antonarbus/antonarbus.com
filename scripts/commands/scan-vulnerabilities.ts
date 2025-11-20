import { logger } from '../lib/logger'
import { gcp } from '../lib/gcp'
import { sharedConfigVariables } from '../../config/configVariables'
import { Env } from '../../config/configVariables'

export async function scanVulnerabilities(env: Env): Promise<void> {
  // Use shared config for common values
  const { region, projectId, artifactRegistryName, dockerImageName } = sharedConfigVariables

  // Use environment name as the docker image tag
  const dockerImageTag = env

  // Construct image URL
  const imageUrl = `${region}-docker.pkg.dev/${projectId}/${artifactRegistryName}/${dockerImageName}:${dockerImageTag}`

  logger.info('Checking vulnerability scan for image...')
  logger.info(`  Image: ${imageUrl}`)
  logger.plain('')

  // Wait for scan to complete (GCP scans asynchronously)
  logger.info('Waiting 30s for automatic vulnerability scan to complete...')
  await Bun.sleep(30000)

  const summary = await gcp.getVulnerabilityScan(imageUrl)

  if (summary) {
    logger.success('Vulnerability scan completed')
    logger.plain('')
    logger.plain(`Vulnerability breakdown:`)
    logger.plain(`  🔴 CRITICAL: ${summary.critical}`)
    logger.plain(`  🟠 HIGH:     ${summary.high}`)
    logger.plain(`  🟡 MEDIUM:   ${summary.medium}`)
    logger.plain(`  🟢 LOW:      ${summary.low}`)
    logger.plain('')

    // Check for critical vulnerabilities
    if (summary.critical > 0) {
      logger.warning(`Found ${summary.critical} CRITICAL vulnerabilities`)
      logger.plain('')
      logger.plain('View details in GCP Console:')
      logger.plain(`https://console.cloud.google.com/artifacts/docker/${projectId}/${region}/${artifactRegistryName}/${dockerImageName}`)
      logger.plain('')
      logger.plain('Note: Deployment will continue, but please review and remediate vulnerabilities')
      logger.plain('')

      // Add to GitHub Actions summary if available
      logger.summary.write('## Vulnerability Scan Results')
      logger.summary.write('')
      logger.summary.write('⚠️ **Warning**: Critical vulnerabilities detected')
      logger.summary.write('')
      logger.summary.write('| Severity | Count |')
      logger.summary.write('|----------|-------|')
      logger.summary.write(`| 🔴 Critical | ${summary.critical} |`)
      logger.summary.write(`| 🟠 High | ${summary.high} |`)
      logger.summary.write(`| 🟡 Medium | ${summary.medium} |`)
      logger.summary.write(`| 🟢 Low | ${summary.low} |`)
      logger.summary.write('')
      logger.summary.write(`[View Details in GCP Console](https://console.cloud.google.com/artifacts/docker/${projectId}/${region}/${artifactRegistryName}/${dockerImageName})`)

      // Exit with warning (0 = continue deployment, 1 = block deployment)
      // Currently set to 0 (warning only), change to 1 if you want to block on critical CVEs
      process.exit(0)
    } else {
      logger.success('No critical vulnerabilities detected')
      logger.plain('')

      logger.summary.write('## Vulnerability Scan Results')
      logger.summary.write('')
      logger.summary.write('✅ **Status**: No critical vulnerabilities')
      logger.summary.write('')
      logger.summary.write('| Severity | Count |')
      logger.summary.write('|----------|-------|')
      logger.summary.write(`| 🟠 High | ${summary.high} |`)
      logger.summary.write(`| 🟡 Medium | ${summary.medium} |`)
      logger.summary.write(`| 🟢 Low | ${summary.low} |`)

      process.exit(0)
    }
  } else {
    logger.info('Vulnerability scan not yet available')
    logger.plain('')
    logger.plain('GCP Container Analysis runs scans asynchronously.')
    logger.plain('Results will be available in a few minutes.')
    logger.plain('')
    logger.plain('Check results later in GCP Console:')
    logger.plain(`https://console.cloud.google.com/artifacts/docker/${projectId}/${region}/${artifactRegistryName}/${dockerImageName}`)
    logger.plain('')
    logger.plain('Continuing with deployment...')

    logger.summary.write('## Vulnerability Scan Results')
    logger.summary.write('')
    logger.summary.write('ℹ️ **Status**: Scan results not yet available')
    logger.summary.write('')
    logger.summary.write('Check back in a few minutes in GCP Console')

    process.exit(0)
  }
}
