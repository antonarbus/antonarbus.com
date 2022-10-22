import { jsxToStr, H, Code, LazyImg } from '/components/post/reExport'
import { useState, useDeferredValue } from 'react'
import syncWait from '/functions/syncWait'
import { useUpdateEffect } from 'react-use'

function Component() {
  const [inputValue, setInputValue] = useState('')
  const deferredInputValue = useDeferredValue(inputValue)

  useUpdateEffect(() => {
    console.log(`input value: ${inputValue}`)
  }, [inputValue])

  useUpdateEffect(() => {
    console.log(`deferred: ${deferredInputValue}`)
  }, [deferredInputValue])

  useUpdateEffect(() => {
    console.log('...waiting for 0.5 sec')
    syncWait(500)
  }, [deferredInputValue])

  return (
    <div>
      <input
        type="text"
        placeholder="type text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  )
}

const postObj = {
  title: 'useDeferredValue',
  date: '2022.10.23',
  tags: ['react', 'hook'],
  imgUrl: 'https://antonarbus.com/imgs/react.png',
  desc: 'useDeferredValue hook',
  body: (
    <>
      <H>useDeferredValue hook</H>

      <ul>
        <li>
          for example we have a resource consuming job, for example filtering an array on every key
          stoke
        </li>
        <li>it may make our app sluggish and unresponsive</li>
        <li>
          <i>useDeferredValue</i> hook tells the application not to do any processing for this value
          until app is busy
        </li>
        <li>it is kind of throttling function with some uncontrolled logic</li>
        <li>Type text in input and check in console that heavy function which depends on deferred value is updated only after actions associated with a non-deferred value. </li>
        <li>But unfortunately that is not 100% true and there is some sluggishness still</li>
      </ul>

      <Component />

      <Code block jsx>{`
      import { useState, useDeferredValue } from 'react'
      import syncWait from '/functions/syncWait'
      import { useUpdateEffect } from 'react-use'

      function Component() {
        const [inputValue, setInputValue] = useState('')
        const deferredInputValue = useDeferredValue(inputValue)

        useUpdateEffect(() => {
          console.log(\`input value: \${inputValue}\`)
        }, [inputValue])

        useUpdateEffect(() => {
          console.log(\`deferred: \${deferredInputValue}\`)
        }, [deferredInputValue])

        useUpdateEffect(() => {
          console.log('...waiting for 0.5 sec')
          syncWait(500)
        }, [deferredInputValue])

        return (
          <div>
            <input
              type="text"
              placeholder="type text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        )
      }
      `}</Code>

      <LazyImg path='/imgs/deferred_value.png'/>

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
