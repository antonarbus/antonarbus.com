import { logger } from '../lib/logger'
import { configLoader } from '../lib/config'

export async function validate(): Promise<void> {
  logger.section('Validating all config files...')

  const allValid = configLoader.validateAllConfigs()

  logger.plain('')

  if (allValid) {
    logger.success('All config files are valid!')
    process.exit(0)
  } else {
    logger.error('Some config files failed validation')
    process.exit(1)
  }
}
