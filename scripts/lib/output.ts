import chalk from 'chalk'

/**
 * Output utilities for CLI commands
 *
 * All logs go to stderr (for human-readable messages)
 * GitHub Actions outputs go to stdout (for machine-readable data)
 */

/** Real-time logs to stderr (won't interfere with stdout) */
export const logger = {
  info: (message: string): void => {
    console.error(chalk.blue(`ℹ ${message}`))
  },

  success: (message: string): void => {
    console.error(chalk.green(`✓ ${message}`))
  },

  error: (message: string): void => {
    console.error(chalk.red(`✗ ${message}`))
  },

  warning: (message: string): void => {
    console.error(chalk.yellow(`⚠ ${message}`))
  },

  section: (message: string): void => {
    console.error('\n' + chalk.bold(message))
  },

  plain: (message: string): void => {
    console.error(message)
  },

  emptyLine: (): void => {
    console.error('')
  }
}

/**
 * - GitHub Actions output to stdout(key = value pairs)
 * - Required to pass data between steps in Github Actions workflow
 * @example githubOutput({ environment: 'dev' })
 */
export const githubOutput = (outputs: Record<string, string | number | boolean>): void => {
  Object.entries(outputs).forEach(([key, value]) => {
    console.log(`${key}=${value}`)
  })
}
