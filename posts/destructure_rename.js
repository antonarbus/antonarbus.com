import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'destructure and rename',
  date: '2022.12.21',
  tags: ['JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'Destructure and rename',
  body: (
    <>
      <H>Destructure and rename</H>

      <Code block jsx>{`
      const bio = {
        firstName: 'Bruce',
        lastName: 'Lee',
      }

      const {firstName: first, lastName: last} = bio
      console.log(first, last) // Bruce Lee
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
