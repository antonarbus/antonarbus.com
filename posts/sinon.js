'use client'


import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'sinon',
  date: '2022.05.18',
  tags: ['test'],
  imgUrl: 'https://antonarbus.com/imgs/sinon.png',
  desc: 'sinon plugin for chai',
  body: (
    <>
      <p><Lnk path='https://sinonjs.org/'>Sinon</Lnk> is a test library for any framework.</p>

      <H>Installation</H>

      <p><Code bash>npm i mocha chai sinon-chai --save-dev</Code></p>

      <p>Import libs</p>

      <Code block jsx>{`
        const chai = require('chai')
        const assert = require('chai').assert
        const expect = require('chai').expect
        const sinon = require('sinon')
        chai.use(require('sinon-chai'))
      `}</Code>

      <H>Assertions</H>

      <p><Lnk path='https://sinonjs.org/releases/v14/assertions/'>native Sinon assertions</Lnk> and their sisters for <Lnk path='https://www.chaijs.com/plugins/sinon-chai/'>Sinon-Chai</Lnk>.</p>

      <ul>
        <li><Code>sinon.assert.<b>fail</b>(message)</Code></li>
        <li><Code>sinon.assert.<b>failException</b></Code></li>
        <li><Code>sinon.assert.<b>pass</b>(assertion)</Code></li>
        <li><Code>sinon.assert.<b>notCalled</b>(spy)</Code></li>
        <li><Code>sinon.assert.<b>called</b>(spy)</Code></li>
        <li><Code>sinon.assert.<b>calledOnce</b>(spy)</Code></li>
        <li><Code>sinon.assert.<b>calledTwice</b>(spy)</Code></li>
        <li><Code>sinon.assert.<b>calledThrice</b>(spy)</Code></li>
        <li><Code>sinon.assert.<b>callCount</b>(spy, num)</Code></li>
        <li><Code>sinon.assert.<b>callOrder</b>(spy1, spy2, ...)</Code></li>
        <li><Code>sinon.assert.<b>calledOn</b>(spyOrSpyCall, obj)</Code></li>
        <li><Code>sinon.assert.<b>alwaysCalledOn</b>(spy, obj)</Code></li>
        <li><Code>sinon.assert.<b>alwaysCalledOn</b>(spy, obj)</Code></li>
        <li><Code>sinon.assert.<b>calledWith</b>(spyOrSpyCall, arg1, arg2, ...)</Code></li>
        <li><Code>sinon.assert.<b>alwaysCalledWith</b>(spy, arg1, arg2, ...)</Code></li>
        <li><Code>sinon.assert.<b>neverCalledWith</b>(spy, arg1, arg2, ...)</Code></li>
        <li><Code>sinon.assert.<b>calledWithExactly</b>(spyOrSpyCall, arg1, arg2, ...)</Code></li>
        <li><Code>sinon.assert.<b>calledOnceWithExactly</b>(spyOrSpyCall, arg1, arg2, ...)</Code></li>
        <li><Code>sinon.assert.<b>alwaysCalledWithExactly</b>(spy, arg1, arg2, ...)</Code></li>
        <li><Code>sinon.assert.<b>calledWithMatch</b>(spyOrSpyCall, arg1, arg2, ...)</Code></li>
        <li><Code>sinon.assert.<b>calledOnceWithMatch</b>(spyOrSpyCall, arg1, arg2, ...)</Code></li>
        <li><Code>sinon.assert.<b>alwaysCalledWithMatch</b>(spy, arg1, arg2, ...)</Code></li>
        <li><Code>sinon.assert.<b>calledWithNew</b>(spyOrSpyCall)</Code></li>
        <li><Code>sinon.assert.<b>neverCalledWithMatch</b>(spy, arg1, arg2, ...)</Code></li>
        <li><Code>sinon.assert.<b>threw</b>(spyOrSpyCall, exception)</Code></li>
        <li><Code>sinon.assert.<b>alwaysThrew</b>(spy, exception)</Code></li>
        <li><Code>sinon.assert.<b>match</b>(actual, expectation)</Code></li>
        <li><Code>sinon.assert.<b>expose</b>(object, options)</Code></li>
      </ul>

      <Code block jsx>{`
        it('native sinon assertion vs chai', () => {
          const myStub = sinon.stub()
          const myStub2 = sinon.stub()
          myStub()
          myStub()
          myStub('a')
          myStub2('b')

          expect(myStub).called
          sinon.assert.called(myStub)

          expect(myStub).callCount(3)
          sinon.assert.callCount(myStub, 3)

          expect(myStub).calledThrice
          sinon.assert.calledThrice(myStub)

          expect(myStub).not.calledOnce

          expect(myStub).calledBefore(myStub2)
          expect(myStub2).calledAfter(myStub)

          expect(myStub2).calledWith('b')
          sinon.assert.calledWith(myStub2, 'b')

          sinon.assert.callOrder(myStub, myStub2)
        })
      `}</Code>

      <H>Matchers</H>

      <p>Used in assert function arguments.</p>

      <ul>
        <li><Code>sinon.match(number)</Code> number</li>
        <li><Code>sinon.match(string);</Code> string and have the expectation as a substring</li>
        <li><Code>sinon.match(regexp);</Code> string and match the given regular expression</li>
        <li><Code>sinon.match(object);</Code> not null or undefined and have at least the same properties as expectation</li>
        <li><Code>sinon.match(function)</Code> custom matchers</li>
        <li><Code>sinon.match.any</Code> matches anything</li>
        <li><Code>sinon.match.defined</Code> defined</li>
        <li><Code>sinon.match.truthy</Code> truthy</li>
        <li><Code>sinon.match.falsy</Code> falsy</li>
        <li><Code>sinon.match.bool</Code> a Boolean</li>
        <li><Code>sinon.match.number</Code> a Number</li>
        <li><Code>sinon.match.string</Code> a String</li>
        <li><Code>sinon.match.object</Code> an Object</li>
        <li><Code>sinon.match.func</Code> a Function</li>
        <li><Code>sinon.match.array</Code> an Array</li>
        <li><Code>sinon.match.array.deepEquals(arr)</Code> deep equal</li>
        <li><Code>sinon.match.array.startsWith(arr)</Code> start with the same values</li>
        <li><Code>sinon.match.array.endsWith(arr)</Code> end with the same values</li>
        <li><Code>sinon.match.array.contains(arr)</Code> contain each one of the values the given array has</li>
        <li><Code>sinon.match.map</Code> Map</li>
        <li><Code>sinon.match.map.deepEquals(map)</Code> deep equal</li>
        <li><Code>sinon.match.map.contains(map)</Code> contain each one of the items the given map has</li>
        <li><Code>sinon.match.set</Code> be a Set</li>
        <li><Code>sinon.match.set.deepEquals(set)</Code> be deep equal</li>
        <li><Code>sinon.match.set.contains(set)</Code> contain each one of the items the given set has</li>
        <li><Code>sinon.match.regexp</Code> regular expression</li>
        <li><Code>sinon.match.date</Code> Date object</li>
        <li><Code>sinon.match.symbol</Code> Symbol</li>
        <li><Code>sinon.match.in(array)</Code> be in the array</li>
        <li><Code>sinon.match.same(ref)</Code> strictly equal ref</li>
        <li><Code>sinon.match.typeOf(type)</Code> be of the given type</li>
        <li><Code>sinon.match.instanceOf(type)</Code> be an instance of the given type</li>
        <li><Code>sinon.match.has(property[, expectation])</Code> define the given property</li>
        <li><Code>sinon.match.hasOwn(property[, expectation])</Code> Same as sinon.match.has but the property must be defined by the value itself. Inherited properties are ignored</li>
        <li><Code>sinon.match.hasNested(propertyPath[, expectation])</Code> define the given propertyPath. Dot (prop.prop) and bracket (prop[0]) notations are supported as in Lodash.get</li>
      </ul>

      <Code block jsx>{`
        it('matchers', () => {
          const book = {
            pages: 42,
            author: 'cjno'
          }
          const spy = sinon.spy()

          spy(book)

          sinon.assert.calledWith(spy, sinon.match({ author: 'cjno' }))
          sinon.assert.calledWith(spy, sinon.match.has('pages', 42))
        })
      `}</Code>

      <H>spy</H>

      <p>When you spy on a function the function behavior does not change.</p>

      <p>Spy <Lnk path='https://sinonjs.org/releases/v14/spies/'>methods</Lnk>.</p>

      <Code block jsx>{`
        it('should call the callback', () => {
          const callMyCallback = cb => cb()
          const cbSpy = sinon.spy()
          callMyCallback(cbSpy)
          expect(cbSpy).to.have.been.calledOnce
        })
      `}</Code>

      <H>spy on existing method</H>

      <Code block jsx>{`
        it('spy on existing method', () => {
          const obj = {
            say: (str) => console.log(str)
          }

          const spyOnSay = sinon.spy(obj, 'say')

          obj.say('hi')
          expect(spyOnSay).to.have.been.calledOnce
          expect(spyOnSay).to.have.been.calledWith('hi')

          spyOnSay.restore()
        })
      `}</Code>

      <H>Stub</H>

      <p>Stub changes function behavior. For ex. return a value, throw an error, invoke a callback, do smth on 3rd call etc...</p>

      <p><Lnk path='https://sinonjs.org/releases/v14/stubs/'>Methods</Lnk> on stubbed functions</p>

      <Code>const stub = sinon.stub();</Code>

      <ul>
        <li><Code>stub.returns()</Code> makes the stub return the provided value.</li>
        <li><Code>stub.withArgs(arg1[, arg2, ...])</Code> stubs the method only for the provided arguments</li>
        <li><Code>stub.onCall(n)</Code> defines the behavior of the stub on the nth call.</li>
        <li><Code>stub.onFirstCall()</Code>, <Code>stub.onSecondCall()</Code>, <Code>stub.onThirdCall()</Code></li>
        <li><Code>stub.resetBehavior()</Code>, <Code>stub.resetHistory()</Code>, <Code>stub.reset()</Code> Resets both behaviour and history of the stub.</li>
        <li><Code>stub.callsFake(fakeFunction)</Code> makes the stub call the provided fakeFunction when invoked.</li>
        <li><Code>stub.resolves(value)</Code> Causes the stub to return a Promise which resolves to the provided value.</li>
        <li><Code>stub.rejects()</Code>, <Code>stub.rejects("TypeError")</Code>, <Code>stub.rejects(value)</Code></li>
        <li><Code>stub.throws()</Code>, <Code>stub.throws("msg")</Code>, <Code>stub.throws(obj)</Code> Causes the stub to throw an exception</li>
        <li><Code>stub.usingPromise(promiseLibrary)</Code> Causes the stub to return promises using a specific Promise library</li>
        <li><Code>stub.callsArg(index)</Code> causes the stub to call the first argument as a callback</li>
        <li><Code>stub.callsArgWith(index, arg1, arg2, ...)</Code> same, but with arguments to pass to the callback.</li>
        <li><Code>stub.callArg(argNum)</Code> calls the argument of stub</li>
        <li><Code>stub.callThrough()</Code> causes the original method to be called when none of the conditional stubs are matched.</li>
        <li><Code>stub.yields([arg1, arg2, ...])</Code> similar to <i>callsArg</i>. There are many other similar <i>yeild</i> methods.</li>
        <li><Code>stub.callsArgAsync(index)</Code> Async version </li>
        <li><Code>stub.yieldsAsync([arg1, arg2, ...])</Code></li>
      </ul>

      <p>As I have understood do not use <i>yield</i>, but use <i>callsArg</i>.</p>

      <Code block jsx>{`
        it('anonymous stub', async () => {
          const myStub = sinon.stub()
          myStub
            .returns('hi')

          expect(myStub()).equal('hi')
        })
      `}</Code>

      <Code block jsx>{`
        it('onCall', () => {
          const myStub = sinon.stub()
          myStub.onCall(0).returns(1)
          myStub.onCall(1).returns(2)
          myStub.returns(3)
          expect(myStub()).equal(1)
          expect(myStub()).equal(2)
          expect(myStub()).equal(3)
        })
      `}</Code>

      <H>Stub imported function</H>

      <Code block jsx>{`
        const create = require('../create')
        const customer = require('../lib/customer')
        const dr = require('../lib/d-r')
        const postings = require('../lib/postings')
        const mapper = require('../lib/mapper')
        const { log } = require('lambda-sdk')

        describe('create', () => {
          const params = {
            pathParameters: {
              id: 'mock company id'
            }
          }

          const administrations = 

          let enableAiPostingsStub,
            fetchAdministrationsStub,
            mapAdministrationsSpy,
            errorSpy

          beforeEach(() => {
            enableAiPostingsStub = sinon.stub(customer, 'enableAiPostings').resolves()
            fetchAdministrationsStub = sinon.stub(dr, 'fetchAdministrations').resolves([{ key: 'mock company' }])
            mapAdministrationsSpy = sinon.spy(mapper, 'mapAdministrations')
            errorSpy = sinon.spy(log, 'error')
          })
          afterEach(() => {
            sinon.restore()
          })

          it('should enable ai postings with customer', async () => {
            await create(params)
            expect(enableAiPostingsStub).to.have.been.calledWith('mock company id')
          })

          it('should fetch accounting company\\'s administrations', async () => {
            await create(params)
            expect(fetchAdministrationsStub).to.have.been.calledWith('mock company id')
          })

          it('should map all fetched administrations', async () => {
            await create(params)
            expect(mapAdministrationsSpy).to.have.callCount(3)
          })

          it('should handle errors correctly', async () => {
            enableAiPostingsStub.rejects(new Error('mock error'))
            await expect(create(params)).to.have.been.rejected()
            expect(errorSpy).to.have.been.called()
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
