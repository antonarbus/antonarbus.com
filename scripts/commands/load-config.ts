import { configVariables, Env } from '/config/configVariables'
import { logger, githubOutput } from '../lib/output'
import { exit } from 'process'

type Props = {
  env: Env
}

export const loadConfig = async (props: Props): Promise<void> => {
  try {
    logger.info(`Loading config for environment: ${props.env}`)

    const configVariablesEnvSpecific = configVariables[props.env]
    githubOutput(configVariablesEnvSpecific)

    logger.success('Config loaded successfully')
  } catch (error) {
    logger.error(`Failed to load config: ${error}`)
    exit(1)
  }
}
