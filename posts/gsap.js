import { Code, Lnk, React, useEffect, useState, useRef, jsxToStr, H } from '/components/post/reExport'
import CocaColaSvg from '/pics/cocaCola.svg'
import styled from 'styled-components'
import randomNumFromTo from '/functions/randomNumFromTo'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin' // in next
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin' // in react
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger' // in next
// import { ScrollTrigger } from 'gsap/ScrollTrigger' // in react
import { TextPlugin } from 'gsap/dist/TextPlugin' // in next
// import { TextPlugin } from 'gsap/TextPlugin' // in react
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin' // in next
// import { MotionPathPlugin } from 'gsap/MotionPathPlugin' // in react

const style = { width: '200px', height: '50px', margin: '10px', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }

function BasicExample() {
  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const ref4 = useRef()
  const allEls = useRef([])

  useEffect(() => {
    allEls.current = [ref1.current, ref2.current, ref3.current, ref4.current]
  }, [])

  const animate = () => {
    gsap.set([allEls.current, '#id450, .class564, div span.class498'], {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      backgroundColor: 'transparent',
      borderRadius: '0%',
      border: '1px solid black'
    })
    gsap.to(ref1.current, { duration: 1, x: 300 })
    gsap.to('#id450', { duration: 2, x: 300 })
    gsap.to('.class564', { duration: 3, rotation: 360, scale: 0.5 })
    gsap.to('div span.class498', { duration: 1, opacity: 0.1 })
    gsap.to([ref2.current, ref3.current, ref4.current], {
      duration: 4,
      x: 50,
      y: 20,
      backgroundColor: 'purple',
      borderRadius: '50%',
      border: '5px solid orange'
    })
  }

  return (
    <>
      <div ref={ref1} style={style}>
        ref1
      </div>
      <div id="id450" style={style}>
        #id450
      </div>
      <div className="class564" style={style}>
        .class564
      </div>
      <div className="class564" style={style}>
        .class564
      </div>
      <div style={style}>
        <span className="class498">div span.class498</span>
      </div>
      <div ref={ref2} style={style}>
        ref2
      </div>
      <div ref={ref3} style={style}>
        ref3
      </div>
      <div ref={ref4} style={style}>
        ref4
      </div>

      <button onClick={animate}>Animate</button>
    </>
  )
}
function EaseFunctions() {
  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const ref4 = useRef()
  const allEls = useRef([])

  useEffect(
    () =>
      (allEls.current = [
        ref1.current,
        ref2.current,
        ref3.current,
        ref4.current
      ]),
    []
  )

  const animate = () => {
    gsap.set(allEls.current, { x: 0 })
    gsap.to(ref1.current, { duration: 2, x: 100, ease: 'bounce.in' })
    gsap.to(ref2.current, { duration: 2, x: 100, ease: 'bounce.out' })
    gsap.to(ref3.current, { duration: 2, x: 100, ease: 'bounce.inOut' })
    gsap.to(ref4.current, { duration: 2, x: 100, ease: 'steps(12)' })
  }

  return (
    <>
      <div ref={ref1} style={style}>
        bounce.in
      </div>
      <div ref={ref2} style={style}>
        bounce.out
      </div>
      <div ref={ref3} style={style}>
        bounce.inOut
      </div>
      <div ref={ref4} style={style}>
        steps(12)
      </div>

      <button onClick={animate}>Animate</button>
    </>
  )
}
function InitialProperties() {
  const ref = useRef()
  const animate = () => {
    gsap.set(ref.current, { transformOrigin: '50% 50%', rotation: 0, scale: 2 })
    gsap.to(ref.current, { duration: 3, rotation: 360, scale: 0.1 })
  }
  const animate2 = () => {
    gsap.to(ref.current, { duration: 3, startAt: { scale: 2 }, scale: 0.1 })
  }
  return (
    <>
      {/* eslint-disable-next-line */}
      <img ref={ref} src={CocaColaSvg.src} style={{ width: '100px' }} />
      <div>
        <button onClick={animate}>Animate with gsap.set()</button>
      </div>
      <div>
        <button onClick={animate2}>Animate with startAt property</button>
      </div>
    </>
  )
}
function CustomObjectProperty() {
  const myObject = { count: 0 }
  const [start, setStart] = useState('')
  const [update, setUpdate] = useState('')
  const [complete, setComplete] = useState('')
  const reset = () => {
    setStart('')
    setUpdate('0')
    setComplete('')
    myObject.count = 0
  }
  const animate = () => {
    reset()
    gsap.to(myObject, {
      duration: 5,
      count: 1000,
      onStart: () => setStart('gsap started'),
      onUpdate: () => setUpdate(myObject.count.toString()),
      onComplete: () => setComplete('gsap completed')
    })
  }

  return (
    <>
      <div>Custom object property animation & callback functions</div>
      <div>{start}</div>
      <div>{update}</div>
      <div>{complete}</div>
      <div>
        <button onClick={animate}>Animate</button>
      </div>
    </>
  )
}
function FromTo() {
  const ref = useRef()

  const animateFrom = () => {
    gsap.set(ref.current, { transformOrigin: '50% 50%', scale: 1, opacity: 1 })
    gsap.from(ref.current, { duration: 3, scale: 0.1, opacity: 0.1 })
  }
  const animateTo = () => {
    gsap.set(ref.current, { transformOrigin: '50% 50%', scale: 1, opacity: 1 })
    gsap.to(ref.current, { duration: 3, scale: 0.1, opacity: 0.1 })
  }
  const animateFromTo = () => {
    gsap.fromTo(
      ref.current,
      { duration: 3, scale: 0.5, opacity: 0.5 },
      { duration: 3, scale: 1.5, opacity: 1 }
    )
  }

  return (
    <>
      <img ref={ref} src={CocaColaSvg.src} style={{ width: '100px' }} />{' '}
      {/* eslint-disable-line */}
      <div>
        <button onClick={animateFrom}>AnimateFrom</button>
      </div>
      <div>
        <button onClick={animateTo}>AnimateTo</button>
      </div>
      <div>
        <button onClick={animateFromTo}>AnimateFromTo</button>
      </div>
    </>
  )
}
const Circle = React.forwardRef((props, ref) => {
  const style = {
    display: 'inline-block',
    margin: '10px',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    background: props.clr
  }
  return <div style={style} className="circle945" ref={ref} {...props} />
})
Circle.displayName = 'Circle custom name'
function Stagger() {
  const ref = useRef()
  const circles = useRef()
  useEffect(
    () => (circles.current = ref.current.querySelectorAll('.circle945')),
    []
  )
  const resetAnimation = () =>
    gsap.set(circles.current, { scale: '.2', opacity: '.2', y: '-50' })
  const animate = () =>
    gsap.to(circles.current, { duration: 1, scale: 1, opacity: 1, y: 0 })
  const animateWithStagger = () =>
    gsap.to(circles.current, {
      duration: 1,
      scale: 1,
      opacity: 1,
      y: 0,
      stagger: 0.25
    })
  const animateWithFunc = () =>
    gsap.to(circles.current, {
      duration: 1,
      scale: 1,
      opacity: 1,
      y: () => randomNumFromTo(0, 50)
    })

  return (
    <div ref={ref}>
      <Circle clr="grey" />
      <Circle clr="green" />
      <Circle clr="blue" />
      <Circle clr="purple" />
      <Circle clr="orange" />
      <div>
        <button
          onClick={() => {
            resetAnimation()
            animate()
          }}
        >
          Animate
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            resetAnimation()
            animateWithStagger()
          }}
        >
          Animate with stagger
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            resetAnimation()
            animateWithFunc()
          }}
        >
          Animate with callback func
        </button>
      </div>
    </div>
  )
}
function Random() {
  const ref = useRef()
  const circles = useRef()
  useEffect(
    () => (circles.current = ref.current.querySelectorAll('.circle945')),
    []
  )
  const animate = () =>
    gsap.from(circles.current, {
      duration: 1,
      scale: 0.5,
      opacity: 1,
      y: 'random(-100,100)'
    })

  return (
    <div ref={ref}>
      <Circle clr="grey" />
      <Circle clr="green" />
      <Circle clr="blue" />
      <Circle clr="purple" />
      <Circle clr="orange" />
      <div>
        <button
          onClick={() => {
            animate()
          }}
        >
          Animate
        </button>
      </div>
    </div>
  )
}
function Delay() {
  const ref1 = useRef()
  const ref2 = useRef()
  const animate = () => {
    gsap.set([ref1.current, ref2.current], { x: 0 })
    gsap.to([ref1.current, ref2.current], { duration: 1, x: 50 })
    gsap.to([ref2.current], { duration: 1, x: 100, delay: 1 })
  }
  return (
    <>
      <Circle clr="grey" ref={ref1} />
      <Circle clr="green" ref={ref2} />
      <div>
        <button
          onClick={() => {
            animate()
          }}
        >
          Animate
        </button>
      </div>
    </>
  )
}
function Timeline() {
  const tl = gsap.timeline()
  const ref1 = useRef()
  const ref2 = useRef()
  const animate = () => {
    gsap.set([ref1.current, ref2.current], { x: 0 })
    tl.to([ref1.current, ref2.current], { duration: 1, x: 50 })
    tl.to(ref1.current, { duration: 1, opacity: 0 })
    tl.to(ref2.current, { duration: 1, x: 100 })
  }
  return (
    <>
      <Circle clr="grey" ref={ref1} />
      <Circle clr="green" ref={ref2} />
      <div>
        <button
          onClick={() => {
            animate()
          }}
        >
          Animate
        </button>
      </div>
    </>
  )
}
function PositionParameter() {
  const style = { width: '10px', height: '2px', margin: '10px' }
  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const tl = gsap.timeline()
  const animate = () => {
    gsap.set([ref1.current, ref2.current, ref3.current], { width: '10px' })
    tl.to([ref1.current, ref2.current, ref3.current], {
      duration: 1,
      width: '100px'
    })
    tl.to(ref1.current, { duration: 1, width: '200px' }, 3)
    tl.to(ref2.current, { duration: 1, width: '200px' }, '+=1')
    tl.to(ref3.current, { duration: 1, width: '200px' }, '-=2')
  }
  return (
    <>
      <div ref={ref1} style={{ ...style, background: 'red' }}></div>
      <div ref={ref2} style={{ ...style, background: 'green' }}></div>
      <div ref={ref3} style={{ ...style, background: 'orange' }}></div>
      <div>
        <button
          onClick={() => {
            animate()
          }}
        >
          Animate
        </button>
      </div>
    </>
  )
}
function Label() {
  const style = { width: '10px', height: '2px', margin: '10px' }
  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const tl = gsap.timeline()
  const animate = () => {
    gsap.set([ref1.current, ref2.current, ref3.current], { width: '10px' })
    tl.to([ref1.current, ref2.current, ref3.current], {
      duration: 1,
      width: '100px'
    })
    tl.to(ref1.current, { duration: 1, width: '200px' }, 3)
    tl.to(ref2.current, { duration: 1, width: '200px' }, '+=1')
    tl.addLabel('label', '-=2')
    tl.to(ref3.current, { duration: 1, width: '200px' }, 'label')
  }
  return (
    <>
      <div ref={ref1} style={{ ...style, background: 'red' }}></div>
      <div ref={ref2} style={{ ...style, background: 'green' }}></div>
      <div ref={ref3} style={{ ...style, background: 'orange' }}></div>
      <div>
        <button
          onClick={() => {
            animate()
          }}
        >
          Animate
        </button>
      </div>
    </>
  )
}
function Repeat() {
  const style = {
    width: '10px',
    height: '2px',
    margin: '10px',
    background: 'red'
  }
  const ref = useRef()

  const animateRepeat = () => {
    const tl = gsap.timeline({ repeat: 2, repeatDelay: 0.5 })
    gsap.set(ref.current, { width: '10px', background: 'red' })
    tl.to(ref.current, { duration: 1, width: '100px' })
    tl.to(ref.current, { duration: 1, width: '200px', background: 'orange' })
  }
  const animateRepeatYoyo = () => {
    const tl = gsap.timeline({ repeat: 2, repeatDelay: 0.5, yoyo: true })
    gsap.set(ref.current, { width: '10px', background: 'red' })
    tl.to(ref.current, { duration: 1, width: '100px' })
    tl.to(ref.current, { duration: 1, width: '200px', background: 'orange' })
  }
  const animateInfinitely = () => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 })
    gsap.set(ref.current, { width: '10px', background: 'red' })
    tl.to(ref.current, { duration: 1, width: '100px' })
    tl.to(ref.current, { duration: 1, width: '200px', background: 'orange' })
  }

  return (
    <>
      <div ref={ref} style={style}></div>
      <div>
        <button onClick={animateRepeat}>Animate with repeat</button>
      </div>
      <div>
        <button onClick={animateRepeatYoyo}>Animate with repeat & yoyo</button>
      </div>
      <div>
        <button onClick={animateInfinitely}>Animate infinitely</button>
      </div>
    </>
  )
}
function PlayResumeRestartProgress() {
  const style = {
    width: '10px',
    height: '2px',
    margin: '10px',
    background: 'red'
  }
  const ref = useRef()
  const tl = gsap.timeline({ paused: true })
  useEffect(() => {
    tl.to(ref.current, { duration: 1, width: '100px' })
    tl.to(ref.current, { duration: 1, width: '200px', background: 'orange' }, 1)
  }, [tl])

  return (
    <>
      <div ref={ref} style={style}></div>
      <button onClick={() => tl.play()}>tl.play()</button>
      <button onClick={() => tl.pause()}>tl.pause()</button>
      <button onClick={() => tl.resume()}>tl.resume()</button>
      <button onClick={() => tl.reverse()}>tl.reverse()</button>
      <button onClick={() => tl.restart()}>tl.restart()</button>
      <button onClick={() => tl.timeScale(5)}>tl.timeScale(5)</button>
      <button onClick={() => tl.timeScale(1)}>tl.timeScale(1)</button>
      <button onClick={() => tl.timeScale(0.5)}>tl.timeScale(0.5)</button>
      <button onClick={() => tl.progress(0.25)}>tl.progress(0.25)</button>
      <button onClick={() => tl.kill()}>tl.kill()</button>
    </>
  )
}
function Chaining() {
  const style = {
    width: '10px',
    height: '2px',
    margin: '10px',
    background: 'red'
  }
  const ref = useRef()

  const animate = () => {
    const tl = gsap.timeline()
    tl.fromTo(
      ref.current,
      { width: '10px', background: 'red' },
      { duration: 1, width: '100px' }
    ).to(ref.current, { duration: 1, width: '200px', background: 'orange' })
  }

  return (
    <>
      <div ref={ref} style={style}></div>
      <div>
        <button onClick={animate}>Animate</button>
      </div>
    </>
  )
}
function Defaults() {
  const style = {
    width: '10px',
    height: '2px',
    margin: '10px',
    background: 'red'
  }
  const ref = useRef()

  const animate = () => {
    const tl = gsap.timeline({ defaults: { duration: 1 } })
    tl.fromTo(
      ref.current,
      { width: '10px', background: 'red' },
      { width: '100px' }
    ).to(ref.current, { width: '200px', background: 'orange' })
  }

  return (
    <>
      <div ref={ref} style={style}></div>
      <div>
        <button onClick={animate}>Animate</button>
      </div>
    </>
  )
}
function Callbacks() {
  const ref = useRef()
  const showMessage = (msg1, msg2) => {
    alert(msg1)
    alert(msg2)
  }

  const animate = () => {
    gsap.to(ref.current, {
      duration: 1,
      x: 100,
      opacity: 1,
      onComplete: showMessage,
      onCompleteParams: ['I am A', 'I am B']
    })
  }

  return (
    <>
      {/* eslint-disable-next-line */}
      <img ref={ref} src={CocaColaSvg.src} style={{ width: '100px' }} />
      <div>
        <button onClick={animate}>Animate</button>
      </div>
    </>
  )
}
function GettersSetters() {
  const ref = useRef()
  let tween
  useEffect(function () {
    /* eslint-disable-next-line */
    tween = gsap.to(ref.current, {
      duration: 10,
      x: 200,
      repeat: -1,
      paused: true,
      immediateRender: false,
      delay: 0.5
    })
  }, [])

  return (
    <>
      {/* eslint-disable-next-line */}
      <img ref={ref} src={CocaColaSvg.src} style={{ width: '100px' }} />
      <div>
        <button onClick={() => tween.play()}>tween.play()</button>
      </div>
      <div>getters</div>
      <button onClick={() => alert(tween.time())}>tween.time()</button>
      <button onClick={() => alert(tween.progress())}>tween.progress()</button>
      <button onClick={() => alert(tween.duration())}>tween.duration()</button>
      <button onClick={() => alert(tween.delay())}>tween.delay()</button>
      <button onClick={() => alert(tween.timeScale())}>
        tween.timeScale()
      </button>
      <div>setters</div>
      <button onClick={() => tween.time(parseFloat(prompt('', '5')))}>
        tween.time(arg)
      </button>
      <button onClick={() => tween.progress(parseFloat(prompt('', '0.9')))}>
        tween.progress(arg)
      </button>
      <button onClick={() => tween.duration(parseFloat(prompt('', '1')))}>
        tween.duration(arg)
      </button>
      <button
        onClick={() => tween.delay(parseFloat(prompt('', '1'))).restart(true)}
      >
        tween.delay(arg)
      </button>
      <button onClick={() => tween.timeScale(parseFloat(prompt('', '5')))}>
        tween.timeScale(arg)
      </button>
    </>
  )
}
function GetProperty() {
  const ref = useRef()

  const animate = () => {
    gsap.to(ref.current, {
      duration: 1,
      x: 100,
      opacity: 1,
      onComplete: function () {
        // get first tweened el to the console
        const elem = this.targets()[0]
        alert(`x: ${gsap.getProperty(elem, 'x')}`)
      }
    })
  }

  return (
    <>
      {/* eslint-disable-next-line */}
      <img ref={ref} src={CocaColaSvg.src} style={{ width: '100px' }} />
      <div>
        <button onClick={animate}>Animate</button>
      </div>
    </>
  )
}
function SetValueViaFunction() {
  const ref = useRef()

  const animate = () => {
    gsap.fromTo(
      ref.current.children,
      {
        opacity: 1
      },
      {
        opacity: function (i, el, els) {
          console.log(i, el, els)
          return 1 - 0.1 * i
        },
        stagger: 0.25
      }
    )
  }

  return (
    <>
      <div ref={ref}>
        <span>h</span>
        <span>e</span>
        <span>l</span>
        <span>l</span>
        <span>o</span>
        <span> </span>
        <span>g</span>
        <span>s</span>
        <span>a</span>
        <span>p</span>
      </div>
      <div>
        <button onClick={animate}>Animate</button>
      </div>
    </>
  )
}
function GsapWithReact() {
  const ref = React.useRef()
  const rotate = () => gsap.to(ref.current, { rotation: '+=360' })

  // animation on component load
  React.useEffect(() => {
    rotate()
  }, [])

  return (
    <>
      <div ref={ref} style={{ width: '100px', height: '100px', background: 'LightGrey', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Box
      </div>
      <button onClick={rotate}>Rotate</button>
    </>
  )
}
gsap.registerPlugin(ScrollToPlugin)
const rand = () => randomNumFromTo(0, 255)
const Line = () => <div style={{
  background: `rgb(${rand()} ${rand()} ${rand()} / 30%)`,
  width: '1000px'
}}
>
  line
</div>
const Div = styled.div`
  height: 300px;
  overflow: auto;
`
function ScrollTo() {
  const ref = useRef()
  const scroll400pxDown = () => gsap.to(ref.current, { duration: 2, scrollTo: 400 })
  const scrollToId = () => gsap.to(ref.current, { duration: 2, scrollTo: '#final-line' })
  const scrollToIdWithOffset = () => gsap.to(ref.current, { duration: 2, scrollTo: { y: '#final-line', offsetY: 50 } })
  const scrollWindow = () => gsap.to(window, { duration: 2, scrollTo: 400 })
  const scrollXY = () => gsap.to(ref.current, { duration: 2, scrollTo: { y: 500, x: 500 }, ease: 'power2' })
  const scrollWithAutoKill = () => gsap.to(ref.current, { duration: 4, scrollTo: { y: 400, autoKill: true, onAutoKill: () => alert('autoKill') } })
  const scrollMax = () => gsap.to(ref.current, { duration: 2, scrollTo: { y: 'max' } })
  const scrollMin = () => gsap.to(ref.current, { duration: 2, scrollTo: { y: 'min' } })

  return (
    <div>
      <button onClick={scroll400pxDown}>scroll 400 px down</button>
      <button onClick={scrollToId}>scroll to id</button>
      <button onClick={scrollToIdWithOffset}>scroll to id with offset</button>
      <button onClick={scrollWindow}>scroll window</button>
      <button onClick={scrollXY}>scroll X & Y</button>
      <button onClick={scrollWithAutoKill}>scroll with autokill (drag scrollbar)</button>
      <button onClick={scrollMax}>scroll max</button>
      <button onClick={scrollMin}>scroll min</button>

      <Div ref={ref}>
        {new Array(20).fill('').map((el, i) => <Line key={`start lines ${i}`} />)}
        <div id="final-line" style={{ background: 'red' }}>final line with id</div>
        {new Array(20).fill('').map((el, i) => <Line key={`end lines ${i}`} />)}
      </Div>
    </div>
  )
}
gsap.registerPlugin(ScrollTrigger)
function ScrollTriggerCmpt() {
  const ref = useRef()
  const ref1 = useRef()

  useEffect(() => {
    const container = ref.current
    const box1 = ref1.current
    gsap.to(box1, {
      scrollTrigger: {
        scroller: container,
        trigger: box1,
        start: 'center 20%', // 20% of scroller hits center of box
        end: '+=400', // 400px from the start
        markers: true,
        horizontal: false,
        scrub: 1, // links animation directly to scrollbar progress with 1s delay
        pin: box1, // stick box to starting position while the rest scrolling
        onEnter: () => console.log('onEnter'),
        onEnterBack: () => console.log('onEnterBack'),
        onLeave: () => console.log('onLeave'),
        onLeaveBack: () => console.log('onLeaveBack'),
        onRefresh: () => console.log('onRefresh'),
        onUpdate: () => console.log('onUpdate'),
        onScrubComplete: () => console.log('onScrubComplete'),
        onSnapComplete: () => console.log('onSnapComplete'),
        onToggle: () => console.log('onToggle'),
        once: false

      },
      duration: 5, // not applied here 'coz scrub is enabled
      rotate: 360 * 2,
      x: 300
    })
  }, [])

  return (
    <div style={{ overflow: 'auto', height: '300px' }} ref={ref}>
      Scroll down
      <Box top={100} ref={ref1}>box1</Box>
      <Box top={350}>box2</Box>
    </div>
  )
}
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  top: ${props => props.top}px;
`
gsap.registerPlugin(TextPlugin)
function TextPluginCmpt() {
  const textRef = useRef()
  const cursorRef = useRef()

  // blink cursor
  useEffect(() => {
    gsap.to(cursorRef.current, { opacity: 0, ease: 'power2.inOut', repeat: -1, duration: 0.9 })
  }, [])

  const replaceByCharacters = () => {
    textRef.current.innerText = ''
    gsap.to(textRef.current, {
      duration: 2,
      text: {
        value: 'This is the new text',
        delimiter: ''
      },
      ease: 'none'
    })
  }

  return (
    <>
      <button onClick={replaceByCharacters}>Type text</button> <br />
      <span ref={textRef}></span><span ref={cursorRef} style={{ marginLeft: '1px' }}>|</span>
    </>
  )
}
gsap.registerPlugin(MotionPathPlugin)
const path = [{ x: 30, y: 100 }, { x: 100, y: 150 }, { x: 200, y: 100 }, { x: 300, y: 50 }, { x: 400, y: 100 }]
function MotionPathPluginCmpt() {
  const ref = useRef()

  useEffect(() => {
    gsap.set(ref.current, { x: 30, y: 100, xPercent: -50, yPercent: -50, transformOrigin: '50% 50%' })
  }, [])

  function animate() {
    // gsap.set(ref.current, {x: 30, y: 100})
    gsap.set(ref.current, { x: 30, y: 100, xPercent: -50, yPercent: -50, transformOrigin: '50% 50%' })
    gsap.to(ref.current, {
      motionPath: {
        path,
        // align: path,
        autoRotate: true,
        // alignOrigin: [0.5, 0.5],
        start: 0,
        end: 1,
        curviness: 0.8
      },
      transformOrigin: '50% 50%',
      duration: 5,
      immediateRender: true,
      ease: 'linear'
    })
  }

  return (
    <div style={{ height: '200px', position: 'relative' }}>
      <Div2 ref={ref} />
      <div><button onClick={animate}>Animate</button></div>
      {path.map((o, i) => <Coords key={`cords ${i}`} style={{ top: o.y, left: o.x }} />)}
    </div>
  )
}
function Coords(props) {
  return <Dot style={props.style} />
}
const Dot = styled.div`
  display: inline-block;
  height: 5px;
  width: 5px;
  border: 1px solid grey;
  border-radius: 50%;
  position: absolute;
  background-color: red;
`
const Div2 = styled.div`
  display: inline-block;
  height: 20px;
  width: 40px;
  background-color: #0080005c;
  /* border-radius: 50%; */
  border: 1px solid grey;
  position: absolute;
  
`

const postObj = {
  title: 'gsap',
  date: '2021.11.15',
  tags: ['animation'],
  imgUrl: 'https://antonarbus.com/imgs/gsap.png',
  desc: 'animation JavaScript framework GSAP',
  body: (
    <>
      <H>Installation</H>

      <p>
        Install the <Lnk path="https://www.npmjs.com/package/gsap">library</Lnk> via npm <Code>{'npm i gsap'}</Code>
      </p>

      <H>Guideline</H>

      <p>
        Main aspects of GSAP are taken from the{' '}
        <Lnk path="https://greensock.com/get-started/">guideline</Lnk>.
      </p>

      <p>
        All properties in one{' '}
        <Lnk path="https://greensock.com/cheatsheet/">cheatsheet</Lnk>.
      </p>

      <p>
        <b>Target elements.</b> We can access elements in gsap by reference &
        query selector. We also can have an array of target elements.
      </p>

      <p>
        GSAP converts parameters into inline style parameters and animate
        them.
      </p>

      <H>Basic example</H>

      <Code block jsx>{`
        import React, { useEffect, useRef, useState } from 'react';
        import { Lnk } from './../components/Lnk';
        import { gsap } from "gsap";
        import { Code } from '../components/Code';
        import CocaColaSvg from './svgPics/cocaCola.svg';
        import TelegramSvg from './svgPics/telegram.svg';
        import randomNumFromTo from './../../../helpers/functions/randomNumFromTo'

        const style = {width: '200px', height: '50px', margin: '10px', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center'}

        function BasicExample() {
          const ref1 = useRef()
          const ref2 = useRef()
          const ref3 = useRef()
          const ref4 = useRef()
          const allEls = useRef([]);

          useEffect(() => allEls.current = [
            ref1.current, ref2.current, ref3.current, ref4.current
          ], [])
          
          const animate = () => {
            gsap.set([allEls.current, '#id450, .class564, div span.class498'], { 
              x: 0, y: 0, scale: 1, opacity: 1, backgroundColor: "transparent", 
              borderRadius: '0%', border: "1px solid black"
            })
            gsap.to(ref1.current, { duration: 1, x: 300 });
            gsap.to('#id450', { duration: 2, x: 300 });
            gsap.to('.class564', { duration: 3, rotation: 360, scale: 0.5 });
            gsap.to('div span.class498', { duration: 1, opacity: 0.1 });
            gsap.to([ref2.current, ref3.current, ref4.current], {
              duration: 4, x: 50, y: 20, backgroundColor: 'purple', 
              borderRadius: '50%', border: "5px solid orange"
            });
          };

          return (
            <>
              <div ref={ref1} style={style}>ref1</div>
              <div id="id450" style={style}>#id450</div>
              <div className="class564" style={style}>.class564</div>
              <div className="class564" style={style}>.class564</div>
              <div style={style}><span className="class498">div span.class498</span></div>
              <div ref={ref2} style={style}>ref2</div>
              <div ref={ref3} style={style}>ref3</div>
              <div ref={ref4} style={style}>ref4</div>

              <button onClick={animate}>Animate</button>
            </>
          );
        }
      `}</Code>

      <BasicExample />

      <H>Ease functions</H>

      <p>
        <b>Ease functions</b> can be applied. All sets of ease can be found{' '}
        <Lnk path="https://greensock.com/ease-visualizer/">here</Lnk>.
      </p>

      <Code block jsx>{`
      function EaseFunctions() {
        const ref1 = useRef()
        const ref2 = useRef()
        const ref3 = useRef()
        const ref4 = useRef()
        const allEls = useRef([]);
      
        useEffect(() => allEls.current = [
          ref1.current, ref2.current, ref3.current, ref4.current
        ], [])
      
        const animate = () => {
          gsap.set(allEls.current, { x: 0 })
          gsap.to(ref1.current, { duration: 2, x: 100, ease: 'bounce.in' });
          gsap.to(ref2.current, { duration: 2, x: 100, ease: 'bounce.out' });
          gsap.to(ref3.current, { duration: 2, x: 100, ease: 'bounce.inOut' });
          gsap.to(ref4.current, { duration: 2, x: 100, ease: 'steps(12)' });
        };
      
        return (
          <>
            <div ref={ref1} style={style}>bounce.in</div>
            <div ref={ref2} style={style}>bounce.out</div>
            <div ref={ref3} style={style}>bounce.inOut</div>
            <div ref={ref4} style={style}>steps(12)</div>
      
            <button onClick={animate}>Animate</button>
          </>
        );
      }
      const EaseFunctions = <EaseFunctions />;  
      `}</Code>

      <EaseFunctions />

      <H>Initial properties</H>

      <p>
        <b>
          <Code>{'gsap.set(target, propertiesObj)'}</Code>
        </b>{' '}
        can be used to set initial state{' '}
        <Lnk path="https://greensock.com/docs/v3/GSAP/gsap.set">
          properties
        </Lnk>
        .
      </p>

      <p>
        Also <Code>startAt</Code> property of a tween can set initial
        state.
      </p>

      <Code block jsx>{`
      function InitialProperties() {
        const ref = useRef()
        const animate = () => {
          gsap.set(ref.current, { transformOrigin: '50% 50%', rotation: 0, scale: 2 });
          gsap.to(ref.current, { duration: 3, rotation: 360, scale: 0.1 });
        };
        const animate2 = () => {
          gsap.to(ref.current, { duration: 3, startAt: { scale: 2 }, scale: 0.1 });
        };
        return (
          <>
            <img ref={ref} src={CocaColaSvg.src} style={{width: '100px'}} /> 
            <div><button onClick={animate}>Animate with gsap.set()</button></div>
            <div><button onClick={animate2}>Animate with startAt property</button></div>
          </>
        );
      }
      const InitialProperties = <InitialProperties />;
      `}</Code>

      <InitialProperties />

      <H>Custom object property</H>

      <p>
        <b>Custom object</b> property can be animated with gsap. We may pass
        custom callbacks into gsap properties <Code>onStart</Code>,{' '}
        <Code>onUpdate</Code>, <Code>onComplete</Code>,{' '}
        <Code>onRepeat</Code>, <Code>onReverseComplete</Code>
      </p>

      <Code block jsx>{`
      function CustomObjectProperty() {
        const myObject = { count: 0 }
        const [start, setStart] = useState('')
        const [update, setUpdate] = useState('')
        const [complete, setComplete] = useState('')
        const reset = () => {
          setStart('')
          setUpdate('0')
          setComplete('')
          myObject.count = 0
        }
        const animate = () => {
          reset();
          gsap.to(myObject, {
            duration: 5,
            count: 1000,
            onStart: () => setStart('gsap started'),
            onUpdate: () => setUpdate(myObject.count.toString()),
            onComplete: () => setComplete('gsap completed'),
          });
        };
      
        return (
          <>
            <div>{start}</div>
            <div>{update}</div>
            <div>{complete}</div>
            <div><button onClick={animate}>Animate</button></div>
          </>
        );
      }
      const CustomObjectProperty = <CustomObjectProperty />;   
      `}</Code>

      <CustomObjectProperty />

      <H>From - To</H>

      <p>
        <b>
          <Code>gsap.to()</Code> vs <Code>gsap.from()</Code>{' '}
          vs <Code>gsap.fromTo()</Code>
        </b>
      </p>

      <Code block jsx>{`
      function FromTo() {
        const ref = useRef()
      
        const animateFrom = () => {
          gsap.set(ref.current, { transformOrigin: "50% 50%", scale: 1, opacity: 1 })
          gsap.from(ref.current, { duration: 3, scale: .1, opacity: .1 });
        }
        const animateTo = () => {
          gsap.set(ref.current, { transformOrigin: "50% 50%", scale: 1, opacity: 1 })
          gsap.to(ref.current, { duration: 3, scale: .1, opacity: .1 });
        }
        const animateFromTo = () => {
          gsap.fromTo(
            ref.current, 
            { duration: 3, scale: .5, opacity: .5 },
            { duration: 3, scale: 1.5, opacity: 1 }
          );
        }
      
        return (
          <>
            <img ref={ref} src={CocaColaSvg.src} style={{width: '100px'}} />
            <div><button onClick={animateFrom}>AnimateFrom</button></div>
            <div><button onClick={animateTo}>AnimateTo</button></div>
            <div><button onClick={animateFromTo}>AnimateFromTo</button></div>
          </>
        );
      }
      const FromTo = <FromTo />;    
      `}</Code>

      <FromTo />

      <H>Stagger</H>

      <p>
        <b>
          <Code>stagger</Code>
        </b>{' '}
        property puts a delay between animations.
        <Lnk path="https://greensock.com/docs/v3/Staggers">
          {' '}
          Advanced
        </Lnk>{' '}
        stagger object can be applied.
      </p>

      <p>
        We also can set a property with a callback function instead of a fixed
        value.
      </p>

      <Code block jsx>{`
        const Circle = React.forwardRef((props, ref) => {
          const style = { display: 'inline-block', margin: '10px', width: '30px', height: '30px', borderRadius: '50%', background: props.clr }
          return <div style={style} className="circle945" ref={ref} {...props}/>
        })
        function Stagger() {
          const ref = useRef()
          const circles = useRef()
          useEffect(() => circles.current = ref.current.querySelectorAll('.circle945'), [])
          const resetAnimation = () =>  gsap.set(circles.current, {scale: '.2', opacity: '.2', y: '-50'})
          const animate = () => gsap.to(circles.current, {duration: 1, scale: 1, opacity: 1, y: 0})
          const animateWithStagger = () => gsap.to(circles.current, {duration: 1, scale: 1, opacity: 1, y: 0, stagger: .25})
          const animateWithFunc = () => gsap.to(circles.current, {duration: 1, scale: 1, opacity: 1, y: () => randomNumFromTo(0, 50)})

          return (
            <div ref={ref}>
              <Circle clr="grey"/><Circle clr="green"/><Circle clr="blue"/><Circle clr="purple"/><Circle clr="orange"/>
              <div><button onClick={() => { resetAnimation(); animate(); }} >Animate</button></div>
              <div><button onClick={() => { resetAnimation(); animateWithStagger(); }}>Animate with stagger</button></div>
              <div><button onClick={() => { resetAnimation(); animateWithFunc(); }} >Animate with callback func</button></div>
            </div>
          );
        }
        const Stagger = <Stagger />;     
      `}</Code>

      <Stagger />

      <H>Random</H>

      <p>
        <b>random</b> property exists in string form in GSAP{' '}
        <Code>'random(-200, 200)'</Code>
      </p>

      <Code block jsx>{`
      function Random() {
        const ref = useRef()
        const circles = useRef()
        useEffect(() => circles.current = ref.current.querySelectorAll('.circle945'), [])
        const animate = () => gsap.from(circles.current, {duration: 1, scale: .5, opacity: 1, y: "random(-100,100)"})
      
        return (
          <div ref={ref}>
            <Circle clr="grey"/><Circle clr="green"/><Circle clr="blue"/><Circle clr="purple"/><Circle clr="orange"/>
            <div><button onClick={() => { animate(); }} >Animate</button></div>
          </div>
        );
      }
      const Random = <Random />;     
      `}</Code>

      <Random />

      <H>Delay</H>

      <p>
        GSAP has a <b>delay</b> property to control the start time of a tween.
      </p>

      <Code block jsx>{`
      function Delay() {
        const ref1 = useRef()
        const ref2 = useRef()
        const animate = () => {
          gsap.set([ref1.current, ref2.current], {x: 0})
          gsap.to([ref1.current, ref2.current], {duration: 1, x: 50})
          gsap.to([ref2.current], {duration: 1, x: 100, delay: 1})
        }
        return (
          <>
            <Circle clr="grey" ref={ref1}/><Circle clr="green" ref={ref2}/>
            <div><button onClick={() => { animate(); }} >Animate</button></div>
          </>
        );
      }
      const Delay = <Delay />;     
      `}</Code>

      <Delay />

      <H>Timeline</H>

      <p>
        <b>Timeline.</b> We can put different animations on a single timeline
        and control them in whole. Timeline can be created with{' '}
        <Code>gsap.timeline()</Code>
      </p>

      <p>
        Tweens are added to the end of the timeline, so the second tween
        starts on the end of the first tween. No delays are needed anymore.
      </p>

      <p>
        With a delay we can shift our tweens on the timeline, but better to
        use a third{' '}
        <Lnk path="https://greensock.com/position-parameter/">
          position parameter
        </Lnk>
      </p>

      <Code block jsx>{`
      function Timeline() {
        const tl = gsap.timeline()
        const ref1 = useRef()
        const ref2 = useRef()
        const animate = () => {
          gsap.set([ref1.current, ref2.current], {x: 0})
          tl.to([ref1.current, ref2.current], {duration: 1, x: 50})
          tl.to(ref1.current, {duration: 1, opacity: 0})
          tl.to(ref2.current, {duration: 1, x: 100})
        }
        return (
          <>
            <Circle clr="grey" ref={ref1}/><Circle clr="green" ref={ref2}/>
            <div><button onClick={() => { animate(); }} >Animate</button></div>
          </>
        );
      }
      const Timeline = <Timeline />;     
      `}</Code>

      <Timeline />

      <H>Position parameter</H>

      <p>
        <b>Position parameter</b> can be an absolute or relative value.
      </p>

      <Code block jsx>{`
      function PositionParameter() {
        const style = {width: "10px", height: "2px", margin: "10px"}
        const ref1 = useRef()
        const ref2 = useRef()
        const ref3 = useRef()
        const tl = gsap.timeline()
        const animate = () => {
          gsap.set([ref1.current, ref2.current, ref3.current], {width: "10px"})
          tl.to([ref1.current, ref2.current, ref3.current], {duration: 1, width: "100px"})
          tl.to(ref1.current, {duration: 1, width: "200px"}, 3)
          tl.to(ref2.current, {duration: 1, width: "200px"}, "+=1")
          tl.to(ref3.current, {duration: 1, width: "200px"}, "-=2")
        }
        return (
          <>
            <div ref={ref1} style={{...style, background: "red"}}></div> 
            <div ref={ref2} style={{...style, background: "green"}}></div>
            <div ref={ref3} style={{...style, background: "orange"}}></div>
            <div><button onClick={() => { animate(); }} >Animate</button></div>
          </>
        );
      }
      const PositionParameter = <PositionParameter />;     
      `}</Code>

      <PositionParameter />

      <H>Label</H>

      <p>
        <b>Label.</b> Instead of using a <i>position</i> parameter we can
        refer to a specific tween by creating a <i>label</i> and position our
        tween at a label.
      </p>

      <p>
        To create a label use a{' '}
        <Code>tl.addLabel('name', '+=1')</Code> method.
      </p>

      <Code block jsx>{`
      function Label() {
        const style = {width: "10px", height: "2px", margin: "10px"}
        const ref1 = useRef()
        const ref2 = useRef()
        const ref3 = useRef()
        const tl = gsap.timeline()
        const animate = () => {
          gsap.set([ref1.current, ref2.current, ref3.current], {width: "10px"})
          tl.to([ref1.current, ref2.current, ref3.current], {duration: 1, width: "100px"})
          tl.to(ref1.current, {duration: 1, width: "200px"}, 3)
          tl.to(ref2.current, {duration: 1, width: "200px"}, "+=1")
          tl.addLabel('label', "-=2")
          tl.to(ref3.current, {duration: 1, width: "200px"}, "label")
        }
        return (
          <>
            <div ref={ref1} style={{...style, background: "red"}}></div> 
            <div ref={ref2} style={{...style, background: "green"}}></div>
            <div ref={ref3} style={{...style, background: "orange"}}></div>
            <div><button onClick={() => { animate(); }} >Animate</button></div>
          </>
        );
      }
      const Label = <Label />;     
      `}</Code>

      <Label />

      <H>Repeat</H>

      <p>
        <b>Repeat.</b> Tween or timeline can be repeated with a delay, yoyoed
        or infinite.
      </p>

      <Code block jsx>{`
      function Repeat() {
        const style = {width: "10px", height: "2px", margin: "10px", background: 'red'}
        const ref = useRef()
        
        const animateRepeat = () => {
          const tl = gsap.timeline({repeat: 2, repeatDelay: .5})
          gsap.set(ref.current, {width: "10px",background: 'red'})
          tl.to(ref.current, {duration: 1, width: "100px"})
          tl.to(ref.current, {duration: 1, width: "200px", background: "orange"})
        }
        const animateRepeatYoyo = () => {
          const tl = gsap.timeline({repeat: 2, repeatDelay: .5, yoyo: true})
          gsap.set(ref.current, {width: "10px",background: 'red'})
          tl.to(ref.current, {duration: 1, width: "100px"})
          tl.to(ref.current, {duration: 1, width: "200px", background: "orange"})
        }
        const animateInfinitely = () => {
          const tl = gsap.timeline({repeat: -1, repeatDelay: .5})
          gsap.set(ref.current, {width: "10px",background: 'red'})
          tl.to(ref.current, {duration: 1, width: "100px"})
          tl.to(ref.current, {duration: 1, width: "200px", background: "orange"})
        }
      
        return (
          <>
            <div ref={ref} style={style}></div> 
            <div><button onClick={animateRepeat} >Animate with repeat</button></div>
            <div><button onClick={animateRepeatYoyo} >Animate with repeat & yoyo</button></div>
            <div><button onClick={animateInfinitely} >Animate infinitely</button></div>
          </>
        );
      }
      const Repeat = <Repeat />;     
      `}</Code>

      <Repeat />

      <H>Play, resume, restart, progress</H>

      <p>
        <b>Control.</b> Timeline or tween can be controlled with methods{' '}
        <Code>play()</Code>, <Code>pause()</Code>,{' '}
        <Code>resume()</Code>, <Code>reverse()</Code>,{' '}
        <Code>restart()</Code>, <Code>timeScale()</Code>,{' '}
        <Code>progress()</Code>, <Code>kill()</Code>
      </p>

      <p>
        Note that timeline is initiated in a paused state{' '}
        <Code>{'tl = gsap.timeline({paused: true})'}</Code>
      </p>

      <Code block jsx>{`
      function PlayResumeRestartProgress() {
        const style = {width: "10px", height: "2px", margin: "10px", background: 'red'}
        const ref = useRef()
        const tl = gsap.timeline({paused: true})
        useEffect(() => {
          tl.to(ref.current, {duration: 1, width: "100px"})
          tl.to(ref.current, {duration: 1, width: "200px", background: "orange"}, 1)
        },[tl] )
      
        return (
          <>
            <div ref={ref} style={style}></div> 
            <button onClick={() => tl.play()} >tl.play()</button>
            <button onClick={() => tl.pause()} >tl.pause()</button>
            <button onClick={() => tl.resume()} >tl.resume()</button>
            <button onClick={() => tl.reverse()} >tl.reverse()</button>
            <button onClick={() => tl.restart()} >tl.restart()</button>
            <button onClick={() => tl.timeScale(5)} >tl.timeScale(5)</button>
            <button onClick={() => tl.timeScale(1)} >tl.timeScale(1)</button>
            <button onClick={() => tl.timeScale(0.5)} >tl.timeScale(0.5)</button>
            <button onClick={() => tl.progress(0.25)} >tl.progress(0.25)</button>
            <button onClick={() => tl.kill()} >tl.kill()</button>
          </>
        );
      }
      const PlayResumeRestartProgress = <PlayResumeRestartProgress />;
      `}</Code>

      <PlayResumeRestartProgress />

      <H>Chaining</H>

      <p>
        <b>Chaining.</b> Methods of timeline can be chained.
      </p>

      <Code block jsx>{`
      function Chaining() {
        const style = {width: "10px", height: "2px", margin: "10px", background: 'red'}
        const ref = useRef()
        
        const animate = () => {
          const tl = gsap.timeline()
          gsap.set(ref.current, {width: "10px",background: 'red'})
          tl
            .fromTo(ref.current, {width: "10px",background: 'red'}, {duration: 1, width: "100px"})
            .to(ref.current, {duration: 1, width: "200px", background: "orange"})
        }
      
        return (
          <>
            <div ref={ref} style={style}></div> 
            <div><button onClick={animate} >Animate</button></div>
          </>
        );
      }
      const Chaining = <Chaining />;   
      `}</Code>

      <Chaining />

      <H>Defaults</H>

      <p>
        <b>Defaults.</b> Repetitive properties of tweens in a timeline can be
        centrally assigned to defaults{' '}
        <Code>
          {'tl = gsap.timeline({ defaults: { duration: 1 } })'}
        </Code>
        .
      </p>

      <Code block jsx>{`
      function Defaults() {
        const style = {width: "10px", height: "2px", margin: "10px", background: 'red'}
        const ref = useRef()
        
        const animate = () => {
          const tl = gsap.timeline({ defaults: { duration: 1 } })
          tl
            .fromTo(ref.current, {width: "10px",background: 'red'}, {width: "100px"})
            .to(ref.current, {width: "200px", background: "orange"})
        }
      
        return (
          <>
            <div ref={ref} style={style}></div> 
            <div><button onClick={animate} >Animate</button></div>
          </>
        );
      }
      const Defaults = <Defaults />;
      `}</Code>

      <Defaults />

      <H>Callbacks</H>

      <p>
        <b>Callback parameters.</b> Parameters to a callback function should
        be passed in an array in a special properties: <Code>onStartParams: [params]</Code>, <Code>onCompleteParams: [params]</Code>, <Code>onRepeatParams: [params]</Code>, <Code>onReverseCompleteParams: [params]</Code>, <Code>onUpdateParams: [params]</Code>
      </p>

      <Code block jsx>{`
      function Callbacks() {
        const ref = useRef()
        const showMessage = (msg1, msg2) => {
          alert(msg1)
          alert(msg2)
        }
      
        const animate = () => {
          gsap.to(ref1.current, { 
            duration: 1, 
            x: 100, 
            onComplete: showMessage, 
            onCompleteParams: ["I am A", "I am B"] 
          });
        };
      
        return (
          <>
            <img ref={ref1} src={CocaColaSvg.src} style={{width: '100px'}} /> 
            <div><button onClick={animate}>Animate</button></div>
          </>
        );
      }
      const Callbacks = <Callbacks />;
      `}</Code>

      <Callbacks />

      <H>Getters & setters</H>

      <p>
        <b>Getters & setters.</b> With some methods like{' '}
        <Code>time()</Code>, <Code>progress()</Code>,{' '}
        <Code>duration()</Code>, <Code>delay()</Code>,{' '}
        <Code>timeScale()</Code> we can both get and set values.
      </p>

      <Code block jsx>{`
      function GettersSetters() {
        const ref = useRef()
        let tween
        useEffect(function() {
          tween = gsap.to(
            ref.current, 
            {duration: 10, x: 200, repeat: -1, paused: true, immediateRender: false, delay:.5 }
          );
        }, [])
      
        return (
          <>
            <img ref={ref} src={CocaColaSvg.src} style={{width: '100px'}} /> 
            <div><button onClick={() => tween.play()}>tween.play()</button></div>
            <div>getters</div>
            <button onClick={() => alert(tween.time())}>tween.time()</button>
            <button onClick={() => alert(tween.progress())}>tween.progress()</button>
            <button onClick={() => alert(tween.duration())}>tween.duration()</button>
            <button onClick={() => alert(tween.delay())}>tween.delay()</button>
            <button onClick={() => alert(tween.timeScale())}>tween.timeScale()</button>
            <div>setters</div>
            <button onClick={() => tween.time(parseFloat(prompt('', '5')))}>tween.time(arg)</button>
            <button onClick={() => tween.progress(parseFloat(prompt('', '0.9')))}>tween.progress(arg)</button>
            <button onClick={() => tween.duration(parseFloat(prompt('', '1')))}>tween.duration(arg)</button>
            <button onClick={() => tween.delay(parseFloat(prompt('', '1'))).restart(true)}>tween.delay(arg)</button>
            <button onClick={() => tween.timeScale(parseFloat(prompt('', '5')))}>tween.timeScale(arg)</button>
          </>
        );
      }
      const GettersSetters = <GettersSetters />;
      `}</Code>

      <GettersSetters />

      <H>getProperty</H>

      <p>
        <b>Property value of animated element </b> can be taken within a
        non-arrow callback function accessing{' '}
        <Code>this.targets()</Code>.
      </p>

      <p>
        To get a current property at any point of time we may use{' '}
        <Code>gsap.getProperty(elem, "x")</Code> method.
      </p>

      <Code block jsx>{`
      function GetProperty() {
        const ref = useRef()
      
        const animate = () => {
          gsap.to(ref.current, { 
            duration: 1, 
            x: 100,
            opacity: 1,
            onComplete: function() {
              // get first tweened el to the console
              let elem = this.targets()[0];
              alert(\`x: \${gsap.getProperty(elem, "x")}\`)
            } 
          });
        };
      
        return (
          <>
            <img ref={ref} src={CocaColaSvg.src} style={{width: '100px'}} /> 
            <div><button onClick={animate}>Animate</button></div>
          </>
        );
      }
      const GetProperty = <GetProperty />;
      `}</Code>

      <GetProperty />

      <H>Set value via function</H>

      <p>
        May use a <b>function</b> instead of a number/string for almost any
        property. Func will be called for each target. Returned value by the
        function will be set as the property value.
      </p>

      <p>
        GSAP will pass the following parameters into the function: - index -
        element being affected - An array of all elements affected by the
        tween
      </p>

      <Code block jsx>{`
      function SetValueViaFunction() {
        const ref = useRef()
      
        const animate = () => {
          gsap.fromTo(
            ref.current.children, 
            { 
              opacity: 1,
            },
            { 
              opacity: function(i,el,els) {
                console.log(i, el, els)
                return 1 - 0.1*i
              },
              stagger: .25
            },
          );
        };
      
        return (
          <>
            <div ref={ref}> 
              <span>h</span><span>e</span><span>l</span><span>l</span><span>o</span><span>{' '}</span>
              <span>g</span><span>s</span><span>a</span><span>p</span>
            </div>
            <div><button onClick={animate}>Animate</button></div>
          </>
        );
      }
      const SetValueViaFunction = <SetValueViaFunction />;
      `}</Code>

      <SetValueViaFunction />

      <H>GSAP with React</H>

      <p>
        Use <i>gsap</i> in React via <Code>{'React.useRef()'}</Code> hook to target an element.
      </p>

      <Code block jsx>{`
      import React from 'react';
        import { gsap } from "gsap";

        function Component() {
          const ref = React.useRef()
          const rotate = () => gsap.to(ref.current, { rotation: "+=360" });

          // animation on component load
          React.useEffect(() => {
            rotate();
          }, []);

          return (
          <>
            <div ref={ref} style={{width: '100px', height: '100px', background: 'LightGrey', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              Box
            </div>
            <button onClick={rotate}>Rotate</button>
          </>
            
          );
        }
      `}</Code>

      <GsapWithReact />

      <H>ScrollTo plugin</H>

      <p>
        Scroll on click can be smoothed natively by {' '}
        <Lnk path="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior">CSS</Lnk> property <Code>{'scroll-behavior: smooth'}</Code>.
      </p>

      <p>
        Or by{' '}
        <Lnk path="https://css-tricks.com/snippets/jquery/smooth-scrolling/">JS</Lnk> with{' '}
        <Code js>{"window.scroll({top: 2500, left: 0, behavior: 'smooth'})"}</Code> or{' '}
        <Code js>{"window.scrollBy({top: 100, left: 0, behavior: 'smooth'})"}</Code>{' '}
        or <Code js>{"el.scrollIntoView({ behavior: 'smooth' })"}</Code>
      </p>

      <p>
        But with <Lnk path="https://greensock.com/docs/v3/Plugins/ScrollToPlugin">GSAP ScrollToPlugin</Lnk> we can control the smoothness of scroll.
      </p>

      <Code block jsx>{`
        import React, { useEffect, useRef } from 'react';
        import styled from 'styled-components';
        import { gsap } from 'gsap';
        import randomNumFromTo from './../../../helpers/functions/randomNumFromTo';
        import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin' // in next
        // import { ScrollToPlugin } from 'gsap/ScrollToPlugin' // in react

        gsap.registerPlugin(ScrollToPlugin);

        function ScrollTo() {
          const ref = useRef()
          const scroll400pxDown = () => gsap.to(ref.current, {duration: 2, scrollTo: 400});
          const scrollToId = () => gsap.to(ref.current, {duration: 2, scrollTo: "#final-line"});
          const scrollToIdWithOffset = () => gsap.to(ref.current, {duration: 2, scrollTo: {y: "#final-line", offsetY: 50}});
          const scrollWindow = () => gsap.to(window, {duration: 2, scrollTo: 400});
          const scrollXY = () => gsap.to(ref.current, {duration: 2, scrollTo: {y: 500, x: 500}, ease: "power2"});
          const scrollWithAutoKill = () => gsap.to(ref.current, {duration: 4, scrollTo:{y: 400, autoKill: true, onAutoKill: () => alert("autoKill")}});
          const scrollMax = () => gsap.to(ref.current, {duration: 2, scrollTo: {y: "max"}});
          const scrollMin = () => gsap.to(ref.current, {duration: 2, scrollTo: {y: "min"}});

          return (
            <div>
              <button onClick={scroll400pxDown}>scroll 400 px down</button>
              <button onClick={scrollToId}>scroll to id</button>
              <button onClick={scrollToIdWithOffset}>scroll to id with offset</button>
              <button onClick={scrollWindow}>scroll window</button>
              <button onClick={scrollXY}>scroll X & Y</button>
              <button onClick={scrollWithAutoKill}>scroll with autokill (drag scrollbar)</button>
              <button onClick={scrollMax}>scroll max</button>
              <button onClick={scrollMin}>scroll min</button>

              <Div ref={ref}>
                {new Array(20).fill('').map(() => <Line/>)}
                <div id="final-line" style={{background:\`red\`}}>final line with id</div>
                {new Array(20).fill('').map(() => <Line/>)}
              </Div>
            </div>
          )
        }
        const rand = () => randomNumFromTo(0, 255)
        const Line = () => <div style={{
          background:\`rgb(\${rand()} \${rand()} \${rand()} / 30%)\`, 
          width: "1000px"}}
        >
          line
        </div> 

        const Div = styled.div \`
          height: 300px;
          overflow: auto;
        \`
      `}</Code>

      <ScrollTo />

      <H>ScrollTrigger plugin</H>

      <p>
        <Lnk path="https://greensock.com/docs/v3/Plugins/ScrollTrigger">GSAP ScrollTrigger</Lnk> plugin animates anything on scroll.
      </p>

      <Code block jsx>{`
      import React, { useEffect, useRef } from 'react';
        import { gsap } from 'gsap';
        // import { ScrollTrigger } from 'gsap/ScrollTrigger'; // in react
        import { ScrollTrigger } from 'gsap/dist/ScrollTrigger' // in next
        import styled from 'styled-components';

        gsap.registerPlugin(ScrollTrigger);

        function Cmpt() {
          const ref = useRef()
          const ref1 = useRef()

          useEffect(() => {
            const container = ref.current
            const box1 = ref1.current
            gsap.to(box1, {
              scrollTrigger: {
                scroller: container,
                trigger: box1,
                start: "center 20%", // 20% of scroller hits center of box
                end: "+=400", // 400px from the start
                markers: true,
                horizontal: false,
                scrub: 1, // links animation directly to scrollbar progress with 1s delay
                pin: box1, // stick box to starting position while the rest scrolling 
                onEnter: () => console.log('onEnter'),
                onEnterBack: () => console.log('onEnterBack'),
                onLeave: () => console.log('onLeave'),
                onLeaveBack: () => console.log('onLeaveBack'),
                onRefresh: () => console.log('onRefresh'),
                onUpdate: () => console.log('onUpdate'),
                onScrubComplete: () => console.log('onScrubComplete'),
                onSnapComplete: () => console.log('onSnapComplete'),
                onToggle: () => console.log('onToggle'),
                once: false,

              },
              duration: 5, // not applied here 'coz scrub is enabled
              rotate: 360*2,
              x: 300,
            });
          }, [])

          return (
            <div style={{overflow: "auto", height: "300px"}} ref={ref}>
              Scroll down
              <Box top={100} ref={ref1}>box1</Box>
              <Box top={250}>box2</Box>
            </div>
          )
        }

        const Box = styled.div \`
          position: relative;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          border: 1px solid black;
          top: \${props => props.top}px;
        \`
      `}</Code>

      <ScrollTriggerCmpt />

      <H>TextPlugin</H>

      <p>
        <Lnk path="https://greensock.com/docs/v3/Plugins/TextPlugin">GSAP TextPlugin</Lnk> can put or replaces text characters or words.
      </p>

      <p>
        It is probably the simplest text animation typewriting tool.
      </p>

      <Code block jsx>{`
      import React, { useEffect, useRef } from 'react';
      import { gsap } from 'gsap';
      import { TextPlugin } from 'gsap/dist/TextPlugin' // in next
      // import { TextPlugin } from 'gsap/TextPlugin' // in react
      
      gsap.registerPlugin(TextPlugin);
      
      function Cmpt() {
        const textRef = useRef()
        const cursorRef = useRef()
      
        //blink cursor
        useEffect(() => {
          gsap.to(cursorRef.current, { opacity: 0, ease: 'power2.inOut', repeat: -1, duration: .9 })
        }, [])
      
        const replaceByCharacters = () =>{
          textRef.current.innerText = ""
          gsap.to(textRef.current, {
            duration: 2,
            text: {
              value: 'This is the new text',
              delimiter: '',
            },
            ease: 'none',
          });
        }
      
        return (
          <>
            <button onClick={replaceByCharacters}>Type text</button> <br />
            <span ref={textRef}></span><span ref={cursorRef} style={{marginLeft:"1px"}}>|</span>
          </>
        )
      }
      `}</Code>

      <TextPluginCmpt />

      <H>MotionPathPlugin</H>

      <p>
        With <Lnk path="https://greensock.com/docs/v3/Plugins/MotionPathPlugin">GSAP MotionPathPlugin</Lnk> we can move an element along a curve.
      </p>

      <p>
        There is a great <Lnk path="https://greensock.com/docs/v3/Plugins/MotionPathHelper">MotionPathHelper</Lnk> tool to create a path curve, but unfortunately it is a paid tool.
      </p>
      <p>
        But we can create one on official <Lnk path="https://codepen.io/GreenSock/pen/aYYOdN">gsap codepen</Lnk> where all plugins are accessible.
      </p>

      <p>
        Here is my simplified curve on <Lnk path="https://codepen.io/sherbsherb/pen/LYjoRNp">codepen</Lnk>.
      </p>

      <Code block jsx>{`
      import React, { useEffect, useRef } from 'react';
        import styled from 'styled-components';
        import { gsap } from 'gsap';
        import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

        gsap.registerPlugin(MotionPathPlugin);
        const path = [{x:0, y:100}, {x:100, y: 150}, {x:200, y:100}, {x:300, y:50}, {x:400, y:100}]

        function Cmpt() {
          const ref = useRef()
          
          useEffect(() => {
            gsap.set(ref.current, {x: 30, y: 100, xPercent:-50, yPercent:-50, transformOrigin: "50% 50%"})
          }, [])
          

          function animate() {
            // gsap.set(ref.current, {x: 30, y: 100})
            gsap.set(ref.current, {x: 30, y: 100, xPercent:-50, yPercent:-50, transformOrigin: "50% 50%"})
            gsap.to(ref.current, {
              motionPath: {
                path: path,
                // align: path,
                autoRotate: true,
                // alignOrigin: [0.5, 0.5],
                start: 0, 
                end: 1,
                curviness: 0.8,
              },
              transformOrigin: "50% 50%",
              duration: 5,
              ease: "linear"
            });
          }

          return (
            <div style={{height: "200px", position: "relative"}}>
              <Div ref={ref}/>
              <div><button onClick={animate}>Animate</button></div>
              {path.map(o => <Coords style={{top: o.y, left: o.x}}/>)}
            </div>
          )
        }

        function Coords(props) {
          return <Dot style={props.style} />
        }

        const toRender = <Cmpt />

        const Div = styled.div \`
          display: inline-block;
          height: 20px;
          width: 40px;
          background-color: #0080005c;
          /* border-radius: 50%; */
          border: 1px solid grey;
          position: absolute;
          
        \`
        const Dot = styled.div \`
          display: inline-block;
          height: 5px;
          width: 5px;
          border: 1px solid grey;
          border-radius: 50%;
          position: absolute;
          background-color: red;
        \`
      `}</Code>

      <MotionPathPluginCmpt />

      <H>CSSRulePlugin</H>

      <p>JS can not select pseudo elements, but 'CSSRulePlugin' can.</p>

      <p>With <Lnk path="https://greensock.com/docs/v3/Plugins/CSSRulePlugin">CSSRulePlugin</Lnk> we can animate <i>::after</i> element.</p>

      <p>
        Selector in{' '}
        <Code>{'CSSRulePlugin.getRule(selector)'}</Code>{' '}
        should be exactly the same as in CSS stylesheet.
      </p>

      <p>
        Because of that I use real CSS sheet for styling instead of{' '}
        <i>Styled Components</i> because it applies random class names.
      </p>

      <Code block jsx>{`
      import React from 'react';
        import { gsap } from 'gsap';
        import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
        import randomNumFromTo from '../../../../helpers/functions/randomNumFromTo';
        import './style73.css';

        const rand = () => randomNumFromTo(1, 255);
        gsap.registerPlugin(CSSRulePlugin);

        const rule = CSSRulePlugin.getRule('.style73::after');
        gsap.set(rule, {cssRule:{background: \`rgb(255 0 0)\`}})
        function animate() {
          gsap.to(rule, {
            duration: 1,
            cssRule: { background: \`rgb(\${rand()} \${rand()} \${rand()})\` },
          });
        }
        function Cmpt() {
          return (
            <>
              <div className="style73" id="dfo9">el</div>
              <button onClick={animate}>Randomize pseudo element's color</button>
            </>
          );
        }
        const toRender = <Cmpt />;
      `}</Code>

      <Code block css>{`
      /* style73.css */
        .style73 {
          display: flex;
          justify-content: center; 
          align-items: center;
          width: 100px;
          height: 100px;
          border: 1px solid black;
          position: relative;
        }
        
        .style73::after {
          content:'::after el';
          background-color: red;
          position: absolute;
          top: 0px;
          right: -80px;
          padding: 5px;
          color: white;
        }
      `}</Code>

      <p>
        Note that we use <Code>{'gsap.set()'}</Code> to set initial color.
        No clue why but without it the element blinks on the button first click.
      </p>

      <p>
        On my phone it still blinks, maybe easier to avoid pseudo elements animation and use normal elements.
        And indeed, GSAP creators <Lnk path='https://greensock.com/docs/v3/Plugins/CSSRulePlugin#:~:text=convert%20your%20pseudo%2Delements%20to%20real%20HTML%20elements%20and%20animate%20them%20directly'>suggest to</Lnk> <i><q>convert your pseudo-elements to real HTML elements and animate them</q></i>.
      </p>

      <p>No example here, some problem in Next.</p>
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
