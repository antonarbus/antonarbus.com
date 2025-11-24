import { select } from '@inquirer/prompts'
import chalk from 'chalk'
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

export async function runInteractiveMode(): Promise<void> {
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
    },
    {
      name: 'exit',
      description: chalk.gray('Exit'),
      requiresEnv: false,
      action: async () => {
        console.log('Goodbye!')
        process.exit(0)
      }
    }
  ]

  const selectedCommand = await select({
    message: 'Select a command:\n',
    choices: commands.map((cmd) => ({
      name: cmd.description,
      value: cmd.name,
      description: cmd.description
    }))
  })

  const command = commands.find((cmd) => cmd.name === selectedCommand)!

  let env: Env | undefined

  if (command.requiresEnv) {
    env = await select({
      message: 'Select environment:',
      choices: [
        { name: 'dev', value: 'dev' },
        { name: 'test', value: 'test' },
        { name: 'pilot', value: 'pilot' },
        { name: 'prod', value: 'prod' }
      ]
    })
  }

  await command.action(env)
}
