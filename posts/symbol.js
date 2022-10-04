import { Code, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'symbol',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/symbol.webp',
  desc: 'Symbol in JavaScript',
  body: (
    <>
      <ul>
        <li>Object property keys may be string or symbol type</li>
        <li>A “symbol” represents a unique identifier</li>
        <li>Symbols are guaranteed to be unique</li>
        <li>Even if we create many symbols with the same description, they are different values</li>
      </ul>

      <Hs>Create </Hs>

      <Code block jsx>{`
        let id1 = Symbol("id")
        let id2 = Symbol("id")
        id1 == id2 // false
        typeof id1 // "symbol"
        alert(id1) // TypeError: Cannot convert a Symbol value to a string
        alert(id1.toString()); // "Symbol(id)"
      `}</Code>

      <Hs>Description property</Hs>

      <Code block jsx>{`
        let id1 = Symbol("id")
        id1.description // "id"
      `}</Code>

      <Hs>Symbol in object literal</Hs>

      <Code block jsx>{`
        let id = Symbol("id");
        let user = {
          name: "John",
          [id]: 123 // not "id": 123 // That’s because we need the value from the variable id as the key, not the string “id”
        };
      `}</Code>

      <Hs>“Hidden” properties</Hs>

      <ul>
        <li>we can access the data using the symbol as the key</li>
        <li>nobody can overwrite it, coz nobody can generate same id, symbol cannot be accessed accidentally</li>
      </ul>

      <Code block jsx>{`
        let user = { name: "John" };
        let id = Symbol("id");
        user[id] = 1;
        user[id] // 1     
      `}</Code>

      <Hs>Symbols are skipped by for…in loop</Hs>

      <Code block jsx>{`
        for (let key in user ) {
          console.log(key, user [key]); // name John
        }
        // Symbol(id): 1 is skipped
        Object.keys(user) // ["name"] // Symbol is not shown 
      `}</Code>

      <Hs>Copy object with Symbol</Hs>

      <Code block jsx>{`
        let id = Symbol("id");
        let user = { [id]: 123   };
        let clone = Object.assign({}, user);
        clone[id]; // 123 
      `}</Code>

      <Hs>Global symbols</Hs>

      <ul>
        <li>We can create symbols global registry & access them later</li>
        <li>It guarantees that repeated accesses by the same name return exactly the same symbol.</li>
        <li><Code>Symbol.for(key)</Code> checks the global registry, and creates or returns existing symbol</li>
        <li>Symbols inside the registry are called global symbols</li>
        <li>They are accessible everywhere in the code – that’s what they are for.</li>
        <li>There are many system symbols used by JavaScript which are accessible as Symbol.*</li>
        <li>We can use them to alter some built-in behaviors</li>
      </ul>

      <Code block jsx>{`
        // read from the global registry
        let id = Symbol.for("id"); // if the symbol did not exist, it is created
        // read it again (maybe from another part of the code)
        let idAgain = Symbol.for("id");
        id === idAgain // true // the same symbol
    
        // Symbol.for works only for global symbols
        let globalSymbol = Symbol.for("name");
        let localSymbol = Symbol("name");
        Symbol.keyFor(globalSymbol) // name, global symbol
        Symbol.keyFor(localSymbol) // undefined, not global
        globalSymbol.description // name
        localSymbol.description // name 
        
        // There are many system symbols used by JavaScript which are accessible as Symbol.*. 
        // We can use them to alter some built-in behaviors.
        Symbol.hasInstance
        Symbol.isConcatSpreadable
        Symbol.iterator
        Symbol.toPrimitive
        // …and so on.
      `}</Code>

      <Hs>Example to understand symbols</Hs>

      <Code block jsx>{`
        let lib = { name: "ABC" };
        lib["id"] = 5;
        lib["id"] = 6; // The value is changed because it is String [KEY]!!
    
        lib[Symbol("id")] = 123;
        lib[Symbol("id")] = 124; //Not changed
        lib // { name: "ABC", id: 6, Symbol(id): 123, Symbol(id): 124 } 
      `}</Code>

      <Hs>Object to primitive conversion</Hs>

      <p>For data conversion into a primitive value JavaScript tries to find and call three object methods:</p> <br />

      <ol>
        <li>Call <Code>obj[Symbol.toPrimitive](hint)</Code> – the method with the symbolic key <Code>Symbol.toPrimitive</Code>. <br /></li>
        <li>Otherwise if hint is <code>string</code> JS tries <Code>obj.toString()</Code> or <Code>obj.valueOf()</Code>. <br /></li>
        <li>Otherwise if hint is <code>number</code> or "default" JS tries  <Code>obj.valueOf()</Code> or <Code>obj.toString()</Code>. <br /></li>
      </ol>

      <p>
        Knowing that we can make our data be convertible into primitive value by JS natively.
      </p>

      <p>
        Basic object is not converted into number or boolean.
      </p>

      <Code block jsx>{`
        let obj = {a: "5"}
        Boolean({obj}) // true // All objects are true in a boolean context
        obj.toString() // "[object Object]"
        +obj // NaN
      `}</Code>

      <p>
        But when we add symbol it can do conversion.
      </p>

      <Code block jsx>{`
        let user = {
          name: "John",
          money: 1000,
          [Symbol.toPrimitive](hint) {
            return hint == "string" ? this.name : this.money;
          }
        };
        
        alert(user); // "John"
        alert(+user); // 1000
        alert(user + 500); // 1500
      `}</Code>

      <p>
        In the absence of <Code>Symbol.toPrimitive</Code> conversion can be handled by <Code>valueOf()</Code>, <Code>toString()</Code>.
      </p>

      <Code block jsx>{`
        let user = {
          name: "John",
          money: 1000,
          // for hint="string"
          toString() {
            return this.name;
          },
          // for hint="number" or "default"
          valueOf() {
            return this.money;
          }
        };
    
        alert(user); // "John"
        alert(+user); // 1000
        alert(user + 500); // 1500
      `}</Code>

      <Hs>Make iterable contactable</Hs>

      <Code block jsx>{`
        let arr = [1, 2]
        let arrayLike = {
          0: "something",
          length: 1,
        }
        arr.concat(arrayLike) // [1,2,[object]]

        let arr = [1, 2];
        let arrayLike = {
          0: "something",
          1: "else",
          [Symbol.isConcatSpreadable]: true,
          length: 2,
        };
        arr.concat(arrayLike) //[1, 2, "something", "else"]
      `}</Code>

      <Hs>Make object iterable</Hs>

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
