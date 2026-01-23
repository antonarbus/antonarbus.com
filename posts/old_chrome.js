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
  title: 'Old chrome version',
  date: '2026.01.23',
  tags: ['tools'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'Old chrome verstion',
  body: (
    <>
      <H>Old chrome version</H>

      <ul>
        <li>Sometimes need to test a polyfill with old browser</li>
        <li>
          <Lnk path="https://developer.chrome.com/blog/chrome-for-testing">
            https://developer.chrome.com/blog/chrome-for-testing
          </Lnk>
        </li>
        <li>
          <Code inline bash>
            npx @puppeteer/browsers install chrome@116.0.5793.0
          </Code>
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
