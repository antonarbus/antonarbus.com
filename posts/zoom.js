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
  title: 'zoom',
  date: '2025.10.05',
  tags: ['css'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'zoom css property',
  body: (
    <>
      <H>Zoom</H>

      <ul>
        <li>
          <code>zoom: 5</code> is the same as <code>scale: 5</code>
        </li>
        <li>But it respects css flow and pushes other elements</li>
        <li>
          <code>scale</code> meanwhile just scales an element in place, kind of it has absolute
          position
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
