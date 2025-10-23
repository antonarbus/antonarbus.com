import {
  Code,
  H,
  Hs,
  LazyImg,
  Lnk,
  React,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  jsxToStr
} from '/components/post/reExport'
import { css } from '@emotion/react'

function Component() {
  return (
    <div
      css={css`
        * {
          border: 2px solid grey;
          margin: 20px;
          padding: 20px;
          background-color: white;
        }
      `}
    >
      <div>div1</div>
      <div css={{ background: 'red' }}>div2</div>
    </div>
  )
}

const postObj = {
  title: 'emotion css prop',
  date: '2022.10.10',
  tags: ['css', 'react'],
  imgUrl: 'https://antonarbus.com/imgs/emotion.png',
  desc: 'emotion css prop',
  body: (
    <>
      <H>CSS prop in Emotion library</H>

      <p>
        <Lnk url="https://emotion.sh/docs/css-prop">The css Prop</Lnk> can take styles as template
        literals or object.
      </p>

      <Code block jsx>{`
      import { css } from '@emotion/react'

      function Component() {
        return (
          <div
            css={css\`
              * {
                border: 2px solid grey;
                margin: 20px;
                padding: 20px;
                background-color: white;
              }
            \`}
          >
            <div>div1</div>
            <div 
              css={{ 
                background: 'red' 
                }}>
              div2
            </div>
          </div>
        )
      }
      `}</Code>

      <Component />

      <H>Configuration in Next.js</H>

      <Hs>package.json</Hs>

      <Code block json>{`
      {
        "dependencies": {
          "@emotion/react": "^11.10.4",
          "@emotion/styled": "^11.10.4",
        },
        "devDependencies": {
          "@emotion/babel-plugin": "^11.10.2",
          "@emotion/eslint-plugin": "^11.10.0",
        }
      }
      `}</Code>

      <Hs>next.config.js</Hs>

      <Code block>{`
      const nextConfig = {
        compiler: {
          emotion: true
        }
      }
      module.exports = nextConfig
      `}</Code>

      <Hs>.babelrc</Hs>

      <Code block jsx>{`
      {
        "presets": [
          [
            "next/babel",
            {
              "preset-react": {
                "runtime": "automatic",
                "importSource": "@emotion/react"
              }
            }
          ]
        ],
        "plugins": ["@emotion/babel-plugin"]
      }
      `}</Code>

      <Hs>.eslintrc.js</Hs>

      <Code block jsx>{`
      // .eslintrc.js
      module.exports = {
        env: {
          browser: true,
          es2021: true,
          jest: true
        },
        extends: [
          'plugin:react/recommended',
          'standard'
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          ecmaVersion: 'latest',
          sourceType: 'module'
        },
        plugins: [
          'react',
          '@typescript-eslint',
          '@emotion'
        ],
        rules: {
          'react/react-in-jsx-scope': 'off',
          'space-before-function-paren': 'off',
          'react/prop-types': 'off',
          'import/no-absolute-path': 'off',
          'react/no-unescaped-entities': 'off',
          'react/no-unknown-property': ['error', { ignore: ['css', 'jsx'] }]
        }
      }
      `}</Code>

      <H>webpack</H>

      <p>
        <code>css</code> prop from emotion does not work in react with webpack automatically, like
        it works with vite for ex. To let it work on top of the file need to put...
      </p>

      <Code block jsx>{`
      /** @jsxImportSource @emotion/react */
      `}</Code>

      <H>Array of object styles</H>

      <Code block jsx>{`
          <div 
            css={[
              {
                backgroundColor: 'hotpink',
                '&:hover': {
                  color
                }
              },
              isDanger && {
                color: 'red'
              }
            ]}
          >
            div2
          </div>
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
