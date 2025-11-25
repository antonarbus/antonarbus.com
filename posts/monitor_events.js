'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'monitor events',
  date: '2022.11.10',
  tags: ['JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'monitor events via dev tools',
  body: (
    <>
      <H>monitorEvents</H>

      <ul>
        <li>Log all the events dispatched to an object</li>
        <li>Event objects are then logged to the Console</li>
        <li>Useful for debugging if you are not sure what events are triggered</li>
        <li><Code>monitorEvents(object [, events])</Code></li>
        <li><Code>unmonitorEvents(object)</Code></li>
      </ul>

      <Code block jsx>{`
      monitorEvents(window)
      monitorEvents(window, "click")
      monitorEvents(document.body, "dragenter")
      monitorEvents(document.body, 'mouse')
      unmonitorEvents(document.body)
      `}</Code>

      <Code block jsx>{`
      monitorEvents($0)
      unmonitorEvents($0)
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
