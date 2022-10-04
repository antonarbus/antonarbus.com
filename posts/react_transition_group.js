import { Code, H, Lnk, useState, useRef, jsxToStr } from '/components/post/reExport'
import { CSSTransition, Transition } from 'react-transition-group'

function TransitionCmpt() {
  const ref = useRef()
  const [inProp, setInProp] = useState(false)
  const transitionStateObj = {
    onEnterTrigger: false,
    onEnterTimeStamp: null,
    onEnterWidth: null,
    onEnteringTrigger: false,
    onEnteringTimeStamp: null,
    onEnteringWidth: null,
    onExitTrigger: false,
    onExitTimeStamp: null,
    onExitWidth: null,
    onExitingTrigger: false,
    onExitingTimeStamp: null,
    onExitingWidth: null,
    onExitedTrigger: false,
    onExitedTimeStamp: null,
    onExitedWidth: null
  }
  const [transitionData, setTransitionData] = useState(transitionStateObj)
  const resetTransitionData = () => setTransitionData(transitionStateObj)
  const initCss = { background: 'yellow', margin: '5px 0px', whiteSpace: 'nowrap', width: '1000px', border: '1px solid grey', height: '20px' }

  const transitionCss = {
    entering: { width: '10px', transition: `all ${100}ms linear` },
    entered: { width: '600px', transition: `all ${200}ms linear` },
    exiting: { width: '200px', transition: `all ${300}ms linear` },
    exited: { width: '100px', transition: `all ${400}ms linear` }
  }

  return (
    <>
      <button
        onClick={() => {
          setInProp(!inProp)
          resetTransitionData()
        }}
      >
        Toggle transition
      </button>
      <Transition
        in={inProp}
        timeout={{ enter: 5000, exit: 2000 }}
        onEnter={() => setTransitionData({ ...transitionData, onEnterTrigger: true, onEnterTimeStamp: Date.now(), onEnterWidth: ref.current.style.width })}
        onEntering={() => setTransitionData({ ...transitionData, onEnteringTrigger: true, onEnteringTimeStamp: Date.now(), onEnteringWidth: ref.current.style.width })}
        onEntered={() => setTransitionData({ ...transitionData, onEnteredTrigger: true, onEnteredTimeStamp: Date.now(), onEnteredWidth: ref.current.style.width })}
        onExit={() => setTransitionData({ ...transitionData, onExitTrigger: true, onExitTimeStamp: Date.now(), onExitWidth: ref.current.style.width })}
        onExiting={() => setTransitionData({ ...transitionData, onExitingTrigger: true, onExitingTimeStamp: Date.now(), onExitingWidth: ref.current.style.width })}
        onExited={() => setTransitionData({ ...transitionData, onExitedTrigger: true, onExitedTimeStamp: Date.now(), onExitedWidth: ref.current.style.width })}
      >
        {state => (
          <div style={{ ...initCss, ...transitionCss[state] }} ref={ref}></div>
        )}
      </Transition>

      <div>
        {transitionData.onEnterTrigger && <div>onEnter: {0}ms</div>}
        {transitionData.onEnteringTrigger && <div>onEntering: {transitionData.onEnteringTimeStamp - transitionData.onEnterTimeStamp}ms</div>}
        {transitionData.onEnteredTrigger && <div>onEntered: {transitionData.onEnteredTimeStamp - transitionData.onEnteringTimeStamp}ms</div>}
        {transitionData.onExitTrigger && <div>onExit: {0}ms</div>}
        {transitionData.onExitingTrigger && <div>onExiting: {transitionData.onExitingTimeStamp - transitionData.onExitTimeStamp}ms</div>}
        {transitionData.onExitedTrigger && <div>onExited: {transitionData.onExitedTimeStamp - transitionData.onExitingTimeStamp}ms</div>}
      </div>
    </>
  )
}

function CSSTransitionCmpt() {
  const [showMessage, setShowMessage] = useState(true)
  const toggle = () => setShowMessage(!showMessage)
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <CSSTransition
        in={showMessage}
        classNames="xxx"
        // timeout={300}
        timeout={{
          appear: 2000,
          enter: 300,
          exit: 1000
        }}
        appear = {true}
        unmountOnExit = {true}
      >
        <p className='animated-element'>Hello</p>
      </CSSTransition>

      <style jsx global>{`
        .xxx-appear {
          background: yellow;
        }
        .xxx-appear-active {
          background: green;
          transition: background 2000ms;
        }
        .xxx-appear-done {
          background: blue;
        }
        .xxx-enter {
          opacity: 0;
          transform: scale(0);
        }
        .xxx-enter-active {
          opacity: 1;
          transform: scale(1);
          transition: all 300ms;
        }
        .xxx-enter-done {
          background: red;
          transition: all 5000ms;
        }
        .xxx-exit {
          opacity: 1;
          transform: scale(1);
        }
        .xxx-exit-active {
          opacity: 0;
          transform: scale(0);
          transition: all 1000ms;
        }
        .animated-element {
          border: 1px grey solid;
          margin: 5px;
          padding: 5px;
        }
      `}</style>
    </div>
  )
}

