'use client'

export default function isSomeWordInText(wordsArr, text) {
  const wordsArrL = wordsArr.map(el => el.toLowerCase())
  const textL = text.toLowerCase()
  return wordsArrL.some(elem => textL.includes(elem))
}
