import { Code, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'vim',
  date: '2022.04.03',
  tags: ['tools'],
  desc: 'vim text editor',
  body: (
    <>
      <ul>
        <li><Code>vim <i>file name</i></Code> open file</li>
        <li><kbd>a</kbd> go into edit mode</li>
        <li><kbd>i</kbd> insert</li>
        <li><kbd>Esc</kbd> <kbd>:</kbd> <kbd>w</kbd> exit</li>
        <li><kbd>Esc</kbd> <kbd>:</kbd> <kbd>w</kbd> <kbd>q</kbd> <kbd>Enter</kbd>save & exit</li>
        <li><kbd>Esc</kbd> <kbd>:</kbd> <kbd>x</kbd> save & exit</li>
      </ul>
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
