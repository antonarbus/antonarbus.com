'use client'


import {
  Code,
  H,
  Hs,
  LazyImg,
  Lnk,
  React,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  jsxToStr,
  ComponentFromHtmlString
} from '/components/post/reExport'

const postObj = {
  title: 'void',
  date: '2025.03.22',
  tags: ['JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'xxx',
  body: (
    <>
      <H>Void</H>

      <ul>
        <li>common pattern to prevent the function's return value from being used</li>
        <li>prevents accidental use of the function's return value</li>
      </ul>

      <Code block jsx>{`
        const getNumber = () => {
          return 1
        }

        const num1 = getNumber() 
        const num2 = void getNumber()

        console.log(num1) // 1
        console.log(num2) // undefined
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
