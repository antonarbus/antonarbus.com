import { Code, H, jsxToStr } from '/components/post/reExport'

// #region idea
function sum(params) {
  try {
    return params.numbers.a + params.numbers.b
  } catch (error) {
    console.warn(error)
    return 'no value for you'
  }
}

// console.log(sum({ numbers: { a: 1, b: 2 } })) // 3
// console.log(sum({ a: 1, b: 2 })) // no value for you
// #endregion

// #region Wrapper
const getValueOrDefault = (getter, defaultValue) => {
  try {
    return getter()
  } catch (error) {
    console.warn(error)
    return defaultValue
  }
}

function substract(params) {
  return params.numbers.a - params.numbers.b
}

// console.log(getValueOrDefault(() => substract({ numbers: { a: 1, b: 2 } }), 'no value for you')) // -1
// console.log(getValueOrDefault(() => substract({ a: 1, b: 2 }), 'no value for you')) // no value for you
// #endregion

const postObj = {
  title: 'default value',
  date: '2022.06.09',
  tags: ['JavaScript', 'function'],
  imgUrl: 'https://antonarbus.com/imgs/error.jpg',
  desc: 'function which returns default',
  body: (
    <>
      <ul>
        <li>Brilliant way to check errors and edge cases in function without really checking at all.</li>
        <li>We just wrap the function into <code>try...catch</code> block and return default value from <code>catch</code></li>
        <li>If function already exists just put it into wrapper</li>
      </ul>

      <H>Example</H>

      <Code block jsx>{`
      function sum(params) {
        try {
          return params.numbers.a + params.numbers.b
        } catch (error) {
          console.log(error)
          return 'no value for you'
        }
      }

      sum({ numbers: { a: 1, b: 2 } }) // 3
      sum({ a: 1, b: 2 }) // no value for you
      `}</Code>

      <H><code>getValueOrDefault</code> wrapper</H>

      <Code block jsx>{`
      const getValueOrDefault = (getter, defaultValue) => {
        try {
          return getter()
        } catch (error) {
          console.log(error)
          return defaultValue
        }
      }

      function substract(params) {
        return params.numbers.a - params.numbers.b
      }

      getValueOrDefault(() => substract({ numbers: { a: 1, b: 2 } }), 'no value for you') // -1
      getValueOrDefault(() => substract({ a: 1, b: 2 }), 'no value for you') // no value for you
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
