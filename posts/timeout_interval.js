'use client'


import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'setTimeout & setInterval',
  date: '2021.12.28',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'setTimeout & setInterval in JavaScript',
  body: (
    <>
      <H>setTimeout()</H>

      <ul>
        <li>runs a function after some time</li>
        <li>runs a function after the current code has finished</li>
      </ul>

      <Code block jsx>{`
        function sayHi() { alert('Hello');}
        setTimeout(sayHi, 1000);
        // or
        setTimeout(() => alert('Hello'), 1000);
        // but not
        setTimeout(sayHi(), 1000); // wrong! // Pass a function, but don’t run it
      `}</Code>

      <Hs>Pass parameters</Hs>

      <Code block jsx>{`
        function sayHi(phrase, who) {
          alert( phrase + ', ' + who );
        }
        setTimeout(sayHi, 1000, "Hello", "John"); // pass params as 3rd arg
      `}</Code>

      <Hs>No delay</Hs>

      <ul>
        <li><Code>setTimeout()</Code> adds function to the end of a <i>call stack</i></li>
        <li>Function is scheduled to run “right after” the current script</li>
        <li>HTML5 standard says: “after five nested timers, the interval is forced to be at least 4 milliseconds”</li>
        <li>For server-side JavaScript, that limitation does not exist</li>
        <li>Function will be executed after the render</li>
        <li>Big task can be split into sub-tasks scheduled by <Code>setTimeout()</Code> and UI will be responsive we will see updates</li>
      </ul>

      <Code block jsx>{`
        const func = () => console.log('I am function')
        func();
        setTimeout(() => console.log('I am console'))
        func();

        // I am function
        // I am function
        // I am console
      `}</Code>

      <Hs>Canceling with clearTimeout</Hs>

      <Code block jsx>{`
        let timerId = setTimeout(() => alert("never happens"), 1000);
        clearTimeout(timerId);
      `}</Code>

      <H>setInterval()</H>

      <ul>
        <li>run a function regularly, starting after the interval</li>
        <li>same syntax as <Code>setTimeout()</Code></li>
        <li>call <Code>clearInterval(timerId)</Code> to stop further calls</li>
      </ul>

      <Code block jsx>{`
        // repeat with the interval of 2 seconds
        let timerId = setInterval(() => alert('tick'), 2000); 
        // after 5 seconds stop
        setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000); 
      `}</Code>

      <H>Nested setTimeout()</H>

      <ul>
        <li>Similar to setInterval()</li>
        <li>More flexible</li>
        <li>Allows to set the delay more precisely</li>
        <li>Guarantees the fixed delay, but setInterval() doesn't</li>
      </ul>

      <Code block jsx>{`
        let timerId = setTimeout(function tick() {
          alert('tick');
          timerId = setTimeout(tick, 2000); 
        }, 2000);
      `}</Code>

      <H>Garbage collection</H>

      <ul>
        <li>A function references the outer lexical environment</li>
        <li>While timeout/interval live,  lexical environment lives and outer variables live too</li>
        <li>They may take much more memory than the function itself</li>
        <li>Thus when we don’t need the scheduled function anymore, better to cancel it</li>
      </ul>
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
