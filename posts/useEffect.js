import { Code, H, Lnk, useEffect, useState, useRef, jsxToStr } from '/components/post/reExport'

// #region - basics
const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

function Basics() {
  const [state1, setState1] = useState(0)
  const [state2, setState2] = useState(0)

  useEffect(() => {
    console.log('useEffect(func), I RUN EVERY RENDER')
  })

  useEffect(() => {
    console.log('useEffect(func, []), I RUN ONLY ON INIT RENDER')
  }, [])

  useEffect(() => {
    console.log('useEffect(func, [state1]), I RUN WHEN state1 IS CHANGED')
  }, [state1])

  useEffect(() => {
    console.log('useEffect(func, [state1, state2]), I RUN WHEN state1 OR state2 IS CHANGED')
  }, [state1, state2])

  return (
    <div style={style}>
      <div>State1 value: <b>{state1}</b></div>
      <button onClick={() => setState1(state1 + 1)}>Add +1 to state1</button>
      <div>State2 value: <b>{state2}</b></div>
      <button onClick={() => setState2(state2 + 1)}>Add +1 to state2</button>
      <div><i>Check which useEffect is triggers in console</i></div>
    </div>
  )
}

// #endregion

// #region - addEventListener + clean
function EventListenerWithClean() {
  const [toggle, setToggle] = useState(false)
  const toggleChildComponent = () => setToggle(!toggle)

  return (
    <div style={style}>
      <div>Parent component</div>
      <button onClick={toggleChildComponent}>show / hide component </button>
      {toggle && <Child />}
    </div>
  )
}

function Child() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  function logMouseCords(e) {
    setX(e.clientX)
    setY(e.clientY)
    document.title = `x: ${e.clientX} + y: ${e.clientY}`
  }

  useEffect(() => {
    document.addEventListener('mousemove', logMouseCords)
    return () => {
      document.removeEventListener('mousemove', logMouseCords)
      document.title = 'cords are gone'
    }
  }, [])

  return (
    <div style={style}>
      <div>Child component</div>
      <div>xCord: <b>{x}</b></div>
      <div>yCord: <b>{y}</b></div>
    </div>
  )
}
// #endregion

// #region - fetch data
function FetchData() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data.slice(0, 5)))
      .catch(err => console.log(err))
  }, [])

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
// #endregion

// #region - skip init render
function SkipInitRender() {
  const [stateA, setStateA] = useState(false)
  const [stateB, setStateB] = useState(false)
  return (
    <div style={style}>
      <h4>Parent</h4>
      <div> <button onClick={() => setStateA(!stateA)}>Show/hide component A</button> </div>
      <div> <button onClick={() => setStateB(!stateB)}>Show/hide component B without useEffect on initial render</button> </div>
      {stateA && <MyChild name='A' state={stateA} skipInitUseEffect={false}/>}
      {stateB && <MyChild name='B' state={stateB} skipInitUseEffect={true}/>}
    </div>
  )
}

function MyChild(props) {
  const initialRender = useRef(true)

  useEffect(() => {
    if (props.skipInitUseEffect && initialRender.current) {
      initialRender.current = false
      return
    }

    alert('Hello from useEffect')
  }, [props.state])

  return (
    <div style={style}>
      <h4>Child {props.name}</h4>
    </div>
  )
}
// #endregion

