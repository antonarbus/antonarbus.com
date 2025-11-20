import { Env, allowedPromotionPath, allowedPromotionPathSchema } from '/config/configVariables'
import { exit } from 'process'

type Props = {
  sourceEnv: Env
  targetEnv: Env
}

export function validatePromotion(props: Props): void {
  const validationResult = allowedPromotionPathSchema.safeParse(
    `${props.sourceEnv}-${props.targetEnv}`
  )

  if (!validationResult.success) {
    console.error(`❌ Invalid promotion path: ${props.sourceEnv} → ${props.targetEnv}`)

    console.error(
      `Allowed promotion paths: ${allowedPromotionPath.map((p) => p.replace('-', '→')).join(', ')}`
    )

    exit(1)
  }

  console.log(`✅ Valid promotion path: ${props.sourceEnv} → ${props.targetEnv}`)
}
