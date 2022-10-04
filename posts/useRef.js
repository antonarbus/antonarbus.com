import { Code, H, Lnk, React, useRef, jsxToStr } from '/components/post/reExport'

// #region useRef
const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

function Component() {
  const [clicksState, setClicksState] = React.useState(0)
  const addCounter = () => setClicksState(clicksState + 1)

  const clickRef = React.useRef(0)
  const countClicks = () => clickRef.current++

  const domRef = React.useRef(null)
  const changeBorderColor = () => {
    domRef.current.style.borderColor = domRef.current.style.borderColor === 'red' ? 'grey' : 'red'
  }

  return (
    <div style={style} onClick={countClicks} ref={domRef} >
      <div>Clicks inside the box: <b>{clickRef.current}</b></div>
      <div>Counter: <b>{clicksState}</b></div>
      <button onClick={addCounter}>Add +1 to re-render component</button><br />
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
      <Input myRef={myRef}/>
      <button onClick={() => myRef.current.focus()}>Focus</button>
    </>
  )
}

function Input(props) {
  return <input ref={props.myRef} placeholder='Custom input'/>
}
// #endregion

// #region pass ref in props
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
// #endregion

const postObj = {
  title: 'useRef',
  date: '2022.03.28',
  tags: ['react', 'hook'],
  desc: 'useRef hook',
  body: (
    <>
      <p><Code js >React.useRef()</Code> <Lnk link={'https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components'} text={'hook'} /> plays two roles</p>

      <ol>
        <li> Creates mutable variable, that persists over component renders, but does not trigger a render if it is changed, like <Code>state</Code> </li>
        <li> Keeps reference to a DOM element if it is passed to <Code>ref</Code> attribute of html element </li>
      </ol>

      <H>Mutable variable</H>

      <p>It is kind of <i>global</i> variable.</p>
      <p>In our example we count number of clicks and stores it into <Code>clickRef.current</Code> variable</p>
      <p>The click counter will not trigger a render, but will survive through renders, even if it is defined inside the component.</p>
      <p>Clicks variable is rendered not with every click, but only when the component renders when we change the state.</p>

      <H>Html reference</H>

      <p>We pass <Code>div</Code> element into <Code>domRef</Code> variable via <Code>{'ref={domRef}'}</Code> and can access the element later with{' '} <Code>domRef.current</Code></p>
      <p>In our example we change color of html element with button click.</p>

      <Code block>{`
      const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

      function Component() {
        const [clicksState, setClicksState] = React.useState(0)
        const addCounter = () => setClicksState(clicksState + 1)

        const clickRef = React.useRef(0)
        const countClicks = () => clickRef.current++

        const domRef = React.useRef(null)
        const changeBorderColor = () => {
          domRef.current.style.borderColor = domRef.current.style.borderColor === 'red' ? 'grey' : 'red'
        }

        return (
          <div style={style} onClick={countClicks} ref={domRef} >
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
        <li><Code js >useRef()</Code> can be passed in props, like any other variable</li>
        <li><Code>ref</Code> attribute can not be used, because this name is reserved by React</li>
        <li>We use <Code>myRef</Code> attribute</li>
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
        <li>We still can use <Code>ref</Code> attribute to pass a ref</li>
        <li>But need to wrap our component into <Code js >React.forwardRef()</Code> high order component</li>
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
