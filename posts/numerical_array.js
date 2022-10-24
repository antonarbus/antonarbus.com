import { Code, H, jsxToStr } from '/components/post/reExport'

const getNumericalArray = (qty = 10) => [...Array(qty).keys()]

const postObj = {
  title: 'numerical array',
  date: '2022.10.23',
  tags: ['react', 'JavaScript', 'function'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'create array dynamically',
  body: (
    <>
      <H>Create array with n elements</H>

      <ul>
        <li>In react we may need to create list of items</li>
        <li>usually we do it by mapping over an array</li>
        <li>if we do not have such an array, we need to make it dynamically</li>
      </ul>

      <Code block jsx>{`
      const getNumericalArray = (qty = 10) => [...Array(qty).keys()]

      const arr1 = getNumericalArray() // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      const arr1 = getNumericalArray(5) // [0, 1, 2, 3, 4]
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
