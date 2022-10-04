/* eslint-disable no-unused-expressions */
// test/mytest.js
const axios = require('axios')
const chai = require('chai')
const assert = require('chai').assert
const expect = require('chai').expect
const sinon = require('sinon')
chai.use(require('sinon-chai'))

describe('assert vs expect', () => {
  it('should return 5', () => {
    assert.equal(2 + 3, 5)
    expect(2 + 3).to.equal(5)
  })

  it('should be a string', () => {
    assert.typeOf('hi', 'string')
    expect('hi').to.be.a('string')
  })

  it('should be > 5', () => {
    assert.isAbove(100, 99)
    expect(100).to.be.above(99)
  })
})

describe('expect', () => {
  it('.not', () => {
    expect(function () { }).to.not.throw()
    expect({ a: 1 }).to.not.have.property('b')
    expect([1, 2]).to.be.an('array').that.does.not.include(3)
  })

  it('.deep', () => {
    // Target object deeply (but not strictly) equals `{a: 1}`
    expect({ a: 1 }).to.deep.equal({ a: 1 })
    expect({ a: 1 }).to.not.equal({ a: 1 })
  })

  it('.ordered', () => {
    expect([1, 2]).to.have.ordered.members([1, 2])
      .but.not.have.ordered.members([2, 1])
  })

  it('.any', () => {
    expect({ a: 1, b: 2 }).to.not.have.any.keys('c', 'd')
  })

  it('.all', () => {
    expect({ a: 1, b: 2 }).to.have.all.keys('a', 'b')
  })

  it('.a(type[, msg])', () => {
    expect('foo').to.be.a('string')
    expect({ a: 1 }).to.be.an('object')
    expect(null).to.be.a('null')
    expect(undefined).to.be.an('undefined')
    expect(new Error()).to.be.an('error')
    expect(Promise.resolve()).to.be.a('promise')
    expect(new Float32Array()).to.be.a('float32array')
    expect(Symbol()).to.be.a('symbol')
    expect([1, 2, 3]).to.be.an('array').that.includes(2)
    expect([]).to.be.an('array').that.is.empty
    expect('foo').to.be.a('string')
  })

  it('.include(val[, msg])', () => {
    expect('foobar').to.include('foo')
    expect([1, 2, 3]).to.include(2)
    expect({ a: 1, b: 2, c: 3 }).to.include({ a: 1, b: 2 })
    expect(new Set([1, 2])).to.include(2)
    expect(new Map([['a', 1], ['b', 2]])).to.include(2)
    expect([1, 2, 3]).to.be.an('array').that.includes(2)
  })

  it('.true', () => {
    expect(true).to.be.true
    expect(false).to.not.be.true
  })

  it('.false', () => {
    expect(false).to.be.false
    expect(true).to.not.be.false
  })

  it('.null', () => {
    expect(null).to.be.null
  })

  it('.undefined', () => {
    expect(undefined).to.be.undefined
  })

  it('.NaN', () => {
    expect(NaN).to.be.NaN
    expect('foo').to.not.be.NaN
  })

  it('.exist', () => {
    expect(1).to.exist
  })

  it('.empty', () => {
    expect([]).to.be.empty
    expect('').to.be.empty
    expect(new Set()).to.be.empty
    expect(new Map()).to.be.empty
    expect({}).to.be.empty
    expect([]).to.be.an('array').that.is.empty
    expect([1, 2, 3]).to.not.be.empty
  })

  it('.equal(val[, msg])', () => {
    expect(1).to.equal(1)
    expect('foo').to.equal('foo')
    expect({ a: 1 }).to.deep.equal({ a: 1 })
    expect({ a: 1 }).to.not.equal({ a: 1 })
    expect([1, 2]).to.deep.equal([1, 2])
    expect([1, 2]).to.not.equal([1, 2])
  })

  it('.above(n[, msg])', () => {
    expect(2).to.be.above(1)
  })

  it('.least(n[, msg])', () => {
    expect(2).to.be.at.least(1)
    expect(2).to.be.at.least(2)
    expect('foo').to.have.lengthOf.at.least(2)
    expect(1).to.not.be.at.least(2)
  })

  it('.below(n[, msg]', () => {
    expect(1).to.be.below(2)
    expect('foo').to.have.lengthOf.below(4)
    expect([1, 2, 3]).to.have.lengthOf.below(4)
  })

  it('.most(n[, msg])', () => {
    expect(1).to.be.at.most(2)
    expect(1).to.be.at.most(1)
    expect('foo').to.have.lengthOf.at.most(4)
    expect([1, 2, 3]).to.have.lengthOf.at.most(4)
  })

  it('.within(start, finish[, msg])', () => {
    expect(2).to.be.within(1, 3)
    expect([1, 2, 3]).to.have.lengthOf.within(2, 4)
  })

  it('.instanceof(constructor[, msg])', () => {
    function Cat() { }

    expect(new Cat()).to.be.an.instanceof(Cat)
    expect([1, 2]).to.be.an.instanceof(Array)
    expect({ a: 1 }).to.not.be.an.instanceof(Array)
  })

  it('.property(name[, val[, msg]])', () => {
    expect({ a: 1 }).to.have.property('a')
    expect({ a: 1 }).to.have.property('a', 1)
    expect({ x: { a: 1 } }).to.have.deep.property('x', { a: 1 })
    expect({ x: { a: 1 } }).to.not.have.property('x', { a: 1 })
    expect({ x: { a: 1 } }).to.have.deep.own.property('x', { a: 1 })
    expect({ a: { b: ['x', 'y'] } }).to.have.nested.property('a.b[1]')
    expect({ a: { b: ['x', 'y'] } }).to.have.nested.property('a.b[1]', 'y')
  })

  it('.lengthOf(n[, msg])', () => {
    expect([1, 2, 3]).to.have.lengthOf(3)
    expect('foo').to.have.lengthOf(3)
    expect(new Set([1, 2, 3])).to.have.lengthOf(3)
    expect(new Map([['a', 1], ['b', 2], ['c', 3]])).to.have.lengthOf(3)
    expect([1, 2, 3]).to.have.lengthOf.above(2)
    expect([1, 2, 3]).to.have.lengthOf.below(4)
    expect([1, 2, 3]).to.have.lengthOf.at.least(3)
    expect([1, 2, 3]).to.have.lengthOf.at.most(3)
    expect([1, 2, 3]).to.have.lengthOf.within(2, 4)
  })

  it('.match(re[, msg])', () => {
    expect('foobar').to.match(/^foo/)
    expect('foobar').to.not.match(/taco/)
  })

  it('.string(str[, msg])', () => {
    expect('foobar').to.have.string('bar')
    expect('foobar').to.not.have.string('taco')
  })

  it('.keys(key1[, key2[, …]])', () => {
    expect({ a: 1, b: 2 }).to.have.all.keys('a', 'b')
    expect(['x', 'y']).to.have.all.keys(0, 1)
    expect({ a: 1, b: 2 }).to.have.all.keys(['a', 'b'])
    expect(['x', 'y']).to.have.all.keys([0, 1])

    expect({ a: 1, b: 2 }).to.have.all.keys({ a: 4, b: 5 }) // ignore 4 and 5
    expect(['x', 'y']).to.have.all.keys({ 0: 4, 1: 5 }) // ignore 4 and 5
    expect(new Map([['a', 1], ['b', 2]])).to.have.all.keys('a', 'b')
    expect(new Set(['a', 'b'])).to.have.all.keys('a', 'b')
    expect({ a: 1, b: 2 }).to.be.an('object').that.has.all.keys('a', 'b')
    expect(new Set([{ a: 1 }])).to.have.all.deep.keys([{ a: 1 }])
    expect(new Set([{ a: 1 }])).to.not.have.all.keys([{ a: 1 }])
    expect({ a: 1, b: 2 }).to.not.have.any.keys('c', 'd')
    expect({ a: 1, b: 2 }).to.have.all.keys('a', 'b')
  })

  it('.respondTo(method[, msg])', () => {
    function Cat() { }
    Cat.prototype.meow = function () { }
    expect(new Cat()).to.respondTo('meow')
    expect(Cat).to.respondTo('meow')

    Cat.hiss = function () { }
    expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow')
    expect(new Cat()).to.be.an('object').that.respondsTo('meow')
  })

  it('.itself', () => {
    function Cat() { }
    Cat.prototype.meow = function () { }
    Cat.hiss = function () { }

    expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow')
  })

  it('.satisfy(matcher[, msg])', () => {
    expect(1).to.satisfy(function (num) {
      return num > 0
    })
    expect(1).to.not.satisfy(function (num) {
      return num > 2
    })
  })

  it('.closeTo(expected, delta[, msg])', () => {
    expect(1.5).to.be.closeTo(1, 0.5)
    expect(1.5).to.be.closeTo(2, 0.5)
    expect(1.5).to.be.closeTo(1, 1)
  })

  it('.members(set[, msg])', () => {
    expect([1, 2, 3]).to.have.members([2, 1, 3])
    expect([1, 2, 2]).to.have.members([2, 1, 2])
    expect([{ a: 1 }]).to.have.deep.members([{ a: 1 }])
    expect([{ a: 1 }]).to.not.have.members([{ a: 1 }])
    expect([1, 2, 3]).to.include.members([1, 2])
    expect([1, 2, 3]).to.not.have.members([1, 2])
    expect([1, 2, 3]).to.include.members([1, 2, 2, 2])
  })

  it('.oneOf(list[, msg])', () => {
    expect(1).to.be.oneOf([1, 2, 3])
    expect(1).to.not.be.oneOf([2, 3, 4])
    expect('Today is sunny').to.contain.oneOf(['sunny', 'cloudy'])
    expect('Today is rainy').to.not.contain.oneOf(['sunny', 'cloudy'])
    expect([1, 2, 3]).to.contain.oneOf([3, 4, 5])
    expect([1, 2, 3]).to.not.contain.oneOf([4, 5, 6])
  })

  it('.change(subject[, prop[, msg]])', () => {
    let dots = ''
    const addDot = () => { dots += '.' }
    const getDots = () => dots
    expect(addDot).to.change(getDots)
  })

  it('.decrease(subject[, prop[, msg]])', () => {
    let val = 1
    const subtractTwo = () => { val -= 2 }
    const getVal = () => val
    expect(subtractTwo).to.decrease(getVal) // Not recommended
  })

  it('.by(delta[, msg])', () => {
    const myObj = { val: 1 }
    const addTwo = () => { myObj.val += 2 }
    expect(addTwo).to.increase(myObj, 'val').by(2)
  })

  it('.extensible', () => {
    expect({ a: 1 }).to.be.extensible
    const nonExtensibleObject = Object.preventExtensions({})
    const sealedObject = Object.seal({})
    const frozenObject = Object.freeze({})
    expect(nonExtensibleObject).to.not.be.extensible
    expect(sealedObject).to.not.be.extensible
    expect(frozenObject).to.not.be.extensible
    expect(1).to.not.be.extensible
  })

  it('.sealed', () => {
    const sealedObject = Object.seal({})
    const frozenObject = Object.freeze({})
    expect(sealedObject).to.be.sealed
    expect(frozenObject).to.be.sealed
    expect(1).to.be.sealed
  })

  it('.frozen', () => {
    const frozenObject = Object.freeze({})
    expect(frozenObject).to.be.frozen
    expect(1).to.be.frozen
  })

  it('.finite', () => {
    expect(1).to.be.finite
  })

  it('.fail', () => {
    // expect.fail()
    // expect.fail('custom error message')
  })
})

