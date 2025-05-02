import { Code, H, LazyImg, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'eslint',
  date: '2025.02.05',
  tags: ['tools'],
  imgUrl: 'https://antonarbus.com/imgs/eslint.png',
  desc: 'eslint example configuration',
  body: (
    <>
      <H>Manual check in terminal</H>

      <p>
        <Lnk path="https://eslint.org/">ESLint</Lnk> is a package to find problematic code.
      </p>

      <p>
        Rule may have 3 flags: <Code>{'"off"'}</Code>, <Code>{'"warn"'}</Code> &{' '}
        <Code>{'"error"'}</Code>
      </p>

      <p>
        <Code>{'"error"'}</Code> rule does not permit to compile a React project until it is
        resolved.
      </p>

      <H>Manual check in terminal</H>

      <p>
        Run ESLint check in terminal by typing <Code bash>{"eslint './posts/eslint.js'"}</Code>
      </p>

      <p>
        Run batch error checking with <Code>{"eslint './posts/**js'"}</Code>
      </p>

      <p>
        <LazyImg src="/imgs/esLint/ESLintProblemsInTerminal.png"></LazyImg>
      </p>

      <H>ESLint extension</H>

      <p>
        If we install{' '}
        <Lnk path="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint">
          ESLint VS Code extension
        </Lnk>{' '}
        we can see errors and warning highlight right in the editor.
      </p>

      <H>Automatic fix</H>

      <p>
        ESLint may try to fix problems with <Code>{"eslint './posts/eslint.js' --fix"}</Code>
      </p>

      <H>Disable ESLint warnings</H>

      <p>To disable ESLint warnings we may type</p>
      <ul>
        <li>
          <Code>{'/* eslint-disable */'}</Code> at the top of the file
        </li>
        <li>
          <Code>{'// eslint-disable-line'}</Code> on the same line
        </li>
        <li>
          <Code>{'/* eslint-disable-next-line */'}</Code> or{' '}
          <Code>{'// eslint-disable-next-line'}</Code> before the line
        </li>
      </ul>

      <p>
        More information can be found on the{' '}
        <Lnk path="https://eslint.org/docs/user-guide/configuring/rules#disabling-rules">
          https://eslint.org
        </Lnk>{' '}
        page.
      </p>

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

      <H>Simple rules</H>

      <Code block js>{`
        // eslint.config.js

        import { defineConfig } from 'eslint/config'
        import globals from 'globals'
        import pluginJs from '@eslint/js'
        import prettierConfig from 'eslint-config-prettier'
        import tseslint from 'typescript-eslint'
        import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'

        export default defineConfig([
          {
            ignores: ['**/node_modules/', 'build/**'],
          },
          prettierConfig,
          pluginReactConfig,
          {
            languageOptions: {
              globals: { ...globals.browser, ...globals.node },
              parserOptions: {
                project: ['tsconfig.json'],
                tsconfigDirName: import.meta.dirname,
                ecmaFeatures: { jsx: true },
              },
            },
          },
          { settings: { react: { version: 'detect' } } },
          {
            files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
            extends: [pluginJs.configs.recommended],
            rules: {
              'no-unused-vars': 'warn',
              'react/react-in-jsx-scope': 'off',
              'react/display-name': 'off',
              'react/prop-types': 'warn',
            },
          },
          {
            files: ['src/**/*.{ts,tsx}'],
            extends: [...tseslint.configs.recommended],
          },
        ])
      `}</Code>

      <H>Rules from my project</H>

      <Code block jsx>{`
        import { defineConfig } from 'eslint/config'
        import globals from 'globals'
        import pluginJs from '@eslint/js'
        import prettierConfig from 'eslint-config-prettier'
        import tseslint from 'typescript-eslint'
        import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'

        export default defineConfig([
          {
            ignores: ['**/node_modules/', 'build/**'],
          },
          prettierConfig,
          pluginReactConfig,
          {
            languageOptions: {
              globals: { ...globals.browser, ...globals.node },
              parserOptions: {
                project: ['tsconfig.json'],
                tsconfigDirName: import.meta.dirname,
                ecmaFeatures: { jsx: true },
              },
            },
          },
          { settings: { react: { version: 'detect' } } },
          // General rules for all files
          {
            files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
            extends: [pluginJs.configs.all],
            rules: {
              // https://eslint.org/docs/v8.x/rules/
              'padding-line-between-statements': [
                'error',
                // Blank line before return statement
                { blankLine: 'always', prev: '*', next: 'return' },
                // Blank line around block statement
                { blankLine: 'always', prev: '*', next: 'block-like' },
                { blankLine: 'always', prev: 'block-like', next: '*' },
                // Blank line before throw statement
                { blankLine: 'always', prev: '*', next: 'throw' },
                // Blank line around declaration which spans over several lines
                { blankLine: 'always', prev: 'multiline-const', next: '*' },
                { blankLine: 'always', prev: 'multiline-let', next: '*' },
                { blankLine: 'always', prev: 'multiline-var', next: '*' },
                { blankLine: 'always', prev: '*', next: 'multiline-const' },
                { blankLine: 'always', prev: '*', next: 'multiline-let' },
                { blankLine: 'always', prev: '*', next: 'multiline-var' },
                // Blank line around expression which spans over several lines
                { blankLine: 'always', prev: 'multiline-expression', next: '*' },
                { blankLine: 'always', prev: '*', next: 'multiline-expression' },
              ],
              curly: 'error',
              'no-else-return': 'error',
              'no-implicit-coercion': 'error',
              eqeqeq: 'error',
              'object-shorthand': 'error',
              'jsx-quotes': ['error', 'prefer-single'],
              'no-console': ['error', { allow: ['error', 'warn', 'info'] }],
              'no-useless-rename': 'error',
              'no-duplicate-imports': 'error',

              // Turn off some rules from pluginJs.configs.all
              'no-alert': 'off',
              'no-useless-assignment': 'off',
              'sort-keys': 'off',
              'max-lines-per-function': 'off',
              'no-ternary': 'off',
              'arrow-body-style': 'off',
              'no-inline-comments': 'off',
              'capitalized-comments': 'off',
              'no-magic-numbers': 'off',
              'no-void': 'off',
              'one-var': 'off',
              'id-length': 'off',
              'prefer-destructuring': 'off',
              'max-statements': 'off',
              'sort-imports': 'off',
              'max-params': 'off',
              'no-warning-comments': 'off',
              'no-undefined': 'off',
              'max-lines': 'off',
              complexity: 'off',
              'consistent-return': 'off',
              'no-plusplus': 'off',
              'func-style': 'off',
              'prefer-arrow-callback': 'off',
              'no-shadow': 'off',
              radix: 'off',
              'init-declarations': 'off',
              'new-cap': 'off',
              'no-unsafe-type-assertion': 'off',
              'prefer-named-capture-group': 'off',
              'react/react-in-jsx-scope': 'off',
              'react/display-name': 'off',

              // todo: warn some rules instead of error, maybe fix in future and put "error" back
              'no-use-before-define': 'warn',
              'require-unicode-regexp': 'warn',
              'no-negated-condition': 'warn',
              'no-empty-function': 'warn',
              'no-promise-executor-return': 'warn',
              'no-console': 'warn',
              'no-unused-vars': 'warn',
              'default-param-last': 'warn',
              'require-await': 'warn',
              'no-unused-expressions': 'warn',
              'no-nested-ternary': 'warn',
              'react/prop-types': 'warn',
              camelcase: 'warn',
              'no-restricted-syntax': [
                'warn',
                {
                  selector: 'ReturnStatement > CallExpression',
                  message:
                    'Do not return expressions directly. Assign them to a variable first.',
                },
              ],
            },
          },
          // TypeScript-specific rules
          {
            files: ['src/**/*.{ts,tsx}'],
            extends: [...tseslint.configs.all],
            rules: {
              // https://typescript-eslint.io/rules/
              '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
              '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
              '@typescript-eslint/explicit-function-return-type': 'error',
              '@typescript-eslint/consistent-type-exports': 'error',
              '@typescript-eslint/consistent-type-imports': 'error',
              '@typescript-eslint/no-import-type-side-effects': 'error',
              '@typescript-eslint/naming-convention': 'off',
              '@typescript-eslint/prefer-readonly-parameter-types': 'off',
              '@typescript-eslint/strict-boolean-expressions': 'off', // Good to use, but too much changes required
              '@typescript-eslint/no-unnecessary-type-parameters': 'off', // Check it later, it may make sense
              '@typescript-eslint/no-magic-numbers': 'off',
              '@typescript-eslint/prefer-destructuring': 'off',
              '@typescript-eslint/max-params': 'off',
              '@typescript-eslint/consistent-return': 'off',
              '@typescript-eslint/indent': 'off', // Bad for performance
              '@typescript-eslint/no-unsafe-type-assertion': 'off',
              '@typescript-eslint/no-misused-spread': 'off',
            },
          },
        ])
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
