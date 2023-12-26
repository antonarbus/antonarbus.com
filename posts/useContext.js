import { Code, H, jsxToStr } from '/components/post/reExport'
import { createContext, useContext, useState, useReducer } from 'react'
import shortid from 'shortid'

// #region props drilling vs useContext()
const style = { border: '1px solid grey', padding: '10px', margin: '10px' }
const ContextParent = createContext()
const ContextA = createContext()
const ContextB = createContext()

function Parent1 () {
  return (
    <ContextParent.Provider value={{ data: 'data in context from context Parent' }}>
      <A data='data in props from Parent' />
      <Age />
    </ContextParent.Provider>

  )
}
function A (props) {
  return (
    <ContextA.Provider value={'context A'}>
      <div style={style}>
        A
        <B data={props.data} />
      </div>
    </ContextA.Provider>
  )
}
function B (props) {
  return (
    <ContextB.Provider value={'context B'}>
      <div style={style}>
        B
        <C data={props.data} />
      </div>
    </ContextB.Provider>

  )
}
function C (props) {
  return (
    <div style={style}>
      C
      <D data={props.data} />
    </div>
  )
}
function D (props) {
  const contextParent = useContext(ContextParent)
  const contextA = useContext(ContextA)
  const contextB = useContext(ContextB)
  return (
    <div style={style}>
      D
      <div>{props.data}</div>
      <div>{contextParent.data} & {contextA} & {contextB}</div>
    </div>
  )
}
function Age () {
  const contextParent = useContext(ContextParent)
  return (
    <div style={style}>{contextParent.data}</div>
  )
}
// #endregion

// #region useContext() & state
const Context2 = createContext('')

function Parent2 () {
  const [string, setString] = useState(shortid())

  const contextValue = {
    string,
    setString,
    style: { border: '2px solid grey', padding: '10px', margin: '10px' }
  }

  return (
    <Context2.Provider value={contextValue}>
      <div style={contextValue.style}>
        <div>Parent</div>
        <div>String from context: <b>{contextValue.string}</b></div>
        <button onClick={() => contextValue.setString(shortid())}>Change string</button>
        <Child2 name='Child 1' />
        <Child2 name='Child 2' />
      </div>
    </Context2.Provider>
  )
}

function Child2 (props) {
  const contextValue = useContext(Context2)
  return (
    <div style={contextValue.style}>
      <div>{props.data}</div>
      <div>String from context: <b>{contextValue.string}</b></div>
      <button onClick={() => contextValue.setString(shortid())}>Change string</button>
    </div>
  )
}
// #endregion

// #region same with useReducer()
const Context3 = createContext('')

function reducer (state, action) {
  if (action === 'randomize string') return shortid()
  return state
}

function Parent3 () {
  const [string, dispatch] = useReducer(reducer, shortid())

  const contextValue = {
    string,
    dispatch,
    style: { border: '2px solid grey', padding: '10px', margin: '10px' }
  }

  return (
    <Context3.Provider value={contextValue}>
      <div style={contextValue.style}>
        <div>Parent</div>
        <div>String from context: <b>{contextValue.string}</b></div>
        <button onClick={() => contextValue.dispatch('randomize string')}>Change string</button>
        <Child3 name='Child 1' />
        <Child3 name='Child 2' />
      </div>
    </Context3.Provider>
  )
}

function Child3 (props) {
  const contextValue = useContext(Context3)
  return (
    <div style={contextValue.style}>
      <div>{props.data}</div>
      <div>String from context: <b>{contextValue.string}</b></div>
      <button onClick={() => contextValue.dispatch('randomize string')}>Change string</button>
    </div>
  )
}
// #endregion

