import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'focused element',
  date: '2024.02.01',
  tags: ['JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'check which element has focus',
  body: (
    <>
      <H>activeElement</H>

      <ul>
        <li><Code>document.activeElement</Code> returns the Element within the DOM that currently has focus</li>
        <li>if you need to understand which element is focused and can not see visually, do following</li>
      </ul>

      <Code block jsx>{`
        document.addEventListener('focusin', function(event) {
          console.log('Focused element:', document.activeElement)
        })
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
