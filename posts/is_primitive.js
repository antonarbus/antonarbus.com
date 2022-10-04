import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'isPrimitive()',
  date: '2022.08.13',
  tags: ['function', 'JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'Functions to check if a value is string, boolean, number, null, symbol, bigint.',
  body: (
    <>
      <H>isPrimitiveType function</H>

      <Code block jsx>{`
      const isBoolean = (variable) => typeof variable === 'boolean'
      `}</Code>

      <Code block jsx>{`
      const isString = (variable) => typeof variable === 'string'
      `}</Code>

      <Code block jsx>{`
      const isNumber = (variable) => typeof variable === 'number'
      `}</Code>

      <Code block jsx>{`
      const isUndefined = (variable) => typeof variable === 'undefined'
      `}</Code>

      <Code block jsx>{`
      // typeof null === 'object' due to historical reason
      const isNull = (variable) => variable === null
      `}</Code>

      <Code block jsx>{`
      const isSymbol = (variable) => typeof variable === 'symbol'
      `}</Code>

      <Code block jsx>{`
      const isBigint = (variable) => typeof variable === 'bigint'
      `}</Code>

      <H>Example</H>

      <Code block jsx>{`
      isBoolean(true) // true
      isString('str') // true
      isNumber(666) // true
      isUndefined(undefined) // true
      isSymbol(Symbol('foo')) // true
      isBigint(9007199254740991n) // true
      isNull(null) // true
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
