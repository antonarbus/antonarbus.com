import { Code, H, Lnk, jsxToStr, LazyImg } from '/components/post/reExport'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

// #region REDUCERS (sets and changes state)
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
// #endregion

// #region ACTION CREATORS
const increment = (params) => ({ type: 'INCREMENT' })
const decrement = (params) => ({ type: 'DECREMENT', num: 5 })
const signIn = (params) => ({ type: 'SIGN_IN' })
// #endregion

// #region LOGGER MIDDLEWARE
const loggerMiddleware = createLogger({})
// #endregion

// #region STORE (holds all states)
const middlewares = [loggerMiddleware]
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
)
// #endregion

// #region SUBSCRIBE - EVENT listener, called any time an action is dispatched and state changed
store.subscribe(() => console.log(store.getState())) // display in the console
// #endregion

// #region COMPONENT with useSelector() & useDispatch()
const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

function Component() {
  const counter = useSelector(state => state.counter)
  const isLogged = useSelector(state => state.isLogged)

  const dispatch = useDispatch()

  return (
    <div style={style}>
      <div>Counter: <strong>{counter}</strong></div>
      <button onClick={() => dispatch(increment())}>Increment +1</button>&#8194;
      <button onClick={() => { dispatch(decrement()) }} > Decrement -5 </button>
      <div>isLogged: <strong>{isLogged.toString()}</strong></div>
      <button onClick={() => dispatch(signIn())}>Sign in/out</button><br />
      <button onClick={() => { alert(store.getState().counter) }}>Get counter value from store</button>
    </div>
  )
}
// #endregion

