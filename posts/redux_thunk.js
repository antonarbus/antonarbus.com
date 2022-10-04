import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import axios from 'axios'
import sleeper from '/functions/sleeper'

// #region REDUCER
const initialState = { loading: false, users: [], err: '' }

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_USERS_SUCCESS':
      return { loading: false, users: action.payload, err: '' }
    case 'FETCH_USERS_FAILURE':
      return { loading: false, users: [], err: action.payload }
    default: return state
  }
}

const rootReducer = combineReducers({
  users
})
// #endregion

// #region ACTION CREATORS
const fetchUsersRequest = () => ({ type: 'FETCH_USERS_REQUEST' })
const fetchUsersSuccess = (users) => ({ type: 'FETCH_USERS_SUCCESS', payload: users })
const fetchUsersFailure = (err) => ({ type: 'FETCH_USERS_FAILURE', payload: err })
const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest())
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(sleeper(1000))
      .then(res => dispatch(fetchUsersSuccess(res.data)))
      .catch(err => dispatch(fetchUsersFailure(err.message)))
  }
}
// #endregion

// #region STORE
const middlewares = [thunk]
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
)
// #endregion

// #region Component
const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

function Component() {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  return (
    <div style={style}>
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
  title: 'redux thunk',
  date: '2022.05.23',
  tags: ['react', 'redux'],
  desc: 'redux thunk',
  imgUrl: 'https://antonarbus.com/imgs/redux.png',
  body: (
    <>
      <H>Example</H>

      <Provider store={store}>
        <Component />
      </Provider>

      <H>Idea</H>

      <p>
        <Lnk path='https://redux.js.org/usage/writing-logic-thunks'>Redux thunk</Lnk> is needed for asynchronous calls, such as data fetching.
      </p>

      <p>Thunk middleware allows for an action creator function to return a function instead of an action object.</p>

      <p>Redux-thunk does is a middleware that looks at every action that passes through the system, and if it’s a function, it calls that function.</p>

      <p>Great <Lnk path='https://daveceddia.com/what-is-a-thunk/'>explanation</Lnk> what the thunk is.</p>

      <p>Basic 'action creator' function.</p>

      <Code block jsx>{`
      function userLoggedIn() {
        return {
          type: 'USER_LOGGED_IN',
          username: 'dave'
        };
      }
      // use it with dispatch
      dispatch(userLoggedOut())
      `}</Code>

      <p>Thunk version</p>

      <Code block jsx>{`
      function logOutUser() {
        return function(dispatch, getState) {
          return axios.post('/logout').then(function() {
            // pretend we declared an action creator
            // called 'userLoggedOut', and now we can dispatch it
            dispatch(userLoggedOut());
          })
        }
      }
      // use it with dispatch
      dispatch(logOutUser()).then(() => {  
        // do something after logout  
      })
      `}</Code>

      <p>Thunks can dispatch new actions if they need to and access the current state.</p>

      <H>Installation</H>

      <p>
        <Code bash>npm install redux-thunk</Code>
      </p>

      <H>Reducer</H>

      <Code block jsx>{`
      const initialState = { loading: false, users: [], err: '' }

      const users = (state = initialState, action) => {
        switch (action.type) {
          case 'FETCH_USERS_REQUEST':
            return { ...state, loading: true }
          case 'FETCH_USERS_SUCCESS':
            return { loading: false, users: action.payload, err: '' }
          case 'FETCH_USERS_FAILURE':
            return { loading: false, users: [], err: action.payload }
          default: return state
        }
      }

      const rootReducer = combineReducers({
        users
      })
      `}</Code>

      <H>Action creators</H>

      <Code block jsx>{`
      const fetchUsersRequest = () => ({ type: 'FETCH_USERS_REQUEST' })
      const fetchUsersSuccess = (users) => ({ type: 'FETCH_USERS_SUCCESS', payload: users })
      const fetchUsersFailure = (err) => ({ type: 'FETCH_USERS_FAILURE', payload: err })
      const fetchUsers = () => {
        return (dispatch) => {
          dispatch(fetchUsersRequest())
          axios.get('https://jsonplaceholder.typicode.com/users')
            .then(sleeper(1000))
            .then(res => dispatch(fetchUsersSuccess(res.data)))
            .catch(err => dispatch(fetchUsersFailure(err.message)))
        }
      }
      `}</Code>

      <H>Store</H>

      <Code block jsx>{`
      const middlewares = [thunk]
      const store = createStore(
        rootReducer,
        composeWithDevTools(
          applyMiddleware(...middlewares)
        )
      )
      `}</Code>

      <H>Component</H>

      <Code block jsx>{`
      const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

      function Component() {
        const users = useSelector(state => state.users)
        const dispatch = useDispatch()

        return (
          <div style={style}>
            <button onClick={() => dispatch(fetchUsers())}>Fetch users</button><br />
            <div>
              {users.loading && 'Loading...'}
              {users.err && users.err}
              {!users.loading && !!users.users.length && users.users.map(user => <div key={user.id}>{user.name}</div>)}
            </div>
          </div>
        )
      }
      `}</Code>

      <H>Whole code</H>

      <Code block js>{`
      import { combineReducers, createStore, applyMiddleware } from 'redux'
      import { Provider, useSelector, useDispatch } from 'react-redux'
      import { composeWithDevTools } from 'redux-devtools-extension'
      import thunk from 'redux-thunk'
      import axios from 'axios'
      import sleeper from '/functions/sleeper'

      // #region REDUCERS (sets and changes state)
      const initialState = { loading: false, users: [], err: '' }

      const users = (state = initialState, action) => {
        switch (action.type) {
          case 'FETCH_USERS_REQUEST':
            return { ...state, loading: true }
          case 'FETCH_USERS_SUCCESS':
            return { loading: false, users: action.payload, err: '' }
          case 'FETCH_USERS_FAILURE':
            return { loading: false, users: [], err: action.payload }
          default: return state
        }
      }

      const rootReducer = combineReducers({
        users
      })
      // #endregion

      // #region ACTION CREATORS
      const fetchUsersRequest = () => ({ type: 'FETCH_USERS_REQUEST' })
      const fetchUsersSuccess = (users) => ({ type: 'FETCH_USERS_SUCCESS', payload: users })
      const fetchUsersFailure = (err) => ({ type: 'FETCH_USERS_FAILURE', payload: err })
      const fetchUsers = () => {
        return (dispatch) => {
          dispatch(fetchUsersRequest())
          axios.get('https://jsonplaceholder.typicode.com/users')
            .then(sleeper(1000))
            .then(res => dispatch(fetchUsersSuccess(res.data)))
            .catch(err => dispatch(fetchUsersFailure(err.message)))
        }
      }
      // #endregion

      // #region STORE
      const middlewares = [thunk]
      const store = createStore(
        rootReducer,
        composeWithDevTools(
          applyMiddleware(...middlewares)
        )
      )
      // #endregion

      // #region Component
      const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

      function Component() {
        const users = useSelector(state => state.users)
        const dispatch = useDispatch()

        return (
          <div style={style}>
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
