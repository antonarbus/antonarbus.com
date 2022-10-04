import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid'
import shortid from 'shortid'

function UuidExample() {
  return (
    <>
      <div>uuidv1(): <strong>{uuidv1()}</strong></div>
      <div>uuidv4(): <strong>{uuidv4()}</strong></div>
      <div>shortid(): <strong>{shortid()}</strong></div>
    </>
  )
}

const postObj = {
  title: 'uuid',
  date: '2021.10.07',
  tags: ['JavaScript'],
  desc: 'Several packages for universally unique identifier (UUID)',
  body: (
    <>
      <H>Math.random</H>

      <ul>
        <li>There is a usual need to generate a unique string as a <b>u</b>niversally <b>u</b>nique <b>id</b>entifier (UUID)</li>
        <li>We may just type some random string from the keyboard <code>Ada78Gfh</code></li>
        <li>Or dynamically generate it via <Code js>Math.random().toString()</Code> </li>
        <li>But a better way to use existing libraries</li>
      </ul>

      <H>shortid</H>

      <ul>
        <li><Lnk path={'https://www.npmjs.com/package/shortid'}>shortid</Lnk> package</li>
        <li>Install a package with <Code bash>npm i shortid</Code></li>
      </ul>

      <H>uuid</H>

      <ul>
        <li><Lnk path={'https://www.npmjs.com/package/uuid'}>uuid</Lnk> package</li>
        <li>Install a package with <Code bash>npm i uuid</Code></li>
      </ul>

      <H>Example</H>

      <Code block js>{`
        import { v1 as uuidv1 } from 'uuid';
        import { v4 as uuidv4 } from 'uuid';
        import shortid from 'shortid';
        
        function UuidExample() {
          return (
            <>
              <div>uuidv1(): <strong>{uuidv1()}</strong></div>
              <div>uuidv4(): <strong>{uuidv4()}</strong></div>
              <div>shortid(): <strong>{shortid()}</strong></div>
            </>
          )
        }
      `}</Code>

      <UuidExample />
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
