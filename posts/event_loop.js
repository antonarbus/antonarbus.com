import { Code, H, Hs, Lnk, React, jsxToStr } from '/components/post/reExport'

function Cmpt0() {
  function func() {
    alert(1) // synchronous call
    setTimeout(() => alert(2)) // macrotask sent to the end of the queue
    Promise.resolve().then(res => alert(3)) // microtask
    alert(4) // regular synchronous call
    // 1 --> 4 --> 3 --> 2
  }
  return <button onClick={func}>Click</button>
}

function Cmpt1() {
  const ref = React.useRef()
  let i = 0
  function count() {
    do {
      i++
      ref.current.innerHTML = i
    } while (i % 1e3 !== 0)
    if (i < 1e6) queueMicrotask(count)
  }

  return (
    <div>
      <div ref={ref}>0</div>
      <button onClick={count}>Click</button>
    </div>
  )
}

function Cmpt2() {
  const ref = React.useRef()

  function countToBln() {
    let count = 0; const start = Date.now()
    for (let j = 0; j < 1e9; j++) count++
    ref.current.innerHTML = count
    alert(`Done in ${Date.now() - start} ms`)
  }

  return (
    <div>
      <div ref={ref}>0</div>
      <button onClick={countToBln}>Click</button>
    </div>
  )
}

function Cmpt3() {
  const ref = React.useRef()

  function func() {
    let i = 0; let j = 0; const start = Date.now()

    function countToMln() {
      for (let k = 0; k < 1e6; k++) i++
      ref.current.innerHTML = i
    }

    function countToBln() {
      if (i < 1e9) {
        setTimeout(countToBln) // schedule the new call // 1000 calls
        j++
      }
      if (i === 1e9) {
        alert(`Done in ${Date.now() - start} ms with ${j} timeout() calls`)
        return
      }
      countToMln()
    }

    countToBln()
  }

  return (
    <div>
      <div ref={ref}>0</div>
      <button onClick={func}>Click</button>
    </div>
  )
}

