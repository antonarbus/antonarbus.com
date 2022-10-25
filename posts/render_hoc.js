import { Code, H, jsxToStr, useRef, useState } from '/components/post/reExport'
import { gsap } from 'gsap'
import { useUpdateEffect } from 'react-use'
import { Collapse } from '@mui/material'

const Render = ({ when, children }) => when ? children : null

const RenderWithGsap = ({ when, children, withAnimation }) => {
  const ref = useRef(null)
  const [shouldRender, setShouldRender] = useState(when)

  function slideIn() {
    gsap.fromTo(
      ref.current,
      { scaleY: 0, height: 0, opacity: 0, transformOrigin: '0 0' },
      { duration: 0.3, scaleY: 1, opacity: 1, height: 'auto', onComplete: () => null }
    )
  }

  function slideOut() {
    gsap.fromTo(
      ref.current,
      { scaleY: 1, opacity: 1, transformOrigin: '0 0' },
      { duration: 0.3, scaleY: 0, opacity: 0, height: 0, onComplete: () => setShouldRender(false) }
    )
  }

  useUpdateEffect(() => {
    if (!withAnimation) setShouldRender(when)
  }, [when])

  useUpdateEffect(() => {
    if (!withAnimation) return
    when ? setShouldRender(true) : slideOut()
  }, [when])

  useUpdateEffect(() => {
    if (!withAnimation) return
    if (!shouldRender) return
    slideIn()
  }, [shouldRender])

  if (!withAnimation) {
    return shouldRender ? children : null
  }

  if (withAnimation) {
    return shouldRender ? <div ref={ref}>{children}</div> : null
  }
}

const RenderWithCollapse = ({ when, children }) => {
  return (
    <Collapse in={when}>
      {children}
    </Collapse>
  )
}

function RenderBasic() {
  const [show, setShow] = useState(true)
  return (
    <div>
      <div>
        <button onClick={() => setShow(!show)}>Show: {show.toString()}</button>{' '}
      </div>
      <Render when={show} >
        <div css={{ fontSize: '2rem' }}>Render basic</div>
      </Render>
    </div>
  )
}

function RenderWithAnimationWithGsap() {
  const [show, setShow] = useState(true)
  return (
    <div>
      <div>
        <button onClick={() => setShow(!show)}>Show: {show.toString()}</button>{' '}
      </div>
      <RenderWithGsap when={show} withAnimation >
        <div css={{ fontSize: '2rem' }}>Render with animation with GSAP</div>
      </RenderWithGsap>
    </div>
  )
}

function RenderWithoutAnimationWithGsap() {
  const [show, setShow] = useState(true)
  return (
    <div>
      <div>
        <button onClick={() => setShow(!show)}>Show: {show.toString()}</button>{' '}
      </div>
      <RenderWithGsap when={show} >
        <div css={{ fontSize: '2rem' }}>Render without animation with GSAP</div>
      </RenderWithGsap>
    </div>
  )
}

function RenderWithAnimationWithCollapse() {
  const [show, setShow] = useState(true)
  return (
    <div>
      <div>
        <button onClick={() => setShow(!show)}>Show: {show.toString()}</button>{' '}
      </div>
      <RenderWithCollapse when={show} >
        <div css={{ fontSize: '2rem' }}>Render with animation with MUI collapse</div>
      </RenderWithCollapse>
    </div>
  )
}

