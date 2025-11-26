import z from 'zod'

//* MODIFY
const DOMAIN = 'antonarbus.com'

/**
 * The .tfvars files are GENERATED from this file by `bun deploy-scripts/cli.ts generate-tfvars`
 * * DO NOT MODIFY, does not hurt.
 */
const envName = {
  dev: 'dev',
  test: 'test',
  pilot: 'pilot',
  prod: 'prod'
} as const

//* DO NOT MODIFY, does not hurt.
export const envSchema = z.enum([envName.dev, envName.test, envName.pilot, envName.prod])

export type Env = z.infer<typeof envSchema>

//* MODIFY
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

//* DO NOT MODIFY, does not hurt
export const configVariables = {
  [envName.prod]: {
    ...sharedConfigVariables,
    cloudRunServiceName: 'web-app-prod',
    customDomain: DOMAIN
  },
  [envName.pilot]: {
    ...sharedConfigVariables,
    cloudRunServiceName: 'web-app-pilot',
    customDomain: `pilot.${DOMAIN}`
  },
  [envName.test]: {
    ...sharedConfigVariables,
    cloudRunServiceName: 'web-app-test',
    customDomain: `test.${DOMAIN}`
  },
  [envName.dev]: {
    ...sharedConfigVariables,
    cloudRunServiceName: 'web-app-dev',
    customDomain: `dev.${DOMAIN}`
  }
} as const

export type ConfigVariables = (typeof configVariables)[keyof typeof configVariables]

/**
 * Defines which environment master/main branch deploys to
 * - For production-only repos: set to 'prod'
 * - For repos with staging: set to 'dev'
 * - If set to 'dev' and you need to push hot-fix asap, switch to 'prod'
 * * MODIFY (if needed)
 */
export const MASTER_DEPLOYS_TO_ENV: Env = envName.prod

/**
 * Allowed promotion paths for environments (e.g., dev → test → pilot → prod)
 *
 * NOTE: When MASTER_DEPLOYS_TO_ENV is set to 'prod' (direct master → prod workflow),
 * these promotion paths are NOT applicable and deployment happens directly from master branch.
 * All environment stages (dev, test, pilot) are kept here as a template for future use
 * and do not harm the production-only workflow.
 *
 * * DO NOT MODIFY, but may (most likely this is correct)
 * * If modified, then to be aligned with .github/workflows/promote.yml:12
 */
export const allowedPromotionPath = [
  `${envName.dev}-${envName.test}`,
  `${envName.test}-${envName.pilot}`,
  `${envName.pilot}-${envName.prod}`
] as const

export const allowedPromotionPathSchema = z.enum(allowedPromotionPath)

export type AllowedPromotionPath = z.infer<typeof allowedPromotionPathSchema>
