import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'set',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/set.png',
  desc: 'Set in JavaScript',
  body: (
    <>
      <p>Set is a special type collection, like an array where each value may occur only once.</p>

      <H>Declaration</H>

      <p><Code>{'new Set([iterable])'}</Code></p>

      <Code block jsx>{`
            // creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
            let set = new Set([1,1,2,2,3,3]);
            set // Set(3) {0:1, 1:2, 2:3}
      `}</Code>

      <H>Add</H>

      <Code block jsx>{`
            let set = new Set()
            let john = { name: "John" }
            let pete = { name: "Pete" }
            let mary = { name: "Mary" }
            set.add(john)
            set.add(pete)
            set.add(mary)
            set.add(john)
            set.add(mary)
            set // Set(3) {{…}, {…}, {…}}
      `}</Code>

      <H>Get</H>

      <p>It seems there is no native way.</p>

      <H>Size</H>

      <Code block jsx>{`
            set.size; // 3
      `}</Code>

      <H>Delete</H>

      <ul>
        <li><Code>{'set.delete(value)'}</Code> - returns true if value existed at the moment of the call, otherwise false.</li>
        <li><Code>{'set.clear()'}</Code> - removes everything from the set</li>
        <li></li>
      </ul>

      <Code block jsx>{`
            set.delete(john); // true
            // but  
            set.delete({ name: "John" }); // false

            set.clear()
            set // Set(0) {size: 0}
      `}</Code>

      <H>Has</H>

      <ul>
        <li><Code>{'set.has(value)'}</Code></li>
        <li>returns true if the value exists in the set, otherwise false</li>
      </ul>

      <Code block jsx>{`
            set.has(pete); // true
            // but  
            set.has({ name: "Pete" }); // false
      `}</Code>

      <H>Iteration</H>

      <Code block jsx>{`
            set.keys() // returns an iterable object for values, because there are no keys in Set, exists for compatibility with Map.
            set.values() // returns an iterable object for values
            set.entries() // returns an iterable object for entries [value, value], exists for compatibility with Map.

            for (let user of set) {
              alert(user.name); // John (then Pete and Mary)
            }

            set.forEach((value, valueAgain, set) => {
              alert(value.name); // John (then Pete and Mary)
            });
      `}</Code>

      <H>{'Set-- > Array'}</H>

      <Code block jsx>{`
            let set = new Set([1,1,2,2,3,3])
            set // Set(3) {1, 2, 3}
            arr = Array.from(set)
            arr //  [1, 2, 3]
      `}</Code>

      <H>WeakSet</H>

      <ul>
        <li>allows to store only objects</li>
        <li>removes them once they become inaccessible</li>
        <li>main advantages are that they have weak reference </li>
        <li>they can easily be removed by garbage collector</li>
        <li>disadvantages are not having support for clear, size, keys, values…</li>
        <li>An object exists in the set while it is reachable from somewhere else</li>
        <li>Like Set, it supports add, has and delete, but not size, keys() and no iterations.</li>
      </ul>

      <Code block jsx>{`
            xx let weakSet = new WeakSet();

            let john = { name: "John" };
            let pete = { name: "Pete" };
            let mary = { name: "Mary" };
            
            weakSet.add(john);
            weakSet.add(pete);
            weakSet.add(john);
            
            // weakSet has 2 users now
            
            // check if John visited?
            alert(weakSet.has(john)); // true
            alert(weakSet.has(mary)); // false
            
            john = null;
            // weakSet will be cleaned automatically
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