const postObj = {
  title: 'useContext',
  date: '2021.09.26',
  tags: ['react', 'basics'],
  desc: 'useContext react hook',
  body: (
    <>
      <H>Pass props vs <Code>useContext()</Code></H>

      <ul>
        <li>In a project we may have multiple nested components</li>
        <li>Data should be passed between components, for example...</li>
        <li>Pass <Code>'data in props from Parent'</Code> string through all components tree in props, which creates <i>prop drilling</i> issue</li>
        <li>If we have many variables it may produce a mess in code</li>
        <li>We can pass data in a smarter way</li>
        <li>Create <Code>Context</Code> variable outside components with <Code js >{'Context = createContext()'}</Code></li>
        <li>Wrap components in <Code html >{'<Context.Provider value={value}>'}</Code></li>
        <li>Passed <Code>value</Code> will be available in all children components</li>
        <li><Code>value</Code> can be retrieved from the context with hook <Code js >{'useContext(Context)'}</Code></li>
        <li>Multiple contexts are allowed</li>
      </ul>

      <Code block>{`
      import { createContext, useContext, useState, useReducer } from "react"

      const style = { border: "1px solid grey", padding: "10px", margin: "10px" }
      const ContextParent = createContext()
      const ContextA = createContext()
      const ContextB = createContext()

      function Parent1() {
        return (
          <ContextParent.Provider value={{ data: 'data in context from context Parent' }}>
            <A data='data in props from Parent' />
            <Age />
          </ContextParent.Provider>

        )
      }
      function A(props) {
        return (
          <ContextA.Provider value={'context A'}>
            <div style={style}>
              A
              <B data={props.data}/>
            </div>
          </ContextA.Provider>
        )
      }
      function B(props) {
        return (
          <ContextB.Provider value={'context B'}>
            <div style={style}>
              B
              <C data={props.data}/>
            </div>
          </ContextB.Provider>

        )
      }
      function C(props) {
        return (
          <div style={style}>
            C
            <D data={props.data}/>
          </div>
        )
      }
      function D(props) {
        const contextParent = useContext(ContextParent)
        const contextA = useContext(ContextA)
        const contextB = useContext(ContextB)
        return (
          <div style={style}>
            D
            <div>{props.data}</div>
            <div>{contextParent.data} & {contextA} & {contextB}</div>
          </div>
        )
      }
      function Age() {
        const contextParent = useContext(ContextParent)
        return (
          <div style={style}>
            I am data from {contextParent.data}
          </div>
        )
      }
      `}</Code>

      <Parent1 />

      <H>Pass state in <Code>useContext()</Code></H>

      <p>Same idea as above, but pass a state variable into <Code html >{'<Context.Provider value={state}>'}</Code> </p>

      <Code block>{`
        import { createContext, useContext, useState, useReducer } from "react"
        import shortid from 'shortid'

        const Context2 = createContext('');

        function Parent2() {
          const [string, setString] = useState(shortid())

          const contextValue={
            string,
            setString,
            style: { border: '2px solid grey',  padding: '10px',  margin: '10px' }
          }

          return (
            <Context2.Provider value={contextValue}>
              <div style={contextValue.style}>
                <div>Parent</div>
                <div>String from context: <b>{contextValue.string}</b></div>
                <button onClick={() => contextValue.setString(shortid()) }>Change string</button>
                <Child2 name='Child 1'/>
                <Child2 name='Child 2'/>
              </div>
            </Context2.Provider>
          )
        }

        function Child2(props) {
          const contextValue = useContext(Context2);
          return (
            <div style={contextValue.style}>
              <div>{props.data}</div>
              <div>String from context: <b>{contextValue.string}</b></div>
              <button onClick={() => contextValue.setString(shortid()) }>Change string</button>
            </div>
          )
        }
      `}</Code>

      <Parent2 />

      <H><Code>useContext()</Code> with <Code>useReducer()</Code></H>

      <p>Same as above, but instead of <Code js >useState()</Code> hook <Code js >useReducer()</Code> is used.</p>

      <Code block>{`
        import { createContext, useContext, useState, useReducer } from "react"
        import shortid from 'shortid'

        const Context3 = createContext('');

        function reducer(state, action) {
          if (action === 'randomize string') return shortid()
          return state
        }

        function Parent3() {
          const [string, dispatch] = useReducer(reducer, shortid())

          const contextValue={
            string,
            dispatch,
            style: { border: '2px solid grey',  padding: '10px',  margin: '10px' }
          }

          return (
            <Context3.Provider value={contextValue}>
              <div style={contextValue.style}>
                <div>Parent</div>
                <div>String from context: <b>{contextValue.string}</b></div>
                <button onClick={() => contextValue.dispatch('randomize string') }>Change string</button>
                <Child3 name='Child 1'/>
                <Child3 name='Child 2'/>
              </div>
            </Context3.Provider>
          )
        }

        function Child3(props) {
          const contextValue = useContext(Context3);
          return (
            <div style={contextValue.style}>
              <div>{props.data}</div>
              <div>String from context: <b>{contextValue.string}</b></div>
              <button onClick={() => contextValue.dispatch('randomize string') }>Change string</button>
            </div>
          )
        }
      `}</Code>

      <Parent3 />

      <H>context in typescript</H>

      <Code block jsx>{`
        // RowProvider.tsx

        import { createContext, useContext, type ReactNode } from 'react'

        type Context = {
          rowIndex: number
          rowId: string
        }

        type Props = Context & {
          children: ReactNode

        }

        const RowContext = createContext<Context | null>(null)

        export const RowProvider = ({
          children,
          rowIndex,
          rowId,
        }: Props): JSX.Element => {
          return (
            <RowContext.Provider
              value={{
                rowIndex,
                rowId,
              }}
            >
              {children}
            </RowContext.Provider>
          )
        }

        export const useRow = (): Context => {
          const context = useContext(RowContext)

          if (!context) {
            throw new Error('useRow must be used within a RowProvider')
          }

          return context
        }
      `}</Code>

      <Code block jsx>{`
        // ParentComponent.tsx

        import { BoqRow, boqRows } from './row/BoqRow'
        import { useItem } from 'client/widgets/items/ItemProvider'
        import { RowProvider } from './RowProvider'

        export const ParentComponent = (): JSX.Element => {
          return (
            {boqRows.map((boqRow, rowIndex) => {
              if (boqRow.type === 'boq row') {
                return (
                  <RowProvider rowIndex={rowIndex} rowId={boqRow.id} key={boqRow.id} >
                    <BoqRow />
                  </RowProvider>
                )
              }
            })}
          )
        }
      `}</Code>

      <Code block jsx>{`
        // ChildComponent.tsx

        import type { ReactNode } from 'react'
        import { useRow } from '../RowProvider'

        type Props = {
          children: ReactNode
        }

        export const ChildComponent = ({ children }: Props): JSX.Element => {
          const { rowId } = useRow()

          return (
            <div
              id={rowId}
            >
              {children}
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
