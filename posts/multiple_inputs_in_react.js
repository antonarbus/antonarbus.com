import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'multiple inputs in react',
  date: '2022.10.xx',
  tags: ['React', 'state'],
  imgUrl: 'https://antonarbus.com/imgs/react.png',
  desc: 'multiple inputs in react',
  body: (
    <>
      xyz
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
