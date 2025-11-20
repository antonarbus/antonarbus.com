/**
 * Output utilities for CLI commands
 *
 * All logs go to stderr (for human-readable messages)
 * GitHub Actions outputs go to stdout (for machine-readable data)
 */

/** Real-time logs to stderr (won't interfere with stdout) */
export const logger = {
  info: (message: string): void => {
    console.error(`ℹ️  ${message}`)
  },

  success: (message: string): void => {
    console.error(`✅ ${message}`)
  },

  error: (message: string): void => {
    console.error(`❌ ${message}`)
  },

  warning: (message: string): void => {
    console.error(`⚠️  ${message}`)
  }
}

/**
  GitHub Actions output to stdout(key = value pairs)
  @example githubOutput({ ENVIRONMENT: 'dev' })
*/
export function githubOutput(outputs: Record<string, string | number | boolean>): void {
  Object.entries(outputs).forEach(([key, value]) => {
    console.log(`${key}=${value}`)
  })
}
