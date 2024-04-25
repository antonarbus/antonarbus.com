import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'chunks',
  date: '2024.04.25',
  tags: ['react', 'rollup'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'xxx',
  body: (
    <>
      <H>Chunks</H>

      <ul>
        <li>we may build react app locally with <Code>npm run build </Code></li>
        <li>and check sizes of bundled chunks</li>
      </ul>

      <LazyImg path='/imgs/npm_run_deploy.png' />

      <ul>
        <li>in general application is broken into numerous tiny files which are being loaded in parallel</li>
        <li>and big blocking files are not good</li>
      </ul>

      <LazyImg path='/imgs/numerous-tiny-files.png'/>

      <H>vite-bundle-visualizer</H>

      <ul>
        <li>we may check the content of bundled chunks with <Lnk path='https://www.npmjs.com/package/vite-bundle-visualizer'>vite-bundle-visualizer</Lnk> package</li>
        <li>no need even to install it into a project, just run <Code>npx vite-bundle-visualizer</Code></li>
        <li>we may see that all purple area is one blocking gzipped 1.3mb file</li>
      </ul>

      <LazyImg path='/imgs/vite-bundle-visualizer.png' />

      <H>manualChunks</H>

      <ul>
        <li>we may break the file into multiple chunks manually and they will load by browser in parallel</li>
        <li>can be done in <Lnk path='https://v3.vitejs.dev/guide/build.html#chunking-strategy'>vite's</Lnk> configuration by adding the property <Lnk path='https://rollupjs.org/configuration-options/#output-manualchunks'>manualChunks</Lnk> to rollup bundler settings</li>
      </ul>

      <Code block jsx>{`
        /// <reference types="vitest" />
        /// <reference types="vite/client" />
        import { defineConfig, loadEnv } from 'vite'
        import react from '@vitejs/plugin-react'
        import tsconfigPaths from 'vite-tsconfig-paths'
        import basicSsl from '@vitejs/plugin-basic-ssl'
        
        // https://vitejs.dev/config/
        export default defineConfig({
          base: './',
          server: {
            host: 'local.q.com',
            port: 8443,
            // https: true
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
            basicSsl()
          ],
          build: {
            target: 'esnext',
            outDir: 'build',
            rollupOptions: {
              output: {
                // https://rollupjs.org/configuration-options/#output-manualchunks
                manualChunks: (id) => {
                  if (id.includes('node_modules/@ag-grid-community')) return '@ag-grid-community'
                  if (id.includes('node_modules/@ag-grid-enterprise')) return '@ag-grid-enterprise'
                  if (id.includes('node_modules/@heeros')) return 'heeros'
                  if (id.includes('node_modules/@mui')) return 'mui'
                  if (id.includes('node_modules/@tanstack')) return 'tanstack'
                  if (id.includes('node_modules/@aws')) return '@aws'
                  if (id.includes('node_modules/mixpanel')) return 'mixpanel'
                  if (id.includes('node_modules/pdfjs')) return 'pdfjs'
                  if (id.includes('node_modules/framer-motion')) return 'framer-motion'
                  if (id.includes('node_modules/i18n')) return 'i18n'
              }
              }
            }
          },
          // 'pdfjs-dist' throws an error // https://github.com/storybookjs/storybook/issues/22223
          // ERROR: Top-level await is not available in the configured target environment
          optimizeDeps: {
            esbuildOptions: {
              target: "esnext",
            },
          },
          test: {
            environment: "jsdom"
          },
        })
      `}</Code>

      <ul>
        <li><code>id</code> parameter is the folder path in your project</li>
        <li>and we can group modules in separate files by returning chunk name</li>
        <li>and eventually get smaller chunks</li>
      </ul>

      <LazyImg path='/imgs/vite-bundle-visualizer-after-manual-chunk-splitting.png' />
      <LazyImg path='/imgs/npm_run_deploy_after_manual_chunk_splitting.png' />

      <H>More advanced logic</H>

      <ul>
        <li>we may also apply some custom automatic logic for manual splitting</li>
      </ul>

      <Code block jsx>{`
        import fs from 'fs';

        export default {
          input: 'src/index.js',
          output: {
            dir: 'dist',
            format: 'es',
            manualChunks: (id) => {
              // Estimate the size of the module based on the size of the file
              const fileSize = fs.statSync(id).size; // Get the size of the file in bytes
              const estimatedSizeInKB = fileSize / 1024; // Convert bytes to KB
        
              if (estimatedSizeInKB <= 500) {
                return null; // Keep in the main bundle
              } else {
                // Split into a separate chunk
                return \`chunk-\${id}\`;
              }
            },
          },
        };
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
