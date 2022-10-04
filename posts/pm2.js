import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'pm2',
  date: '2022.04.25',
  tags: ['tools', 'devops'],
  desc: 'yyy',
  body: (
    <>
      <p><Lnk path='https://pm2.keymetrics.io/'>PM2</Lnk> is a process manager for node.js</p>

      <H>Quickstart</H>

      <Lnk path='https://pm2.keymetrics.io/docs/usage/quick-start/'>https://pm2.keymetrics.io/docs/usage/quick-start/</Lnk>

      <H>Install</H>

      <ul>
        <li><Code bash>sudo npm install -g pm2</Code> install globally</li>
      </ul>

      <H>Commands</H>

      <ul>
        <li><Code>sudo pm2 start <i>server.js</i></Code> run app</li>
        <li><Code>sudo pm2 start <i>server.js</i> --watch</Code> start and watch for file changes, then restart automatically</li>
        <li><Code>pm2 start "npm run start" --name <i>myAppName</i> --watch</Code> start via npm in watch mode</li>
        <li><Code bash>pm2 status</Code> get status</li>
        <li><Code>pm2 restart <i>server.js</i></Code> restart</li>
        <li><Code>pm2 stop <i>server.js</i></Code> stop</li>
        <li><Code>pm2 delete <i>id</i></Code> delete</li>
        <li><Code bash>pm2 logs</Code> get logs</li>
        <li><Code bash>pm2 flush</Code> clean logs</li>
        <li><Code bash>pm2 startup</Code> app goes back again if server reboots </li>
        <li><Code bash>pm2 save</Code> - may be need to save before</li>
        <li><Code bash>pm2 kill</Code></li>
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
