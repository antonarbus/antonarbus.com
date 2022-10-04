import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'luxon',
  date: '2022.06.03',
  tags: ['tool'],
  imgUrl: 'https://antonarbus.com/imgs/luxon.png',
  desc: 'package for working with dates',
  body: (
    <>
      <H>Idea</H>

      <ul>
        <li><Lnk path='https://moment.github.io/luxon/#/'>Luxon</Lnk> is the package dates and times</li>
      </ul>

      <H>Installation</H>

      <Code bash>npm i luxon</Code>

      <H>API</H>

      <p>To be continued...</p>
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
