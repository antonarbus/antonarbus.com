'use client'

import { Code, H, Hs, Lnk, React, jsxToStr } from '/components/post/reExport'

function Component({ initCss }) {
  const [cssState, setCssState] = React.useState(initCss)
  const updateCss = (e) => setCssState(e.target.value)
  const textAreaStyle = { padding: '5px', width: '100%', height: '150px' }

  return (
    <>
      <textarea style={textAreaStyle} value={cssState} onChange={updateCss} />

      <div className="outer">
        <div className="inner">Inner text</div>
      </div>

      {/* CSS nesting lets one editable block style both the outer & the nested inner element */}
      <style jsx>{`
        .outer {
          all: initial;
          ${cssState}
        }
      `}</style>
    </>
  )
}

const postObj = {
  title: 'X & Y position in CSS',
  date: '2022.02.12',
  tags: ['css', 'basics'],
  desc: 'Horizontal & vertical position in CSS',
  body: (
    <>
      <p>
        Before reading check <Lnk path="/post/display-&-float-property">notes</Lnk> on{' '}
        <Code>display</Code> property.
      </p>

      <H>Inline element inside block</H>

      <Hs>Default</Hs>

      <ul>
        <li>Note that block element takes all possible width</li>
        <li>Block element fits the children content</li>
      </ul>

      <Component
        initCss={`display: block; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  display: inline;\n  background: lightyellow;\n}`}
      />

      <Hs>Margin & padding</Hs>

      <ul>
        <li>All margins work for block element</li>
        <li>Only side margins work for inline element</li>
        <li>All paddings work for all elements</li>
      </ul>

      <Component
        initCss={`display: block; \nmargin: 30px; \npadding: 10px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  display: inline;\n  margin: 50px;\n  padding: 16px;\n  border: 1px solid black;\n  background: lightyellow;\n}`}
      />

      <Hs>Height & width</Hs>

      <ul>
        <li>Height & width can be applied to block element</li>
        <li>Height & width do not have any effect on inline element</li>
      </ul>

      <Component
        initCss={`display: block; \nwidth: 100px; \nheight: 100px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  display: inline;\n  width: 500px;\n  height: 500px;\n  background: lightyellow;\n}`}
      />

      <H>Horizontal position of inline element</H>

      <p>
        Set <Code>text-align</Code> property of parent block element
      </p>

      <Component
        initCss={`display: block; \ntext-align: left; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  display: inline;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: block; \ntext-align: center; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  display: inline;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: block; \ntext-align: right; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  display: inline;\n  background: lightyellow;\n}`}
      />

      <H>Vertical position of inline elements relative to its normal position</H>

      <Component
        initCss={`display: block; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  display: inline;\n  vertical-align: -5px;\n  background: lightyellow;\n}`}
      />

      <H>Vertical position with align-content</H>

      <Component
        initCss={`display: block; \nwidth: 300px; \nheight: 200px; \nbackground: lightblue; \nalign-content: start;\n\n.inner {\n  all: unset;\n  display: inline;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: block; \nwidth: 300px; \nheight: 200px; \nbackground: lightblue; \nalign-content: center;\n\n.inner {\n  all: unset;\n  display: inline;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: block; \nwidth: 300px; \nheight: 200px; \nbackground: lightblue; \nalign-content: end;\n\n.inner {\n  all: unset;\n  display: inline;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: block; \nwidth: 300px; \nheight: 200px; \nbackground: lightblue; \nalign-content: stretch;\n\n.inner {\n  all: unset;\n  display: block;\n  background: lightyellow;\n}`}
      />

      <H>Vertical centering of inline element with line-height</H>

      <p>
        Make <Code>height</Code> & <Code>line-height</Code> properties of parent block element the
        same.
      </p>

      <p>Child should be one line only.</p>

      <Component
        initCss={`display: block; \nwidth: 200px; \nheight: 50px; \nline-height: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  display: inline;\n  background: lightyellow;\n}`}
      />

      <H>Horizontal position of block element</H>

      <ul>
        <li>Apply left & right margins</li>
        <li>
          {' '}
          To center the block use <Code>margin: 0 auto</Code>{' '}
        </li>
        <li>It will be visible only if block el has a fixed width</li>
      </ul>

      <Component
        initCss={`display: block; \nmargin-right: auto; \ntext-align: center; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  display: inline;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: block; \nmargin-left: auto; \nmargin-right: auto; \ntext-align: center; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  display: inline;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: block; \nmargin-left: auto; \ntext-align: center; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  display: inline;\n  background: lightyellow;\n}`}
      />

      <H>Position of any element within relative parent with known height</H>

      <p>
        Parent's <Code>height</Code> should be set to have any effect on vertical positioning.
      </p>

      <Component
        initCss={`display: block; \nposition: relative; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  display: inline;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background: lightyellow;\n}`}
      />

      <H>
        Position <Code>display: table-cell</Code> within <Code>display: table</Code>{' '}
      </H>

      <p>
        <Code>table-cell</Code> is stretched within <Code>table</Code>
      </p>

      <Component
        initCss={`display: table; \nwidth: 200px; \nheight: 50px; \npadding: 10px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  display: table-cell;\n  text-align: left;\n  vertical-align: top;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: table; \nwidth: 200px; \nheight: 50px; \npadding: 10px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  display: table-cell;\n  text-align: center;\n  vertical-align: middle;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: table; \nwidth: 200px; \nheight: 50px; \npadding: 10px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  display: table-cell;\n  text-align: right;\n  vertical-align: bottom;\n  background: lightyellow;\n}`}
      />

      <H>Position with flex</H>

      <Component
        initCss={`display: flex; \njustify-content: flex-start; \nalign-items: flex-start; \nwidth: 200px; \nheight: 50px; \npadding: 10px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: flex; \njustify-content: center; \nalign-items: center; \nwidth: 200px; \nheight: 50px; \npadding: 10px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: flex; \njustify-content: flex-end; \nalign-items: flex-end; \nwidth: 200px; \nheight: 50px; \npadding: 10px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: flex; \njustify-content: center; \nalign-items: stretch; \nwidth: 200px; \nheight: 50px; \npadding: 10px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n  width: 80%;\n}`}
      />

      <H>Position with grid</H>

      <Component
        initCss={`display: grid; \nplace-items: start; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: grid; \nplace-items: center; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: grid; \nplace-items: end; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: grid; \nplace-items: start start; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: grid; \nplace-items: start center; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: grid; \nplace-items: start end; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: grid; \nplace-items: normal start; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: grid; \nplace-items: normal center; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: grid; \nplace-items: normal end; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: grid; \nplace-items: start normal; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: grid; \nplace-items: center normal; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: grid; \nplace-items: end normal; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <Component
        initCss={`display: grid; \nplace-items: stretch legacy; \nheight: 50px; \nbackground: lightblue;\n\n.inner {\n  all: unset;\n  background: lightyellow;\n}`}
      />

      <H>Horizontal position with float</H>

      <Hs>Default</Hs>

      <div>
        {Array(40)
          .fill('')
          .map((el) => 'word ')}
        <img src="/imgs/va/img20.jpg" height="150" />
        word
        <img src="/imgs/va/img21.jpg" height="150" />
        {Array(20)
          .fill('')
          .map((el) => 'word ')}
      </div>

      <Code block>{`
      <div>
        {Array(40).fill('').map(el => 'word ')}
        <img src='/imgs/va/img20.jpg' height='150' style={{ float: 'right' }}/>
        word
        <img src='/imgs/va/img21.jpg' height='150' style={{ float: 'left' }}/>
        {Array(30).fill('').map(el => 'word ')}
        <div style={{ border: '1px solid red' }}>new line</div>
      </div>
      `}</Code>

      <Hs>With float</Hs>

      <div>
        {Array(40)
          .fill('')
          .map((el) => 'word ')}
        <img src="/imgs/va/img20.jpg" height="150" style={{ float: 'right' }} />
        word
        <img src="/imgs/va/img21.jpg" height="150" style={{ float: 'left' }} />
        {Array(30)
          .fill('')
          .map((el) => 'word ')}
        <div style={{ border: '1px solid red' }}>new line</div>
      </div>

      <Code block>{`
      <div>
        {Array(40).fill('').map(el => 'word ')}
        <img src='/imgs/va/img20.jpg' height='150' style={{ float: 'right' }}/>
        word
        <img src='/imgs/va/img21.jpg' height='150' style={{ float: 'left' }}/>
        {Array(30).fill('').map(el => 'word ')}
        <div style={{ border: '1px solid red' }}>new line</div>
      </div>
      `}</Code>

      <Hs>
        With float & <Code css>clear: both</Code>{' '}
      </Hs>

      <div>
        {Array(40)
          .fill('')
          .map((el) => 'word ')}
        <img src="/imgs/va/img20.jpg" height="150" style={{ float: 'right' }} />
        word
        <img src="/imgs/va/img21.jpg" height="150" style={{ float: 'left' }} />
        {Array(30)
          .fill('')
          .map((el) => 'word ')}
        <div style={{ border: '1px solid red', clear: 'both' }}>
          new line with <Code>clear: both</Code>
        </div>
      </div>

      <Code block>{`
      <div>
        {Array(40).fill('').map(el => 'word ')}
        <img src='/imgs/va/img20.jpg' height='150' style={{ float: 'right' }}/>
        word
        <img src='/imgs/va/img21.jpg' height='150' style={{ float: 'left' }}/>
        {Array(30).fill('').map(el => 'word ')}
        <div style={{ border: '1px solid red', clear: 'both' }}>new line with <Code>clear: both</Code></div>
      </div>
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
