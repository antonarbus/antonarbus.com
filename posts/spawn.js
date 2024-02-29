import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'spawn',
  date: '2024.02.29',
  tags: ['node', 'terminal'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'spawn',
  body: (
    <>
      <H>Basics</H>

      <ul>
        <li>In Node.js, <code>spawn</code> is a method provided by the <code>child_process</code> module</li>
        <li>it used to launch a new process and execute a command in that process</li>
        <li><code>spawn</code> function returns a new <code>ChildProcess</code> object, which allows you to interact with the spawned process</li>
        <li><code>ChildProcess</code> emits various events, such as <code>stdout</code> (standard output), <code>stderr</code> (standard error), and <code>close</code> (when the process exits).</li>
        <li>we can interact with the spawned process through its <code>stdin</code>, <code>stdout</code>, and <code>stderr</code> streams. This allows you to send input to the process and capture its output</li>
      </ul>

      <Code block jsx>{`
        const { spawn } = require('child_process');

        const ls = spawn('ls', ['-l', '/usr']);
        
        // Event listeners for the spawned process
        ls.stdout.on('data', (data) => {
          console.log(\`stdout: \${data}\`);
        });
        
        ls.stderr.on('data', (data) => {
          console.error(\`stderr: \${data}\`);
        });
        
        ls.on('close', (code) => {
          console.log(\`child process exited with code \${code}\`);
        });
        
      `}</Code>

      <H>promise version</H>

      <Code block jsx>{`
        const { red, white, grey } = require('chalk')
        // const { spawn } = require('node:child_process')
        const { spawn } = require('cross-spawn')
        
        // https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
        
        const currentDir = __dirname
        
        const runCommand = ({
          command = 'echo "looks like you forgot to provide the terminal command"',
          args = [],
          options = {
            cwd: currentDir,
            shell: true,
            stdio: 'inherit'
          }
        }) => {
          return new Promise((resolve, reject) => {
            const process = spawn(command, args, options)
        
            process.on('message', (msg) => {
              console.log(\`🔈 \${white(msg)}\`)
            })
        
            process.on('close', async (code) => {
              if (code !== 0) {
                console.log(grey('❌ command is failed'))
                console.log(grey(JSON.stringify({ command, args, options, code }, null, 2)))
                return reject(new Error(\`Execution of command "\${command}" failed with status \${code}. CWD: \${options.cwd}\`))
              }
        
              console.log(grey('✅ command is finished'))
              return resolve()
            })
        
            process.on('error', (err) => {
              console.log(\`😤 err: \${red(err.toString())}\`)
              console.log(red(JSON.stringify({ command, args, options, err }, null, 2)))
              return reject(new Error(\`Execution of command "\${command}" failed (in \${options.cwd}): \${err.message}\`))
            })
        
            process.stdout?.on('data', (data) => {
              console.log(\`\${white('🗣️ stdout:')} \${grey(data.toString())}\`)
            })
        
            process.stderr?.on('data', (data) => {
              console.log(\`🤬 stderr: \${red(data.toString())}\`)
            })
          })
        }
        
        module.exports = { runCommand }
      `}</Code>

      <H>remove folders</H>

      <Code block jsx>{`
        const { underline, yellow, grey, green } = require('chalk')
        const { runCommand } = require('../utils/runCommand')
        const { getLambdasFromFileSystem } = require('./getLambdasFromFileSystem')
        const { chooseLambdaFolderPaths } = require('../prompts')
        
        const deleteNodeModules = async () => {
          const lambdas = await getLambdasFromFileSystem()
          const lambdaFolderPaths = await chooseLambdaFolderPaths({ lambdas })
        
          await Promise.all(lambdaFolderPaths.map(async (dir) => {
            console.log(\`> [\${yellow('~')}] 🗂️ \${dir}/node_modules: \${grey('delete')}\`)
        
            await runCommand({
              command: 'rm',
              args: ['-rf', 'node_modules'],
              options: { cwd: dir }
            })
        
            console.log(\`> [\${green('+')}] 🗂️ \${dir}/node_modules: \${grey('delete')}\`)
          }))
        }
        
        deleteNodeModules()
        
        module.exports = { deleteNodeModules }
      `}</Code>

      <H>npm ci</H>

      <Code block jsx>{`
        const { runCommand } = require('../utils/runCommand')
        
        const npmCiFromRoot = async () => {
          await runCommand({
            command: 'npm',
            args: ['ci']
          })
        }
        
        npmCiFromRoot()
      `}</Code>

      <H>npm i in folders</H>

      <Code block jsx>{`
        const { runCommand } = require('../utils/runCommand')
        
        const npmI = async ({ dirs }) => {
          await Promise.all(dirs.map(async (dir) => {
            await runCommand({
              command: 'npm',
              args: ['i'],
              options: { cwd: dir }
            })
          }))
        }
        
        module.exports = { npmI }
      `}</Code>

      <H>run tests in folders</H>

      <Code block jsx>{`
        const { runCommand } = require('../utils/runCommand')
        
        const test = async ({ lambdaFolderPaths }) => {
          await Promise.all(lambdaFolderPaths.map(async (dir) => {
            await runCommand({
              command: 'npm',
              args: ['run', 'test'],
              options: {
                cwd: dir,
                stdio: 'inherit'
              }
            })
          }))
        }
        
        module.exports = { test }
      `}</Code>

      <H>run command from node modules</H>

      <Code block jsx>{`
        const { runCommand } = require('../utils/runCommand')
        
        const builtTemplateYaml = async () => {
          await runCommand({
            command: './node_modules/.bin/cfbuild',
            args: ['template', '-t', 'template.yaml', '-o', 'built_template.yaml'],
            options: { stdio: 'inherit' }
          })
        }
        
        module.exports = { builtTemplateYaml }
      `}</Code>

      <H>create cloudformaton package</H>

      <Code block jsx>{`
        const { runCommand } = require('../utils/runCommand')
        const { getAppRootDir } = require('../utils/getAppRootDir')
        const { getPackageName } = require('../utils')
        
        const packagedTemplateYaml = async () => {
          const packageName = await getPackageName()
        
          await runCommand({
            command: 'aws',
            args: [
              'cloudformation',
              'package',
              '--template-file', 'built_template.yaml',
              '--s3-bucket', 'heeros-cloudformation-build',
              '--s3-prefix', packageName,
              '--output-template-file', 'packaged_template.yaml'
            ],
            options: {
              cwd: getAppRootDir()
            }
          })
        }
        
        module.exports = { packagedTemplateYaml }
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
