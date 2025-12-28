'use client'

import { Code, jsxToStr } from '/components/post/reExport'
import secToHHMMSS from '../helpers/secToHHMMSS'

function Component() {
  return (
    <>
      <div>
        No sec is <b>{secToHHMMSS()}</b>
      </div>
      <div>
        9 sec is <b>{secToHHMMSS(9)}</b>
      </div>
      <div>
        57 sec is <b>{secToHHMMSS(57)}</b>
      </div>
      <div>
        65 sec is <b>{secToHHMMSS(65)}</b>
      </div>
      <div>
        3988 sec is <b>{secToHHMMSS(3988)}</b>
      </div>
    </>
  )
}

const postObj = {
  title: 'seconds converter',
  date: '2021.10.21',
  tags: ['function', 'JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/seconds.jpg',
  desc: 'seconds converter function',
  body: (
    <>
      <p>Represent seconds in hours + minutes + seconds (HH:MM:SS)</p>

      <Code block jsx>{`
      import React from 'react';

      function secToHHMMSS(sec) {
        const hours = Math.floor(sec / (60 * 60))
        const remainingSec = sec % (60 * 60)
        const minutes = Math.floor(remainingSec / 60)
        const seconds = remainingSec % 60
        const addZeroToNum = (num) => num.toString().length === 1 ? '0'+ num : num
        const HH = addZeroToNum(hours)
        const MM = addZeroToNum(minutes)
        const SS = addZeroToNum(seconds)
        return \`\${HH}:\${MM}:\${SS}\`
      }
      
      function Component() {
        return (
          <>
            <div>No sec is <b>{secToHHMMSS()}</b></div>
            <div>9 sec is <b>{secToHHMMSS(9)}</b></div>
            <div>57 sec is <b>{secToHHMMSS(57)}</b></div>
            <div>65 sec is <b>{secToHHMMSS(65)}</b></div>
            <div>3988 sec is <b>{secToHHMMSS(3988)}</b></div>
          </>
        );
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
