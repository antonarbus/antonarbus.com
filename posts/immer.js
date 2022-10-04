import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'
import { produce } from 'immer'

const abcde = { a: 'a', b: { c: 'c', d: { e: 'e' } } }

const abcdef = { ...abcde, b: { ...abcde.b, d: { ...abcde.b.d, f: 'f' } } }
// console.log(abcdef)
// { a: 'a', b: { c: 'c', d: { e: 'e' , f: 'f' } } }

// same as
const abcdef2 = produce(abcde, (obj) => {
  obj.b.d.f = 'f'
})
// console.log(abcdef2)
// { a: 'a', b: { c: 'c', d: { e: 'e' , f: 'f' } } }

const postObj = {
  title: 'immer',
  date: '2022.05.24',
  tags: ['state', 'tool'],
  imgUrl: 'https://antonarbus.com/imgs/immer.png',
  desc: 'package to clone and modify an object',
  body: (
    <>
      <H>Idea</H>

      <p>With <Lnk path='https://www.npmjs.com/package/immer'>Immer</Lnk> we can deeply clone an object and modify the property. Handy for a state update in React.</p>

      <H>Installation</H>

      <p><Code bash>npm i immer</Code></p>

      <H>Without immer</H>

      <Code block jsx>{`
      const abcde = { a: 'a', b: { c: 'c', d: { e: 'e' } } }
      
      const abcdef = { ...abcde, b: { ...abcde.b, d: { ...abcde.b.d, f: 'f' } } }
      // { a: 'a', b: { c: 'c', d: { e: 'e' , f: 'f' } } }
      `}</Code>

      <H>With immer</H>

      <Code block jsx>{`
      import { produce } from 'immer'
      const abcde = { a: 'a', b: { c: 'c', d: { e: 'e' } } }
      const abcdef = produce(abcde, (obj) => {
        obj.b.d.f = 'f'
      })
      // { a: 'a', b: { c: 'c', d: { e: 'e' , f: 'f' } } }
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
