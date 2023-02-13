import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'npm',
  date: '2022.04.20',
  tags: ['tools'],
  desc: 'npm commands',
  body: (
    <>
      <H>NPM commands</H>

      <p>All commands <Lnk path='https://docs.npmjs.com/cli/v8/commands'>list</Lnk>.</p>

      <ul>
        <li><Code bash>npm view package_name</Code> show package details</li>
        <li><Code bash>npm repo package_name</Code> open package github</li>
        <li><Code bash>npm docs package_name</Code> open readme at package github</li>
        <li><Code bash>npm install</Code> sync with <i>package.json</i></li>
        <li><Code bash>npm install package_name</Code> install</li>
        <li><Code bash>npm i</Code> same</li>
        <li><Code bash>npm ci</Code> install exact versions, not produces package.json, no global packages</li>
        <li><Code bash>npm i -E</Code> install exact versions</li>
        <li><Code bash>npm i -D</Code> install for development</li>
        <li><Code bash>npm uninstall package_name</Code> remove package</li>
        <li><Code bash>npm unlink package_name</Code> same</li>
        <li><Code bash>npm un package_name</Code> same</li>
        <li><Code bash>npm remove package_name</Code> same</li>
        <li><Code bash>npm rm package_name</Code> same</li>
        <li><Code bash>npm r package_name</Code> same</li>
        <li><Code bash>npm t</Code> = <Code bash>npm test</Code> test</li>
        <li><Code bash>npm it</Code> install and run test</li>
        <li><Code bash>npm init -y</Code> = <Code bash>npm init --yes</Code> initialize a project quickly</li>
        <li><Code bash>npm run script_name</Code> run a script</li>
        <li><Code bash>npm -v</Code> npm version</li>
      </ul>

      <H>depcheck</H>

      <ul>
        <li><Code bash>npx depcheck —oneline</Code> check for packages not used in the project</li>
        <li><Lnk path='https://www.npmjs.com/package/depcheck'>https://www.npmjs.com/package/depcheck</Lnk></li>
      </ul>

      <H>npm-check-updates</H>

      <ul>
        <li><Code bash>npm install -g npm-check-updates</Code> install globally</li>
        <li><Code bash>npx npm-check-updates</Code> get details of packages updates</li>
        <li><Lnk path='https://www.npmjs.com/package/npm-check-updates'>https://www.npmjs.com/package/npm-check-updates</Lnk></li>
      </ul>

      <H>Check for circular references</H>

      <ul>
        <li><Lnk path='https://www.npmjs.com/package/dpdm'>https://www.npmjs.com/package/dpdm</Lnk></li>
        <li><Code bash>npm i -g dpdm</Code>  install globally</li>
        <li><Code bash>npx dpdm ./src/index.tsx</Code> check for circular reference</li>
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
