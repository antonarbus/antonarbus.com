import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'json',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/json.jpg',
  desc: 'JSON in JavaScript',
  body: (
    <>
      <H>Basics</H>

      <ul>
        <li>JSON is a string format <code>{"'{\"name\": \"Juha\"}'"}</code></li>
        <li>The data is only JSON when it is in a string format</li>
        <li>Inside the JSON string there is a <i>JSON object literal</i> <code>{'{"name": "Juha"}'}</code></li>
        <li>JS object can be created from <i>JSON object literal</i> <code>{'const person = {"name": "Juha"}'}</code></li>
        <li>JSON string is named also a "JSON-encoded" OR "serialized" OR "stringified" OR "marshalled" object</li>
        <li>Strings use double quotes. No single quotes or backticks in JSON. 'John' becomes "John"</li>
        <li>Object property names are double-quoted. So <code>age:30</code> becomes <code>"age":30</code>.</li>
        <li>JSON is needed to transmit JS objects via http, as http does not work with JS objects, but works with text</li>
      </ul>

      <H>JSON.stringify()</H>

      <p><Code>JSON.stringify()</Code> converts objects into JSON</p>

      <Code block jsx>{`
      JSON.stringify(1) // "1"
      JSON.stringify('test') // "test"
      JSON.stringify(true) // "true"
      JSON.stringify([1, 2, 3]) // "[1,2,3]"
      `}</Code>

      <Code block jsx>{`
      let student = {
        name: 'John',
        age: 30,
        isAdmin: false,
        courses: ['HTML', 'css', 'JavaScript'],
        wife: null
      };
  
      JSON.stringify(student);
      // "{"name":"John","age":30,"isAdmin":false,"courses":["html","css","js"],"wife":null}"
      `}</Code>

      <Hs>Ignores methods, symbolics, properties with<code>undefined</code></Hs>

      <Code block jsx>{`
      let user = {
        sayHi() { alert("Hello") }, // ignored
        [Symbol("id")]: 123, // ignored
        something: undefined // ignored
      }
      JSON.stringify(user) // "{}" (empty object)
      `}</Code>

      <Hs>Nested objects are supported</Hs>

      <Code block jsx>{`
      let meetup = {
        title: "Conference",
        room: {
          number: 23,
          participants: ["john", "ann"]
        }
      }
      JSON.stringify(meetup) // "{"title":"Conference", "room":{"number":23,"participants":["john","ann"]},}"
      `}</Code>

      <Hs>No circular references</Hs>

      <Code block jsx>{`
      let room = { number: 23 }
      let meetup = { title: "Conference", participants: ["john", "ann"] }
      meetup.place = room; 
      room.occupiedBy = meetup; 
      JSON.stringify(meetup); // Error: Converting circular structure to JSON
      `}</Code>

      <Hs>Optional parameters</Hs>

      <ul>
        <li><Code>{'JSON.stringify(value, [replacerFunction(key, value) {} || array, space])'}</Code></li>
        <li>value - A value to encode</li>
        <li>array of properties to encode OR a mapping function function(key, value). If we pass an array of properties to it, only these properties will be encoded.</li>
        <li>space - amount of space to use for formatting</li>
      </ul>

      <Code block jsx>{`
      let room = {number: 23};
        let meetup = { title: "Conference", participants: [{name: "John"}, {name: "Alice"}], place: room};
        room.occupiedBy = meetup; // room references meetup
        JSON.stringify(meetup, ['title', 'participants']) // {"title":"Conference","participants":[{},{}]}
        JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']) // "{"title":"Conference","participants":[{"name":"John"},{"name":"Alice"}],"place":{"number":23}}"
      `}</Code>

      <Code block jsx>{`
      let room = {number: 23};
        let meetup = { title: "Conference", participants: [{name: "John"}, {name: "Alice"}], place: room};
        room.occupiedBy = meetup; // room references meetup
        JSON.stringify(meetup, ['title', 'participants']) // {"title":"Conference","participants":[{},{}]}
        JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']) // "{"title":"Conference","participants":[{"name":"John"},{"name":"Alice"}],"place":{"number":23}}"
      `}</Code>

      <Code>{'function replacerFunction(key, value) {...}'}</Code>
      <ul>
        <li>return a value OR replaced value</li>
        <li>return undefined to exclude property / value </li>
        <li>value of "this" inside replacer is the object that contains the current property</li>
        <li>The first call is special</li>
        <li>the first (key, value) pair has an empty key, and the value is the target object as a whole</li>
      </ul>

      <Code block jsx>{`
      var foo = {foundation: 'Mozilla', model: 'box', week: 45, transport: 'car', month: 7}
        function replacer(key, value) {
          // Filtering out properties
          if (typeof value === 'string') {
            return undefined;
          }
          return value;
        }
        JSON.stringify(foo, replacer) // "{\\"week\\":45,\\"month\\":7}"
      `}</Code>

      <Hs><code>Space</code> used for nice - output purposes</Hs>

      <Code block jsx>{`
      let user = {name: "John", age: 25, roles: { isAdmin: false, isEditor: true }}
      JSON.stringify(user, null, 4)

      "{
        "name": "John",
        "age": 25,
        "roles": {
            "isAdmin": false,
            "isEditor": true
        }
      }"
      `}</Code>

      <H>JSON.parse()</H>

      <Code block jsx>{`
      let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';
      JSON.parse(userData); // {name: "John", age: 35, isAdmin: false, friends: Array(4)}
      `}</Code>

      <Hs>Incorrect JSON</Hs>

      <ul>
        <li>objects and arrays can be included, but they must obey the same JSON format</li>
        <li>comments </li>
        <li>trailing commas are not allowed</li>
        <li>single quotes are not allowed</li>
      </ul>

      <Code block jsx>{`
      let json = \`{
        name: "John",                     // mistake: property name w/o quotes
        "surname": 'Smith',               // mistake: single quotes in value (must be double)
        'isAdmin': false                  // mistake: single quotes in key (must be double)
        "birthday": new Date(2000, 2, 3), // mistake: no "new" is allowed, only bare values
        "friends": [0,1,2,3]              // here all fine
      }\`;
      `}</Code>

      <Hs>Reviver function</Hs>

      <ul>
        <li><Code>{'JSON.parse(text, function reviver(key, value) {})'}</Code></li>
        <li>returns a value OR replaced value</li>
        <li>returns undefined to exclude property / value </li>
        <li>value of "this" inside replacer is the object that contains the current property</li>
        <li>The first call is special. </li>
        <li>the first (key, value) pair has an empty key, and the value is the target object as a whole</li>
      </ul>

      <Code block jsx>{`
      let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
      let meeting = JSON.parse(str);
      meeting.date.getDate(); // Error! because date value is not a Date object but the string

      meeting= JSON.parse(str, function(key, value) {
        if (key == 'date') return new Date(value);
        return value;
      });
      meeting.date.getDate() //30 // works!
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