const postObj = {
  title: 'render hoc',
  date: '2022.09.07',
  tags: ['react'],
  imgUrl: 'https://antonarbus.com/imgs/react.png',
  desc: 'react render high order component',
  body: (
    <>
      <H>Render HOC</H>

      <p>Can be used for...</p>

      <ul>
        <li>To avoid multiple conditional statements for conditional component render</li>
        <li>Easier for eyes to catch </li>
      </ul>

      <Code block tsx>{`
      import { ReactElement } from 'react'

      type Props = {
        when: boolean
        children: ReactElement
      }

      /**
      * HOC for conditional rendering, can be used instead of combination of logical statements
      * @param props props
      * @param props.when condition for a component render
      * @param props.children component to render
      */
      export const Render = ({ when, children }: Props) => when ? children : null
      `}</Code>

      <Code block jsx>{`
      function RenderBasic() {
        const [show, setShow] = useState(true)
        return (
          <div>
            <div>
              <button onClick={() => setShow(!show)}>Show: {show.toString()}</button>{' '}
            </div>
            <Render when={show} >
              <div css={{ fontSize: '2rem' }}>Render basic</div>
            </Render>
          </div>
        )
      }
      `}</Code>

      <RenderBasic />

      <H>Render with animation via GSAP</H>

      <p>That is my stupid creation</p>

      <Code block jsx>{`
        const RenderWithGsap = ({ when, children, withAnimation }) => {
        const ref = useRef(null)
        const [shouldRender, setShouldRender] = useState(when)

        function slideIn() {
          gsap.fromTo(
            ref.current,
            { scaleY: 0, height: 0, opacity: 0, transformOrigin: '0 0' },
            { duration: 0.3, scaleY: 1, opacity: 1, height: 'auto', onComplete: () => null }
          )
        }

        function slideOut() {
          gsap.fromTo(
            ref.current,
            { scaleY: 1, opacity: 1, transformOrigin: '0 0' },
            { duration: 0.3, scaleY: 0, opacity: 0, height: 0, onComplete: () => setShouldRender(false) }
          )
        }

        useUpdateEffect(() => {
          if (!withAnimation) setShouldRender(when)
        }, [when])

        useUpdateEffect(() => {
          if (!withAnimation) return
          when ? setShouldRender(true) : slideOut()
        }, [when])

        useUpdateEffect(() => {
          if (!withAnimation) return
          if (!shouldRender) return
          slideIn()
        }, [shouldRender])

        if (!withAnimation) {
          return shouldRender ? children : null
        }

        if (withAnimation) {
          return shouldRender ? <div ref={ref}>{children}</div> : null
        }
      }
      `}</Code>

      <Code block jsx>{`
      function RenderWithAnimationWithGsap() {
      const [show, setShow] = useState(true)
      return (
        <div>
          <div>
            <button onClick={() => setShow(!show)}>Show: {show.toString()}</button>{' '}
          </div>
          <RenderWithGsap when={show} withAnimation >
            <div css={{ fontSize: '2rem' }}>Render with animation via GSAP</div>
          </RenderWithGsap>
        </div>
      )
      `}</Code>

      <RenderWithAnimationWithGsap />

      <H>Render without animation via GSAP</H>

      <Code block jsx>{`
      function RenderWithoutAnimationWithGsap() {
        const [show, setShow] = useState(true)
        return (
          <div>
            <div>
              <button onClick={() => setShow(!show)}>Show: {show.toString()}</button>{' '}
            </div>
            <RenderWithGsap when={show} >
              <div css={{ fontSize: '2rem' }}>Render without animation via GSAP</div>
            </RenderWithGsap>
          </div>
        )
      }
      `}</Code>

      <RenderWithoutAnimationWithGsap />

      <H>Render with MUI Collapse</H>

      <Code block jsx>{`
      const RenderWithCollapse = ({ when, children }) => {
        return (
          <Collapse in={when}>
            {children}
          </Collapse>
        )
      }
      `}</Code>

      <Code block jsx>{`
      function RenderWithAnimationWithCollapse() {
        const [show, setShow] = useState(true)
        return (
          <div>
            <div>
              <button onClick={() => setShow(!show)}>Show: {show.toString()}</button>{' '}
            </div>
            <RenderWithCollapse when={show} >
              <div css={{ fontSize: '2rem' }}>Render with animation via MUI Collapse</div>
            </RenderWithCollapse>
          </div>
        )
      }
      `}</Code>

      <RenderWithAnimationWithCollapse />
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
