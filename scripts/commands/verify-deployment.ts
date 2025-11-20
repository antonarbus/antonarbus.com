import { logger } from '../lib/logger'
import { gcp } from '../lib/gcp'
import { sharedConfigVariables, configVariables, Env } from '../../config/configVariables'

export async function verifyDeployment(env: Env, previousImage?: string): Promise<void> {
  // Get environment-specific config
  const config = configVariables[env]
  const serviceName = config.cloudRunServiceName

  // Use shared config for common values
  const { region, projectId } = sharedConfigVariables

  logger.info('Waiting for deployment to be ready...')
  await Bun.sleep(10000)

  logger.plain('')
  logger.info('Getting service URL...')

  const url = await gcp.getCloudRunServiceUrl(serviceName, region, projectId)

  logger.info(`Testing URL: ${url}`)
  logger.plain('')

  // Test if site responds with 200 OK
  let httpCode: number

  try {
    const response = await fetch(url)
    httpCode = response.status

    if (httpCode === 200) {
      logger.success(`Site is live and responding (HTTP ${httpCode})`)
      logger.plain('')

      // Smoke tests: Verify actual content
      logger.info('Running smoke tests...')
      let smokeTestFailures = 0

      const body = await response.text()

      // Test 1: Check that response contains HTML
      logger.info('  1. Checking for HTML content...')
      if (body.toLowerCase().includes('<html') || body.toLowerCase().includes('<!doctype')) {
        logger.success('     HTML content detected')
      } else {
        logger.error('     No HTML content found')
        smokeTestFailures++
      }

      // Test 2: Check response size (should be more than 100 bytes)
      logger.info('  2. Checking response size...')
      const responseSize = body.length
      if (responseSize > 100) {
        logger.success(`     Response size: ${responseSize} bytes`)
      } else {
        logger.error(`     Response too small: ${responseSize} bytes (expected > 100)`)
        smokeTestFailures++
      }

      // Test 3: Check response time
      logger.info('  3. Checking response time...')
      const startTime = performance.now()
      await fetch(url)
      const endTime = performance.now()
      const responseTime = endTime - startTime

      logger.info(`     Response time: ${responseTime.toFixed(2)}ms`)

      if (responseTime < 10000) {
        logger.success('     Response time acceptable')
      } else {
        logger.warning('     Response time slow (> 10s)')
      }

      logger.plain('')

      if (smokeTestFailures === 0) {
        logger.success('All smoke tests passed')
        logger.plain(`🌐 Deployment URL: ${url}`)
        logger.plain('')

        logger.summary.write('## Deployment Verification')
        logger.summary.write('')
        logger.summary.write('✅ **Status**: Live and responding')
        logger.summary.write(`🌐 **URL**: ${url}`)
        logger.summary.write(`📊 **HTTP Status**: ${httpCode}`)
        logger.summary.write(`🧪 **Smoke Tests**: All passed (${responseSize} bytes, ${responseTime.toFixed(2)}ms)`)

        process.exit(0)
      } else {
        logger.error(`${smokeTestFailures} smoke test(s) failed`)
        logger.warning('Site is responding but content may be incorrect')
        logger.plain(`🌐 URL: ${url}`)
        logger.plain('')

        logger.summary.write('## Deployment Verification')
        logger.summary.write('')
        logger.summary.write('⚠️ **Status**: Responding but smoke tests failed')
        logger.summary.write(`📊 **HTTP Status**: ${httpCode}`)
        logger.summary.write(`🧪 **Smoke Tests**: ${smokeTestFailures} failed`)

        // Trigger rollback for smoke test failures
        if (previousImage && previousImage !== 'none') {
          await gcp.rollbackCloudRunService(serviceName, previousImage, region, projectId)
        }

        process.exit(1)
      }
    } else {
      logger.error(`Site returned HTTP ${httpCode}`)
      logger.plain('')

      // Attempt rollback if previous image is available
      if (previousImage && previousImage !== 'none') {
        await gcp.rollbackCloudRunService(serviceName, previousImage, region, projectId)

        logger.plain('')
        logger.info('Waiting 10s for rollback to stabilize...')
        await Bun.sleep(10000)

        // Verify rollback worked
        const rollbackResponse = await fetch(url)
        const rollbackHttpCode = rollbackResponse.status

        if (rollbackHttpCode === 200) {
          logger.success(`Service restored and responding (HTTP ${rollbackHttpCode})`)
        } else {
          logger.warning(`Rollback completed but service still not responding properly (HTTP ${rollbackHttpCode})`)
        }
      } else {
        logger.warning('No previous image available for rollback')
      }

      logger.plain('')

      logger.summary.write('## Deployment Verification')
      logger.summary.write('')
      logger.summary.write('❌ **Status**: Failed')
      logger.summary.write(`📊 **HTTP Status**: ${httpCode}`)
      logger.summary.write('')
      logger.summary.write(`Expected HTTP 200, got ${httpCode}`)

      if (previousImage && previousImage !== 'none') {
        logger.summary.write('')
        logger.summary.write('🔄 **Rollback**: Attempted to previous image')
      }

      process.exit(1)
    }
  } catch (error) {
    logger.error(`curl command failed: ${error}`)
    process.exit(1)
  }
}
