'use client'

import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'
import create from 'zustand'
import { subscribeWithSelector, devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import axios from 'axios'
import sleeper from '../helpers/sleeper'
import produce from 'immer'
import { zustandStore } from './zustandStore/zustandStore'

// #region STORE
const useStore = create(
  immer(
    subscribeWithSelector(
      devtools(
        (set, get) => ({
          counter: 0,
          add: (num) => set((state) => ({ counter: state.counter + (num || 1) })),
          addWithImmer: (num) =>
            set((state) =>
              produce(state, (state) => {
                state.counter = state.counter + (num || 1)
              })
            ),
          addWithImmerCurried: (num) =>
            set(
              produce((state) => {
                state.counter = state.counter + (num || 1)
              })
            ),
          addWithImmerMW: (num) =>
            set((state) => {
              state.counter = state.counter + (num || 1)
            }),
          reset: () => set({ counter: 0 }),
          isLogged: false,
          logInOut: () => set((state) => ({ isLogged: !state.isLogged }), false, 'log in or out'),
          deleteStates: () => set({}, true),
          users: [],
          usersLoading: false,
          fetchUsers: async () => {
            set({ usersLoading: true })
            const res = await axios.get('https://jsonplaceholder.typicode.com/users')
            await sleeper(3000)()
            const users = res.data
            set({ users, usersLoading: false })
          },
          alertCounter: () => alert(get().counter.toString())
        }),
        { name: 'Zustand store' }
      )
    )
  )
)

const unsubscribe = useStore.subscribe(
  (state) => state.isLogged,
  (prev, now) => {
    console.log('triggered log in/out', 'prev state', prev, 'state now', now)
  }
)
// #endregion

// #region Component
function Component() {
  const counter = useStore((state) => state.counter)
  const counterWithCustomEqualityFn = useStore(
    (state) => state.counter,
    (prevState, newState) => {
      if (newState > 5) return false // render
      if (newState <= 5) return true // no render
    }
  )
  const add = useStore((state) => state.add)
  const addWithImmer = useStore((state) => state.addWithImmer)
  const addWithImmerCurried = useStore((state) => state.addWithImmerCurried)
  const addWithImmerMW = useStore((state) => state.addWithImmerMW)
  const reset = useStore((state) => state.reset)
  const isLogged = useStore((state) => state.isLogged)
  const logInOut = useStore((state) => state.logInOut)
  const deleteStates = useStore((state) => state.deleteStates)
  const users = useStore((state) => state.users)
  const usersLoading = useStore((state) => state.usersLoading)
  const fetchUsers = useStore((state) => state.fetchUsers)
  const alertCounter = useStore((state) => state.alertCounter)

  const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }
  return (
    <div style={style}>
      <div>
        Counter: <strong>{counter}</strong>
      </div>
      <div>
        Counter with custom equality func: <strong>{counterWithCustomEqualityFn}</strong>
      </div>
      <button onClick={() => add()}>Increment +1</button>
      <button onClick={() => addWithImmer()}>Increment with Immer +1</button>
      <button onClick={() => addWithImmerCurried()}>Increment with Immer Curried +1</button>
      <button onClick={() => addWithImmerMW()}>Increment with Immer Middleware +1</button>
      <button onClick={() => add(3)}>Increment +3</button>
      <button onClick={() => add(-5)}>Decrement -5</button>
      <button
        onClick={() => {
          useStore.setState({ counter: 666 })
        }}
      >
        Set counter state outside component
      </button>
      <button onClick={() => alertCounter()}>Alert counter</button>
      <br />
      <button onClick={() => reset()}>Reset</button>
      <br />
      <div>
        isLogged: <strong>{isLogged?.toString()}</strong>
      </div>
      <button onClick={() => logInOut()}>Log in/out</button>
      <br />
      <div>Fetch users</div>
      <button onClick={() => fetchUsers()}>Fetch users</button>
      <br />
      <div>
        {usersLoading && 'Loading...'}
        {!usersLoading &&
          !!users?.length &&
          users.map((user) => <div key={user.id}>{user.name}</div>)}
      </div>
      <div>Replace the store's object content</div>
      <button onClick={() => deleteStates()}>Delete states</button>
      <br />
    </div>
  )
}
// #endregion

