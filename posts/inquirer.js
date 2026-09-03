'use client'

import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'inquirer',
  date: '2026.09.03',
  tags: ['node', 'tools'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'CLI prompts in Node — native readline vs the inquirer package',
  body: (
    <>
      <H>Prompt</H>

      <ul>
        <li>
          <code>inquirer</code> is a Node.js package that provides common interactive command-line
          prompts — text input, lists, checkboxes, confirmations — instead of building them by hand
        </li>
        <li>
          <Lnk path="https://github.com/SBoudrias/Inquirer.js">
            https://github.com/SBoudrias/Inquirer.js
          </Lnk>
        </li>
      </ul>

      <Hs>
        Native <code>stdin</code> way
      </Hs>

      <Code block jsx>{`
        const readline = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        readline.question(\`What's your name?\`, name => {
          console.log(\`Hi \${name}!\`);
          readline.close();
        });
      `}</Code>

      <Hs>
        With <code>inquirer</code> package
      </Hs>

      <ul>
        <li>
          A more complete and abstract solution is provided by the{' '}
          <Lnk path="https://www.npmjs.com/package/inquirer">Inquirer.js</Lnk> package.
        </li>
        <li>
          It is even mentioned on the{' '}
          <Lnk path="https://nodejs.dev/en/learn/accept-input-from-the-command-line-in-nodejs/">
            Node.js website
          </Lnk>
        </li>
      </ul>

      <Code block jsx>{`
        const inquirer = require('inquirer');

        const questions = [
          {
            type: 'input',
            name: 'name',
            message: "What's your name?",
          },
        ];

        inquirer.prompt(questions).then(answers => {
          console.log(\`Hi \${answers.name}!\`);
        });
      `}</Code>

      <ul>
        <li>Used it ones to create a selection list</li>
      </ul>

      <Code block jsx>{`
        const inquirer = require('inquirer')

        const devDeploy = async () => {
          const lambdaDirs = await getLambdaDirs()

          const { dirs } = await inquirer.prompt([{
            type: 'checkbox',
            message: 'Lambdas',
            name: 'dirs',
            prefix: '\n',
            pageSize: 30,
            loop: false,
            choices: lambdaDirs.map(lambdaDir => ({ name: lambdaDir, checked: true }))
          }])

          const { actions } = await inquirer.prompt([{
            type: 'checkbox',
            message: 'Actions',
            name: 'actions',
            prefix: '\n',
            choices: [
              { name: 'lint', checked: true },
              { name: 'npm ci', checked: true },
              { name: 'test', checked: true },
              { name: 'zip', checked: true },
              { name: 'zip to desktop', checked: false },
              { name: 're-deploy template', checked: true }
            ]
          }])

          if (actions.includes('lint')) {
            await lint()
          }

          if (actions.includes('npm ci')) {
            await npmCi({ dirs })
          }

          if (actions.includes('test')) {
            await test({ dirs })
          }

          if (actions.includes('zip')) {
            await zip({ dirs })
          }

          if (actions.includes('zip to desktop')) {
            await zipToDesktop({ dirs })
          }

          if (actions.includes('re-deploy template')) {
            await builtTemplateYaml()
            const packageName = await getPackageName()
            await packagedTemplateYaml({ packageName })
            deploy({ packageName })
          }
        }
      `}</Code>
    </>
  )
}

export default postObj

export const post = {
  title: postObj.title,
  date: postObj.date,
  tags: postObj.tags,
  desc: postObj.desc,
  imgUrl: postObj.imgUrl || null,
  bodyStr: jsxToStr(postObj.body)
}
