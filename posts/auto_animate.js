import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'
import { useState, useRef, useEffect } from 'react'
import autoAnimate from '@formkit/auto-animate'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const containerStyles = { margin: '10px', padding: '10px', border: '1px solid grey' }

const AutoAnimate = () => {
  const [show, setShow] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    ref.current && autoAnimate(ref.current)
  }, [ref])

  return (
    <div ref={ref} css={containerStyles}>
    <button onClick={() => setShow(!show)}>Click me to open!</button>
    {show && <p>Hello...</p>}
    </div>
  )
}

const UseAutoAnimate = () => {
  const [items, setItems] = useState([0, 1, 2])
  const [parent] = useAutoAnimate()
  return (
    <>
      <ul ref={parent} css={containerStyles}>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={() => setItems([...items, items.length])}>Add number</button>
    </>
  )
}

const postObj = {
  title: 'AutoAnimate',
  date: '2022.11.07',
  tags: ['tools', 'react', 'animation'],
  imgUrl: 'https://antonarbus.com/imgs/react.png',
  desc: 'AutoAnimate',
  body: (
    <>
      <H>AutoAnimate</H>

      <ul>
        <li><Lnk path='https://auto-animate.formkit.com/#installation'>AutoAnimate</Lnk> is a package that adds smooth transitions to your web app</li>
        <li><Code>npm install @formkit/auto-animate</Code> install via npm</li>
        <li>Animations are only triggered when immediate children of the parent element (the one you passed to autoAnimate) are added, removed, or moved.</li>
        <li>The parent element will automatically receive <code>position: relative</code> </li>
      </ul>

      <H>autoAnimate</H>

      <Code block jsx>{`
      import autoAnimate from '@formkit/auto-animate'

      const Dropdown = () => {
        const [show, setShow] = useState(false)
        const ref = useRef(null)

        useEffect(() => {
          ref.current && autoAnimate(ref.current)
        }, [ref])

        return (
          <div ref={ref} css={{ margin: '10px', padding: '10px', border: '1px solid grey' }}>
          <button onClick={() => setShow(!show)}>Click me to open!</button>
          {show && <p>Hello...</p>}
          </div>
        )
      }
      `}</Code>

      <AutoAnimate />

      <H>useAutoAnimate hook</H>

      <Code block jsx>{`
      import { useAutoAnimate } from '@formkit/auto-animate/react'

      const UseAutoAnimate = () => {
        const [items, setItems] = useState([0, 1, 2])
        const [parent] = useAutoAnimate()
        return (
          <>
            <ul ref={parent}>
              {items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button onClick={ () => setItems([...items, items.length])}>Add number</button>
          </>
        )
      }
      `}</Code>

      <UseAutoAnimate />
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