function SlideSideways() {
  const [state, setState] = useState(true)
  const toggle = () => setState(!state)
  const [radioValueState, setRadioValueState] = useState('forward')
  const onValueChange = e => setRadioValueState(e.target.value)
  return (
    <div className='outer'>
      <form>
          <p>Direction</p>
          <label>
            <input
              type="radio"
              name="name"
              value={'forward'}
              checked={radioValueState === 'forward'}
              onChange={onValueChange}
            />
            Forward
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="name"
              value={'backwards'}
              checked={radioValueState === 'backwards'}
              onChange={onValueChange}
            />
            Backwards
          </label>
          <br />
      </form>
      <button onClick={toggle}>Toggle</button>
        <CSSTransition
          in={state}
          classNames={radioValueState}
          timeout={{
            appear: 500,
            enter: 500,
            exit: 500
          }}
          appear={true}
          unmountOnExit={true}
          mountOnEnter={false}
        >
          <div className={'slide-container ' + radioValueState}>1</div>
        </CSSTransition>

        <CSSTransition
          in={!state}
          classNames={radioValueState}
          timeout={{
            appear: 500,
            enter: 500,
            exit: 500
          }}
          appear={true}
          unmountOnExit={true}
          mountOnEnter={false}
        >
          <div className={'slide-container ' + radioValueState}>2</div>
        </CSSTransition>

      <style jsx>{`
        .outer {
          position: relative;
          width: 100%;
          padding: 10px;
          border: 1px dotted grey;
        }
        .slide-container {
          position: absolute;
          border: 1px grey solid;
          width: 50px;
          height: 50px;
          left: 50%;
          top: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .forward-appear {
          transform: translateX(-150%);
        }
        .forward-appear-active {
          transform: translateX(0%);
          transition: all 0.5s linear;
        }
        .forward-appear-done {
          transform: translateX(0%);
        }
        .forward-enter {
          transform: translateX(-150%);
        }
        .forward-enter-active {
          transform: translateX(0%);
          transition: all 0.5s linear;
        }
        .forward-enter-done {
          transform: translateX(0%);
        }
        .forward-exit {
          transform: translateX(0%);
        }
        .forward-exit-active {
          transform: translateX(150%);
          transition: all 0.5s linear;
        }
        .forward-exit-done {
          transform: translateX(150%);
        }


        .backwards-appear {
          transform: translateX(150%);
        }
        .backwards-appear-active {
          transform: translateX(0%);
          transition: all 0.5s linear;
        }
        .backwards-appear-done {
          transform: translateX(0%);
        }
        .backwards-enter {
          transform: translateX(150%);
        }
        .backwards-enter-active {
          transform: translateX(0%);
          transition: all 0.5s linear;
        }
        .backwards-enter-done {
          transform: translateX(0%);
        }
        .backwards-exit {
          transform: translateX(0%);
        }
        .backwards-exit-active {
          transform: translateX(-150%);
          transition: all 0.5s linear;
        }
        .backwards-exit-done {
          transform: translateX(-150%);
        }
        `}</style>
    </div>
  )
}

