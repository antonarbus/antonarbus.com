import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'map',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/map.png',
  desc: 'Map in JavaScript',
  body: (
    <>
      <p>Map is is a special type collection, like an object with keys of any data type.</p>

      <H>Object vs Map</H>

      <Code block jsx>{`
      let john = { name: "John" };
      let obj = {};
      obj[john] = 123;
      obj // {[object Object]: 123}

      let map = new Map(); 
      map.set(john, 123); 
      map // [key: {name: "John"}, value: 123]
      `}</Code>

      <H>Declaration</H>

      <p><Code>{'new Map([iterable])'}</Code></p>

      <Code block jsx>{`
      let map = new Map() // creates the map
      // or
      let map = new Map([
        ['1',  'str1'],
        [1,    'num1'],
        [true, 'bool1']
      ]);
      `}</Code>

      <H>Add</H>

      <p><Code>{'map.set(key, value)'}</Code></p>

      <Code block jsx>{`
      map.set('1', 'str1') // a string key
      map.set(1, 'num1') // a numeric key
      map.set(true, 'bool1') // a boolean key
      `}</Code>

      <H>Get</H>

      <p>
        <ul>
          <li><Code>{'map.get(key)'}</Code></li>
          <li>returns the value by the key</li>
          <li><code>undefined</code> if key doesn’t exist in map</li>
          <li><Code>{'map[key]'}</Code> -  works, but isn’t the right way</li>
        </ul>
      </p>

      <Code block jsx>{`
      map.get('1'); // 'str1'
      map.get(1); // 'num1'
      `}</Code>

      <H>Size</H>

      <Code block jsx>{`
      map.size; // 3
      `}</Code>

      <Hs>Delete</Hs>

      <ul>
        <li><Code>{'map.delete(key)'}</Code> - removes the value by the key</li>
        <li><Code>{'map.clear() '}</Code> - removes everything from the map</li>
      </ul>

      <H>Has</H>

      <ul>
        <li><Code>{'map.has(key)'}</Code> - returns true if the key exists, false otherwise</li>
      </ul>

      <H>Iteration</H>

      <p>Iteration goes in the same order as the values were inserted</p>

      <Code block jsx>{`
      let recipeMap = new Map([
        ['cucumber', 500],
        ['tomatoes', 350],
        ['onion', 50]
      ]);
  
      // returns iterable of keys, values & entries
      recipeMap.keys() // MapIterator {"cucumber", "tomatoes", "onion"}
      recipeMap.values() // MapIterator{500, 350, 50}
      recipeMap.entries() // MapIterator{"cucumber" => 500, "tomatoes" => 350, "onion" => 50} // it’s used by default in for..of.
  
      for (let key of recipeMap.keys()) alert(key) // cucumber, tomatoes, onion
      for (let value of recipeMap.values()) alert(value) // 500, 350, 50
      for (let entry of recipeMap) alert(entry) // cucumber,500 (and so on) // the same as of recipeMap.entries()
      
      recipeMap.forEach( (value, key, map) => {
        alert(\`\${key}: \${value}\`) // cucumber: 500 etc
      })
      `}</Code>

      <H>Chaining</H>

      <p><code>map.set</code> call returns the map itself</p>

      <Code block jsx>{`
        map.set('1', 'str1').set(1, 'num1').set(true, 'bool1')
        map // Map(3){'1' => 'str1', 1 => 'num1', true => 'bool1'}
      `}</Code>

      <H>{'Array--> Map'}</H>

      <Code block jsx>{`
      let map = new Map([
        ['1',  'str1'],
        [1,    'num1'],
        [true, 'bool1']
      ]);
  
      map.get('1') // "str1"
      `}</Code>

      <H>{'Object--> Map'}</H>

      <Code block jsx>{`
      let obj = {
        name: "John",
        age: 30
      };
      
      let map = new Map(Object.entries(obj));
      map.get('name') // "John"
      `}</Code>

      <H>{'Map--> Object'}</H>

      <Code block jsx>{`
      let prices = Object.fromEntries([
        ['banana', 1],
        ['orange', 2],
      ])
      prices // { banana: 1, orange: 2, meat: 4 }
      `}</Code>

      <H>WeakMap</H>

      <p>
        <ul>
          <li>allows only objects as keys</li>
          <li>removes them together with associated value once they become inaccessible</li>
          <li>main advantages are that they have weak reference to objects</li>
          <li>they can easily be removed by garbage collector</li>
          <li>disadvantages are not having support for clear, size, keys, values…</li>
          <li>idea is that object key stays in map if we even delete the object reference, it is not garbage collected</li>
          <li>but in weakMap if we kill the obj it will be also removed from the weakMap</li>
          <li>If we’re working with an object that “belongs” to another code, maybe even a third-party library,
            and would like to store some data associated with it,
            that should only exist while the object is alive – then WeakMap is exactly what’s needed.</li>
        </ul>
      </p>

      <Code block jsx>{`
      let map = new Map();
      let obj1 = {name: "Jane"}
      let obj2 = {name: "Anton"}
      map.set(obj1, "good girl");
      map.set(obj2, "good boy");
      obj1 = null
      obj2 = null
      map.size // 2 // bad

      let weakMap = new WeakMap();
      let obj1 = {name: "Jane"}
      let obj2 = {name: "Anton"}
      weakMap.set(obj1, "good girl");
      weakMap.set(obj2, "good boy");
      obj1 = null
      obj2 = null
      weakMap.size // undefined
      // When obj gets garbage collected, weakMap will be removed as well   
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
