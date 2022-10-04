import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'hasProperty()',
  date: '2022.08.13',
  tags: ['function', 'JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'Function to check if an object has a property.',
  body: (
    <>
      <H>hasProperty function</H>

      <Code block jsx>{`
      const hasProperty = (object, property) => Object.hasOwn(object, property)
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
