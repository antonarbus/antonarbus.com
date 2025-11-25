'use client'


import { Code, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'rewire',
  date: '2022.05.20',
  tags: ['test'],
  imgUrl: 'https://antonarbus.com/imgs/unit_tests.png',
  desc: 'rewire package for testing',
  body: (
    <>
      <ul>
        <li>With <Lnk path='https://www.npmjs.com/package/rewire'>Rewire</Lnk> we may test and mock not exported variables and functions from a module</li>
      </ul>

      <p>How I used it in one project</p>

      <Code block jsx>{`
      const rewire = require('rewire')
      const assert = require('assert')
      const rewiredModule = rewire('../lib/ytj-soap')
      const sinon = require('sinon').createSandbox()

      describe('#callClient', () => {
        const callClient = rewiredModule.__get__('callClient')
        let mockFns, clientStub

        beforeEach(() => {
          clientStub = { mockAsync: sinon.stub().resolves() }
          mockFns = {
            getSecretKey: sinon.stub().resolves('secret key mock'),
            soap: {
              createClientAsync: sinon.stub().resolves(clientStub)
            },
            getTimestamp: sinon.stub().returns('time stamp'),
            createChecksum: sinon.stub().returns('hash string'),
            error: {
              throwFailedDependency: sinon.spy()
            }
          }
        })

        it('should get a secret key', async () => {
          return rewiredModule.__with__(mockFns)(async () => {
            await callClient('mock', { foo: 'bar' })
            sinon.assert.called(mockFns.getSecretKey)
          })
        })

        it('should create a client', async () => {
          return rewiredModule.__with__(mockFns)(async () => {
            await callClient('mock', { foo: 'bar' })
            sinon.assert.called(mockFns.soap.createClientAsync)
          })
        })
      `}</Code>

      <p>Example from gemini</p>

      <Code block jsx>{`
        // myModule.js (module with non-exported function)
        function addNumbers(a, b) {
          return a + b;
        }

        function doSomeWork(x, y) {
          const sum = addNumbers(x, y); // Non-exported function
          return sum * 2;
        }

        module.exports = doSomeWork;

        // myModule.test.js (test file)
        const rewire = require('rewire');
        const myModule = rewire('./myModule.js');

        describe('myModule', () => {
          it('should multiply the sum of x and y by 2', () => {
            const mockAddNumbers = (a, b) => a * b; // Mock function for addNumbers
            myModule.__set__('addNumbers', mockAddNumbers); // Replace with mock

            const result = myModule(4, 5);
            expect(result).toBe(18); // (4 * 5) * 2
          });
        });
      `}</Code>

      <p>Some of my study tests</p>

      <Code block jsx>{`
        // utils.js
        function greet (name) {
          return \`Hello, \${name}!\`
        }

        async function getUserData (userId) {
          try {
            const response = await fetch(\`https://api.example.com/users/\${userId}\`)
            const data = await response.json()
            return data
          } catch (error) {
            console.error('Error fetching user data:', error)
            throw error
          }
        }

        async function formatUserGreeting (userId) {
          const userData = await getUserData(userId)
          return \`\${greet(userData.name)} Welcome back!\`
        }

        // utils.test.js

        const sinon = require('sinon').createSandbox()
        const rewire = require('rewire')
        const rewiredModule = rewire('./utils')

        describe.only('#utilities', () => {
          it('should return Hello, John!', async () => {
            const greet = rewiredModule.__get__('greet')
            expect(greet('John')).to.equal('Hello, John!')
          })

          it('should return Hello, John! Welcome back!', async () => {
            return rewiredModule.__with__({
              getUserData: sinon.stub().resolves({ name: 'John', age: 30 })
            })(async () => {
              const formatUserGreeting = rewiredModule.__get__('formatUserGreeting')
              expect(await formatUserGreeting('user id')).to.equal('Hello, John! Welcome back!')
            })
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
