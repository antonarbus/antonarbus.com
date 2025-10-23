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
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
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
      <H>Via React.useEffect()</H>

      <p>
        Let's fetch data from{' '}
        <Lnk path={'https://jsonplaceholder.typicode.com/guide/'}> jsonplaceholder </Lnk>
        and set a state with <Code>useState()</Code> hook upon success or error, which will lead to
        a render.
      </p>

      <p>
        We put artificial 1s delay function between request and response to be able to see a state
        change on a screen, otherwise it happens too fast.
      </p>

      <Code block>{`
        function sleeper(ms) {
          return function(x) {
            return new Promise(resolve => setTimeout(() => resolve(x), ms));
          };
        }
      `}</Code>

      <p>
        <Lnk path={'https://jsonplaceholder.typicode.com/guide/'}>Jsonplaceholder</Lnk> returns 100
        items, so every time we ask data under number 101 and more we get an error for our http
        request.
      </p>

      <Code block>{`
      import axios from 'axios'
      import randomNumFromTo from '/functions/randomNumFromTo';
      import sleeper from '/functions/sleeper';

      function ComponentWithUseState() {
        const [state, setState] = useState({ loading: false, errorMsg: '', title: '', postNum: -1 })
      
        function getTitle() {
          const postNum = randomNumFromTo(1, 150)
          const url = \`https://jsonplaceholder.typicode.com/posts/\${postNum}\`
          setState({ ...state, loading: true, postNum: postNum, errorMsg: '' })
          axios(url)
            .then(sleeper(1000))
            .then(res => setState({ loading: false, errorMsg: '', title: res.data.title, postNum: postNum }))
            .catch(() => setState({ loading: false, errorMsg: 'ERROR', title: '', postNum: postNum }))
        }
      
        return (
          <>
            <button onClick={getTitle}>Get post titles</button>&emsp;
            Post #{state.postNum} &emsp; Title: {state.loading ? 'Loading...' : state.title} &emsp;
            <span style={{ color: 'red' }}>{state.errorMsg}</span>
          </>
        )
      }
      `}</Code>

      <ComponentWithUseState />

      <H>Via React.use()</H>

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
