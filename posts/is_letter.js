import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'isLetter()',
  date: '2023.05.29',
  tags: ['function', 'JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'Function to check if string is the letter',
  body: (
    <>
      <H>isLetter function</H>

      <ul>
        <li>Cool trick how to check if the string is a letter and not a space or punctuation</li>
        <li>Lower and upper cases for letters are different strings</li>
        <li>But for rest of characters there is no effect, it is the same string</li>
      </ul>

      <Code block jsx>{`
      function isLetter(char) {
        if (char.toLowerCase() !== char.toUpperCase()) return true
        return false
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
