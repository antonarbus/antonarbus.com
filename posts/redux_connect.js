'use client'


import { jsxToStr, Code, Lnk, H } from '/components/post/reExport'
import { combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

const initCounterState = 0
const counter = (state = initCounterState, action) => {
  if (action.type === 'INCREMENT') return state + (action.num || 1)
  if (action.type === 'DECREMENT') return state - action.num
  return state
}

const initIsLoggedState = false
const isLogged = (state = initIsLoggedState, action) => {
  if (action.type === 'SIGN_IN') return !state
  return state
}

const rootReducer = combineReducers({
  counter,
  isLogged
})

const store = configureStore({
  reducer: rootReducer,
  devTools: true
})

const mapStateToProps = state => {
  return {
    counter: state.counter,
    isLogged: state.isLogged
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT', num: 5 }),
    loginToggle: () => dispatch({ type: 'SIGN_IN' })
  }
}
const WrappedComponent = connect(mapStateToProps, mapDispatchToProps)(Component)

function Component(props) {
  const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }
  return (
    <div style={style}>
      <div>Counter: <strong>{props.counter}</strong></div>
      <button onClick={props.increment}>Increment +1</button>&#8194;
      <button
        onClick={props.decrement}
      >
        Decrement -5
      </button>
      <div>isLogged: <strong>{props.isLogged.toString()}</strong></div>
      <button onClick={props.loginToggle}>Sign in/out</button>
    </div>
  )
}

const postObj = {
  title: 'redux with connect',
  date: '2021.10.14',
  tags: ['react', 'redux'],
  desc: 'redux with connect & mapStateToProps & mapDispatchToProps',
  imgUrl: 'https://antonarbus.com/imgs/redux.png',
  body: (
    <>¨
      <H>Idea</H>

      <ul>
        <li><Lnk path='/posts/redux'>Post</Lnk> about current <Lnk path='https://redux.js.org/'>Redux</Lnk> approach (2021)</li>
        <li>Nowadays we use hooks <Code>useSelector()</Code> to retrieve data from the store and <Code>useDispatch()</Code> to update it</li>
        <li>Previously we did different way</li>
        <li><Code>mapStateToProps()</Code> is similar to <code>useSelector()</code></li>
        <li><Code>mapDispatchToProps()</Code> is similar to <code>useDispatch()</code></li>
      </ul>

      <H>Example</H>

      <Provider store={store}>
        <WrappedComponent />
      </Provider>

      <Code block jsx>{`
      import { combineReducers } from 'redux'
      import { Provider, connect } from 'react-redux'
      import { configureStore } from '@reduxjs/toolkit'

      const initCounterState = 0
      const counter = (state = initCounterState, action) => {
        if (action.type === 'INCREMENT') return state + (action.num || 1)
        if (action.type === 'DECREMENT') return state - action.num
        return state
      }

      const initIsLoggedState = false
      const isLogged = (state = initIsLoggedState, action) => {
        if (action.type === 'SIGN_IN') return !state
        return state
      }

      const rootReducer = combineReducers({
        counter,
        isLogged,
      })

      const store = configureStore({
        reducer: rootReducer,
        devTools: true,
      })

      const mapStateToProps = state => {
        return {
          counter: state.counter,
          isLogged: state.isLogged
        }
      }

      const mapDispatchToProps = dispatch => {
        return {
          increment: () => dispatch({ type: 'INCREMENT' }),
          decrement: () => dispatch({ type: 'DECREMENT', num: 5 }),
          loginToggle: () => dispatch({ type: 'SIGN_IN' }),
        }
      }
      const WrappedComponent = connect(mapStateToProps, mapDispatchToProps)(Component)

      <Provider store={store}>
        <WrappedComponent />
      </Provider>
      `}</Code>

      <Code block jsx>{`
      function Component(props) {
        const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }
        return (
          <div style={style}>
            <div>Counter: <strong>{props.counter}</strong></div>
            <button onClick={props.increment}>Increment +1</button>&#8194;
            <button
              onClick={props.decrement}
            >
              Decrement -5
            </button>
            <div>isLogged: <strong>{props.isLogged.toString()}</strong></div>
            <button onClick={props.loginToggle}>Sign in/out</button>
          </div>
        )
      }
      `}</Code>
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
