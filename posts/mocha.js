'use client'


import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'mocha',
  date: '2022.05.21',
  tags: ['test'],
  imgUrl: 'https://antonarbus.com/imgs/mocha.png',
  desc: 'mocha test framework',
  body: (
    <>
      <p><Lnk path='https://mochajs.org/'>Mocha</Lnk> is a test framework for NodeJS.</p>

      <H>Installation</H>

      <p><Code bash> npm install --save-dev mocha</Code></p>

      <H>Example</H>

      <p>In <code>test</code> folder add file.</p>

      <Code block jsx>{`
      const assert = require('assert')
      describe('Array', () => {
        it('should return -1 when the value is not present', () => {
          assert.equal([1, 2, 3].indexOf(4), -1)
        })
      })
      `}</Code>

      <p>Add script in <code>package.json</code></p>

      <Code block json>{`
      "scripts": {
        "mocha": "mocha"
      },
      `}</Code>

      <p>Start test with <Code bash>npm run mocha</Code>.</p>

      <p>Output</p>

      <Code block none>{`
      Array
        ✔ should return -1 when the value is not present
      `}</Code>

      <p>In this example mocha uses built-in <Lnk path='https://nodejs.org/api/assert.html#assert'>node assertion</Lnk>, but we can use any, like <Lnk path='https://www.chaijs.com/'>chai</Lnk> or <Lnk path='https://github.com/LearnBoost/expect.js'>expect</Lnk></p>

      <H>Hooks</H>

      <Code block jsx>{`
      describe('hooks', function () {
        before('some description', function () {
          console.log('runs once before the first test in this block')
        })

        after('some description', function () {
          console.log('runs once after the last test in this block')
        })

        beforeEach('some description', function () {
          console.log('runs before each test in this block')
        })

        afterEach('some description', function () {
          console.log('runs after each test in this block')
        })

        it('test hooks1', () => {
          assert.equal(1, 1)
          assert.equal(2, 2)
        })

        it('test hooks2', () => {
          assert.equal(1, 1)
          assert.equal(2, 2)
        })
      })
      `}</Code>

      <p>Output</p>

      <Code block none>{`
      hooks
        runs once before the first test in this block
        runs before each test in this block
            ✔ test hooks1
        runs after each test in this block
        runs before each test in this block
            ✔ test hooks2
        runs after each test in this block
        runs once after the last test in this block
      `}</Code>

      <H>Only</H>

      <p>Only 2nd test will run.</p>

      <Code block jsx>{`
      describe('hooks', function () {
        it('test1', () => {
          assert.equal(1, 1)
        })

        it.only('test2', () => {
          assert.equal(1, 1)
        })
      })
      `}</Code>

      <Code block jsx>{`
      describe.only('set 1', function () {
        it('test1', () => {
          assert.equal(1, 1)
        })

        it('test2', () => {
          assert.equal(1, 1)
        })
      })

      describe('set 2', function () {
        it('test1', () => {
          assert.equal(1, 1)
        })

        it('test2', () => {
          assert.equal(1, 1)
        })
      })
      `}</Code>

      <H>Skip</H>

      <Code block jsx>{`
      describe('skip', () => {
        it('test1', () => {
          assert.equal(1, 1)
        })
        it.skip('test2', () => {
          assert.equal(1, 1)
        })
      })
      `}</Code>

      <p>Result</p>

      <Code block none>{`
      skip
        ✔ test1
        - test2
      1 passing (3ms)
      1 pending
      `}</Code>

      <H>Retry</H>

      <p>Make several retries until success.</p>

      <Code block jsx>{`
      describe('retry', function () {
        this.retries(2)

        it('test', function () {
          const num = Math.random()
          console.log(num)
          assert.equal(num > 0.9, true)
        })
      })
      `}</Code>

      <p>or</p>

      <Code block jsx>{`
      describe('retry', function () {
        it('test', function () {
          this.retries(2)
          const num = Math.random()
          console.log(num)
          assert.equal(num > 0.9, true)
        })
      })
      `}</Code>

      <p>or pass it via terminal</p>

      <Code bash>npm run mocha -- --retries 5</Code>

      <p>Output</p>

      <Code block none>{`
      retry
      0.14763852688168244
      0.21161851333340276
      0.9364510602907048
          ✔ test
        1 passing (4ms)
      `}</Code>

      <H>Dynamic tests</H>

      <Code block jsx>{`
      const assert = require('assert')

      const add = args => args.reduce((prev, curr) => prev + curr, 0)

      describe.only('add()', function () {
        const tests = [
          { args: [1, 2], expected: 3 },
          { args: [1, 2, 3], expected: 6 },
          { args: [1, 2, 3, 4], expected: 10 }
        ]

        tests.forEach(({ args, expected }) => {
          it(\`correctly adds \${args.length} args\`, function () {
            const res = add(args)
            assert.strictEqual(res, expected)
          })
        })
      })
      `}</Code>

      <p>Output</p>

      <Code block none>{`
      add()
        ✔ correctly adds 2 args
        ✔ correctly adds 3 args
        ✔ correctly adds 4 args

      3 passing (3ms)
      `}</Code>

      <H>Test specific files</H>

      <Code bash>{'npm run mocha "./test/myTest.test.js"'}</Code>

      <p>or</p>

      <Code bash>{'npm run mocha --file "./test/myTest.test.js"'}</Code>

      <H>Watch</H>

      <Code bash>npm run mocha -- --watch </Code>

      <p>{"Not clear why we need to put additional '--'"}</p>
      <p>May be it somehow separates npm flags from internal mocha flags, don't know.</p>

      <H>Several flags</H>

      <Code bash>{'npm run mocha --file "./test/myTest.test.js" -- --retries 5 --watch'}</Code>

      <H>Reporter</H>

      <p>Changes test output representation</p>

      <Code bash>npm run mocha -- --reporter nyan</Code>

      <p>Output</p>

      <Code block jsx>{`
      9  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-__,------,
      53  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-__,------,
      0   -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-__|  /\_/\ 
      0   -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_~|_( ^ .^) 
          -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ ""  "" 

        53 passing (34ms)
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
