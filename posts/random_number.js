import { Code, useState, jsxToStr } from '/components/post/reExport'
import randomNumFromTo from '/functions/randomNumFromTo'
import useInput from '/functions/useInput'

const style = { width: '50px', marginRight: '10px' }

function Component () {
  const [valState, setValState] = useState(0)
  const [inputFromState, bindInputFrom] = useInput()
  const [inputToState, bindInputTo] = useInput()
  const clickHandler = () => {
    setValState(randomNumFromTo(inputFromState, inputToState))
  }

  return (
    <>
      <input placeholder="from" style={style} {...bindInputFrom} />
      <input placeholder={'to'} style={style} {...bindInputTo} />
      <button onClick={clickHandler}>Get random integer</button>
      <div>Random number: {valState}</div>
    </>
  )
}

const postObj = {
  title: 'random number',
  date: '2022.05.03',
  tags: ['JavaScript', 'function'],
  imgUrl: 'https://antonarbus.com/imgs/random.png',
  desc: 'random integer number function',
  body: (
    <>
      <p>Function returns integer number between values <i>from</i> & <i>to</i>.</p>

      <Code block jsx>{`
      function randomNumFromTo(from, to) {
        from = parseInt(from)
        to = parseInt(to)
        if (from === to && from === 0) [from, to] = [1, 100]
        if (isNaN(from) || isNaN(to)) [from, to] = [1, 100]
        if (from > to) [from, to] = [to, from]
        return Math.floor(Math.random() * (to - from + 1) + from);
      }
      `}</Code>

      <Code block jsx>{`
      import React, { useState } from 'react';
      import randomNumFromTo from '../../../helpers/functions/randomNumFromTo';
      import useInput from '../../../helpers/functions/useInput';
      const style = { width: '50px', marginRight: '10px' };

      function Component() {
        const [valState, setValState] = useState(0);
        const [inputFromState, bindInputFrom] = useInput()
        const [inputToState, bindInputTo] = useInput()
        const clickHandler = () => {
          setValState(randomNumFromTo(inputFromState, inputToState))
          turnAnimationOn()
        }

        return (
          <>
            <input placeholder='from' style={style} {...bindInputFrom} />
            <input placeholder={'to'} style={style} {...bindInputTo} />
            <button onClick={clickHandler}>Get random integer</button>
            <div> Random number: {valState}</div>
          </>
        )
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
