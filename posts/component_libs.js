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
  title: 'component libs',
  date: '2025.01.15',
  tags: ['css', 'react'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'component libs',
  body: (
    <>
      <H>Component libs</H>

      <ul>
        <li>
          <Lnk path="https://www.reactbits.dev/">https://www.reactbits.dev/</Lnk> - beautifully
          animated components for react
        </li>
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
