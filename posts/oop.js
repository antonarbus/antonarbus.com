import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'oop',
  date: '2022.01.11',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/oop.png',
  desc: 'OOP concepts in JavaScript',
  body: (
    <>
      <p>Here are 4 object oriented programming key concepts.</p>

      <H>Encapsulation</H>
      <>
        Combining relative functions and variables in a single unit(object).
      </>

      <Code block jsx>{`
        class Employee {
          setEmpDetails(name, id) {
            this.name = name
            this.id = id
          }
          getEmpName() {
            return this.name
          }
          getEmpId() {
            return this.id
          }
        }
        
        const emp1 = new Employee()
        emp1.setEmpDetails('John', 1001)
        emp1.getEmpName() // 'John'
        emp1.getEmpId() // 1001
      `}</Code>

      <H>Inheritance</H>

      <ul>
        <li>Process where one object (class) gets properties from another object</li>
        <li>Inheritance is done from a class, which is called <i>parent</i> or <i>super</i> or <i>base</i> </li>
        <li>Inherited properties go to a class, which is called <i>child</i> or <i>sub</i> or <i>derived</i></li>
      </ul>

      <Code block jsx>{`
        class Car {
          setName(name) {
            this.name = name
          }
          startEngine() {
            console.log('Engine started for ' + this.name)
          }
        }

        class Toyota extends Car {
          topSpeed(speed) {
            console.log('Top speed for ' + this.name + ' is ' + speed)
          }
        }
        
        const myCar = new Toyota()
        myCar.setName('Camry')
        myCar.startEngine() // Engine started for Camry
        myCar.topSpeed(200) // Top speed for Camry is 200
      `}</Code>

      <H>Polymorphism</H>

      <ul>
        <li>A way to create a single variable, function or object in different forms.</li>
        <li>Same method works differently depending on class.</li>
      </ul>

      <Code block jsx>{`
      class Animal {
        constructor(name) {
          this.name = name
        }
        eats() {
          console.log(this.name + ' eats food')
        }
      }

      class Alligator extends Animal {
        eats() {
          console.log(this.name + ' eats fishes')
        }
      }

      const bobby = new Animal('Bobby')
      bobby.eats() // Bobby eats food
      const murphy = new Alligator('Murphy')
      murphy.eats() // Murphy eats fishes
      `}</Code>

      <H>Abstraction</H>

      <ul>
        <li>Abstraction is when we hide the complexity of the code, and also not letting the user access some data</li>
        <li>Can do that by using <i>let</i>, <i>const</i> keywords & # <i>private</i> methods</li>
        <li>Can be easily done in function constructors, but not in class</li>
        <li>In class we can use <i>let</i> & <i>const</i> only inside functions, but it is not always elegant</li>
        <li>If we use <i>this</i> keyword that property will be exposed to a user</li>
      </ul>

      <Code block jsx>{`
      class Employee {
        constructor(name, yearsInCompany) {
          this.name = name
          this.yearsInCompany = yearsInCompany
        }
        #calcSalarySecretly() {
          const hiddenBaseSalary = 2000
          return (1 + this.yearsInCompany / 10) * hiddenBaseSalary
        }
        get salary() {
          return this.#calcSalarySecretly()
        }
        tellSalary() {
          console.log('Salary of ' + this.name + ' is ' + this.salary + ' $/m')
        }
      }

      const john = new Employee('John', 5)
      john.salary // 3000
      john.tellSalary() // 'Salary of John is 3000 $/m'
      john.#calcSalarySecretly() // SyntaxError: Private field
      john.hiddenBaseSalary // undefined
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
