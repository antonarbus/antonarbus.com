import { Code, H, Lnk, useReducer, jsxToStr } from '/components/post/reExport'

// #region general
const initState = 0
function reducer(state, action) {
  // return new state
  if (action === 'increment') return state + 1
  if (action === 'decrement') return state - 1
  if (action === 'reset') return initState
  // default state
  return state
}

function Component() {
  const [countState, dispatch] = useReducer(reducer, initState)
  return (
    <>
      <div>Count: {countState}</div>
      <button onClick={() => dispatch('increment')}>Increment</button>&emsp;
      <button onClick={() => dispatch('decrement')}>Decrement</button>&emsp;
      <button onClick={() => dispatch('reset')}>Reset</button>
    </>
  )
}
// #endregion

// #region state & action are objects
const initState3 = { counter: 0, sex: 'male' }

function reducer3(state, action) {
  if (action.type === 'increment') {
    return { ...state, counter: state.counter + action.value }
  }
  if (action.type === 'decrement') {
    return { ...state, counter: state.counter - action.value }
  }
  if (action.type === 'change sex') {
    return { ...state, sex: 'female' }
  }
  if (action.type === 'reset') {
    return initState3
  }
  return state
}

function Component3() {
  const [state, dispatch] = useReducer(reducer3, initState3)
  return (
    <>
      <div>
        Count: <b>{state.counter}</b>
      </div>
      <div>
        Sex: <b>{state.sex}</b>
      </div>
      <button onClick={() => dispatch({ type: 'increment', value: 5 })}>Increment 5</button>&emsp;
      <button onClick={() => dispatch({ type: 'decrement', value: 5 })}>Decrement 5</button>&emsp;
      <button onClick={() => dispatch({ type: 'change sex' })}>Change sex</button>&emsp;
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  )
}
// #endregion

const postObj = {
  title: 'React.useReducer',
  date: '2021.10.18',
  tags: ['react', 'hook'],
  desc: 'useReducer hook in React',
  body: (
    <>
      <p>
        <Lnk path="https://reactjs.org/docs/hooks-reference.html#usereducer"> useReducer </Lnk> hook
        is the alternative to <i>useState</i> and meant to manage state.
      </p>

      <p>
        The principle for <Code js>useReducer()</Code> hook is similar to <i>Redux</i>, but state is
        not an object, but a pure value & action value is not an object with <i>type</i> property,
        but pure string.
      </p>

      <p>
        With <Code js>useReducer()</Code> instead of having multiple <Code js>setState()</Code> in
        different functions, we can have them all in one place.
      </p>

      <H>General usage</H>

      <Code block>{`
      import React, { useReducer } from 'react'

      const initState = 0
      function reducer(state, action) {
        // return new state
        if (action === 'increment') return state + 1
        if (action === 'decrement') return state - 1
        if (action === 'reset') return initState
        // default state
        return state
      }
      
      function Component() {
        const [countState, dispatch] = useReducer(reducer, initState);
        return (
          <>
            <div>Count: {countState}</div>
            <button onClick={() => dispatch('increment')}>Increment</button>&emsp
            <button onClick={() => dispatch('decrement')}>Decrement</button>&emsp
            <button onClick={() => dispatch('reset')}>Reset</button>
          </>
        );
      }
      
      <Component />
  `}</Code>

      <Component />

      <H>
        One <Code>useReducer()</Code> for multiple components
      </H>

      <Code block>{`
      <Component />
      <Component />
    `}</Code>

      <Component />
      <Component />

      <H>
        <Code>useReducer()</Code> with state & action as objects
      </H>

      <p>
        Same approach, but <i>state</i> and <i>actions</i> are enhanced.
      </p>

      <Code block>{`
      const initState3 = { counter: 0, sex: 'male' }

      function reducer3(state, action) {
        if (action.type === 'increment') { return { ...state, counter: state.counter + action.value } }
        if (action.type === 'decrement') { return { ...state, counter: state.counter - action.value } }
        if (action.type === 'change sex') { return { ...state, sex: 'female' } }
        if (action.type === 'reset') { return initState3 }
        return state
      }

      function Component3() {
        const [state, dispatch] = useReducer(reducer3, initState3)
        return (
          <>
            <div>Count: <b>{state.counter}</b></div>
            <div>Sex: <b>{state.sex}</b></div>
            <button onClick={() => dispatch({ type: 'increment', value: 5 })}>Increment 5</button>&emsp;
            <button onClick={() => dispatch({ type: 'decrement', value: 5 })}>Decrement 5</button>&emsp;
            <button onClick={() => dispatch({ type: 'change sex' })}>Change sex</button>&emsp;
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
          </>
        )
      }
      <Component3 />
    `}</Code>

      <Component3 />
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
