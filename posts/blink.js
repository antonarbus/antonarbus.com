import { Code, jsxToStr } from '/components/post/reExport'
import blinkWithCssProp from '/functions/blinkWithCssProp'

function Component() {
  const style = { padding: '10px', margin: '10px' }
  const blinkWithBorders = (e) => blinkWithCssProp({ el: e.target })
  const blinkWithBackground = (e) => blinkWithCssProp({
    el: e.target,
    cssPropToChange: 'background',
    value: 'orange',
    time: 1000
  })

  return (
    <>
      <button style={style} onClick={blinkWithBorders}>Blink borders</button>
      <button style={style} onClick={blinkWithBackground}>Blink background</button>
    </>
  )
}

const postObj = {
  title: 'blink',
  date: '2022.02.17',
  tags: ['JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/blink.jpg',
  desc: 'Blink with CSS property in JavaScript',
  body: (
    <>
      <Component />

      <Code block jsx>{`
      // blinkWithCssProp.js
      export default function blinkWithCssProp(args) {
        const { el, cssPropToChange, value, time } = {
          el: null, cssPropToChange: 'borderColor', value: 'red', time: 500, ...args
        }
        if (!el) return
        if (el.hasAttribute('blinking')) return
        el.setAttribute('blinking', '')
        const initValue = el.style[cssPropToChange]
        el.style[cssPropToChange] = value
        setTimeout(() => {
          el.style[cssPropToChange] = initValue
          el.removeAttribute('blinking')
        }, time)
      }
      `}</Code>

      <Code block jsx>{`
      import blinkWithCssProp from '../../../../helpers/functions/blinkWithCssProp'
      const style = { padding: '10px', margin: '10px' }

      function Component() {
        const blinkWithBorders = (e) => blinkWithCssProp({ el: e.target })
        const blinkWithBackground = (e) => blinkWithCssProp({
          el: e.target,
          cssPropToChange: 'background',
          value: 'orange',
          time: 1000
        })

        return (
          <>
            <button style={style} onClick={blinkWithBorders}>Blink borders</button>
            <button style={style} onClick={blinkWithBackground}>Blink background</button>
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
