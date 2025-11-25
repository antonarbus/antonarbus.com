'use client'


import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'chrome',
  date: '2023.08.10',
  tags: ['tools'],
  imgUrl: 'https://antonarbus.com/imgs/chrome.png',
  desc: 'chrome',
  body: (
    <>
      <H>Old chrome versions</H>

      <Lnk path='https://chromium.cypress.io/'>https://chromium.cypress.io/</Lnk>
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
