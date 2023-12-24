import { Code, H, jsxToStr } from '/components/post/reExport'
import syncWait from '/functions/syncWait'
import axios from 'axios'
import sleeper from '/functions/sleeper'

// #region SYNC delay
function SynchDelay () {
  const sayHiWithDelay = () => {
    syncWait(2000)
    alert('hi')
  }
  return <>
    <button onClick={sayHiWithDelay}>Say 'hi' with delay</button>
  </>
}
// #endregion

// #region promise with delay
function PromiseWithDelayExample () {
  return (
    <>
      <button
        onClick={() => {
          alert('start request')
          axios('https://jsonplaceholder.typicode.com/posts/1')
            .then(res => alert(`Title: ${res.data.title}`))
            .catch(err => alert(JSON.stringify(err)))
        }}
      >
        Get respond from server
      </button>
      <br />
      <button
        onClick={() => {
          alert('start request with 3s delay')
          axios('https://jsonplaceholder.typicode.com/posts/1')
            .then(sleeper(3000))
            .then(res => alert(`Title: ${res.data.title}`))
            .catch(err => alert(JSON.stringify(err)))
        }}
      >
        Get respond from server with delay
      </button>
    </>
  )
}
// #endregion

const postObj = {
  title: 'delay',
  date: '2021.10.19',
  tags: ['JavaScript', 'function'],
  imgUrl: 'https://antonarbus.com/imgs/delay.png',
  desc: 'delay for synchronous function and for promise',
  body: (
    <>
      <H>Synchronous delay</H>

      <Code block jsx>{`
      // syncWait.js
      export default function syncWait(ms = 1000) {
        const end = Date.now() + ms
        while (Date.now() < end) continue
      }
      `}</Code>

      <Code block jsx>{`
      import syncWait from '/functions/syncWait'

      function SynchDelay() {
        const sayHiWithDelay = () => {
          syncWait(2000)
          alert('hi')
        }
        return <>
          <button onClick={sayHiWithDelay}>Say 'hi' with delay</button>
        </>
      }
      `}</Code>

      <SynchDelay />

      <H>Promise with delay</H>

      <Code block jsx>{`
      // sleeper.js
      function sleeper(ms = 1000) {
        return new Promise(resolve => setTimeout(() => resolve('done'), ms))
      }
      `}</Code>

      <Code block jsx>{`
      // the usage
      axios('https://jsonplaceholder.typicode.com/posts/1')
        .then(() => sleeper(3000))
        .then(res => alert('Title: ' + res.data.title))
      `}</Code>

      <p>Full code</p>

      <Code block jsx>{`
      import axios from 'axios'
      import sleeper from '../../../../helpers/functions/sleeper'

      function Component() {
        return (
          <>
            <button
              onClick={() => {
                alert('start request')
                axios('https://jsonplaceholder.typicode.com/posts/1')
                  .then(res => alert(\`Title: \${res.data.title}\`))
                  .catch(err => alert(JSON.stringify(err)))
              }}
            >
              Get respond from server
            </button>
            <br/>
            <button
              onClick={() => {
                alert('start request with 3s delay')
                axios('https://jsonplaceholder.typicode.com/posts/1')
                  .then(sleeper(3000))
                  .then(res => alert(\`Title: \${res.data.title}\`))
                  .catch(err => alert(JSON.stringify(err)))
              }}
            >
              Get respond from server with delay
            </button>
          </>
        )
      }
      `}</Code>

      <PromiseWithDelayExample />

      <H>Delay an api response by 5 sec</H>

      <Code block jsx>{`
        app.get('/api', async (_req: Req, res: Res) => {
          await new Promise(resolve => {
            setTimeout(() => resolve('done'), 5000)
          })
          return res.json({ url: '/api', data: 'some data' })
        })
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
