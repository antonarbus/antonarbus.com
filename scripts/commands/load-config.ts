import { configVariables, Env } from '/config/configVariables'
import { logger, githubOutput } from '../lib/output'
import { exit } from 'process'

type Props = {
  env: Env
}

export const loadConfig = (props: Props): void => {
  try {
    logger.info(`Loading config for environment: ${props.env}`)
    githubOutput(configVariables[props.env])
    logger.success('Config loaded successfully')
  } catch (error) {
    logger.error(`Failed to load config: ${error}`)
    exit(1)
  }
}
