'use client'

import {
  Code,
  Hs,
  LazyImg,
  Lnk,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  jsxToStr
} from '/components/post/reExport'
import syncWait from '../helpers/syncWait'
import useIsInitRender from '../helpers/useIsInitRender'

function Component() {
  const [state, setState] = useState(false)
  const firstRenderForLayoutEffect = useIsInitRender()
  const firstRenderForUseEffect = useIsInitRender()
  const ref = useRef(null)
  const toggleState = () => setState(!state)

  useLayoutEffect(() => {
    if (firstRenderForLayoutEffect) return
    syncWait(2000)
    ref.current.innerHTML += '<div>useLayoutEffect() triggered</div>'
  }, [state])

  useEffect(() => {
    if (firstRenderForUseEffect) return
    syncWait(2000)
    ref.current.innerHTML += '<div>useEffect() triggered</div>'
  }, [state])

  return (
    <>
      <div>
        {' '}
        State: <b>{state.toString()}</b>{' '}
      </div>
      <button onClick={toggleState}>Toggle state</button>
      <div ref={ref}></div>
    </>
  )
}

const postObj = {
  title: 'React.useLayoutEffect',
  date: '2021.10.22',
  tags: ['react', 'hook', 'basics'],
  desc: 'useLayoutEffect hook in react',
  body: (
    <>
      <ul>
        <li>
          <Code js>useEffect()</Code> runs a callback after component is rendered
        </li>
        <li>
          <Code js>useLayoutEffect()</Code> runs callback after component is executed, DOM is
          calculated, but before it really shows on a screen
        </li>
        <li>
          It is useful to calculate something based on element dimensions and move element somewhere
          based on calculations before rendering on screen, to avoid screen flashes.{' '}
        </li>
        <li>
          Do not use it until it is really needed, because it is synchronous and blocks browser.
        </li>
      </ul>

      <Hs>Example</Hs>

      <p>
        Let's synchronously delay message with 2s with{' '}
        <Code js>useLayoutEffect(func, [state])</Code> & <Code js>useEffect(func, [state])</Code>{' '}
        and check the difference.
      </p>

      <Code block>{`
      import syncWait from '/functions/syncWait'
      import useIsInitRender from '/functions/useIsInitRender'

      function Component() {
        const [state, setState] = useState(false)
        const firstRenderForLayoutEffect = useIsInitRender()
        const firstRenderForUseEffect = useIsInitRender()
        const ref = useRef(null)
        const toggleState = () => setState(!state)

        useLayoutEffect(() => {
          if (firstRenderForLayoutEffect) return
          syncWait(2000)
          ref.current.innerHTML += '<div>useLayoutEffect() triggered</div>'
        }, [state])

        useEffect(() => {
          if (firstRenderForUseEffect) return
          syncWait(2000)
          ref.current.innerHTML += '<div>useEffect() triggered</div>'
        }, [state])

        return (
          <>
            <div> State: <b>{state.toString()}</b> </div>
            <button onClick={toggleState}>Toggle state</button>
            <div ref={ref}></div>
          </>
        )
      }
      `}</Code>

      <Component />

      <Hs>Hook flow</Hs>

      <p>
        We can see the hooks flow from{' '}
        <Lnk path={'https://github.com/donavon/hook-flow'}>Donavon West</Lnk>{' '}
        <LazyImg
          path={'https://raw.githubusercontent.com/donavon/hook-flow/master/hook-flow.png'}
          width="500px"
        />
      </p>

      <p>
        <Code js>useLayoutEffect()</Code> callback is executed first, then state change renders on
        screen, then <Code js>useEffect()</Code> callback is executed.
      </p>
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
