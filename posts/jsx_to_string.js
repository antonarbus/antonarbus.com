import { Code, LazyImg, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'jsx to string',
  date: '2021.10.08',
  tags: ['react', 'helper', 'function'],
  desc: 'function to convert jsx into string',
  body: (
    <>
      <p>We can not use <Code inline>el.innerText</Code> to retrieve text from JSX because it is not an HTML element.</p>
      <p>Let's put a simple JSX in the dev tool's console{' '} <Code inline>{'console.dir(<>Hello <strong>Mike</strong></>)'}</Code></p>
      <LazyImg src="/imgs/jsxToString/jsxToString.png"></LazyImg>
      <p>We got the nested object with <Code inline>children</Code> in <Code inline>props</Code>.</p>
      <p>Let's recursively go through it and take all the text out.</p>
      <Code block>{`
      function jsxToStr(el) {
        if (!el) return ''
        if (typeof el === 'string') return el
        const children = el.props && el.props.children
        if (children instanceof Array) { return children.map(jsxToStr).join('') }
        return jsxToStr(children)
      }
      jsxToStr(<>Hello <strong>Mike</strong></>) // 'Hello Mike'
      `}</Code>
      <p>Note that we get text from the static JSX, but not from the component function result after JSX call.</p>
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