const postObj = {
  title: 'react transition group',
  date: '2021.11.01',
  tags: ['react', 'styles'],
  desc: 'React transition group',
  body: (
    <>
      <p>Install <Lnk path="https://reactcommunity.org/react-transition-group/"> library </Lnk> from <Lnk path="https://www.npmjs.com/package/react-transition-group"> npm </Lnk> via terminal <Code bash>npm i react-transition-group</Code></p>

      <H>Transition</H>

      <Code block>{`
      function TransitionCmpt() {
        const ref = useRef()
        const [inProp, setInProp] = useState(false)
        const transitionStateObj = {
          onEnterTrigger: false, onEnterTimeStamp: null, onEnterWidth: null,
          onEnteringTrigger: false, onEnteringTimeStamp: null, onEnteringWidth: null,
          onExitTrigger: false, onExitTimeStamp: null, onExitWidth: null,
          onExitingTrigger: false, onExitingTimeStamp: null, onExitingWidth: null,
          onExitedTrigger: false, onExitedTimeStamp: null, onExitedWidth: null,
        }
        const [transitionData , setTransitionData  ] = useState(transitionStateObj)
        const resetTransitionData = () => setTransitionData(transitionStateObj)
        const initCss = { background: 'yellow', margin: '5px 0px', whiteSpace: 'nowrap', width: '1000px', border: '1px solid grey', height: '20px' }
        
        const transitionCss = {
          entering: { width: '10px', transition: \`all \${100}ms linear\` },
          entered: { width: '600px', transition: \`all \${200}ms linear\` },
          exiting: { width: '200px', transition: \`all \${300}ms linear\` },
          exited: { width: '100px', transition: \`all \${400}ms linear\` },
        }

        return (
          <>
            <button 
              onClick={() => { 
                setInProp(!inProp)
                resetTransitionData() 
              }}
            >
              Toggle transition
            </button>
            <Transition
              in={inProp}
              timeout={{ enter: 5000, exit: 2000 }}
              onEnter={() => setTransitionData({...transitionData, onEnterTrigger:true, onEnterTimeStamp: Date.now(), onEnterWidth: ref.current.style.width})}
              onEntering={() => setTransitionData({...transitionData, onEnteringTrigger:true, onEnteringTimeStamp: Date.now(), onEnteringWidth: ref.current.style.width})}
              onEntered={() => setTransitionData({...transitionData, onEnteredTrigger:true, onEnteredTimeStamp: Date.now(), onEnteredWidth: ref.current.style.width})}
              onExit={() => setTransitionData({...transitionData, onExitTrigger:true, onExitTimeStamp: Date.now(), onExitWidth: ref.current.style.width})}
              onExiting={() => setTransitionData({...transitionData, onExitingTrigger:true, onExitingTimeStamp: Date.now(), onExitingWidth: ref.current.style.width})}
              onExited={() => setTransitionData({...transitionData, onExitedTrigger:true, onExitedTimeStamp: Date.now(), onExitedWidth: ref.current.style.width})}
            >
              {state => (
                <div style={{ ...initCss, ...transitionCss[state] }} ref={ref}></div>
              )}
            </Transition>

            <div>
              {transitionData.onEnterTrigger && <div>onEnter: {0}ms</div>}
              {transitionData.onEnteringTrigger && <div>onEntering: {transitionData.onEnteringTimeStamp - transitionData.onEnterTimeStamp}ms</div>}
              {transitionData.onEnteredTrigger && <div>onEntered: {transitionData.onEnteredTimeStamp - transitionData.onEnteringTimeStamp}ms</div>}
              {transitionData.onExitTrigger && <div>onExit: {0}ms</div>}
              {transitionData.onExitingTrigger && <div>onExiting: {transitionData.onExitingTimeStamp - transitionData.onExitTimeStamp}ms</div>}
              {transitionData.onExitedTrigger && <div>onExited: {transitionData.onExitedTimeStamp - transitionData.onExitingTimeStamp}ms</div>}
            </div>
          </>
        )
      }
      `}</Code>

      <TransitionCmpt />

      <H>CSS Transition</H>

      <p>CSSTransition applies a pair of class names during the appear, enter, and exit states of the transition. We can style them in CSS.</p>

      <p>Classes are applied in following sequence:</p>
      <ul>
        <li><code>*-appear</code>, <code>*-appear-active</code>, <code>*-appear-done</code></li>
        <li><code>*-enter</code>, <code>*-enter-active</code>, <code>*-enter-done</code></li>
        <li><code>*-exit</code>, <code>*-exit-active</code>, <code>*-exit-done</code></li>
      </ul>

      <p>Following props exist:</p>

      <Code block>{`
        <CSSTransition
          in={showMessage}
          timeout={{
            appear: 2000,
            enter: 300,
            exit: 1000,
          }}
          classNames="xxx"
          appear
          enter
          exit
          mountOnEnter
          unmountOnExit
          onEnter={func}
          onEntering={func}
          onEntered={func}
          onExit={func}
          onExiting={func}
          onExited={func}
          addEndListener={(node, done) => {
            node.addEventListener('transitionend', done, false);
          }}
        >
          <p>Hello</p>
        </CSSTransition>
      `}</Code>

      <p>Full code.</p>

      <Code block>{`
      import { CSSTransition } from 'react-transition-group'

      function CSSTransitionCmpt() {
        const [showMessage, setShowMessage] = useState(true)
        const toggle = () => setShowMessage(!showMessage)
        return (
          <div>
            <button onClick={toggle}>Toggle</button>
            <CSSTransition
              in={showMessage}
              classNames="xxx"
              // timeout={300}
              timeout={{
                appear: 2000,
                enter: 300,
                exit: 1000,
              }}
              appear = {true}
              unmountOnExit = {true}
            >
              <p className='animated-element'>Hello</p>
            </CSSTransition>

            <style jsx global>{\`
              .xxx-appear {
                background: yellow;
              }
              .xxx-appear-active {
                background: green;
                transition: background 2000ms;
              }
              .xxx-appear-done {
                background: blue;
              }
              .xxx-enter {
                opacity: 0;
                transform: scale(0);
              }
              .xxx-enter-active {
                opacity: 1;
                transform: scale(1);
                transition: all 300ms;
              }
              .xxx-enter-done {
                background: red;
                transition: all 5000ms;
              }
              .xxx-exit {
                opacity: 1;
                transform: scale(1);
              }
              .xxx-exit-active {
                opacity: 0;
                transform: scale(0);
                transition: all 1000ms;
              }
              .animated-element {
                border: 1px grey solid;
                margin: 5px;
                padding: 5px;
              }
            \`}</style>
          </div>
        )
      }
      `}</Code>

      <CSSTransitionCmpt />

      <p>If <code>appear</code> prop is on then <code>*-appear-done</code> & <code>*-enter-done</code> classes will be both applied.</p>

      <H>Slide sideways</H>

      <p>Following approach is used in folded navigation menu slide animation on top of this page.</p>

      <Code block>{`
      function SlideSideways() {
        const [state, setState] = useState(true)
        const toggle = () => setState(!state)
        const [radioValueState, setRadioValueState] = useState('forward')
        const onValueChange = e => setRadioValueState(e.target.value)
        return (
          <div className='outer'>
            <form>
                <p>Direction</p>
                <label>
                  <input
                    type="radio"
                    name="name"
                    value={'forward'}
                    checked={radioValueState === 'forward'}
                    onChange={onValueChange}
                  />
                  Forward
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name="name"
                    value={'backwards'}
                    checked={radioValueState === 'backwards'}
                    onChange={onValueChange}
                  />
                  Backwards
                </label>
                <br />
            </form>
            <button onClick={toggle}>Toggle</button>
              <CSSTransition
                in={state}
                classNames={radioValueState}
                timeout={{
                  appear: 500,
                  enter: 500,
                  exit: 500,
                }}
                appear={true}
                unmountOnExit={true}
                mountOnEnter={false}
              >
                <div className={'slide-container ' + radioValueState}>1</div>
              </CSSTransition>

              <CSSTransition
                in={!state}
                classNames={radioValueState}
                timeout={{
                  appear: 500,
                  enter: 500,
                  exit: 500,
                }}
                appear={true}
                unmountOnExit={true}
                mountOnEnter={false}
              >
                <div className={'slide-container ' + radioValueState}>2</div>
              </CSSTransition>

            <style jsx>{\`
              .outer {
                position: relative;
                width: 100%;
                border: 1px dotted grey;
              }
              .slide-container {
                position: absolute;
                border: 1px grey solid;
                width: 50px;
                height: 50px;
                left: 50%;
                top: 20%;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .forward-appear {
                transform: translateX(-150%);
              }
              .forward-appear-active {
                transform: translateX(0%);
                transition: all 0.5s linear;
              }
              .forward-appear-done {
                transform: translateX(0%);
              }
              .forward-enter {
                transform: translateX(-150%);
              }
              .forward-enter-active {
                transform: translateX(0%);
                transition: all 0.5s linear;
              }
              .forward-enter-done {
                transform: translateX(0%);
              }
              .forward-exit {
                transform: translateX(0%);
              }
              .forward-exit-active {
                transform: translateX(150%);
                transition: all 0.5s linear;
              }
              .forward-exit-done {
                transform: translateX(150%);
              }

              .backwards-appear {
                transform: translateX(150%);
              }
              .backwards-appear-active {
                transform: translateX(0%);
                transition: all 0.5s linear;
              }
              .backwards-appear-done {
                transform: translateX(0%);
              }
              .backwards-enter {
                transform: translateX(150%);
              }
              .backwards-enter-active {
                transform: translateX(0%);
                transition: all 0.5s linear;
              }
              .backwards-enter-done {
                transform: translateX(0%);
              }
              .backwards-exit {
                transform: translateX(0%);
              }
              .backwards-exit-active {
                transform: translateX(-150%);
                transition: all 0.5s linear;
              }
              .backwards-exit-done {
                transform: translateX(-150%);
              }
              \`}</style>
          </div>
        )
      }
      `}</Code>

      <SlideSideways />

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
