import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'chrome',
  date: '2024.01.09',
  tags: ['productivity'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'chrome',
  body: (
    <>
      <H>Chrome</H>

      <ul>
        <li><Code>defaults write com.google.Chrome AppleEnableSwipeNavigateWithScrolls -bool FALSE</Code> disable going back and forward on swiping with magic mouse</li>
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
