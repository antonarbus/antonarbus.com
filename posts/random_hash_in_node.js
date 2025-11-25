'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'random hash in node',
  date: '2022.10.15',
  tags: ['node'],
  imgUrl: 'https://antonarbus.com/imgs/jf.png',
  desc: 'random hash in node',
  body: (
    <>
      <H>Random hash in node js</H>

      <p>Can be used to generate secret api key.</p>

      <Code block jsx>{`
        require('crypto').randomBytes(64).toString('hex')
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
