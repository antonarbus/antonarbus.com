import { $ } from 'bun'

export const git = {
  async getCurrentBranch(): Promise<string> {
    // In GitHub Actions, use GITHUB_REF_NAME, otherwise use git command
    if (process.env.GITHUB_REF_NAME) {
      return process.env.GITHUB_REF_NAME
    }

    const result = await $`git rev-parse --abbrev-ref HEAD`.text()
    return result.trim()
  }
}
