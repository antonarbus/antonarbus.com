'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'short password in mac',
  date: '2022.10.17',
  tags: ['mac'],
  imgUrl: 'https://antonarbus.com/imgs/mac.jpg',
  desc: 'how to set a short password in mac',
  body: (
    <>
      <H>Short password in mac</H>

      <ul>
        <li>macOS may force you to set a complicated user login password, which is good</li>
        <li>if you wish a simple short one you may run in terminal <Code bash>pwpolicy -clearaccountpolicies</Code></li>
        <li>then go into your System <i>{'Preferences > Users & Groups'}</i> & reset your password to a short one</li>
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
