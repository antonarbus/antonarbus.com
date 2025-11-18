/**
 * ==============================================================================
 * SINGLE SOURCE OF TRUTH FOR ALL ENVIRONMENT CONFIGURATIONS
 * ==============================================================================
 *
 * This TypeScript file is the authoritative source for all environment configs.
 * The .tfvars files are GENERATED from this file.
 *
 * Benefits:
 * - Full TypeScript type safety with literal types
 * - Single source of truth (no duplication)
 * - IDE autocomplete and type checking
 * - Can't have config drift between environments
 *
 * To regenerate .tfvars files after editing:
 *   bun run generate-tfvars
 *
 * ==============================================================================
 */

export const configs = {
  dev: {
    projectId: 'antonarbus',
    projectNumber: '850593405209',
    region: 'us-central1',
    bucketForTerraformStateName: 'antonarbus-terraform-state',
    artifactRegistryName: 'docker-images',
    cloudRunServiceName: 'web-app-dev',
    dockerImageName: 'web-app',
    githubActionsSaName: 'github-actions-sa',
    cloudRunSaName: 'cloud-run-sa',
    minInstances: '0',
    maxInstances: '5',
    cpuLimit: '1',
    memoryLimit: '512Mi',
    containerPort: '8080',
    customDomain: 'dev.antonarbus.com'
  },
  test: {
    projectId: 'antonarbus',
    projectNumber: '850593405209',
    region: 'us-central1',
    bucketForTerraformStateName: 'antonarbus-terraform-state',
    artifactRegistryName: 'docker-images',
    cloudRunServiceName: 'web-app-test',
    dockerImageName: 'web-app',
    githubActionsSaName: 'github-actions-sa',
    cloudRunSaName: 'cloud-run-sa',
    minInstances: '0',
    maxInstances: '10',
    cpuLimit: '1',
    memoryLimit: '512Mi',
    containerPort: '8080',
    customDomain: 'test.antonarbus.com'
  },
  pilot: {
    projectId: 'antonarbus',
    projectNumber: '850593405209',
    region: 'us-central1',
    bucketForTerraformStateName: 'antonarbus-terraform-state',
    artifactRegistryName: 'docker-images',
    cloudRunServiceName: 'web-app-pilot',
    dockerImageName: 'web-app',
    githubActionsSaName: 'github-actions-sa',
    cloudRunSaName: 'cloud-run-sa',
    minInstances: '0',
    maxInstances: '50',
    cpuLimit: '1',
    memoryLimit: '512Mi',
    containerPort: '8080',
    customDomain: 'pilot.antonarbus.com'
  },
  prod: {
    projectId: 'antonarbus',
    projectNumber: '850593405209',
    region: 'us-central1',
    bucketForTerraformStateName: 'antonarbus-terraform-state',
    artifactRegistryName: 'docker-images',
    cloudRunServiceName: 'web-app-prod',
    dockerImageName: 'web-app',
    githubActionsSaName: 'github-actions-sa',
    cloudRunSaName: 'cloud-run-sa',
    minInstances: '0',
    maxInstances: '100',
    cpuLimit: '1',
    memoryLimit: '512Mi',
    containerPort: '8080',
    customDomain: 'antonarbus.com'
  }
} as const

// Export the config type (now with literal types!)
export type Config = (typeof configs)[keyof typeof configs]
export type Environment = keyof typeof configs
