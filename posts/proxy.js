'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'proxy',
  date: '2021.12.31',
  tags: ['xxx', 'xxx'],
  imgUrl: 'https://antonarbus.com/imgs/proxy.webp',
  desc: ['JavaScript', 'basics'],
  body: (
    <>
      <ul>
        <li>Proxy - object wraps another object and intercepts operations, like reading/writing properties</li>
        <li>Proxy provide a way to tweak the behavior of the existing objects at the lowest level</li>
        <li>Proxy is more powerful than just a fn wrapper, as it forwards everything to the target object</li>
      </ul>

      <H>Syntax</H>

      <p>
        <Code>let proxy = new Proxy(target, handler)</Code> <br />
        <code>target</code> - object to wrap, can be anything, including functions <br />
        <code>handler</code> – proxy configuration: an object with “traps”, methods that intercept operations
      </p>

      <H>Handler methods</H>

      <p>
        Triggers when <br />
        <code>get</code> - reading a property <br />
        <code>set</code> - writing to a property <br />
        <code>has</code> - in operator <br />
        <code>deleteProperty</code> - delete operator <br />
        <code>apply</code> - function call <br />
        <code>construct</code> - new operator <br />
        <code>getPrototypeOf</code> - <code>Object.getPrototypeOf</code> <br />
        <code>setPrototypeOf</code> - <code>Object.setPrototypeOf</code> <br />
        <code>isExtensible</code> - <code>Object.isExtensible</code> <br />
        <code>preventExtensions</code> - <code>Object.preventExtensions</code> <br />
        <code>defineProperty</code> - <code>Object.defineProperty</code>, <code>Object.defineProperties</code> <br />
        <code>getOwnPropertyDescriptor</code> - <code>Object.getOwnPropertyDescriptor</code>, <code>for...in</code>, <code>Object.keys/values/entries</code> <br />
        <code>ownKeys</code> - <code>Object.getOwnPropertyNames</code>, <code>Object.getOwnPropertySymbols</code>, <code>for...in</code>, <code> Object.keys/values/entries</code> <br />
      </p>

      <H>No own properties</H>

      <p>With an empty handler it transparently forwards operations to target</p>

      <Code block jsx>{`
            let target = {}
            let proxy = new Proxy(target, {}) // empty handler
            proxy.test = 5
            target.test // 5
            proxy.test // 5
            for(let key in proxy) alert(key); // test
      `}</Code>

      <H>Get trap</H>

      <p>Get trap triggers when a property is read</p>

      <Code block jsx>{`
            let numbers = [0, 1, 2]
            numbers = new Proxy(numbers, {
              get(target, prop) {
                if (prop in target) return target[prop]
                return 0
              }
            })

            numbers[1] // 1
            numbers[123] // 0 (no such item)
      `}</Code>

      <Code block jsx>{`
            let dictionary = {
              'Hello': 'Hola',
              'Bye': 'Adiós'
            }
            
            dictionary = new Proxy(dictionary, {
              get(target, phrase) { 
                if (phrase in target) return target[phrase]
                return "no translation"
                }
              }
            )
        
            dictionary['Hello'] // Hola
            dictionary['Welcome to Proxy'] // no translation
      `}</Code>

      <H>Set trap</H>

      <p>Set trap triggers when a property is written</p>

      <Code block jsx>{`
            let numbers = []
            numbers = new Proxy(numbers, {
              set(target, prop, val) { // to intercept property writing
                if (typeof val !== 'number') return false 
                target[prop] = val;
                return true
              }
            })

            numbers.push(1) // added successfully
            numbers.push(2) // added successfully
            numbers.push("test") // TypeError ('set' on proxy returned false)
            numbers // Proxy {0: 1, 1: 2}
      `}</Code>

      <H>ownKeys</H>

      <p>Skip props with keys starting from "_"</p>

      <Code block jsx>{`
            let user = {
              name: "John",
              age: 30,
              _password: "***"
            }

            user = new Proxy(user, {
              ownKeys(target) {
                return Object.keys(target).filter(key => !key.startsWith('_'));
              }
            })

            for(let key in user) alert(key); // name, age
            Object.keys(user) // ['name', 'age']
            Object.values(user) // ['John', 30]
      `}</Code>

      <H>apply</H>

      <p>Make a wrapper function, which delays original function by 3s</p>

      <Code block jsx>{`
            function delay(f, ms) {
              return new Proxy(f, {
                apply(target, thisArg, args) {
                  setTimeout(() => target.apply(thisArg, args), ms)
                }
              })
            }
            
            function sayHi(user) {
              alert(\`Hello, \${user}!\`)
            }
            
            sayHi = delay(sayHi, 3000)
            sayHi.length // 1 // proxy forwards "get length" operation to the target
            sayHi("John"); // Hello, John! (after 3 seconds)
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
