'use client'

import { Code, React, jsxToStr } from '/components/post/reExport'
import returnShuffledArr from '../helpers/shuffleArr'

function Component() {
  const [arrayState, setArrayState] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const onClickHandler = () => {
    const shuffledArr = returnShuffledArr(arrayState)
    setArrayState([...shuffledArr])
  }

  return (
    <>
      <div>{JSON.stringify(arrayState)}</div>
      <button onClick={onClickHandler}>Shuffle</button>
    </>
  )
}

const postObj = {
  title: 'shuffle array',
  date: '2022.05.03',
  tags: ['JavaScript', 'function'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'shuffle array function',
  body: (
    <>
      <Code block jsx>{`
      const returnShuffledArr = (arr) => arr.sort(() => 0.5 - Math.random())
      `}</Code>

      <Component />

      <Code block jsx>{`
    function Component() {
        const [arrayState, setArrayState] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        const onClickHandler = () => {
          const shuffledArr = returnShuffledArr(arrayState)
          setArrayState([...shuffledArr])
        }
      
        return (
          <>
            <div>{JSON.stringify(arrayState)}</div>
            <button onClick={onClickHandler}>Shuffle</button>
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
