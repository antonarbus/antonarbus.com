'use client'

import { Code, H, Hs, Lnk, useEffect, useState, jsxToStr } from '/components/post/reExport'
import { ddmmyyyyHHMMSS } from '../helpers/ddmmyyyyHHMMSS'

function DateFromServer() {
  const [response, setResponse] = useState('Loading...')

  useEffect(getDateObj, [])

  async function getDateObj() {
    const url = '/api/time_on_server'
    const response = await fetch(url)
    const result = await response.json()
    console.log(result)
    setResponse(result)
  }

  return (
    <>
      <Hs>UTC</Hs>

      <div>
        Date on <b>server</b> (UTC): {response.formattedUTC}
      </div>
      <div>
        Date on <b>client</b> (UTC): {ddmmyyyyHHMMSS(new Date(), true)}
      </div>

      <Hs>Local</Hs>

      <div>
        Date on <b>server</b> (local): {response.formatted}
      </div>
      <div>
        Date on <b>client</b> (local): {ddmmyyyyHHMMSS(new Date())}
      </div>
    </>
  )
}

const postObj = {
  title: 'utc vs gmt',
  date: '2022.06.12',
  tags: ['JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/js.jpg',
  desc: 'date object in JS applies local GMT shift on clint side',
  body: (
    <>
      <H>Idea</H>

      <ul>
        <li>
          <Code js>const d = new Date()</Code> returns the date object
        </li>
        <li>
          getters like <Code js>d.getHours()</Code> return local time with GMT shift based on
          client's device
        </li>
        <li>
          getters like <Code js>d.getUTCHours()</Code> return UTC time
        </li>
        <li>
          <Lnk path="/api/time_on_server">API call</Lnk> returns the date object parsed on server
          side with <code>0</code> timezone shift
        </li>
        <li>Same object on the client side returns local time with local timezone</li>
        <li>UTC time is the same on both sides</li>
        <li>
          Do not rely on server local time if you present time to a client, take the date object and
          parse it on client's device
        </li>
      </ul>

      <H>Date on server vs client</H>

      <DateFromServer />

      <H>Code</H>

      <Hs>Server</Hs>

      <Code block jsx>{`
      // pages/api/time_on_server.js
      import { ddmmyyyyHHMMSS } from '/functions/ddmmyyyyHHMMSS'

      export default async function handler(req, res) {
        const d = new Date()
        res.json({
          'd = new Date()': new Date(),
          'd.getFullYear()': d.getFullYear(),
          'd.getMonth()': d.getMonth(),
          'd.getDate()': d.getDate(),
          'd.getHours()': d.getHours(),
          'd.getMinutes()': d.getMinutes(),
          'd.getSeconds()': d.getSeconds(),
          'd.getMilliseconds()': d.getMilliseconds(),
          'd.getDay()': d.getDay(),
          'd.getTimezoneOffset()': d.getTimezoneOffset(),
          'd.getTime()': d.getTime(),
          'd.getUTCFullYear()': d.getUTCFullYear(),
          'd.getUTCMonth()': d.getUTCMonth(),
          'd.getUTCDate()': d.getUTCDate(),
          'd.getUTCHours()': d.getUTCHours(),
          'd.getUTCMinutes()': d.getUTCMinutes(),
          'd.getUTCSeconds()': d.getUTCSeconds(),
          'd.getUTCMilliseconds()': d.getUTCMilliseconds(),
          'd.getUTCDay()': d.getUTCDay(),
          'd.toDateString()': d.toDateString(),
          'd.toISOString()': d.toISOString(),
          'd.toJSON()': d.toJSON(),
          'd.toGMTString()': d.toGMTString(),
          'd.toLocaleDateString()': d.toLocaleDateString(),
          'd.toString()': d.toString(),
          'd.toTimeString()': d.toTimeString(),
          'd.toUTCString()': d.toUTCString(),
          'd.valueOf()': d.valueOf(),
          formatted: ddmmyyyyHHMMSS(d.toString()),
          formattedUTC: ddmmyyyyHHMMSS(d.toString(), true)
        })
      }
      `}</Code>

      <Hs>Client</Hs>

      <Code block jsx>{`
      import { ddmmyyyyHHMMSS } from '/functions/ddmmyyyyHHMMSS'

      function DateFromServer() {
        const [response, setResponse] = useState('Loading...')
        useEffect(getDateObj, [])

        async function getDateObj () {
          const url = '/api/time_on_server'
          const response = await fetch(url)
          const result = await response.json()
          console.log(result)
          setResponse(result)
        }

        return (
          <>
            <Hs>UTC</Hs>

            <div>Date on <b>server</b> (UTC): {response.formattedUTC}</div>
            <div>Date on <b>client</b> (UTC): {ddmmyyyyHHMMSS(new Date(), true)}</div>

            <Hs>Local</Hs>

            <div>Date on <b>server</b> (local): {response.formatted}</div>
            <div>Date on <b>client</b> (local): {ddmmyyyyHHMMSS(new Date())}</div>
          </>
        )
      }
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
