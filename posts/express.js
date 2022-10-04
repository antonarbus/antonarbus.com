import { Code, H, Lnk, Hs, LazyImg, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'express',
  date: '2021.10.26',
  tags: ['express'],
  desc: 'Node.js Express configuration for React app',
  body: (
    <>
      <H>Install</H>

      <ul>
        <li>Installation <Lnk path='http://expressjs.com/en/starter/installing.html'>guide</Lnk></li>
        <li>In terminal <Code bash>npm i express</Code></li>
      </ul>

      <H>HTTP server</H>

      <Hs>Basic server</Hs>

      <Code block js>{`
      // index.js
      const express = require('express') 
      const app = express()
      const path = require('path') 
      const PORT = process.env.PORT || 5000
      app.listen(PORT, () => console.log(\`Server started on port \${PORT}\`))
      `}</Code>

      <Hs>Static files</Hs>

      <Code block>{`
      const path = require('path')

      app.use(express.static(path.join(__dirname, 'public'), { 
        index: false, 
        extensions:['html'] // no need to put html extension
      }))
      app.use(express.static('some other directory')) // looks up files in the order static directories are set
      // manually serve files
      app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html'))) 
      `}</Code>

      <p>To start a server run <Code bash>node index.js</Code></p>

      <H>Hot restart</H>

      <ul>
        <li>Every update we do to our project files requires manual server restart with <kbd>Ctrl</kbd>+<kbd>C</kbd> & <Code bash>node index.js</Code></li>
        <li>To avoid it we may install <Lnk path='https://www.npmjs.com/package/nodemon'>nodemon</Lnk> tool and launch our server via it</li>
        <li>In terminal <Code bash>npm i -D nodemon</Code> to install the package as a development dependency</li>
        <li>Add into <code>package.json</code> following scripts</li>
        <Code block json>{`
        "scripts": {
          "start": "node index",
          "dev": "nodemon index"
        },
        `}</Code>
        <li>Launch server via <Code bash>npm run dev</Code></li>
        <li>Now the server will be restarted automatically on every file update</li>
      </ul>

      <H>API documentation</H>

      <Lnk>https://expressjs.com/en/4x/api.html</Lnk>

      <H>Middleware</H>

      <ul>
        <li>Express is a routing and middleware web framework</li>
        <li>Express app is a series of middleware function calls</li>
        <li>Middleware functions can execute any code</li>
        <li>Can change the request or response objects</li>
        <li>End the request-response cycle</li>
        <li>Call the next middleware function in the stack</li>
      </ul>

      <H>app.use()</H>

      <ul>
        <li>Mounts the specified middleware function(s) at the specified path</li>
        <li>Middleware function is executed when the base of the requested path matches path.</li>
      </ul>

      <Hs>Middleware function parameters</Hs>

      <p>MW function has access to request & response objects and has the <Code>next</Code> function, which calls the next middleware function</p>

      <Code block>{`
      app.use('/user/:id', (req, res, next) => {
        console.log('Request Type:', req.method)
        next()
      })
      `}</Code>

      <Hs>Application level middleware</Hs>

      <Code block>{`
      const timeLogs = (req, res, next) => {
        console.log(\`URL hit: \${req.protocol}://\${req.get('host')}\${req.originalUrl} on \${new Date().toString()}\`)
        next()
      }
      app.use(timeLogs)
      `}</Code>

      <p>Every time the app receives a request, it prints the log message to the terminal</p>

      <Hs>Middleware in a separate file</Hs>

      <p>Add custom property to the request object</p>

      <Code block>{`
      // /middleware/hitTime
      const hitTime = (req, res, next) => {
        req.hitTime = new Date()
        console.log(\`added time to request object\`)
        next()
      }
      module.exports = hitTime
      `}</Code>

      <Code block>{`
        // index.js
        const addHitTimeToReqObj = require('./middleware/hitTime')
        app.use('/checkAddedHitTimeToRequest', addHitTimeToReqObj)
      `}</Code>

      <p>Middleware function will be triggered when a user hit the url <Lnk>http://localhost:5000/checkAddedHitTimeToRequest</Lnk></p>

      <p>We can show this newly added object on the screen adding HTTP GET request route.</p>

      <Code block>{`
        app.get(
          '/checkAddedHitTimeToRequest', 
          (req, res) => res.send(req.hitTime.toDateString() + req.hitTime.toLocaleTimeString())
        )
      `}</Code>

      <LazyImg path='/imgs/express/checkAddedHitTimeToRequest.png' />

      <Hs>Middleware with parameters</Hs>

      <ul>
        <li>We can not pass parameters into a middleware function directly, because in <Code js>app.use()</Code> we have to pass only a reference to a middleware function</li>
        <li>That's why we need to create a helper function, which can accept arguments, and return a middleware function with passed parameters</li>
      </ul>

      <Code block>{`
      const mwWithOpt = (flag = true) => {
        return function (req, res, next) {
          if (flag) console.log('triggered') 
          next()
        }
      }
      app.use(mwWithOpt(false))
      `}</Code>

      <ul>
        <li>Will not see 'hi' in console, because we passed <code>false</code> param to a middleware function</li>
        <li>None of further middleware functions are triggered if <code>false</code> is passed, because <Code js>next()</Code> is never called</li>
      </ul>

      <H>next() vs next('route')</H>

      <Hs>next()</Hs>

      <Code block>{`
      app.get('/next', 
        (req, res, next) => {
          console.log('app.get("/next") - 01')
          next()
        }, 
        (req, res, next) => {
          console.log('app.get("/next") - 02')
          next()
        }
      ) 
      app.use(function(req, res, next) {
        console.log('app.use() - 03')
        next()
      })
      app.get('something_else', function(req, res, next) {
        console.log('app.get("/something_else") - 04')
        next()
      })
      app.get('/next', function(req, res, next) {
        console.log('app.get("/next") - 05')
        next()
      })
      `}</Code>

      <p>Hit <Lnk>http://localhost:5000/next</Lnk> and get in console</p>

      <Code block none>{`
      app.get("/next") - 01
      app.get("/next") - 02
      app.use() - 03
      app.get("/next") - 05
      `}</Code>

      <Hs>next('route')</Hs>

      <p><Code js>next('route')</Code>passes control to the next matching route (GET, POST, PUT, DELETE methods).</p>

      <Code block>{`
      app.get('/next', 
        (req, res, next) => {
          console.log('app.get("/next") - 01')
          next('route')
        }, 
        (req, res, next) => {
          console.log('app.get("/next") - 02')
          next()
        }
      ) 
      app.use(function(req, res, next) {
        console.log('app.use() - 03')
        next()
      })
      app.get('something_else', function(req, res, next) {
        console.log('app.get("/something_else") - 04')
        next()
      })
      app.get('/next', function(req, res, next) {
        console.log('app.get("/next") - 05')
        next()
      })
      `}</Code>

      <p>Hit <Lnk>http://localhost:5000/next</Lnk> and get in console.</p>

      <Code block none>{`
      app.get("/next") - 01
      app.use() - 03
      app.get("/next") - 05
      `}</Code>

      <H>Routing</H>

      <p>Routes HTTP GET requests to the specified path with the specified callback functions.</p>

      <Hs>app.get()</Hs>

      <Code block>{`
        app.get('/get', (req, res) => res.send('<h1>get request for /get url</h1>'))
      `}</Code>

      <p>Hit <Lnk>http://localhost:5000/get</Lnk> and get rendered text on a screen.</p>

      <Hs>app.post()</Hs>

      <Code block>{`
      app.post('/post', (req, res) => res.send(hi'))
      `}</Code>

      <p>We can make a post request from node file.</p>

      <Code block>{`
      // /axios.js
      const axios = require('axios');

      axios.post('http://localhost:3000/post')
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      `}</Code>

      <p>When we execute <Code bash>node axios.js</Code> we get <code>hi</code> in console</p>

      <p>Also can send the request from the browser's console and get the same result</p>

      <Code block>{`
      fetch('/post', { method: 'POST' })
        .then(response => response.text())
        .then(msg => console.log(msg))
      `}</Code>

      <p>There might be a security restriction and we should provide some <Lnk path='https://content-security-policy.com/'>content-security-policy parameters</Lnk> into request headers by middleware function in our http server file.</p>

      <Code block>{`
      app.use(function(req, res, next) {
        res.header("Content-Security-Policy", "default-src 'self'")
        next()
      })
      `}</Code>

      <Hs>app.all()</Hs>

      <Code block>{`
      app.all('/all', (req, res, next) => {
        res.send('<h1>all</h1>')
        console.log('middleware1 for all http requests')
        next() // pass control to the next handler
      })
      app.all('/all', (req, res, next) => console.log('middleware2 for all http requests'))
      app.all('/all', (req, res, next) => console.log('middleware3 for all http requests')) 
      `}</Code>

      <ul>
        <li>Note, we can have multiple middleware functions for the same path. </li>
        <li>Last middleware will not be triggered, because <Code js>next()</Code> function was not called at the 2nd function</li>
      </ul>

      <H>Multiple functions in one method</H>

      <Hs>Comma separated</Hs>

      <Code block>{`
      app.get(
        '/hi', 
        function (req, res, next) {
          console.log('Hello')
          next()
        }, 
        function (req, res) {
          console.log('Hello again')
          res.send('Hello!')
        }
      )
      `}</Code>

      <Hs>In array</Hs>

      <Code block>{`
      const a = (req, res, next) => { console.log('a'); next(); }
      const b = (req, res, next) => { console.log('b'); next(); }
      const c = (req, res)       => { console.log('c'); res.send('Hello from c!'); }

      app.get('/path1', [a, b, c])
      app.get('/path2', a, [b, c])
      `}</Code>

      <H>Path accepts RegExp</H>

      <Code block>{`
      // http://localhost:5000/asdfhljljalasd73
      app.get(
        /.*73$/, 
        (req, res) => res.send('<h1>any url ending with "73" matching regexp /.*73$/</h1>')
      )

      // http://localhost:5000/about?fav_language=HTML&vehicle1=Bike&vehicle2=Car
      app.get(
        /\/about.*/, 
        (req, res, next) => {
          console.log(req.query) // { fav_language: 'HTML', vehicle1: 'Bike', vehicle2: 'Car' }
          next()
        }
      )
      `}</Code>

      <H>Dynamic route & <code>req.params</code></H>

      <Code block>{`
      // http://localhost:5000/users/34/books/8989
      app.get(
        '/users/:userId/books/:bookId', 
        (req, res) => res.send(req.params) // { "userId": "34", "bookId": "8989" }
      ) 

      // hyphen (-) and the dot (.) are interpreted literally
      // http://localhost:5000/flights/LAX-SFO
      app.get(
        '/flights/:from-:to', 
        (req, res) => res.send(req.params) // { "from": "LAX", "to": "SFO" }
      ) 

      // regexp can be used in parentheses ()
      // http://localhost:5000/user/42
      app.get(
        '/user/:userId(\\d+)', 
        (req, res) => res.send(req.params) // {"userId": "42"}
      ) 
      `}</Code>

      <H>Chainable routing</H>

      <Code block>{`
      app.route('/book')
        .get((req, res, next) => res.send('Get a random book'))
        .post((req, res) => res.send('Add a book'))
        .put((req, res) => res.send('Update the book'))
      `}</Code>

      <H>Router</H>

      <p>We can extract routes and middlewares to a separate files with router objects.</p>

      <Code block>{`
      // /animals/routerFile.js
      // creates a router as a module, loads a middleware function in it,
      // defines routes, and mounts the router module on a path in the main app

      var express = require('express')
      var animalRouter = express.Router()

      // middleware that is specific to this router
      animalRouter.use(function timeLog (req, res, next) {
        console.log('Time: ', Date.now())
        next()
      })

      // define the cats page route
      animalRouter.get('/', (req, res) => res.send('main page for animals'))

      // define the dogs page route
      animalRouter.get('/dogs', (req, res) => res.send('page for dogs'))

      module.exports = animalRouter
      `}</Code>

      <Code block>{`
        // index.js
        // load the router module in the app
        const routerAnimals = require('./animals/routerFile.js')
        // http://localhost:5000/animals
        // http://localhost:5000/animals/dogs
        app.use('/animals', routerAnimals)
      `}</Code>

      <H>Res methods</H>

      <Hs>res.json()</Hs>

      <Code block>{`
      app.get('/json', (req, res) => res.json({id: 1, name: 'John'}))
      `}</Code>

      <Hs>res.send()</Hs>

      <p>Same as <Code>res.json()</Code></p>

      <Code block>{`
      app.get('/send', (req, res) => res.send({id: 1, name: 'John'}))
      `}</Code>

      <p>File download starts.</p>

      <Code block>{`
      app.get('/send-buffer', (req, res) => res.send(Buffer.from('whoop'))) 
      `}</Code>

      <Code block>{`
      app.get('/send', (req, res) => res.send('<p style="color:red">some html</p>'))
      `}</Code>

      <p>Note, it just returns partially rendered page, without styling. To enable styles need to adjust <Lnk path='https://content-security-policy.com/'>content-security-policy</Lnk>.</p>

      <Code block>{`
      app.use(function(req, res, next) {
        res.header("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline';")
        next()
      })
      `}</Code>

      <LazyImg src='/imgs/express/resSendHtmlString.png'/>

      <Hs>res.status()</Hs>

      <Code block>{`
      app.get('/send-error-status-ver1', (req, res) => res.status(404).send('404: Sorry, we cannot find that!'))
      app.get('/send-error-status-ver2', (req, res) => res.sendStatus(404))
      `}</Code>

      <Hs>res.redirect()</Hs>

      <Code block>{`
      app.get('/redirect', (req, res) => res.redirect(301, 'https://google.com'))
      `}</Code>

      <Hs>res.sendFile()</Hs>

      <ul>
        <li>Put file <code>/911.pdf</code> in the root folder</li>
        <li>File will be opened in the browser</li>
        <li>Same way can serve html files into the browser</li>
      </ul>

      <Code block>{`
      const path = require('path')
      app.get('/sendFile/:file', (req, res) => {
        console.log(req.params)
        res.sendFile(path.join(__dirname, req.params.file))
      })
      `}</Code>

      <Hs>res.download()</Hs>

      <p>File will be downloaded.</p>

      <Code block>{`
        app.get('/download', (req, res) => res.download('911.pdf')) 
      `}</Code>

      <Hs>res.render()</Hs>

      <ul>
        <li>Renders a view from the template engine app</li>
        <li>Use <Lnk path='https://pugjs.org/api/getting-started.html'>Pug</Lnk> rendering app for example</li>
        <li>Install <Code bash>npm install pug</Code></li>
        <li>Create <code>/views/index.pug</code> file as in <Lnk path='http://expressjs.com/en/guide/using-template-engines.html'>example</Lnk></li>
      </ul>

      <Code block none>{`
      // views\index.pug
      html
        head
          title= title
        body
          h1(style={'color': 'red'})= message
      `}</Code>

      <Code block>{`
      app.set('view engine', 'pug')
      app.get('/pug', (req, res) => {
        res.render('index', { title: 'Hey', message: 'Hello there!' })
      })
      `}</Code>

      <Hs>res.end()</Hs>

      <Code block>{`
      app.get('/end', (req, res) => res.status(404).end("<h1 style='color:red;'> Error! </h1>"))
      `}</Code>

      <Hs>res.set()</Hs>

      <p>Creates or replaces header</p>

      <Code block>{`

      app.use((req, res, next) => {
        res.set('xxx', '1')
        res.set('xxx', '2')
        res.set('xxx', '3')
        res.set('xxx', '4').send('check the response header')
        // only xxx: 4 will be in header

        res.set('Content-Type', 'text/plain')

        // multiple headers
        res.set({
          'Content-Type': 'text/plain',
          'Content-Length': '123',
          ETag: '12345'
        })

        next()
      }) 

      `}</Code>

      <Hs>res.append()</Hs>

      <p>Appends value to the HTTP response header field.</p>

      <Code block>{`
      app.get('/append', (req, res) => {
        res.append('xxx', '1')
        res.append('xxx', '2')
        res.append('xxx', '3')
        res.append('xxx', '4').send('check the response header')
        // all 4 properties will be listed in response header
        next()
      }) 
      `}</Code>

      <H>POST request from html form and fetch</H>

      <Lnk>https://antonarbus.com/posts/post_requests</Lnk>

      <H>Serve React static folder from Express</H>

      <Code block js>{`
        const express = require('express')
        const path = require('path')
        const app = express()
        const PORT = 3010
        
        // React static files from 'build' folder
        app.use(express.static(path.join(__dirname, '..', 'build')))
        
        // not needed, just an exampe, how to serve spcific file for the url
        app.get('/', function (req, res) {
          res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
        })
        
        // all other routes go via React routes to index.html
        app.get('/*', (req, res) => {
          res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
        })
        
        app.listen(PORT, () => console.log(\`Server started on port \${PORT}\`))
      `}</Code>

      <H>Route from React to Express APIs</H>

      <Code block jsx>{`
      // server.js
      const express = require('express')
      const app = express()

      app.get('/hi', (req, res) => {
        res.json({ message: 'hi!' })
      })

      app.listen(3001, () => {
        console.log('server started on port 3001')
      })
      `}</Code>

      <Code block jsx>{`
      // app.js
      import React from 'react'

      function App () {
        const [data, setData] = React.useState(null)
        React.useEffect(() => {
          fetch('/hi')
            .then((res) => res.json())
            .then((data) => setData(data.message))
        }, [])

        return (
          <>
            <p>{!data ? 'Loading...' : data}</p>
          </>
        )
      }
      export default App
      `}</Code>

      <p>Add proxy into <code>package.json</code></p>

      <Code block json>{`
        {
          "name": "quotation.app",
          "version": "0.1.0",
          "private": true,
          "dependencies": {
            "@testing-library/jest-dom": "^5.16.4",
            "@testing-library/react": "^13.3.0",
            "@testing-library/user-event": "^13.5.0",
            "concurrently": "^7.2.1",
            "express": "^4.18.1",
            "nodemon": "^2.0.16",
            "react": "^18.1.0",
            "react-dom": "^18.1.0",
            "react-scripts": "5.0.1",
            "web-vitals": "^2.1.4"
          },
          "scripts": {
            "client": "react-scripts start",
            "build": "react-scripts build",
            "test": "react-scripts test",
            "lint": "eslint '**/*.js'",
            "eject": "react-scripts eject",
            "server": "nodemon server.js",
            "dev": "concurrently \"npm run server\" \"npm run client\""
          },
          "eslintConfig": {
            "extends": [
              "react-app",
              "react-app/jest"
            ]
          },
          "browserslist": {
            "production": [
              ">0.2%",
              "not dead",
              "not op_mini all"
            ],
            "development": [
              "last 1 chrome version",
              "last 1 firefox version",
              "last 1 safari version"
            ]
          },
          "devDependencies": {
            "eslint": "^8.17.0",
            "eslint-config-standard": "^17.0.0",
            "eslint-plugin-import": "^2.26.0",
            "eslint-plugin-n": "^15.2.1",
            "eslint-plugin-promise": "^6.0.0",
            "eslint-plugin-react": "^7.30.0"
          },
          "proxy": "http://localhost:3001"
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
