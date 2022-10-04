import { Code, H, jsxToStr, Lnk, LazyImg } from '/components/post/reExport'

const postObj = {
  title: 'date',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/date.png',
  desc: 'Date in JavaScript',
  body: (
    <>
      <H>Create</H>

      <p><Code>new Date([timestamp])</Code> - create a Date object with timestamp (milliseconds passed after the Jan 1st of 1970 UTC+0)</p>

      <Code block jsx>{`
            let now = new Date() // Mon May 17 2021 02:47:33 GMT+0300 (Eastern European Summer Time)
            new Date(0) // 0 means 01.01.1970 UTC+0
            new Date(24 * 60 * 60 * 1000) // add 24 hours, get 02.01.1970 UTC+0
            new Date(-24 * 3600 * 1000) // 31 Dec 1969
      `}</Code>

      <p><Code>new Date(dateString)</Code> - if single argument & string, then it is parsed automatically(same as Date.parse)</p>

      <Code block jsx>{`
            new Date("2017-01-26") // Thu Jan 26 2017 02:00:00 GMT+0200 (Eastern European Standard Time)
      `}</Code>

      <p><Code>new Date(year, month, [date, hours, minutes, seconds, ms])</Code> - create the date with the given components in the local time zone</p>
      <ul>
        <li>year = 4 digits</li>
        <li>month = 0 (Jan) ... 11 (Dec)</li>
        <li>date = day of month, if absent then 1 is assumed</li>
        <li>If hours/minutes/seconds/ms is absent, they are assumed to be equal 0.</li>
      </ul>

      <Code block jsx>{`
            new Date(2011, 0, 1, 0, 0, 0, 0) // 1 Jan 2011, 00:00:00
            new Date(2011, 0, 1) // the same, hours etc are 0 by default
            new Date(2011, 0, 1, 2, 3, 4, 567) // 1.01.2011, 02:03:04.567
      `}</Code>

      <H>All getters</H>

      <p><Lnk path='/api/time_on_server'>JSON</Lnk> with all getter methods.</p>

      <Code block json>{`
      {
        "d = new Date()": "2022-06-15T11:58:38.337Z",
        "d.getFullYear()": 2022,
        "d.getMonth()": 5,
        "d.getDate()": 15,
        "d.getHours()": 14,
        "d.getMinutes()": 58,
        "d.getSeconds()": 38,
        "d.getMilliseconds()": 337,
        "d.getDay()": 3,
        "d.getTimezoneOffset()": -180,
        "d.getTime()": 1655294318337,
        "d.getUTCFullYear()": 2022,
        "d.getUTCMonth()": 5,
        "d.getUTCDate()": 15,
        "d.getUTCHours()": 11,
        "d.getUTCMinutes()": 58,
        "d.getUTCSeconds()": 38,
        "d.getUTCMilliseconds()": 337,
        "d.getUTCDay()": 3,
        "d.toDateString()": "Wed Jun 15 2022",
        "d.toISOString()": "2022-06-15T11:58:38.337Z",
        "d.toJSON()": "2022-06-15T11:58:38.337Z",
        "d.toGMTString()": "Wed, 15 Jun 2022 11:58:38 GMT",
        "d.toLocaleString()": "15/06/2022, 14.58.38",
        "d.toLocaleString("tr-Tr")": "15.06.2022 14:58:38",
        "d.toLocaleDateString()": "15/06/2022",
        "d.toLocaleTimeString()": "14.58.38",
        "d.toString()": "Wed Jun 15 2022 14:58:38 GMT+0300 (Eastern European Summer Time)",
        "d.toTimeString()": "14:58:38 GMT+0300 (Eastern European Summer Time)",
        "d.toUTCString()": "Wed, 15 Jun 2022 11:58:38 GMT",
        "d.valueOf()": 1655294318337,
        "formatted": "15.06.2022 14:58:38",
        "formattedUTC": "15.06.2022 11:58:38"
        }
      `}</Code>

      <H>Get</H>

      <p>Local time zone</p>

      <Code block jsx>{`
            let now = new Date() // Sat Dec 25 2021 17:05:39 GMT+0200 (Eastern European Standard Time)
            now.getFullYear() // 2021
            now.getMonth() // 11 // month, 0 ... 11.
            now.getDate() // 25
            now.getHours() // 17
            now.getMinutes() // 5
            now.getSeconds() // 39
            now.getMilliseconds() // 553
            now.getDay() // 6 // Mon // Sunday - Saturday : 0 ... 6
            now.getTimezoneOffset() // -120  // time-zone offset, in minutes, from the date based on current host //  GMT+02

            now.getTime() // 1640444739553 // timestamp // milliseconds since Jan 1, 1970, 00:00:00.000 GMT
            +now // 1640444739553 // timestamp // same as now.getTime()
            
            Date.now() // 1640444940013 // current timestamp // same as new Date().getTime() // it’s faster
      `}</Code>

      <p>UTC - counterparts methods for the time zone UTC + 0</p>

      <Code block jsx>{`
            now.getUTCFullYear() 
            now.getUTCMonth() 
            now.getUTCDate() 
            now.getUTCHours() 
            now.getUTCMinutes() 
            now.getUTCSeconds() 
            now.getUTCMilliseconds() 
            now.getUTCDay()
      `}</Code>

      <H>Set</H>

      <p>Local time zone</p>

      <Code block jsx>{`
            let now = new Date()
            now.setFullYear(1997) // setFullYear(year, [month], [date])
            now.setMonth(6) // setMonth(month, [date])
            now.setDate(24)
            now.setHours(20) // setHours(hour, [min], [sec], [ms])
            now.setMinutes(45) // setMinutes(min, [sec], [ms])
            now.setSeconds(42) // setSeconds(sec, [ms])
            now.setMilliseconds(456)

            now.setTime(1621212694110) // sets the whole date by milliseconds since 01.01.1970 UTC
            const event1 = new Date('July 1, 1999')
            const event2 = new Date()
            event2.setTime(event1.getTime())
            event1 // Thu Jul 01 1999 00:00:00 GMT+0300 (Eastern European Summer Time
            event2 // Thu Jul 01 1999 00:00:00 GMT+0300 (Eastern European Summer Time)
      `}</Code>

      <p>Time zone UTC + 0</p>

      <Code block jsx>{`
            setUTCFullYear()
            setUTCMonth()
            setUTCDate()
            setUTCHours()
            setUTCMinutes()
            setUTCSeconds()
            setUTCMilliseconds()
      `}</Code>

      <H>Local date representation</H>

      <p>Turkish one is the best imho.</p>

      <LazyImg path='/imgs/localDates.png'/>

      <H>Get time in different timezone</H>

      <Code block jsx>{`
      const utcDate = '2022-05-09T06:03:59.000Z'
      const d = new Date(utcDate)
      const jpDate = d.toLocaleString('fi', { 
        timeZone: 'asia/tokyo',
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        hourCycle: 'h24', 
      })

      jpDate // '09.05.2022 klo 15.03'
      `}</Code>

      <H>Date correction</H>

      <Code block jsx>{`
            let date = new Date(2016, 1, 28)
            date.setDate(date.getDate() + 2) // 1 Mar 2016

            let date = new Date(2016, 0, 2) // 2 Jan 2016
            date.setDate(0) // 31 Dec 2015

            let date = new Date(2013, 0, 32); // 32 Jan 2013 ?!? // ...is 1st Feb 2013!
      `}</Code>

      <H>Time difference in ms</H>

      <Code block jsx>{`
            let start = Date.now()
            for (let i = 0; i < 100000000; i++) {
              let doSomething = i * i * i
            }
            let end = Date.now()
            alert( \`The loop took \${end - start} ms\` ) // The loop took 127 ms
      `}</Code>

      <H>Parse</H>

      <ul>
        <li>Parses the string and returns the timestamp (number of milliseconds from 1 Jan 1970 UTC+0)</li>
        <li>If the format is invalid, returns NaN</li>
        <li>YYYY-MM-DD – year-month-day.</li>
        <li>The character "T" is used as the delimiter.</li>
        <li>HH:mm:ss.sss – time: hours, minutes, seconds and milliseconds.</li>
        <li>'Z' is the time zone in the format +-hh:mm. A single letter Z would mean UTC+0.</li>
      </ul>

      <Code block jsx>{`
            Date.parse('2012-01-26T13:51:50.417-07:00') // 1327611110417
            new Date(Date.parse('2012-01-26T13:51:50.417-07:00')) // Thu Jan 26 2012 22:51:50 GMT+0200 (Eastern European Standard Time)
            Date.parse("2019-01-01") // 1546300800000
            Date.parse("2019-01-01T00:00:00.000Z") // 1546300800000
            Date.parse("2019-01-01T00:00:00.000+00:00") // 1546300800000
            Date.parse('Aug 9, 1995') // 807915600000
            Date.parse('Wed, 09 Aug 1995 00:00:00 GMT') // 807926400000
            Date.parse('Wed, 09 Aug 1995 00:00:00') // 807915600000
            Date.parse('Thu, 01 Jan 1970 00:00:00 GMT-0400')  //14400000
      `}</Code>

      <H>performance.now()</H>

      <p>Gives the number of milliseconds from the start of page loading with microsecond precision</p>

      <Code block jsx>{`
            alert(\`Loading started \${performance.now()}ms ago\`)
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
