/**
 * - This file is the authoritative source for all environment configs.
 * - The .tfvars files are GENERATED from this file by `bun run generate-tfvars.ts`
 */

const prodConfigVariables = {
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
  containerPort: '8080',
  cloudRunServiceName: 'web-app',
  customDomain: 'antonarbus.com'
} as const

export const configVariables = {
  dev: {
    ...prodConfigVariables,
    cloudRunServiceName: 'web-app-dev',
    customDomain: 'dev.antonarbus.com'
  },
  test: {
    ...prodConfigVariables,
    cloudRunServiceName: 'web-app-test',
    customDomain: 'test.antonarbus.com'
  },
  pilot: {
    ...prodConfigVariables,
    cloudRunServiceName: 'web-app-pilot',
    customDomain: 'pilot.antonarbus.com'
  },
  prod: prodConfigVariables
} as const

export type Env = keyof typeof configVariables
export type ConfigVariables = (typeof configVariables)[keyof typeof configVariables]
