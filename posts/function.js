import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

function Cmpt() {
  function func(cb) {
    alert('in 1 sec callback func will be triggered')
    setTimeout(() => cb(), 1000)
  }
  const msg = () => alert('callback func is triggered')

  return (
    <div>
      <button onClick={() => func(msg)}>Click</button>
    </div>
  )
}

const postObj = {
  title: 'function',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/function.png',
  desc: 'Functions in JavaScript',
  body: (
    <>
      <H>Function declaration</H>

      <p>Function declaration is "hoisted", like "var" in variable declarations. Can be called earlier than it is defined.</p>

      <Code block jsx>{`
        function showMessage() {
          alert( 'Hello everyone!' );
        } // note! NO semicolon at the end
        showMessage(); // 'Hello everyone!'
      `}</Code>

      <p>Function is blocked scoped and not visible outside.</p>

      <Code block jsx>{`
      console.log(fn1()); // "hi"
      console.log(fn2()); // fn2 is not a function !!!
    
      function fn1 () { return "hi"; }
    
      {
        function fn2 () { return "hi" }
      }
      `}</Code>

      <H>Parameters</H>

      <p>Full <Lnk path="https://antonarbus.com/post/pass-arguments-into-function">article</Lnk> about default parameters can be found here.</p>

      <Code block jsx>{`
        function showMessage(text) {
          alert(text);
        }
        showMessage('empty message'); // empty message
    
        // default parameters
        function showMessage(text = 'empty message') {
          alert(text);
        }
        showMessage(); // empty message
    
        // default parameters - old fashioned way
        function showMessage(text) {
          if (text === undefined) {
            text = 'empty message';
          }
          alert(text);
        }
        showMessage(); // empty message
    
        // default parameters - improved
        function showMessage(text) {
          text = text || 'empty message';
          alert(text);
        }
        showMessage(); // empty message
      `}</Code>

      <H>Return</H>

      <p>Function stops at <code>return</code></p>

      <Code block jsx>{`
        function checkAge(age) {
          if (age >= 18) {
            return 'adult'; // function stops after "return"
          } else {
            return 'underaged';
          }
        }
        checkAge(20) // 'adult'
      `}</Code>

      <H>Call without parenthesis</H>

      <p>Shows string representation of the source code</p>

      <Code block jsx>{`
        function xxx() {
          let a = 1+1;
        }
        console.log(xxx); // xxx() {let a = 1+1;}
      `}</Code>

      <H>Copy function</H>

      <Code block jsx>{`
        function sayHi() { alert( "Hello" ); }
        let func = sayHi;
        sayHi === func // true
        func(); // Hello
        sayHi(); // Hello
      `}</Code>

      <H>Callback</H>

      <p>It is a function passed to another function as an argument and will be called back later.</p>

      <p>
        Simple callback function example.
      </p>

      <Code block jsx>{`
      function func(cb) {
        alert('in 1 sec callback func will be triggered')
        setTimeout(() => cb(), 1000)
      }
      
      const msg = () => alert('callback func is triggered')
      
      func(msg)
      `}</Code>

      <p>
        Another example.
      </p>

      <Cmpt />

      <Code block jsx>{`
        function ask(question, yes, no) {
          if (confirm(question)) yes()
          else no();
        }

        ask(
          "Do you agree?",
          function showOk() { alert("You agreed."); },
          function showCancel() { alert("You canceled the execution."); }
        );

        // if we extract functions from arguments we may just use function names
        ask("Do you agree?", showOk, showCancel); 
      `}</Code>

      <H>Recursion</H>

      <p>Recursion is when a function calls itself. JavaScript engine allows 10000 calls maximum.</p>

      <Code block jsx>{`
      function sumToRec(num) {
        if (num == 1) return num
        if (num > 1) return num + sumToRec(num - 1)
      }
      sumToRec(4) // 1 + 2 + 3 + 4 = 10
      `}</Code>

      <H>Arguments</H>

      <p>Functions have special array-like object named 'arguments' that contains all arguments by their index.</p>

      <Code block jsx>{`
      function args() {
        return( [arguments.length, arguments[0],arguments[1]] );
      }
      args("Julius", "Caesar") // [2, 'Julius', 'Caesar']
      args("Ilya") // [1, 'Ilya', undefined]
      `}</Code>

      <H>Immediately - invoked function expressions</H>

      <p>IIFE requires semicolon before</p>

      <p>They don’t pollute the global object</p>

      <Code block jsx>{`
      (function() {
        alert("Parentheses around the function");
      })();
  
      (function() {
        alert("Parentheses around the whole thing");
      }());
  
      !function() {
        alert("Bitwise NOT operator starts the expression");
      }();
  
      +function() {
        alert("Unary plus starts the expression");
      }();
      `}</Code>

      <H>Function is object</H>

      <p>.name property</p>

      <Code block jsx>{`
      function sayHi() {}
      sayHi.name; // "sayHi"
      `}</Code>

      <p>.length property</p>

      <Code block jsx>{`
      function func(a, b, c, d) {}
      function many(a, b, ...more) {}
      func.length // 4
      many.length // 2 // rest parameters are not counted
      `}</Code>

      <p>Custom properties in function</p>

      <Code block jsx>{`
        function sayHi() {
          return("Hi");
        }
        sayHi.wife = ' Kate' // initial value
        sayHi() + sayHi.wife // 'Hi Kate'
      `}</Code>

      <H>Function expression</H>

      <Code block jsx>{` 
      let myFunc = function(name) { alert( \`Hello, \${name}\` ); };
      `}</Code>

      <H>Named Function Expression</H>

      <p>Allows the function to reference itself internally</p>

      <Code block jsx>{` 
      let sayHi = function func(who) {
        if (who) {
          alert(\`Hello, \${who}\`);
        } else {
          func("Guest"); // use func to re-call itself
        }
      };
      sayHi(); // Hello, Guest
      `}</Code>

      <H>Function declaration vs expression</H>

      <p>Hoisting, function expression is created when the execution reaches it and is usable only from that moment (not "hoisted")</p>

      <Code block jsx>{`
      sayHi1("John"); // Hello, John
      function sayHi1(name) { alert( \`Hello, \${name}\` ); }
  
      sayHi2("John"); // error!
      let sayHi2 = function(name) { alert( \`Hello, \${name}\` ); };
      `}</Code>

      <p>Function expressions can have a conditional declaration</p>

      <Code block jsx>{`
      let age = prompt("What is your age?", 18);
      let welcome = (age < 18) ?  function() { alert("Hello!"); } :  function() { alert("Greetings!"); };
      welcome(); // "Greetings!"
      `}</Code>

      <H>Arrow function expression</H>

      <p>
        Convenient for simple one-line actions.
      </p>

      <Code block jsx>{`
      // the curly braces are needed for a multiline function
      // if we use curly braces, then we need an explicit "return"
      let sum = (a, b) => {  
        let result = a + b;
        return result; 
      };
  
      // same, but shorter
      let sum = (a, b) => a + b;

      // same, but even shorter
      let sum = function(a, b) {return a + b;};
  
      // with a single argument
      let double = n => n * 2; // no parentheses
  
      // w/o arguments
      let sayHi = () => alert("Hello"); // parentheses are needed
  
      // arrow functions works same way as function expressions, 
      // for ex. we can dynamically create functions
      let age = prompt("What is your age?", 18);
      let welcome = (age < 18) ?
        () => alert('Hello') :
        () => alert("Greetings!");
      welcome();
      `}</Code>

      <p>
        Don’t have own "this" & “arguments”. They are taken from outer LE.
      </p>

      <Code block jsx>{`
      let group = {
        title: "Our Group",
        students: ["John", "Pete", "Alice"],
        showList() {
          this.students.forEach(
            student => alert(this.title + ': ' + student)
          )
        }
      }
      group.showList(); 
      // Our Group: John // Our Group: Pete // Our Group: Alice
      `}</Code>

      <Code block jsx>{`
        function xxx() {
          (() => console.log(arguments))()
        }
        xxx(1, 2, 3) 
        // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]

      `}</Code>

      <H>new Function</H>

      <p>Function is created from a string & have access only to global, but not LE</p>

      <Code block jsx>{`
        let sum = new Function('a', 'b', 'c', 'return a + b');
        sum(1, 2, 3); // 6
      `}</Code>

      <H>Decorators(call / apply / bind)</H>

      <p>Function that takes another function and alters its behavior, the main job is still carried out by the function</p>

      <Hs>.call()</Hs>

      <p>
        Method calls a function with a given "this" and arguments provided individually
      </p>

      <Code block jsx>{`
      // func.call([thisArg], [arg1, arg2, argN])
      // The call() allows for a function/method belonging to one object to be assigned and called for a different object.
      // With call(), you can write a method once and then inherit it in another object, w/o having to rewrite the method for the new object.
      // thisArg - maybe null or undefined
      
      function say(phrase) { alert(this.name + ' ' + phrase) }
      let user = { name: "John" }
      say.call( user, "hello" ) // John: Hello

      // user becomes "this", and "Hello" becomes the "argument"
      `}</Code>

      <Hs>.apply()</Hs>

      <p>
        Method calls a function with a given "this" value, and arguments provided as an array
      </p>

      <Code block jsx>{`
        //apply(thisArg, [argsArray])

        // difference from call() is a list of arguments taken as an array-like object
        // Instead of func.call(this, ...arguments) we could use func.apply(this, arguments).
        // func.call and func.apply are almost the same
        // thisArg - maybe null or undefined
        
        // func.call(context, ...args);
        // same as
        // func.apply(context, args);

        const numbers = [5, 6, 2, 3, 7]
        console.log(Math.max.apply(null, numbers)) //7
      `}</Code>

      <Hs>.bind()</Hs>

      <p>
        Method creates a new function with "this" keyword set to the provided value & with a given sequence of arguments
      </p>

      <Code block jsx>{`
        let user = {
          firstName: "John",
          sayHi() { alert('Hello ' + this.firstName) }
        };
        user.sayHi() // 'Hello, John'
        setTimeout(user.sayHi, 1000); // Hello, undefined
        // setTimeout in-browser is a little special: it sets this=window for the function call

        let sayHi = user.sayHi.bind(user);
        sayHi(); // 'Hello, John'
        setTimeout(sayHi, 1000); // 'Hello, John'

        // bind only arguments
        function mul(a, b) {return a * b}
        let double = mul.bind(null, 2);
        // 2 as the first argument. Further arguments are passed “as is”
        double(3) // = mul(2, 3) = 6
        double(4) // = mul(2, 4) = 8
        double(5) // = mul(2, 5) = 10

        // bound function can not be re-bound
      `}</Code>

      <H>Lexical Environment</H>

      <ul>
        <li><b>Execution Context</b> (EC, stack, call stack) is the internal JS engine to track execution of a function or the global code</li>
        <li><i>EC</i> tracks where statement of the corresponding function is being executed</li>
        <li>New <i>EC</i> is created and pushed to the stack when execution of a function begins and deleted when stops</li>
        <li>For every <i>EC</i> a corresponding LE is created</li>
        <li><b>Lexical Environment</b> (LE) is the internal JS engine that holds names of variables/functions & a reference to a parent <i>LE</i></li>
        <li>Running function, block <code>{'{}'}</code>, and the script as a whole have an internal hidden object <code>[[Environment]]</code> with reference to its <i>LE</i></li>
        <li>Every function tracks the <i>LE</i> related to the <i>EC</i>it was created in & its parent <i>LE</i></li>
        <li><code>[[Environment]]</code> stores all local variables & 'this' & other...& a reference to outer <i>LE</i></li>
        <li>With <code>[[Environment]]</code> a function remembers where it was born</li>
        <li>Variable is a property of <code>[[Environment]]</code> object, associated with the executing block/function/script</li>
        <li>Variable change means a change of <code>[[Environment]]</code> property object</li>
        <li>On function start <i>LE</i> is pre-populated with variables, but their state is <code>uninitialized</code></li>
        <li>Engine knows about variables, but cannot be referenced until it has been declared with with <code>let</code>, <code>const</code></li>
        <li>When <code>let</code> definition appears, variable's value is <code>undefined</code></li>
        <li>Variable goes to <i>LE</i>, but get initialized in code execution flow</li>
        <li><i>Function declaration</i> is instantly fully initialized unlike <i>function expressions</i></li>
        <li><i>LE</i> is a specification object & exists “theoretically”, we can’t get this object in our code</li>
        <li>When the code accesses a variable the JS searches it in <i>LE</i> chain up to the global one</li>
        <li><i>LE</i> is removed from memory with all the variables after the function call finishes</li>
        <li>But not in case of nested functions. <span>LE</span> object dies when it becomes unreachable (just like other objects)</li>
      </ul>

      <H>Closure</H>

      <ul>
        <li><b>Closure</b> is a function that remembers its outer variables and can access them</li>
        <li>Functions in JavaScript are <i>closures</i></li>
        <li>In some languages, that’s not possible</li>
        <li><i>Closures</i> remember where they were created using a hidden <code>[[Environment]]</code> property</li>
        <li>Their code can access outer variables</li>
        <li>The <code>new Function</code> syntax is not a <i>closure</i></li>
        <li>Function can be returned and then used somewhere else and no matter where, it still has access to the same outer variables</li>
        <li><i>Lexical environment</i> is created on function initialization & it is separate for every function</li>
      </ul>

      <Code block jsx>{`
      function makeCounter() {
        let count = 0
      
        return function() {
          return count++
        }
      }
      
      let counter = makeCounter()
      let counter2 = makeCounter()
      
      counter() // 0
      counter() // 1
      
      counter2() // 0
      counter2() // 1
      `}</Code>

      <H>Currying</H>

      <p>
        Currying is a transformation of <Code>func(a, b, c)</Code> into <Code>func(a)(b)(c)</Code>
      </p>

      <Hs>Simple example</Hs>

      <Code block jsx>{`
      function curry(f) { 
        return function(a) {
          return function(b) {
            return f(a, b)
          }
        }
      }
      
      function sum(a, b) {
        return a + b
      }
      
      let curriedSum = curry(sum)
      curriedSum(1)(2) // 3
      `}</Code>

      <Hs>Advanced example</Hs>

      <Code block jsx>{`
      function curry(func) {
        return function curried(...args) {
          if (args.length >= func.length) return func.apply(this, args)
          // Function.length - number of parameters expected by the function
  
          return function(...args2) {
            return curried.apply(this, args.concat(args2))
          }
        }
      }
      
      function sum(a, b, c) {
        return a + b + c
      }
      
      let curriedSum = curry(sum)
      
      alert( curriedSum(1, 2, 3) ) // 6, still callable normally
      alert( curriedSum(1)(2, 3) ) // 6, currying of 1st arg
      alert( curriedSum(1)(2)(3) ) // 6, full currying
      `}</Code>

      <p>Maybe better to use<Lnk path="https://lodash.com/docs/4.17.15#curry">_.curry</Lnk> function from Lodash.</p>
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
