import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

function Component() {
  return (
    <div css={{ background: 'red' }}>
      hi
    </div>
  )
}

const postObj = {
  title: 'has selector',
  date: '2022.10.09',
  tags: ['css'],
  imgUrl: 'https://antonarbus.com/imgs/css.png',
  desc: 'css :has parent selector in css',
  body: (
    <>
      <Component />
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
