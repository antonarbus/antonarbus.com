import { Code, H, Hs, LazyImg, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'class',
  date: '2021.12.26',
  tags: ['JavaScript', 'basics', 'OOP'],
  imgUrl: 'https://antonarbus.com/imgs/class.webp',
  desc: 'class in JavaScript',
  body: (
    <>
      <ul>
        <li>Class is useful for objects creation of the same kind.</li>
        <li>There is not 'real' classes in JS</li>
        <li>Classes in JS are based internally on constructor functions & prototypes</li>
      </ul>

      <H>Syntax</H>

      <ul>
        <li>Class is useful for objects creation of the same kind.</li>
        <li>There is not 'real' classes in JS</li>
        <li>Classes in JS are based internally on constructor functions & prototypes</li>
      </ul>

      <Code block jsx>{`
            class MyClass {
              prop = value
              constructor() {} // NO commas
              method1() {} 
              method2() {}
              get something() {}
              set something(param) {}
              [Symbol.iterator]() {}
            }

            const obj = new MyClass() // create a new object with all the listed methods
      `}</Code>

      <ul>
        <li>constructor() method is called automatically by 'new', so we can initialize the object there</li>
        <li>MyClass is technically a constructor function</li>
        <li>methods, getters and setters are written to MyClass.prototype of a constructor function</li>
      </ul>

      <H>Create</H>

      <Code block jsx>{`
            class User {
              constructor(name) { this.name = name }
              sayHi() { alert(this.name) }
              car = "bmw"
              dog = prompt("your dog breed?", "husky");
            }
          
            let user = new User("John") // object is created
            user.sayHi() // "John"
            user.car // "bmw"
            user.dog // "husky"
            typeof User // function
            User.prototype // {constructor: ƒ, sayHi: ƒ}
            alert(User) // class User { ... } // string representation starts with the “class…”
            // for...in // does not work by default, coz enumerable flag is false for all methods in the "prototype"
            // Classes always "use strict"
      `}</Code>

      <p><LazyImg src='/imgs/jsClass/userObjectInConsole.png'></LazyImg></p>

      <H>Class expression</H>

      <Code block jsx>{`
            let User = class { sayHi() { alert("Hello") } }
            let User = class MyClass { sayHi() { alert("Hello") } } // Like a function, class expressions may have a name, it’s visible inside the class only
            let xxx = new User()
            xxx.sayHi() // Hello

            // return class in function on-demand
            function makeClass(phrase) {
              return class { sayHi() { alert(phrase) } }
            }
            let User = makeClass("Hello") // Create a new class
            new User().sayHi() // Hello
      `}</Code>

      <H>Dynamic method name</H>

      <Code block jsx>{`
            class User {
              ['say' + 'Hi']() { alert("Hello") }
            }
            new User().sayHi() // Hello
      `}</Code>

      <H><code>this</code> in class</H>

      <Code block jsx>{`
            class Button {
              constructor(value) { this.value = value }
              click() { alert(this.value) }
            }
            let button = new Button("hello")
            setTimeout(button.click, 1000) // undefined
        
            // but works with arrow function, which takes "this" from above
            class Button {
              constructor(value) { this.value = value }
              click = () => alert(this.value)
            }
            let button = new Button("hello")
            setTimeout(button.click, 1000) // hello
      `}</Code>

      <H>Methods chaining</H>

      <p>To enable methods chaining just return object's instance by returning <code>this</code></p>

      <Code block jsx>{`
            class Greetings {
              hi() { console.log('hi'); return this; }
              bye() { console.log('bye'); return this; }
            }

            const greeting = new Greetings()
            greeting.hi().bye() // hi // bye
      `}</Code>

      <H>Extends</H>

      <Code block jsx>{`
            class Animal {
              constructor(name) {
                this.speed = 0
                this.name = name
              }
              setSpeed(speed) { this.speed = speed }
            }
            
            let dog = new Animal("Spok")
            dog.name // 'Spok'
            dog.setSpeed(30)
            dog.speed // 30
            dog.doFly() // !!! dog.doFly is not a function
            
            class Bird extends Animal { 
              doFly() { return true }
            }

            let owl = new Bird('Lintu')
            owl.name // 'Lintu'
            owl.setSpeed(100)
            owl.speed // 100
            owl.doFly() // true
      `}</Code>

      <H>Override method</H>

      <Code block jsx>{`
            class Animal {
              constructor(name) {
                this.speed = 0
                this.name = name
              }
              setSpeed(speed) { this.speed = speed }
            }
            
              let dog = new Animal("Spok")
              dog.name // 'Spok'
              dog.setSpeed(30)
              dog.speed // 30
            
            class Bird extends Animal { 
              setSpeed(speed) { this.speed = 2 * speed }
            }
            
              let owl = new Bird('Lintu')
              owl.name // 'Lintu'
              owl.setSpeed(100)
              owl.speed // 200

      `}</Code>

      <H>Override constructor</H>

      <ul>
        <li>constructors in inheriting classes must call <code>super</code> before using <code>this</code></li>
        <li><code>super</code> calls parent method</li>
        <li>arrow functions do not have <code>super</code></li>
      </ul>

      <Code block jsx>{`
            class Animal {
              constructor(name) {
                this.speed = 0
                this.name = name
              }
            }
            let rabbit = new Animal ("White Rabbit", 10) 
            // {speed: 0, name: "White Rabbit"}
        
            class Rabbit extends Animal {
              constructor(name, earLength) {
                super(name)
                this.earLength = earLength
              }
            }
            rabbit = new Rabbit("White Rabbit", 10) 
            // {speed: 0, name: "White Rabbit", earLength: 10}
      `}</Code>

      <H>Static methods & properties</H>

      <ul>
        <li>they belong to the class</li>
        <li>they are not part of an instantiated object</li>
        <li>static properties and methods are inherited</li>
      </ul>

      <Hs>Static methods</Hs>

      <Code block jsx>{`
            class Man {
              name = "John"
              static hi() {
                return 'John says hi'
              }
            }

            // same as

            class Man { name = "John" }
            Man.hi = function() { return 'John says hi' }

            const john = new Man
            john.name // 'John'
            john.hi() // ! Uncaught TypeError: john.hi is not a function
            Man.hi() // 'John says hi'
      `}</Code>

      <Hs>Static property</Hs>

      <Code block jsx>{`
            class Article {
              static publisher = "John"
            }
            // or
            Article.publisher = "John"

            const news1 = new Article
            news1.publisher // undefined
            Article.publisher // 'John'
      `}</Code>

      <H>Read - only property</H>

      <ul>
        <li>property can be set & never modified</li>
        <li>to do that need to make getter, but not the setter</li>
      </ul>

      <Code block jsx>{`
            class CoffeeMachine {   
              constructor(power) { this._power = power }
              get power() { return this._power }
            }
            
            let coffeeMachine = new CoffeeMachine(100)
            alert(\`Power is: \${coffeeMachine.power} W\`) // Power is: 100 W
            coffeeMachine.power = 25; // Error (no setter)
      `}</Code>

      <H>Private property</H>

      <ul>
        <li>only accessible from inside the class</li>
        <li>not supported widely yet</li>
        <li>should start with <code>#</code></li>
        <li>inherits have no direct access</li>
      </ul>

      <Code block jsx>{`
            class CoffeeMachine {
              #waterAmount = 666
        
              waterAmount() {
                return this.#waterAmount
              }
            }
            
            let machine = new CoffeeMachine()
            machine.waterAmount() // 666
            machine.#waterAmount // Error Private field '#waterAmount' must be declared in an enclosing class
        
            // can not be inherited
            class MegaCoffeeMachine extends CoffeeMachine {
              method() {
                alert( this.#waterAmount ); // Error Private field '#waterAmount' must be declared in an enclosing class
              }
            }
      `}</Code>

      <H>Getters & setters</H>

      <p>Getters & setters can modify property values when we write or read them from the object.</p>

      <Code block jsx>{`
            class Human {
              get name() {
                return this._name
              }
              set name(str) {
                const letters = [...str]
                const [firstLetter, ...otherLetters] = letters
                this._name = [firstLetter.toUpperCase(), ...otherLetters].join('')
              }
            }
            
            const john = new Human
            john.name = 'john'
            john.name // 'John'
      `}</Code>

      <Code block jsx>{`
            class CoffeeMachine {
              #waterAmount = 0
        
              get waterAmount() {
                return this.#waterAmount
              }

              set waterAmount(value) {
                if (value < 0) value = 0
                this.#waterAmount = value
              }
            }

            let machine = new CoffeeMachine()
            machine.waterAmount = -666
            machine.waterAmount // 0
            machine.waterAmount = 100
            machine.waterAmount // 100
      `}</Code>

      <H>Getters & setters via functions</H>

      <ul>
        <li>can accept multiple arguments</li>
        <li>more flexible</li>
      </ul>

      <Code block jsx>{`
            class CoffeeMachine {
              #waterAmount = 0
            
              setWaterAmount(value) {
                if (value < 0) value = 0
                this.#waterAmount = value
              }
            
              getWaterAmount() {
                return this.#waterAmount
              }
            }

            const machine = new CoffeeMachine()
            machine.setWaterAmount(100)
            machine.getWaterAmount() // 100
      `}</Code>

      <H>Extend built -in classes</H>

      <ul>
        <li>Built-in classes like Array, Map, Object and <Lnk path="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects">others</Lnk> are extendable</li>
        <li>Can add additional methods to it</li>
        <li>Static methods are not inherited</li>
      </ul>

      <Code block jsx>{`
            class MyArray extends Array {
              isEmpty() { return this.length === 0 }
            }

            let arr = new MyArray(1, 2, 5, 10, 50)
            arr // MyArray(5) [1, 2, 5, 10, 50]
            arr.constructor === MyArray // true

            let filteredArr = arr.filter(item => item >= 10)
            filteredArr // MyArray(2) [10, 50]
            filteredArr.constructor === MyArray // true
            filteredArr.isEmpty() // false
            filteredArr.length = 0
            filteredArr // MyArray []
            filteredArr.isEmpty() // true
      `}</Code>

      <Hs>[Symbol.species]</Hs>

      <ul>
        <li>If we’d like built-in methods like map or filter to return regular arrays</li>
        <li>return Array in [Symbol.species]</li>
      </ul>

      <Code block jsx>{`
            class MyArray extends Array {
              isEmpty() { return this.length === 0 }
            
              static get [Symbol.species]() {
                return Array
              }
            }

            let arr = new MyArray(1, 2, 5, 10, 50)
            arr // MyArray(5) [1, 2, 5, 10, 50]
            arr.isEmpty() // false

            let filteredArr = arr.filter(item => item >= 10);
            filteredArr // [10, 50]
            filteredArr.isEmpty() // TypeError: filteredArr.isEmpty is not a function
      `}</Code>

      <H>instanceof</H>

      <ul>
        <li>Checks if an object belongs to a certain class</li>
        <li>Returns true if object belongs to the Class or inherits from it</li>
        <li>Examines the prototype chain for the check</li>
        <li>Same as <Code>objA.isPrototypeOf(objB)</Code></li>
      </ul>

      <Code block jsx>{`
            class Rabbit {}
            let rabbit = new Rabbit()
            rabbit instanceof Rabbit // true

            function Dog() {}
            new Dog() instanceof Dog // true

            let arr = [1, 2, 3];
            arr instanceof Array // true
            arr instanceof Object // true
      `}</Code>

      <H>Mixins</H>

      <ul>
        <li>object can inherit from a single object</li>
        <li>class may extend only one other class</li>
        <li>Sometimes it may be limiting</li>
        <li><i>Mixin</i> is a class with methods that can be used by other classes without a need to inherit from it</li>
        <li>Mixin is a class that contains methods for other classes</li>
      </ul>

      <Code block jsx>{`
            let sayHiMixin = {
              sayHi() { alert(\`Hello \${this.name}\`) },
              sayBye() { alert(\`Bye \${this.name}\`) }
            };
        
            class User {
              constructor(name) {
                this.name = name;
              }
            }
        
            // copy the methods
            Object.assign(User.prototype, sayHiMixin);
            // now User can say hi
            new User("Dude").sayHi(); // Hello Dude!
      `}</Code>

      <p>Good but difficult <Lnk path="https://javascript.info/mixins#eventmixin" > example</Lnk> on real mixin usage.</p>

      <H>Class vs constructor function</H>

      <p>Example is taken from the <Lnk path="https://www.youtube.com/playlist?list=PL4cUxeGkcC9i5yvDkJgt60vNVWffpblB7">OOP lesson</Lnk>, which shows how classes are internally done in JavaScript by prototyping.</p>

      <Hs>Class version</Hs>

      <Code block jsx>{`
            let usersArr = []

            class User {
              constructor(email, name) {
                this.email = email
                this.name = name
                this.online = false
                usersArr.push(this)
              }

              login() {
                this.online = true
                console.log(this.email, 'has logged in')
              }

              logout() {
                this.online = false
                console.log(this.email, 'has logged out')
              }
            }

            class Admin extends User {
              constructor(email, name) {
                super(email, name)
                this.role = ''
              }
              deleteUser(u) {
                usersArr = usersArr.filter(user => user.email !== u.email)
                console.log(usersArr)
              }
            }

            const userOne = new User('john@mail.com', 'John')
            const userTwo = new User('bob@mail.com', 'Bob')
            const admin = new Admin('mike@mail.com', 'Mike')
            usersArr // [User, User, Admin]
            admin.deleteUser(userOne)
            usersArr // [User, Admin]
      `}</Code>

      <Hs>Constructor function version</Hs>

      <Code block jsx>{`
            let usersArr = []

            function User(email, name) {
              this.email = email
              this.name = name
              this.online = false
              usersArr.push(this)
            }

            User.prototype.login = function() {
              this.online = true
              console.log(this.email, 'has logged in')
            }
            User.prototype.logout = function() {
              this.online = false
              console.log(this.email, 'has logged out')
            }

            function Admin(...args) {
              User.apply(this, args)
              this.role = ''
            }

            Admin.prototype = Object.create(User.prototype)
            Admin.prototype.deleteUser = function(u) {
              usersArr = usersArr.filter(user => user.email !== u.email)
            }

            const userOne = new User('john@mail.com', 'John')
            const userTwo = new User('bob@mail.com', 'Bob')
            const admin = new Admin('mike@mail.com', 'Mike')
            usersArr // [User, User, Admin]
            admin.deleteUser(userOne)
            usersArr // [User, Admin]
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