// #region Component with store from slices
function ComponentWithStoreFromSlices() {
  const counter = zustandStore((state) => state.counter)
  const add = zustandStore((state) => state.add)
  const isLogged = zustandStore((state) => state.isLogged)
  const logInOut = zustandStore((state) => state.logInOut)

  const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }
  return (
    <div style={style}>
      <div>
        Counter: <strong>{counter}</strong>
      </div>
      <button onClick={() => add()}>Increment +1</button>
      <div>
        isLogged: <strong>{isLogged?.toString()}</strong>
      </div>
      <button onClick={() => logInOut()}>Log in/out</button>
      <br />
    </div>
  )
}
// #endregion

const postObj = {
  title: 'zustand',
  date: '2022.05.24',
  tags: ['state'],
  imgUrl: 'https://antonarbus.com/imgs/zustand.png',
  desc: 'zustand state manager',
  body: (
    <>
      <H>Info</H>

      <p>
        <Lnk path="https://github.com/pmndrs/zustand">Zustand</Lnk> state manager is the simplest
        state manager ever.
      </p>

      <H>Installation</H>

      <p>
        <Code bash>npm install zustand</Code>
      </p>

      <H>App</H>

      <Component />

      <H>Store</H>

      <Code block jsx>{`
      import create from 'zustand'
      const useStore = create(set => ({
        counter: 0,
        add: (num) => set((state) => ({ counter: state.counter + (num || 1) })),
        reset: () => set({ counter: 0 }),
        isLogged: false,
        logInOut: () => set((state) => ({ isLogged: !state.isLogged })),
        deleteStates: () => set({}, true)
      }))
      `}</Code>

      <H>Set</H>

      <ul>
        <li>
          <code>{'set({ counter: 0 })'}</code> pushes counter state into the store object, merges by
          default
        </li>
        <li>
          <code>{'set({ counter: 0 }, true)'}</code> replaces whole store with counter state
        </li>
        <li>
          <code>{'set((state) => ({ counter: state.counter + 1 }))'}</code> pushes updated counter
          state into the store object
        </li>
      </ul>

      <H>Reactive binding</H>

      <p>Select your state and the component will re-render on changes.</p>

      <Hs>Whole store</Hs>

      <p>Get the whole store.</p>

      <Code block jsx>{`
      const state = useStore();
      `}</Code>

      <p>It will cause the component to update on every store's state change</p>

      <Hs>Specific state</Hs>

      <Code block jsx>{`
        const counter = useStore(state => state.counter)
      `}</Code>

      <H>Custom equality for re-render</H>

      <Code block jsx>{`
      const counterWithCustomEqualityFn = useStore(
        state => state.counter,
        (prevState, newState) => {
          if (newState > 5) return false // render
          if (newState <= 5) return true // no render
        }
      )
      `}</Code>

      <H>Async actions</H>

      <Code block jsx>{`
      const useStore = create(set => ({
        fishes: {},
        fetch: async pond => {
          const response = await fetch(pond)
          set({ fishes: await response.json() })
        }
      }))
      `}</Code>

      <H>Read from state in actions</H>

      <Code block jsx>{`
      const useStore = create((set, get) => ({
        sound: "grunt",
        action: () => {
          const sound = get().sound
          // ...
        }
      })
      `}</Code>

      <H>Non-reactive reading</H>

      <Code block jsx>{`
      const useStore = create(() => ({ paw: true, snout: true, fur: true }))
      // Getting non-reactive fresh state
      const paw = useStore.getState().paw
      `}</Code>

      <H>Set state outside store</H>

      <Code block jsx>{`
      useStore.setState({ paw: false })
      `}</Code>

      <H>Subscribe for all changes</H>

      <Code block jsx>{`
      // Listening to all changes, fires synchronously on every change
      const unsubscribe = useStore.subscribe(console.log)
      // Unsubscribe listeners
      unsubscribe()
      // Destroying the store (removing all listeners)
      useStore.destroy()
      `}</Code>

      <H>Subscribe for state changes</H>

      <p>Need to add middleware</p>

      <Code block jsx>{`
      import create from 'zustand'
      import { subscribeWithSelector } from 'zustand/middleware'

      const useStore = create(subscribeWithSelector((set, get) => ({
        isLogged: false,
        logInOut: () => set((state) => ({ isLogged: !state.isLogged })),
      })))

      const unsubscribe = useStore.subscribe(state => state.isLogged, (prev, now) => { console.log('triggered log in/out', 'prev state', prev, 'state now', now)})

      function Component() {
        const isLogged = useStore(state => state.isLogged)
        const logInOut = useStore(state => state.logInOut)

        return (
          <div style={style}>
            <div>isLogged: <strong>{isLogged?.toString()}</strong></div>
            <button onClick={() => logInOut()}>Log in/out</button>
          </div>
        )
      }
      `}</Code>

      <H>Immer</H>

      <Code block jsx>{`
      import create from 'zustand'
      import produce from 'immer'
      import { immer } from 'zustand/middleware/immer'

      const useStore = create(immer((set, get) => ({
        counter: 0,
        add: (num) => set((state) => ({ counter: state.counter + (num || 1) })),
        addWithImmer: (num) => set((state) => produce(state, (state) => {
          state.counter = state.counter + (num || 1)
        })),
        addWithImmerCurried: (num) => set(produce((state) => {
          state.counter = state.counter + (num || 1)
        })),
        addWithImmerMW: (num) => set((state) => { state.counter = state.counter + (num || 1) }),
      })))
      `}</Code>

      <H>Devtools</H>

      <p>Add redux devtools as a middleware</p>

      <Code block jsx>{`
      import { subscribeWithSelector, devtools} from 'zustand/middleware'
      const useStore = create(immer(subscribeWithSelector(devtools((set, get) => ({
        counter: 0,
        add: (num) => set((state) => ({ counter: state.counter + (num || 1) }), false, 'ACTION NAME'),
        // false means 'do not overwrite' the state, but merge it
      })))))
      `}</Code>

      <p>
        Devtools can not dispatch an action, but can register it if we provide actions name as 3rd
        argument in <i>set</i> function.
      </p>

      <H>Whole code</H>

      <Code block jsx>{`
      import create from 'zustand'
      import { subscribeWithSelector, devtools } from 'zustand/middleware'
      import { immer } from 'zustand/middleware/immer'
      import axios from 'axios'
      import sleeper from '/functions/sleeper'
      import produce from 'immer'

      // #region STORE
      const useStore = create(immer(subscribeWithSelector(devtools((set, get) => ({
        counter: 0,
        add: (num) => set((state) => ({ counter: state.counter + (num || 1) })),
        addWithImmer: (num) => set((state) => produce(state, (state) => {
          state.counter = state.counter + (num || 1)
        })),
        addWithImmerCurried: (num) => set(produce((state) => {
          state.counter = state.counter + (num || 1)
        })),
        addWithImmerMW: (num) => set((state) => { state.counter = state.counter + (num || 1) }),
        reset: () => set({ counter: 0 }),
        isLogged: false,
        logInOut: () => set((state) => ({ isLogged: !state.isLogged }), false, 'log in or out'),
        deleteStates: () => set({}, true),
        users: [],
        usersLoading: false,
        fetchUsers: async () => {
          set({ usersLoading: true })
          const res = await axios.get('https://jsonplaceholder.typicode.com/users')
          await sleeper(3000)()
          const users = res.data
          set({ users, usersLoading: false })
        },
        alertCounter: () => alert(get().counter.toString())
      }), { name: 'Zustand store' }))))

      function App() {
        const fishes = useStore((state) => state.fishes);
        const eatFish = useStore((state) => state.eatFish);

        return (
          <div className="App">
            <p>Fishes : {fishes}</p>
            <p>
              <button onClick={eatFish}>Eat</button>
            </p>
          </div>
        )
      }

      const unsubscribe = useStore.subscribe(state => state.isLogged, (prev, now) => { console.log('triggered log in/out', 'prev state', prev, 'state now', now) })
      // #endregion

      // #region Component
      function Component() {
        const counter = useStore(state => state.counter)
        const counterWithCustomEqualityFn = useStore(
          state => state.counter,
          (prevState, newState) => {
            if (newState > 5) return false // render
            if (newState <= 5) return true // no render
          }
        )
        const add = useStore(state => state.add)
        const addWithImmer = useStore(state => state.addWithImmer)
        const addWithImmerCurried = useStore(state => state.addWithImmerCurried)
        const addWithImmerMW = useStore(state => state.addWithImmerMW)
        const reset = useStore(state => state.reset)
        const isLogged = useStore(state => state.isLogged)
        const logInOut = useStore(state => state.logInOut)
        const deleteStates = useStore(state => state.deleteStates)
        const users = useStore(state => state.users)
        const usersLoading = useStore(state => state.usersLoading)
        const fetchUsers = useStore(state => state.fetchUsers)
        const alertCounter = useStore(state => state.alertCounter)

        const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }
        return (
          <div style={style}>
            <div>Counter: <strong>{counter}</strong></div>
            <div>Counter with custom equality func: <strong>{counterWithCustomEqualityFn}</strong></div>
            <button onClick={() => add()}>Increment +1</button>
            <button onClick={() => addWithImmer()}>Increment with Immer +1</button>
            <button onClick={() => addWithImmerCurried()}>Increment with Immer Curried +1</button>
            <button onClick={() => addWithImmerMW()}>Increment with Immer Middleware +1</button>
            <button onClick={() => add(3)}>Increment +3</button>
            <button onClick={() => add(-5)}>Decrement -5</button>
            <button onClick={() => { useStore.setState({ counter: 666 }) }}>Set counter state outside component</button>
            <button onClick={() => alertCounter()}>Alert counter</button><br />
            <button onClick={() => reset()}>Reset</button><br />
            <div>isLogged: <strong>{isLogged?.toString()}</strong></div>
            <button onClick={() => logInOut()}>Log in/out</button><br />
            <div>Fetch users</div>
            <button onClick={() => fetchUsers()}>Fetch users</button><br />
            <div>
              {usersLoading && 'Loading...'}
              {!usersLoading && !!users?.length && users.map(user => <div key={user.id}>{user.name}</div>)}
            </div>
            <div>Replace the store's object content</div>
            <button onClick={() => deleteStates()}>Delete states</button><br />
          </div>
        )
      }
      // #endregion
      `}</Code>

      <H>Split store into slices</H>

      <ComponentWithStoreFromSlices />

      <Code block jsx>{`
      // posts/zustandStore/counterSlice.js
      export const counterSlice = (set, get) => ({
        counter: 0,
        add: (num) => set(
          (state) => ({ counter: state.counter + (num || 1) }),
          false,
          'add'
        )
      })
      `}</Code>

      <Code block jsx>{`
      // posts/zustandStore/loginOutSlice.js
      export const loginOutSlice = (set, get) => ({
        isLogged: false,
        logInOut: () => set(
          (state) => ({ isLogged: !state.isLogged }),
          false,
          'log in / out'
        )
      })
      `}</Code>

      <Code block jsx>{`
      // posts/zustandStore/zustandStore.js
      import create from 'zustand'
      import { devtools } from 'zustand/middleware'
      import { counterSlice } from './counterSlice'
      import { loginOutSlice } from './loginOutSlice'

      export const zustandStore = create(devtools((set, get) => ({
        ...counterSlice(set, get),
        ...loginOutSlice(set, get)
      }), { name: 'Store with slices' }))
      `}</Code>

      <Code block jsx>{`
      import { zustandStore } from './zustandStore/zustandStore'

      function ComponentWithStoreFromSlices() {
        const counter = zustandStore(state => state.counter)
        const add = zustandStore(state => state.add)
        const isLogged = zustandStore(state => state.isLogged)
        const logInOut = zustandStore(state => state.logInOut)

        const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }
        return (
          <div style={style}>
            <div>Counter: <strong>{counter}</strong></div>
            <button onClick={() => add()}>Increment +1</button>
            <div>isLogged: <strong>{isLogged?.toString()}</strong></div>
            <button onClick={() => logInOut()}>Log in/out</button><br />
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
