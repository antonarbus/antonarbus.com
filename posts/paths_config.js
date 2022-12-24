import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'paths config',
  date: '2022.12.25',
  tags: ['tools', 'vscode'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'paths config',
  body: (
    <>
      <H>Paths config</H>

      <ul>
        <li>Imports can have very nested relative paths</li>
        <li>Like <code>../../../../file.js</code></li>
        <li>We can make a shortcuts to folders and make paths absolute</li>
        <li>It will be easier to move files around the project</li>
      </ul>

      <H>jsconfig.json</H>

      <Code block json>{`
      {
        "compilerOptions": {
          "target": "es6",
          "baseUrl": ".",
          "paths": {
            "@root/*": ["/*"],
            "@src/*": ["src/*"],
            "@components/*": ["src/components/*"],
            "@store/*": ["src/store/*"],
            "@utils/*": ["src/utils/*"],
          }
        }
      }
      `}</Code>

      <H>At js file</H>

      <Code block jsx>{`
      import { theme } from '@src/theme'
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
