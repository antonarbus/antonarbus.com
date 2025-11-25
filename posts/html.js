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
  title: 'html',
  date: '2025.10.04',
  tags: ['html'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'Random html tags, attributes and features',
  body: (
    <>
      <H>inert attribute</H>

      <ul>
        <li>Prevents the click, focus events</li>
        <li>Prevents from selection</li>
        <li>Excludes from browser find-in-page feature</li>
        <li>
          Disables editing
          <li>Excludes from assistive features</li>
        </li>
      </ul>

      <Code block html>{`
      <div inert>
        <!-- content -->
      </div>
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
