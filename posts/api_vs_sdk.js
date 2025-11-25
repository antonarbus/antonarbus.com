'use client'


import { jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'api vs sdk',
  date: '2022.04.22',
  tags: ['basics'],
  desc: 'api vs sdk',
  imgUrl: 'https://antonarbus.com/imgs/api.png',
  body: (
    <>
      <p><b>API</b> defines how to access a resource.</p>
      <p><b>SDK</b> is a set of tools that can call APIs for us.</p>
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
