'use client'


import { jsxToStr, H, Code, LazyImg, Lnk } from '/components/post/reExport'
import { useState, useTransition, useDeferredValue, useEffect } from 'react'
import randomNumFromTo from '/functions/randomNumFromTo'
import { useUpdateEffect } from 'react-use'
import syncWait from '/functions/syncWait'

const containerStyles = { border: '1px solid grey', margin: '10px', padding: '10px' }
const bigArray = [...Array(20000).keys()]

const Basic = () => {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([])

  const handleClick = () => {
    setCount(count + 1)
    setItems([])
    setItems(bigArray.map(() => randomNumFromTo()))
  }

  return (
    <div css={containerStyles}>
      <button onClick={handleClick}>Show 20k random numbers</button>
      <div>Click counter: {count}</div>
      <div css={{ fontSize: '8px' }}>
        {items.map((item, i) => (
          <span key={i}>
            {item}
            {'; '}
          </span>
        ))}
      </div>
    </div>
  )
}

const UseTransition = () => {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([])
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    // urgent
    setCount(count + 1)
    setItems([])

    // not urgent
    startTransition(() => {
      setItems(bigArray.map(() => randomNumFromTo()))
    })
  }

  return (
    <div css={containerStyles}>
      <button onClick={handleClick}>Show 20k random numbers</button>
      <div>Click counter: {count}</div>
      <div>{isPending ? 'Loading...' : null}</div>
      <div css={{ fontSize: '8px' }}>
        {items.map((item, i) => (
          <span key={i}>
            {item}
            {'; '}
          </span>
        ))}
      </div>
    </div>
  )
}

