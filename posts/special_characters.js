'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'special characters',
  date: '2022.04.22',
  tags: ['productivity'],
  desc: 'special characters',
  body: (
    <>
      <H>Scandinavian keyboard</H>

      <ul>
        <li>Tilde <Code>~</Code> on scandinavian keyboard can be achieved by <kbd>Right Alt</kbd> + <kbd>~</kbd> / <kbd>^</kbd> (near Enter), then <kbd>Space</kbd></li>
        <li>Pipe <Code>|</Code> on scandinavian keyboard in win can be achieved by <kbd>Right Alt</kbd> + <kbd>~</kbd> (near left shift)</li>
        <li>Pipe <Code>|</Code> on scandinavian keyboard in mac can be achieved by <kbd>Alt</kbd> + <kbd>7</kbd></li>
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
