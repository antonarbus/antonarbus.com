'use client'

import { Code, jsxToStr, H } from '/components/post/reExport'
import areWordsInText from '../helpers/areWordsInText'
import isSomeWordInText from '../helpers/isSomeWordInText'

const postObj = {
  title: 'are words in text',
  date: '2022.05.11',
  tags: ['JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/words.jpg',
  desc: 'function to check if all words from array are in text',
  body: (
    <>
      <H>Are all words in text</H>

      <Code block jsx>{`
      export default function areWordsInText(wordsArr, text) {
        const wordsArrL = wordsArr.map(el => el.toLowerCase())
        const textL = text.toLowerCase()
        return wordsArrL.every(elem => textL.includes(elem))
      }
      `}</Code>

      <div>
        <Code js>{"areWordsInText(['a', 'b', 'c'], 'abcd')"}</Code> ={' '}
        <b>{JSON.stringify(areWordsInText(['a', 'b', 'c'], 'abcd'))}</b>
      </div>
      <div>
        <Code js>{"areWordsInText(['a', 'b', 'q'], 'abcd')"}</Code> ={' '}
        <b>{JSON.stringify(areWordsInText(['a', 'b', 'q'], 'abcd'))}</b>
      </div>

      <H>Is some word in text</H>

      <Code block jsx>{`
      export default function isSomeWordInText(wordsArr, text) {
        const wordsArrL = wordsArr.map(el => el.toLowerCase())
        const textL = text.toLowerCase()
        return wordsArrL.some(elem => textL.includes(elem))
      }
      `}</Code>

      <div>
        <Code js>{"isSomeWordInText(['a', 'b', 'c'], 'abcd')"}</Code> ={' '}
        <b>{JSON.stringify(isSomeWordInText(['a', 'b', 'c'], 'abcd'))}</b>
      </div>
      <div>
        <Code js>{"isSomeWordInText(['a', 'b', 'q'], 'abcd')"}</Code> ={' '}
        <b>{JSON.stringify(isSomeWordInText(['a', 'b', 'q'], 'abcd'))}</b>
      </div>
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
