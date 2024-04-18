import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'local hostname',
  date: '2024.04.18',
  tags: ['dns', 'hostname'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'xxx',
  body: (
    <>
      <H>hostname</H>

      <ul>
        <li>usually you run your dev server at smth like <code>http://localhost:3005/</code></li>
        <li>you may want to use own hostname like <code>https://local.quotation.app:3005/</code></li>
        <li>to do so you need to modify vite's config <Code>server.host</Code></li>
      </ul>

      <Code block jsx>{`
        /// <reference types="vitest" />
        /// <reference types="vite/client" />
        import { defineConfig, loadEnv } from 'vite'
        import react from '@vitejs/plugin-react'
        import tsconfigPaths from 'vite-tsconfig-paths'
        import basicSsl from '@vitejs/plugin-basic-ssl'
        
        // https://vitejs.dev/config/
        
        export default defineConfig(({ command, mode }) => {
          // Load env file based on \`mode\` in the current working directory.
          // Set the third parameter to '' to load all env regardless of the \`VITE_\` prefix.
          const env = loadEnv(mode, process.cwd(), '')
        
          return {
            server: {
              host: 'local.quotation.app',
              port: Number(env.PORT_FRONT_END),
              https: true, //* type "thisisunsafe" if chrome says that connection is not private
              proxy: {
                '/api': \`\${env.DOMAIN}:\${env.PORT_BACK_END}/\`
                // '/api': \`local.quotation.app:\${env.PORT_BACK_END}\`,
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
              basicSsl(),
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

      <ul>
        <li>and also configure local DNS by adding hostname into this file <Code>code /etc/hosts</Code></li>
      </ul>

      <Code block jsx>{`
        ##
        # Host Database
        #
        # localhost is used to configure the loopback interface
        # when the system is booting.  Do not change this entry.
        ##
        127.0.0.1	localhost
        127.0.0.1 local.quotation.app
        255.255.255.255	broadcasthost
        ::1             localhost
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
