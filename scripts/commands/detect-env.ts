import { git } from '../lib/git'
import { Env } from '/config/configVariables'
import { logger, githubOutput } from '../lib/output'

export async function detectEnvironment(): Promise<Env> {
  const branch = await git.getCurrentBranch()

  // Master branch always deploys to dev
  // Other environments are reached via promotion workflow at GitHub, not direct push
  if (branch === 'master' || branch === 'main') {
    const env: Env = 'dev'

    // Real-time feedback to stderr
    logger.info(`Environment: ${env} (from branch: ${branch})`)
    logger.success('Environment detection complete')

    // Output for GitHub Actions to stdout
    githubOutput({ ENVIRONMENT: env })

    return env
  }

  logger.error(`Only master/main branch triggers deployment to dev environment`)
  logger.error(`Current branch: ${branch}`)
  logger.error('Use the Promote Release workflow at GitHub to deploy to other environments')
  process.exit(1)
}
