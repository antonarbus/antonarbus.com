'use client'


import { Code, React, jsxToStr } from '/components/post/reExport'
import returnUniquesArr from '/functions/uniquesArr'

function Component() {
  const prepareInputArr = (str) => str.split(' ')
  const [inputValState, setInputValState] = React.useState('a a b b c c')
  const [outputState, setOutputState] = React.useState(JSON.stringify(returnUniquesArr(prepareInputArr(inputValState.trim()))))
  const updateInput = (e) => setInputValState(e.target.value)
  const onChangeHandler = (e) => {
    updateInput(e)
    const str = e.target.value.trim()
    const inputArr = prepareInputArr(str)
    const uniquesArr = returnUniquesArr(inputArr)
    setOutputState(JSON.stringify(uniquesArr))
  }

  return (
    <>
      <input type="text" value={inputValState} onChange={onChangeHandler} />
      <div>Uniques: {outputState}</div>
    </>
  )
}

const postObj = {
  title: 'uniques',
  date: '2022.05.03',
  tags: ['JavaScript', 'function'],
  imgUrl: 'https://antonarbus.com/imgs/unique elements.png',
  desc: 'unique elements in array',
  body: (
    <>
      <Code block jsx>{`
      const returnUniquesArr = (arr) => [...new Set(arr)]
      `}</Code>

      <Component />

      <Code block jsx>{`
      function Component() {
        const prepareInputArr = (str) => str.split(' ')
        const [inputValState, setInputValState] = React.useState('a a b b c c')
        const [outputState, setOutputState] = React.useState(JSON.stringify(returnUniquesArr(prepareInputArr(inputValState.trim()))))
        const updateInput = (e) => setInputValState(e.target.value)
        const onChangeHandler = (e) => {
          updateInput(e)
          const str = e.target.value.trim()
          const inputArr = prepareInputArr(str)
          const uniquesArr = returnUniquesArr(inputArr)
          setOutputState(JSON.stringify(uniquesArr))
        }
      
        return (
          <>
            <input type="text" value={inputValState} onChange={onChangeHandler} />
            <div>Uniques: {outputState}</div>
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
