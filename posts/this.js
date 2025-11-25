'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'this',
  date: '2022.07.11',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/this.png',
  desc: 'THIS in JavaScript',
  body: (
    <>
      <H>Bind context</H>

      <p>Look at the example where we loose context in function and need to bind it if assign it to external variable.</p>

      <Code block jsx>{`
      const obj = {
        number: 5,
        showNumber: function() { alert(obj.number) },
        showNumberViaThis: function() { alert(this.number) } 
      }
      obj.showNumber() // 5
      obj.showNumberViaThis() // 5


      const myShowNumber = obj.showNumber
      myShowNumber() // 5

      const myShowNumberViaThis = obj.showNumberViaThis
      myShowNumberViaThis() // undefined

      const myShowNumberViaThisWithBind = obj.showNumberViaThis.bind(obj)
      myShowNumberViaThisWithBind() // 5
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
