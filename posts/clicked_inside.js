import { Code, useRef, jsxToStr } from '/components/post/reExport'
import { isClickedElInsideThisEl } from '/functions/isClickedElInsideThisEl'
const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

function Component() {
  const ref = useRef()

  const listenerHandler = e => {
    const clickedEl = e.target
    const cBox = ref.current
    const clickedInside = isClickedElInsideThisEl(clickedEl, cBox)
    clickedEl.style.background = clickedInside ? 'lightgreen' : 'lightpink'
    setTimeout(() => { clickedEl.style.background = '' }, 1000)
  }
  const startListening = () => document.addEventListener('click', listenerHandler)
  const stopListening = () => document.removeEventListener('click', listenerHandler)

  return (
    <>
      <button onClick={startListening}>Listen if click inside 'C' element</button><br />
      <button onClick={stopListening}>Stop listening</button>

      <div style={style}>
        A
        <div style={style}>
          B
          <div style={style} ref={ref}>
            C
            <div style={style}>
              D
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const postObj = {
  title: 'clicked inside',
  date: '2021.10.29',
  tags: ['react'],
  imgUrl: 'https://antonarbus.com/imgs/clicked inside.png',
  desc: 'Is clicked within element function in JavaScript',
  body: (
    <>
      <p>Check if click was made inside or outside an element.</p>

      <Component />

      <Code block jsx>{`
      // functions/isClickedElInsideThisEl.js
      export function isClickedElInsideThisEl(clickedEl, thisEl) {
        // clickedEl = e.target // within event handler
        if (!thisEl) return
        return thisEl.contains(clickedEl)
      }
      `}</Code>

      <Code block jsx>{`
      import { useRef } from 'react'
      import { isClickedElInsideThisEl } from '/functions/isClickedElInsideThisEl'
      const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

      function Component() {
        const ref = useRef()

        const listenerHandler = e => {
          const clickedEl = e.target
          const cBox = ref.current
          const clickedInside = isClickedElInsideThisEl(clickedEl, cBox)
          clickedEl.style.background = clickedInside ? 'lightgreen' : 'lightpink'
          setTimeout(() => { clickedEl.style.background = '' }, 1000)
        }
        const startListening = () => document.addEventListener('click', listenerHandler)
        const stopListening = () => document.removeEventListener('click', listenerHandler)

        return (
          <>
            <button onClick={startListening}>Listen if click inside 'C' element</button>
            <button onClick={stopListening}>Stop listening</button>

            <div style={style}>
              A
              <div style={style}>
                B
                <div style={style} ref={ref}>
                  C
                  <div style={style}>
                    D
                  </div>
                </div>
              </div>
            </div>
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
