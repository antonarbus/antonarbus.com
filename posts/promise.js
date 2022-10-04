import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'promise',
  date: '2021.12.29',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/promise.png',
  desc: 'Promise in JavaScript',
  body: (
    <>
      <H>Syntax</H>

      <Hs>Promise version</Hs>

      <Code block jsx>{`
            const promise = new Promise((resolve, reject) => {
              /* executor code */
              resolve('done')
              reject(new Error('failed'))
            })
            
            promise
              .then(
                result => { console.log(result) },
                error => { console.log(error) }
              )
              .catch(error => { console.log(error) })
              .finally(() => { /* code */ })
      `}</Code>

      <Hs>Async await version</Hs>

      <Code block jsx>{`
            async func() {
              try {
                await promise
                /* code */
              }
              finally {
                /* code */
              }
              catch(error) {
                console.log(error)
              }
            }
      `}</Code>

      <ul>
        <li><i>Promise</i> object runs an asynchronous operation + stores its resulting value + completion (or failure) state</li>
        <li>When new <i>promise</i> is created, the executor runs</li>
        <li>Its arguments <code>resolve</code> & <code>reject</code> are default callbacks</li>
        <li>When function is executed <Code>resolve()</Code> or <Code>reject()</Code> callbacks should be called</li>
        <li><Code>resolve(result)</Code> if the job is finished successfully</li>
        <li><Code>reject(error)</Code> if an error has occurred</li>
        <li><Code>resolve()</Code> or <Code>reject()</Code> should be call only ones.</li>
        <li>All further calls of <Code>resolve()</Code> or <Code>reject()</Code> are ignored</li>
        <li><Code>resolve()</Code> & <Code>reject()</Code> expect only one argument (or none)</li>
        <li>In <Code>reject()</Code> recommended to use an <code>Error</code> object</li>
        <li>Resolved or rejected <i>promise</i> is called <i>settled</i>, as opposed to an initially <i>pending</i></li>
        <li>Returned <i>promise</i> object has internal properties:</li>
        <code>state</code>
        <ul>
          <li><Code>[[PromiseState]] = "pending"</Code> initial state</li>
          <li><Code>[[PromiseState]] = "fulfilled"</Code> when <Code>resolve()</Code> is called</li>
          <li><Code>[[PromiseState]] = "rejected"</Code> when <Code>reject()</Code> is called</li>
        </ul>
        <code>result</code>
        <ul>
          <li><Code>[[PromiseResult]] = "undefined"</Code> initial result</li>
          <li><Code>[[PromiseResult]] = "value"</Code> when <Code>resolve()</Code> called</li>
          <li><Code>[[PromiseResult]] = "error"</Code> when <Code>reject()</Code> is called</li>
        </ul>
        <li>We can’t directly access <code>state</code> & <code>result</code> properties</li>
        <li>But can access them through methods <Code>.then()</Code>, <Code>.catch()</Code>, <Code>.finally()</Code></li>
      </ul>

      <Code block jsx>{`
            // the function is executed automatically when the promise is constructed
            // after 5s job is done with the result "done" or rejected

            // resolve
            let promise = new Promise(function(resolve, reject) {
              setTimeout(() => resolve("done"), 5000)
            })

            // reject
            let promise = new Promise(function(resolve, reject) {
              setTimeout(() => reject(new Error("Whoops!")), 5000)
            })

            // both in one statement
            let promise = new Promise(function(resolve, reject) {
              resolve("done") 
              reject(new Error("…")) // ignored
              setTimeout(() => resolve("…")) // ignored
            });
      `}</Code>

      <H>then, catch, finally</H>

      <p><i>Promise</i> object serves as a link between the executor and the consuming functions</p>

      <Hs>promise.then()</Hs>

      <Code block jsx>{`
            promise.then(
              function(result) {}, 
              function(error) {} 
            )
            // 1st fn - handles a successful result, when the promise is resolved, and receives the result
            // 2nd fn - handles an error, when the promise is rejected, and receives the error
      `}</Code>

      <Code block jsx>{`
            let promise = new Promise(function(resolve, reject) {
              setTimeout(() => resolve("done!"), 1000)
              // or
              setTimeout(() => reject(new Error("Whoops!")), 1000)
            })

            promise.then(
              result => alert(result), // shows "done!" after 1 second
              error => alert(error) // doesn't run
            )
      `}</Code>

      <p>One argument is acceptable</p>

      <Code block jsx>{`
            let promise = new Promise(resolve => {
              setTimeout(() => resolve("done!"), 1000)
            })
            
            promise.then(alert) // shows "done!" after 1 second
      `}</Code>

      <Hs>promise.catch()</Hs>

      <Code block jsx>{`
            // If we’re interested only in errors use null as a 1st arg or use .catch(errorHandlingFunction)
            promise.then(null, errorHandlingFunction)

            let promise = new Promise((resolve, reject) => {
              setTimeout(() => reject(new Error("Whoops!")), 1000);
            })
            
            // .catch(f) is the same as promise.then(null, f)
            promise.catch(alert) // shows "Error: Whoops!" after 1 second
      `}</Code>

      <Hs>promise.finally()</Hs>

      <ul>
        <li><Code>.finally(f)</Code> is similar to <Code>.then(f, f)</Code> </li>
        <li>Always runs when the <i>promise</i> is settled (resolved or rejected)</li>
        <li><i>Finally</i> is a good handler for performing cleanup, e.g. stopping our loading indicators</li>
        <li><i>Finally</i> handler has no arguments</li>
        <li><i>Finally</i> handler passes through results and errors to the next handler</li>
      </ul>

      <Code block jsx>{`
            new Promise((resolve, reject) => {
              setTimeout(() => resolve("result"), 2000)
            })
              .then(result => alert(result)) // <-- .then handles the result
              .catch(err => alert(err)) // <-- .catch handles the error object, if there is any
              .finally(() => alert("Promise ready"))
      `}</Code>

      <H>Example</H>

      <Code block jsx>{`
            function loadScript(src) {
              return new Promise(function(resolve, reject) {
                let script = document.createElement('script')
                script.src = src
                script.onload = () => resolve(script)
                script.onerror = () => reject(new Error(\`Script load error for \${src}\`))
                document.head.append(script)
              })
            }

            // usage
            let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js")
            promise.then(
              script => alert(\`\${script.src} is loaded!\`),
              error => alert(\`Error: \${error.message}\`)
            )
            promise.then(script => alert('Another handler...'))
      `}</Code>

      <H>Promise vs regular code</H>

      <Hs>Regular code</Hs>

      <Code block jsx>{`
            console.log(1)
            console.log(2)
            setTimeout(() => console.log(3), 1000)
            console.log(4)
            // 1, 2, 4, 3
      `}</Code>

      <Hs>Promise code</Hs>

      <Code block jsx>{`
            console.log(1)
            console.log(2)
            const log3 = new Promise(resolve => {
              setTimeout(() => {
                console.log(3)
                resolve('done')
              }, 1000)
            })
            log3.then(result => console.log(4))
            // 1, 2, 3, 4
      `}</Code>

      <H>Promises chaining</H>

      <ul>
        <li>Result is passed through the chain of <i>then/catch/finally</i> handlers</li>
        <li>Handler returns <i>“thenable”</i> object, that has a method <Code>.then()</Code></li>
        <li>Returning promises allows us to build chains of asynchronous actions</li>
      </ul>

      <Code block jsx>{`
            new Promise( resolve => {
              setTimeout(() => resolve(1), 1000)
            }).then( result => { 
              alert(result) // 1
              return result * 2
            }).then( result => { 
              alert(result) // 2
              return result * 2
            }).then( result => {
              alert(result) // 4
              return result * 2
            }) // 1 // 2 // 4
      `}</Code>

      <p>Same as above, but with 1s delay between alerts</p>

      <Code block jsx>{`
            new Promise( resolve => {
              setTimeout(() => resolve(1), 1000)
            }).then( result => {
              alert(result) // 1
              return new Promise( resolve => {
                setTimeout(() => resolve(result * 2), 1000) // 2
              })
            }).then( result => {
              alert(result) // 2
              return new Promise( resolve => {
                setTimeout(() => resolve(result * 2), 1000) // 4
              })
            }).then( result => {
              alert(result) // 4
            }) 
      `}</Code>

      <H>Make function thenable / chainable</H>

      <p>To make a function thenable, just return a <i> promise</i></p>

      <Code block jsx>{`
            // not thenable
            function func() {
              setTimeout(() => '2 sec passed', 2000)
            }
            func().then(res => console.log(res)) // TypeError: Cannot read properties of undefined (reading 'then')
            
            // thenable
            function funcThenable() {
              return new Promise(resolve => {
                setTimeout(() => resolve('2 sec passed'), 2000)
              })
            }
            funcThenable().then(res => console.log(res)) // 2 sec passed
      `}</Code>

      <H>Error handling</H>

      <ul>
        <li>We may have many <Code>.then()</Code> handlers, and use a single <Code>.catch()</Code> at the end</li>
        <li>If any of the promises above rejects, then it would catch it</li>
      </ul>

      <Code block jsx>{`
            fetch('/article/promise-chaining/user.json')
              .then(response => response.json())
              .then(user => fetch(\`https://api.github.com/users/\${user.name}\`))
              .then(response => response.json())
              .catch(error => alert(error.message)) 
      `}</Code>

      <Code block jsx>{`
            new Promise((resolve, reject) => {
              reject(new Error("Whoops!"))
            }).catch(err => alert(err)); // Error: Whoops!

            // same as

            new Promise((resolve, reject) => {
              throw new Error("Whoops!")
            }).catch(err => alert(err)); // Error: Whoops!

            // error in then()
            new Promise((resolve, reject) => {
              resolve("ok");
            }).then((result) => {
              throw new Error("Whoops!"); // rejects the promise
            }).catch(err => alert(err)); // Error: Whoops!

            // catch also handles programming errors
            new Promise((resolve, reject) => {
              resolve("ok");
            }).then((result) => {
              blabla(); // no such function
            }).catch(err => alert(err)); // ReferenceError: blabla is not defined

            // all synchronous errors while the executor is running are handled by try...catch
            // catch() can't handle this error
            new Promise(function(resolve, reject) {
              setTimeout(() => {
                throw new Error("Whoops!");
              }, 1000);
            }).catch(err => alert(err));

            // Unhandled rejections
            new Promise(function() {
              throw new Error("Whoops!");
            }); // no catch to handle the error
            
            // The JS engine tracks such rejections and generates a global error
            window.addEventListener('unhandledrejection', function(event) {
              console.log(event.promise); // [object Promise] - the promise that generated the error
              console.log(event.reason); // Error: Whoops! - the unhandled error object
            })
      `}</Code>

      <H>Promise.all()</H>

      <ul>
        <li>Takes an array of <i>promises</i></li>
        <li>Waits for all promises to resolve and returns an array of their results</li>
        <li>If any of the given promises rejects, it throws an error & other results are ignored </li>
      </ul>

      <Code block jsx>{`
            let p1 = new Promise(resolve => setTimeout(() => resolve(1), 3000))
            let p2 = new Promise(resolve => setTimeout(() => resolve(2), 2000))
            let p3 = new Promise(resolve => setTimeout(() => resolve(3), 1000))
            Promise.all([p1, p2, p3]).then(values => console.log(values)) // [1, 2, 3]
            // same, but with destructuring
            Promise.all([p1, p2, p3]).then(([val1, val2, val3]) => console.log('results: ', val1, val2, val3)) 
      `}</Code>

      <Hs>Rejection</Hs>

      <Code block jsx>{`
            Promise.all([
              new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
              new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
              new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
            ]).catch(alert) // Error: Whoops!
      `}</Code>

      <Hs>Mix <i> promises</i> with regular values</Hs>

      <Code block jsx>{`
            let promiseObj = new Promise(resolve => setTimeout(() => resolve(1), 1000))
              Promise.all([promiseObj, 2, 3]).
              then((res) => console.log(res)) // 1, 2, 3
      `}</Code>

      <Hs>Promise.all & fetch</Hs>

      <ul>
        <li>Fetch returns a <i>promise</i></li>
        <li>We can put them in array with <Code>.map()</Code></li>
      </ul>

      <p>
        Simple example without reading content
      </p>

      <Code block jsx>{`
            let urls = [
              'https://api.github.com/users/iliakan',
              'https://api.github.com/users/remy',
              'https://api.github.com/users/jeresig'
            ]

            let requests = urls.map(url => fetch(url))
            Promise.all(requests)
              .then(responses => responses.forEach(
                response => console.log(\`\${response.url}: \${response.status}\`)
              ))
      `}</Code>

      <p>
        With reading content
      </p>

      <Code block jsx>{`
              let names = ['iliakan', 'remy', 'jeresig'];
                let requests = names.map(name => fetch(\`https://api.github.com/users/\${name}\`));
                Promise.all(requests)
                  .then(responses => Promise.all(responses.map(r => r.json()))) 
                  .then(users => users.forEach(user => console.log(user.name)))
      `}</Code>

      <H>Promise.allSettled()</H>

      <p>Waits for all promises to settle, regardless of the result</p>

      <Code block jsx>{`
            let urls = [
              'https://api.github.com/users/iliakan',
              'https://api.github.com/users/remy',
              'https://no-such-url'
            ]
            
            Promise.allSettled(urls.map(url => fetch(url)))
              .then(results => { 
                results.forEach((result, num) => {
                  if (result.status == "fulfilled") console.log(\`\${urls[num]}: \${result.value.status}\`)
                  if (result.status == "rejected") console.log(\`\${urls[num]}: \${result.reason}\`)
                })
              })

            //  https://api.github.com/users/iliakan: 200
            //  https://api.github.com/users/remy: 200
            //  https://no-such-url: TypeError: Failed to fetch
      `}</Code>

      <H>Promise.race()</H>

      <p>Waits only for the first settled promise and gets its result</p>

      <Code block jsx>{`
            Promise.race([
              new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
              new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
              new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
            ]).then(alert) // 1

            // 1st promise was fastest, it became the result 
            // 1st settled promise “wins the race”, all further results/errors are ignored
      `}</Code>

      <H>Promise.any()</H>

      <ul>
        <li>Waits only for the first <i>fulfilled</i> <i>promise</i> and gets its result</li>
        <li>If all <i>promises</i> are <i>rejected</i>, then the returned <i>promise</i> is <i>rejected</i> with <i>AggregateError</i></li>
        <li>Special error object that stores all <i>promise</i> errors in its errors property</li>
      </ul>

      <Code block jsx>{`
            // first promise here was fastest, but it was rejected, so the second promise became the result
            Promise.any([
              new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
              new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
              new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
            ]).then(alert); // 1

            // example when all promises fail
            Promise.any([
              new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
              new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
            ]).catch(error => {
              console.log(error.constructor.name); // AggregateError
              console.log(error.errors[0]); // Error: Ouch!
              console.log(error.errors[1]); // Error: Error
            });
      `}</Code>

      <H>Promise.resolve() & Promise.reject()</H>

      <ul>
        <li>Creates a <i>resolved</i> or <i>rejected</i> promise with the result value or error</li>
        <li>The method is used for compatibility, when a function is expected to return a <i>promise</i></li>
        <li>Rarely needed in modern code, because of <i>async/await</i> syntax</li>
        <li>Same as <Code>{'let promise = new Promise(resolve => resolve(value))'}</Code></li>
        <li>Same as <Code>{'let promise = new Promise((null, reject) => reject(error))'}</Code></li>
      </ul>

      <Code block jsx>{`
            const status = res => {
              if (res.status >= 200 && res.status < 300) return Promise.resolve(res)
              return Promise.reject(new Error(res.statusText))
            }
            
            const json = res => res.json()
            
            fetch('/todos.json')
              .then(status)    // note that the 'status' function is actually **called** here, and that it **returns a promise***
              .then(json)      // likewise, the only difference here is that the 'json' function here returns a promise that resolves with 'data'
              .then(data => {  // ... which is why 'data' shows up here as the first parameter to the anonymous function
                console.log('Request succeeded with JSON response', data)
              })
              .catch(err => {
                console.log('Request failed', err)
              })
      `}</Code>

      <H>Task queue</H>

      <ul>
        <li>When a <i>promise</i> is ready, its <i>.then/catch/finally</i> handlers are put into the <i>microtasks</i> queue</li>
        <li>When the JS engine becomes free from the <i>macrotask</i>, it executes code from  <i>microtasks</i> queue</li>
        <li>To guarantee that code is executed code in <i>.then/catch/finally</i>, add it into a chained <i>.then</i> call</li>
      </ul>

      <Code block jsx>{`
            function funcA() {
              console.log(1)
              setTimeout(() => { console.log(2) })
              console.log(3)
              Promise.resolve()
                .then(res => console.log(4))
                .then(res => console.log(5))
              console.log(6)
            }
            function funcB() {
              console.log(7)
            }
            
            funcA()
            funcB()
            // 1 3 6 4 5 2
      `}</Code>

      <H>Common errors</H>

      <ul>
        <li><i>TypeError: undefined is not a promise</i> - make sure you use new Promise() instead of just Promise()</li>
        <li><i>UnhandledPromiseRejectionWarning</i> - promise you called rejected, but there was no catch used to handle the error</li>
      </ul>

      <H>async/await</H>

      <ul>
        <li>It is a special syntax to work with promises without chaining</li>
        <li>Just another way of getting the promise result than <Code>.then()</Code></li>
        <li><Code>async</Code> makes function return a promise</li>
        <li>Values are wrapped in a resolved promise automatically</li>
        <li><Code>await</Code> makes JS wait until a promise settles and returns its result</li>
        <li><Code>await</Code> works only inside <Code>async</Code></li>
        <li>Can’t use <Code>await</Code> in regular functions</li>
        <li>Top-level <Code>await</Code> works outside <Code>async</Code> functions in modules, in Chrome DevTools & Node.js & Safari Web Inspector</li>
      </ul>

      <Code block jsx>{`
            async function f() { return 1 }
            f().then(alert) // 1
      `}</Code>

      <Hs><Code>await</Code> for<i>promise</i></Hs>

      <Code block jsx>{`
            // example 1
            let promise = new Promise(resolve => setTimeout(() => resolve("done!"), 1000))
            promise // Promise {<fulfilled>: 'done!'} // not the result itself
            let result = await promise // wait until the promise resolves
            alert(result) // "done!"

            // example 2
            async function hi() { return 'hi' }
            hi() // Promise {<fulfilled>: 'hi'}
            // but
            const res = await hi()
            alert(res) // 'hi'

            // example 3
            let response = await fetch('https://api.github.com/users/iliakan')
            let user = await response.json()
            await new Promise((resolve, reject) => setTimeout(resolve, 3000));
            console.log(user)

            // example 4
            await new Promise(resolve => setTimeout(resolve, 1000))
            return 10
      `}</Code>

      <Hs><Code>await</Code> accepts<i>“thenables”</i></Hs>

      <ul>
        <li><Code>await</Code> allows to use thenable objects (with a callable then method)</li>
        <li>The idea is that a third-party object may not be a promise, but promise-compatible</li>
        <li>if an object supports .then, that’s enough to use it with <Code>await</Code></li>
      </ul>

      <Code block jsx>{`
            class Thenable {
              constructor(num) { this.num = num }
              then(resolve, reject) {
                setTimeout(() => resolve(this.num * 2), 1000) // resolve with this.num*2 after 1000ms
              }
            }
            let result = await new Thenable(1) // waits for 1 second, then result becomes 2
            alert(result) // 2
      `}</Code>

      <Hs><Code>async</Code> class methods</Hs>

      <Code block jsx>{`
            // To declare an async class method, just prepend it with async
            class Waiter {
              async wait() {
                return await Promise.resolve(1)
              }
            }
            
            new Waiter()
              .wait()
              .then(alert); // 1 (this is the same as (result => alert(result)))
      `}</Code>

      <Hs>Error handling</Hs>

      <Code block jsx>{`
            try {
              let response = await fetch('http://no-such-url')
              let user = await response.json()
            } catch(err) {
              alert(err) // TypeError: failed to fetch
            }

            // or

            async function f() {
              let response = await fetch('http://no-such-url');
            }
            f().catch(alert); // TypeError: failed to fetch

            // or 

            // if we do not have catch we may handle unhandled errors with 
            window.addEventListener('unhandledrejection', function(event) {
              alert(event.promise)
              alert(event.reason)
            })
      `}</Code>

      <Hs>async / await + <Code>Promise.all()</Code></Hs>

      <Code block jsx>{`
            let p1 = new Promise(res => setTimeout(() => res(1), 3000))
            let p2 = new Promise(res => setTimeout(() => res(2), 2000))
            let p3 = new Promise(res => setTimeout(() => res(3), 1000))
            Promise.all([p1, p2, p3]).then(values => console.log(values)) // [1, 2, 3]
            // same as
            let res = await Promise.all([p1, p2, p3])
            console.log(res)
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
