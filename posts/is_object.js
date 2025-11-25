'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'isObject()',
  date: '2022.08.13',
  tags: ['function', 'JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'Function to check if a value is an object.',
  body: (
    <>
      <H>isObject function</H>

      <Code block jsx>{`
      const isObject = (variable) => variable !== null && variable?.constructor?.name === 'Object'
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
