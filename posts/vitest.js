import {
  Code,
  H,
  Hs,
  LazyImg,
  Lnk,
  React,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  jsxToStr,
  ComponentFromHtmlString
} from '/components/post/reExport'

const postObj = {
  title: 'vitest',
  date: '2025.04.17',
  tags: ['test', 'javascript'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'vitest',
  body: (
    <>
      <H>Vitest</H>

      <ul>
        <li>
          <Lnk path="https://vitest.dev/">https://vitest.dev/</Lnk>
        </li>
        <li>
          <Code>npm i -D vitest</Code>
        </li>

        <Code block json>{`
          {
            "scripts": {
              "test": "vitest"
            }
          }
        `}</Code>
      </ul>

      <H>Example</H>

      <Code block jsx>{`
        import { expect, test } from 'vitest'
        import { sum } from './sum.js'

        test('adds 1 + 2 to equal 3', () => {
          expect(sum(1, 2)).toBe(3)
        })
      `}</Code>

      <H>Parallel tests</H>

      <Code block jsx>{`
        import { describe, it } from 'vitest'

        // The two tests marked with concurrent will be started in parallel
        describe('suite', () => {
          it('serial test', async () => { /* ... */ })
          it.concurrent('concurrent test 1', async ({ expect }) => { /* ... */ })
          it.concurrent('concurrent test 2', async ({ expect }) => { /* ... */ })
        })
      `}</Code>

      <Code block jsx>{`
        import { describe, it } from 'vitest'

        // All tests within this suite will be started in parallel
        describe.concurrent('suite', () => {
          it('concurrent test 1', async ({ expect }) => { /* ... */ })
          it('concurrent test 2', async ({ expect }) => { /* ... */ })
          it.concurrent('concurrent test 3', async ({ expect }) => { /* ... */ })
        })
      `}</Code>

      <H>In-source testing</H>

      <ul>
        <li>My add test into your implementation source code </li>
        <li>
          Allows to share the same closure as the implementations and able to test against private
          states without exporting
        </li>
      </ul>

      <Code block jsx>{`
        // the implementation
        export function add(...args: number[]): number {
          return args.reduce((a, b) => a + b, 0)
        }

        // in-source test suites
        if (import.meta.vitest) {
          const { it, expect } = import.meta.vitest
          it('add', () => {
            expect(add()).toBe(0)
            expect(add(1)).toBe(1)
            expect(add(1, 2, 3)).toBe(6)
          })
        }
      `}</Code>

      <H>Type Testing</H>

      <Code block jsx>{`
        import { assertType, expectTypeOf, test } from 'vitest'
        import { mount } from './mount.js'

        test('my types work properly', () => {
          expectTypeOf(mount).toBeFunction()
          expectTypeOf(mount).parameter(0).toMatchTypeOf<{ name: string }>()

          // @ts-expect-error name is a string
          assertType(mount({ name: 42 }))
        })
      `}</Code>

      <H>test (it) api</H>

      <Code block jsx>{`
        import { expect, test } from 'vitest'

        test('should work as expected', () => {
          expect(Math.sqrt(4)).toBe(2)
        })

        it('should work as expected', () => {
          expect(Math.sqrt(4)).toBe(2)
        })

      `}</Code>

      <Hs>skip</Hs>

      <Code block jsx>{`
        import { assert, test } from 'vitest'

        test.skip('skipped test', () => {
          // Test skipped, no error
          assert.equal(Math.sqrt(4), 3)
        })  
      `}</Code>

      <Hs>skipIf</Hs>

      <Code block jsx>{`
        import { assert, test } from 'vitest'

        const isDev = process.env.NODE_ENV === 'development'

        test.skipIf(isDev)('prod only test', () => {
          // this test only runs in production
        })
      `}</Code>

      <Hs>runIf</Hs>

      <p>
        Opposite to <code>skipIf</code>
      </p>

      <Code block jsx>{`
        import { assert, test } from 'vitest'

        const isDev = process.env.NODE_ENV === 'development'

        test.runIf(isDev)('dev only test', () => {
          // this test only runs in development
        })
      `}</Code>

      <Hs>only</Hs>

      <p>Only run certain tests in a given suite</p>

      <Code block jsx>{`
        import { assert, test } from 'vitest'

        test.only('test', () => {
          // Only this test (and others marked with only) are run
          assert.equal(Math.sqrt(4), 2)
        })
      `}</Code>

      <Hs>concurrent</Hs>

      <p>Run tests in parallel</p>

      <Code block jsx>{`
        import { describe, test } from 'vitest'

        // The two tests marked with concurrent will be run in parallel
        describe('suite', () => {
          test('serial test', async () => { /* ... */ })
          test.concurrent('concurrent test 1', async () => { /* ... */ })
          test.concurrent('concurrent test 2', async () => { /* ... */ })
        })
      `}</Code>

      <Hs>sequential</Hs>

      <p>
        Marks a test as sequential. This is useful if you want to run tests in sequence within
        describe.concurrent
      </p>

      <Code block jsx>{`
        import { describe, test } from 'vitest'

        // with config option { sequence: { concurrent: true } }
        test('concurrent test 1', async () => { /* ... */ })
        test('concurrent test 2', async () => { /* ... */ })

        test.sequential('sequential test 1', async () => { /* ... */ })
        test.sequential('sequential test 2', async () => { /* ... */ })

        // within concurrent suite
        describe.concurrent('suite', () => {
          test('concurrent test 1', async () => { /* ... */ })
          test('concurrent test 2', async () => { /* ... */ })

          test.sequential('sequential test 1', async () => { /* ... */ })
          test.sequential('sequential test 2', async () => { /* ... */ })
        })
      `}</Code>

      <Hs>todo</Hs>

      <p>Tests to be implemented later</p>

      <Code block jsx>{`
        test.todo('unimplemented test')
      `}</Code>

      <Hs>fails</Hs>

      <p>Indicate that an assertion will fail explicitly</p>

      <Code block jsx>{`
        import { expect, test } from 'vitest'

        function myAsyncFunc() {
          return new Promise(resolve => resolve(1))
        }
        test.fails('fail test', async () => {
          await expect(myAsyncFunc()).rejects.toBe(1)
        })
      `}</Code>

      <H>describe api</H>

      <ul>
        <li>
          <Code>describe</Code> lets you organize your tests and benchmarks so reports are more
          clear
        </li>
        <li>
          {' '}
          <Code>describe</Code> blocks can be nested to create a hierarchy of tests
        </li>
      </ul>

      <Code block jsx>{`
        // basic.spec.ts
        // organizing tests

        import { describe, expect, test } from 'vitest'

        const person = {
          isActive: true,
          age: 32,
        }

        describe('person', () => {
          test('person is defined', () => {
            expect(person).toBeDefined()
          })

          test('is active', () => {
            expect(person.isActive).toBeTruthy()
          })

          test('age limit', () => {
            expect(person.age).toBeLessThanOrEqual(32)
          })
        })
      `}</Code>

      <Hs>apis</Hs>

      <ul>
        <li>
          <Code>describe</Code> - create a test suite
        </li>
        <li>
          <Code>describe.skip</Code> avoid running a particular describe block.
        </li>
        <li>
          <Code>describe.skipIf</Code> skip the suite whenever the condition is truthy
        </li>
        <li>
          <Code>describe.runIf</Code> opposite of describe.skipIf
        </li>
        <li>
          <Code>describe.only</Code> only run certain suites
        </li>
        <li>
          <Code>describe.concurrent</Code> runs all inner suites and tests in parallel
        </li>
        <li>
          <Code>describe.sequential</Code> tests in sequence within <code>describe.concurrent</code>
        </li>
        <li>
          <Code>describe.shuffle</Code> run all tests in random order
        </li>
        <li>
          <Code>describe.todo</Code> stub suites to be implemented later
        </li>
      </ul>

      <H>Tests lifecycle</H>

      <ul>
        <li>helps to avoid repeating setup and teardown code</li>
      </ul>

      <Hs>beforeEach, afterEach, beforeAll, afterAll</Hs>

      <ul>
        <li>
          <code>beforeEach</code> callback to be called before each of the tests in the current
          context
        </li>
        <li>
          accepts an optional cleanup function, equivalent to <code>afterEach</code>
        </li>
        <li>
          <code>afterEach</code>c allback to be called after each one of the tests in the current
          context
        </li>
        <li>
          <code>beforeAll</code> callback to be called once before starting to run all tests in the
          current context
        </li>
        <li>
          accepts an optional cleanup function equivalent to <code>afterAll</code>
        </li>
        <li>
          <code>afterAll</code> called once after all tests have run in the current context
        </li>
      </ul>

      <Code block jsx>{`
        import { beforeEach } from 'vitest'

        beforeEach(async () => {
          // Clear mocks and add some testing data after before each test run
          await stopMocking()
          await addUser({ name: 'John' })
        })

        // clean up function, called once after each test run
        return async () => {
          await resetSomething()
        }
      `}</Code>

      <Code block jsx>{`
        import { afterEach } from 'vitest'

        afterEach(async () => {
          await clearTestingData() // clear testing data after each test run
        })
      `}</Code>

      <Code block jsx>{`
        import { beforeAll } from 'vitest'

        beforeAll(async () => {
          // called once before all tests run
          await startMocking()

          // clean up function, called once after all tests run
          return async () => {
            await stopMocking()
          }
        })
      `}</Code>

      <Code block jsx>{`
        import { afterAll } from 'vitest'

        afterAll(async () => {
          await stopMocking() // this method is called after all tests run
        })
      `}</Code>

      <H>onTestFinished</H>

      <ul>
        <li>Called after the test has finished running</li>
        <li>
          It is called after <code>afterEach</code> hooks
        </li>
        <li>If you are running tests concurrently, you should use it</li>
        <li>useful when creating reusable logic</li>
      </ul>

      <Code block jsx>{`
        import { onTestFinished, test } from 'vitest'

        test('performs a query', () => {
          const db = connectDb()
          onTestFinished(() => db.close())
          db.query('SELECT * FROM users')
        })
      `}</Code>

      <Code block jsx>{`
        import { test } from 'vitest'

        test.concurrent('performs a query', ({ onTestFinished }) => {
          const db = connectDb()
          onTestFinished(() => db.close())
          db.query('SELECT * FROM users')
        })
      `}</Code>

      <Code block jsx>{`
        // this can be in a separate file
        function getTestDb() {
          const db = connectMockedDb()
          onTestFinished(() => db.close())
          return db
        }

        test('performs a user query', async () => {
          const db = getTestDb()
          expect(
            await db.query('SELECT * from users').perform()
          ).toEqual([])
        })

        test('performs an organization query', async () => {
          const db = getTestDb()
          expect(
            await db.query('SELECT * from organizations').perform()
          ).toEqual([])
        })
      `}</Code>

      <H>onTestFailed</H>

      <ul>
        <li>called only after the test has failed</li>
        <li>
          It is called after <code>afterEach</code>
        </li>
        <li>If you are running tests concurrently, you should use it</li>
      </ul>

      <Code block jsx>{`
        import { onTestFailed, test } from 'vitest'

        test('performs a query', () => {
          const db = connectDb()
          onTestFailed((e) => {
            console.log(e.result.errors)
          })
          db.query('SELECT * FROM users')
        })
      `}</Code>

      <H>Mocking</H>

      <Hs>fake function vi.fn()</Hs>

      <Code block jsx>{`
        import { expect, vi, it } from 'vitest'

        it('should return ...', () => {
          const fn = vi.fn()

          fn('hello', 1)

          expect(fn).toHaveBeenCalled()
          expect(fn).toHaveBeenCalledWith('hello', 1)

          // same as fn.mockReturnValue(arg) 
          // same as vi.fn(() => arg)
          fn.mockImplementation((arg) => arg) 
          const res = fn('world', 2)
          expect(res).toBe('world')
        })
        `}</Code>

      <Hs>Mock an exported function</Hs>

      <ul>
        <li>
          Main logic may use other functions which we do not want to run or wish to make them return
          some specific values or we wish to check if they were called or not etc...
        </li>
        <li>We need to mock it</li>
        <li>Function should be located non in the same file as the main function</li>
        <li>
          We need to import the whole module with <code>import * as utils from './utils'</code>
        </li>
        <li>
          Then spy on specific function{' '}
          <code>{"vi.spyOn(utils, 'myFunction').mockImplementation(() => 'mocked!')"}</code>
        </li>
      </ul>

      <Code block jsx>{`
        // 📁 utils.ts

        export function myFunction() {
          return 'original result'
        }
      `}</Code>

      <Code block jsx>{`
        // 📁 main.ts

        import { myFunction } from './utils'

        export function run() {
          return myFunction()
        }
      `}</Code>

      <Code block jsx>{`
        //  📁 main.test.ts

        import { describe, it, expect, vi } from 'vitest'
        import * as utilsModule from './utils'
        import { run } from './main'

        vi.spyOn(utilsModule, 'myFunction').mockImplementation(() => 'mocked!')

        describe('run', () => {
          it('uses mocked myFunction', () => {
            expect(run()).toBe('mocked!')
          })
        })
      `}</Code>

      <Hs>Mock complete module</Hs>

      <ul>
        <li>You may mock all functions inside the file</li>
        <li>
          Functions will become <code>vi.fn()</code>
        </li>
      </ul>

      <Code block jsx>{`
        // 📁 main.test.ts

        // ✅ Auto-mock the entire module
        vi.mock('./utils') 

        import * as utilsModule from './utils'
        import { run } from './main'

        describe('run', () => {
          it('uses mocked myFunction - version 1', () => {
            utilsModule.myFunction.mockImplementation(() => 'mocked 1')

            expect(run()).toBe('mocked 1')
            expect(utilsModule.myFunction).toHaveBeenCalled()
          })

          it('uses mocked myFunction - version 2', () => {
            utilsModule.myFunction.mockImplementation(() => 'mocked 2')

            expect(run()).toBe('mocked 2')
            expect(utilsModule.myFunction).toHaveBeenCalled()
          })
        })
      `}</Code>

      <Hs>Mock a package</Hs>

      <ul>
        <li>Same way we may mock a package in full</li>

        <Code block jsx>{`
          import { describe, it, expect, vi } from 'vitest'
          import axios from 'axios'

          vi.mock('axios') // all methods become mocked with vi.fn()

          it('mocks only axios.get', async () => {
            axios.get.mockResolvedValue({ data: 'hello' })

            const response = await axios.get('/test')
            expect(response.data).toBe('hello')
            expect(axios.get).toHaveBeenCalledWith('/test')
          })
        `}</Code>

        <li>Or partially only get() method</li>

        <Code block jsx>{`
          import { describe, it, expect, vi } from 'vitest'
          import axios from 'axios'

          vi.mock('axios') // all methods become mocked with vi.fn()

          it('mocks only axios.get', async () => {
            vi.spyOn(axios, 'get').mockResolvedValue({ data: 'hello' })

            const response = await axios.get('/test')
            expect(response.data).toBe('hello')
            expect(axios.get).toHaveBeenCalledWith('/test')
          })
        `}</Code>

        <li>or partially (same thing, but somehow different, to be checked)</li>

        <Code block jsx>{`
          import { describe, it, expect, vi } from 'vitest'
          import axios from 'axios'

          // Dynamically mock axios
          vi.mock(import('axios'), async (importOriginal) => {
            const axios = await importOriginal()
            return {
              ...axios,  // Spread the original axios module
              get: vi.fn(() => Promise.resolve({ data: 'mocked' }))  // Mock only the get method
            }
          })


          describe('axios partial mock', () => {
            it('mocks only axios.get', async () => {
              const response = await axios.get('/test')
              expect(response.data).toBe('mocked')
              expect(axios.get).toHaveBeenCalledWith('/test')

              // other axios methods (like post, delete, etc.) remain real
            })
          })
        `}</Code>
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
