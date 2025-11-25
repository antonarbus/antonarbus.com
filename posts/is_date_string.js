'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'isDateString',
  date: '2022.08.13',
  tags: ['function', 'JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'Function to check if a string value is date.',
  body: (
    <>
      <H>isDateString function</H>

      <Code block jsx>{`
      const isDateString = (variable) => isNaN(variable) && !isNaN(Date.parse(variable))
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
