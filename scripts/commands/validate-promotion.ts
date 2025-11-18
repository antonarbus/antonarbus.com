import { logger } from '../lib/logger'

export async function validatePromotion(sourceEnv: string, targetEnv: string): Promise<void> {
  if (!sourceEnv || !targetEnv) {
    console.error('Usage: validate-promotion <source_env> <target_env>')
    process.exit(1)
  }

  // Define valid promotion paths
  const validPaths = [
    'dev-test',
    'test-pilot',
    'pilot-prod',
  ]

  const promotionPath = `${sourceEnv}-${targetEnv}`

  if (validPaths.includes(promotionPath)) {
    // Send validation message to stderr (for logs)
    console.error(`✅ Valid promotion path: ${sourceEnv} → ${targetEnv}`)

    // Output for GITHUB_OUTPUT (stdout only)
    console.log('valid=true')

    process.exit(0)
  } else {
    // Send error messages to stderr
    console.error(`❌ Invalid promotion path: ${sourceEnv} → ${targetEnv}`)
    console.error('Allowed paths: dev→test, test→pilot, pilot→prod')

    // Output for GITHUB_OUTPUT (stdout only)
    console.log('valid=false')

    process.exit(1)
  }
}
