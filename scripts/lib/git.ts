import { $ } from 'bun'
import { logger } from './logger'

export const git = {
  async getCurrentBranch(): Promise<string> {
    // In GitHub Actions, use GITHUB_REF_NAME, otherwise use git command
    if (process.env.GITHUB_REF_NAME) {
      return process.env.GITHUB_REF_NAME
    }

    const result = await $`git rev-parse --abbrev-ref HEAD`.text()
    return result.trim()
  },

  async hasCommit(ref: string): Promise<boolean> {
    try {
      await $`git rev-parse ${ref}`.quiet()
      return true
    } catch {
      return false
    }
  },

  async getChangedFiles(fromRef: string, toRef: string): Promise<string[]> {
    const result = await $`git diff --name-only ${fromRef} ${toRef}`.text()
    return result.trim().split('\n').filter(Boolean)
  },

  async listChangedFiles(): Promise<string[]> {
    logger.plain('Files changed (between current and previous commit):')
    const files = await this.getChangedFiles('HEAD~1', 'HEAD')
    files.forEach(file => logger.plain(file))
    logger.plain('')
    return files
  },

  async hasTerraformChanges(files: string[]): Promise<boolean> {
    return files.some(file =>
      file.startsWith('terraform/') ||
      file.match(/^config\/.*\.tfvars$/) ||
      file === '.github/workflows/deploy.yml'
    )
  },

  async hasAppChanges(files: string[]): Promise<boolean> {
    return files.some(file =>
      !file.startsWith('terraform/') &&
      !file.match(/^config\/.*\.tfvars$/) &&
      file !== '.github/workflows/deploy.yml'
    )
  }
}
