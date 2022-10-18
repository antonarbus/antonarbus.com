import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'run react build',
  date: '2022.10.19',
  tags: ['react'],
  imgUrl: 'https://antonarbus.com/imgs/react.png',
  desc: 'Run production react build locally',
  body: (
    <>
      <H>Install <i>serve</i></H>

      <ul>
        <li><Code>npm install -g serve</Code> install the package</li>
      </ul>

      <H>Run production react build locally</H>

      <ul>
        <li><Code>npm run build</Code> create a production build of your React app</li>
        <li><Code>serve build</Code> tell <i>serve</i> to serve <code>build</code> folder</li>
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
