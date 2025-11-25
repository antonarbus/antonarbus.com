'use client'


import { Code, useState, jsxToStr } from '/components/post/reExport'
import isiOS from '/functions/isIos'

function Component() {
  const [isIOsState, setIsIOsState] = useState('do not know')

  function isIOS() {
    setIsIOsState(JSON.stringify(isiOS()))
  }

  return (
    <>
      <button onClick={isIOS}>is iOS?</button>
      <div><b>{isIOsState}</b></div>
    </>
  )
}

const postObj = {
  title: 'is iOS',
  date: '2022.05.12',
  tags: ['JavaScript', 'function'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'check if it is iOS',
  body: (
    <>
      <Code block jsx>{`
      // functions/isIos.js
      export default function isiOS() {
        return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'
        ].includes(navigator.platform) ||
        (navigator.userAgent.includes('Mac') && 'ontouchend' in document) ||
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      }
      `}</Code>

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
