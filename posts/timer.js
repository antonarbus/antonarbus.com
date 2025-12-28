'use client'

import { Code, useEffect, useState, useRef, jsxToStr } from '/components/post/reExport'
import secToHHMMSS from '../helpers/secToHHMMSS'

function Component() {
  const [timerState, setTimerState] = useState(0)
  const intervalRef = useRef(null)
  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    intervalRef.current = setInterval(function () {
      setTimerState((prevVal) => prevVal + 1)
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [timerState])

  function resetTimer() {
    setTimerState(0)
    clearInterval(intervalRef.current)
    firstRenderRef.current = true
  }

  return (
    <>
      <div>
        Timer <b>{secToHHMMSS(timerState)}</b>
      </div>
      <button onClick={() => setTimerState(timerState + 1)}>Start</button>
      <button onClick={() => clearInterval(intervalRef.current)}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </>
  )
}

const postObj = {
  title: 'timer',
  date: '2021.10.21',
  tags: ['react'],
  imgUrl: 'https://antonarbus.com/imgs/timer.png',
  desc: 'timer with react',
  body: (
    <>
      <Component />

      <ul>
        <li>
          The idea is to update the <i>timerState</i> by adding +1s
        </li>
        <li>
          It will trigger <i>useEffect</i> hook and set a timer for 1000 ms
        </li>
        <li>
          Timer will change <i>timerState</i> with +1s, which will trigger <i>useEffect</i> again...
        </li>
        <li>On component unmount timer is destroyed</li>
        <li>
          Btw we skip <i>useEffect</i> on first render with <i>firstRenderRef</i> flag
        </li>
        <li>On timer pause we destroy timer</li>
        <li>
          Note that timer is kept in <i>useRef</i> global variable, because we need to access it
          from different places
        </li>
        <li>
          On reset button we reset all variables & fool <i>useEffect</i> telling it is the first
          render, which he will skip
        </li>
      </ul>

      <Code block jsx>{`
      import React, { useEffect, useRef, useState } from 'react';
        import secToHHMMSS from '../../../helpers/functions/secToHHMMSS';

        function Component() {
          const [timerState, setTimerState] = useState(0)
          const intervalRef = useRef(null)
          const firstRenderRef = useRef(true)
        
          useEffect(() => {
            if (firstRenderRef.current) {
              firstRenderRef.current = false
              return
            }
        
            intervalRef.current = setInterval(function() {
              setTimerState(prevVal => prevVal + 1)
            }, 1000)
        
            return () => clearInterval(intervalRef.current)
          }, [timerState])
        
          function resetTimer() {
            setTimerState(0)
            clearInterval(intervalRef.current)
            firstRenderRef.current = true
          }
        
          return (
            <>
              <div>Timer <b>{secToHHMMSS(timerState)}</b></div>
              <button onClick={() => setTimerState(timerState + 1)}>Start</button>
              <button onClick={() => clearInterval(intervalRef.current)}>Pause</button>
              <button onClick={resetTimer}>Reset</button>
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
