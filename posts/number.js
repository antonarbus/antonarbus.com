import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'number',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/numbers.jpg',
  desc: 'Numbers in JavaScript',
  body: (
    <>
      <H>Basic numbers</H>

      <Code block jsx>{`
        let billion = 1000000000;
        let billion = 1_000_000_000; // same thing
        let billion = 1e9;  // 1 billion, literally: 1 and 9 zeroes
        let ms = 0.000001;
        let ms = 1e-6; // six zeroes to the left from 1
      `}</Code>

      <H>Bigint</H>

      <Code block jsx>{`
        const bigint = 1234567890123456789012345678901234567890n
        const sameBigint = BigInt("1234567890123456789012345678901234567890")
        const bigintFromNumber = BigInt(10) // same as 10n
        1n + 2n // 3
        5n / 2n // 2 // All operations on bigints return bigints // returns the result rounded towards zero, w/o the decimal part
        1n + 2 // Error // can’t mix bigints and regular numbers

        let bigint = 1n
        let number = 2
        bigint + BigInt(number) // 3
        Number(bigint) + number // 3
        +bigint  // error // The unary plus is not supported on bigints

        // Comparisons // work with bigints and numbers just fine:
        2n > 1n // true
        2n > 1 // true

        1 == 1n // true
        1 === 1n // false

        // Boolean operations // bigints behave like numbers
        if (0n) { /* never executes */ }
        1n || 2 // 1 (1n is considered truthy)
        0n || 2 // 2 (0n is considered falsy)
      `}</Code>

      <H>Hex, binary and octal numbers</H>

      <Code block jsx>{`
        0xff// 255 // hex
        0xFF// 255 (the same, case doesn't matter
        let a = 0b11111111; // binary form of 255
        let b = 0o377; // octal form of 255
      `}</Code>

      <H><Code>toString(base)</Code></H>

      <Code block jsx>{`
        let num = 255;
        num.toString() // "255"
        255..toString() // "255" // note two dots ".." for calling method directly on a number
        (255).toString() // "255"
        num.toString(16) // "ff" // hex
        num.toString(2) // "11111111" // binary

        // The base can vary from 2 to 36. By default it’s 10.
      `}</Code>

      <H>Rounding</H>

      <Code block jsx>{`
        const a = 3.1
        Math.floor(a) // 3 // Rounds down
        Math.ceil(a) // 4 // Rounds up
        Math.round(a) // 3 // Rounds to the nearest integer
        Math.trunc(a) // 3 // Removes anything after the decimal

        Math.floor(1.23456 * 100) / 100 // 1.23 // round the number to 2nd digit
        12.36.toFixed(1) // "12.4" // round the number to 1st digit --> string
      `}</Code>

      <H><Code>isFinite()</Code> & <Code>isNaN()</Code></H>

      <Code block jsx>{`
        // isNaN(value) converts its argument to a number and then tests it for being NaN
        isNaN(5) // false
        isNaN(NaN) // true
        isNaN("str") // true
        NaN === NaN // false

        // isFinite(value) converts its argument to a number and 
        // returns true if it’s a regular number, not NaN/Infinity/-Infinity:
        isFinite("15") // true
        isFinite("str") // false, because a special value: NaN
        isFinite(Infinity) // false, because a special value: Infinity
      `}</Code>

      <H><Code>Object.is()</Code></H>

      <Code block jsx>{`
        // same as === but works also for the edge cases

        Object.is("hi", "hi") // true

        NaN === NaN // false
        Object.is(NaN, NaN) // true

        0 == -0 // true
        Object.is(0, -0)  // false
      `}</Code>

      <H><Code>parseInt()</Code> & <Code>parseFloat()</Code></H>

      <Code block jsx>{`
        +"100px" // NaN
        parseInt('100px') // 100
        parseInt('12.3') // 12, only the integer part is returned
        parseInt('a123') // NaN // the first symbol stops the process
        parseInt('0xff', 16) // 255
        parseInt('ff', 16) // 255

        parseFloat('12.5em') // 12.5
        parseFloat('12.3.4') // 12.3, the second point stops the reading
      `}</Code>

      <H><Code>Math.random()</Code></H>

      <Code block jsx>{`
        Math.random(); // returns a random number from 0 to 1 (not including 1)
      `}</Code>

      <H><Code>Math.max()</Code></H>

      <Code block jsx>{`
          Math.max(3, 5, -10, 0, 1); // 5
      `}</Code>

      <H><Code>Math.pow()</Code></H>

      <Code block jsx>{`
          Math.pow(2, 10); // 2 in power 10 = 1024
      `}</Code>

      <p>Other functions find at<Lnk path="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math">mdn</Lnk></p>
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
