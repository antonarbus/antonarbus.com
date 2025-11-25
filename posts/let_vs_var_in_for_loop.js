'use client'


import { Code, LazyImg, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'let vs var in for loop',
  date: '2022.02.17',
  tags: ['JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/let_var_for_loop_timeout.jpg',
  desc: 'let vs var in for loop with timeout',
  body: (
    <>
      <p>Look at the results of <code>for...loop</code> with <code>let</code>, <code>var</code>, <Code js>setTimeout()</Code> function.</p>
      <LazyImg src='/imgs/let_var_for_loop_timeout/forLoopVarLetTimeoutImg.jpeg' width='600px' />
      <ul>
        Last result is not obvious:
        <li><code>var</code> has a functional scope, not block one</li>
        <li><code>for...loop</code> executes <Code js>setTimeout()</Code> 5 times</li>
        <li>timeout callbacks are sent into the execution queue and wait when call stack is empty</li>
        <li><code>for...loop</code> is finished</li>
        <li>callbacks are triggered one by one</li>
        <li>at that time global <code>i</code> variable is <code>5</code></li>
        <li>all callbacks log <code>5</code> into console</li>
        <li>I expected <code>i = 4</code> at the end of the <code>for...loop</code></li>
        <li>but surprisingly <code>for...loop</code> increments <code>i</code> last time, even though condition <code>{'i < 5'}</code> is not <code>true</code> and it does not fire code in its body</li>
        <li>bellow can see the prove</li>
      </ul>
      <LazyImg src='/imgs/let_var_for_loop_timeout/prove1.png' width='300px' />
      <LazyImg src='/imgs/let_var_for_loop_timeout/prove2.png' width='300px' />

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
