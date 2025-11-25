'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'console',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/console.png',
  desc: 'console in JavaScript',
  body: (
    <>
      <H>Console</H>

      <Code block jsx>{`
        console.log(val) // prints value
        console.dir(obj) // displays an interactive list of the properties 
        console.assert(false, 'msg') // writes an error message to the console if the assertion is false
        console.clear() // clears the console if the environment allows
        console.count('msg') // logs the number of this count() calls has been called
        console.countReset('msg') // resets counter used with console.count()
        console.error('msg') // outputs an error message
        console.info('msg') // outputs an informational message 
        console.warn('msg') // outputs a warning message 
        console.table(objOrArr) // displays tabular data as a table
        console.trace(objOrMsg) // outputs a stack trace
        console.time(timerName) // starts a timer
        console.timeLog(timerName) // logs the current value of a timer
        console.timeEnd(timerEnd) // stops a timer
      `}</Code>

      <H>Deeply nested object</H>

      <ul>
        <li>In node you may not log very nested object</li>
        <li>
          Tt will not show you deeply nested props <Code>{'a: { b: { c: [Object] } }'}</Code>
        </li>
        <li>
          {'console.dir(obj, { depth: null })'} prints the full object structure with unlimited
          nesting.
        </li>
      </ul>

      <Code block jsx>{`
        console.dir({
          a: {
            b: {
              c: {
                d: {
                  e: {},
                },
              },
            },
          },
        }, { depth: null })
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
