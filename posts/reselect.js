import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'
import { combineReducers } from 'redux'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { configureStore } from '@reduxjs/toolkit'

const initApples = 5
const apples = (state = initApples, action) => {
  if (action.type === 'ADD APPLE') return state + (action.num || 1)
  return state
}

const initBananas = 10
const bananas = (state = initBananas, action) => {
  if (action.type === 'ADD BANANA') return state + (action.num || 1)
  return state
}

const rootReducer = combineReducers({
  apples,
  bananas
})

const store = configureStore({
  reducer: rootReducer,
  devTools: true
})

const getApples = state => state.apples
const getBananas = state => state.bananas

const getTotal = createSelector(
  [getApples, getBananas],
  (applesQty, bananasQty) => applesQty + bananasQty
)

const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

function Component() {
  const apples = useSelector(getApples)
  const bananas = useSelector(getBananas)
  const total = useSelector(getTotal)
  const dispatch = useDispatch()

  return (
    <div style={style}>
      <div>Apples: <strong>{apples}</strong></div>
      <button onClick={() => dispatch({ type: 'ADD APPLE' })}>ADD APPLE +1</button>&#8194;
      <div>Bananas: <strong>{bananas}</strong></div>
      <button onClick={() => dispatch({ type: 'ADD BANANA' })}>ADD BANANA +1</button>&#8194;
      <div>Total: <strong>{total}</strong></div>
    </div>
  )
}

const postObj = {
  title: 'reselect',
  date: '2021.10.14',
  tags: ['react', 'redux'],
  desc: 'memoization of selector in redux',
  imgUrl: 'https://antonarbus.com/imgs/redux.png',
  body: (
    <>
      <H>Idea</H>

      <ul>
        <li><Lnk path='/posts/redux'>Post</Lnk> about <Lnk path='https://redux.js.org/'>Redux</Lnk> basics</li>
        <li>To make a reactive variable from the store we need to do ... <Code js block>{'const counter = useSelector(state => state.counter)'}</Code> </li>
        <li><Code js>{'state => state.counter'}</Code> this function is called <i>selector</i> and returns part of the sate</li>
        <li>Selector can be extracted into a separate selector function, can be used in case the same selector is used in multiple places</li>
        <li>With <Lnk path='https://www.npmjs.com/package/reselect'>createSelector</Lnk> we can pass several selectors into it and return new modified cached selector</li>
        <li>Good <Lnk path='https://daveceddia.com/redux-selectors/'>article</Lnk> about <i>reselect</i></li>
        <li>Also good <Lnk path='https://stackoverflow.com/a/74491857/7239778'>explanation</Lnk> how selectors work</li>
      </ul>

      <H>Installation</H>

      <ul>
        <li><Code bash>npm i reselect</Code></li>
      </ul>

      <Code block js>{`
      import { combineReducers } from 'redux';
      import { Provider, useSelector, useDispatch } from 'react-redux'
      import { createSelector } from 'reselect'
      import { configureStore } from '@reduxjs/toolkit'

      const initApples = 5
      const apples = (state = initApples, action) => {
        if (action.type === 'ADD APPLE') return state + (action.num || 1)
        return state
      }

      const initBananas = 10
      const bananas = (state = initBananas, action) => {
        if (action.type === 'ADD BANANA') return state + (action.num || 1)
        return state
      }

      const rootReducer = combineReducers({
        apples,
        bananas,
      })

      const store = configureStore({
        reducer: rootReducer,
        devTools: true,
      })

      const getApples = state => state.apples
      const getBananas = state => state.bananas

      const getTotal = createSelector(
        [getApples, getBananas],
        (applesQty, bananasQty) => applesQty + bananasQty
      )

      <Provider store={store}>
        <Component />
      </Provider>
      `}</Code>

      <ul>
        <p>What's going on here? ...</p>
        <li>We've split the function into standalone selectors to get one piece of data</li>
        <li>Then, we combine the fragments with the <Code js>createSelector()</Code> function</li>
        <li>It takes the fragments and a transform function as the last argument</li>
        <li>That transform function receives the results from the fragments</li>
        <li>Whatever it returns is what gets returned by the “master” selector</li>
        <li><Code js>createSelector()</Code> returns the “master” selector which can take <code>state</code> and optionally <code>props</code></li>
        <li>It passes (<code>state</code>, <code>props</code>) to each of the fragment selectors</li>
      </ul>

      <Provider store={store}>
        <Component />
      </Provider>

      <H>resultEqualityCheck</H>

      <ul>
        <li>we can control how selector compare if state has been changed</li>
        <li>in my example i was interested if we added or removed any items from the array and if an item id was changed</li>
        <li>but was not interested if any property value inside of an item was changed or not</li>
        <li>to do that I mapped through an array and returned same array but only with id props</li>
        <li>but it did not help, because map method every time returned a new array, even it looks the same</li>
        <li>and re-renders happened all the time</li>
        <li>with <Code>resultEqualityCheck</Code> we manually can control how we check updated and previous state </li>
      </ul>

      <Code block jsx>{`
      export const selectItemsShape = createSelector(
        [(state: RootState) => state.items],
        (items) => items,
        {
          memoizeOptions: {
            resultEqualityCheck: (prevItems:ItemsType, currentItems:ItemsType) => {
              const addedOrDeletedItem = prevItems.length !== currentItems.length
              if (addedOrDeletedItem) return false
              const itemsIdsDoNotMatch = prevItems.some((item, index) => item.id !== currentItems[index]?.id)
              if (itemsIdsDoNotMatch) return false
              return true
            }
          }
        }
      )
      `}</Code>

      <Code block jsx>{`
      export const Items = () => {
        const itemsShape = useSelectorTyped(selectItemsShape)

        return (
          <ItemsContainer>
            {itemsShape.map((item, index) => {
              if (item.type === 'text') return <TextItem key={item.id} item={item} index={index} />
              if (item.type === 'text editable') return <FroalaItem key={item.id} item={item} index={index} />
              if (item.type === 'paste') return <PasteText key={item.id} />
              return null
            })}
          </ItemsContainer>
        )
      }
      `}</Code>

      <H>Pass an argument</H>

      <ul>
        <li><Lnk path='https://stackoverflow.com/a/61220891/7239778'>https://stackoverflow.com/a/61220891/7239778</Lnk></li>
      </ul>

      <Code block jsx>{`
      // selector.js
      const selectItemsByCategory = createSelector(
        [
          state => state.items,
          (state, category) => category
        ],
        (items, category) => items.filter(item => item.category === category)
      );

      // App.js
      const items = selectItemsByCategory(state, 'javascript');
      // Another way if you're using redux hook:
      const items = useSelector(state => selectItemsByCategory(state, 'javascript'));
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
