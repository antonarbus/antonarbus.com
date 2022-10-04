import { Code, H, jsxToStr } from '/components/post/reExport'

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

      <H>Example</H>

      <p>This is...</p>

      <Code block jsx>{`
      (httpStatus === 'loading') && <CircularProgress />
      `}</Code>

      <p>Same as</p>

      <Code block jsx>{`
      <Render when={httpStatus === 'loading'}>
        <CircularProgress />
      </Render>
      `}</Code>

      <p>It may look as unnecessary, which is true, but in some cases with complex conditions it may be more structural and maintainable.</p>
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
