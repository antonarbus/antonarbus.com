import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'react with node',
  date: '2022.06.14',
  tags: ['react', 'node'],
  imgUrl: 'https://antonarbus.com/imgs/react_node.jpg',
  desc: 'configure react client with node server',
  body: (
    <>

      <H>Create react app</H>

      <p><Code inline bash>npm create vite@latest</Code> - create react app with vite</p>
      <p><Code inline bash>npx create-react-app my-app</Code> - create react app with webpack</p>

      <H>package.json</H>

      <Code block jsx>{`
      {
        // package.json for Vite
        "name": "quotation.app",
        "private": true,
        "version": "0.0.0",
        "dependencies": {
          "concurrently": "^7.2.1",
          "express": "^4.18.1",
          "react": "^18.0.0",
          "react-dom": "^18.0.0"
        },
        "devDependencies": {
          "@types/react": "^18.0.0",
          "@types/react-dom": "^18.0.0",
          "@typescript-eslint/eslint-plugin": "^5.28.0",
          "@typescript-eslint/parser": "^5.28.0",
          "@vitejs/plugin-react": "^1.3.0",
          "eslint": "^8.17.0",
          "eslint-config-standard": "^17.0.0",
          "eslint-plugin-import": "^2.26.0",
          "eslint-plugin-n": "^15.2.2",
          "eslint-plugin-promise": "^6.0.0",
          "eslint-plugin-react": "^7.30.0",
          "nodemon": "^2.0.16",
          "typescript": "^4.6.3",
          "vite": "^2.9.9"
        },
        "scripts": {
          "dev": "vite",
          "build": "tsc && vite build",
          "preview": "vite preview",
          "server": "nodemon server.js",
          "all": "concurrently \\"npm run server\\" \\"npm run dev\\"",
          "lint": "npx eslint . --ext .js,.ts,.tsx,.jsx",
          "fix": "npx eslint . --ext .js,.ts,.tsx,.jsx --fix"
        }
      }
      `}</Code>

      <Code block json>{`
      // package.json for Webpack
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
          "eject": "react-scripts eject",
          "server": "nodemon server.js",
          "all": "concurrently \\"npm run server\\" \\"npm run client\\""
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
        "proxy": "http://localhost:3001"
      }
      `}</Code>

      <H>server.js</H>

      <Code block jsx>{`
      // server.js
      const express = require("express")
      const app = express()

      app.get("/", (req, res) => {
        res.send("This is from express.js")
      })

      app.get("/api", (req, res) => {
        res.json({ message: "I am api!" })
      })

      // start express server on port 3001
      app.listen(3001, () => {
        console.log("server started on port 3001")
      })
      `}</Code>

      <H>app.jsx</H>

      <Code block jsx>{`
      // src/App.jsx
      import React from 'react'

      function App() {
        const [data, setData] = React.useState(null);
        React.useEffect(() => {
          fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
        }, []);

        return (
          <>
            <p>{!data ? "Loading..." : data}</p>
          </>
        );
      }

      export default App
      `}</Code>

      <H>vite.config.js</H>

      <Code block jsx>{`
      import { defineConfig } from 'vite'
      import react from '@vitejs/plugin-react'

        // https://vitejs.dev/config/
        export default defineConfig({
          server: {
            proxy: {
              '/api': 'http://localhost:3001/'
            }
          },
          plugins: [
            react()
          ]
        })
      `}</Code>

      <H>Launch servers</H>

      <p><Code inline bash>npm run all</Code> launch server and client dev</p>
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
