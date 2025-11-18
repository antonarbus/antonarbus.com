import { logger } from '../lib/logger'
import { githubEnv } from '../lib/github-env'
import { git } from '../lib/git'
import type { Environment } from '../types'

export async function detectEnvironment(): Promise<Environment> {
  const branch = await git.getCurrentBranch()

  // Master branch always deploys to dev
  // Other environments are reached via promotion workflow at GitHub, not direct push
  if (branch === 'master' || branch === 'main') {
    const environment: Environment = 'dev'

    logger.info(`Environment: ${environment} (from branch: ${branch})`)

    // Export ENVIRONMENT to GITHUB_ENV
    githubEnv.set('ENVIRONMENT', environment)

    logger.success('Environment detection complete')

    return environment
  }

  logger.error(`Only master/main branch triggers deployment to dev environment`)
  logger.error(`Current branch: ${branch}`)
  logger.error('Use the Promote Release workflow at GitHub to deploy to other environments')
  process.exit(1)
}