function UseDeferredValue() {
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

const PracticalExample = () => {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState(bigArray)
  const [isPending, startTransition] = useTransition()
  const deferredInput = useDeferredValue(inputValue)

  const handleInput = (e) => setInputValue(e.target.value)

  useEffect(() => {
    startTransition(() => {
      console.log('deferredInput: ', deferredInput)
      setItems(bigArray.filter((item) => item.toString().includes(deferredInput)))
    })
  }, [deferredInput])

  return (
    <div css={containerStyles}>
      <input type="text" value={inputValue} onChange={handleInput} placeholder="search number" />
      <div style={{ opacity: isPending ? 0.4 : 1 }}>
        <p>Searching for: {deferredInput || 'All'}</p>
        {isPending ? <p>Loading...</p> : null}
        <div css={{ fontSize: '8px' }}>
          {items.map((item, i) => (
            <span key={i}>
              {item}
              {'; '}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const postObj = {
  title: 'React.useTransition vs React.useDeferredValue',
  date: '2022.10.24',
  tags: ['react', 'state'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'useTransition vs useDeferredValue',
  body: (
    <>
      <H>Without useTransition</H>

      <p>
        If we bunch in one function the small counter action and big 20k render all render happens
        at ones after all processing is finished.
      </p>

      <Code block jsx>{`
        import { jsxToStr, H } from '/components/post/reExport'
        import { useState, useTransition } from 'react'
        import randomNumFromTo from '/functions/randomNumFromTo'

        const containerStyles = { border: '1px solid grey', margin: '10px', padding: '10px' }

        const Basic = () => {
          const [count, setCount] = useState(0)
          const [items, setItems] = useState([])

          const handleClick = () => {
            setCount(count + 1)
            setItems([])
            setItems(bigArray.map(() => randomNumFromTo()))
          }

          return (
            <div css={containerStyles}>
              <button onClick={handleClick}>Show 20k random numbers</button>
              <div>Click counter: {count}</div>
              <div css={{ fontSize: '8px' }}>{items.map((item, i) => <span key={i}>{item}{'; '}</span>)}</div>
            </div>
          )
        }
      `}</Code>

      <Basic />

      <H>useTransition</H>

      <ul>
        <li>
          With <code>useTransition</code> we can tell which state updates are urgent and which are
          not urgent
        </li>
        <li>There will be two renders</li>
        <li>
          state setter functions are wrapped into <code>useTransition</code>
        </li>
        <li>We will see the click counter update first, and 20k numbers after that</li>
        <li>
          The hook gives us the <code>isPending</code> state to let us show some spinner while data
          is being rendered
        </li>
      </ul>

      <Code block jsx>{`
      const UseTransition = () => {
        const [count, setCount] = useState(0)
        const [items, setItems] = useState([])
        const [isPending, startTransition] = useTransition()

        const handleClick = () => {
          // urgent
          setCount(count + 1)
          setItems([])

          // not urgent
          startTransition(() => {
            setItems(bigArray.map(() => randomNumFromTo()))
          })
        }

        return (
          <div css={containerStyles}>
            <button onClick={handleClick}>Show 20k random numbers</button>
            <div>Click counter: {count}</div>
            <div>{isPending ? 'Loading...' : null}</div>
            <div css={{ fontSize: '8px' }}>{items.map((item, i) => <span key={i}>{item}{'; '}</span>)}</div>
          </div>
        )
      }
      `}</Code>

      <UseTransition />

      <H>useDeferredValue</H>

      <ul>
        <li>
          <code>useDeferredValue</code> does the same thing as <code>useTransition</code>
        </li>
        <li>
          it is useful when we have a state value, but don't have control over the corresponding{' '}
          <code>setState</code> function, for ex the value comes from the library
        </li>
        <li>
          <code>useTransition</code> gives a complete control as we can decide which code is treated
          as “low priority”
        </li>
        <li>
          with <code>useDeferredValue</code> we wrap either the state value or a value computed
          based on the state value
        </li>
        <li>such derived value has low update priority</li>
        <li>
          for example we have a resource consuming job, for example filtering an array on every key
          stoke
        </li>
        <li>it may make our app sluggish and unresponsive</li>
        <li>
          <i>useDeferredValue</i> hook tells the application not to do any processing for this value
          until app is busy
        </li>
        <li>it is kind of debouncing with some uncontrolled logic</li>
        <li>
          Type text in input and check in console that heavy function which depends on deferred
          value is updated only after actions associated with a non-deferred value.{' '}
        </li>
        <li>But unfortunately that is not 100% true and there is some sluggishness still</li>
      </ul>

      <Code block jsx>{`
      import { useState, useDeferredValue } from 'react'
      import syncWait from '/functions/syncWait'
      import { useUpdateEffect } from 'react-use'

      function UseDeferredValue2() {
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

      <LazyImg path="/imgs/deferred_value.png" width="500px" />

      <UseDeferredValue />

      <H>Practical usage</H>

      <ul>
        <li>
          text input value is rendered normally with <code>onChange</code> event
        </li>
        <li>
          in useEffect hook depending on <code>deferredInput</code> value we do sorting heavy
          computation using <code>startTransition</code> function
        </li>
        <li>in console log we see that not every key stoke triggers filtering, which is good</li>
      </ul>

      <LazyImg path="/imgs/useDeferredValue_useTransition.png" width="500px" />

      <Code block jsx>{`
      const PracticalExample = () => {
        const [inputValue, setInputValue] = useState('')
        const [items, setItems] = useState(bigArray)
        const [isPending, startTransition] = useTransition()
        const deferredInput = useDeferredValue(inputValue)

        const handleInput = (e) => setInputValue(e.target.value)

        useEffect(() => {
          startTransition(() => {
            console.log('deferredInput: ', deferredInput)
            const filtered = bigArray.filter(item => item.toString().includes(deferredInput))
            setItems(filtered)
          })
        }, [deferredInput])

        return (
          <div css={containerStyles}>
            <input type="text" value={inputValue} onChange={handleInput} />
            <div style={ { opacity: isPending ? 0.4 : 1 }}>
              <p>Searching for: {deferredInput || 'All'}</p>
              {isPending ? <p>Loading...</p> : null}
              <div css={{ fontSize: '8px' }}>{items.map((item, i) => <span key={i}>{item}{'; '}</span>)}</div>
            </div>
          </div>
        )
      }
      `}</Code>

      <PracticalExample />

      <H>Note</H>

      <ul>
        <li>
          <code>useTransition</code> wraps the state updating code
        </li>
        <li>
          <code>useDeferredValue</code>wraps a value affected by the state change
        </li>
        <li>do not utilize both at the same time because they accomplish the same thing</li>
        <li>
          in practical example, which I took from{' '}
          <Lnk path="https://www.youtube.com/watch?v=U9Cth5xDEKs">Dave Gray's video</Lnk>{' '}
          <code>useTransition</code> & <code>useDeferredValue</code> are used together probably just
          to show pending status, which comes from <code>useTransition</code> hook. Same logic can
          be done by <code>useDeferredValue</code> hook only.
        </li>
      </ul>
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
