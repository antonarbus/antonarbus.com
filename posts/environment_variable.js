import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'environment variable',
  date: '2022.04.20',
  tags: ['devops'],
  desc: 'environment variable',
  body: (
    <>
      <H>Win</H>

      <ul>
        <li>Search for <Code>Advanced system settings</Code> in Windows</li>
        <li>Click the <i>Advanced</i> tab</li>
        <li>Click the <i>Environment Variables</i> button in the bottom</li>
        <li>At work I had to use <i>User variable</i> window</li>
      </ul>

      <H>Mac</H>

      <ul>
        <li><Code bash>printenv</Code> show environment variables</li>
        <li><Code>echo $<i>var_name</i></Code> show specific variable value</li>
        <li><Code>export <i>var_name</i>=<i>value</i></Code> set value temporarily</li>
        <li><Code bash>code ~/.zshrc</Code>, then add  <Code>export <i>var_name</i>=<i>value</i></Code>, then <Code bash>source ~/.zshrc</Code> to add variable permanently</li>
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
