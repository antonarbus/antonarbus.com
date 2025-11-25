'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'va in js',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'Various in JavaScript',
  body: (
    <>
      <H>Comments</H>

      <Code block jsx>{`
          // This comment occupies a line of its own

          /*
            An example with two messages.
            This is a multiline comment.
          */
      `}</Code>

      <H>Debugger</H>

      <p>Debugger pauses the code</p>

      <Code block jsx>{`
        function hello(name) {
          let phrase = \`Hello, \${name}!\`;
          debugger;  // <-- the debugger stops here
          say(phrase);
        }
      `}</Code>

      <H>$0</H>

      <p>Reference to the select element in dev tools</p>
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
