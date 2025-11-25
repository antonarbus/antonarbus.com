'use client'


import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

function Component() {
  return (
    <div css={{
      '*': {
        outline: '1px solid red'
      }
    }}>
      <span>Hello there.</span>
      <div>I am div</div>
    </div>
  )
}

const postObj = {
  title: 'outline',
  date: '2022.10.12',
  tags: ['css'],
  imgUrl: 'https://antonarbus.com/imgs/css.png',
  desc: 'outline all elements with border to check containers visually',
  body: (
    <>
      <H>Outline</H>

      <p>In case your layout is broken you can investigate positioning and shape of elements by applying <code>outline</code> css property to all elements.</p>

      <Code block css>{`
        * {
          outline: 1px solid red;
        }
      `}</Code>

      <Component />

      <p><code>outline</code> is better than <code>border</code> property, because it doesn't add any physical border to an element and does not change positioning of elements.</p>
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
