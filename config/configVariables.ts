import z from 'zod'

/**
 * - This file is the authoritative source for all environment configs.
 * - The .tfvars files are GENERATED from this file by `bun run generate-tfvars.ts`
 * - DO NOT MODIFY! Even if you do not use these stages
 */

const envName = {
  dev: 'dev',
  test: 'test',
  pilot: 'pilot',
  prod: 'prod'
} as const

/** DO NOT MODIFY! Even if you do not use these stages */
export const envSchema = z.enum([envName.dev, envName.test, envName.pilot, envName.prod])

export type Env = z.infer<typeof envSchema>

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

/** DO NOT MODIFY stages! Even if you do not use these stages */
export const configVariables = {
  [envName.prod]: {
    ...sharedConfigVariables,
    cloudRunServiceName: 'web-app-prod',
    customDomain: 'antonarbus.com'
  },
  [envName.pilot]: {
    ...sharedConfigVariables,
    cloudRunServiceName: 'web-app-pilot',
    customDomain: 'pilot.antonarbus.com'
  },
  [envName.test]: {
    ...sharedConfigVariables,
    cloudRunServiceName: 'web-app-test',
    customDomain: 'test.antonarbus.com'
  },
  [envName.dev]: {
    ...sharedConfigVariables,
    cloudRunServiceName: 'web-app-dev',
    customDomain: 'dev.antonarbus.com'
  }
} as const

export type ConfigVariables = (typeof configVariables)[keyof typeof configVariables]

/**
 * Defines which environment master/main branch deploys to
 * - For production-only repos: set to 'prod'
 * - For repos with staging: set to 'dev'
 * - MODIFY if needed!
 */
export const MASTER_DEPLOYS_TO_ENV: Env = envName.prod

/**
 * Allowed promotion paths for environments (e.g., dev→test→pilot→prod)
 *
 * NOTE: When MASTER_DEPLOYS_TO_ENV is set to 'prod' (direct master→prod workflow),
 * these promotion paths are NOT applicable and deployment happens directly from master branch.
 * All environment stages (dev, test, pilot) are kept here as a template for future use
 * and do not harm the production-only workflow.
 *
 * - DO NOT MODIFY, but can! Most likely this is correct
 */
export const allowedPromotionPath = [
  `${envName.dev}-${envName.test}`,
  `${envName.test}-${envName.pilot}`,
  `${envName.pilot}-${envName.prod}`
] as const

export const allowedPromotionPathSchema = z.enum(allowedPromotionPath)

export type AllowedPromotionPath = z.infer<typeof allowedPromotionPathSchema>
