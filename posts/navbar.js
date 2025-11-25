'use client'


import { Nav } from './Nav/Nav'
import { H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'navbar',
  date: '2022.05.16',
  tags: ['react'],
  imgUrl: 'https://antonarbus.com/imgs/navbar.png',
  desc: 'navbar in react',
  body: (
    <>
      <H>Navbar</H>
      <Nav />
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
