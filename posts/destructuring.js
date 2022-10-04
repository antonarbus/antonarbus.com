import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'destructuring',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/destructuring.png',
  desc: 'Destructuring in JavaScript',
  body: (
    <>
      <p>Destructuring assignment is a syntax that allows us to “unpack” arrays or objects into variables</p>

      <H>Array destructuring</H>

      <Code block jsx>{`
            let arr = ["John", "Smith"]
            let [firstName, surname] = arr // firstName = "John", surname = "Smith"
            let [firstName, surname] = "John Smith".split(' ') // firstName = "John", surname = "Smith"
            let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"] // title = "Consul"
            let [one, two, three] = [1, 2, 3]  // one = 1, two = 2, three = 3
            let user = {} 
            [user.name, user.surname] = ["John", "Smith"] // user.name = "John", user.surname = "Smith"
            let [one, two, three] = new Set([1, 2, 3]) // works with any iterable
            let [a, b, c] = "abc" // a = "a", b = "b", c = "c" // works with any iterable
      `}</Code>

      <Hs>Looping with <code>entries()</code></Hs>

      <Code block jsx>{`
            let user = {
              name: "John",
              age: 30
            };

            for (let [key, value] of Object.entries(user)) {
              alert(\`\${key}:\${value}\`); // name:John, then age:30
            }
      `}</Code>

      <Hs> Swap variables trick</Hs>

      <Code block jsx>{`
            let guest = "Jane"; let admin = "Pete";
            [guest, admin] = [admin, guest]; // guest = "Pete", admin = "Jane"
      `}</Code>

      <Hs> Rest <code>...</code></Hs>

      <Code block jsx>{`
            let [num1, num2] = [1, 2, 3, 4] // num1 = 1, num2 = 2
            let [num1, num2, ...rest] = [1, 2, 3, 4] // rest[0] = 3, rest[1] = 4, rest.length = 2
            let [num1, num2, ...arr] = [1, 2, 3, 4] // arr[0] = 3, arr[1] = 4, arr.length = 2
            let [num1, num2] = [1] // num1 = 1, num2 = undefined
            let [num1 = 1, num2 = 2] = [666] // num1 = 666, num2 = 2
            let [name = prompt('name?'), surname = prompt('surname?')] = ['John'] // John (from array), whatever from prompt // prompt will run only for the missing value (surname)
      `}</Code>

      <H>Object destructuring</H>

      <Code block jsx>{`
            let options = {title: "Menu",  width: 100,  height: 200}

            let {title, width, height} = options // title = "Menu", width = 100, height = 200
            let {height, width, title} = options // same // order does not matter
            let {width: w, height: h, title} = options // title = "Menu", w = 100, h = 200
            let {title} = options // title = "Menu"
            let {title, ...rest} = options // now title="Menu", rest={height: 200, width: 100}, rest.height = 200, rest.width = 100
      `}</Code>

      <Hs> Default values</Hs>

      <Code block jsx>{`
            let options = {title: "Menu"}
            let {width = 100, height = 200, title} = options // title = "Menu", width = 100, height = 200
            let {width: w = 100, height: h = 200, title} = options;
            let {width = prompt("width?"), title = prompt("title?")} = options // values can be any expressions or even function calls
      `}</Code>

      <Hs> Rest <code>...</code></Hs>

      <Code block jsx>{`
            let options = {title: "Menu", height: 200, width: 100}
            let {title, ...rest} = options; // title="Menu", rest={height: 200, width: 100}
      `}</Code>

      <Hs> <code>let</code> in destructuring</Hs>

      <Code block jsx>{`
            let {title, width, height} = {title: "Menu", width: 200, height: 100}; // WORKS
            let title, width, height;

            {title, width, height} = {title: "Menu", width: 200, height: 100}; // ERROR in this line
            
            // "{}" are treated as a code block in the main code flow (not inside another expression)
            ({title, width, height} = {title: "Menu", width: 200, height: 100}) // WORKS
      `}</Code>

      <Hs> Nested destructuring</Hs>

      <Code block jsx>{`
            let options = {
              size: { width: 100, height: 200 },
              items: ["Cake", "Donut"],
              extra: true
            }

            // The pattern has the same structure to extract values
            let {
              size: { width, height },
              items: [item1, item2], // assign items here
              title = "Menu" // not present in the object (default value is used)
            } = options;

            title, width, height, item1, item2 // Menu 100 200 Cake Donut
      `}</Code>

      <Hs> Smart function parameters</Hs>

      <Code block jsx>{`
            function showMenu({
              title = "Untitled", 
              width = 200, 
              height = 100, 
              items = []
            } = {}) {
              alert(\`\${title} \${width} \${height} \${items}\`);
            }

            let options = {
              title: "My menu",
              height: 100,
              items: ["Item1", "Item2"]
            };

            showMenu(options); // My menu 200 100 Item1,Item2
            showMenu(); // Untitled 200 100 
      `}</Code>

      <Hs> console.log()</Hs>

      <Code block jsx>{`
            console.log('hello') // 'hello'
            let { log } = console
            log('hello') // 'hello'
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
