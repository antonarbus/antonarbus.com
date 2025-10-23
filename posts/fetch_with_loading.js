import { Suspense, use } from 'react'
import { Code, Lnk, useState, jsxToStr, H } from '/components/post/reExport'
import randomNumFromTo from '/functions/randomNumFromTo'
import sleeper from '/functions/sleeper'
import axios from 'axios'
import { ErrorBoundary } from 'react-error-boundary'

// #region
async function getTitle({ postNum }) {
  const { data } = await axios(`https://jsonplaceholder.typicode.com/posts/${postNum}`)
  await sleeper(1000)
  return data
}

function ComponentWithUseState() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [content, setContent] = useState(null)

  function handleGetTitle() {
    const postNum = randomNumFromTo(1, 150)

    setShow(true)
    setLoading(true)
    setError(null)
    setContent(null)

    axios(`https://jsonplaceholder.typicode.com/posts/${postNum}`)
      .then(sleeper(1000))
      .then((res) => {
        setLoading(false)
        setContent(res.data)
      })
      .catch((error) => {
        setLoading(false)
        setError(error)
      })
  }

  return (
    <>
      <div>
        <button onClick={handleGetTitle}>Get random post title</button>
      </div>
      {show && (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>⚠️Something went wrong</p>
          ) : (
            content && (
              <>
                <div>Post #{content.id} </div>
                <div>Title: {content.title} </div>
              </>
            )
          )}
        </>
      )}
    </>
  )
}

function TitleDisplay({ titlePromise }) {
  const titleContent = use(titlePromise)

  return (
    <>
      <div>Post #{titleContent.id} </div>
      <div>Title: {titleContent.title} </div>
    </>
  )
}

function ComponentWithUse() {
  const [titlePromise, setTitlePromise] = useState(null)
  const [show, setShow] = useState(false)

  return (
    <>
      <div>
        <button
          onClick={() => {
            setShow(true)
            setTitlePromise(getTitle({ postNum: randomNumFromTo(1, 150) }))
          }}
        >
          Get random post title
        </button>
      </div>
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>} resetKeys={[titlePromise]}>
        <Suspense fallback={<p>Loading...</p>}>
          {show && <TitleDisplay titlePromise={titlePromise} />}
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
// #endregion

const postObj = {
  title: 'fetch with loading',
  date: '2021.10.18',
  tags: ['react', 'ajax'],
  desc: 'Fetch data in React with loading indicator',
  body: (
    <>
      <H>Via useState()</H>

      <p>
        Let's fetch data from{' '}
        <Lnk path={'https://jsonplaceholder.typicode.com/guide/'}> jsonplaceholder </Lnk>
        and manage loading, error, and content states separately with <Code>useState()</Code> hooks.
      </p>

      <p>
        We put artificial 1s delay function between request and response to be able to see state
        changes on screen.
      </p>

      <Code block jsx>{`
function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}
      `}</Code>

      <p>
        <Lnk path={'https://jsonplaceholder.typicode.com/guide/'}>Jsonplaceholder</Lnk> returns 100
        posts, so when we request post #101 or higher, we get a 404 error.
      </p>

      <Code block jsx>{`
import axios from 'axios'
import randomNumFromTo from '/functions/randomNumFromTo'
import sleeper from '/functions/sleeper'

function ComponentWithUseState() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [content, setContent] = useState(null)

  function handleGetTitle() {
    const postNum = randomNumFromTo(1, 150)

    setShow(true)
    setLoading(true)
    setError(null)
    setContent(null)

    axios(\`https://jsonplaceholder.typicode.com/posts/\${postNum}\`)
      .then(sleeper(1000))
      .then((res) => {
        setLoading(false)
        setContent(res.data)
      })
      .catch((error) => {
        setLoading(false)
        setError(error)
      })
  }

  return (
    <>
      <div>
        <button onClick={handleGetTitle}>Get random post title</button>
      </div>
      {show && (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>⚠️Something went wrong</p>
          ) : (
            content && (
              <>
                <div>Post #{content.id} </div>
                <div>Title: {content.title} </div>
              </>
            )
          )}
        </>
      )}
    </>
  )
}
      `}</Code>

      <ComponentWithUseState />

      <H>Via use() hook</H>

      <p>
        Modern approach using React's <Code>use()</Code> hook with <Code>Suspense</Code> for loading states and <Code>ErrorBoundary</Code> for error handling.
      </p>

      <Code block jsx>{`
import { Suspense, use } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

async function getTitle({ postNum }) {
  const { data } = await axios(\`https://jsonplaceholder.typicode.com/posts/\${postNum}\`)
  await sleeper(1000)
  return data
}

function TitleDisplay({ titlePromise }) {
  const titleContent = use(titlePromise)

  return (
    <>
      <div>Post #{titleContent.id} </div>
      <div>Title: {titleContent.title} </div>
    </>
  )
}

function ComponentWithUse() {
  const [titlePromise, setTitlePromise] = useState(null)
  const [show, setShow] = useState(false)

  return (
    <>
      <div>
        <button
          onClick={() => {
            setShow(true)
            setTitlePromise(getTitle({ postNum: randomNumFromTo(1, 150) }))
          }}
        >
          Get random post title
        </button>
      </div>
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>} resetKeys={[titlePromise]}>
        <Suspense fallback={<p>Loading...</p>}>
          {show && <TitleDisplay titlePromise={titlePromise} />}
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
      `}</Code>

      <ComponentWithUse />
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
