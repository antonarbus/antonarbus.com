'use client'


import { Code, H, Lnk, useRef, jsxToStr } from '/components/post/reExport'
import * as cheerio from 'cheerio'

function Component(props) {
  const ref = useRef()

  const addHeading = () => {
    const $ = cheerio.load('<h2 class="title">Hello world</h2>')
    $('h2.title').text('Heading')
    $.html()
    ref.current.innerHTML = $.html()
  }

  return (
    <>
      <button onClick={addHeading}>add heading</button>
      <div ref={ref}>text in div</div>
    </>
  )
}

const postObj = {
  title: 'cheerio',
  date: '2022.06.01',
  tags: ['tool'],
  imgUrl: 'https://antonarbus.com/imgs/cheerio.png',
  desc: 'jQuery designed specifically for the server',
  body: (
    <>
      <H>Idea</H>

      <ul>
        <li><Lnk path='https://cheerio.js.org/'>Cheerio</Lnk> brings <Lnk path='https://jquery.com/'>jQuery</Lnk> for the NodeJS without browser</li>
        <li>Cheerio parses markup and provides an API for traversing/manipulating the resulting data structure</li>
      </ul>

      <H>Installation</H>

      <p><Code bash>npm i cheerio</Code></p>

      <H>Example</H>

      <Component />

      <Code block jsx>{`
      import * as cheerio from 'cheerio'

      function Component(props) {
        const ref = useRef()

        const addHeading = () => {
          const $ = cheerio.load('<h2 class="title">Hello world</h2>')
          $('h2.title').text('Heading')
          $.html()
          ref.current.innerHTML = $.html()
        }

        return (
          <>
            <button onClick={addHeading}>add heading</button>
            <div ref={ref}>text in div</div>
          </>
        )
      }
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
