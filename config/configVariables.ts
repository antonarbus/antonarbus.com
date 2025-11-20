import z from 'zod'

/**
 * - This file is the authoritative source for all environment configs.
 * - The .tfvars files are GENERATED from this file by `bun run generate-tfvars.ts`
 */

export const sharedConfigVariables = {
  projectId: 'antonarbus',
  projectNumber: '850593405209',
  region: 'us-central1',
  bucketForTerraformStateName: 'antonarbus-terraform-state',
  artifactRegistryName: 'docker-images',
  dockerImageName: 'web-app',
  githubActionsSaName: 'github-actions-sa',
  cloudRunSaName: 'cloud-run-sa',
  minInstances: '0',
  maxInstances: '5',
  cpuLimit: '1',
  memoryLimit: '512Mi',
  containerPort: '8080'
} as const

export const configVariables = {
  prod: {
    ...sharedConfigVariables,
    cloudRunServiceName: 'web-app-prod',
    customDomain: 'antonarbus.com'
  },
  pilot: {
    ...sharedConfigVariables,
    cloudRunServiceName: 'web-app-pilot',
    customDomain: 'pilot.antonarbus.com'
  },
  test: {
    ...sharedConfigVariables,
    cloudRunServiceName: 'web-app-test',
    customDomain: 'test.antonarbus.com'
  },
  dev: {
    ...sharedConfigVariables,
    cloudRunServiceName: 'web-app-dev',
    customDomain: 'dev.antonarbus.com'
  }
} as const

export const envSchema = z.enum(['dev', 'test', 'pilot', 'prod'])
export type Env = z.infer<typeof envSchema>

export type ConfigVariables = (typeof configVariables)[keyof typeof configVariables]

export const allowedPromotionPath = ['dev-test', 'test-pilot', 'pilot-prod'] as const

export const allowedPromotionPathSchema = z.enum(allowedPromotionPath)
