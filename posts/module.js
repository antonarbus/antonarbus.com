'use client'


import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'module',
  date: '2021.12.30',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/modules.png',
  desc: 'Modules in JavaScript',
  body: (
    <>
      <ul>
        <li>Module is just a file <Code lang="html">{'<script type="module"></script>'}</Code></li>
        <li>Script is treated as a module, by using the attribute <code>type="module"</code></li>
        <li>Modules work only via HTTP(s), not locally. Use http (live) server to work with modules.</li>
        <li>Modules "use strict" by default</li>
        <li>Modules have its own scope</li>
        <li>To make a global variable we can assign it to a window property <Code>window.user = "John"</Code> </li>
        <li>Module script can import other modules</li>
      </ul>

      <H>Import is evaluated ones</H>

      <Code block jsx>{`
      // 📁 hi.js
      alert("hi!")

      // 📁 main.js
      import './hi.js' // hi!
      import './hi.js' // (shows nothing)
      `}</Code>

      <H>Scripts duplicates are ignored</H>

      <Code block html>{`
      // 'my.js' is fetched and executed only once
      <script type="module" src="my.js"></script>
      <script type="module" src="my.js"></script>
      `}</Code>

      <H>External scripts + CORS</H>

      <ul>
        <li>CORS headers are needed for external imports</li>
        <li>another-site.com must supply 'Access-Control-Allow-Origin' response header</li>
      </ul>

      <Code block html>{`
      <script type="module" src="http://another-site.com/their.js"></script>
      `}</Code>

      <H>Global variable</H>

      <p>To make a global variable we can assign it to a window property <Code>window.user = "John"</Code>, but it is not recommended.</p>

      <H>Defer, async</H>

      <ul>
        <li>Module scripts are deferred by default and wait until the HTML document is fully ready</li>
        <li>Module doesn’t block HTML processing, they load in parallel with other resources.</li>
        <li>Possible to use the <code>async</code> attribute in <Code>{'<script type="module" async>'}</Code></li>
      </ul>

      <Code block html>{`
      <script type="module">
        alert(typeof button); // object: the script can 'see' the button below
        // as modules are deferred, the script runs after the whole page is loaded
      </script>

      Compare to regular script below:

      <script>
        alert(typeof button); // button is undefined, the script can't see elements below
        // regular scripts run immediately, before the rest of the page is processed
      </script>

      <button id="button">Button</button>
      `}</Code>

      <H><code>this</code> in module</H>

      <ul>
        <li><code>this</code> on top level in module is <code>undefined</code></li>
        <li><code>this</code> in non-module javascript file on top level is <code>window</code> object</li>
      </ul>

      <H>Relative or absolute path</H>

      <ul>
        <li><code>{'import {sayHi} from \'sayHi.js\''}</code> - not working in browser</li>
        <li><code>{'import {sayHi} from \'./sayHi.js\''}</code> - works</li>
        <li>Node.js or bundle tools allow bare modules, w/o any path</li>
      </ul>

      <H>Different exports/imports</H>

      <Hs>whole file</Hs>

      <Code block jsx>{`
      // 📁 from.js
      alert("hi!")
      
      // 📁 to.js
      import './hi.js' // hi!
      `}</Code>

      <Hs>specific variables, functions, classes</Hs>

      <Code block jsx>{`
      // 📁 from.js
      export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      export const MODULES_BECAME_STANDARD_YEAR = 2015;
      export class User {
        constructor(name) {
          this.name = name;
        }
      }
      export function sayHi(user) {
        alert(\`Hello, \${user}!\`);
      } // no ';' at the end
      
      // 📁 to.js
      import {months, MODULES_BECAME_STANDARD_YEAR, User, sayHi} from './from.js';
      sayHi('John'); // Hello, John!
      `}</Code>

      <Hs>export apart from declarations</Hs>

      <Code block jsx>{`
      // 📁 from.js
      let arr = [1, 2, 3];
      function func() { alert('I am function') }
      export {arr, func}; 
      
      // 📁 to.js
      import {arr, func} from './from.js';
      func();
      `}</Code>

      <Hs>import * all</Hs>

      <p>Bad for bundle optimizers such as webpack's “tree-shaking”</p>

      <Code block jsx>{`
      // 📁 from.js
      export let arr = [1, 2, 3];
      export function func() { alert('I am function') }
      
      // 📁 to.js
      import * as importObj from './from.js';
      importObj.arr; // [1, 2, 3]
      importObj.func(); // 'I am function'
      `}</Code>

      <Hs>export as</Hs>

      <Code block jsx>{`
      // 📁 from.js
      let arr = [1, 2, 3];
      function func() { alert('I am function') }
      export {func as exportedFunc, arr as exportedArr};
      
      // 📁 to.js
      import * as importObj from './from.js';
      importObj.exportedArr; // [1, 2, 3]
      importObj.exportedFunc(); // 'I am function'
      `}</Code>

      <Hs>import as</Hs>

      <Code block jsx>{`
      // 📁 from.js
      export let arr = [1, 2, 3];
      export function func() { alert('I am function') }
      
      // 📁 to.js
      import {func as importedFunc, arr as importedArr} from './from.js';
      importedArr; // [1, 2, 3]
      importedFunc(); // 'I am function'
      `}</Code>

      <Hs>export default</Hs>

      <ul>
        <li>syntax makes the “one thing per module” way look better</li>
        <li>no need for curly braces</li>
        <li>there’s a rule that imported variables should correspond to file names <Code>{'import LoginForm from "./loginForm.js"'}</Code></li>
      </ul>

      <Code block jsx>{`
      // 📁 from.js
      export default function func() { alert('I am function') }
      
      // 📁 to.js
      import func from './from.js';
      func(); // 'I am function'
      `}</Code>

      <p>Mix of default & named exports</p>

      <Code block jsx>{`
      // 📁 from.js
      export default class User {
        constructor(name) {
          this.name = name;
        }
      }
      export function sayHi(user) {
        alert(\`Hello, \${user}!\`);
      }

      // 📁 to.js
      import {default as User, sayHi} from './from.js';
      new User('John');
      `}</Code>

      <Code block jsx>{`
      // 📁 from.js
      export default class User {
        constructor(name) {
          this.name = name;
        }
      }
      export function sayHi(user) {
        alert(\`Hello, \${user}!\`);
      }

      // 📁 to.js
      import * as user from './from.js';
      let User = user.default; // the default export
      new User('John');
      `}</Code>

      <H>Re -export</H>

      <p>We may import things and immediately export them</p>

      <Code block jsx>{`
      import {login, logout} from './helpers.js';
      export {login, logout};

      // or shorter
      export {login, logout} from './helpers.js';

      // default export needs separate handling when re-exporting
      // 📁 user.js
      export default class User { }

      export * from './user.js'; // to re-export named exports
      export {default} from './user.js'; // to re-export the default export
      `}</Code>

      <H>Dynamic imports</H>

      <ul>
        <li>Dynamic imports work in regular scripts, they don’t require <code>script type="module"</code></li>
        <li><Code>import()</Code> looks like a function call, but it is not, it’s a special syntax</li>
      </ul>

      <Code block jsx>{`
      let modulePath = prompt("Which module to load?");
      import(modulePath)
        .then(obj => {})
        .catch(err => {})
      `}</Code>

      <Code block jsx>{`
      // 📁 say.js
      export function hi() { alert('Hello') }
      export function bye() { alert('Bye') }
      let {hi, bye} = await import('./say.js');
      hi();
      bye();
      `}</Code>

      <Code block jsx>{`
      // 📁 say.js
      export default function() {
        alert("Module loaded (export default)!");
      }

      let obj = await import('./say.js');
      let say = obj.default;
      // or, in one line: let {default: say} = await import('./say.js');
      say();
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