const postObj = {
  title: 'redux',
  date: '2021.10.14',
  tags: ['react', 'redux'],
  desc: 'redux in react',
  imgUrl: 'https://antonarbus.com/imgs/redux.png',
  body: (
    <>
      <H>Example</H>

      <Provider store={store}>
        <Component />
      </Provider>

      <H>Idea</H>

      <p>
        The idea behind the Redux is to keep our states outside of components in one object. Every
        component has an access to the Redux and we do not have to pass states via
        props throughout the app, which can make the code messy.
      </p>

      <H>Info</H>

      <ul>
        <li><Lnk path='https://redux.js.org/'>redux</Lnk> webpage  </li>
        <li><Lnk path='https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK'>tutorial</Lnk> from Vishvas</li>
        <li><Lnk path='https://www.youtube.com/watch?v=CVpUuw9XSjY'>Dev Ed</Lnk> simple example of Redux</li>
      </ul>

      <H>Install</H>

      <p>
        First of all install  <Lnk path='https://www.npmjs.com/package/redux'>Redux</Lnk> with <Code bash>npm i redux</Code> {' '}
        & <Lnk path='https://www.npmjs.com/package/react-redux'>connect</Lnk> it to the React with <Code bash>npm i react-redux</Code>
      </p>

      <H>Redux basics</H>

      <p>In redux we deal with <i>STORE</i>, <i>ACTION</i>, <i>REDUCER</i>, <i>DISPATCH</i></p>

      <ol>
        <li><i>STORE</i> keeps all states</li>
        <li><i>ACTION</i> is an object which describes what we want to do with a state</li>
        <li><i>DISPATCH</i> sends an <i>ACTION</i> to a <i>REDUCER</i></li>
        <li><i>REDUCER</i> updates the <i>STORE</i> in accordance to an <i>ACTION</i> we choose</li>
      </ol>

      <LazyImg path='/imgs/redux/app - action - reducer - store update.png'/>

      <H>createStore</H>

      <p>In the main app component we initiate the state store with <Code js>createStore(rootReducer)</Code> with built-in function.</p>

      <ul>
        <li><i>STORE</i> holds all states</li>
        <li>Provides <Code js>dispatch(action)</Code> method to update the state</li>
        <li>Provides <Code js>getState().state</Code> method to retrieve the state</li>
        <li>Provides <Code js>subscribe(listener)</Code> register a listener, which is triggered every time the state changes</li>
      </ul>

      <H>Reducer</H>

      <ul>
        <li><i>REDUCER</i> is a function where we set an initial state and return new one</li>
        <li>And tell how we want to modify it</li>
        <li>Modification will be done depending on an <i>action.type</i> inside <Code js>{"dispatch({ type: 'SIGN_IN' })"}</Code> function</li>
        <li>We should not mutate the state object, but return a new one</li>
        <li>Each reducer's state corresponds only the part of the global state</li>
      </ul>

      <Code block>{`
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
      `}</Code>

      <H>combineReducers</H>

      <p>Reducers can be combined into one object with <Code js>combineReducers()</Code> function from the <i>redux</i> library.</p>

      <Code block>{`
      const rootReducer = combineReducers({
        counter,
        isLogged
      })
      `}</Code>

      <H>Dispatch</H>

      <ul>
        <li>To update a state we launch the <Code js>dispatch(actionObj)</Code> function</li>
        <li><i>actionObj</i> parameter <Code>{"{ type: 'SIGN_IN' }"}</Code> corresponds to the <Code>action.type</Code> of a reducer</li>
        <li><i>dispatch</i> works synchronously</li>
      </ul>

      <Code block js>{`
        store.dispatch({ type: 'INCREMENT' }) // 1
        store.dispatch({ type: 'INCREMENT', num: 5 }) // 6
        store.dispatch({ type: 'DECREMENT' }) // 5
      `}</Code>

      <H>Action</H>

      <ul>
        <li><i>ACTION</i> is an object with <i>type</i> property <Code js>{'{ type: \'INCREMENT\', payload: num }'}</Code> which describes how we want to modify the state and used in <Code js>{'dispatch({ type: \'INCREMENT\', payload: num })'}</Code> function</li>
      </ul>

      <H>Action creator</H>

      <ul>
        <li>To avoid typing <i>ACTION</i> object by hand, we may use <i>action creator</i> function, which forms and returns an action object</li>
      </ul>

      <Code block js>{`
        const increment = (num = 1) => ({ type: 'INCREMENT', payload: num })
        const decrement = (num = 1) => ({ type: 'DECREMENT', payload: num })
        const signIn = () => ({ type: 'SIGN_IN' })

        store.dispatch(increment())
        store.dispatch(decrement(5))
        store.dispatch(signIn())
      `}</Code>

      <H>getState</H>

      <p>With <Code js>{'store.getState().property'}</Code> we may read property  directly from the store object.</p>

      <H>subscribe</H>

      <ul>
        <li>Provides <Code js>subscribe(listener)</Code> register a listener, which is triggered every time the state changes</li>
        <li>Understood that it needed for JS projects to react to the state change, because in React the React itself reacts to a state change</li>
        <li><Code>subscribe()</Code> returns a function, which we may call to unsubscribe the listener</li>
        <Code block jsx>{`
        const unsubscribe = store.subscribe(() => console.log(store.getState()))
        // ... and later
        unsubscribe()
        `}</Code>
      </ul>

      <H>useSelector</H>

      <p>To extract a state from the Redux store can be done with built-in function <Code js>useSelector()</Code>.</p>

      <Code block js>{`
      const counter = useSelector(state => state.counter)
      `}</Code>

      <H>Selector</H>

      <ul>
        <li>Function <Code js>{'state => state.counter'}</Code> inside <Code js>useSelector()</Code> returns part of the state </li>
        <li>It is called <i>selector</i></li>
        <li>It can be extracted</li>
        <li>In case we use same selector the app several times and store structure changes all we need is only to modify selector function in one place</li>
      </ul>

      <Code block js>{`
      const getCounter = state => state.counter
      const counter = useSelector(getCounter)
      `}</Code>

      <H>useDispatch</H>

      <p><Code js>{'useDispatch()'}</Code> hook returns a reference to the <i>dispatch</i> function from the Redux store.</p>

      <H>Provider</H>

      <p>The whole application should be wrapped in a <Code js>{'<Provider>'}</Code> component to make the store available throughout the component tree.</p>

      <H>Middleware</H>

      <ul>
        <li>Extends Redux with custom functionality</li>
        <li>Provides extension point between dispatching an action  and point it reaches the reducer</li>
        <li>May be used for logging, crash reporting, performing asynchronous tasks etc</li>
      </ul>

      <H>Whole code</H>

      <Code block js>{`
      import { Code, H, Lnk, jsxToStr, LazyImg } from '/components/post/reExport'
      import { combineReducers, createStore, applyMiddleware } from 'redux'
      import { Provider, useSelector, useDispatch } from 'react-redux'
      import { createLogger } from 'redux-logger'
      import { composeWithDevTools } from 'redux-devtools-extension'

      // #region REDUCERS (sets and changes state)
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
      // #endregion

      // #region ACTION CREATORS
      const increment = (params) => ({ type: 'INCREMENT' })
      const decrement = (params) => ({ type: 'DECREMENT', num: 5 })
      const signIn = (params) => ({ type: 'SIGN_IN' })
      // #endregion

      // #region LOGGER MIDDLEWARE
      const loggerMiddleware = createLogger({})
      // #endregion

      // #region STORE (holds all states)
      const middlewares = [loggerMiddleware]
      const store = createStore(
        rootReducer,
        composeWithDevTools(
          applyMiddleware(...middlewares)
        )
      )
      // #endregion

      // #region SUBSCRIBE - EVENT listener, called any time an action is dispatched and state changed
      store.subscribe(() => console.log(store.getState())) // display in the console
      // #endregion

      // #region COMPONENT with useSelector() & useDispatch()
      const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

      function Component() {
        const counter = useSelector(state => state.counter)
        const isLogged = useSelector(state => state.isLogged)

        const dispatch = useDispatch()

        return (
          <div style={style}>
            <div>Counter: <strong>{counter}</strong></div>
            <button onClick={() => dispatch(increment())}>Increment +1</button>&#8194;
            <button onClick={() => { dispatch(decrement()) }} > Decrement -5 </button>
            <div>isLogged: <strong>{isLogged.toString()}</strong></div>
            <button onClick={() => dispatch(signIn())}>Sign in/out</button><br />
            <button onClick={() => { alert(store.getState().counter) }}>Get counter value from store</button>
          </div>
        )
      }
      // #endregion
      `}</Code>

      <H>Redux devtools extension</H>

      <p>
        It is worth to install{' '}
        <Lnk path={'https://github.com/zalmoxisus/redux-devtools-extension'}>Redux DevTools Extension</Lnk> for{' '}
        <Lnk path={'https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd'}>Chrome</Lnk>{' '}
        to observe state in real time in dev tools.
      </p>

      <LazyImg path='/imgs/redux/redux-devtools-extension.png' width='500px'/>
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
