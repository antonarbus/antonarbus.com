import { Code, useState, jsxToStr } from '/components/post/reExport'
import useIsInitRender from '/functions/useIsInitRender'

// #region - useIsFirstRender

function Component() {
  const [state, setState] = useState(0)
  const isInitRender = useIsInitRender()
  return (
    <>
      <div>First render? <b>{isInitRender.toString()}</b></div>
      <div>Counter: <b>{state}</b></div>
      <button onClick={() => setState(state + 1)}>Plus +1</button>
    </>
  )
}
// #endregion

const postObj = {
  title: 'initial render',
  date: '2022.03.31',
  tags: ['react', 'custom', 'hook'],
  desc: 'custom hook to check if it an initial render',
  body: (
    <>
      <p>Custom hook to check if it is a first render or not.</p>

      <Code block>{`
      // /functions/useIsInitRender'
      import { useRef, useEffect } from 'react'

      export default function useIsInitRender() {
        const isInitRender = useRef(true)
        useEffect(() => { isInitRender.current = false }, [])
        return isInitRender.current
      }
      `}</Code>

      <Code block>{`
      import useIsInitRender from '/functions/useIsInitRender'
      
      function Component() {
        const [state, setState] = useState(0)
        const isInitRender = useIsInitRender()

        return (
          <>
            <div>First render? <b>{isFirstRender.toString()}</b></div>
            <div>Counter: <b>{state}</b></div>
            <button onClick={() => setState(state + 1)}>Plus +1</button>
          </>
        )
      }
      `}</Code>

      <Component />
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
