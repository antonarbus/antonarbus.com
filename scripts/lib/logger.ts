import chalk from 'chalk'

export const logger = {
  info: (message: string) => {
    console.log(chalk.blue(`ℹ ${message}`))
  },

  success: (message: string) => {
    console.log(chalk.green(`✓ ${message}`))
  },

  warning: (message: string) => {
    console.log(chalk.yellow(`⚠ ${message}`))
  },

  error: (message: string) => {
    console.error(chalk.red(`✗ ${message}`))
  },

  section: (message: string) => {
    console.log('\n' + chalk.bold(message))
  },

  plain: (message: string) => {
    console.log(message)
  },

  // For outputting to GITHUB_STEP_SUMMARY
  summary: {
    write: (content: string) => {
      if (process.env.GITHUB_STEP_SUMMARY) {
        const fs = require('fs')
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, content + '\n')
      }
    }
  }
}
