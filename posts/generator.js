import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'generator',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/generator.jpg',
  desc: 'Generator in JavaScript',
  body: (
    <>
      <ul>
        <li>Regular function returns single value or nothing</li>
        <li>Generator can return multiple values, one after another by calling <code>yield</code></li>
        <li>Generator function needs to have a <code>*</code> symbol: <code>function*</code></li>
        <li>Generator function creates a generator object <code>[object Generator]</code></li>
        <li>Code execution does not start on generator creation, but on <Code>.next()</Code> call</li>
        <li>Result of <Code>.next()</Code> is an object with two properties: <Code>{'{value: 1, done: false}'}</Code></li>
      </ul>

      <H>Syntax</H>

      <Code block jsx>{`
      function* generateSequence1() {
        yield 1
        yield 2
        yield 3
      }
  
      let generator1 = generateSequence1() // generateSequence {<suspended>}
      let one = generator1.next() // {value: 1, done: false}
      let two = generator1.next() // {value: 2, done: false}
      let three = generator1.next() // {value: 3, done: false}
      let four = generator1.next() // {value: undefined, done: true}

      // with return
      function* generateSequence2() {
        yield 1
        yield 2
        return 3
      }
  
      let generator2 = generateSequence2() 
      let one = generator2.next() // {value: 1, done: false}
      let two = generator2.next() // {value: 2, done: false}
      let three = generator2.next() // {value: 3, done: true}
      let four = generator2.next() // {value: undefined, done: true}
      `}</Code>

      <H>Generator is iterable</H>

      <Code block jsx>{`
      // without return
      for(let value of generator1) {
        console.log(value) // 1, 2, 3
      }

      // with return
      for(let value of generator2) {
        console.log(value) // 1, 2
      }
      `}</Code>

      <H>Spread syntax</H>

      <Code block jsx>{`
      [...generator1] // [1, 2, 3]
      `}</Code>

      <H>Iterable object based on generator</H>

      <Code block jsx>{`
      let range = {
        from: 1,
        to: 5,
      
        *[Symbol.iterator]() {
          for(let value = this.from; value <= this.to; value++) {
            yield value;
          }
        }
      };
      
      alert( [...range] ); // 1,2,3,4,5
      `}</Code>

      <H>Generator inside generator - <code>yield*</code></H>

      <p><code>yield*</code> directive delegates the execution to another generator</p>

      <Code block jsx>{`
      function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) yield i;
      }

      function* generatePasswordCodes() {
        yield* generateSequence(48, 57) // 0..9 // for (let i = 48; i <= 57; i++) yield i;
        yield* generateSequence(65, 90) // A..Z
        yield* generateSequence(97, 122) // a..z
      }

      let str = ''
      for(let code of generatePasswordCodes()) {
        str += String.fromCharCode(code)
      }
      alert(str) // 0..9A..Za..z
      `}</Code>

      <H>Pass values from<code>next</code> to <Code> yield</Code></H>

      <p><code>yield</code> not only returns the result to the outside, but can pass the value inside the generator</p>

      <Code block jsx>{`
      function* gen() {
        let ask1 = yield "2 + 2 = ?"
        alert(ask1) // 4
        let ask2 = yield "3 * 3 = ?"
        alert(ask2) // 9
      }
      
      let generator = gen()
      alert( generator.next().value ) // "2 + 2 = ?" // first next() should be always w/o arg 
      alert( generator.next(4).value ) // "3 * 3 = ?"
      alert( generator.next(9).done ) // true
      `}</Code>

      <H>Throw error into generator</H>

      <p>Outer code may pass error into a generator</p>

      <Code block jsx>{`
      function* gen() {
        try {
          yield "start"
          alert("not reach here")
          yield "end"
        } catch(e) {
          alert(e) // shows the error
        }
      }
      
      let generator = gen()
      alert(generator.next().value)
      generator.throw(new Error("error"))
      alert(generator.next().value)
      // start // error // undefined
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
