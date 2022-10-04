import { Code, H, LazyImg, Lnk, jsxToStr } from '/components/post/reExport'

function Component() {
  const x = 'hello'
  const y = x + ' John'

  if (x) {

  }

  return y
}

const postObj = {
  title: 'eslint',
  date: '2022.05.05',
  tags: ['tools'],
  imgUrl: 'https://antonarbus.com/imgs/eslint.png',
  desc: 'eslint example configuration',
  body: (
    <>
      <p><Lnk path="https://eslint.org/">ESLint</Lnk> is a package to find problematic code.</p>

      <H>React</H>

      <p>ESLint comes with React <Code>create-react-app app-name</Code> by default.</p>

      <H>Rules</H>

      <p>We can extent <Lnk path="https://eslint.org/docs/rules/">ESLint rules</Lnk> by adding them into <Code>package.json</Code> file under <Code>rules</Code>.</p>

      <Code block json>{`
        "eslintConfig": {
          "extends": [
            "react-app",
            "react-app/jest"
          ],
          "rules": {
            "no-unused-vars": "warn",
            "no-var": "error",
            "no-empty": "warn",
            "prefer-template": "warn",
            "prefer-const": "warn"
          }
        }
      `}</Code>

      <p>Rule may have 3 flags: <Code>{'"off"'}</Code>, <Code>{'"warn"'}</Code> & <Code>{'"error"'}</Code></p>

      <p><Code>{'"error"'}</Code> rule does not permit to compile a React project until it is resolved.</p>

      <H>Manual check in terminal</H>

      <p>Run ESLint check in terminal by typing <Code bash>{"eslint './posts/eslint.js'"}</Code></p>

      <p>Run batch error checking with <Code>{"eslint './posts/**js'"}</Code></p>

      <p><LazyImg src="/imgs/esLint/ESLintProblemsInTerminal.png"></LazyImg></p>

      <H>ESLint extension</H>

      <p>If we install <Lnk path="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint">ESLint VS Code extension</Lnk> we can see errors and warning highlight right in the editor.</p>

      <H>Automatic fix</H>

      <p>ESLint may try to fix problems with <Code>{"eslint './posts/eslint.js' --fix"}</Code></p>

      <H>Manual installation</H>

      <p>We may install ESLint manually by <Code>sudo npm i -D eslint</Code> and then initialize configuration by <Code>eslint --init</Code> command.</p>

      <p>
        Different style guides may be installed{' '}
        <Lnk path="https://github.com/standard/standard">standard</Lnk> or{' '}
        <Lnk path="https://github.com/airbnb/javascript">Airbnb</Lnk> or{' '}
        <Lnk path="https://github.com/google/eslint-config-google">Google</Lnk>.
      </p>

      <p>Installation example.</p>

      <p><LazyImg src="/imgs/esLint/ESLintInit.png"></LazyImg></p>

      <p>Many dev dependencies are inserted into the <Code>package.json</Code> file and configuration file <Code>.eslintrc.js</Code> is generated.</p>

      <Code block json>{`
        // package.json
        "devDependencies": {
          "eslint": "^7.32.0",
          "eslint-config-airbnb": "^19.0.2",
          "eslint-config-standard": "^16.0.3",
          "eslint-plugin-import": "^2.25.3",
          "eslint-plugin-jsx-a11y": "^6.5.1",
          "eslint-plugin-node": "^11.1.0",
          "eslint-plugin-promise": "^5.2.0",
          "eslint-plugin-react": "^7.27.1",
          "eslint-plugin-react-hooks": "^4.3.0"
        }
      `}</Code>

      <Code block js>{`
      // .eslintrc.js
      module.exports = {
        env: {
          browser: true,
          es2021: true
        },
        extends: [
          'plugin:react/jsx-runtime',
          'standard'
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          ecmaVersion: 12,
          sourceType: 'module'
        },
        plugins: [
          'react',
          '@typescript-eslint'
        ],
        globals: {
          React: true,
          google: true,
          mount: true,
          mountWithRouter: true,
          shallow: true,
          shallowWithRouter: true,
          context: true,
          expect: true,
          jsdom: true,
          JSX: true,
        },
        rules: {
          'comma-dangle': ['error', 'only-multiline'],
          'react/no-unescaped-entities': 'off',
          'space-before-function-paren': ['error', 'never'],
          'react/prop-types': 'off',
          'react/react-in-jsx-scope': 'off',
          'no-template-curly-in-string': 'off',
          'no-use-before-define': 'off',
          'no-console': 'off',
        },
        settings: {
          react: {
            version: 'detect'
          }
        }
      }
      `}</Code>

      <p><Code>eslintConfig</Code> can be removed from <Code>package.json</Code> if we use a separate <Code>.eslintrc.js</Code></p>

      <p>If ESLint does not allow to start or build a project we may create <Code>.env</Code> file with following statement.</p>

      <Code block none>{`
      // .env
      ESLINT_NO_DEV_ERRORS=true
      DISABLE_ESLINT_PLUGIN=true
      `}</Code>

      <H>Disable ESLint warnings</H>

      <p>To disable ESLint warnings we may type</p>
        <ul>
          <li> <Code>{'/* eslint-disable */'}</Code> at the top of the file</li>
          <li> <Code>{'// eslint-disable-line'}</Code> on the same line</li>
          <li> <Code>{'/* eslint-disable-next-line */'}</Code> or <Code>{'// eslint-disable-next-line'}</Code> before the line</li>
        </ul>

      <p>More information can be found on the <Lnk path="https://eslint.org/docs/user-guide/configuring/rules#disabling-rules">https://eslint.org</Lnk> page.</p>

      <H>ESLint in Next.js</H>

      <ul>
        <li>For some reason could not let linter work in Next.js</li>
        <li>This <Lnk path='https://devinshoemaker.com/blog/next-js/configure-eslint'>guidline</Lnk> helped me</li>
      </ul>

      <H>Plugins</H>

      <ul>
        <li><Lnk path='https://github.com/bfanger/eslint-plugin-only-warn'>eslint-plugin-only-warn</Lnk> - will warn on every rule, instead of throwing an error</li>
      </ul>

      <H>Lint in npm script</H>

      <Code block json>{`
        // package.json
        "scripts": {
          "client": "react-scripts start",
          "build": "react-scripts build",
          "test": "react-scripts test",
          "lint": "eslint '**/*.js'",
          "eject": "react-scripts eject",
          "server": "nodemon server.js",
          "dev": "concurrently \"npm run server\" \"npm run client\""
        },
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
