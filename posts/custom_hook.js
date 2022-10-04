import { Code, H, useState, jsxToStr } from '/components/post/reExport'

function WithoutCustomHook() {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)

  return (
    <div>
      <div>Count: <b>{count}</b></div>
      <button onClick={increment}>Increment</button>&emsp;
      <button onClick={decrement}>Decrement</button>&emsp;
      <button onClick={reset}>Reset</button>
    </div>
  )
}

// custom hook
function useCounter(initVal = 0, step = 1) {
  const [count, setCount] = useState(initVal)
  const increment = () => setCount(count + step)
  const decrement = () => setCount(count - step)
  const reset = () => setCount(initVal)
  return [count, increment, decrement, reset]
}

function WithCustomHook() {
  const step = 5
  const startFrom = 10
  const [count, increment, decrement, reset] = useCounter(startFrom, step)

  return (
    <div>
      <div>Count: <b>{count}</b></div>
      <button onClick={increment}>Increment by {step}</button>&emsp;
      <button onClick={decrement}>Decrement by {step}</button>&emsp;
      <button onClick={reset}>Reset</button>
    </div>
  )
}

const postObj = {
  title: 'custom hook',
  date: '2021.10.22',
  tags: ['react', 'custom', 'hook'],
  desc: 'Custom hook in react',
  body: (
    <>
      <ul>
        <li>Custom hook is a function which should be called from the React code & not from the regular JS functions</li>
        <li>Custom hook function name should start from <i>"use"</i></li>
        <li>Custom hook can call other hooks, but normal functions can not</li>
      </ul>

      <H>Without custom hook</H>

      <p>Let's make a simple counter component as we normally do.</p>

      <Code block>{`
      import { useState } from 'react'

      function WithoutCustomHook() {
        const [count, setCount] = useState(0)
        const increment = () => setCount(count + 1)
        const decrement = () => setCount(count - 1)
        const reset = () => setCount(0)

        return (
          <div>
            <div>Count: <b>{count}</b></div>
            <button onClick={increment}>Increment</button>&emsp;
            <button onClick={decrement}>Decrement</button>&emsp;
            <button onClick={reset}>Reset</button>
          </div>
        )
      }
      `}</Code>

      <WithoutCustomHook />

      <H>With custom hook</H>

      <p>Let's extract logic into a custom hook and use it inside a component.</p>

      <Code block>{`
      // custom hook
      function useCounter(initVal = 0, step = 1) {
        const [count, setCount] = useState(initVal)
        const increment = () => setCount(count + step)
        const decrement = () => setCount(count - step)
        const reset = () => setCount(initVal)
        return [count, increment, decrement, reset]
      }
      `}</Code>

      <p>Now the logic is not encapsulated inside the component, but can live in a separate file and can be utilized by multiple components.</p>

      <Code block>{`
      function WithCustomHook() {
        const step = 5
        const startFrom = 10
        const [count, increment, decrement, reset] = useCounter(startFrom, step)
      
        return (
          <div>
            <div>Count: <b>{count}</b></div>
            <button onClick={increment}>Increment by {step}</button>&emsp;
            <button onClick={decrement}>Decrement by {step}</button>&emsp;
            <button onClick={reset}>Reset</button>
          </div>
        )
      }
      `}</Code>

      <WithCustomHook />

      <p>Note, we enhanced the hook by bringing <code>initVal</code> & <code>step</code> arguments.</p>
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
