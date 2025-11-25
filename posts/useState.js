'use client'


import { Code, H, Hs, React, useState, jsxToStr } from '/components/post/reExport'

// #region Without state
const btnCss = { padding: '5px 20px', margin: '10px 10px 0px 0px', cursor: 'pointer' }

function ComponentWithoutState() {
  let likes = 0
  return (
    <>
      <div>
        Likes <b>{likes}</b>
      </div>
      <button onClick={() => likes++} style={btnCss}>
        +1
      </button>
      <button onClick={() => likes--} style={btnCss}>
        -1
      </button>
      <button onClick={() => alert(likes)} style={btnCss}>
        Alert <b>likes</b>
      </button>
    </>
  )
}
// #endregion

// #region With state
function ComponentWithState() {
  const [likes, setLikes] = React.useState(0)
  return (
    <>
      <div>
        Likes <b>{likes}</b>
      </div>
      <button onClick={() => setLikes(likes + 1)} style={btnCss}>
        +1
      </button>
      <button onClick={() => setLikes(likes - 1)} style={btnCss}>
        -1
      </button>
      <button onClick={() => alert(likes)} style={btnCss}>
        Alert <b>likes</b>
      </button>
    </>
  )
}
// #endregion

// #region state mutation
function StateMutation() {
  const [state, setState] = React.useState([1, 2, 3])
  const mutateState = () => {
    state.push(state.at(-1) + 1)
    setState(state)
  }
  const alertState = () => alert(JSON.stringify(state))

  return (
    <>
      <div>
        State value: <b>{JSON.stringify(state)}</b>
      </div>
      <button onClick={mutateState}>Add value to array by mutation</button>&emsp;
      <button onClick={alertState}>Alert state</button>
    </>
  )
}
// #endregion

// #region state update
function StateUpdate() {
  const [state, setState] = React.useState([1, 2, 3])
  const updateState = () => setState([...state, state.at(-1) + 1])
  const alertState = () => alert(JSON.stringify(state))

  return (
    <>
      <div>
        State value: <b>{JSON.stringify(state)}</b>
      </div>
      <button onClick={updateState}>Add value to array by update</button>&emsp;
      <button onClick={alertState}>Alert state</button>
    </>
  )
}
// #endregion

// #region state update with same value
function UpdateStateSameAndDifferentValue() {
  const [state, setState] = useState(0)
  const updateStateToSameValue = () => setState(state)
  const updateStateToNewValue = () => setState(state + 1)
  return (
    <>
      <div>
        Value: <b>{state}</b>
      </div>
      <button onClick={updateStateToSameValue}>Update state to same value</button>&emsp;
      <button onClick={updateStateToNewValue}>Update state to new value</button>
    </>
  )
}
// #endregion

// #region update state of parent component from child
const style = { border: '2px solid LightGrey', padding: '10px', margin: '10px', maxWidth: '500px' }

function ParentWithState() {
  const [state, setState] = React.useState(0)
  const updateState = () => setState(state + 1)
  return (
    <div style={style}>
      <h1>Parent Component</h1>
      <div>
        Count state variable: <b>{state}</b>
      </div>
      <button onClick={updateState}>Update state from parent component</button>
      <Child state={state} setState={setState} />
    </div>
  )
}
function Child(props) {
  const { state, setState } = props
  const updateState = () => setState(state + 1)
  return (
    <div style={style}>
      <h1>Child Component</h1>
      <button onClick={updateState}>Update state from child component</button>
    </div>
  )
}
// #endregion

// #region set state with previous value
function SetStateWithPreviousValue() {
  const [state, setState] = useState(0)
  const addOne5TimesAsync = () => {
    for (let i = 0; i < 5; i++) setState(state + 1)
  }
  const addOne5TimesSync = () => {
    for (let i = 0; i < 5; i++) setState((prevVal) => prevVal + 1)
  }
  return (
    <>
      <h3>{state}</h3>
      <button onClick={addOne5TimesAsync}>Async increment 5 times</button>&emsp;
      <button onClick={addOne5TimesSync}>Sync increment 5 times</button>
    </>
  )
}
// #endregion

