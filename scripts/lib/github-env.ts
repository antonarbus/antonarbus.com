import { appendFileSync } from 'fs'
import { logger } from './logger'

export class GitHubEnv {
  private filePath: string | undefined

  constructor() {
    this.filePath = process.env.GITHUB_ENV
  }

  set(key: string, value: string): void {
    if (!this.filePath) {
      logger.warning(`GITHUB_ENV not set, would have set ${key}=${value}`)
      return
    }

    const line = `${key}=${value}\n`
    appendFileSync(this.filePath, line)
    logger.info(`Set ${key}=${value}`)
  }

  append(key: string, value: string): void {
    this.set(key, value)
  }

  isGitHubActions(): boolean {
    return !!this.filePath
  }
}

export const githubEnv = new GitHubEnv()
