'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'
import { ddmmyyyyHHMMSS } from '/functions/ddmmyyyyHHMMSS'

const postObj = {
  title: 'date formatter',
  date: '2022.06.12',
  tags: ['JavaScript', 'function'],
  imgUrl: 'https://antonarbus.com/imgs/date.png',
  desc: 'convert date object into dd.mm.yyyy HH:MM:SS format',
  body: (
    <>
      <H>Basic date object</H>

      <p>Date object converted into the string doesn't look good.</p>

      <p><Code js>new Date().toString()</Code> <i>{new Date().toString()}</i></p>

      <H>Function</H>

      <Code block jsx>{`
      // functions/ddmmyyyyHHMMSS.js
      export const ddmmyyyyHHMMSS = (date = new Date(), utc = false) => {
        if (isNaN(Date.parse(date))) return 'can not parse date'
        const addZeroToNum = (num) => num.toString().length === 1 ? '0' + num : num
        const d = new Date(date)
        const yyyy = utc ? d.getUTCFullYear() : d.getFullYear()
        const mm = addZeroToNum(utc ? d.getUTCMonth() + 1 : d.getMonth() + 1)
        const dd = addZeroToNum(utc ? d.getUTCDate() : d.getDate())
        const HH = addZeroToNum(utc ? d.getUTCHours() : d.getHours())
        const MM = addZeroToNum(utc ? d.getUTCMinutes() : d.getMinutes())
        const SS = addZeroToNum(utc ? d.getUTCSeconds() : d.getSeconds())
        return \`\${dd}.\${mm}.\${yyyy} \${HH}:\${MM}:\${SS}\`
      }
      `}</Code>

      <H>Output</H>

      <div><Code js>{'new Date().toString()'}</Code> <i>{new Date().toString()}</i></div>
      <div><Code js>{'new Date().toISOString()'}</Code> <i>{new Date().toISOString()}</i></div>
      <div><Code js>{'ddmmyyyyHHMMSS(new Date())'}</Code> <i>{ddmmyyyyHHMMSS(new Date())}</i></div>
      <div><Code js>{'ddmmyyyyHHMMSS(new Date(), true)'}</Code> <i>{ddmmyyyyHHMMSS(new Date(), true)}</i></div>
      <div><Code js>{'ddmmyyyyHHMMSS("1999-12-31T15:16:17.340Z")'}</Code> <i>{ddmmyyyyHHMMSS('1999-12-31T15:16:17.340Z')}</i></div>
      <div><Code js>{'ddmmyyyyHHMMSS("1999-12-31T15:16:17.340Z", true)'}</Code> <i>{ddmmyyyyHHMMSS('1999-12-31T15:16:17.340Z', true)}</i></div>
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
