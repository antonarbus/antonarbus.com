import { Code, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'eval',
  date: '2021.12.29',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/eval.jpg',
  desc: 'Eval in JavaScript',
  body: (
    <>
      <ul>
        <li><Code>eval()</Code> function allows to execute a string of code</li>
        <li>Minifiers badly work with <Code>eval()</Code>, do not use it</li>
      </ul>

      <Code block jsx>{`
        let code = 'alert("Hello")'
        eval(code) // Hello

        let value = eval('1+1')
        value // 2
      `}</Code>

      <ul>
        <li>Eval’ed code is executed in the current lexical environment</li>
        <li>In strict mode, <Code>eval()</Code> has its own lexical environment</li>
      </ul>

      <Code block jsx>{`
        let a = 1
        function f() {
          let a = 2
          eval('alert(a)') 
        }
        f() // 2
      `}</Code>

      <Code block jsx>{`
        'use strict'
        eval("let x = 5; function f() {}")
        alert(typeof x) // undefined 
      `}</Code>

      <p>If eval’ed code doesn’t use outer variables, call <Code> eval()</Code> as <Code> window.eval()</Code></p>

      <Code block jsx>{`
        let x = 1
        {
          let x = 5
          window.eval('alert(x)') // 1 (global variable)
        }
      `}</Code>

      <p>If eval’ed code needs local variables, change<Code>eval()</Code> to <Code> new Function()</Code> and pass them as arguments</p>

      <Code block jsx>{`
        let f = new Function('a', 'alert(a)')
        f(5) // 5
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
