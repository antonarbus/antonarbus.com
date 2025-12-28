'use client'

import { Code, H, React, jsxToStr } from '/components/post/reExport'
import average from '../helpers/average'

function Component() {
  const [inputValState, setInputValState] = React.useState('1 2 3 4 5')
  const [averageState, setAverageState] = React.useState(average(inputValState.split(' ')))

  const onChangeHandler = (e) => {
    const inpVal = e.target.value
    setInputValState(inpVal)
    const numsArr = inpVal
      .match(/[-]{0,1}[\d]*[.]{0,1}[\d]+/g) // match numbers
      .filter((el) => el) // remove empty elements
    setAverageState(average(numsArr))
  }

  return (
    <>
      <input value={inputValState} onChange={onChangeHandler} />
      <div>Average: {averageState}</div>
    </>
  )
}

const postObj = {
  title: 'average',
  date: '2022.05.03',
  tags: ['JavaScript', 'function'],
  imgUrl: 'https://antonarbus.com/imgs/average.jpg',
  desc: 'average number function',
  body: (
    <>
      <H>For integers</H>

      <p>Simple version for integer arguments</p>

      <Code block jsx>{`
      const average = (...nums) => nums.reduce((accum, curVal) => accum + curVal) / nums.length
      `}</Code>

      <p>Same, but for arguments as primitives or in array, they can be numbers or strings.</p>

      <H>For reals and strings</H>

      <Code block jsx>{`
      const average = (...nums) => {
        let arr = []
        // may pass array or args separately
        if (!Array.isArray(nums)) arr = [...nums] // if primitive args supplied
        if (Array.isArray(nums)) arr = nums.flat(Infinity) // if array supplied
        const floatsArr = arr.map(el => parseFloat(el)) // in case numbers are passed as strings
        const average = floatsArr.reduce((accum, curVal) => accum + curVal) / arr.length
        const roundedNum = average.toFixed(2)
        return roundedNum
      }
      `}</Code>

      <Component />

      <H>Full code</H>

      <Code block jsx>{`
      function Component() {
        const [inputValState, setInputValState] = React.useState('1 2 3 4 5')
        const [averageState, setAverageState] = React.useState(average(inputValState.split(' ')))
      
        const onChangeHandler = (e) => {
          const inpVal = e.target.value
          setInputValState(inpVal)
          const numsArr = inpVal
            .match(/[-]{0,1}[\\d]*[.]{0,1}[\\d]+/g) // match numbers
            .filter(el => el) // remove empty elements
          setAverageState(average(numsArr))
        }
      
        return (
          <>
            <input value={inputValState} onChange={onChangeHandler}/>
            <div>Average: {averageState}</div>
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
