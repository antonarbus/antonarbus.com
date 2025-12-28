'use client'

import { Code, Lnk, jsxToStr } from '/components/post/reExport'
import useBoolean from '../helpers/useBoolean'

function Component() {
  const [state, toggleState] = useBoolean(true)
  return (
    <>
      <div>{state.toString()}</div>
      <button onClick={toggleState}>Toggle state</button>
    </>
  )
}

const postObj = {
  title: 'boolean state',
  date: '2021.10.24',
  tags: ['react', 'hook', 'custom'],
  desc: 'Custom hook returns a boolean state with toggle function',
  body: (
    <>
      <ul>
        <li>
          {' '}
          We often need to have a boolean <i>state</i> and switch between <code>true</code> &{' '}
          <code>false</code> to show/hide something on a screen
        </li>
        <li> We can put such simple logic into a custom hook and make components a bit cleaner</li>
      </ul>

      <Code block>{`
      // functions\\useBoolean.js
      import { useState } from 'react'

      export default function useBoolean(initVal = true) {
        const [state, setState] = useState(initVal)
        const toggleState = () => setState(prevVal => !prevVal)
        return [state, toggleState]
      }
      `}</Code>

      <p>Usage</p>

      <Code block>{`
        import useBoolean from '/functions/useBoolean'

        function Component() {
          const [state, toggleState] = useBoolean(true)
          return (
            <>
              <div>{state.toString()}</div>
              <button onClick={toggleState}>Toggle state</button>
            </>
          )
        }
      `}</Code>

      <Component />

      <p>
        Similar function can be found in the{' '}
        <Lnk path="https://www.npmjs.com/package/react-use"> react-use </Lnk> package under the{' '}
        <Lnk path="https://github.com/streamich/react-use/blob/HEAD/docs/useToggle.md">
          {' '}
          useToggle{' '}
        </Lnk>{' '}
        hook.
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
