// @ts-check
import { Code, H, LazyImg, Lnk, jsxToStr, Hs } from '/components/post/reExport'

/**
 * Color red
 * @constant
 * @type {string}
 * @default
*/

const RED = 'FF0000'

/**
 * function sums two values passed in object { a: 1, b: 2 }
 * @param {Object} vals - object with values 'a' and 'b'
 * @param {number} vals.a 1st number
 * @param {number} vals.b 2n number
 * @returns {number} sum value
 */

function sum(vals) {
  return vals.a + vals.b
}

sum({ a: 2, b: 3 })

/**
 * List all names of employees
 * @param {Object[]} employees - The employees who are responsible for the project
 * @param {string} employees[].name - The name of an employee
 * @param {string} employees[].department - The employee's department
 */

function allNames(employees) {
  return employees.map(employee => employee.name).join('; ')
}

const companyWorkers = [
  { name: 'John', department: 'sales' },
  { name: 'Kate', department: 'sales' }
]

allNames(companyWorkers)

/**
* Returns the sum of all numbers passed to the function
* @param {...number} num - A positive or negative number
*/

function sum2(num) {
  let sum = 0
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  return sum
}

sum2(1, 2, 3)

/**
 * This callback type is called `requestCallback` and is displayed as a global symbol
 *
 * @callback requestCallback
 * @param {string} responseCode
 * @param {string} responseMessage
 */

/**
 * Does something asynchronously and executes the callback on completion
 * @param {requestCallback} helloCallBack - The callback that handles the response
 */

function doSomethingAsynchronously(helloCallBack) {
  helloCallBack('hi', 'man')
}

// doSomethingAsynchronously((a, b) => alert(a + ' ' + b))