describe('cosmetic props', () => {
  it('should return 5', () => {
    expect(2 + 3).equal(5)
    expect(2 + 3).to.equal(5)
    expect(2 + 3).to.be.equal(5)
  })
})

it('sinon native assertion vs chai', () => {
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

it('sinon matchers', () => {
  const book = {
    pages: 42,
    author: 'cjno'
  }
  const spy = sinon.spy()

  spy(book)

  sinon.assert.calledWith(spy, sinon.match({ author: 'cjno' }))
  sinon.assert.calledWith(spy, sinon.match.has('pages', 42))
})

describe('spy', () => {
  it('should call the callback', () => {
    const callMyCallback = cb => cb()
    const cbSpy = sinon.spy()
    callMyCallback(cbSpy)
    expect(cbSpy).to.have.been.calledOnce
  })

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
})

describe('stub', () => {
  it('anonymous stub', async () => {
    const myStub = sinon.stub()
    myStub
      .returns('what?')
      .withArgs('hi').returns('Hello')
      .withArgs('bye').returns('Good-bye')

    expect(myStub()).equal('what?')
    expect(myStub('hi')).equal('Hello')
    expect(myStub('bye')).equal('Good-bye')
  })

  it('stub', async () => {
    const obj = {
      fetchPost: function () {
        return axios('https://jsonplaceholder.typicode.com/posts/1')
          .then(res => res.data)
      }
    }
    const fetchPostStubbed = sinon.stub(obj, 'fetchPost')
    fetchPostStubbed
      .returns('hi')

    expect(fetchPostStubbed()).equal('hi')
    fetchPostStubbed.restore()
  })

  it('onCall', () => {
    const myStub = sinon.stub()
    myStub.onCall(0).returns(1)
    myStub.onCall(1).returns(2)
    myStub.returns(3)
    expect(myStub()).equal(1)
    expect(myStub()).equal(2)
    expect(myStub()).equal(3)
  })
})

it('xxx', () => {

})
