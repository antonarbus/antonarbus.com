'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'loop',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/loops.jpg',
  desc: 'Loops in JavaScript',
  body: (
    <>
      <H>For</H>

      <Code block jsx>{`
          for (let i=0; i < 10; i++) {
            console.log('Loop ' + i);
          }

          // or in one line
          for (let i=0; i < 10; i++) console.log('Loop ' + i);
      `}</Code>

      <H>For without arguments</H>

      <Code block jsx>{`
          let i = 0; // we have i already declared and assigned
          for (; i < 3; i++) { // no need for "begin"
            alert( i ); // 0, 1, 2
          }

          // same as while (i < 3)
          let i = 0;
          for (; i < 3;) {
            alert( i++ );
          }
      `}</Code>

      <H>Continue & break</H>

      <Code block jsx>{`
          for (let i=0; i < 10; i++) {
            if (i == 3) continue; // skip
            if (i == 9) break; // end loop
            console.log('Loop ' + i);
          }
      `}</Code>

      <H>While</H>

      <Code block jsx>{`
        let i = 0;
        while (i < 3) {
          i++; // 0, 1, 2
          console.log(i);
        }
      `}</Code>

      <H>Do</H>

      <Code block jsx>{`
        let i = 0;
        do {
          i++;
          console.log(i);
        } while (i < 10) 
      `}</Code>

      <H>Labels for break/continue</H>

      <Code block jsx>{`
          // break out from nested loops
          outer:
          for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
              if (j == 5) break outer;
              console.log(i, j);
            }
          }
          console.log('done');
      `}</Code>

      <H>for...in</H>

      <p>Iterates over all enumerable properties of an object that are keyed by strings (ignoring ones keyed by Symbols)</p>

      <Code block jsx>{`
        let obj = { name: "John", age: 30, isAdmin: true };
        
        // iterates over properties of an object
        for (let key in obj) {
          console.log( key, obj[key] );  // name John, age 30, isAdmin true
        }
      `}</Code>

      <H>for...of</H>

      <p>Iterates over iterable objects</p>

      <Code block jsx>{`
        const arr = ['a', 'b', 'c'];

        for (const element of arr) {
          console.log(element); // a b c
        }
      `}</Code>

      <H>forEach</H>

      <p>Executes a provided function once for each array element</p>

      <Code block jsx>{`
        const arr = ['a', 'b', 'c'];
        arr.forEach(element => console.log(element)); // a b c
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
