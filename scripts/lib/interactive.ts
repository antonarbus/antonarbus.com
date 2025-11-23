import { select } from '@inquirer/prompts'
import { Env } from '/config/configVariables'
import { generateTfvars } from '../commands/generate-tfvars'
import { showDeploymentInfo } from '../commands/show-deployment-info'
import { terraformApply } from '../commands/terraform-apply'

type Command = {
  name: string
  description: string
  requiresEnv: boolean
  action: (env?: Env) => Promise<void>
}

const commands: Command[] = [
  {
    name: 'generate-tfvars',
    description: 'Generate .tfvars files from TypeScript config',
    requiresEnv: false,
    action: async () => generateTfvars()
  },
  {
    name: 'show-deployment-info',
    description: 'Show what is currently deployed',
    requiresEnv: true,
    action: async (env?: Env) => {
      if (!env) throw new Error('Environment required')
      await showDeploymentInfo({ env })
    }
  },
  {
    name: 'terraform-apply',
    description: 'Apply infrastructure changes',
    requiresEnv: true,
    action: async (env?: Env) => {
      if (!env) throw new Error('Environment required')
      await terraformApply({ env })
    }
  }
]

export async function runInteractiveMode(): Promise<void> {
  const selectedCommand = await select({
    message: 'Select a command:',
    choices: [
      ...commands.map((cmd) => ({
        name: `${cmd.name} - ${cmd.description}`,
        value: cmd.name,
        description: cmd.description
      })),
      {
        name: 'Exit',
        value: 'exit',
        description: 'Exit without running a command'
      }
    ]
  })

  if (selectedCommand === 'exit') {
    console.log('Goodbye!')
    process.exit(0)
  }

  const command = commands.find((cmd) => cmd.name === selectedCommand)
  if (!command) {
    throw new Error(`Command not found: ${selectedCommand}`)
  }

  let env: Env | undefined

  if (command.requiresEnv) {
    env = (await select({
      message: 'Select environment:',
      choices: [
        { name: 'dev', value: 'dev' },
        { name: 'test', value: 'test' },
        { name: 'pilot', value: 'pilot' },
        { name: 'prod', value: 'prod' }
      ]
    })) as Env
  }

  await command.action(env)
}
