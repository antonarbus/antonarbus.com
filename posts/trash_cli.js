'use client'


import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'trash cli',
  date: '2022.11.07',
  tags: ['mac', 'tools'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'trash cli',
  body: (
    <>
      <H>trash-cli</H>

      <ul>
        <li>Move files and folders to the trash</li>
        <li>Works on macOS (10.12+), Linux, and Windows (8+)</li>
        <li>Accepts paths and <Lnk path='https://github.com/sindresorhus/globby#globbing-patterns'>patterns</Lnk></li>
        <li><Code>npm install --global trash-cli</Code></li>
      </ul>

      <H>Usage</H>

      <ul>
        <li><Code>trash unicorn.png rainbow.png</Code> delete files</li>
        <li><Code>trash '*.png'</Code></li>
        <li><Code>trash '*.png'</Code></li>
      </ul>

      <H>Patterns</H>

      <ul>
        <li><code>*</code> matches any number of characters, but not /</li>
        <li><code>?</code> matches a single character, but not /</li>
        <li><code>**</code> matches any number of characters, including /, as long as it's the only thing in a path part</li>
        <li><code>{}</code> allows for a comma-separated list of "or" expressions</li>
        <li><code>!</code> at the beginning of a pattern will negate the match</li>
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
