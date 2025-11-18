// Import types from the single source of truth
export type { Config, Environment } from '../config/environments'

export type ChangeDetection = 'terraform' | 'app' | 'both' | 'none'

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
