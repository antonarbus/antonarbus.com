import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid'
import { nanoid } from 'nanoid'

const UuidExample = () => (
  <>
    <div>Math.random().toString(): <strong>{Math.random().toString()}</strong></div>
    <div>uuidv1(): <strong>{uuidv1()}</strong></div>
    <div>uuidv4(): <strong>{uuidv4()}</strong></div>
    <div>nanoid(): <strong>{nanoid()}</strong></div>
    <div>nanoid(5): <strong>{nanoid(5)}</strong></div>
    <div>crypto.randomUUID(): <strong>{crypto.randomUUID()}</strong></div>
  </>
)

const postObj = {
  title: 'uuid',
  date: '2021.10.07',
  tags: ['JavaScript'],
  desc: 'Several packages for universally unique identifier (UUID)',
  body: (
    <>
      <H>Example</H>

      <UuidExample />

      <Code block js>{`
      import { v1 as uuidv1, v4 as uuidv4 } from 'uuid'
      import { nanoid } from 'nanoid'

      const UuidExample = () => (
        <>
          <div>uuidv1(): <strong>{uuidv1()}</strong></div>
          <div>uuidv4(): <strong>{uuidv4()}</strong></div>
          <div>nanoid(): <strong>{nanoid()}</strong></div>
          <div>nanoid(5): <strong>{nanoid(5)}</strong></div>
          <div>crypto.randomUUID(): <strong>{crypto.randomUUID()}</strong></div>
        </>
      )
      `}</Code>

      <H>Math.random()</H>

      <ul>
        <li>There is a usual need to generate a unique string as a <b>u</b>niversally <b>u</b>nique <b>id</b>entifier (UUID)</li>
        <li>We may just type some random string from the keyboard <code>Ada78Gfh</code></li>
        <li>Or dynamically generate it via <Code js>Math.random().toString()</Code> </li>
        <li>But a better way to use existing libraries</li>
      </ul>

      <H>nanoid()</H>

      <ul>
        <li><Lnk path={'https://www.npmjs.com/package/nanoid'}>nanoid</Lnk> package</li>
        <li>Install a package with <Code bash>npm i nanoid</Code></li>
      </ul>

      <H>uuid()</H>

      <ul>
        <li><Lnk path={'https://www.npmjs.com/package/uuid'}>uuid</Lnk> package</li>
        <li>Install a package with <Code bash>npm i uuid</Code></li>
      </ul>

      <H>crypto.randomUUID()</H>

      <ul>
        <li>Browsers and node supports a uuid generator now - <Lnk path='https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID'>crypto.randomUUID()</Lnk></li>
        <li><Code>crypto.randomUUID()</Code> and generates similar string <i>"36b8f84d-df4e-4d49-b662-bcde71a8764f"</i></li>
      </ul>
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
