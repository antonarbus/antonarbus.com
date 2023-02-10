import { Code, H, Hs, Lnk, React, jsxToStr } from '/components/post/reExport'

function Component({ initOuterCss, initInnerCss }) {
  const [outerStyleState, setOuterStyleState] = React.useState(initOuterCss)
  const [innerStyleState, setInnerStyleState] = React.useState(initInnerCss)
  const updateOuterStyles = e => setOuterStyleState(e.target.value)
  const updateInnerStyles = e => setInnerStyleState(e.target.value)
  const textAreaStyle = { padding: '5px', width: '100%', height: '120px' }
  const containerStyle = { display: 'inline-block', width: '50%' }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div style={containerStyle}>
          <div>Outer element</div>
          <textarea style={textAreaStyle} value={outerStyleState} onChange={updateOuterStyles} />
        </div>
        <div style={containerStyle}>
          <div>Inner element</div>
          <textarea style={textAreaStyle} value={innerStyleState} onChange={updateInnerStyles} />
        </div>
      </div>

      <div className='outer'>
        <div className='inner'>Inner text</div>
      </div>

      <style jsx>{`
        .outer { 
          all: initial; 
          ${outerStyleState}
        }
        .inner { 
          all: unset; 
          ${innerStyleState} 
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
      <p>Before reading check <Lnk path="/post/display-&-float-property">notes</Lnk> on <Code>display</Code> property.</p>

      <H>Inline element inside block</H>

      <Hs>Default</Hs>

      <ul>
        <li>Note that block element takes all possible width</li>
        <li>Block element fits the children content</li>
      </ul>

      <Component
        initOuterCss={'display: block; \nbackground: lightblue;'}
        initInnerCss={'display: inline; \nbackground: lightyellow;'}
      />

      <Hs>Margin & padding</Hs>

      <ul>
        <li>All margins work for block element</li>
        <li>Only side margins work for inline element</li>
        <li>All paddings work for all elements</li>
      </ul>

      <Component
        initOuterCss={'display: block; \nmargin: 30px; \npadding: 10px; \nbackground: lightblue;'}
        initInnerCss={ 'display: inline; \nmargin: 50px; \npadding: 16px; \nborder: 1px solid black; \nbackground: lightyellow;' }
      />

      <Hs>Height & width</Hs>

      <ul>
        <li>Height & width can be applied to block element</li>
        <li>Height & width do not have any effect on inline element</li>
      </ul>

      <Component
        initOuterCss={'display: block; \nwidth: 100px; \nheight: 100px; \nbackground: lightblue;'}
        initInnerCss={ 'display: inline; \nwidth: 500px; \nheight: 500px; \nbackground: lightyellow;' }
      />

      <H>Horizontal position of inline element</H>

      <p>Set <Code>text-align</Code> property of parent block element</p>

      <Component
        initOuterCss={ 'display: block; \ntext-align: left; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={'display: inline; \nbackground: lightyellow;'}
      />

      <Component
        initOuterCss={ 'display: block; \ntext-align: center; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={'display: inline; \nbackground: lightyellow;'}
      />

      <Component
        initOuterCss={ 'display: block; \ntext-align: right; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={'display: inline; \nbackground: lightyellow;'}
      />

      <H>Vertical position of inline elements relative to its normal position</H>

      <Component
        initOuterCss={'display: block; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;'}
        initInnerCss={'display: inline;\nvertical-align: -5px; \nbackground: lightyellow;'}
      />
      <H>Vertical centering of inline element</H>

      <p>Make <Code>height</Code> & <Code>line-height</Code> properties of parent block element the same.</p>

      <p>Child should be one line only.</p>

      <Component
        initOuterCss={ 'display: block; \nwidth: 200px; \nheight: 50px; \nline-height: 50px; \nbackground: lightblue;' }
        initInnerCss={'display: inline; \nbackground: lightyellow;'}
      />

      <H>Horizontal position of block element</H>

      <ul>
        <li>Apply left & right margins</li>
        <li> To center the block use <Code>margin: 0 auto</Code> </li>
        <li>It will be visible only if block el has a fixed width</li>
      </ul>

      <Component
        initOuterCss={ 'display: block; \nmargin-right: auto; \ntext-align: center; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={'display: inline; \nbackground: lightyellow;'}
      />

      <Component
        initOuterCss={ 'display: block; \nmargin-left: auto; \nmargin-right: auto; \ntext-align: center; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={'display: inline; \nbackground: lightyellow;'}
      />

      <Component
        initOuterCss={ 'display: block; \nmargin-left: auto; \ntext-align: center; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={'display: inline; \nbackground: lightyellow;'}
      />

      <H>Position of any element within relative parent with known height</H>

      <p>Parent's <Code>height</Code> should be set to have any effect on vertical positioning.</p>

      <Component
        initOuterCss={ 'display: block; \nposition: relative; \nwidth: 200px; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={ 'display: inline; \nposition: absolute; \ntop: 50%; \nleft: 50%; \ntransform: translate(-50%, -50%); \nbackground: lightyellow;' }
      />

      <H>Position <Code>display: table-cell</Code> within <Code>display: table</Code> </H>

      <p><Code>table-cell</Code> is stretched within <Code>table</Code></p>

      <Component
        initOuterCss={ 'display: table; \nwidth: 200px; \nheight: 50px; \npadding: 10px; \nbackground: lightblue;' }
        initInnerCss={ 'display: table-cell; \ntext-align: left; \nvertical-align: top; \nbackground: lightyellow;' }
      />

      <Component
        initOuterCss={ 'display: table; \nwidth: 200px; \nheight: 50px; \npadding: 10px; \nbackground: lightblue;' }
        initInnerCss={ 'display: table-cell; \ntext-align: center; \nvertical-align: middle; \nbackground: lightyellow;' }
      />

      <Component
        initOuterCss={ 'display: table; \nwidth: 200px; \nheight: 50px; \npadding: 10px; \nbackground: lightblue;' }
        initInnerCss={ 'display: table-cell; \ntext-align: right; \nvertical-align: bottom; \nbackground: lightyellow;' }
      />

      <H>Position with flex</H>

      <Component
        initOuterCss={ 'display: flex; justify-content: flex-start; \nalign-items: flex-start; \nwidth: 200px; \nheight: 50px; \npadding: 10px; \nbackground: lightblue;' }
        initInnerCss={'background: lightyellow;'}
      />

      <Component
        initOuterCss={ 'display: flex; \njustify-content: center; \nalign-items: center; \nwidth: 200px; \nheight: 50px; \npadding: 10px; \nbackground: lightblue;' }
        initInnerCss={ 'background: lightyellow;' }
      />

      <Component
        initOuterCss={ 'display: flex; \njustify-content: flex-end; \nalign-items: flex-end; \nwidth: 200px; \nheight: 50px; \npadding: 10px; \nbackground: lightblue;' }
        initInnerCss={'background: lightyellow;'}
      />

      <Component
        initOuterCss={ 'display: flex; \njustify-content: center; \nalign-items: stretch; \nwidth: 200px; \nheight: 50px; \npadding: 10px; \nbackground: lightblue;' }
        initInnerCss={'background: lightyellow; \nwidth: 80%;'}
      />

      <H>Position with grid</H>

      <Component
        initOuterCss={ 'display: grid; \nplace-items: start; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={ 'background: lightyellow;' }
      />

      <Component
        initOuterCss={ 'display: grid; \nplace-items: center; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={ 'background: lightyellow;' }
      />

      <Component
        initOuterCss={ 'display: grid; \nplace-items: end; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={ 'background: lightyellow;' }
      />

      <Component
        initOuterCss={ 'display: grid; \nplace-items: start start; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={ 'background: lightyellow;' }
      />

      <Component
        initOuterCss={ 'display: grid; \nplace-items: start center; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={ 'background: lightyellow;' }
      />

      <Component
        initOuterCss={ 'display: grid; \nplace-items: start end; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={ 'background: lightyellow;' }
      />

      <Component
        initOuterCss={ 'display: grid; \nplace-items: normal start; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={ 'background: lightyellow;' }
      />

      <Component
        initOuterCss={ 'display: grid; \nplace-items: normal center; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={ 'background: lightyellow;' }
      />

      <Component
        initOuterCss={ 'display: grid; \nplace-items: normal end; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={ 'background: lightyellow;' }
      />

      <Component
        initOuterCss={ 'display: grid; \nplace-items: start normal; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={ 'background: lightyellow;' }
      />

      <Component
        initOuterCss={ 'display: grid; \nplace-items: center normal; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={ 'background: lightyellow;' }
      />

      <Component
        initOuterCss={ 'display: grid; \nplace-items: end normal; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={ 'background: lightyellow;' }
      />

      <Component
        initOuterCss={ 'display: grid; \nplace-items: stretch legacy; \nheight: 50px; \nbackground: lightblue;' }
        initInnerCss={ 'background: lightyellow;' }
      />

      <H>Horizontal position with float</H>

      <Hs>Default</Hs>

      <div>
        {Array(40)
          .fill('')
          .map(el => 'word ')}
        <img src="/imgs/va/img20.jpg" height="150" />
        word
        <img src="/imgs/va/img21.jpg" height="150" />
        {Array(20)
          .fill('')
          .map(el => 'word ')}
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
          .map(el => 'word ')}
        <img src="/imgs/va/img20.jpg" height="150" style={{ float: 'right' }} />
        word
        <img src="/imgs/va/img21.jpg" height="150" style={{ float: 'left' }} />
        {Array(30)
          .fill('')
          .map(el => 'word ')}
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

      <Hs>With float & <Code css>clear: both</Code> </Hs>

      <div>
        {Array(40)
          .fill('')
          .map(el => 'word ')}
        <img src="/imgs/va/img20.jpg" height="150" style={{ float: 'right' }} />
        word
        <img src="/imgs/va/img21.jpg" height="150" style={{ float: 'left' }} />
        {Array(30)
          .fill('')
          .map(el => 'word ')}
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
