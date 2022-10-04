import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'params & args',
  date: '2021.10.30',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'xxx',
  body: (
    <>
      <H>Parameter vs argument</H>

      <Code block jsx>{`
      const example = (parameter) => alert(parameter)
      example(argument)
      `}</Code>

      <H>Comma separated arguments</H>

      <p>The most common way to pass parameters to a function is to put them inside parenthesis separated by comma.</p>

      <Code block jsx>{`
        function mail(msg, to) {
          return '"' + msg + '" sent to "' + to + '"'
        }
        mail('Hello', 'John@mail.com') // "Hello" sent to "John@mail.com"
      `}</Code>

      <H>Default values inside function</H>

      <p>We can assign default values inside a function.</p>

      <Code block jsx>{`
        function mail(msg, to) {
          msg = msg || 'Hello'
          to = to || 'John@mail.com'
          return '"' + msg + '" sent to "' + to + '"'
        }
        mail() // "Hello" sent to "John@mail.com"
        mail('Bye') // "Bye" sent to "John@mail.com"
        mail('Bye', 'Kris@mail.com') // "Bye" sent to "Kris@mail.com"   
      `}</Code>

      <H>Default values in parenthesis</H>

      <p>Or we can assign default values right in parenthesis.</p>

      <Code block jsx>{`
      function mail(msg = 'Hello', to = 'John@mail.com') {
        return '"' + msg + '" sent to "' + to + '"'
      }
      `}</Code>

      <H>Parameters in array</H>

      <p>We can pass arguments by spreading array values.</p>

      <Code block jsx>{`
      const arr = ['Hello', 'John@mail.com']
      mail(...arr) // "Hello" sent to "John@mail.com"
      `}</Code>

      <H>Unlimited number of arguments</H>

      <p>More parameters than supposed can be passed. Function will take only first ones.</p>

      <Code block jsx>{`
        mail('Hi', 'John@mail.com', 1, 2, 3) // "Hi" sent to "John@mail.com"
      `}</Code>

      <H><code>arguments</code> object</H>

      <p>
        All arguments are accessed within function inside a special iterable{' '}
        <Code>arguments</Code> variable. In arrow function{' '}
        <Code>arguments</Code> variable doesn't exist.
      </p>

      <Code block jsx>{`
      function func() { return arguments }
      func(1, 2, 3) //  [Iterator]  0: 1, 1: 2, 2: 3

      const func = () =>  arguments
      func(1, 2, 3) // arguments is not defined
      `}</Code>

      <H>Arguments in object</H>

      <p>Pass arguments to a function separated by comma is ok, but we have to remember the sequence of arguments. Instead we can pass arguments in an object.</p>

      <Code block jsx>{`
        function mail(obj) {
          return '"' + obj.msg + '" sent to "' + obj.to + '"'
        }
        mail({ msg: 'Hello', to:'John@mail.com' }) // "Hello" sent to "John@mail.com"
        mail({ to:'John@mail.com', msg: 'Hello' }) // "Hello" sent to "John@mail.com"
      `}</Code>

      <H>Destructure object in place</H>

      <p>Object can be destructed.</p>

      <Code block jsx>{`
        function mail({ msg, to }) {
          return '"' + msg + '" sent to "' + to + '"'
        }
        mail({ msg: 'Hello', to:'John@mail.com' }) // "Hello" sent to "John@mail.com"
      `}</Code>

      <H>Object with default parameters</H>

      <p>And default values can be assigned.</p>

      <Code block jsx>{`
        function mail({ msg = 'Hello', to = 'John@mail.com' }) {
          return '"' + msg + '" sent to "' + to + '"'
        }
        mail({}) // "Hello" sent to "John@mail.com"
        mail({ msg: 'Bye' }) // "Bye" sent to "John@mail.com"
        mail() // Cannot read property 'msg' of undefined
      `}</Code>

      <p>Destructuring assumes that function has an argument. If we want all values by default, then we should specify an empty object.</p>

      <Code block jsx>{`
        function mail({ msg = 'Hello', to = 'John@mail.com' } = {}) {
          return '"' + msg + '" sent to "' + to + '"'
        }
        mail() // "Hello" sent to "John@mail.com"
      `}</Code>

      <p>But it looks bulky and there is a more <b>straight forward</b> approach.</p>

      <H>The best approach</H>

      <Code block jsx>{`
        function mail(args){
          let defaults = { msg: 'Hello', to: 'John@mail.com' };
          let params = {...defaults, ...args};  
          const { msg, to } = params;
          return '"' + msg + '" sent to "' + to + '"'
        }
        mail({}) // "Hello" sent to "John@mail.com"
        mail({ msg: 'Bye' }) // "Bye" sent to "John@mail.com"
        mail() // "Hello" sent to "John@mail.com"
      `}</Code>

      <p>Or even shorter.</p>

      <Code block jsx>{`
      function mail(args){
        const { msg, to } = { msg: 'Hello', to: 'John@mail.com', ...args};
        return '"' + msg + '" sent to "' + to + '"'
      }
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
