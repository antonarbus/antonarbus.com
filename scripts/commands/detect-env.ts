import { getCurrentGitBranchName } from '../lib/git'
import { Env } from '/config/configVariables'
import { logger, githubOutput } from '../lib/output'
import { exit } from 'process'

export const detectEnvironment = async (): Promise<Env> => {
  const branchName = await getCurrentGitBranchName()

  // Master branch always deploys to 'dev' github environment
  // Other environments are reached via promotion workflow at GitHub, not direct push
  if (['master', 'main'].includes(branchName) === true) {
    const env: Env = 'dev'

    logger.info(`Environment: ${env} (from branch: ${branchName})`)
    logger.success('Environment detection complete')
    githubOutput({ env })

    return env
  }

  logger.error(`Only master/main branch triggers deployment to dev environment`)
  logger.error(`Current branch: ${branchName}`)
  logger.error('Use the Promote Release workflow at GitHub to deploy to other environments')
  exit(1)
}
