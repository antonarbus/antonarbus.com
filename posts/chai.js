import { Code, H, Lnk, jsxToStr, Hs } from '/components/post/reExport'

const postObj = {
  title: 'chai',
  date: '2022.05.17',
  tags: ['test'],
  imgUrl: 'https://antonarbus.com/imgs/chai.png',
  desc: 'test with chai',
  body: (
    <>
      <H>Installation</H>

      <ul>
        <li><Lnk path='https://mochajs.org/'>Mocha</Lnk> is a test framework for NodeJS.</li>
        <li><Lnk path='https://www.chaijs.com/'>Chai</Lnk> is assertion library for any test framework.</li>
      </ul>

      <Code bash>npm i mocha chai --save-dev</Code>

      <p>Add script into <code>package.json</code></p>

      <Code block json>{`
      "scripts": {
        "dev": "node exportAllPostsCreate && next dev",
        "build": "node exportAllPostsCreate && next build",
        "start": "next start",
        "lint": "next lint",
        "test": "jest --watch || true",
        "mocha": "mocha"
      }
      `}</Code>

      <p>By default mocha looks for a <code>test</code> folder, where we can create test files.</p>

      <Code block jsx>{`
      // test/mytest.js

      const assert = require('chai').assert

      describe('basic tests', () => {
        it('should return 5', () => {
          assert.equal(2 + 3, 5)
        })
      })
      `}</Code>

      <p>Run tests with command <Code bash>npm run mocha</Code> and see the output.</p>

      <Code block none>{`
      basic tests
        ✔ should return 5
      1 passing (2ms)
      `}</Code>

      <H>Assert vs Expect</H>

      <Code block jsx>{`
      const assert = require('chai').assert
      const expect = require('chai').expect

      describe('assert', () => {
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
      `}</Code>

      <H>Cosmetic properties</H>

      <p>They do not mean anything: <code>.to</code>, <code>.be</code>, <code>.been</code>, <code>.is</code>, <code>.that</code>, <code>.which</code>, <code>.and</code>, <code>.has</code>, <code>.have</code>, <code>.with</code>, <code>.at</code>, <code>.of</code>, <code>.same</code>, <code>.but</code>, <code>.does</code>, <code>.still</code>, <code>.also</code></p>

      <Code block jsx>{`
      describe('cosmetic props', () => {
        it('should return 5', () => {
          expect(2 + 3).equal(5)
          expect(2 + 3).to.equal(5)
          expect(2 + 3).to.be.equal(5)
        })
      })
      `}</Code>

      <H>Assertions</H>

      <Hs>Expect & should</Hs>

      <p>Expect & should assertion <Lnk path='https://www.chaijs.com/api/bdd/'>methods</Lnk>.</p>

      <p>
        <Code>not</Code>, {' '}
        <Code>deep</Code>, {' '}
        <Code>nested</Code>, {' '}
        <Code>own</Code>, {' '}
        <Code>ordered</Code>, {' '}
        <Code>any</Code>, {' '}
        <Code>all</Code>, {' '}
        <Code>a(type)</Code>, {' '}
        <Code>include(val)</Code>, {' '}
        <Code>ok</Code>, {' '}
        <Code>true</Code>, {' '}
        <Code>false</Code>, {' '}
        <Code>null</Code>, {' '}
        <Code>undefined</Code>, {' '}
        <Code>NaN</Code>, {' '}
        <Code>exist</Code>, {' '}
        <Code>empty</Code>, {' '}
        <Code>arguments</Code>, {' '}
        <Code>equal(val)</Code>, {' '}
        <Code>eql(obj)</Code>, {' '}
        <Code>above(n)</Code>, {' '}
        <Code>least(n)</Code>, {' '}
        <Code>below(n)</Code>, {' '}
        <Code>most(n)</Code>, {' '}
        <Code>within(start, finish)</Code>, {' '}
        <Code>instanceof(constructor)</Code>, {' '}
        <Code>property(name)</Code>, {' '}
        <Code>ownPropertyDescriptor(name)</Code>, {' '}
        <Code>lengthOf(n)</Code>, {' '}
        <Code>match(re)</Code>, {' '}
        <Code>string(str)</Code>, {' '}
        <Code>keys(key1, key2)</Code>, {' '}
        <Code>throw()</Code>, {' '}
        <Code>respondTo(method)</Code>, {' '}
        <Code>itself</Code>, {' '}
        <Code>satisfy(matcher)</Code>, {' '}
        <Code>closeTo(expected, delta)</Code>, {' '}
        <Code>members(set)</Code>, {' '}
        <Code>oneOf(list)</Code>, {' '}
        <Code>change(subject)</Code>, {' '}
        <Code>increase(subject)</Code>, {' '}
        <Code>decrease(subject)</Code>, {' '}
        <Code>by(delta)</Code>, {' '}
        <Code>extensible</Code>, {' '}
        <Code>sealed</Code>, {' '}
        <Code>frozen</Code>, {' '}
        <Code>finite</Code>, {' '}
        <Code>fail()</Code>
      </p>

      <Hs>Assert</Hs>

      <p>Assert <Lnk path='https://www.chaijs.com/api/assert/'>methods</Lnk>.</p>

      <p>
        <Code>fail</Code>, {' '}
        <Code>isOk</Code>, {' '}
        <Code>isNotOk</Code>, {' '}
        <Code>equal</Code>, {' '}
        <Code>notEqual</Code>, {' '}
        <Code>strictEqual</Code>, {' '}
        <Code>notStrictEqual</Code>, {' '}
        <Code>deepEqual</Code>, {' '}
        <Code>notDeepEqual</Code>, {' '}
        <Code>isAbove</Code>, {' '}
        <Code>isAtLeast</Code>, {' '}
        <Code>isBelow</Code>, {' '}
        <Code>isAtMost</Code>, {' '}
        <Code>isTrue</Code>, {' '}
        <Code>isNotTrue</Code>, {' '}
        <Code>isFalse</Code>, {' '}
        <Code>isNotFalse</Code>, {' '}
        <Code>isNull</Code>, {' '}
        <Code>isNotNull</Code>, {' '}
        <Code>isNaN</Code>, {' '}
        <Code>isNotNaN</Code>, {' '}
        <Code>exists</Code>, {' '}
        <Code>notExists</Code>, {' '}
        <Code>isUndefined</Code>, {' '}
        <Code>isDefined</Code>, {' '}
        <Code>isFunction</Code>, {' '}
        <Code>isNotFunction</Code>, {' '}
        <Code>isObject</Code>, {' '}
        <Code>isNotObject</Code>, {' '}
        <Code>isArray</Code>, {' '}
        <Code>isNotArray</Code>, {' '}
        <Code>isString</Code>, {' '}
        <Code>isNotString</Code>, {' '}
        <Code>isNumber</Code>, {' '}
        <Code>isNotNumber</Code>, {' '}
        <Code>isFinite</Code>, {' '}
        <Code>isBoolean</Code>, {' '}
        <Code>isNotBoolean</Code>, {' '}
        <Code>typeOf</Code>, {' '}
        <Code>notTypeOf</Code>, {' '}
        <Code>instanceOf</Code>, {' '}
        <Code>notInstanceOf</Code>, {' '}
        <Code>include</Code>, {' '}
        <Code>notInclude</Code>, {' '}
        <Code>deepInclude</Code>, {' '}
        <Code>notDeepInclude</Code>, {' '}
        <Code>nestedInclude</Code>, {' '}
        <Code>notNestedInclude</Code>, {' '}
        <Code>deepNestedInclude</Code>, {' '}
        <Code>notDeepNestedInclude</Code>, {' '}
        <Code>ownInclude</Code>, {' '}
        <Code>notOwnInclude</Code>, {' '}
        <Code>deepOwnInclude</Code>, {' '}
        <Code>notDeepOwnInclude</Code>, {' '}
        <Code>match</Code>, {' '}
        <Code>notMatch</Code>, {' '}
        <Code>property</Code>, {' '}
        <Code>notProperty</Code>, {' '}
        <Code>propertyVal</Code>, {' '}
        <Code>notPropertyVal</Code>, {' '}
        <Code>deepPropertyVal</Code>, {' '}
        <Code>notDeepPropertyVal</Code>, {' '}
        <Code>nestedProperty</Code>, {' '}
        <Code>notNestedProperty</Code>, {' '}
        <Code>nestedPropertyVal</Code>, {' '}
        <Code>notNestedPropertyVal</Code>, {' '}
        <Code>deepNestedPropertyVal</Code>, {' '}
        <Code>notDeepNestedPropertyVal</Code>, {' '}
        <Code>lengthOf</Code>, {' '}
        <Code>hasAnyKeys</Code>, {' '}
        <Code>hasAllKeys</Code>, {' '}
        <Code>containsAllKeys</Code>, {' '}
        <Code>doesNotHaveAnyKeys</Code>, {' '}
        <Code>doesNotHaveAllKeys</Code>, {' '}
        <Code>hasAnyDeepKeys</Code>, {' '}
        <Code>hasAllDeepKeys</Code>, {' '}
        <Code>containsAllDeepKeys</Code>, {' '}
        <Code>doesNotHaveAnyDeepKeys</Code>, {' '}
        <Code>doesNotHaveAllDeepKeys</Code>, {' '}
        <Code>throws</Code>, {' '}
        <Code>doesNotThrow</Code>, {' '}
        <Code>operator</Code>, {' '}
        <Code>closeTo</Code>, {' '}
        <Code>approximately</Code>, {' '}
        <Code>sameMembers</Code>, {' '}
        <Code>notSameMembers</Code>, {' '}
        <Code>sameDeepMembers</Code>, {' '}
        <Code>notSameDeepMembers</Code>, {' '}
        <Code>sameOrderedMembers</Code>, {' '}
        <Code>notSameOrderedMembers</Code>, {' '}
        <Code>sameDeepOrderedMembers</Code>, {' '}
        <Code>notSameDeepOrderedMembers</Code>, {' '}
        <Code>includeMembers</Code>, {' '}
        <Code>notIncludeMembers</Code>, {' '}
        <Code>includeDeepMembers</Code>, {' '}
        <Code>notIncludeDeepMembers</Code>, {' '}
        <Code>includeOrderedMembers</Code>, {' '}
        <Code>notIncludeOrderedMembers</Code>, {' '}
        <Code>includeDeepOrderedMembers</Code>, {' '}
        <Code>notIncludeDeepOrderedMembers</Code>, {' '}
        <Code>oneOf</Code>, {' '}
        <Code>changes</Code>, {' '}
        <Code>changesBy</Code>, {' '}
        <Code>doesNotChange</Code>, {' '}
        <Code>changesButNotBy</Code>, {' '}
        <Code>increases</Code>, {' '}
        <Code>increasesBy</Code>, {' '}
        <Code>doesNotIncrease</Code>, {' '}
        <Code>increasesButNotBy</Code>, {' '}
        <Code>decreases</Code>, {' '}
        <Code>decreasesBy</Code>, {' '}
        <Code>doesNotDecrease</Code>, {' '}
        <Code>doesNotDecreaseBy</Code>, {' '}
        <Code>decreasesButNotBy</Code>, {' '}
        <Code>ifError</Code>, {' '}
        <Code>isExtensible</Code>, {' '}
        <Code>isNotExtensible</Code>, {' '}
        <Code>isSealed</Code>, {' '}
        <Code>isNotSealed</Code>, {' '}
        <Code>isFrozen</Code>, {' '}
        <Code>isNotFrozen</Code>, {' '}
        <Code>isEmpty</Code>, {' '}
        <Code>isNotEmpty</Code>
      </p>

      <H>equal</H>

      <Code block jsx>{`
      it('should return 5', () => {
        assert.equal(2 + 3, 5)
      })
      `}</Code>

      <H>typeOf</H>

      <Code block jsx>{`
      it('should be a string', () => {
        assert.typeOf('hi', 'string')
      })
      `}</Code>

      <H>isAbove</H>

      <Code block jsx>{`
      it('should be > 5', () => {
        assert.isAbove(100, 5)
      })
      `}</Code>

      <H>not</H>

      <Code block jsx>{`
      it('.not', () => {
        expect(function () { }).to.not.throw()
        expect({ a: 1 }).to.not.have.property('b')
        expect([1, 2]).to.be.an('array').that.does.not.include(3)
      })
      `}</Code>

      <H>deep</H>
      <Code block jsx>{`
      it('.deep', () => {
        // Target object deeply (but not strictly) equals \`{a: 1}\`
        expect({ a: 1 }).to.deep.equal({ a: 1 })
        expect({ a: 1 }).to.not.equal({ a: 1 })
      })
      `}</Code>

      <H>ordered</H>
      <Code block jsx>{`
      it('.ordered', () => {
        expect([1, 2]).to.have.ordered.members([1, 2])
          .but.not.have.ordered.members([2, 1])
      })
      `}</Code>

      <H>any</H>
      <Code block jsx>{`
      it('.any', () => {
        expect({ a: 1, b: 2 }).to.not.have.any.keys('c', 'd')
      })
      `}</Code>

      <H>all</H>
      <Code block jsx>{`
      it('.all', () => {
        expect({ a: 1, b: 2 }).to.have.all.keys('a', 'b')
      })
      `}</Code>

      <H>a(type)</H>
      <Code block jsx>{`
      it('.a(type)', () => {
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
      `}</Code>

      <H>include</H>
      <Code block jsx>{`
      it('.include(val)', () => {
        expect('foobar').to.include('foo')
        expect([1, 2, 3]).to.include(2)
        expect({ a: 1, b: 2, c: 3 }).to.include({ a: 1, b: 2 })
        expect(new Set([1, 2])).to.include(2)
        expect(new Map([['a', 1], ['b', 2]])).to.include(2)
        expect([1, 2, 3]).to.be.an('array').that.includes(2)
      })
      `}</Code>

      <H>true</H>
      <Code block jsx>{`
      it('.true', () => {
        expect(true).to.be.true
        expect(false).to.not.be.true
      })
      `}</Code>

      <H>false</H>
      <Code block jsx>{`
      it('.false', () => {
        expect(false).to.be.false
        expect(true).to.not.be.false
      })
      `}</Code>

      <H>null</H>
      <Code block jsx>{`
      it('.null', () => {
        expect(null).to.be.null
      })
      `}</Code>

      <H>undefined</H>
      <Code block jsx>{`
      it('.undefined', () => {
        expect(undefined).to.be.undefined
      })
      `}</Code>

      <H>NaN</H>
      <Code block jsx>{`
      it('.NaN', () => {
        expect(NaN).to.be.NaN
        expect('foo').to.not.be.NaN
      })
      `}</Code>

      <H>exist</H>
      <Code block jsx>{`
      it('.exist', () => {
        expect(1).to.exist
      })
      `}</Code>

      <H>empty</H>
      <Code block jsx>{`
      it('.empty', () => {
        expect([]).to.be.empty
        expect('').to.be.empty
        expect(new Set()).to.be.empty
        expect(new Map()).to.be.empty
        expect({}).to.be.empty
        expect([]).to.be.an('array').that.is.empty
        expect([1, 2, 3]).to.not.be.empty
      })
      `}</Code>

      <H>equal</H>
      <Code block jsx>{`
      it('.equal(val)', () => {
        expect(1).to.equal(1)
        expect('foo').to.equal('foo')
        expect({ a: 1 }).to.deep.equal({ a: 1 })
        expect({ a: 1 }).to.not.equal({ a: 1 })
        expect([1, 2]).to.deep.equal([1, 2])
        expect([1, 2]).to.not.equal([1, 2])
      })
      `}</Code>

      <H>above</H>
      <Code block jsx>{`
      it('.above(n)', () => {
        expect(2).to.be.above(1)
      })
      `}</Code>

      <H>least</H>
      <Code block jsx>{`
      it('.least(n)', () => {
        expect(2).to.be.at.least(1)
        expect(2).to.be.at.least(2)
        expect('foo').to.have.lengthOf.at.least(2)
        expect(1).to.not.be.at.least(2)
      })
      `}</Code>

      <H>below</H>
      <Code block jsx>{`
      it('.below(n', () => {
        expect(1).to.be.below(2)
        expect('foo').to.have.lengthOf.below(4)
        expect([1, 2, 3]).to.have.lengthOf.below(4)
      })
      `}</Code>

      <H>most</H>
      <Code block jsx>{`
      it('.most(n)', () => {
        expect(1).to.be.at.most(2)
        expect(1).to.be.at.most(1)
        expect('foo').to.have.lengthOf.at.most(4)
        expect([1, 2, 3]).to.have.lengthOf.at.most(4)
      })
      `}</Code>

      <H>within</H>
      <Code block jsx>{`
      it('.within(start, finish)', () => {
        expect(2).to.be.within(1, 3)
        expect([1, 2, 3]).to.have.lengthOf.within(2, 4)
      })
      `}</Code>

      <H>instanceof</H>
      <Code block jsx>{`
      it('.instanceof(constructor)', () => {
        function Cat() { }

        expect(new Cat()).to.be.an.instanceof(Cat)
        expect([1, 2]).to.be.an.instanceof(Array)
        expect({ a: 1 }).to.not.be.an.instanceof(Array)
      })
      `}</Code>

      <H>property</H>
      <Code block jsx>{`
      it('.property(name[, val])', () => {
        expect({ a: 1 }).to.have.property('a')
        expect({ a: 1 }).to.have.property('a', 1)
        expect({ x: { a: 1 } }).to.have.deep.property('x', { a: 1 })
        expect({ x: { a: 1 } }).to.not.have.property('x', { a: 1 })
        expect({ x: { a: 1 } }).to.have.deep.own.property('x', { a: 1 })
        expect({ a: { b: ['x', 'y'] } }).to.have.nested.property('a.b[1]')
        expect({ a: { b: ['x', 'y'] } }).to.have.nested.property('a.b[1]', 'y')
      })
      `}</Code>

      <H>lengthOf</H>
      <Code block jsx>{`
      it('.lengthOf(n)', () => {
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
      `}</Code>

      <H>match</H>
      <Code block jsx>{`
      it('.match(re)', () => {
        expect('foobar').to.match(/^foo/)
        expect('foobar').to.not.match(/taco/)
      })
      `}</Code>

      <H>string</H>
      <Code block jsx>{`
      it('.string(str)', () => {
        expect('foobar').to.have.string('bar')
        expect('foobar').to.not.have.string('taco')
      })
      `}</Code>

      <H>keys</H>
      <Code block jsx>{`
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
      `}</Code>

      <H>respondTo</H>
      <Code block jsx>{`
      it('.respondTo(method)', () => {
        function Cat() { }
        Cat.prototype.meow = function () { }
        expect(new Cat()).to.respondTo('meow')
        expect(Cat).to.respondTo('meow')

        Cat.hiss = function () { }
        expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow')
        expect(new Cat()).to.be.an('object').that.respondsTo('meow')
      })
      `}</Code>

      <H>itself</H>
      <Code block jsx>{`
      it('.itself', () => {
        function Cat() { }
        Cat.prototype.meow = function () { }
        Cat.hiss = function () { }

        expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow')
      })
      `}</Code>

      <H>satisfy</H>
      <Code block jsx>{`
      it('.satisfy(matcher)', () => {
        expect(1).to.satisfy(function (num) {
          return num > 0
        })
        expect(1).to.not.satisfy(function (num) {
          return num > 2
        })
      })
      `}</Code>

      <H>closeTo</H>
      <Code block jsx>{`
      it('.closeTo(expected, delta)', () => {
        expect(1.5).to.be.closeTo(1, 0.5)
        expect(1.5).to.be.closeTo(2, 0.5)
        expect(1.5).to.be.closeTo(1, 1)
      })
      `}</Code>

      <H>members</H>
      <Code block jsx>{`
      it('.members(set)', () => {
        expect([1, 2, 3]).to.have.members([2, 1, 3])
        expect([1, 2, 2]).to.have.members([2, 1, 2])
        expect([{ a: 1 }]).to.have.deep.members([{ a: 1 }])
        expect([{ a: 1 }]).to.not.have.members([{ a: 1 }])
        expect([1, 2, 3]).to.include.members([1, 2])
        expect([1, 2, 3]).to.not.have.members([1, 2])
        expect([1, 2, 3]).to.include.members([1, 2, 2, 2])
      })
      `}</Code>

      <H>oneOf</H>
      <Code block jsx>{`
      it('.oneOf(list)', () => {
        expect(1).to.be.oneOf([1, 2, 3])
        expect(1).to.not.be.oneOf([2, 3, 4])
        expect('Today is sunny').to.contain.oneOf(['sunny', 'cloudy'])
        expect('Today is rainy').to.not.contain.oneOf(['sunny', 'cloudy'])
        expect([1, 2, 3]).to.contain.oneOf([3, 4, 5])
        expect([1, 2, 3]).to.not.contain.oneOf([4, 5, 6])
      })
      `}</Code>

      <H>change</H>
      <Code block jsx>{`
      it('.change(subject[, prop])', () => {
        let dots = ''
        const addDot = () => { dots += '.' }
        const getDots = () => dots
        expect(addDot).to.change(getDots)
      })
      `}</Code>

      <H>decrease</H>
      <Code block jsx>{`
      it('.decrease(subject[, prop])', () => {
        let val = 1
        const subtractTwo = () => { val -= 2 }
        const getVal = () => val
        expect(subtractTwo).to.decrease(getVal) // Not recommended
      })
      `}</Code>

      <H>by</H>
      <Code block jsx>{`
      it('.by(delta)', () => {
        const myObj = { val: 1 }
        const addTwo = () => { myObj.val += 2 }
        expect(addTwo).to.increase(myObj, 'val').by(2)
      })
      `}</Code>

      <H>extensible</H>
      <Code block jsx>{`
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
      `}</Code>

      <H>sealed</H>
      <Code block jsx>{`
      it('.sealed', () => {
        const sealedObject = Object.seal({})
        const frozenObject = Object.freeze({})
        expect(sealedObject).to.be.sealed
        expect(frozenObject).to.be.sealed
        expect(1).to.be.sealed
      })
      `}</Code>

      <H>frozen</H>
      <Code block jsx>{`
      it('.frozen', () => {
        const frozenObject = Object.freeze({})
        expect(frozenObject).to.be.frozen
        expect(1).to.be.frozen
      })
      `}</Code>

      <H>finite</H>
      <Code block jsx>{`
      it('.finite', () => {
        expect(1).to.be.finite
      })
      `}</Code>

      <H>fail</H>
      <Code block jsx>{`
      it('.fail', () => {
        expect.fail()
        expect.fail('custom error message')
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
