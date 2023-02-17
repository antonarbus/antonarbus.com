import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'data_fns',
  date: '2023.02.17',
  tags: ['JavaScript', 'package'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'package to work with dates in JavaScript',
  body: (
    <>
      <H>Download</H>

      <ul>
        <li>Functions to work with dates in JavaScript</li>
        <li><Lnk path='https://date-fns.org/docs/Getting-Started'>https://date-fns.org/docs/Getting-Started</Lnk></li>
        <li><Code>npm install date-fns --save</Code></li>
        <li><Code>{'import { formatDistance } from \'date-fns\''}</Code></li>
      </ul>

      <H>differenceInDays</H>

      <Code block jsx>{`
      // How many full days are between
      // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
      const result = differenceInDays(
        new Date(2012, 6, 2, 0, 0),
        new Date(2011, 6, 2, 23, 0)
      )
      //=> 365
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
