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
  jsxToStr,
  ComponentFromHtmlString
} from '/components/post/reExport'

const postObj = {
  title: 'ssl for dev env',
  date: '2024.10.04',
  tags: ['tools'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'ssl & proxy server for dev env',
  body: (
    <>
      <H>Why?</H>

      <ul>
        <li>
          Explanation is here{' '}
          <Lnk path="https://www.tiktok.com/@syntaxfm/video/7394478096591621406">
            https://www.tiktok.com/@syntaxfm/video/7394478096591621406
          </Lnk>
        </li>
      </ul>

      <H>host</H>

      <ul>
        <li>think of a host name for your local app</li>
        <li>
          for example <i>local.webapp.com</i>
        </li>
        <li>
          add the host to your dns{' '}
          <Code inline jsx>
            code /etc/hosts
          </Code>
        </li>
        <Code block none>{`
          127.0.0.1 localhost
          255.255.255.255 broadcasthost
          ::1             localhost
          127.0.0.1 local.webapp.com
        `}</Code>
        <li>
          or programmatically
          <Code block jsx>{`
          sudo echo "127.0.0.1 local.webapp.com" | sudo tee -a /etc/hosts
        `}</Code>
        </li>
      </ul>

      <H>Caddy proxy</H>

      <ul>
        <li>
          Install Caddy proxy server (similar to Nginx){' '}
          <Lnk path="path">https://caddyserver.com/docs/install</Lnk>
        </li>
        <li>
          Create <code>caddyfile</code> in the root
        </li>

        <Code block none>{`
          # Dev server
          local.webapp.com {

            # Reverse proxy API requests
            handle /api/* {
              reverse_proxy http://localhost:4000
            }

            # Reverse proxy all other requests to the frontend dev server
            handle /* {
              reverse_proxy http://localhost:3000
            }
          }

          # Preview built react app
          local.webapp.com:4500 {

            # Reverse proxy API requests
            handle /api/* {
              reverse_proxy http://localhost:4000
            }

            # Serve build static files 
            handle_path /* {
              root * ./frontend/dist/
              file_server
              try_files {path} /index.html
            }
          }
        `}</Code>

        <li>
          Run caddy with <Code>caddy start</Code>
        </li>
        <li>Or integrate caddy launching into the npm script</li>

        <Code block jsx>{`
          // package.json
          "scripts": {
            "start": "concurrently \\"caddy start\\" \\"npm run start:db\\" \\"npm run start:backend\\" \\"npm run start:frontend\\"",
          }
        `}</Code>
      </ul>

      <Hs>Dev servers</Hs>

      <ul>
        <li>
          Front React Vite serves from port <code>3000</code>
        </li>

        <Code block jsx>{`
          // vite.config.ts
          export default defineConfig({
            server: {
              host: 'localhost',
              port: 3000,
            },
            preview: {
              host: 'localhost',
              port: 4500,
            },
          })
        `}</Code>

        <li>
          Backend serves from port <code>4000</code>
        </li>

        <Code block jsx>{`
          // backend/index.ts
          const startWebServer = async (): Promise<void> => {
            try {
              const appRunnerHost = '0.0.0.0'
              const localHost = 'localhost'

              await fastify.listen({
                port: 4000,
                host: developerMode ? localHost : appRunnerHost,
              })

              fastify.log.info('Server listening on http://localhost:4000')

              // Start the background jobs after the web server has started.
              startBackgroundJobs()
            } catch (err) {
              fastify.log.error(err)
              process.exit(1)
            }
          }
        `}</Code>
      </ul>

      <Hs>Requests to backend</Hs>

      <ul>
        <li>
          All requests to backend go to <code>https://local.webapp.com/api</code>
        </li>

        <Code block jsx>{`
            import axios from 'axios'

            export const axiosInstance = axios.create({
              baseURL: 'https://local.webapp.com/api',
              withCredentials: true,
            })
          `}</Code>
      </ul>

      <Hs>SSL</Hs>

      <p>And boom, we have a true ssl.</p>

      <LazyImg path="/imgs/ssl_with_caddy.png" />

      <H>Vite proxy with ssl</H>

      <ul>
        <li>
          We can use internal vite's proxy and wire all requests and responses with backend through
          it
        </li>
        <li>
          It can accept some ssl from <code>basicSsl</code> package
        </li>

        <Code block jsx>{`
          import basicSsl from '@vitejs/plugin-basic-ssl'
          import react from '@vitejs/plugin-react'
          import { defineConfig } from 'vite'
          import tsconfigPaths from 'vite-tsconfig-paths'

          export default defineConfig(({ command, mode }) => {
            return {
              root: './front/',
              server: {
                host: 'localhost',
                port: 3000,
                proxy: {
                  '/api': 'http://localhost:4000',
                },
              },
              plugins: [react(), tsconfigPaths(), basicSsl()],
            }
          })
        `}</Code>

        <li>
          Requests from backend are made to <code>/api</code> prefixed endpoints
        </li>

        <Code block jsx>{`
          import type { ResBody, ReqBody as Payload } from '@back/api/auth/registerRouter'
          import { useMutation, type UseMutationResult } from '@tanstack/react-query'
          import axios, { type AxiosError } from 'axios'
          import { queryKey } from '@shared/consts/queryKey'

          export const useRegisterMutation = (): UseMutationResult<
            ResBody,
            AxiosError<ResBody>,
            Payload
          > => {
            const query = useMutation<ResBody, AxiosError<ResBody>, Payload>({
              mutationKey: [queryKey.register],
              mutationFn: async ({ email, password }: Payload) => {
                const res = await axios<ResBody>({
                  url: '/api/register',
                  method: 'post',
                  data: { email, password },
                })

                return res.data
              },
            })

            return query
          }
        `}</Code>

        <Code block jsx>{`
          import 'dotenv/config'
          import cookieParser from 'cookie-parser'
          import express from 'express'
          import { registerRouter } from './api/auth/registerRouter'
          import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware'
          import type { Req, Res } from './types'

          const app = express()
          app.use(express.json({ limit: '50mb' }))
          app.use(cookieParser())

          app.get('/api', (_req: Req, res: Res) => res.send('i am express.js'))
          app.use('/api/register', registerRouter)
          app.use(errorHandlerMiddleware)

          app.listen(4000, () => {
            console.info(\`🚀 Started at http://localhost:4000\`)
          })
        `}</Code>
      </ul>

      <H>No proxy</H>

      <ul>
        <li>
          If you do not use external or internal vite's proxy you have manage ssl certificate
          manually
        </li>
        <li>To be continued...</li>
      </ul>
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
