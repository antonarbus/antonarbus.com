import { Code, H, Hs, jsxToStr, Lnk } from '/components/post/reExport'

const postObj = {
  title: 'set',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/set.png',
  desc: 'Set in JavaScript',
  body: (
    <>
      <ul>
        <li>
          Set is a special type collection, like an array where each value may occur only once
        </li>
        <li>Operations on sets are faster than arrays & objects</li>
        <li>
          Following examples are taken mostly from{' '}
          <Lnk path="https://github.com/jherr/javascript-sets">here</Lnk>
        </li>
      </ul>

      <H>Declaration</H>

      <p>
        <Code>{'new Set([iterable])'}</Code>
      </p>

      <Code block jsx>{`
        let set = new Set([1,1,2,2,3,3]) // Set(3) {0:1, 1:2, 2:3}
      `}</Code>

      <H>Add</H>

      <Code block jsx>{`
        const set1 = new Set(); // Set(0) {}
        set1.add(1);
        set1.add(2);
        set1.add(1); // Set(2) { 1, 2 }
      `}</Code>

      <H>Set out of Set</H>

      <Code block jsx>{`
        const set3 = new Set([1,2,3]);
        const set4 = new Set(set3);

        console.log(set3); // { 1, 2, 3 }
        console.log(set4); // { 1, 2, 3 }

        set4.add(666);

        console.log(set3); // { 1, 2, 3 }
        console.log(set4); // { 1, 2, 3, 666 }
      `}</Code>

      <H>Clear</H>

      <Code block jsx>{`
        const set5 = new Set([3,2,1,1,2]);
        console.log(set5); // Set(3) { 3, 2, 1 }

        set5.clear();
        console.log(set5); // Set(0) {}

        set5.add(1);
        console.log(set5) // Set(1) { 1 }
      `}</Code>

      <H>Delete</H>

      <Code block jsx>{`
        // returns true if value existed at the moment of the call, otherwise false.
        const set6 = new Set([3,2,1,1,2]);
        console.log(set6); // { 3, 2, 1 }

        set6.delete(1); // true
        console.log(set6); // { 3, 2 }
      `}</Code>

      <H>Set to array</H>

      <Code block jsx>{`
        const set7 = new Set([1,2,3])
        console.log(Array.from(set7)) // [1,2,3]
        console.log([...set7]) // [1,2,3]
      `}</Code>

      <H>Get</H>

      <ul>
        <li>it doesn't have index-based access</li>
        <li>there is no dedicated method to get a value</li>
        <li>Set is designed for uniqueness rather than indexed access</li>
      </ul>

      <Hs>Check if value exists</Hs>

      <Code block jsx>{`
        const mySet = new Set([10, 20, 30]);
        console.log(mySet.has(20)); // true
      `}</Code>

      <Hs>via to array</Hs>

      <Code block jsx>{`
        const mySet = new Set([10, 20, 30]);
        const arr = [...mySet]; // Convert to an array
        console.log(arr[1]); // 20

        const mySet = new Set([10, 20, 30]);
        console.log(Array.from(mySet)[1]); // 20
      `}</Code>

      <Hs>via for...of loop</Hs>

      <Code block jsx>{`
        const mySet = new Set([10, 20, 30]);
        for (let value of mySet) {
            if (value === 20) {
                console.log(value); // 20
                break;
            }
        }
      `}</Code>

      <H>Size</H>

      <Code block jsx>{`
        const set1 = new Set([10,20,100,200]);
        set1.size; // 4
      `}</Code>

      <H>Has</H>

      <Code block jsx>{`
        const set2 = new Set([10,20,100,200]);
        console.log("10:", set2.has(10)); // true
        console.log("100:", set2.has(100)); // true
        console.log("1000:", set2.has(1000)); // false
      `}</Code>

      <H>entries keys values</H>

      <Code block jsx>{`
        // set.keys() // returns an iterable object for values, because there are no keys in Set, exists for compatibility with Map.
        // set.values() // returns an iterable object for values
        // set.entries() // returns an iterable object for entries [value, value], exists for compatibility with Map.

        const set3 = new Set(["Jane", "John", "Jim", "Jill"]);

        console.log('Entries:', set3.entries()); 
        /*
        [Set Entries] {
          [ "Jane", "Jane" ],
          [ "John", "John" ],
          [ "Jim", "Jim" ],
          [ "Jill", "Jill" ]
        }
        */
        console.log('Keys:', set3.keys()); // [Set Iterator] { "Jane", "John", "Jim", "Jill" }
        console.log('Values:', set3.values()); // [Set Iterator] { "Jane", "John", "Jim", "Jill" }
      `}</Code>

      <H>Iteration</H>

      <Code block jsx>{`
        const set4 = new Set(["Jane", "John", "Jim", "Jill"]);

        set4.forEach((value) => console.log(value));     // Jane --> John --> Jim --> Jill
    
        for (const value of set4) {
          console.log(value); // Jane --> John --> Jim --> Jill
        }
      `}</Code>

      <H>Performance</H>

      <Code block jsx>{`
        const arr = new Array(300000).fill(0).map((_, index) => index);

        const startTime = performance.now()
        for (let i = 0; i < 300000; i++) {
          arr.includes(i);
        }
        const endTime = performance.now()
        console.log(endTime - startTime) // 4779 ms
      `}</Code>

      <Code block jsx>{`
        const set = new Set(new Array(300000).fill(0).map((_, index) => index));

        const startTime = performance.now()
        for (let i = 0; i < 300000; i++) {
          set.has(i);
        }
        const endTime = performance.now()
        console.log(endTime - startTime) // 1.5 ms
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
        let weakSet = new WeakSet()

        let john = { name: "John" }
        let pete = { name: "Pete" }
        let mary = { name: "Mary" }
        
        weakSet.add(john)
        weakSet.add(pete)
        weakSet.add(john)
        
        // weakSet has 2 users now
        
        // check if John visited?
        alert(weakSet.has(john)) // true
        alert(weakSet.has(mary)) // false
        
        john = null
        // weakSet will be cleaned automatically
      `}</Code>

      <H>union</H>

      <Code block jsx>{`
        const setA = new Set([1,2,3,4,5,6]);
        const setB = new Set([2,3,10,50,60]);

        console.log('Union:', setA.union(setB));
        console.log('Intersection:', setA.intersection(setB));
        console.log('Difference:', setA.difference(setB));
        console.log('Symmetric Difference:', setA.symmetricDifference(setB));
      `}</Code>

      <H>union</H>

      <Code block jsx>{`
        const setA = new Set([1,2,3,4,5,6]);
        const setB = new Set([2,3,10,50,60]);

        console.log('Union:', setA.union(setB));
        // Set(9) { 1, 2, 3, 4, 5, 6, 10, 50, 60 }
      `}</Code>

      <H>intersection</H>

      <Code block jsx>{`
        const setA = new Set([1,2,3,4,5,6]);
        const setB = new Set([2,3,10,50,60]);

        console.log('Intersection:', setA.intersection(setB));
        // Set(2) { 2, 3 }
      `}</Code>

      <H>difference</H>

      <Code block jsx>{`
        const setA = new Set([1,2,3,4,5,6]);
        const setB = new Set([2,3,10,50,60]);

        console.log('Difference:', setA.difference(setB));
        // Set(4) { 1, 4, 5, 6 }
      `}</Code>

      <H>symmetricDifference</H>

      <Code block jsx>{`
        const setA = new Set([1,2,3,4,5,6]);
        const setB = new Set([2,3,10,50,60]);

        console.log('Symmetric Difference:', setA.symmetricDifference(setB));
        // Set(7) { 1, 4, 5, 6, 10, 50, 60 }
      `}</Code>

      <H>isSupersetOf</H>

      <Code block jsx>{`
        const names1 = new Set(['John', 'Jane', 'Alice', 'Bob']);
        const names2 = new Set(['John', 'Jane']);

        console.log(names1.isSupersetOf(names2)) // true
      `}</Code>

      <H>isSubsetOf</H>

      <Code block jsx>{`
        const names1 = new Set(['John', 'Jane', 'Alice', 'Bob']);
        const names2 = new Set(['John', 'Jane']);

        console.log({names1.isSubsetOf(names2)); // false
        console.log({names2.isSubsetOf(names1)); // true
      `}</Code>

      <H>isDisjointFrom</H>

      <Code block jsx>{`
        const names1 = new Set(['John', 'Jane', 'Alice', 'Bob']);
        const names2 = new Set(['John', 'Jane']);
        const names3 = new Set(['Zoe']);

        console.log(names1.isDisjointFrom(names2)); // false
        console.log(names1.isDisjointFrom(names3)); // true
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
