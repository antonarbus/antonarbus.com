import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'object',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/object.jpg',
  desc: 'Objects in JavaScript',
  body: (
    <>
      <H>Declaration</H>

      <p>Object constructor syntax</p>

      <Code block jsx>{`
              const person = new Object();
              person.firstName = "John";
              person.lastName = "Doe";
      `}</Code>

      <Code block jsx>{`
              let person1 = new Object({
                name: 'Chris',
                age: 38,
                greeting: function() {
                  alert('Hi! I\\'m ' + this.name + '.');
                }
              });
      `}</Code>

      <p>create() method</p>

      <Code block jsx>{`
            let person2 = Object.create(person1);
            person2.name; // 'Chris'
            person2.greeting(); // Hi! I'm Chris.
      `}</Code>

      <p>Object literal syntax</p>

      <Code block jsx>{`
            let user = {     // "user" object has 3 properties: 1st property has the name "name" and the value "John"
              name: "John",  // by key/name/identifier "name" the value "John" is stored
              age: 30,       // by key "age" the value 30 is stored 
              "likes birds": true,  // multi word property name must be quoted // can use trailing comma 
              a: {b: 666},
            };
      `}</Code>

      <p>Constructor function</p>

      <ul>
        <li>purpose is to implement reusable object creation </li>
        <li>can be done using constructor functions and the "new" operator</li>
        <li>function named starts from the capital letter</li>
        <li>executed with "new" operator</li>
        <li>constructors usually do not have a return statement. </li>
        <li>their task is to write all necessary stuff into 'this', and it automatically becomes the result.</li>
      </ul>

      <Code block jsx>{`
              function User(name) {
                this.name = name
                this.isAdmin = false
                this.sayHi = function() { alert( "My name is: " + this.name ) }
              }
              user1 = new User // {name: undefined, isAdmin: false, sayHi: ƒ}
              user2 = new User() // {name: undefined, isAdmin: false, sayHi: ƒ}
              user3 = new User('John') // {name: 'John', isAdmin: false, sayHi: ƒ}

              // same as
              function User(name) {
                const obj = {}
                obj.name = name
                obj.isAdmin = false
                obj.sayHi = function() { alert( "My name is: " + obj.name ) }
                return obj
              }
      `}</Code>

      <H>Set value</H>

      <Code block jsx>{`
            user.name = "John";
            user["likes birds"] = true;
      `}</Code>

      <H>Get property values</H>

      <Code block jsx>{`
              user.name; // John
              user.age; // 30
              user["likes birds"]; // true
              user['a']['b']; // 666
      `}</Code>

      <H>Optional chaining<code>?.</code></H>

      <ul>
        <li>safe way to access nested object properties, even if a property doesn’t exist</li>
        <li>safe reading and deleting, but not writing</li>
        <li>no error if key does not exist</li>
        <li><code>?.</code> stops the evaluation & returns <code>undefined</code> if the value before ?. is <code>undefined</code> or <code>null</code></li>
        <li>variable before <code>?.</code> must be declared</li>
        <li>works for <code>.key</code>, <code>?.()</code>, <code>?.[]</code></li>
      </ul>

      <Code block jsx>{`
        let user = {car: "volvo"}
        user?.car // volvo
        user?.address // undefined
        user?.address?.street // undefined
        user?.address.street // error

        // same as
        user.address ? user.address.street : undefined

        // no error if method does not exist
        let userGuest = {};
        let userAdmin = {
          admin() {
            alert("I am admin");
          }
        };
        userAdmin.admin?.(); // I am admin
        userGuest.admin?.(); // nothing (no such method)

        // ?.()
        let userAdmin = {
          admin() {
            alert("admin");
          }
        }
        let userGuest = {};
        userAdmin.admin(); // admin
        userAdmin.admin?.(); // admin
        userGuest.admin();  // error
        userGuest.admin?.(); // nothing (no such method)

        // ?.[]
        let key = "firstName";
        let user1 = {
          firstName: "John"
        };
        let user2 = null;
        user1?.[key] // John
        user2?.[key] // undefined

        // read, delete, but not write
        let user = {}
        delete user?.name; // delete user.name if user exists
        user?.name = "John"; // Error, doesn't w  ause it evaluates to undefined = "John"
      `}</Code>

      <Hs>Remove property</Hs>

      <Code block jsx>{`
        delete user.age;
        delete user["likes birds"];
      `}</Code>

      <H>Dynamic key with square brackets</H>

      <Code block jsx>{`
      let key = "likes birds";
      user[key] = true;
  
      let fruit = "apple";
      let bag = {
        [fruit]: 5, // the name of the property is taken from the var "fruit"
      };
  
      let fruit = 'apple';
      let bag = {
        [fruit + 'Computers']: 5 // bag.appleComputers = 5
      };
      `}</Code>

      <Hs>Property value shorthand</Hs>

      <Code block jsx>{`
      function makeUser(name, age) {
        return {
          name, // same as name: name
          age,  // same as age: age
          // ...
        };
      }
      let user = makeUser("John", 30); // {name: "John", age: 30}
      `}</Code>

      <H>Property existence, “in” operator</H>

      <Code block jsx>{`
      let user = { name: "John", age: 30 };
      "age" in user // true
      "blabla" in user // false
      let key = 'age';
      key in user // true
      `}</Code>

      <H>For…in loop</H>

      <Code block jsx>{`
      let obj = {
        name: "John",
        age: 30,
        isAdmin: true
      };
  
      // iterates over properties of an object
      for (let key in obj) {
        console.log( key, obj[key] );  // name John, age 30, isAdmin true
      }
      `}</Code>

      <H>Order</H>

      <p>Integer properties are sorted, others appear in creation order</p>

      <Code block jsx>{`
      let obj = {
        "49": "Germany",
        "41": "Switzerland",
        "44": "Great Britain",
        "1": "USA"
      };
      
      for (let code in obj) {
        alert(code); // 1, 41, 44, 49
      }
      `}</Code>

      <H>Object references</H>

      <p>
        Objects are stored and copied “by reference”. <br />
        On object copy, the reference is copied, but object itself is not duplicated.
      </p>

      <Code block jsx>{`
        let user = { name: 'John' };
        let admin = user;
        admin.name = 'Pete'; // changed by the "admin" reference
        user.name; // 'Pete', changes are seen from the "user" reference
        user === admin; // true
      `}</Code>

      <p>
        Two objects are not equal, even though they look alike.
      </p>

      <Code block jsx>{`
      let a = {};
      let b = {}; 
      a == b ; // false
      `}</Code>

      <p>
        Object declared as const can be modified.
      </p>

      <Code block jsx>{`
      const user = { name: "John" };
      user.name = "Pete"; 
      user.name; // Pete
      `}</Code>

      <Hs>Cloning</Hs>

      <p>Shallow copy</p>

      <Code block jsx>{`
        let obj = { name: "John", age: 30 };
        let clone = Object.assign({}, user); 

        // or
        clone = { ...obj } 
      `}</Code>

      <p>Nested cloning use existing library _.cloneDeep(obj) from the library < Lnk path="https://lodash.com/docs/4.17.15#cloneDeep" > lodash</Lnk ></p>

      <Code block jsx>{`
        // npm i lodash.clonedeep
        const obj = [{ 'a': 1 }, { 'b': 2 }];
        const deep = _.cloneDeep(obj); 
      `}</Code>

      <H>Object.keys, values, entries</H>

      <Code block jsx>{`
      let user = { name: "John", age: 30 };
      Object.keys(user) // ["name", "age"] // real array, not an iterator
      Object.values(user) // ["John", 30]
      Object.entries(user) // [ ["name","John"], ["age",30] ]

      for (let value of Object.values(user)) {
        alert(value); // John, then 30
      }
  
      // loop over keys-and-values
      for (let [key, value] of Object.entries(obj)) {
        alert(\`\${key}:\${value}\`); // name:John, then age:30
      }
      `}</Code>

      <Hs>Array into Object <Code> Object.fromEntries()</Code></Hs>

      <Code block jsx>{`
      let arr = [
        ['banana', 1],
        ['orange', 2],
        ['meat', 4]
      ]
      let obj = Object.fromEntries(arr); // {banana: 1, orange: 2, meat: 4}
      `}</Code>

      <Hs>Map over object</Hs>

      <Code block jsx>{`
      let prices = {
        banana: 1,
        orange: 2,
        meat: 4,
      };
  
      // convert to array, map, and then fromEntries gives back the object
      let doublePrices = Object.fromEntries(
        Object.entries(prices).map(([key, value]) => [key, value * 2])
      )
      doublePrices // {banana: 2, orange: 4, meat: 8}
      `}</Code>

      <Hs>Object & 'this'</Hs>

      <p><code>this</code> is an object means "current object"</p>

      <Code block jsx>{`
      // example 1
      {
        let user = {
          name: "John",
          age: 30,
          showThisName() { alert(this.name) }, 
        };
        user.showThisName(); // "John"
        // same as alert(user.name); 
      }
  
      // example 2
      {
        let user = { name: "John" };
        let admin = { name: "Admin" };
        function sayHi() { alert( this.name ); }
  
        // use the same function in two objects
        user.f = sayHi; // assign method to object
        admin.f = sayHi;
  
        user.f(); // John  (this == user)
        admin.f(); // Admin  (this == admin)
      }
  
      // "this" in function
      function x() { alert( this ); }
      x() // [object Window]
  
      // arrow function has no “this”, it is taken from the outer “normal” function
      {
        let user = {
          name: "John",
          sayHi() {
            let arrow = () => alert(this.name);
            arrow();
          }
        };
  
        user.sayHi(); // John
      }
      `}</Code>

      <H>Chainable methods</H>

      <p>Just return <code>this</code></p>

      <Code block jsx>{`
        let ladder = {
          step: 0,
          up() {
            this.step++;
            return this;
          },
          down() {
            this.step--;
            return this;
          },
          showStep: function() { 
            // shows the current step
            alert( this.step );
          }
        }
  
        ladder.up().up().down().showStep(); // 1
      `}</Code>

      <H>Global object</H>

      <p>
        <ul>
          <li>The global object holds variables available everywhere</li>
          <li>In a browser it is named <code>window</code></li>
          <li>In Node.js it is named <code>global</code></li>
          <li>Can be accessed by <code>globalThis</code> or <code>window</code></li>
        </ul>
      </p>

      <Code block jsx>{`
        var gVar = 5
        window.gVar // 5 (became a property of the global object)
    
        window.currentUser = {  name: "John"};
        window.currentUser.name // John
      `}</Code>

      <H>Primitive as an object</H>

      <p>
        <ul>
          <li>Primitives also have methods, but how? they are not objects</li>
          <li>A special object is created that has useful methods, like <code>toUpperCase()</code>, runs and destroyed</li>
          <li><code>null</code> & <code>undefined</code> have no methods</li>
          <li><Code>{'"Hello".toUpperCase(); // HELLO'}</Code></li>
        </ul>
      </p>

      <H>Property flags and descriptors</H>

      <p>Object properties, have 3  attributes (flags):</p>

      <ul>
        <li>"writable" – if true, the value can be changed, otherwise it’s read-only</li>
        <li>"enumerable" – if true, then listed in loops, otherwise not listed</li>
        <li>"configurable" – if true, the property can be deleted and flags can be modified, otherwise not</li>
        <li>by default they are all true</li>
        <li><Code>{'Object.getOwnPropertyDescriptor()'}</Code></li>
        <li><Code>{'Object.defineProperty(obj, prop, descriptor)'}</Code></li>
      </ul>

      <p>Can work with flags using descriptors methods:</p>
      <ul>
        <li><Code>{'Object.getOwnPropertyDescriptor(obj, propertyName)'}</Code> - returns “property descriptor” object: it contains the value and all the flags.</li>
        <li><Code>{'Object.defineProperty(obj, prop, descriptor)'}</Code> - defines a new property on object or modifies an existing ones & returns the object</li>
        <li><Code>{'Object.defineProperties(obj, props)'}</Code> - defines new or modifies existing properties directly on an object, returning the object.  Sets many properties at once.</li>
        <li><Code>{'Object.getOwnPropertyDescriptors(obj)'}</Code> - returns object containing all own property descriptors of an object</li>
        <li><Code>{'Object.preventExtensions(obj)'}</Code> - forbids the addition of new properties to the object</li>
        <li><Code>{'Object.seal(obj)'}</Code> - forbids adding/removing of properties. Sets 'configurable' to <code>false</code> for all existing properties.</li>
        <li><Code>{'Object.freeze(obj)'}</Code> - forbids adding/removing/changing of properties. Sets 'configurable' to <code>false</code>, 'writable' to <code>false</code> for all existing properties.</li>
        <li><Code>{'Object.isExtensible(obj)'}</Code> - returns <code>false</code> if adding properties is forbidden, otherwise <code>true</code>.</li>
        <li><Code>{'Object.isSealed(obj)'}</Code> - returns <code>true</code> if adding/removing properties is forbidden, and all existing properties have configurable: <code>false</code>.</li>
        <li><Code>{'Object.isFrozen(obj)'}</Code> - returns <code>true</code> if adding/removing/changing properties is forbidden, and all current properties are configurable: <code>false</code>, writable: <code>false</code>.</li>
      </ul>

      <Code block jsx>{`
      // getOwnPropertyDescriptor
      let user = { name: "John" }
      let descriptor = Object.getOwnPropertyDescriptor(user, 'name')
      descriptor // {value: 'John', writable: true, enumerable: true, configurable: true}
      `}</Code>

      <Code block jsx>{`
      // defineProperty
      let user = {
        name: "John",
        toString() { return this.name }
      }
      for (let key in user) alert(key) // name, toString

      Object.defineProperty(user, "name", {
        value: "John",
        writable: false, // won't be able to change user.name or its flags
        configurable: false, // delete user.name; // Error // can not change even flags // 
        enumerable: false, // for (let key in user) alert(key); // toString ONLY!!!
        // + there are many more property settings
      })

      user.name = "Anton" 
      user.name // "John"
      delete user.name // false

      // non-enumerable properties are also excluded from Object.keys
      // making a property non-configurable is a one-way road, cannot change it back with defineProperty
      // “configurable: false” prevents change of flags and its deletion, while allowing to change its value
      `}</Code>

      <Code block jsx>{`
      // defineProperties

      // method defines new or modifies existing properties directly on an object, returning the object
      // we can set many properties at once.
      Object.defineProperties(user, {
        name: { value: "John", writable: false },
        surname: { value: "Smith", writable: false },
      });
      `}</Code>

      <Code block jsx>{`
      // getOwnPropertyDescriptors

      // method defines new or modifies existing properties directly on an object, returning the object
      // we can set many properties at once.
      Object.getOwnPropertyDescriptors(user) 
      /*
        {
          name: {value: 'John', writable: false, enumerable: false, configurable: false}
          surname: {value: 'Smith', writable: false, enumerable: false, configurable: false}
          toString: {writable: true, enumerable: true, configurable: true, value: ƒ}
        }
      */
      `}</Code>

      <H>Getters & setters</H>

      <p>In object literal they are denoted by <code>get</code> and <code>set</code> keywords</p>

      <Code block jsx>{`
      let user = {
        name: "John",
        surname: "Smith",

        get fullName() {
          return \`\${this.name} \${this.surname}\`;
        },

        set fullName(value) {
          [this.name, this.surname] = value.split(" ");
        }
      }

      user.fullName // John Smith 
      user.fullName = "Jane Musk" // not a method with parenthesis, but a property 
      user.name // Jane
      user.surname // Musk
      `}</Code>

      <p>Widely known convention is to keep value in a separate property, which starts with underscore & it is accessed via getter and setter.<Code> _propName</Code></p>

      <Code block jsx>{`
        let user = {
          get name() {
            return this._name
          },

          set name(value) {
            if (value.length < 4) {
              alert("Name is too short, need at least 4 characters")
              return
            }
            this._name = value
          }
        }

        user.name = "Pete"; // "Pete"
        user.name = ""; // Name is too short...
      `}</Code>

      <p>In accessor descriptors they are denoted by<code>get()</code> and <Code> set()</Code> methods</p>

      <Code block jsx>{`
      let user = { name: "John", surname: "Smith" };

      Object.defineProperty(user, 'fullName', {
        get() { return \`\${this.name} \${this.surname}\`; },
        set(value) { [this.name, this.surname] = value.split(" "); }
      });

      user.fullName; // "John Smith"

      // property can be either an accessor (has get/set methods) or a data property (has a value), not both
      // If we try to supply both get and value in the same descriptor, there will be an error
      `}</Code>

      <p>Can be used in constructor functions</p>

      <Code block jsx>{`
      function User(name, birthday) {
        this.name = name
        this.birthday = birthday

        // age is calculated from the current date and stored birthday
        Object.defineProperty(this, "age", {
          get() {
            let todayYear = new Date().getFullYear()
            return todayYear - this.birthday.getFullYear()
          }
        })
      }

      let john = new User("John", new Date(1992, 6, 1))
      john.birthday // Wed Jul 01 1992 00:00:00 GMT+0300 (Eastern European Summer Time)
      john.age // 29
      `}</Code>

      <H>Iterable object</H>

      <p>Iterable has <code>for..of</code> loop functionality</p>

      <Code block jsx>{`
      // strings are iterables
      for (let char of "test") {
        console.log(char) // t, e, s, t
      }
      `}</Code>

      <p>
        To make an iterable we need to add <code>Symbol.iterator</code> & <code>next()</code> method.
      </p>

      <Code block jsx>{`
      let range = {
        from: 1,
        to: 5,
      
        [Symbol.iterator]() {
          this.current = this.from;
          return this;
        },
      
        next() {
          if (this.current <= this.to) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
      
      for (let num of range) alert(num); // 1, then 2, 3, 4, 5
      `}</Code>

      <H>Array - like object</H>

      <p>Array-likes are objects that have indexes and length, so they look like arrays</p>

      <Code block jsx>{`
      // strings are array-like objects
      "test".length // 4
      "test"[2] // 's'
      `}</Code>

      <Code block jsx>{`
      // here’s the object that is array-like, but not iterable:
      let arrayLike = { // has indexes and length => array-like
        0: "Hello",
        1: "World",
        length: 2
      };
      
      for (let item of arrayLike) {}  // Error (no Symbol.iterator)
      `}</Code>

      <H>From iterables & array-like object into array</H>

      <ul>
        <li>iterables & array-likes are not arrays, they don’t have push, pop etc. methods</li>
        <li><Code>Array.from()</Code> makes a “real” array</li>
      </ul>

      <Code block jsx>{`
      let arrayLike = {
        0: "Hello",
        1: "World",
        length: 2
      };
      
      let arr = Array.from(arrayLike);
      arr.pop(); // World (method works)
  
      // optional args
      Array.from(obj[, mapFn, thisArg])
      let arr = Array.from(arrayLike, str => " - " + str); // [" - Hello", " - World"]
  
      // string into array
      let str = "Hello"
      let strArr1 = Array.from(str)
      let strArr2 = str.split("")
      console.log(strArr1, strArr2) // ["H", "e", "l", "l", "o"] ["H", "e", "l", "l", "o"]
  
      // we can convert jQuery collection into array with such method
      `}</Code>

      <H>Objects are not equal</H>

      <p>
        From{' '}
        <Lnk path='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#comparing_objects'>MDN</Lnk>{' '}
        <i>
          <q>
            In JavaScript, objects are a reference type. Two distinct objects
            are never equal, even if they have the same properties. Only comparing
            the same object reference with itself yields true.
          </q>
        </i>
      </p>

      <Hs>Primitives</Hs>

      <Code block jsx>{`
        'abc' === 'abc' // true
        123 === 123 // true
        false === false // true
        null === null // true
        undefined === undefined // true
        Symbol("Sym") === Symbol("Sym") // false
      `}</Code>

      <Hs>Objects</Hs>

      <Code block jsx>{`
        {} === {} // false
        [] === [] // false
        (() => 0) === (() => 0) // false
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
