import { H, jsxToStr, Code } from '/components/post/reExport'

const postObj = {
  title: 'auth',
  date: '2022.09.09',
  tags: ['va'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'authentication and authorization',
  body: (
    <>
      <H>Authorization vs authentication</H>

      <p>
        <b>Authorization</b> - checking if password is correct.
      </p>
      <p>
        <b>Authentication</b> - checking if the user is the same as authorized initially.
      </p>

      <H>Principle & data flow</H>

      <ul>
        <li>The client is authorized by comparing email and password against database. </li>

        <li>
          On successful authorization the server issues an <i>access</i> and a <i>refresh</i> tokens
          for future authentication to avoid asking for credentials on every http request.
        </li>

        <li>
          Client stores <i>access</i> token in the local storage and attaches it inside request
          headers for private api requests. Token is attached by 'request' interceptor in{' '}
          <i>axiosWithAuth</i>.
        </li>

        <li>
          For protected api 'verifyToken' middleware verifies the token. If a token is ok, the
          request goes forward. If a token is bad (compromised or outdated) a response with
          status(401) is returned.
        </li>

        <li>
          <i>Access</i> token is short and expires in 15 min. 'Response' interceptor in{' '}
          <i>axiosWithAuth</i> checks for 401 status and if it is 401, it makes additional request
          to update <i>access</i> token by presenting a <i>refresh</i> token, which has 30d expiry
          time.
        </li>

        <li>
          <i>Refresh</i> token is stored in secured cookies on the login and also kept in database.
          If <i>refresh</i> token is valid and available in database, then refreshed <i>access</i>{' '}
          and refreshed <i>refresh</i> tokens are issued.
        </li>

        <li>
          <i>axiosWithAuth</i> remembers the request with all parameters when it got 401 and after
          getting successful refreshed tokens it repeats initial http request.
        </li>

        <li>
          If <i>refresh</i> token is invalid or old, then <i>access</i> token is not issued, client
          is considered as unauthorized and new login is required.
        </li>

        <li>
          If a user is deleted from the database, he is still authorized, for short time until{' '}
          <i>access</i> token is expired (15 min). We should consider the duration of access token
          depending on sensitivity of our data.
        </li>

        <li>
          Tokens are also checked and refreshed at the initial app load in useEffect() on Main
          component mount. That's how we determine if a client logged in or out.
        </li>

        <li>
          For tokens we use JWT tokens, which contain encrypted (not hashed) payload (usually object
          with user email, role, etc...), validation time and a hash based on a secret keys, which
          are kept on server. Server can validate the token only if it knows the secrete keys.
          Secrete keys are kept in environment variables.
        </li>
      </ul>

      <H>server</H>

      <Code block jsx>{`
      // server.ts
      import 'dotenv/config'
      import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
      import morgan from 'morgan'
      import cookieParser from 'cookie-parser'
      import cors from 'cors'
      import { loginRouter } from './api/loginRouter'
      import { registerRouter } from './api/registerRouter'
      import { connectToDb } from './db/connectToDb'
      import { logoutRouter } from './api/logoutRouter'
      import { activateRouter } from './api/activateRouter'
      import { refreshRouter } from './api/refreshRouter'
      import { errorHandler } from './middleware/errorHandler'

      const app = express()
      connectToDb()
      app.use(morgan('dev')) // http logs in terminal
      app.use(express.json()) // parses incoming requests with JSON because we use lots of json, let it be default
      app.use(cookieParser())
      app.use(cors())
      app.get('/', (req: ReqType, res:ResType) => res.send('This is from express.js'))
      app.get('/api', (req: ReqType, res:ResType) => res.json({ message: '/api' }))

      app.use('/api/register', registerRouter)
      app.use('/api/login', loginRouter)
      app.use('/api/logout', logoutRouter)
      app.use('/api/activate', activateRouter)
      app.use('/api/refresh', refreshRouter)

      app.use(errorHandler)

      const port = process.env.PORT_BACK_END
      const domain = process.env.DOMAIN

      app.listen(port, () => console.log(\`server started at \${domain}:\${port}\`))
      `}</Code>

      <H>registerRouter</H>

      <Code block jsx>{`
      // registerRouter.ts
      import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
      // import { connectToDb } from '../db/connectToDb'
      import { UserModel } from '../db/models/user.model'
      import bcrypt from 'bcryptjs'
      import { v4 as uuidv4 } from 'uuid'
      import { sendMail } from '../services/mail/sendMail'
      import { body, validationResult } from 'express-validator'
      const domain = process.env.DOMAIN
      const port = process.env.PORT_FRONT_END

      export const registerRouter = express.Router()
      registerRouter.post(
        '/',
        body('email').isEmail(),
        body('password').isLength({ min: 3 }),
        async (req: ReqType, res: ResType, next: NextType) => {
          try {
            // validation
            const validationErrors = validationResult(req)
            if (!validationErrors.isEmpty()) return res.json({ status: 'error', message: 'validation error', validationErrors })

            // check if user already exists
            // await connectToDb()
            const email = req.body.email.toLowerCase()
            const user = await UserModel.findOne({ email })
            if (user) return res.json({ status: 'error', message: 'user with such email already exists' })

            // save user to db
            const password = await bcrypt.hash(req.body.password, 10)
            const activationLink = \`\${domain}:\${port}/api/activate/\${uuidv4()}\`
            await UserModel.create({ email, password, activationLink })

            // send email with activation link
            const subject = 'Activation for quotation.app'
            const html = \`<div><h1>Follow the link to confirm the registration</h1><a href="\${activationLink}">\${activationLink}</a></div> \`
            // await sendMail({ to: email, subject, html })

            // all went good, send the response
            res.json({ status: 'ok', message: 'user is registered' })
          } catch (error: any) {
            next(error)
          }
        }
      )
      `}</Code>

      <H>activateRouter</H>

      <Code block jsx>{`
      // activateRouter
      import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
      import { UserModel } from '../db/models/user.model'
      const domain = process.env.DOMAIN
      const port = process.env.PORT_FRONT_END

      export const activateRouter = express.Router()
      activateRouter.get('/:link', async (req: ReqType, res: ResType, next: NextType) => {
        try {
          const activationLink = \`\${domain}:\${port}/api/activate/\${req.params.link}\`
          const user = await UserModel.findOne({ activationLink })
          if (!user) return res.json({ status: 'error', message: 'no account with such activation link' })
          user.isActivated = true
          await user.save()
          return res.redirect(\`\${domain}:\${port}/login\`)
        } catch (error: any) {
          next(error)
        }
      })
      `}</Code>

      <H>loginRouter</H>

      <Code block jsx>{`
        // loginRouter.ts
        import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
        import { UserModel } from '../db/models/user.model'
        import bcrypt from 'bcryptjs'
        import { getAccessJwtToken, getRefreshJwtToken, refreshJwtTokenExpirationSeconds } from '../services/jwt/jwt'

        export const loginRouter = express.Router()
        loginRouter.post('/', async (req: ReqType, res: ResType, next: NextType) => {
          try {
            // get mail & password from body
            let { email, password } = req.body
            email = email.toLowerCase()

            // check email & password
            const user = await UserModel.findOne({ email })
            const isPasswordValid = user && await bcrypt.compare(password, user.password)
            if (!user || !isPasswordValid) return res.json({ status: 'error', message: 'invalid credentials' })

            // check if account is activated
            if (!user.isActivated) return res.json({ status: 'error', message: 'account is not activated' })

            // generate jwt tokens
            // const refreshJwtTokenExpirationDays = 30
            // const accessJwtToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '8h' })
            const accessJwtToken = getAccessJwtToken({ email })
            // const refreshJwtToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: \`\${refreshJwtTokenExpirationDays}d\` })
            const refreshJwtToken = getRefreshJwtToken({ email })

            // put refresh token in cookie
            res.cookie('refreshJwtToken', refreshJwtToken, { maxAge: refreshJwtTokenExpirationSeconds * 1000, httpOnly: true })

            // put refresh token in db (also update login date)
            const filter = { email }
            const update = { loggedAt: new Date(), refreshJwtToken }
            await UserModel.findOneAndUpdate(filter, update)

            // return access token to the client
            res.json({ status: 'ok', message: \`user with email: \${email} logged in and tokens are refreshed\`, accessJwtToken })
          } catch (error: any) {
            next(error)
          }
        })
      `}</Code>

      <H>refreshRouter</H>

      <Code block jsx>{`
      // refreshRouter.ts
      import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
      import { UserModel } from '../db/models/user.model'
      import { getAccessJwtToken, getRefreshJwtToken, refreshJwtTokenExpirationSeconds, verifyRefreshJwtToken } from '../services/jwt/jwt'

      export const refreshRouter = express.Router()
      refreshRouter.get('/', async (req: ReqType, res: ResType, next: NextType) => {
        try {
          // get refresh token from cookie
          const { refreshJwtToken } = req.cookies
          if (!refreshJwtToken) res.json({ status: 'error', message: 'no refresh token found in cookies during token refresh, probably not authorized' })

          // check if token is ok
          const { email } = verifyRefreshJwtToken(refreshJwtToken)
          if (!email) res.json({ status: 'error', message: 'refresh token is not validated, probably not authorized' })

          // find token in db
          const user = await UserModel.findOne({ refreshJwtToken })
          if (!user) return res.json({ status: 'error', message: 'no user found with such refresh token in db' })

          // generate refresh token and save in db
          const updatedRefreshJwtToken = getRefreshJwtToken({ email })
          res.cookie('refreshJwtToken', updatedRefreshJwtToken, { maxAge: refreshJwtTokenExpirationSeconds * 1000, httpOnly: true })
          await UserModel.findOneAndUpdate({ email }, { refreshJwtToken: updatedRefreshJwtToken })

          // generate access token and send to client
          const accessJwtToken = getAccessJwtToken({ email })

          // send response
          res.json({ status: 'ok', message: \`refresh token for email: \${email} is refreshed\`, accessJwtToken })
        } catch (error) {
          next(error)
        }
      })
      `}</Code>

      <H>logoutRouter</H>

      <Code block jsx>{`
      // logoutRouter.ts
      import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
      import { UserModel } from '../db/models/user.model'
      // eslint-disable-next-line camelcase
      import jwt_decode from 'jwt-decode'

      export const logoutRouter = express.Router()
      logoutRouter.get('/', async (req: ReqType, res: ResType, next: NextType) => {
        try {
          // check refresh token
          const { refreshJwtToken } = req.cookies
          if (!refreshJwtToken) res.json({ status: 'error', message: 'no refresh token in cookies, probably already logged out' })

          // get email from refresh token
          const { email }: { email: string } = jwt_decode(refreshJwtToken)
          if (!email) res.json({ status: 'error', message: 'can not retrieve email from refresh token' })

          // delete refreshJwtToken from cookie
          res.clearCookie('refreshJwtToken')

          // delete token from db
          const user = await UserModel.findOne({ refreshJwtToken })
          if (!user) return res.json({ status: 'error', message: 'no user find with such refresh token' })
          user.refreshJwtToken = undefined
          await user.save()

          // send response
          res.json({ status: 'ok', message: \`user with email: \${email} logged out\` })
        } catch (error) {
          next(error)
        }
      })
      `}</Code>

      <H>verifyToken middleware</H>

      <Code block jsx>{`
      // verifyToken.ts
      import { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
      import { verifyAccessJwtToken } from '../services/jwt/jwt'

      export function verifyToken(req: any, res: ResType, next: NextType) {
        try {
          const accessJwtToken = req.headers['access-jwt-token'] as string
          const { email } = verifyAccessJwtToken(accessJwtToken)
          req.email = email // can add email in header, maybe useful for something
          next()
        } catch (error: any) {
          return res.status(401).send('accessJwtToken is not verified, user is not authorized')
        }
      }
      `}</Code>

      <H>get & verify tokens</H>

      <Code block jsx>{`
      // jwt.ts
      import jwt, { JwtPayload } from 'jsonwebtoken'

      const accessJwtTokenExpirationSeconds = 15 * 60 // 15 min
      export const refreshJwtTokenExpirationSeconds = 30 * 24 * 60 * 60 // 30 days

      export const getAccessJwtToken = (payload: string | object) => jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: accessJwtTokenExpirationSeconds })
      export const getRefreshJwtToken = (payload: string | object) => jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: refreshJwtTokenExpirationSeconds })
      export const verifyAccessJwtToken = (accessJwtToken: string) => jwt.verify(accessJwtToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload
      export const verifyRefreshJwtToken = (refreshJwtToken: string) => jwt.verify(refreshJwtToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload
      `}</Code>

      <H>Axios</H>

      <Code block jsx>{`
      // axios.ts
      import axios from 'axios'

      export const axiosWithAuth = axios.create({ withCredentials: true })

      axiosWithAuth.interceptors.request.use((config) => {
        const accessJwtToken = localStorage.getItem('accessJwtToken')
        if (config.headers && accessJwtToken) {
          config.headers['access-jwt-token'] = accessJwtToken
        }
        return config
      })

      axiosWithAuth.interceptors.response.use(
        (config) => {
          return config
        },
        async (error) => {
          const originalRequest = error.config
          if (error.response.status === 401 && error.config && !error.config._isRetry) {
            try {
              originalRequest._isRetry = true
              const response = await axios.get('/api/refresh', { withCredentials: true })
              const accessJwtToken = response.data.accessJwtToken
              accessJwtToken && localStorage.setItem('accessJwtToken', accessJwtToken)
              !accessJwtToken && localStorage.removeItem('accessJwtToken')
              return axiosWithAuth.request(originalRequest)
            } catch (error) {
              console.log('not authorized')
              console.log(error)
            }
          }

          if (error.response.status === 401) {
            // todo: logout in redux
            // todo: suggest to login
          }

          throw error
        }
      )
      `}</Code>

      <H>Frontend functions</H>

      <Code block jsx>{`
      async function registerUser(e: EventType) {
        e.preventDefault()
        try {
          const method = 'POST'
          const headers = { 'Content-Type': 'application/json' }
          const { email, password } = inputValue
          const body = JSON.stringify({ email, password })
          const options = { method, headers, body }
          const res = await fetch('/api/register', options)
          const data = await res.json()
          data.status === 'error' && data.message === 'user with such email already exists' && notify({ msg: 'Already registered', type: 'info', theme: 'light' })
          data.status === 'ok' && notify({ msg: 'Check your email and confirm registration.', theme: 'light' })
          console.log(data)
        } catch (err) {
          console.log(err)
          notify({ msg: 'Registration failed', type: 'error', theme: 'light' })
        } finally {
          // remove spinner from the button
        }
      }
      `}</Code>

      <Code block jsx>{`
      async function loginUser(e: EventType) {
        e.preventDefault()
        const method = 'POST'
        const headers = { 'Content-Type': 'application/json' }
        const { email, password } = credentials
        const body = JSON.stringify({ email, password })
        const options = { method, headers, body }
        const res = await fetch('/api/login', options)
        const data = await res.json()
        console.log(data)
        if (data.status === 'error') {
          alert(data.message)
          return localStorage.removeItem('accessJwtToken')
        }
        localStorage.setItem('accessJwtToken', data.accessJwtToken)
        alert('logged in')
        navigate('/')
      }
      `}</Code>

      <Code block jsx>{`
      async function refreshTokens() {
        // todo: move function into 'functions' folder in a file of folder with credentials business logic
        // todo: separate helper files by a business logic
        try {
          if (!localStorage.getItem('accessJwtToken')) return console.log('user is not logged in')
          const response = await axios.get('/api/refresh', { withCredentials: true })
          if (response.data.status === 'error') {
            console.log(response.data.message)
            localStorage.removeItem('accessJwtToken')
          }
          if (!response.data.accessJwtToken) return console.log(666)
          const accessJwtToken = response.data.accessJwtToken
          const jwtTokenPayload: {email: string | undefined} = jwt_decode(accessJwtToken)
          const { email } = jwtTokenPayload
          if (!email) return console.log('token is not valid')
          localStorage.setItem('accessJwtToken', response.data.accessJwtToken)
          console.log(response)
          console.log(\`tokens for user with email: \${email} are refreshed\`)
        } catch (error) {
          console.log(error)
        }
      }
      `}</Code>

      <Code block jsx>{`
      async function getUsersFromDb() {
        try {
          const res = await axiosWithAuth('/api/users')
          console.log(res)
        } catch (error) {
          console.log(error)
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
