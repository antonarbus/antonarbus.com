import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'github',
  date: '2022.02.26',
  tags: ['tools'],
  desc: 'About GitHub',
  body: (
    <>
      <H>Create repo on GitHub from terminal</H>

      <ul>
        <li>Install <Lnk path="https://cli.github.com/">github CLI</Lnk> with <Code bash>brew install gh</Code> or <Code bash>scoop install gh</Code> for mac and win respectively </li>
        <li>If <Lnk path="https://scoop.sh/">scoop</Lnk> is not installed run <Code bash>Set-ExecutionPolicy RemoteSigned -scope CurrentUser</Code> & <Code bash>iwr -useb get.scoop.sh | iex</Code> </li>
        <li>Initialize the local directory as a Git repository <Code bash>git init -b main</Code></li>
        <li>Stage and commit all the files in your project <Code bash>git add . && git commit -m "initial commit"</Code></li>
        <li>push it into new repository on GitHub with <Code bash>gh repo create</Code></li>
        <li>on Win for me it works only in <i>powershell</i> terminal, not in <i>bash</i></li>
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
