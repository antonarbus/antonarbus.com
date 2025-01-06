import { Code, H, jsxToStr, Lnk } from '/components/post/reExport'

const postObj = {
  title: 'error',
  date: '2021.12.29',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/error.jpg',
  desc: 'Error handling in JavaScript',
  body: (
    <>
      <H>
        <code>.then().catch()</code>
      </H>

      <Code block jsx>{`
        async function getCheese(shouldError = false) {
          // after 1 second, return an array of cheese or Reject with an error
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (shouldError) {
                return reject('Cheese Sucks')
              }
            }, 1)
          })

          resolve(['cheddar', 'brie', 'gouda']);
        }
      `}</Code>

      <Code block jsx>{`
        getCheese()
          .then(cheeses => {
            console.log (cheeses) // ['cheddar', 'brie', 'gouda']
          })
          .catch(herr => console.log(err))
      `}</Code>

      <H>
        <code>try…catch</code>
      </H>

      <Code block jsx>{`
        try {
          const cheese = await getCheese()
          console.log(cheese) // ['cheddar', 'brie', 'gouda']
        } catch(err) {
          console.log(err)
        }
      `}</Code>

      <H>
        <code>await</code> + <code>catch</code>
      </H>

      <Code block jsx>{`
        const myCheese = await getCheese().catch(err => console.log(err))
        console.log(myCheese) // ['cheddar', 'brie', 'gouda']
      `}</Code>

      <H>
        error handling with <code>Promise.allSettled()</code>
      </H>

      <ul>
        <li>
          <Lnk path="https://youtu.be/wsoQ-fgaoyQ?si=MX5SvTAkJq4PqO-7&t=778">
            https://youtu.be/wsoQ-fgaoyQ?si=MX5SvTAkJq4PqO-7&t=778
          </Lnk>

          <Code block jsx>{`
            function wrapIt(promise) {
              // Promise.allSettled() will return an array of objects, we grab the first one
              // That object will only ever have one of these properties:
              // "value" - the resolved data
              // OR
              // "reason" - the rejected error

              return Promise.allSettled([promise]).then(function([{ value, reason }]) {
                return [value, reason]
            }

            const [data, err] = await wrapIt(getCheese()) // [[ 'cheddar', 'brie', 'gouda' ], undefined ]
            const [cheese, cheeseError] = await wrapIt(getCheese(true)) // [ undefined, 'Cheese Sucks' ]
          `}</Code>
        </li>
        <li>may also return not an array, but an object</li>

        <Code block jsx>{`
            function wrapIt(promise) {
              return Promise.allSettled([promise]).then(function([{ value, reason }]) {
                return { data: value, error: reason }
            }

            const result = await wrapIt(getCheese()) 

            if (result.error) {
              console.log(error)
              return
            }

            console.log(result.data)
        `}</Code>
      </ul>

      <H>
        <>try…catch…finally</>
      </H>

      <ul>
        <li>
          code to be put into <code>try</code> block
        </li>
        <li>
          if no errors, then <code>catch</code> block is ignored
        </li>
        <li>if an error the script is not killed</li>
        <li>
          <code>try...catch</code> works synchronously, no delayed functions will be executed
        </li>
        <li>
          if an error occurs, then execution in <code>try</code> block is stopped
        </li>
        <li>
          <code>try...catch</code> can only handle errors that occur in valid code
        </li>
        <li>
          <code>catch</code> block has default <code>error</code> variable which contains an error
          object
        </li>
        <li>
          <code>finally</code> block always executes
        </li>
        <li>
          <code>catch</code> or <code>finally</code> can be omitted
        </li>
      </ul>

      <Code block jsx>{`
      try {
        alert('Start of try runs')
        lalala // error, variable is not defined!
        alert('End of try (never reached)')
      } catch(err) {
        alert(\`Error has occurred!\`)
        console.dir(err)
      } finally {
        alert('bugs happens, do not get upset')
      }
      `}</Code>

      <H>
        <code>error</code> variable is optional
      </H>

      <Code block jsx>{`
      try {
        alert('Start of try runs')
        lalala // error, variable is not defined!
        alert('End of try (never reached)')
      } catch {
        alert(\`Error has occurred!\`)
      } finally {
        alert('bugs happens, do not get upset')
      }
      `}</Code>

      <H>
        <code>finally</code> with <code>return</code>
      </H>

      <ul>
        <li>
          <code>return</code> value in <code>finally</code> block overwrites a value in{' '}
          <code>try</code> block
        </li>
      </ul>

      <Code block jsx>{`
      function example() {
        try {
          return true;
        }
        finally {
          console.log('finally')
          return false
        }
      }
      // finally
      // false
      `}</Code>

      <H>Scheduled function</H>

      <Code block jsx>{`
      setTimeout(function() {
        try {
          noSuchVariable // try...catch handles the error!
        } catch (err) {
          alert( "error is caught here!" )
        }
      }, 1000)
      `}</Code>

      <H>
        <code>Error</code> object
      </H>

      <Code block jsx>{`
      try {
        lalala; // error, variable is not defined!
      } catch (err) {
        alert(err.name); // ReferenceError
        alert(err.message); // lalala is not defined
        alert(err.stack); // ReferenceError: lalala is not defined at (...call stack)
      
        // Can also show an error as a whole
        // The error is converted to string as "name: message"
        alert(err); // ReferenceError: lalala is not defined 
      } 
      `}</Code>

      <H>Create error object</H>

      <Code block jsx>{`
      let error = new Error(message)
      let error = new SyntaxError(message)
      let error = new ReferenceError(message)
      let error = new TypeError(message)
      `}</Code>

      <p>Or even extend built-in class</p>

      <Code block jsx>{`
      class ValidationError extends Error {
        constructor(message) {
          super(message)
          this.name = "ValidationError"
        }
      }
      
      // Usage
      function readUser(json) {
        let user = JSON.parse(json)
        if (!user.age) throw new ValidationError("No field: age")
        if (!user.name) throw new ValidationError("No field: name")
        return user
      }
      
      // Working example with try..catch
      
      try {
        let user = readUser('{ "age": 25 }')
      } catch (err) {
        if (err instanceof ValidationError) {
          alert("Invalid data: " + err.message) // Invalid data: No field: name
        } else if (err instanceof SyntaxError) { // (*)
          alert("JSON Syntax Error: " + err.message)
        } else {
          throw err // unknown error, rethrow it (**)
        }
      }
      `}</Code>

      <H>Re-throw error</H>

      <Code block jsx>{`
      function readData() {
        let json = '{ "age": 30 }'

        try {
          blabla(); // error!
        } catch (err) {
          if (!(err instanceof SyntaxError)) {
            throw err; // rethrow (don't know how to deal with it)
          }
        }
      }
      
      try {
        readData();
      } catch (err) {
        alert( "External catch got: " + err ); // caught it!
      }
      `}</Code>

      <H>
        <code>finally</code> always executes
      </H>

      <ul>
        <li>
          even if we use <code>return</code> in <code>try</code> block
        </li>
        <li>can use it if don’t want to handle errors, but want to finalize process</li>
      </ul>

      <Code block jsx>{`
      function func() {
        try {
          console.log('try')
          return 
        } catch (err) {
          console.log('error')
        } finally {
          console.log('finally' )
        }
      }

      func() // try // finally
      `}</Code>

      <H>
        Global <code>error</code> event listener
      </H>

      <ul>
        <li>
          In case of fatal error outside <code>try...catch</code>
        </li>
        <li>ErrorEvent contains all the information about the event and the error.</li>
      </ul>

      <Code block jsx>{`
      window.addEventListener('error', function(event) { 
        alert(event.message) // human-readable error message describing the problem.
        console.log(event.filename) // name of the script file in which the error occurred.
        console.log(event.lineno ) //  line number of the script file on which the error occurred.
        console.log(event.colno) // column number of the script file on which the error occurred.
        console.log(event.error) // Is a JavaScript Object that is concerned by the event.
      })
      `}</Code>

      <H>
        <code>var</code> inside <code>catch</code>
      </H>

      <ul>
        <li>
          <code>try...catch</code> creates block scopes and we should declare <code>const</code> or{' '}
          <code>let</code> variables outside
        </li>

        <Code block jsx>{`
          const getRandomNumber = () => Math.floor(Math.random() * 100 + 1)
            
          function getNumber() {
            let number

            try {
              number = getRandomNumber()
              throw new Error('error')
            } catch {
              number = 0
            }

            return number // 0
          }
        `}</Code>
        <li>
          may use <code>var</code> declaration as it is hoisted and goes to function scope
        </li>
        <Code block jsx>{`
          const getRandomNumber = () => Math.floor(Math.random() * 100 + 1)

          function getNumber() {
            try {
              var number = getRandomNumber()
              throw new Error('error')
            } catch {
              var number = 0
            }

            return number // 0
          }
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
