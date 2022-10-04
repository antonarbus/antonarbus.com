import { jsxToStr, Code } from '/components/post/reExport'
import { longClick } from '/functions/longClick'

function Component(props) {
  longClick({
    delay: 250,
    cb: (e) => {
      const color = e.target.style.background
      e.target.style.background = color === 'red' ? '' : 'red'
    }
  })

  return (
    <>
      <p>Click and hold mouse for 250 ms to color background in red</p>

      <Code block jsx>{`
      // functions/longClick.js
      export function longClick(args) {
        const { el, delay, cb } = {
          el: document && document.documentElement,
          delay: 500,
          cb: function alertClick() {
            alert('clicked')
          },
          ...args
        }

        let pressTimer

        el.addEventListener('mousedown', (e) => {
          pressTimer = setTimeout(() => {
            cb(e)
          }, delay)
        })

        el.addEventListener('mouseup', () => {
          clearTimeout(pressTimer)
        })
      }
      `}</Code>

      <Code block jsx>{`
      longClick({
        delay: 250,
        cb: (e) => {
          const color = e.target.style.background
          e.target.style.background = color === 'red' ? '' : 'red'
        }
      })
      `}</Code>
    </>
  )
}

const postObj = {
  title: 'long click',
  date: '2022.06.22',
  tags: ['JavaScript', 'function'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'trigger function after long mouse click',
  body: (
    <>
      <Component />
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
