// @ts-check
import { Code, H, React, jsxToStr } from '/components/post/reExport'

const sum = (...nums) => {
  let arr = []
  // may pass array or args separately
  if (!Array.isArray(nums)) arr = [...nums] // if primitive args supplied
  if (Array.isArray(nums)) arr = nums.flat(Infinity) // if array supplied
  const floatsArr = arr.map(el => parseFloat(el)) // in case numbers are passed as strings
  const sum = floatsArr.reduce((accum, curVal) => accum + curVal, 0)
  return sum
}

function Component() {
  const [inputValState, setInputValState] = React.useState('1 2 3 4 5')
  const [sumState, setSumState] = React.useState(sum(inputValState.split(' ')))

  const onChangeHandler = (e) => {
    const inpVal = e.target.value
    setInputValState(inpVal)
    const numsArr = inpVal
      .match(/[-]{0,1}[\d]*[.]{0,1}[\d]+/g) // match numbers
      .filter(el => el) // remove empty elements
    setSumState(sum(numsArr))
  }

  return (
    <>
      <input value={inputValState} onChange={onChangeHandler}/>
      <div>sum: {sumState}</div>
    </>
  )
}

const postObj = {
  title: 'sum',
  date: '2022.06.11',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/sum.png',
  desc: 'sum function for JavaScript',
  body: (
    <>
      <Component />

      <H>Idea</H>

      <Code block jsx>{`
      const sum = (arr) => arr.reduce((a, b) => a + b, 0)
      `}</Code>

      <H>Improved version</H>

      <p>Argument can be numbers or strings or array of them.</p>

      <Code block jsx>{`
      const sum = (...nums) => {
        let arr = []
        // may pass array or args separately
        if (!Array.isArray(nums)) arr = [...nums] // if primitive args supplied
        if (Array.isArray(nums)) arr = nums.flat(Infinity) // if array supplied
        const floatsArr = arr.map(el => parseFloat(el)) // in case numbers are passed as strings
        const sum = floatsArr.reduce((accum, curVal) => accum + curVal, 0)
        return sum
      }
      `}</Code>

      <H>Component</H>

      <Code block jsx>{`
      function Component() {
        const [inputValState, setInputValState] = React.useState('1 2 3 4 5')
        const [sumState, setSumState] = React.useState(sum(inputValState.split(' ')))

        const onChangeHandler = (e) => {
          const inpVal = e.target.value
          setInputValState(inpVal)
          const numsArr = inpVal
            .match(/[-]{0,1}[\\d]*[.]{0,1}[\\d]+/g) // match numbers
            .filter(el => el) // remove empty elements
          setSumState(sum(numsArr))
        }

        return (
          <>
            <input value={inputValState} onChange={onChangeHandler}/>
            <div>sum: {sumState}</div>
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
