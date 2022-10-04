import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'assert in node',
  date: '2022.05.22',
  tags: ['test'],
  imgUrl: 'https://antonarbus.com/imgs/node.png',
  desc: 'assertion in node js',
  body: (
    <>
      <p>NodeJS has built-in assertion <Lnk path='https://nodejs.org/api/assert.html'>funtions</Lnk>.</p>

      <H>Basic</H>

      <Code block jsx>{`
      const assert = require('assert')
      describe('assert', function () {
        it.only('should pass', function () {
          assert(1 > 0)
        })
      })
      `}</Code>

      <Code block none>{`
      test
        ✔ assert

      1 passing (1ms)
      `}</Code>

      <H>Methods</H>

      <ul>
        <li><Code>equal</Code>, <Code>ok</Code>, <Code>assert</Code>, <Code>notEqual</Code> checks if a value is true with (==)</li>
        <li><Code>strictEqual</Code>, <Code>notStrictEqual</Code> checks if equal with (===)</li>
        <li><Code>deepStrictEqual</Code>, <Code>deepEqual</Code>, <Code>notDeepStrictEqual</Code> checks if equal with (===)</li>
        <li><Code>match</Code>, <Code>doesNotMatch</Code> expects to match the regular expression</li>
        <li><Code>ifError</Code> test if value is <code>null</code> or <code>undefined</code></li>
        <li><Code>throws</Code>, <Code>doesNotThrow</Code>, <Code>rejects</Code>, <Code>doesNotReject</Code>, <Code>fail</Code> NOT clear what they do, check later</li>
      </ul>

      <H>ok()</H>

      <p>Same as <Code>assert.equal()</Code> and <Code>assert()</Code></p>

      <Code block jsx>{`
      const assert = require('assert')

      describe('test', function () {
        it.only('assert', function () {
          assert.ok() // fail
          assert.ok(true)
          assert.ok(false) // fail
          assert.ok(false, 'its false') // fail
          assert.ok(0) // fail
          assert.ok(1)
          assert.ok(typeof 123 === 'number')
          assert.ok(typeof 123 === 'string') // fail
        })
      })
      `}</Code>

      <H>assert()</H>

      <p>Same as previous</p>

      <Code block jsx>{`
      it('assert', function () {
        assert() // fail
        assert(true)
        assert(false) // fail
        assert(false, 'its false') // fail
        assert(0) // fail
        assert(1)
        assert(typeof 123 === 'number')
        assert(typeof 123 === 'string') // fail
      })
      `}</Code>

      <H>strictEqual</H>

      <Code block jsx>{`
      const assert = require('assert')

      describe.only('node assert', function () {
        it('strictEqual', function () {
          assert.strictEqual(1, 2) // fail
          assert.strictEqual(1, 1)
          assert.strictEqual('Hello foobar', 'Hello World!') // fail
          const apples = 1
          const oranges = 2
          assert.strictEqual(apples, oranges, \`apples \${apples} !== oranges \${oranges}\`) // fail
          assert.strictEqual(1, '1', new TypeError('Inputs are not identical')) // fail
        })
      })
      `}</Code>

      <H>deepStrictEqual</H>

      <Code block jsx>{`
      it('deepStrictEqual', function () {
        assert.deepStrictEqual({ a: 1 }, { a: '1' }) // false
        const date = new Date()
        const object = {}
        const fakeDate = {}
        Object.setPrototypeOf(fakeDate, Date.prototype)
        assert.deepStrictEqual(object, fakeDate) // false
        assert.deepStrictEqual(date, fakeDate) // false
        assert.deepStrictEqual(NaN, NaN)
        assert.deepStrictEqual(new Number(1), new Number(1))
        assert.deepStrictEqual(new String('foo'), Object('foo'))
        assert.deepStrictEqual(-0, -0)
        assert.deepStrictEqual(0, -0) // false
        const symbol1 = Symbol()
        const symbol2 = Symbol()
        assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol1]: 1 })
        assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol2]: 1 }) // false
      })
      `}</Code>

      <H>match</H>

      <Code block jsx>{`
      it('match', function () {
        assert.match('I will fail', /w/)
        assert.match(123, /pass/) // fail
        assert.match('I will pass', /pass/)
      })
      `}</Code>

      <H>fail</H>

      <Code block jsx>{`
      it('ifError', function () {
        assert.ifError(null)
        assert.ifError(0) // fail
        assert.ifError('error') // fail
        assert.ifError(new Error()) // fail
      })
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
