'use client'


import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { store } from './redux-toolkit-demo/store'
import { increment, decrement } from './redux-toolkit-demo/slices/counterSlice.js'
import { login } from './redux-toolkit-demo/slices/loginSlice.js'
import { fetchUsers } from './redux-toolkit-demo/slices/usersSlice.js'

// #region COMPONENT with useSelector() & useDispatch()
const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

function Component() {
  const { counter } = useSelector(state => state.counter)
  const { isLogged } = useSelector(state => state.login)
  const { users } = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div style={style}>
      <div>Counter: <strong>{counter}</strong></div>
      <button onClick={() => dispatch(increment())}>Increment +1</button>&#8194;
      <button onClick={() => dispatch(decrement({ num: 3 }))}>Decrement -3</button>
      <div>isLogged: <strong>{isLogged.toString()}</strong></div>
      <button onClick={() => dispatch(login())}>Sign in/out</button><br />
      <button onClick={() => dispatch(fetchUsers())}>Fetch users</button><br />
      <div>
        {users.loading && 'Loading...'}
        {users.err && users.err}
        {!users.loading && !!users.users.length && users.users.map(user => <div key={user.id}>{user.name}</div>)}
      </div>
    </div>
  )
}
// #endregion

const postObj = {
  title: 'redux toolkit',
  date: '2021.10.14',
  tags: ['react', 'redux'],
  desc: 'redux-toolkit',
  imgUrl: 'https://antonarbus.com/imgs/redux.png',
  body: (
    <>

      <Provider store={store}>
        <Component />
      </Provider>

      <H>Idea</H>

      <ul>
        <li>Native Redux requires too much code and external packages</li>
        <li>Redux team provides opinionated way to work with redux - <Lnk path='https://redux-toolkit.js.org/'>Redux Toolkit</Lnk></li>
      </ul>

      <H>Install</H>

      <Code bash>npm install @reduxjs/toolkit react-redux</Code>

      <H>Redux basics</H>

      <p>In this post I will implement similar <Lnk path="/posts/redux">app</Lnk> as I did in in basic Redux.</p>

      <p>In redux we deal with <i>STORE</i>, <i>ACTION</i>, <i>REDUCER</i>, <i>DISPATCH</i></p>

      <ol>
        <li><i>STORE</i> keeps all states</li>
        <li><i>ACTION</i> is an object which describes what we want to do with a state</li>
        <li><i>DISPATCH</i> sends an <i>ACTION</i> to a <i>REDUCER</i></li>
        <li><i>REDUCER</i> sets the initial state and updates the state in <i>STORE</i> in accordance to an <i>ACTION</i> we provide</li>
      </ol>

      <H>Redux Toolkit vs Redux</H>

      <ul>
        <li>Split your app into feature files</li>
        <li>Keep REDUCER & ACTION for a single feature in a single file</li>
        <li>The convention is to have SLICE as a suffix in the file name</li>
        <li>Entire application state is split into slices</li>
        <li>In our example we have 3 features with corresponding files: counterSlice.js, loginSlice.js & usersSlice.js</li>
        <li>Initial state is stored in the <code>initialState</code> object</li>
        <li>Reducers are stored in the <code>reducers</code> object</li>
        <li>In REDUCER with Toolkit we can mutate the state and do not need to explicitly return the state (Immer package is inside)</li>
        <li>ACTION CREATORS will be created automatically based on reducer name functions</li>
        <li>No need to use <code>combineReducers()</code></li>
        <li>In Toolkit a reducer responses only to action types generated in the same slice</li>
        <li><code>extraReducers</code> allows a slice to respond to action types from another slice</li>
        <li>Toolkit has built-in thunk implementation</li>
        <li>Dev tools package is built-in in, just need to install the browser <Lnk path='https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd'>extension</Lnk>.</li>
      </ul>

      <H>Slice (reducer + action)</H>

      <Hs>Counter slice</Hs>

      <p>Counter slice adds and subtracts number.</p>

      <p>Here we have <i>extraReducer</i> written in not preferable way, which can respond to the action from the <i>greetings</i> slice.</p>

      <Code block jsx>{`
      // redux-toolkit-demo/slices/counterSlice.js
      import { createSlice } from '@reduxjs/toolkit'

      const initialState = {
        counter: 0
      }

      const counterSlice = createSlice({
        name: 'counterSlice',
        initialState,
        reducers: {
          increment: (state, action) => {
            state.counter += (action.payload || 1)
          },
          decrement: (state, action) => {
            state.counter -= (action.payload.num || 1)
          }
        },
        // not preferable way of extraReducers syntax
        extraReducers: {
          'greetingsSlice/changeGreeting': (state, action) => {
            console.log('I can respond to changeGreeting() action of greetingsSlice from counterSlice')
          }
        }
      })

      export default counterSlice.reducer
      export const { increment, decrement } = counterSlice.actions
      `}</Code>

      <Hs>Login slice</Hs>

      <p>Login slice just toggles the login flag.</p>

      <p>Here we have <i>extraReducer</i> written in preferable way, which can respond to the action from the <i>greetings</i> slice.</p>

      <Code block jsx>{`
      // redux-toolkit-demo/slices/loginSlice.js
      import { createSlice } from '@reduxjs/toolkit'
      import { changeGreeting } from './greetingsSlice'

      const initialState = {
        isLogged: false
      }

      const loginSlice = createSlice({
        name: 'loginSlice',
        initialState,
        reducers: {
          login: (state, action) => {
            state.isLogged = !state.isLogged
          }
        },
        // preferable way of extraReducers syntax
        extraReducers: (builder) => {
          builder.addCase(changeGreeting, (state, action) => {
            console.log('I can respond to changeGreeting() action of greetingsSlice from loginSlice')
          })
        }
      })

      export default loginSlice.reducer
      export const { login } = loginSlice.actions
      `}</Code>

      <Hs>Users slice</Hs>

      <p>This is async thunk middleware, which fetches data from the api.</p>

      <Code block jsx>{`
      // redux-toolkit-demo/slices/usersSlice.js
      import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
      import axios from 'axios'
      import sleeper from '/functions/sleeper'

      const initialState = {
        loading: false,
        users: [],
        err: ''
      }

      // generates 'pending', 'fulfilled' & 'rejected' action types automatically
      const fetchUsers = createAsyncThunk('users/fetchUsers', () => {
        return axios.get('https://jsonplaceholder.typicode.com/users')
          .then(sleeper(1000))
          .then(res => res.data)
      })

      const usersSlice = createSlice({
        name: 'usersSlice',
        initialState,
        extraReducers: (builder) => {
          builder.addCase(fetchUsers.pending, (state, action) => {
            state.loading = true
          })

          builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
          })

          builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message
          })
        }
      })

      export default usersSlice.reducer
      export { fetchUsers }
      `}</Code>

      <H>Store</H>

      <Code block jsx>{`
      // redux-toolkit-demo/store.js
      import { configureStore } from '@reduxjs/toolkit'
      import { createLogger } from 'redux-logger'
      import counter from '/redux-toolkit-demo/slices/counterSlice.js'
      import login from '/redux-toolkit-demo/slices/loginSlice.js'
      import greetings from './slices/greetingsSlice.js'
      import users from './slices/usersSlice.js'

      // #region LOGGER MIDDLEWARE
      const logger = createLogger({})
      // #endregion

      export const store = configureStore({
        reducer: {
          counter,
          login,
          greetings,
          users
        },
        middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
        devTools: true
      })
      `}</Code>

      <H>Component</H>

      <Code block jsx>{`
      import { Code, H, Hs, Lnk, jsxToStr, LazyImg } from '/components/post/reExport'
      import { Provider, useSelector, useDispatch } from 'react-redux'
      import { store } from '/redux-toolkit-demo/store'
      import { increment, decrement } from '/redux-toolkit-demo/slices/counterSlice.js'
      import { login } from '/redux-toolkit-demo/slices/loginSlice.js'
      import { changeGreeting } from '../redux-toolkit-demo/slices/greetingsSlice.js'
      import { fetchUsers } from '/redux-toolkit-demo/slices/usersSlice.js'

      // #region COMPONENT with useSelector() & useDispatch()
      const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

      function Component() {
        const counter = useSelector(state => state.counter.counter)
        const isLogged = useSelector(state => state.login.isLogged)
        const users = useSelector(state => state.users)
        const dispatch = useDispatch()

        return (
          <div style={style}>
            <div>Counter: <strong>{counter}</strong></div>
            <button onClick={() => dispatch(increment())}>Increment +1</button>&#8194;
            <button onClick={() => dispatch(decrement({ num: 3 }))}>Decrement -3</button>
            <div>isLogged: <strong>{isLogged.toString()}</strong></div>
            <button onClick={() => dispatch(login())}>Sign in/out</button><br />
            <button onClick={() => dispatch(fetchUsers())}>Fetch users</button><br />
            <div>
              {users.loading && 'Loading...'}
              {users.err && users.err}
              {!users.loading && !!users.users.length && users.users.map(user => <div key={user.id}>{user.name}</div>)}
            </div>
          </div>
        )
      }
      // #endregion

      <Provider store={store}>
        <Component />
      </Provider>
      `}</Code>

      <H>TypeScript</H>

      <p><Lnk path='https://www.youtube.com/watch?v=SM3uwYgGxNE&list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3&index=31'>Watch</Lnk> this youtube video from Vishwas about typescript in redux.</p>
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