const postObj = {
  title: 'useEffect',
  date: '2021.10.15',
  tags: ['react', 'basics', 'hook'],
  desc: 'useEffect hook in React',
  body: (
    <>
      <H>Basics</H>

      <p><Code js >useEffect()</Code> runs after the render or when some value is changed.</p>

      <p>
        <Code js >useEffect(func, [prop || state])</Code> hook may run a function after:
        <ul>
          <li>every component's render, when no 2nd parameter is provided</li>
          <li>initial render, when empty array is provided as a 2nd parameter</li>
          <li>specific variable change, provided in the dependency array at the 2nd parameter</li>
        </ul>
      </p>

      <p><Code js >useEffect()</Code> is placed inside a component and have access to states and variables.</p>

      <Code block>{`
      import { useEffect, useState } from 'react';
      const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

      function Basics() {
        const [state1, setState1] = useState(0);
        const [state2, setState2] = useState(0);

        useEffect(() => {
          console.log('useEffect(func), I RUN EVERY RENDER')
        })
        useEffect(() => {
          console.log('useEffect(func, []), I RUN ONLY ON INIT RENDER')
        }, [])
        useEffect(() => {
          console.log('useEffect(func, [state1]), I RUN WHEN state1 IS CHANGED')
        }, [state1])
        useEffect(() => {
          console.log('useEffect(func, [state1, state2]), I RUN WHEN state1 OR state2 IS CHANGED')
        }, [state1, state2])

        return (
          <div style={style}>
            <div>State1 value: <b>{state1}</b></div>
            <button onClick={() => setState1(state1 + 1)}>Add +1 to state1</button>
            <div>State2 value: <b>{state2}</b></div>
            <button onClick={() => setState2(state2 + 1)}>Add +1 to state2</button>
            <div><i>Check which useEffect is triggers in console</i></div>
          </div>
        );
      }
      `}</Code>

      <Basics />

      <H>addEventListener() & cleanup</H>

      <ul>
        <li>We can attach <Code js >addEventListener()</Code> via <Code js >useEffect(func, [])</Code> function on initial component render. </li>
        <li> Let's have a parent component with a toggle button to render the child component with coordinates logging. </li>
        <li>Apart from showing coordinates on screen we will display coordinates also in <Code>document.title</Code></li>
        <li>After hiding the child component we should remove our event listener to avoid coords logging</li>
        <li>To remove event listener we need to <Code>return</Code> a function with such instruction at the end of useEffect callback</li>
      </ul>

      <Code block>{`
      function EventListenerWithClean() {
        const [toggle, setToggle] = useState(false)
        const toggleChildComponent = () => setToggle(!toggle)

        return (
          <div style={style}>
            <div>Parent component</div>
            <button onClick={toggleChildComponent}>show / hide component </button>
            {toggle && <Child />}
          </div>
        )
      }

      function Child() {
        const [x, setX] = useState(0)
        const [y, setY] = useState(0)

        function logMouseCords(e) {
          setX(e.clientX)
          setY(e.clientY)
          document.title = \`x: \${e.clientX} + y: \${e.clientY}\`
        }

        useEffect(() => {
          document.addEventListener('mousemove', logMouseCords)
          return () => {
            document.removeEventListener('mousemove', logMouseCords)
            document.title = 'cords are gone'
          }
        }, [])

        return (
          <div style={style}>
            <div>Child component</div>
            <div>xCord: <b>{x}</b></div>
            <div>yCord: <b>{y}</b></div>
          </div>
        )
      }
      `}</Code>

      <EventListenerWithClean />

      <H>Fetch data</H>

      <p>Fetch data on component load inside <Code js >useEffect()</Code></p>
      <p>Let's fetch data from <Lnk path='https://jsonplaceholder.typicode.com/guide/'>jsonplaceholder</Lnk> and set it into the <i>state</i> after component's render via <Code js >useEffect()</Code>.</p>

      <Code block>{`
      function FetchData() {
        const [posts, setPosts] = useState([])

        useEffect(() => {
          fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => setPosts(data.slice(0, 5)))
            .catch(err => console.log(err))
        }, [])

        return (
          <ul>
            {posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        )
      }
      `}</Code>

      <FetchData />

      <H>Skip initial render</H>

      <p>No matter what we put into <Code js >useEffect(func, [dep])</Code> dependency array, it will trigger function on an initial render.</p>
      <p>To avoid it we may bring a boolean flag, which we negate after first render.</p>

      <Code block>{`
      function SkipInitRender() {
        const [stateA, setStateA] = useState(false)
        const [stateB, setStateB] = useState(false)
        return (
          <div style={style}>
            <h4>Parent</h4>
            <div> <button onClick={() => setStateA(!stateA)}>Show/hide component A</button> </div>
            <div> <button onClick={() => setStateB(!stateB)}>Show/hide component B without useEffect on initial render</button> </div>
            {stateA && <MyChild name='A' state={stateA} skipInitUseEffect={false}/>}
            {stateB && <MyChild name='B' state={stateB} skipInitUseEffect={true}/>}
          </div>
        )
      }

      function MyChild(props) {
        const initialRender = useRef(true)

        useEffect(() => {
          if (props.skipInitUseEffect && initialRender.current) {
            initialRender.current = false
            return
          }

          alert('Hello from useEffect')
        }, [props.state])

        return (
          <div style={style}>
            <h4>Child {props.name}</h4>
          </div>
        )
      }
      `}</Code>

      <SkipInitRender />
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
