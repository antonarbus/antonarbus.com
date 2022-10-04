import { Code, Lnk, useState, jsxToStr } from '/components/post/reExport'
import randomNumFromTo from '/functions/randomNumFromTo'
import sleeper from '/functions/sleeper'
import axios from 'axios'

// #region
function ComponentWithUseState() {
  const [state, setState] = useState({ loading: false, errorMsg: '', title: '', postNum: -1 })

  function getTitle() {
    const postNum = randomNumFromTo(1, 150)
    const url = `https://jsonplaceholder.typicode.com/posts/${postNum}`

    setState({ ...state, loading: true, postNum, errorMsg: '' })
    axios(url)
      .then(sleeper(1000))
      .then(res => setState({ loading: false, errorMsg: '', title: res.data.title, postNum }))
      .catch(() => setState({ loading: false, errorMsg: 'ERROR', title: '', postNum }))
  }

  return (
    <>
      <div><button onClick={getTitle}>Get random post title</button></div>
      <div>Post #{state.postNum}  </div>
      <div>Title: {state.loading ? 'Loading...' : state.title} </div>
      <div><span style={{ color: 'red' }}>{state.errorMsg}</span></div>
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
      <p>
        Let's fetch data from{' '}
        <Lnk path={'https://jsonplaceholder.typicode.com/guide/'}> jsonplaceholder </Lnk>
        and set a state with <Code>useState()</Code> hook upon success or error, which
        will lead to a render.
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

      <p><Lnk path={'https://jsonplaceholder.typicode.com/guide/'}>Jsonplaceholder</Lnk> returns 100 items, so every time we ask data under number 101 and more we get an error for our http request.</p>

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
