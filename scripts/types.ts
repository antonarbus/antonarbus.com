export interface VulnerabilitySummary {
  critical: number
  high: number
  medium: number
  low: number
}

export interface GitHubEnv {
  set(key: string, value: string): void
  append(key: string, value: string): void
}
