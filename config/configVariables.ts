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
  githubRepository: 'antonarbus/antonarbus.com',
  bucketForTerraformStateName: 'antonarbus-terraform-state',
  region: 'us-central1',
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
    cloudRunServiceName: `web-app-${envName.prod}`,
    customDomain: DOMAIN,
    environment: envName.prod
  },
  [envName.pilot]: {
    ...sharedConfigVariables,
    cloudRunServiceName: `web-app-${envName.pilot}`,
    customDomain: `${envName.pilot}.${DOMAIN}`,
    environment: envName.pilot
  },
  [envName.test]: {
    ...sharedConfigVariables,
    cloudRunServiceName: `web-app-${envName.test}`,
    customDomain: `${envName.test}.${DOMAIN}`,
    environment: envName.test
  },
  [envName.dev]: {
    ...sharedConfigVariables,
    cloudRunServiceName: `web-app-${envName.dev}`,
    customDomain: `${envName.dev}.${DOMAIN}`,
    environment: envName.dev
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
