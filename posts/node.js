import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'node',
  date: '2022.04.24',
  tags: ['node'],
  desc: 'node js',
  body: (
    <>
      <H>Commands</H>

      <ul>
        <li><Code bash>node -v</Code> node version</li>
      </ul>

      <H>Exports & require</H>

      <Hs>module.exports = obj</Hs>

      <Code block js>{`
      const gtr = {
        brand: 'nissan',
        model: 'gtr'
      }
      module.exports = gtr
      `}</Code>

      <Code block js>{`
        require('./car')
      `}</Code>

      <Hs>exports.prop = obj</Hs>

      <Code block js>{`
      const fiesta = {
        brand: 'ford',
        model: 'fiesta'
      }

      const golf = {
        brand: 'vw',
        model: 'golf'
      }

      exports.fiesta = fiesta
      exports.golf = golf

      // same as
      // module.exports = { fiesta, golf }
      `}</Code>

      <Code block js>{`
      require('./cars')
      require('./cars').fiesta
      require('./cars').golf
      `}</Code>

      <Hs>{'module.exports = { obj1, obj2 }'}</Hs>

      <Code block js>{`
      const model3 = {
        brand: 'tesla',
        model: 'model3'
      }

      const m5 = {
        brand: 'bmw',
        model: 'm5'
      }

      module.exports = { model3, m5 }
      `}</Code>

      <Code block js>{`
      require('./cars')
      require('./cars').m5
      require('./cars').model3
      `}</Code>

      <H>Pass args via terminal to a script</H>

      <ul>
        <li>we may trigger a script like <code>node server.js</code></li>
        <li>but how to pass arguments into that</li>
        <li>we can do <code>node server.js one two=three four</code></li>
        <li>ad get args with <Code>process.argv</Code></li>
      </ul>

      <Code block bash>{`
        // $ node server.js one two=three four

        const args = process.argv
        console.log(args)

        // ['node', '/home/server.js', 'one', 'two=three', 'four']
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
