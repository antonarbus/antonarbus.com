'use client'


import { Code, Hs, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'array',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/array.png',
  desc: 'Arrays in JavaScript',
  body: (
    <>
      <H>Declaration</H>

      <Code block jsx>{`
        let fruits = new Array("Apple", "Pear", "etc")

        // mix of values + training comma are allowed
        let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello') }, ]
      `}</Code>

      <H>Access via brackets []</H>

      <Code block jsx>{`
        fruits[0] // Apple
        arr[1].name // John
        arr[3]() // hello
        arr[arr.length - 1]() // hello
      `}</Code>

      <H>Access via .at()</H>

      <p>Accepts negative numbers.</p>

      <Code block jsx>{`
        fruits.at(0) // Apple
        arr.at(1).name // John
        arr.at(3)() // hello
        arr.at(-1)() // hello
      `}</Code>

      <H>Change via brackets</H>

      <p>MUTATES!</p>

      <Code block jsx>{`
        fruits[2] = 'Pear' // now ["Apple", "Orange", "Pear"]
        fruits[3] = 'Lemon' // now ["Apple", "Orange", "Pear", "Lemon"]
      `}</Code>

      <H>Change via with()</H>

      <Code block jsx>{`
      const correctionNeeded = [1, 1, 3]
      correctionNeeded.with(1, 2) // => [1, 2, 3]
      correctionNeeded // => [1, 1, 3]
      `}</Code>

      <H>Delete</H>

      <p>MUTATES!</p>

      <Code block jsx>{`
        let arr = ["I", "study", "JavaScript", "right", "now"]
        delete arr[1]; 
        arr // ["I", empty, "JavaScript", "right", "now"]

        arr.length = 3 // truncate
        arr // ["I", empty, "JavaScript"]
        arr.length = 0 
        arr // []
      `}</Code>

      <H>Arrays is reference type</H>

      <Code block jsx>{`
        let fruits = ["Banana"]
        let arr = fruits // copy by reference (two variables reference the same array)
        arr.push("Pear") // modify the array by reference
        fruits // Banana, Pear - 2 items now
      `}</Code>

      <H>Arrays is an ordered collection</H>

      <p>Arrays is an ordered collection & we can destroy array speed if:</p>
      <ul>
        <li>Add a non-numeric property like <code>arr.test = 5</code></li>
        <li>Make holes like <code>arr[0]</code>, <code>arr[1000]</code> & nothing between</li>
        <li>Fill an array in the reverse order, like <code>arr[1000]</code>, <code>arr[999]</code> and so on.</li>
      </ul>

      <H>Keys, values, entries</H>

      <Code block jsx>{`
        let arr = ['a', 'b', 'c']

        // object methods
        Object.keys(arr) // ['0', '1', '2']
        Object.values(arr)  // ['a', 'b', 'c']
        Object.entries(arr) // [["0",1],["1",2],["2",3]]

        // array iterator methods
        const iterator = arr.values(); // returns a new Array Iterator object that contains the values for each index in the array
        for (const value of iterator) console.log(value); // a // b // c

        const iterator = arr.keys(); // returns a new Array Iterator object that contains the keys for each index in the array.
        for (const key of iterator) console.log(key);  // 0 // 1 // 2

        const iterator = arr.entries();
        for (const entry of iterator) console.log(entry); // [0, "a"] // [1, "b"] // [2, "c"]
      `}</Code>

      <H>Length</H>

      <Code block jsx>{`
        let arr = [1, 2, 3, 4, 5]
        arr.length // 5 // greatest numeric index plus one

        arr[123] = "Apple"
        arr // [1, 2, 3, 4, 5, empty × 118, "Apple"]
        arr.length // 124

        arr.length = 2 // truncate to 2 elements
        arr // [1, 2]

        arr.length = 124 // return length back
        arr // [1, 2, empty × 122]

        arr[3] // undefined

        arr.length = 0 // simplest way to clear the array
        arr // []
      `}</Code>

      <H>Multidimensional arrays</H>

      <Code block jsx>{`
        let matrix = [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]
        ];
        matrix[1][1] // 5
      `}</Code>

      <H>Loops</H>

      <Hs>For</Hs>

      <Code block jsx>{`
        for (let i = 0; i < arr.length; i++) {
          alert(arr[i]);
        }
      `}</Code>

      <Hs>for..of</Hs>

      <Code block jsx>{`
        for (let fruit of arr) {
          alert(fruit); // no access to index, only to a value
        }
      `}</Code>

      <Hs>for..in</Hs>

      <p>DO NOT USE!!!</p>

      <Code block jsx>{`
        // came from object, 100 times slower 
        for (let key in arr) {
          alert(arr[key]); 
        }
      `}</Code>

      <Hs>forEach</Hs>

      <Code block jsx>{`
          arr.forEach(function(item, index, array) {
            alert(\`\${item} is at index \${index} in \${array}\`);
          });
      `}</Code>

      <H>Array.isArray()</H>

      <Code block jsx>{`
        typeof {} // object
        typeof [] // object
        Array.isArray({}) // false
        Array.isArray([]) // true
      `}</Code>

      <H>Array.from()</H>

      <p>Returns a new shallow-copied array instance from iterable object</p>

      <Code block jsx>{`
        let arrayLike = {  0: "Hello",  1: "World",  length: 2};
        let arr = Array.from(arrayLike); // ["Hello", "World"]

        let arrLike = $('textarea'); // S.fn.init(4) [#word-textarea, #tranalstion-textarea, #example-textarea, #category-textarea, prevObject: S.fn.init(1)]
        let arr = Array.from(arrayLike); // [#word-textarea, #tranalstion-textarea, #example-textarea, #category-textarea]
      `}</Code>

      <H>push()</H>

      <p>MUTATES!</p>

      <Code block jsx>{`
        let arr = ["Apple", "Orange", "Pear"]
        arr.push("Lemon") // 4 // arr = ["Apple", "Orange", "Pear", "Lemon"]
        arr.push("Orange", "Peach")  // 6 
        arr // ["Apple", "Orange", "Pear", "Lemon", "Orange", "Peach"]
      `}</Code>

      <H>pop()</H>

      <p>MUTATES!</p>

      <Code block jsx>{`
        let arr = ["Apple", "Orange", "Pear"]
        arr.pop() // "Pear" 
        arr // ["Apple", "Orange"]
      `}</Code>

      <H>unshift()</H>

      <p>MUTATES!</p>

      <Code block jsx>{`
        // SLOW!
        let arr = ["Apple", "Orange", "Pear"]
        arr.unshift("Lemon") // 4 
        arr // ["Lemon", "Apple", "Orange", "Pear"]
        arr.unshift("Orange", "Peach") // 6 
        arr // ["Orange", "Peach", "Lemon", "Apple", "Orange", "Pear"]
      `}</Code>

      <H>shift()</H>

      <p>MUTATES!</p>

      <Code block jsx>{`
        // SLOW!
        let arr = ["Apple", "Orange", "Pear"]
        arr.shift() // "Apple" 
        arr // ["Orange", "Pear"]
      `}</Code>

      <H>String()</H>

      <Code block jsx>{`
        // returns a comma-separated list of elements
        let arr = ["Apple", "Orange", "Pear"];
        String(arr); // "Apple,Orange,Pear"
      `}</Code>

      <H>toString()</H>

      <Code block jsx>{`
        const arr = [1, 2, 'a', '1a']
        arr.toString() // "1,2,a,1a"
        arr // [1, 2, 'a', '1a']
      `}</Code>

      <H>toLocaleString()</H>

      <Code block jsx>{`
        const  arr = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')];
        arr.toLocaleString('en', { timeZone: 'UTC' }); // "1,a,12/21/1997, 2:12:00 PM"
      `}</Code>

      <H>splice()</H>

      <p>MUTATES!</p>

      <Code>{'arr.splice(startIndex, [deleteCount], [elemToInsert1], [elemToInsert2])'}</Code>

      <p><Code>{'arr.splice(index, 1)'}</Code> - remove one element</p>

      <ul>
        <li>Remove an item by index position</li>
        <li>modifies arr starting from the startIndex</li>
        <li>removes deleteCount number of elements</li>
        <li>inserts elem1, ..., elemN at their place</li>
        <li>Returns the array of removed elements</li>
      </ul>

      <Code block jsx>{`
        // remove el
        let arr = ["I", "study", "JavaScript"]
        arr.splice(1, 1) // ["study"] // Starting from the index 1 remove 1 el
        arr // ["I", "JavaScript"]

        // remove & replace els
        let arr = ["I", "study", "JavaScript", "right", "now"]
        arr.splice(0, 3, "Let's", "dance") // ) ["I", "study", "JavaScript"]
        arr // ["Let's", "dance", "right", "now"]

        // insert the elements w/o any removals
        let arr = ["I", "study", "JavaScript"]
        arr.splice(2, 0, "complex", "language") // []
        arr // ["I", "study", "complex", "language", "JavaScript"]

        // Negative indexes are allowed
        // index -1 (one step from the end)
        let arr = [1, 2, 5]
        arr.splice(-1, 0, 3, 4) // []
        arr // [1, 2, 3, 4, 5]
      `}</Code>

      <H>toSpliced()</H>

      <Code block jsx>{`
      const months = ["Jan", "Mar", "Apr", "May"];

      // Inserting an element at index 1
      const months2 = months.toSpliced(1, 0, "Feb");
      console.log(months2); // ["Jan", "Feb", "Mar", "Apr", "May"]

      // Deleting two elements starting from index 2
      const months3 = months2.toSpliced(2, 2);
      console.log(months3); // ["Jan", "Feb", "May"]

      // Replacing one element at index 1 with two new elements
      const months4 = months3.toSpliced(1, 1, "Feb", "Mar");
      console.log(months4); // ["Jan", "Feb", "Mar", "May"]

      // Original array is not modified
      console.log(months); // ["Jan", "Mar", "Apr", "May"]
      `}</Code>

      <H>slice()</H>

      <Code>{'arr.slice([beginIndex], [endIndex])'}</Code>

      <ul>
        <li>returns new array copying all items from beginIndex to endIndex (not including end)</li>
        <li>start & end can be negative, in that case position from end is assumed</li>
      </ul>

      <Code block jsx>{`
        let arr = ["t", "e", "s", "t"];
        arr.slice(1, 3); // ["e", "s"] (copy from 1 to 3) 
        arr // ["t", "e", "s", "t"]

        arr.slice(-2); // ["s", "t"] (copy from -2 to the end) 
        arr // ["t", "e", "s", "t"]

        let newArr = arr.slice(); // ["t", "e", "s", "t"] // created a copy
        arr // ["t", "e", "s", "t"]
      `}</Code>

      <H>concat()</H>

      <Code>{'arr.concat(arg1, arg2)'}</Code>

      <Code block jsx>{`
        const arr = [1, 2]
        const newArr = arr.concat([3, 4]) // [1, 2, 3, 4] 
        arr // [1, 2]

        arr.concat([3, 4], [5, 6]) // [1,2,3,4,5,6] 
        arr.concat([3, 4], 5, 6) // [1,2,3,4,5,6] // arr = [1, 2]
      `}</Code>

      <p>Make iterable concatable</p>

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

      <H>indexOf(), lastIndexOf()</H>

      <Code>{'arr.indexOf(item, [fromIndex])'}</Code>

      <Code block jsx>{`
        // looks for item starting from index from, and returns the index where it was found, otherwise -1.
        // same methods as for strings

        let arr = [1, 0, false, 1];

        arr.indexOf(0) // 1
        arr.indexOf(false) // 2
        arr.indexOf(null) // -1

        // same, but looks for from right to left
        arr.lastIndexOf(1) // 3
      `}</Code>

      <H>includes()</H>

      <Code>{'arr.includes(item, [fromIndex])'}</Code>

      <Code block jsx>{`
        //  looks for item starting from fromIndex, returns true if found
        arr.includes(1) // true

        // indexOf() vs includes()
        [NaN].indexOf(NaN) // -1 (should be 0, but === equality doesn't work for NaN)
        [NaN].includes(NaN) // true
      `}</Code>

      <H>reverse()</H>

      <p>MUTATES!</p>

      <Code block jsx>{`
      const items = [1, 2, 3];
      console.log(items); // [1, 2, 3]

      items.reverse();
      console.log(items); // [3, 2, 1]
      `}</Code>

      <H>toReversed()</H>

      <Code block jsx>{`
      const sequence = [1, 2, 3];
      sequence.toReversed(); // => [3, 2, 1]
      sequence; // => [1, 2, 3]
      `}</Code>

      <H>split()</H>

      <Code block jsx>{`
        let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);
        arr; // [Bilbo, Gandalf]
        "test".split('') // ["t", "e", "s", "t"]
      `}</Code>

      <H>join()</H>

      <Code block jsx>{`
        let arr = ['Bilbo', 'Gandalf', 'Nazgul'];
        let str = arr.join(';'); // glue the array into a string using ;
        str; // Bilbo;Gandalf;Nazgul
      `}</Code>

      <H>fill()</H>

      <p>MUTATES!</p>

      <Code>{'arr.fill(value, [startIndex], [endIndex])'}</Code>

      <Code block jsx>{`
        let arr = [1, 2, 3, 4];
        arr.fill(0, 2, 4); // [1, 2, 0, 0] // fill with 0 from position 2 until position 4
        arr // [1, 2, 0, 0]

        arr.fill(5, 1); // [1, 5, 5, 5] // fill with 5 from position 1
        arr.fill(6); // [6, 6, 6, 6] // fill all with 6
      `}</Code>

      <H>copyWithin()</H>

      <ul>
        <li><Code>{'arr.copyWithin(targetIndex, [startIndex], [endIndex])'}</Code></li>
        <li>copies part of an array to another location in the same array and returns it w/o modifying its length</li>
        <li>targetIndex - index where to copy. If negative - counted from the end</li>
        <li>startIndex - index start copying elements from. If negative - counted from the end. Default - 0</li>
        <li>endIndex - index end copying elements from. copyWithin() copies up to but not including end. If negative - counted from the end. Default = arr.length</li>
      </ul>

      <Code block jsx>{`
        let arr = ['a', 'b', 'c', 'd', 'e'];
        arr.copyWithin(0, 3, 4); // ["d", "b", "c", "d", "e"] // copy to index 0 the element at index 3
        arr // ["d", "b", "c", "d", "e"] 

        arr.copyWithin(1, 3); // ["d", "d", "e", "d", "e"] // copy to index 1 els from index 3 to the end
      `}</Code>

      <H>flat()</H>

      <ul>
        <li><Code>{'arr.flat([depth])'}</Code></li>
        <li>returns a new array with concatenated sub-array elements with specified depth.</li>
        <li>depth - The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.</li>
      </ul>

      <Code block jsx>{`
        let arr = [0, 1, 2, [3, 4]]
        arr.flat() // [0, 1, 2, 3, 4]
        arr // [0, 1, 2, [3, 4]] // not mutated

        let arr = [0, 1, 2, [[[3, 4]]]]
        arr.flat(2) // [0, 1, 2, [3, 4]]
        arr.flat() // [0, 1, 2, [[3, 4]]]

        [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]].flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      `}</Code>

      <H>map()</H>

      <ul>
        <li><Code>{'let result = arr.map(function(item, [index], [array]) {...}, [thisArg]);'}</Code></li>
        <li>method calls the function for each element of the array</li>
        <li>returns an array of function returns</li>
        <li>It is identical to a map() followed by a flat() of depth 1</li>
      </ul>

      <Code block jsx>{`
        let arr = ["Bilbo", "Gandalf", "Nazgul"]
        arr.map(item => item.length) // [5, 7, 6]
        arr // ["Bilbo", "Gandalf", "Nazgul"]
      `}</Code>

      <H>flatMap()</H>

      <ul>
        <li><Code>{'arr.flatMap(function callbackFn(currentValue, [index], [array]) {...}, [thisArg]) '}</Code></li>
        <li>method returns a new array formed by applying a given callback function to each element of the array</li>
        <li>Result is flattened by one level</li>
        <li>It is identical to a map() followed by a flat() of depth 1</li>
      </ul>

      <Code block jsx>{`
        var arr = [1, 2, 3, 4];
        arr.flatMap(x => [x, x * 2]); // [1, 2, 2, 4, 3, 6, 4, 8]
        arr // [1, 2, 3, 4]
      `}</Code>

      <H>sort()</H>

      <p>MUTATES!</p>

      <ul>
        <li>returns sorted modified array</li>
        <li><Code>{'sort(function compareFn(firstEl, secondEl) {...})'}</Code></li>
        <li>comparison function is required to return a positive number to say “greater” and a negative number to say “less”.</li>
      </ul>

      <Code block jsx>{`
        let arr = [ 1, 2, 15 ]
        arr.sort() // [1, 15, 2] // items are sorted as strings by default
        arr // 1, 15, 2

        function compareFn(firstEl, secondEl) {
          if (firstEl > secondEl) return 1; // if the first value is greater than the second
          if (firstEl == secondEl) return 0; // if values are equal
          if (firstEl < secondEl) return -1; // if the first value is less than the second
        }
        arr.sort(compareFn);
        arr // 1, 2, 15

        // shorter function
        let arr = [ 1, 2, 15 ]
        arr.sort(function(a, b) { return a - b })
        arr  // 1, 2, 15

        // or even shorter with an arrow fn
        [ 1, 2, 15 ].sort( (a, b) => a - b ); // [1, 2, 15]
        ['Österreich', 'Andorra', 'Vietnam'].sort(); // ["Andorra", "Vietnam", "Österreich"]
        ['Österreich', 'Andorra', 'Vietnam'].sort( (a, b) => a.localeCompare(b) ); // ["Andorra", "Österreich", "Vietnam"]
      `}</Code>

      <H>toSorted()</H>

      <Code block jsx>{`
      const outOfOrder = new Uint8Array([3, 1, 2]);
      outOfOrder.toSorted(); // => Uint8Array [1, 2, 3]
      outOfOrder; // => Uint8Array [3, 1, 2]
      `}</Code>

      <H>filter()</H>

      <ul>
        <li><Code>{'arr.filter(function(element, [index], [array]) {...}, [thisArg]) '}</Code></li>
        <li>returns a new array of all matching elements</li>
        <li>if 'true' item is pushed to results and the iteration continues</li>
        <li>returns empty array if nothing found</li>
      </ul>

      <Code block jsx>{`
        // returns array of the first two users
        const users = [{id: 1, name: "John"},{id: 2, name: "Pete"}, {id: 3, name: "Felix"}]
        let someUsers = users.filter(item => item.id < 3); 
        someUsers // [{id: 1, name: "John"},{id: 2, name: "Pete"}]
      `}</Code>

      <H>some()</H>

      <ul>
        <li><Code>{'arr.some(function(element, [index], [array]) {...}, [thisArg]) '}</Code></li>
        <li>method tests if one element in the array passes the test function</li>
        <li>returns true if it finds an el for which the function returns true, otherwise it returns false</li>
      </ul>

      <Code block jsx>{`
        const array = [1, 2, 3, 4, 5]
        const even = (el) => el % 2 === 0 // checks whether an element is even
        array.some(even) // true
      `}</Code>

      <H>every()</H>

      <ul>
        <li><Code>{'arr.every(function(element, [index], [array]) {...}, [thisArg]) '}</Code></li>
        <li>method tests whether all elements in the array pass the test function.</li>
        <li>returns true or false</li>
      </ul>

      <Code block jsx>{`
        const isBelowThreshold = (el) => el < 40;
        const arr = [1, 30, 39, 29, 10, 13];
        arr.every(isBelowThreshold); // true
      `}</Code>

      <H>find()</H>

      <ul>
        <li><Code>{'let result = arr.find(function(item, index, array) {}, thisArg)'}</Code></li>
        <li>returns index of the first element in the array that passes the test. Otherwise, -1.</li>
        <li>if fn returns TRUE, item is returned and iteration is stopped</li>
        <li>for falsy scenario returns undefined</li>
        <li>index, array, thisArg: optional arguments</li>
        <li>The find method looks for a single (first) element that makes the function return true.</li>
      </ul>

      <Code block jsx>{`
        let users = [
          {id: 1, name: "John"},
          {id: 2, name: "Pete"},
          {id: 3, name: "Mary"}
        ];

        let user = users.find(item => item.id == 1); // user = {id: 1, name: "John"}
        user.name; // John
        // item argument is used, other arguments of this function are rarely used
      `}</Code>

      <H>findIndex()</H>

      <ul>
        <li><Code>{'arr.findIndex(function(item, index, array) {...}, thisArg);'}</Code></li>
        <li>returns index of the first element in the array that passes the test. Otherwise, -1.</li>
      </ul>

      <Code block jsx>{`
        let index = users.findIndex(item => item.id == 3); // index = 2
      `}</Code>

      <H>findLast() & findLastIndex()</H>

      <Code block jsx>{`
      const arr = [1, 2, 3, 1, 2, 3, 1, 2]

      const three = arr.find(num => num === 3) // 3
      const threeIndex = arr.findIndex(num => num === 3) // 2

      const lastThree = arr.findLast(num => num === 3) // 3
      const lastThreeIndex = arr.findLastIndex(num => num === 3) // 5
      `}</Code>

      <H>reduce()</H>

      <ul>
        <li><Code>{'let value = arr.reduce(function(previousValue, currentValue, [currentIndex], [array]) {...}, [initial]);'}</Code></li>
        <li><code>previousValue</code> – result of the previous function call, equals initial the first time (if initial is provided)</li>
        <li><code>currentValue</code> – is the current array item</li>
        <li><code>[currentIndex]</code> – is its position</li>
        <li><code>[array]</code> – is the array</li>
        <li><code>[initial]</code> - A value to use as the first argument</li>
        <li>the result of the previous function call is passed to the next one as the first argument</li>
      </ul>

      <Code block jsx>{`
        [1, 2, 3, 4, 5].reduce((sum, item) => sum + item) // 15
        [1, 2, 3, 4, 5].reduce((sum, item) => sum + item, 0) // 15
        [1, 2, 3, 4, 5].reduce((sum, item) => sum + item, 10) // 25

        arr.reduceRight() // does the same, but goes from right to left
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
