'use client'


import { useRef, jsxToStr, Code } from '/components/post/reExport'
import caretTo from '../functions/caretTo'

function Caret(props) {
  const inputRef = useRef()

  function setCaretToPos3() {
    caretTo({ el: inputRef.current, toPos: 3 })
  }
  function setCaretToStart() {
    caretTo({ el: inputRef.current, toStart: true })
  }
  function setCaretToEnd() {
    caretTo({ el: inputRef.current, toEnd: true })
  }
  function setCaretTo2CharsFromBack() {
    caretTo({ el: inputRef.current, toPos: -2 })
  }

  return (
    <div>
      <button onClick={setCaretToPos3}>Set caret to pos 3</button> <br />
      <button onClick={setCaretToStart}>Set caret to the start</button> <br />
      <button onClick={setCaretToEnd}>Set caret to the end</button> <br />
      <button onClick={setCaretTo2CharsFromBack}>Set caret to pos 2 from the back</button> <br />
      <input ref={inputRef} defaultValue='some text' />
    </div>
  )
}

const postObj = {
  title: 'caret',
  date: '2022.05.14',
  tags: ['JavaScript', 'function'],
  imgUrl: 'https://antonarbus.com/imgs/caret.png',
  desc: 'Set caret to the end of a string inside input element',
  body: (
    <>
      <Code block>{`
      // functions/caretTo.js
      export default function caretTo(args) {
        const { el, toPos, toStart, toEnd } = { toPos: 0, toStart: false, toEnd: false, ...args }
        el.focus()
        if (toStart) {
          el.setSelectionRange(toPos, toPos)
          return
        }
        if (toEnd) {
          el.setSelectionRange(el.value.length, el.value.length)
          return
        }
        if (toPos < 0) {
          el.setSelectionRange(el.value.length - Math.abs(toPos), el.value.length - Math.abs(toPos))
          return
        }
        el.setSelectionRange(toPos, toPos)
      }

      `}</Code>
      <Caret />

      <p>Add later caret in textarea and contenteditable elements.</p>
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