const postObj = {
  title: 'event loop',
  date: '2021.12.31',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/event_loop.jpg',
  desc: 'Event loop in JavaScript',
  body: (
    <>
      <H>Event loop</H>

      <ul>
        <li>best explanation ever -  <Lnk path='https://youtu.be/eiC58R16hb8?si=uv2bOdlrUJJEgP1J&t=652'>https://youtu.be/eiC58R16hb8?si=uv2bOdlrUJJEgP1J&t=652</Lnk></li>
        <li>JS execution flow is based on an endless <i>event loop</i></li>
        <li>JS executes tasks one by one starting from the oldest</li>
        <li>When there are no tasks anymore JS waits for new ones</li>
        <li>Task may come while the engine is busy, then it's queued</li>
        <li>Queue of tasks is called <i>macrotask queue</i></li>
        <li>Rendering happens only after the task is completed, before another macrotask</li>
        <li>If a task takes long, the browser is blocked & raises the "page unresponsive” alert</li>
      </ul>

      <H>Macrotasks</H>

      <ul>
        <li>Scripts we call</li>
        <li>Event handlers</li>
        <li>Scripts are added to the end of the <i>macrotask queue</i> by <Code>{'setTimeout(func)'}</Code> with no delay</li>
      </ul>

      <H>Microtasks</H>

      <ul>
        <li>After every macrotask, tasks from microtask queue are executed</li>
        <li>It's done before running other macrotasks or rendering or event handling</li>
        <li>It guarantees that the environment is the same between microtasks (no mouse coordinate changes, no new network data, etc) </li>
        <li>Microtask is a script called by promise handlers <Code>.then/catch/finally()</Code> or <Code>queueMicrotask(func)</Code> or observers</li>
        <li>Microtasks are used behind of <code>await</code> as well</li>
      </ul>

      <Hs>queueMicrotask()</Hs>

      <p>So if we'd like to execute a function asynchronously (after the current code), but before changes are rendered or new events handled, we can schedule it with <Code>{'queueMicrotask(() => { func() })'}</Code></p>

      <H>Event loop sequence</H>

      <ol>
        <li>M<span style={{ color: 'red', fontWeight: 600 }}>a</span>crotask (script, event handler) <br /></li>
        <li>M<span style={{ color: 'red', fontWeight: 600 }}>i</span>crotask (promise handlers & <Code>queueMicrotask(func)</Code>) <br /></li>
        <li>Render <br /></li>
        <li>M<span style={{ color: 'red', fontWeight: 600 }}>a</span>crotask set by <Code>setTimeout(func)</Code> <br /></li>
        <li>... again & again</li>
      </ol>

      <H>Web workers</H>

      <ul>
        <li>For calculations that shouldn't block the event loop, we can use Web Workers.</li>
        <li>That's a way to run code in another parallel thread</li>
        <li>Web Workers can exchange messages with the main process</li>
        <li>They have their own variables, and their own event loop.</li>
        <li>Web Workers do not have access to DOM</li>
        <li>They are useful, mainly, for calculations</li>
        <li>They can use multiple CPU cores simultaneously</li>
      </ul>

      <H>in NodeJS</H>

      <ul>
        <li><Code>process.nextTick(func)</Code> executes function on the current iteration of the event loop, after the current operation ends, before <Code>setTimeout()</Code> and <Code>setImmediate()</Code></li>
        <li><Code>setImmediate(func)</Code> is the same as <Code>setTimeout(func, 0)</Code> and executes in the next iteration of the event loop, as soon as possible</li>
      </ul>

      <H>Examples</H>

      <Hs>Sequence</Hs>

      <Cmpt0 />

      <Code block jsx> {`
      function Cmpt0() {
        function func() {
          alert(1) // synchronous call
          setTimeout(() => alert(2)) // macrotask sent to the end of the queue
          Promise.resolve().then(res => alert(3)) // microtask
          alert(4) // regular synchronous call
          // 1 --> 4 --> 3 --> 2
        }
        return <button onClick={func}>Click</button>
      }
      const toRender0 = <Cmpt0 />
      `}</Code>

      <Hs>Count to billion without <Code> setTimeout()</Code></Hs>

      <ul>
        <li>Run whole code at one time</li>
        <li>Changes to DOM are painted after running task is completed</li>
        <li>We'll see only the last value instead of progress</li>
        <li>Code freezes the browser</li>
      </ul>

      <Cmpt2 />

      <Code block jsx> {`
      function Cmpt2() {
        const ref = React.useRef()
      
        function countToBln() {
          let count = 0, start = Date.now()
          for (let j = 0; j < 1e9; j++) count++
          ref.current.innerHTML = count
          alert(\`Done in \${Date.now() - start} ms\`)
        }
      
        return (
          <div>
            <div ref={ref}>0</div>
            <button onClick={countToBln}>Click</button>
          </div>
        )
      }
      const toRender2 = <Cmpt2 />
      `}</Code>

      <Hs>Count to billion with<Code>setTimeout()</Code></Hs>

      <ul>
        <li>Split code into parts and queue them: 1 mln + 1 mln + ... up to 1 bln</li>
        <li>Splitting with <Code>setTimeout()</Code> we make multiple macrotasks and changes are painted in-between</li>
        <li>If an onclick event appears while the engine is busy it is queued mixed together with main counting tasks</li>
        <li>Page is responsive</li>
        <li>There's in-browser minimal delay of 4ms for many nested setTimeout calls and the earlier we schedule task via setTimeout, the faster it runs</li>
      </ul>

      <Cmpt3 />

      <Code block jsx> {`
      function Cmpt3() {
        const ref = React.useRef()
      
        function func() {
          let i = 0, j = 0, start = Date.now()
      
          function countToMln() {
            for (let k = 0; k < 1e6; k++) i++
            ref.current.innerHTML = i
          }
      
          function countToBln() {
            if (i < 1e9) {
              setTimeout(countToBln) // schedule the new call // 1000 calls
              j++
            }
            if (i === 1e9) {
              alert(\`Done in \${Date.now() - start} ms with \${j} timeout() calls\`)
              return
            }
            countToMln()
          }
      
          countToBln()
        }
      
        return (
          <div>
            <div ref={ref}>0</div>
            <button onClick={func}>Click</button>
          </div>
        )
      }
      const toRender3 = <Cmpt3 />
      `}</Code>

      <Hs>All microtasks runs before render</Hs>

      <Cmpt1 />

      <p>This code acts as a synchronous, window is frozen</p>

      <Code block jsx>{`
      function Cmpt1() {
        const ref = React.useRef()
        let i = 0
        function count() {
          do {
            i++
            ref.current.innerHTML = i
          } while (i % 1e3 !== 0)
          if (i < 1e6) queueMicrotask(count)
        }
      
        return (
          <div>
            <div ref={ref}>0</div>
            <button onClick={count}>Click</button>
          </div>
        )
      }
      const toRender1 = <Cmpt1 />
      `}</Code>

      <Hs>Let event bubble</Hs>

      <p>
        Schedule an action until the event bubbled up and was handled on all levels.
      </p>

      <Code block jsx>{`
      menu.onclick = function() {
        let customEvent = new CustomEvent("menu-open", { bubbles: true }) // create a custom event with the clicked menu item data
        setTimeout(() => menu.dispatchEvent(customEvent)) // dispatch the custom event asynchronously
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