const postObj = {
  title: 'JSDoc',
  date: '2022.06.10',
  tags: ['JavaScript', 'tools'],
  imgUrl: 'https://antonarbus.com/imgs/jsdoc.jpg',
  desc: 'JSDoc for functions comments',
  body: (
    <>
      <p>With <Lnk path='https://jsdoc.app/'>JSDoc</Lnk> we can add comments & parameter types to functions and VSCode intellisense will pick it up.</p>

      <H>Syntax</H>

      <Code block jsx>{`
      // @ts-check

      /**
      * @summary Does something.
      * @description 
      * This is a long description.
      * - Example bullet
      * - Example bullet
      * @param {number} a First number
      * @param {number} b Second number
      * @returns {number} Sum value
      */

      function sum(a, b) {
        return a + b
      }

      sum(1, '2')
      `}</Code>

      <LazyImg path='/imgs/jsdoc/jsdoc comment.png'/>

      <H>Snippet in VSCode</H>

      <p>Type <code>{'/**'}</code> before the function and snippet with relative parameters will be pasted.</p>

      <H>Snippet suggestion</H>

      <Code block json>{`
      // settings.json
      "javascript.suggest.completeJSDocs": true
      `}</Code>

      <H>Type checking</H>

      <Hs>In file</Hs>

      <p>Type on top of js file <code>{'// @ts-check'}</code>.</p>

      <Hs>In project</Hs>

      <Code block jsx>{`
        // jsconfig.json or tsconfig.json
        {
          "compilerOptions": {
            "allowJs": true,
            "checkJs": true
          }
        }
      `}</Code>

      <Hs>Everywhere</Hs>

      <p>In VSCode settings</p>

      <Code block jsx>{`
      // settings.json
      "js/ts.implicitProjectConfig.checkJs": true,
      "typescript.validate.enable": true,
      "javascript.validate.enable": true,
      `}</Code>

      <LazyImg path='/imgs/jsdoc/jsdoc warning.png'/>

      <H>Types</H>

      <ul>
        <li><Code>{'@param {boolean}'}</Code> boolean</li>
        <li><Code>{'@param {(number|boolean)}'}</Code> multiple types (type union)</li>
        <li><Code>{'@param {string[]}'}</Code> array of strings</li>
        <li><Code>{'@param {?number}'}</Code> number or null</li>
        <li><Code>{'@param {!number}'}</Code> number, but never null</li>
        <li><Code>{'@param {{a: number, b: string, c}} myObj'}</Code> object with properties</li>
        <li>
          or
          <Code block jsx>{`
          @param {Object} myObj
          @param {number} myObj.a
          @param {string} myObj.b
          @param {*} myObj.c
          `}</Code>
        </li>
        <li><Code>{'@param {...number} num'}</Code> many numeric parameters</li>
        <li><Code>{'@param {number} [foo]'}</Code> optional parameter named foo</li>
        <li><Code>{'@param {number} [foo=1]'}</Code> optional parameter foo with default value 1</li>
        <li>
          Callback
          <Code block jsx>{`
          /**
          * @callback myCallback
          * @param {number} x - ...
          */

          /** @type {myCallback} */
          `}</Code>
        </li>
        <li>
          Type definition
          <Code block jsx>{`
          /**
          * @typedef PropertiesHash
          * @type {object}
          * @property {string} id - an ID
          * @property {string} name - your name
          * @property {number} age - your age
          */

          /** @type {PropertiesHash} */
          `}</Code>
        </li>
      </ul>

      <H>Object with parameter</H>

      <Code block jsx>{`
      /**
      * function sums two values passed in object { a: 1, b: 2 }
      * @param {Object} vals - object with values 'a' and 'b'
      * @param {number} vals.a 1st number
      * @param {number} vals.b 2n number
      * @returns {number} sum value
      */

      function sum(vals) {
        return vals.a + vals.b
      }

      sum({ a: 2, b: 3 })
      `}</Code>

      <H>Object with destructured parameters</H>

      <Code block jsx>{`
      /**
      * function sums two values passed in object { a: 1, b: 2 }
      * @param {Object} param - object with values 'a' and 'b'
      * @param {number} param.a 1st number
      * @param {number} param.b 2n number
      * @returns {number} sum value
      */

      function sum({ a, b }) {
        return a + b
      }

      sum({ a: 2, b: 3 })
      `}</Code>

      <H>Array of objects</H>

      <Code block jsx>{`
      /**
      * Assign the project to a list of employees.
      * @param {Object[]} employees - The employees who are responsible for the project.
      * @param {string} employees[].name - The name of an employee.
      * @param {string} employees[].department - The employee's department.
      */
      function allNames(employees) {
        return employees.map(employee => employee.name).join('; ')
      }

      const companyWorkers = [
        { name: 'John', department: 'sales' },
        { name: 'Kate', department: 'sales' }
      ]

      allNames(companyWorkers)
      `}</Code>

      <H>Optional parameter</H>

      <Code block jsx>{`
      /**
      * @param {string} [somebody] - Somebody's name.
      */
      function sayHello(somebody) {
        if (!somebody) {
          somebody = 'John Doe'
        }
        alert('Hello ' + somebody)
      }
      `}</Code>

      <H>optional parameter and default value</H>

      <Code block jsx>{`
      /**
      * @param {string} [somebody=John Doe] - Somebody's name.
      */
      function sayHello(somebody) {
        if (!somebody) {
          somebody = 'John Doe'
        }
        alert('Hello ' + somebody)
      }
      `}</Code>

      <H>Any type</H>

      <Code block jsx>{`
      /**
      * @param {*} somebody - Whatever you want.
      */
      function sayHello(somebody) {
        console.log('Hello ' + JSON.stringify(somebody))
      }
      `}</Code>

      <H>one OR another type</H>

      <Code block jsx>{`
      /**
      * @param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.
      */
      function sayHello(somebody) {
        if (!somebody) {
          somebody = 'John Doe'
        } else if (Array.isArray(somebody)) {
          somebody = somebody.join(', ')
        }
        alert('Hello ' + somebody)
      }
      `}</Code>

      <H>Repeating parameter</H>

      <Code block jsx>{`
      /**
      * Returns the sum of all numbers passed to the function
      * @param {...number} num - A positive or negative number
      */
      function sum(num) {
        let sum = 0
        for (let i=0; i < arguments.length; i++) {
          sum += arguments[i]
        }
        return sum
      }

      sum(1, 2, 3)
      `}</Code>

      <H>Callback</H>

      <Code block jsx>{`
      /**
      * This callback type is called "requestCallback" and is displayed as a global symbol
      *
      * @callback requestCallback
      * @param {string} responseCode
      * @param {string} responseMessage
      */

      /**
      * Does something asynchronously and executes the callback on completion
      * @param {requestCallback} helloCallBack - The callback that handles the response
      */
      function doSomethingAsynchronously(helloCallBack) {
        helloCallBack('hi', 'man')
      }

      doSomethingAsynchronously((a, b) => alert(a + ' ' + b))
      `}</Code>

      <H>Return multiple types</H>

      <Code block jsx>{`
      /**
      * Returns the sum of a and b
      * @param {number} a
      * @param {number} b
      * @param {boolean} retArr If set to true, the function will return an array
      * @returns {(number|Array)} Sum of a and b or an array that contains a, b and the sum of a and b
      */
      function sum(a, b, retArr) {
        if (retArr) {
          return [a, b, a + b]
        }
        return a + b
      }
      `}</Code>

      <H>Returns promise</H>

      <Code block jsx>{`
      /**
      * Returns the sum of a and b
      * @param {number} a
      * @param {number} b
      * @returns {Promise} Promise object represents the sum of a and b
      */
      function sumAsync(a, b) {
        return new Promise(function(resolve, reject) {
          resolve(a + b)
      }
      `}</Code>

      <H>typedef</H>

      <Code block jsx>{`
      /**
      * A number, or a string containing a number
      * @typedef {(number|string)} NumberLike
      */

      /**
      * Set the magic number
      * @param {NumberLike} x - The magic number
      */
      function setMagicNumber(x) {
      }
      `}</Code>

      <Code block jsx>{`
      /**
      * The complete Triforce, or one or more components of the Triforce.
      * @typedef {Object} WishGranter~Triforce
      * @property {boolean} hasCourage - Indicates whether the Courage component is present.
      * @property {boolean} hasPower - Indicates whether the Power component is present.
      * @property {boolean} hasWisdom - Indicates whether the Wisdom component is present.
      */

      /**
      * A class for granting wishes, powered by the Triforce.
      * @class
      * @param {...WishGranter~Triforce} triforce - One to three {@link WishGranter~Triforce} objects
      * containing all three components of the Triforce.
      */
      function WishGranter(triforce) {}
      `}</Code>

      <H>constant</H>

      <Code block jsx>{`
      /**
      * Color red
      * @constant
      * @type {string}
      * @default
      */
      const RED = 'FF0000'
      `}</Code>

      <H>example</H>

      <Code block jsx>{`
      /**
      * Solves equations of the form a * x = b
      * @example <caption>Example usage of method1.</caption>
      * // returns 2
      * globalNS.method1(5, 10);
      * @returns {Number} Returns the value of x for the equation.
      */
      globalNS.method1 = function (a, b) {
          return b / a;
      };
      `}</Code>

      <H>exports</H>

      <Code block jsx>{`
      /**
      * A module that says hello!
      * @module hello/world
      */

      /** Say hello. */
      exports.sayHello = function() {
          return 'Hello world';
      };
      `}</Code>

      <Code block jsx>{`
      /**
      * A module that shouts hello!
      * @module hello/world
      */

      /** SAY HELLO. */
      module.exports = function() {
          return "HELLO WORLD";
      };
      `}</Code>

      <H>function</H>

      <p>Marks an object as being a function, even though it may not appear to be one to the parser.</p>

      <Code block jsx>{`
      /**
      * @function paginate paginateFactory wrapper
      */
      const paginate = paginateFactory(pages)
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
