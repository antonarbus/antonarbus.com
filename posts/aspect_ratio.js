'use client'


import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

function Square1() {
  return (
    <div css={{
      width: '200px',
      height: '300px',
      background: 'red'
    }}>
      div1
    </div>
  )
}

function Square2() {
  return (
    <div css={{
      width: '200px',
      aspectRatio: '2/3',
      background: 'red'
    }}>
      div1
    </div>
  )
}

const postObj = {
  title: 'aspect-ratio',
  date: '2022.10.13',
  tags: ['css'],
  imgUrl: 'https://antonarbus.com/imgs/css.png',
  desc: 'aspect-ratio',
  body: (
    <>
      <H>Aspect-ratio</H>

      <p>We can assign width and height to the element.</p>

      <Code block jsx>{`
      function Square1() {
        return (
          <div css={{
            width: '200px',
            height: '300px',
            background: 'red'
          }}>
            div1
          </div>
        )
      }
      `}</Code>

      <Square1 />

      <p>Or can assign one side and add aspect-ratio.</p>

      <Code block jsx>{`
      function Square2() {
        return (
          <div css={{
            width: '200px',
            aspectRatio: '2/3',
            background: 'red'
          }}>
            div1
          </div>
        )
      }
      `}</Code>

      <Square2 />
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
