import { Code, H, Lnk, React, useRef, jsxToStr } from '/components/post/reExport'

// #region useRef
const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

function Component() {
  const [clicksState, setClicksState] = React.useState(0)
  const addCounter = () => setClicksState(clicksState + 1)

  const clickRef = React.useRef(0)
  const countClicks = () => clickRef.current++

  const divRef = React.useRef(null)
  const changeBorderColor = () => {
    divRef.current.style.borderColor = divRef.current.style.borderColor === 'red' ? 'grey' : 'red'
  }

  return (
    <div style={style} onClick={countClicks} ref={divRef}>
      <div>
        Clicks inside the box: <b>{clickRef.current}</b>
      </div>
      <div>
        Counter: <b>{clicksState}</b>
      </div>
      <button onClick={addCounter}>Add +1 to re-render component</button>
      <br />
      <button onClick={changeBorderColor}>Change border color</button>
      {console.log('render happened')}
    </div>
  )
}
// #endregion

// #region pass ref in props
function PassRefInProps() {
  const myRef = useRef()
  return (
    <>
      <Input myRef={myRef} />
      <button onClick={() => myRef.current.focus()}>Focus</button>
    </>
  )
}

function Input(props) {
  return <input ref={props.myRef} placeholder="Custom input" />
}
// #endregion

// #region pass ref in props
function PassRefViaReactForwardRef() {
  const ref = useRef()
  return (
    <>
      <MyInputWrappedInForwardRef ref={ref} placeholder="I am a placeholder" />
      <button onClick={() => ref.current.focus()}>Focus</button>
    </>
  )
}
function MyInput(props, ref) {
  return <input ref={ref} {...props} />
}
const MyInputWrappedInForwardRef = React.forwardRef(MyInput)
// #endregion

// #region multiple refs
const customRef = {
  current: null
}

export const ComponentWithRef = () => {
  const externalRef = useRef(null)

  return <MultipleRefs externalRef={externalRef} />
}

export const MultipleRefs = ({ externalRef }) => {
  const internalRef = useRef(null)

  return (
    <>
      <div
        ref={(element) => {
          internalRef.current = element
          externalRef.current = element
          customRef.current = element
        }}
        css={{
          background: 'lightgrey'
        }}
      >
        div element
      </div>
      <br />
      <button
        onClick={() => {
          const element = internalRef.current
          const color = element.style.background === 'red' ? 'green' : 'red'
          element.style.background = color
        }}
      >
        change background <br />
        with internal ref
      </button>{' '}
      <button
        onClick={() => {
          const element = externalRef.current
          const color = element.style.background === 'red' ? 'green' : 'red'
          element.style.background = color
        }}
      >
        change background <br />
        with external ref
      </button>{' '}
      <button
        onClick={() => {
          const element = customRef.current
          const color = element.style.background === 'red' ? 'green' : 'red'
          element.style.background = color
        }}
      >
        change background <br />
        with custom ref
      </button>
    </>
  )
}
// #endregion

