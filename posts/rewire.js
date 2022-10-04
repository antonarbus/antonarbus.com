import { Code, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'rewire',
  date: '2022.05.20',
  tags: ['test'],
  imgUrl: 'https://antonarbus.com/imgs/unit_tests.png',
  desc: 'rewire package for testing',
  body: (
    <>
      <p><Lnk path='https://www.npmjs.com/package/rewire'>Rewire package</Lnk> is needed to override variables within the module without exporting them specifically.</p>

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