const postObj = {
  title: 'React.useState',
  date: '2021.09.25',
  tags: ['react', 'basics', 'hook'],
  desc: 'useState hook in React',
  body: (
    <>
      <p>State variable change forces the whole component to render.</p>

      <H>
        Without <Code>useState()</Code>
      </H>

      <p>
        We can see likes value change in alert, but not on the screen, because a function component
        runs and show updates only if its <i>state</i> variable is updated.
      </p>

      <Code block>{`
      function ComponentWithoutState() {
        let likes = 0
        return (
          <>
            <div>Likes <b>{likes}</b></div>
            <button onClick={() => likes++} style={btnCss}>+1</button>
            <button onClick={() => likes--} style={btnCss}>-1</button>
            <button onClick={() => alert(likes)} style={btnCss}>Alert <b>likes</b></button>
          </>
        )
      }
      `}</Code>

      <ComponentWithoutState />

      <H>
        With <Code>useState()</Code>
      </H>

      <Code block>{`
      import React from 'react'

      function ComponentWithState() {
        const [likes, setLikes] = React.useState(0)
        return (
          <>
            <div>Likes <b>{likes}</b></div>
            <button onClick={() => setLikes(likes + 1)} style={btnCss}>+1</button>
            <button onClick={() => setLikes(likes - 1)} style={btnCss}>-1</button>
            <button onClick={() => alert(likes)} style={btnCss}>Alert <b>likes</b></button>
          </>
        )
      }
      `}</Code>

      <ComponentWithState />

      <Hs>State init</Hs>

      <ul>
        <li>
          Initialize <code>likes</code> state by{' '}
          <Code js>const [likes, setLikes] = React.useState(0)</Code>
        </li>
        <li>
          <code>setLikes</code> is a function to change a state value
        </li>
        <li>
          Pass a new state value as an argument <Code js>setLikes(likes + 1)</Code>
        </li>
        <li>
          Initial state <code>0</code> is passed as an argument in <Code js>useState(0)</Code>
        </li>
      </ul>

      <Hs>Initial state in callback</Hs>

      <ul>
        <li>Initial state can be computed in callback</li>
      </ul>

      <Code block jsx>{`
        const [likes, setLikes] = React.useState(() => {
          return 0
        })
      `}</Code>

      <H>
        <Code>setState(newValue)</Code>
      </H>

      <ul>
        <li>
          If we update a state, we need to provide a new value, otherwise React doesn't trigger a
          render.
        </li>
        <li>Just provide a new primitive value or new reference for an object.</li>
      </ul>

      <Hs>State object mutation</Hs>

      <ul>
        <li>State update does not trigger a render</li>
        <li>Even if the state is really updated, which is visible in alert</li>
      </ul>

      <Code block>{`
      import React from 'react'

      function StateMutation() {
        const [state, setState] = React.useState([1, 2, 3])
        const mutateState = () => {
          state.push(state.at(-1) + 1)
          setState(state)
        }
        const alertState = () => alert(JSON.stringify(state))

        return (
          <>
            <div>State value: <b>{JSON.stringify(state)}</b></div>
            <button onClick={mutateState}>Add value to array by mutation</button>&emsp;
            <button onClick={alertState}>Alert state</button>
          </>
        )
      }
      `}</Code>

      <StateMutation />

      <Hs>New state object</Hs>

      <p>To let render happen we need to provide new state.</p>

      <Code block>{`
      function StateUpdate() {
        const [state, setState] = React.useState([1, 2, 3])
        const updateState = () => setState([...state, state.at(-1) + 1])
        const alertState = () => alert(JSON.stringify(state))

        return (
          <>
            <div>State value: <b>{JSON.stringify(state)}</b></div>
            <button onClick={updateState}>Add value to array by update</button>&emsp;
            <button onClick={alertState}>Alert state</button>
          </>
        )
      }
      `}</Code>

      <StateUpdate />

      <H>State update with same value</H>

      <p>
        If a state is set to the same value via <Code js>setState(sameVal)</Code> render does not
        happen.
      </p>

      <Code block>{`
      function UpdateStateSameAndDifferentValue() {
        const [state, setState] = useState(0)
        const updateStateToSameValue = () => setState(state)
        const updateStateToNewValue = () => setState(state + 1)
        return (
          <>
            <div>Value: <b>{state}</b></div>
            <button onClick={updateStateToSameValue}>Update state to same value</button>&emsp;
            <button onClick={updateStateToNewValue}>Update state to new value</button>
          </>
        )
      }
      `}</Code>

      <UpdateStateSameAndDifferentValue />

      <H>Update state from a child component</H>

      <p>
        To update a parent component's state from a child component, the update function{' '}
        <code>setState</code> should be passed via props to a child component.
      </p>

      <Code block>{`
      const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

      function ParentWithState() {
        const [state, setState] = React.useState(0)
        const updateState = () => setState(state + 1)
        return (
          <div style={style}>
            <h1>Parent Component</h1>
            <div>Count state variable: <b>{state}</b></div>
            <button onClick={updateState}>Update state from parent component</button>
            <Child state={state} setState={setState} />
          </div>
        )
      }
      function Child(props) {
        const { state, setState } = props
        const updateState = () => setState(state + 1)
        return (
          <div style={style}>
            <h1>Child Component</h1>
            <button onClick={updateState}>Update state from child component</button>
          </div>
        )
      }
      `}</Code>

      <ParentWithState />

      <H>State previous value</H>

      <p>
        When we update a state with <Code js>setState(newValue)</Code> function, it is done
        asynchronously sometime in the future and we can not rely on updated state value in
        calculations.
      </p>

      <Hs>
        Async nature of <Code>setState()</Code>
      </Hs>

      <p>
        For example we increment the state 5 times with{' '}
        <Code js>{'for (let i = 0; i < 5; i++) setState(state + 1)'}</Code>
      </p>
      <p>
        5 calls go into the end of <i>microtask queue</i> remembering current state value{' '}
        <Code>currentValue = 0</Code>. When they are executed in future they all will return{' '}
        <Code>0</Code>
      </p>

      <Hs>
        <Code>{'setState(prevVal => prevVal + 1)'}</Code>
      </Hs>

      <p>
        There is the second version of <Code js>setState()</Code> function with callback, which
        provides access to the current state value at the moment of function execution.
      </p>

      <Code block>{`
      function SetStateWithPreviousValue() {
        const [state, setState] = useState(0)
        const addOne5TimesAsync = () => {
          for (let i = 0; i < 5; i++) setState(state + 1)
        }
        const addOne5TimesSync = () => {
          for (let i = 0; i < 5; i++) setState(prevVal => prevVal + 1)
        }
        return (
          <>
            <h3>{state}</h3>
            <button onClick={addOne5TimesAsync}>Async increment 5 times</button>&emsp;
            <button onClick={addOne5TimesSync}>Sync increment 5 times</button>
          </>
        )
      }
      `}</Code>

      <SetStateWithPreviousValue />
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
