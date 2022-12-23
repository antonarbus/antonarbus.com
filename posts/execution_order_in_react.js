import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const Parent = ({ children }) => {
  console.log(1)
  useEffect(() => console.log(2), [])
  return children
}

const Child = () => {
  console.log(3)
  useEffect(() => console.log(4), [])
  return null
}

const postObj = {
  title: 'execution order in React',
  date: '2022.12.23',
  tags: ['react'],
  imgUrl: 'https://antonarbus.com/imgs/react.png',
  desc: 'execution order in React',
  body: (
    <>
      <Parent>
        <Child />
      </Parent>

      <H>Execution order in React</H>

      <ul>
        <li>parent is rendered first</li>
        <li>children go next</li>
        <li>children's useEffect goes then</li>
        <li>then parent's useEffect</li>
        <li>can check in console</li>
      </ul>

      <Code block jsx>{`
      const Parent = ({ children }) => {
        console.log(1)
        useEffect(() => console.log(2), [])
        return children
      }

      const Child = () => {
        console.log(3)
        useEffect(() => console.log(4), [])
        return 'I am child'
      }

      <Parent>
        <Child />
      </Parent>

      // 1 --> 3 --> 4 --> 2 
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
