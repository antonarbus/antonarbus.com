import { Code, H, LazyImg, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'babel',
  date: '2021.12.08',
  tags: ['tools', 'JavaScript'],
  desc: 'Babel tool ',
  body: (
    <>
      <p><Lnk path="https://babeljs.io/">Babel</Lnk> is a code compiler, which can convert:</p>

      <ol>
        <li>new JavaScript into old versions</li>
        <li>TypeScript in JavaScript</li>
        <li>JSX into JavaScript</li>
        <li>minify file</li>
      </ol>

      <H>Installation</H>

      <p><Lnk path="https://babeljs.io/setup#installation">Install</Lnk> Babel via <Code bash>npm install --save-dev @babel/core @babel/cli</Code></p>

      <p>Two dependencies are added into <Code>package.json</Code></p>

      <Code block json>{`
      {
      "devDependencies": {
        "@babel/cli": "^7.0.0",
        "@babel/core": "^7.0.0"
      }
      `}</Code>

      <H>Output</H>

      <p>Add Babel build script into <Code>package.json</Code></p>

      <Code block json>{`
      "scripts": {
        "babel": "babel src/components/PostsFeed/posts/babel/unbabeled -d src/components/PostsFeed/posts/babel/babeled"
      },
      `}</Code>

      <p>Babel will take files from <code>unbabeled</code> folder & put compiled ones into <code>babeled</code> folder.</p>

      <H>Configuration</H>

      <p>Create <Lnk path="https://babeljs.io/docs/en/config-files#file-relative-configuration"> local configuration </Lnk> file <Code>.babelrc.json</Code> or <Lnk path="https://babeljs.io/docs/en/config-files#project-wide-configuration"> root configuration </Lnk> <Code>babel.config.json</Code></p>

      <p>Add <Lnk path="https://babeljs.io/docs/en/plugins-list">plugins</Lnk> / <Lnk path="https://babeljs.io/docs/en/presets">presets</Lnk> into configuration file.</p>

      <Code block json>{`
      // .babelrc.json
      {
        "presets": ["@babel/preset-env", "minify"],
        "plugins": [
          [ 
            "@babel/plugin-transform-template-literals", { "loose": true }
          ]
        ]
      }
      `}</Code>

      <p>For minification install additional preset with <Code bash>npm install babel-preset-minify --save-dev</Code></p>

      <p>Execute <Code bash>npm run babel</Code> & modern JS is converted into ES5 + minified.</p>

      <H>Unbabeled vs Babeled file</H>

      <LazyImg src="/imgs/babel/babeledFile.png" />
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
