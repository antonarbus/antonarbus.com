import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'measure time',
  date: '2023.11.02',
  tags: ['JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'measure time',
  body: (
    <>
      <H>Measure the time in JavaScript</H>

      <Code block jsx>{`
        const startTime = performance.now()
        doSomething()   // <---- measured code goes between startTime and endTime
        const endTime = performance.now()
        console.log(\`Something took \${endTime - startTime} ms\`)
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
