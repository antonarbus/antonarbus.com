'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'websocket',
  date: '2022.06.24',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'exchange data between browser and server via a persistent websocket connection',
  body: (
    <>
      <ul>
        <li>WebSocket protocol provides a way to exchange data between browser and server via a persistent connection</li>
        <li>Data can be passed in both directions as “packets”, w/o breaking the connection and additional HTTP-requests</li>
        <li>Great for online games, real-time trading systems and so on</li>
      </ul>

      <H>Create</H>

      <ul>
        <li>open a websocket connection</li>
        <li>prefer encrypted <code>wss://</code> protocol, it’s like HTTPS for web sockets</li>
      </ul>

      <Code block jsx>{`
      let socket = new WebSocket("ws://javascript.info") 
      `}</Code>

      <H>Send</H>

      <Code block jsx>{`
      socket.send(data) 
      `}</Code>

      <H>Events</H>

      <p>We should listen to events on socket...</p>

      <ul>
        <li><i>'message'</i> data received</li>
        <li><i>'error'</i> websocket error</li>
        <li><i>'close'</i> connection closed</li>
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
