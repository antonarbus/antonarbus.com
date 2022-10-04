import { Code, LazyImg, useState, jsxToStr } from '/components/post/reExport'

function Component() {
  const [state, setState] = useState('')
  return (
    <>
      <button onClick={() => setState(`${state} + some text`)}>Add text</button>
      <div>Text{state}</div>
    </>
  )
}

const postObj = {
  title: 'render in dev tools',
  date: '2022.05.05',
  tags: ['tools'],
  imgUrl: 'https://antonarbus.com/imgs/devtools.png',
  desc: 'render splashes in chrome dev tools',
  body: (
    <>
      <p>In chrome browser's dev tools we can observe render splashes.</p>

      <p>To enable it press <kbd>F12</kbd> - <kbd>Customize</kbd> - <kbd>More tools</kbd> - <kbd>Rendering</kbd> - tick <kbd>Paint flashing</kbd></p>

      <LazyImg path="/imgs/domRender/menu.png" />

      <Code block jsx>{`
      function Component() {
        const [state, setState] = useState('');
        return (
          <>
            <button onClick={() => setState(state + ' + some text')}>Add text</button>
            <br /><br />
            <div>Text{state}</div>
          </>
        )
      }
      `}</Code>

      <p>By button pressing we see how text line is highlighted.</p>

      <LazyImg path="/imgs/domRender/text splash.png" />

      <p>If we click until a new line is added the whole window is splashed.</p>

      <p>Browser has to render the complete page and recalculate height and position of elements to add a new line.</p>

      <LazyImg path="/imgs/domRender/page splash.png" />

      <Component />

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
