export type Environment = 'dev' | 'test' | 'pilot' | 'prod'

export type ChangeDetection = 'terraform' | 'app' | 'both' | 'none'

export interface Config {
  projectId: string
  projectNumber?: string
  region: string
  bucketForTerraformStateName: string
  artifactRegistryName: string
  cloudRunServiceName: string
  dockerImageName: string
  githubActionsSaName: string
  cloudRunSaName: string
  minInstances: string
  maxInstances: string
  cpuLimit: string
  memoryLimit: string
  containerPort: string
  customDomain: string
}

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
