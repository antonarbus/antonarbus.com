'use client'


import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'file to hash',
  date: '2024.03.02',
  tags: ['node'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'file to hash',
  body: (
    <>
      <H>file to hash</H>

      <Code block jsx>{`
        fileHash = crypto.createHash('sha256').update(file.buffer).digest('hex')
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
