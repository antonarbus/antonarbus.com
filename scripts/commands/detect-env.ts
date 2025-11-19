import { logger } from '../lib/logger'
import { githubEnv } from '../lib/github-env'
import { git } from '../lib/git'
import { Env } from '/config/configVariables'

export async function detectEnvironment(): Promise<Env> {
  const branch = await git.getCurrentBranch()

  // Master branch always deploys to dev
  // Other environments are reached via promotion workflow at GitHub, not direct push
  if (branch === 'master' || branch === 'main') {
    const env: Env = 'dev'

    logger.info(`Environment: ${env} (from branch: ${branch})`)

    // Export ENVIRONMENT to GITHUB_ENV
    githubEnv.set('ENVIRONMENT', env)

    logger.success('Environment detection complete')

    return env
  }

  logger.error(`Only master/main branch triggers deployment to dev environment`)
  logger.error(`Current branch: ${branch}`)
  logger.error('Use the Promote Release workflow at GitHub to deploy to other environments')
  process.exit(1)
}
