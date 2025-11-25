'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'browser interaction',
  date: '2022.06.05',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/alert.png',
  desc: 'browser interaction',
  body: (
    <>
      <H>Alert</H>

      <Code block jsx>{`
        alert("Hello")
      `}</Code>

      <H>Prompt</H>

      <Code block jsx>{`
        const age = prompt('How old are you?', 100)
      `}</Code>

      <H>Confirm</H>

      <Code block jsx>{`
        const isBoss = confirm("Are you the boss?");
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
