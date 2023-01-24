import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'jest',
  date: '2022.05.11',
  tags: ['test'],
  imgUrl: 'https://antonarbus.com/imgs/jest.png',
  desc: 'jest testing library',
  body: (
    <>
      <p>Jest is a library for unit testing, tests of app units without external dependencies.</p>

      <H>Installation</H>

      Jest for <Lnk path='https://nextjs.org/docs/testing#quickstart-2'>Next</Lnk> packages <Code>npm install --save-dev jest @testing-library/react @testing-library/jest-dom</Code>

      <H>Configuration</H>

      <Code block jsx>{`
      // jest.config.js
      const nextJest = require('next/jest')

      const createJestConfig = nextJest({
        // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
        dir: './',
      })

      // Add any custom config to be passed to Jest
      const customJestConfig = {
        // Add more setup options before each test is run
        // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
        // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
        moduleDirectories: ['node_modules', '/'],
        testEnvironment: 'jest-environment-jsdom',
      }

      // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
      module.exports = createJestConfig(customJestConfig)
      `}</Code>

      <Code block jsx>{`
      // package.json
      "scripts": {
        "dev": "node exportAllPostsCreate && next dev",
        "build": "node exportAllPostsCreate && next build",
        "start": "next start",
        "lint": "next lint",
        "test": "jest --watch"
      },
      `}</Code>

      <Code block jsx>{`
      // .eslintrc.js
      module.exports = {
        env: {
          browser: true,
          es2021: true,
          jest: true
        },
        extends: [
          'plugin:react/recommended',
          'standard'
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          ecmaVersion: 'latest',
          sourceType: 'module'
        },
        plugins: [
          'react',
          '@typescript-eslint'
        ],
        rules: {
          'react/react-in-jsx-scope': 'off',
          'space-before-function-paren': 'off',
          'react/prop-types': 'off',
          'import/no-absolute-path': 'off'
        }
      }
      `}</Code>

      <H>Run</H>

      <Code>npm run test</Code>

      <H>All assertions</H>

      <p>
        <code>toHaveBeenCalledTimes</code>, <code>toHaveBeenCalledWith</code>, <code>toHaveBeenLastCalledWith</code>, <code>toHaveBeenNthCalledWith</code>, <code>toHaveClass</code>, <code>toHaveDisplayValue</code>, <code>toHaveErrorMessage</code>, <code>toHaveFocus</code>, <code>toHaveFormValues</code>, <code>toHaveLastReturnedWith</code>, <code>toHaveLength</code>, <code>toHaveNthReturnedWith</code>, <code>toHaveProperty</code>, <code>toHaveReturned</code>, <code>toHaveReturnedTimes</code>, <code>toHaveReturnedWith</code>, <code>toHaveStyle</code>, <code>toHaveTextContent</code>, <code>toHaveValue</code>, <code>toMatch</code>, <code>toMatchInlineSnapshot</code>, <code>toMatchObject</code>, <code>toMatchSnapshot</code>, <code>toReturn</code>, <code>toReturnTimes</code>, <code>toReturnWith</code>, <code>toStrictEqual</code>, <code>toThrow</code>, <code>toThrowError</code>, <code>toThrowErrorMatchingInlineSnapshot</code>, <code>toThrowErrorMatchingSnapshot</code>, <code>lastCalledWith</code>, <code>lastReturnedWith</code>, <code>not</code>, <code>nthCalledWith</code>, <code>nthReturnedWith</code>, <code>rejects</code>, <code>resolves</code>, <code>toBe</code>, <code>toBeCalled</code>, <code>toBeCalledTimes</code>, <code>toBeCalledWith</code>, <code>toBeChecked</code>, <code>toBeCloseTo</code>, <code>toBeDefined</code>, <code>toBeDisabled</code>, <code>toBeEmptyDOMElement</code>, <code>toBeEnabled</code>, <code>toBeFalsy</code>, <code>toBeGreaterThan</code>, <code>toBeGreaterThanOrEqual</code>, <code>toBeInTheDocument</code>, <code>toBeInstanceof</code>, <code>toBeInvalid</code>, <code>toBeLessThan</code>, <code>toBeLessThanOrEqual</code>, <code>toBeNaN</code>, <code>toBeNull</code>, <code>toBePartiallyChecked</code>, <code>toBeRequired</code>, <code>toBeTruthy</code>, <code>toBeUndefined</code>, <code>toBeValid</code>, <code>toBeVisible</code>, <code>toContain</code>, <code>toContainElement</code>, <code>toContainEqual</code>, <code>toContainHTML</code>, <code>toEqual</code>, <code>toHaveAccessibleDescription</code>, <code>toHaveAccessibleName</code>, <code>toHaveAttribute</code>, <code>toHaveBeenCalled</code>, <code>toHaveBeenCalledTimes</code>, <code>toHaveBeenCalledWith</code>, <code>toHaveBeenLastCalledWith</code>
      </p>

      <H>Main assertions</H>

      <Hs>toBe</Hs>

      <p>Compares references in memory.</p>

      <Code block jsx>{`
      test('exact equality', () => {
        expect(2 + 2).toBe(4) // true
      })
      `}</Code>

      <Hs>not.toBe</Hs>

      <Code block jsx>{`
      test('exact equality for objects', () => {
        expect({ a: 1 }).not.toBe({ a: 1 }) // false
      })
      `}</Code>

      <Hs>toEqual</Hs>

      <p>Compares all values</p>

      <Code block jsx>{`
      test('values equality', () => {
        expect({ a: 1 }).toEqual({ a: 1 }) // true
      })
      `}</Code>

      <Hs>toMatchObject</Hs>

      <Code block jsx>{`
      test('partial equality', () => {
        expect({ a: 1, b: 2 }).toMatchObject({ a: 1 })
      })
      `}</Code>

      <Hs>toHaveProperty</Hs>

      <Code block jsx>{`
      test('toHaveProperty', () => {
        expect({ a: 1, b: 2 }).toHaveProperty('a', 1)
      })
      `}</Code>

      <Hs>toBeNull</Hs>

      <Code block jsx>{`
      test('null', () => {
        const n = null
        expect(n).toBeNull()
      })
      `}</Code>

      <Hs>toBeDefined</Hs>

      <Code block jsx>{`
      test('null', () => {
        const n = null
        expect(n).toBeDefined()
      })
      `}</Code>

      <Hs>toBeUndefined</Hs>

      <Code block jsx>{`
      test('null', () => {
        const n = null
        expect(n).not.toBeUndefined()
      })
      `}</Code>

      <Hs>toBeTruthy</Hs>

      <Code block jsx>{`
      test('null', () => {
        const n = null
        expect(n).not.toBeTruthy()
      })
      `}</Code>

      <Hs>toBeFalsy</Hs>

      <Code block jsx>{`
      test('null', () => {
        const n = null
        expect(n)toBeFalsy()
      })
      `}</Code>

      <Hs>toBeGreaterThan</Hs>

      <Code block jsx>{`
      test('two plus two', () => {
        const value = 2 + 2
        expect(value).toBeGreaterThan(3)
      })
      `}</Code>

      <Hs>toBeGreaterThanOrEqual</Hs>

      <Code block jsx>{`
      test('two plus two', () => {
        const value = 2 + 2
        expect(value).toBeGreaterThanOrEqual(3.5)
      })
      `}</Code>

      <Hs>toBeLessThan</Hs>

      <Code block jsx>{`
      test('two plus two', () => {
        const value = 2 + 2
        expect(value).toBeLessThan(5)
      })
      `}</Code>

      <Hs>toBeLessThanOrEqual</Hs>

      <Code block jsx>{`
      test('two plus two', () => {
        const value = 2 + 2
        expect(value).toBeLessThanOrEqual(4.5)
      })
      `}</Code>

      <Hs>toBeCloseTo</Hs>

      <Code block jsx>{`
      test('adding floating point numbers', () => {
        const value = 0.1 + 0.2
        expect(value).toBeCloseTo(0.3)
      })
      `}</Code>

      <Hs>toMatch</Hs>

      <Code block jsx>{`
      test('hi', () => {
        expect('team').not.toMatch('hi')
      })
      `}</Code>

      <Code block jsx>{`
      test('there is no I in team', () => {
        expect('team').not.toMatch(/I/)
      })

      test('but there is a "stop" in Christoph', () => {
        expect('Christoph').toMatch(/stop/)
      })
      `}</Code>

      <Hs>toContain</Hs>

      <Code block jsx>{`
      test('arr contains', () => {
        expect(['1', '2', '3', '4', '5']).toContain('2')
      })
      `}</Code>

      <Hs>arrayContaining</Hs>

      <Code block jsx>{`
      test('arr contains', () => {
        expect(['1', '2', '3', '4', '5']).toEqual(expect.arrayContaining(['1', '2']))
      })
      `}</Code>

      <Hs>toThrow</Hs>

      <Code block jsx>{`
      function functionWithError() {
        throw new Error('very bad error')
      }

      test('compiling android goes as expected', () => {
        expect(() => functionWithError()).toThrow()
        expect(() => functionWithError()).toThrow(Error)
        expect(() => functionWithError()).toThrow('very bad error')
        expect(() => functionWithError()).toThrow(/bad/)
      })
      `}</Code>

      <H>Promises</H>

      <Code block jsx>{`
      test('get userId from json api', () => {
        return axios('https://jsonplaceholder.typicode.com/posts/1')
          .then(res => {
            expect(res.data.userId).toBe(1)
          })
      })
      `}</Code>

      <Code block jsx>{`
      test('get userId from json api with async await', async () => {
        const res = await axios('https://jsonplaceholder.typicode.com/posts/1')
        expect(res.data.userId).toBe(1)
      })
      `}</Code>

      <Hs>resolves</Hs>

      <Code block jsx>{`
      test('promise resolves', async () => {
        function promiseWithResolve() {
          return new Promise((resolve, reject) => {
            setTimeout(() => resolve('done'), 500)
          })
        }
        await expect(promiseWithResolve()).resolves.toEqual('done')
      })
      `}</Code>

      <Hs>rejects</Hs>

      <Code block jsx>{`
      test('promise rejects', async () => {
        function promiseWithResolve() {
          return new Promise((resolve, reject) => {
            setTimeout(() => reject('error'), 500)
          })
        }
        await expect(promiseWithResolve()).rejects.toEqual('error')
      })
      `}</Code>

      <H>beforeEach & afterEach</H>

      <p>Calls function for every test in a file or for a <code>describe</code> block.</p>

      <Code block jsx>{`
      beforeEach(() => {
        console.log('test starts')
      })

      afterEach(() => {
        console.log('test ended')
      })
      `}</Code>

      <H>beforeAll & afterAll</H>

      <p>Calls function before and after all tests in a file or for a <code>describe</code> block.</p>

      <Code block jsx>{`
      beforeAll(() => {
        console.log('tests start')
      })

      afterAll(() => {
        console.log('tests ended')
      })
      `}</Code>

      <H>describe</H>

      <p>Group tests in <code>describe</code> block</p>

      <p><code>beforeEach</code>, <code>afterEach</code>, <code>beforeAll</code>, <code>afterAll</code> inside <code>describe</code> block affect tests inside this block.</p>

      <Code block jsx>{`
      describe('test function name', () => {
        beforeEach(() => {
          console.log('starts before each function in describe block')
        })

        test('to be one', () => {
          expect(1).toBe(1)
        })

        test('to be two', () => {
          expect(2).toBe(2)
        })
      })
      `}</Code>

      <H>Mock function basics</H>

      <p>Read <Lnk path='https://jestjs.io/docs/mock-functions'>here</Lnk>.</p>

      <Code block jsx>{`
      test('mock function basics', () => {
        const mockFn = jest.fn()
        mockFn()
        mockFn('arg1', 'arg2')

        expect(mockFn).toBeCalled()
        expect(mockFn).toBeCalledTimes(2)
        expect(mockFn.mock.calls.length).toBe(2)
        expect(mockFn).toBeCalledWith('arg1', 'arg2') // last call

        console.log('mockFn.mock.calls', mockFn.mock.calls) // [ [], [ 'arg1', 'arg2' ] ]
        expect(mockFn.mock.calls[1][0]).toBe('arg1')
        expect(mockFn.mock.calls[1][1]).toBe('arg2')
      })

      afterAll(() => {
        jest.clearAllMocks()
      })
      `}</Code>

      <H>Mock function with return value</H>

      <Code block jsx>{`
      test('mock function with return value', () => {
        const mockFn = jest.fn()
        mockFn()
        mockFn.mockReturnValue('hi')
        expect(mockFn()).toBe('hi')
      })
      `}</Code>

      <H>Mock function with resolve value</H>

      <Code block jsx>{`
      test('mock function with resolve value', async () => {
        const mockFn = jest.fn()
        mockFn()
        mockFn.mockResolvedValue('hi')
        expect(await mockFn()).toBe('hi')
        console.log('mockFn.mock.results', mockFn.mock.results) // [ { type: 'return', value: undefined }, { type: 'return', value: 'hi' } ]
      })
      `}</Code>

      <H>Mock with custom implementation</H>

      <Code block jsx>{`
      test('mock function with implementation', () => {
        const mockFn = jest.fn()
        mockFn.mockImplementation(arg => {
          if (typeof arg === 'string') return arg
          if (typeof arg === 'number') return 10 * arg
        })
        expect(mockFn('hi')).toBe('hi')
        expect(mockFn(3)).toBe(30)

        // shorthand
        const mockFn2 = jest.fn(arg => 'hi')
        expect(mockFn2('hi')).toBe('hi')
      })
      `}</Code>

      <H>Mock function from other file</H>

      <Code block jsx>{`
        // foo-bar-baz.js
        export const foo = 'foo'
        export const bar = () => 'bar'
        export default () => 'baz'
      `}</Code>

      <Code block jsx>{`
      //test.js
      import defaultExport, {bar, foo} from '../foo-bar-baz'

      jest.mock('../foo-bar-baz', () => {
        const originalModule = jest.requireActual('../foo-bar-baz')

        //Mock the default export and named export 'foo'
        return {
          __esModule: true,
          ...originalModule,
          default: jest.fn(() => 'mocked baz'),
          foo: 'mocked foo',
        }
      })

      test('should do a partial mock', () => {
        const defaultExportResult = defaultExport()
        expect(defaultExportResult).toBe('mocked baz')
        expect(defaultExport).toHaveBeenCalled()

        expect(foo).toBe('mocked foo')
        expect(bar()).toBe('bar')
      })
      `}</Code>

      <H>Mock Redux</H>

      <Code block jsx>{`
      jest.mock('react-redux', () => {
        const originalModule = jest.requireActual('react-redux')

        return {
          __esModule: true,
          ...originalModule,
          useSelector: jest.fn().mockReturnValue({
            title: 'some title',
            message: 'some message',
            isOpen: true
          }),
          useDispatch: () => jest.fn()
        }
      })
      `}</Code>

      <H>spyOn</H>

      <p>Same as previous, but a bit different way.</p>

      <Code block jsx>{`
      test('spyon', async () => {
        const obj = {
          fetchPost: function () {
            return axios('https://jsonplaceholder.typicode.com/posts/1')
              .then(res => res.data)
          }
        }
        console.log(await obj.fetchPost()) // { userId: 1, id: 1, title: 'sunt' }

        // instead of calling real API we can spy on the function and replace its behavior
        jest.spyOn(obj, 'fetchPost')
          .mockImplementation(() => Promise.resolve('data is fetched, but it is not your business'))
        console.log(await obj.fetchPost()) // data is fetched, but it is not your business
      })

      afterEach(() => { 
        jest.restoreAllMocks()
      })
      `}</Code>

      <H>Mock function return different values on different calls</H>

      <Code block jsx>{`
      test('mock function return different values', () => {
        const mockFn = jest
          .fn()
          .mockReturnValue('default')
          .mockReturnValueOnce('hi')
          .mockReturnValueOnce('bye')

        expect(mockFn()).toBe('hi')
        expect(mockFn()).toBe('bye')
        expect(mockFn()).toBe('default')
      })
      `}</Code>

      <H>Mock</H>

      <p>Mock the external library.</p>

      <Code block jsx>{`
      test('should mock the lib', () => {
        jest.mock('shortid', () => {
          return jest.fn(() => '23kDr6')
        })

        const id = require('shortid')
        console.log(id()) // '23kDr6'
      })
      `}</Code>

      <H>Run one test only</H>

      <p>temporarily change that <code>test</code> command to a <code>test.only</code>.</p>

      <Code block jsx>{`
      test.only('this will be the only test that runs', () => {
        expect(true).toBe(false)
      })

      test('this test will not run', () => {
        expect('A').toBe('A')
      })
      `}</Code>

      <H>it</H>

      <p>Same as <code>test</code>, shorter and makes description sound like normal language.</p>

      <Code block jsx>{`
      it('should be 2', () => {
        expect(1 + 1).toBe(2)
      })
      `}</Code>

      <H>Suppress jest warning</H>

      <Code block jsx>{`
      describe('<Invoices />', () => {
        it('should render the component', () => {
          jest.spyOn(console, 'error').mockImplementation(() => {})
          renderWithProvider(<Invoices />)
          const invoices = screen.getByTestId('invoices')
          expect(invoices).toBeInTheDocument()
        })
      })
      `}</Code>

      <H>Mock imported function</H>

      <ul>
        <li>I am testing a component which uses react-query functions to fetch a data on mount</li>
        <li>In test we do not want to fetch the data and need to mock it</li>
        <li>Component acts always the same no matter <code>useUserQuery()</code> returns</li>
        <li>So we need to mock it ones for all tests</li>
        <li>Component renders differently depending on <code>useInvoicesQuery()</code> return value</li>
        <li>Here we need to control the return value</li>
      </ul>

      <Code block jsx>{`
        export const InvoicesTable = () => {
        const dispatch = useDispatch()
        const { data: user } = useUserQuery()
        const { data, isLoading } = useInvoicesQuery()
        const isServiceCenter = selectIsServiceCenter(user)

        return (
          ....
        )
      }
      `}</Code>

      <Code block jsx>{`
      import { screen } from '@testing-library/react'
      import { getDefaultStore } from 'testUtils/defaultStore'
      import { renderWithProvider } from 'testUtils/renderWithProvider'
      import { InvoicesTable } from './InvoicesTable'
      import { useInvoicesQuery } from 'api/useInvoicesQuery'

      const store = getDefaultStore()
      store.query.searchInputValue = 'some search input value'

      // return value will be static in all test
      jest.mock('api/useUserQuery', () => ({
        useUserQuery: () => ({ data: { username: 'Jack Russell' } })
      }))

      // return value can be controlled in different tests
      jest.mock('api/useInvoicesQuery', () => ({
        useInvoicesQuery: jest.fn()
      }))

      describe('<InvoicesTable />', () => {
        it('should render tables content', () => {
          useInvoicesQuery.mockReturnValue({ isLoading: false, data: {} })

          renderWithProvider(<InvoicesTable />, {}, { preloadedState: store })

          expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
          expect(screen.getByText('14:27:21', { exact: false })).toBeInTheDocument()
        })
      })

      describe('<InvoicesTable />', () => {
        it('should show spinner', () => {
          useInvoicesQuery.mockReturnValue({ isLoading: true, data: {} })

          renderWithProvider(<InvoicesTable />, {}, { preloadedState: store })

          expect(screen.queryByTestId('spinner')).toBeInTheDocument()
        })
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