const postObj = {
  title: 'React.useRef',
  date: '2022.03.28',
  tags: ['react', 'hook'],
  desc: 'useRef hook',
  body: (
    <>
      <p>
        <Code js>React.useRef()</Code>{' '}
        <Lnk
          link={'https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components'}
          text={'hook'}
        />{' '}
        plays two roles
      </p>
      <ol>
        <li>
          {' '}
          Creates mutable variable, that persists over component renders, but does not trigger a
          render if it is changed, like <Code>state</Code>{' '}
        </li>
        <li>
          {' '}
          Keeps reference to a DOM element if it is passed to <Code>ref</Code> attribute of html
          element{' '}
        </li>
      </ol>
      <H>Mutable variable</H>
      <ul>
        <li>
          It is kind of <i>global</i> variable, component based, ones component is unmounted the ref
          is destroyed.
        </li>
        <li>
          In our example we count number of clicks and store it into <Code>clickRef.current</Code>{' '}
          variable
        </li>
        <li>
          The click counter will not trigger a render, but will survive through renders, even if it
          is defined inside the component.
        </li>
      </ul>
      <H>Html reference</H>
      <p>
        We pass <Code>div</Code> element into <Code>divRef</Code> variable via{' '}
        <Code>{'ref={divRef}'}</Code> and can access the element later with{' '}
        <Code>divRef.current</Code>
      </p>
      <p>In our example we change color of html element with button click.</p>
      <Code block>{`
      const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

      function Component() {
        const [clicksState, setClicksState] = React.useState(0)
        const addCounter = () => setClicksState(clicksState + 1)

        const clickRef = React.useRef(0)
        const countClicks = () => clickRef.current++

        const divRef = React.useRef(null)
        const changeBorderColor = () => {
          divRef.current.style.borderColor = divRef.current.style.borderColor === 'red' ? 'grey' : 'red'
        }

        return (
          <div style={style} onClick={countClicks} ref={divRef} >
            <div>Clicks inside the box: <b>{clickRef.current}</b></div>
            <div>Counter: <b>{clicksState}</b></div>
            <button onClick={addCounter}>Add +1 to re-render component</button><br />
            <button onClick={changeBorderColor}>Change border color</button>
            {console.log('render happened')}
          </div>
        )
      }
      `}</Code>
      <Component />
      <H>Pass ref in props</H>
      <ul>
        <li>
          <Code js>useRef()</Code> can be passed in props, like any other variable
        </li>
        <li>
          <Code>ref</Code> attribute can not be used, because this name is reserved by React
        </li>
        <li>
          We use <Code>myRef</Code> attribute
        </li>
      </ul>
      <Code block>{`
      function PassRefInProps() {
        const myRef = useRef()
        return (
          <>
            <Input myRef={myRef} />
            <button onClick={() => myRef.current.focus()}>Focus</button>
          </>
        )
      }

      function Input(props) {
        return <input ref={props.myRef} placeholder='Custom input'/>
      }
      `}</Code>
      <PassRefInProps />
      <H>React.forwardRef()</H>
      <ul>
        <li>
          We still can use <Code>ref</Code> attribute to pass a ref
        </li>
        <li>
          But need to wrap our component into <Code js>React.forwardRef()</Code> high order
          component
        </li>
      </ul>
      <Code block>{`
      function PassRefViaReactForwardRef() {
        const ref = useRef()
        return (
          <>
            <MyInputWrappedInForwardRef ref={ref} placeholder='I am a placeholder'/>
            <button onClick={() => ref.current.focus()}>Focus</button>
          </>
        )
      }
      function MyInput(props, ref) {
        return <input ref={ref} {...props}/>
      }
      const MyInputWrappedInForwardRef = React.forwardRef(MyInput)
      `}</Code>
      <PassRefViaReactForwardRef />
      <H>Multiple refs for html element</H>
      <ul>
        <li>Sometimes we may need to add several refs to an element</li>
        <li>
          For example we add some functionality to an existing code where ref is already in use
        </li>
        <li>We may use a callback variant</li>
      </ul>

      <ComponentWithRef />

      <Code block jsx>{`
        const customRef = {
          current: null
        }

        export const ComponentWithRef = () => {
          const externalRef = useRef(null)

          return <MultipleRefs externalRef={externalRef} />
        }

        export const MultipleRefs = ({ externalRef }) => {
          const internalRef = useRef(null)

          return (
            <>
              <div
                ref={(element) => {
                  internalRef.current = element
                  externalRef.current = element
                  customRef.current = element
                }}
                css={{
                  background: 'lightgrey'
                }}
              >
                div element
              </div>
              <br />
              <button
                onClick={() => {
                  const element = internalRef.current
                  const color = element.style.background === 'red' ? 'green' : 'red'
                  element.style.background = color
                }}
              >
                change background <br />
                with internal ref
              </button>{' '}
              <button
                onClick={() => {
                  const element = externalRef.current
                  const color = element.style.background === 'red' ? 'green' : 'red'
                  element.style.background = color
                }}
              >
                change background <br />
                with external ref
              </button>{' '}
              <button
                onClick={() => {
                  const element = customRef.current
                  const color = element.style.background === 'red' ? 'green' : 'red'
                  element.style.background = color
                }}
              >
                change background <br />
                with custom ref
              </button>
            </>
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
