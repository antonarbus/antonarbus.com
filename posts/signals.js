'use client'


import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'preact signals',
  date: '2024.01.26',
  tags: ['react', 'state'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'signals from preact',
  body: (
    <>
      <H>Basics</H>

      <ul>
        <li><i>Signal</i> is a reactive value which re-renders the component when it is changed</li>
        <li><Code>signal.value</Code> consumed by component re-renders the component</li>
        <li>if we consume <Code>signal</Code> directly in jsx, it will just change the dom without component re-render</li>
        <li>to update the signal you just have to mutate the <Code>signal.value</Code> prop, that's simple</li>
        <li><Lnk path='https://preactjs.com/guide/v10/signals/'>https://preactjs.com/guide/v10/signals/</Lnk></li>
        <li><Lnk path='https://github.com/preactjs/signals/tree/main/packages/react#react-integration'>https://github.com/preactjs/signals/tree/main/packages/react#react-integration</Lnk></li>
        <li><Code>npm install @preact/signals-react</Code></li>
        <li>to let it signals without react hooks some magic is done on compilation step, thus we need to add Babel transformation</li>
        <li><Code>npm i --save-dev @preact/signals-react-transform</Code></li>
      </ul>

      <H>Vite config</H>

      <p>Add <Code inline jsx>{'["module:@preact/signals-react-transform"]'} into babel plugins</Code></p>

      <Code block jsx>{`
        /// <reference types="vitest" />
        /// <reference types="vite/client" />
        
        import { defineConfig, loadEnv } from 'vite'
        import react from '@vitejs/plugin-react'
        import tsconfigPaths from 'vite-tsconfig-paths'
        
        // https://vitejs.dev/config/
        
        export default defineConfig(({ command, mode }) => {
          // Load env file based on \`mode\` in the current working directory.
          // Set the third parameter to '' to load all env regardless of the \`VITE_\` prefix.
          const env = loadEnv(mode, process.cwd(), '')
        
          return {
            server: {
              port: Number(env.PORT_FRONT_END),
              proxy: {
                // '/api': \`\${process.env.DOMAIN}:\${process.env.PORT_BACK_END}/\`
                '/api': \`\${env.DOMAIN}:\${env.PORT_BACK_END}\`,
              },
              // hmr: {
              //   host: 'localhost',
              //   port: Number(env.PORT_BACK_END),
              // }
            },
            esbuild: {
              define: {
                // to suppress warning in terminal: [vite] warning: Top-level "this" will be replaced with undefined since this file is an ECMAScript module
                this: 'window',
              },
            },
            plugins: [
              react({
                // to show readable class names in styled components with vite
                // https://github.com/styled-components/babel-plugin-styled-components/issues/350#issuecomment-979873241
                jsxImportSource: '@emotion/react',
                babel: {
                  plugins: [
                    [
                      // 'babel-plugin-styled-components',
                      '@emotion/babel-plugin',
                      {
                        displayName: true,
                        fileName: true,
                      },
                    ],
                    // https://github.com/preactjs/signals/tree/main/packages/react#react-integration
                    ["module:@preact/signals-react-transform"],
                  ],
                },
              }),
              // https://github.com/aleclarson/vite-tsconfig-paths
              tsconfigPaths(),
            ],
            // https://vitest.dev/guide/in-source.html
            define: {
              'import.meta.vitest': 'undefined',
            },
            // https://www.youtube.com/watch?v=oWJpxtAl62w
            test: {
              globals: true,
              environment: 'jsdom',
              setupFiles: './test-setup.ts',
              includeSource: ['client/**/*.{js,ts,jsx,tsx}'],
              coverage: {
                all: true,
                src: ['client/'],
              },
            },
            build: {
              outDir: 'build',
            },
          }
        })
      `}</Code>

      <H>Example of reactive global state</H>

      <Code block jsx>{`
        // bottomMessageSignal.ts
        import { signal } from '@preact/signals-react'

        export const bottomMessage = signal('')

        export const showBottomMessage = (msg: string): void => {
          bottomMessage.value = msg
        }

        export const hideBottomMessage = (): void => {
          bottomMessage.value = ''
        }
      `}</Code>

      <Code block jsx>{`
        // BottomMessage.tsx
        import { AnimatePresence, motion } from 'framer-motion'
        import { bottomMessage } from './bottomMessageSignal'
        
        export const BottomMessage = (): JSX.Element => {
          return (
            <AnimatePresence>
              {bottomMessage.value !== '' && (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  css={{
                    position: 'fixed',
                    bottom: 5,
                    right: 5,
                    fontSize: 14,
                    color: '#828282',
                    fontWeight: 500,
                    userSelect: 'none',
                  }}
                >
                  {bottomMessage.value}
                </motion.span>
              )}
            </AnimatePresence>
          )
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
