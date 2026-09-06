'use client'

import { Code, ComponentFromHtmlString, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

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

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              background: lightblue;
            }
            .inner {
              display: inline;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <Hs>Margin & padding</Hs>

      <ul>
        <li>All margins work for block element</li>
        <li>Only side margins work for inline element</li>
        <li>All paddings work for all elements</li>
      </ul>

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              margin: 30px;
              padding: 10px;
              background: lightblue;
            }
            .inner {
              display: inline;
              margin: 50px;
              padding: 16px;
              border: 1px solid black;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <Hs>Height & width</Hs>

      <ul>
        <li>Height & width can be applied to block element</li>
        <li>Height & width do not have any effect on inline element</li>
      </ul>

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              width: 100px;
              height: 100px;
              background: lightblue;
            }
            .inner {
              display: inline;
              width: 500px;
              height: 500px;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <H>Horizontal position of inline element</H>

      <p>
        Set <Code>text-align</Code> property of parent block element
      </p>

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              text-align: left;
              width: 200px;
              height: 50px;
              background: lightblue;
            }
            .inner {
              display: inline;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              text-align: center;
              width: 200px;
              height: 50px;
              background: lightblue;
            }
            .inner {
              display: inline;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              text-align: right;
              width: 200px;
              height: 50px;
              background: lightblue;
            }
            .inner {
              display: inline;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <H>Vertical position of inline elements relative to its normal position</H>

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              width: 200px;
              height: 50px;
              background: lightblue;
            }
            .inner {
              display: inline;
              vertical-align: -5px;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <H>Vertical position with align-content</H>

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              width: 300px;
              height: 200px;
              background: lightblue;
              align-content: start;
            }
            .inner {
              display: inline;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              width: 300px;
              height: 200px;
              background: lightblue;
              align-content: center;
            }
            .inner {
              display: inline;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              width: 300px;
              height: 200px;
              background: lightblue;
              align-content: end;
            }
            .inner {
              display: inline;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              width: 300px;
              height: 200px;
              background: lightblue;
              align-content: stretch;
            }
            .inner {
              display: block;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <H>Vertical centering of inline element with line-height</H>

      <p>
        Make <Code>height</Code> & <Code>line-height</Code> properties of parent block element the
        same.
      </p>

      <p>Child should be one line only.</p>

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              width: 200px;
              height: 50px;
              line-height: 50px;
              background: lightblue;
            }
            .inner {
              display: inline;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
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

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              margin-right: auto;
              text-align: center;
              width: 200px;
              height: 50px;
              background: lightblue;
            }
            .inner {
              display: inline;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              margin-left: auto;
              margin-right: auto;
              text-align: center;
              width: 200px;
              height: 50px;
              background: lightblue;
            }
            .inner {
              display: inline;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              margin-left: auto;
              text-align: center;
              width: 200px;
              height: 50px;
              background: lightblue;
            }
            .inner {
              display: inline;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <H>Position of any element within relative parent with known height</H>

      <p>
        Parent's <Code>height</Code> should be set to have any effect on vertical positioning.
      </p>

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: block;
              position: relative;
              width: 200px;
              height: 50px;
              background: lightblue;
            }
            .inner {
              display: inline;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <H>
        Position <Code>display: table-cell</Code> within <Code>display: table</Code>{' '}
      </H>

      <p>
        <Code>table-cell</Code> is stretched within <Code>table</Code>
      </p>

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: table;
              width: 200px;
              height: 50px;
              padding: 10px;
              background: lightblue;
            }
            .inner {
              display: table-cell;
              text-align: left;
              vertical-align: top;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: table;
              width: 200px;
              height: 50px;
              padding: 10px;
              background: lightblue;
            }
            .inner {
              display: table-cell;
              text-align: center;
              vertical-align: middle;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: table;
              width: 200px;
              height: 50px;
              padding: 10px;
              background: lightblue;
            }
            .inner {
              display: table-cell;
              text-align: right;
              vertical-align: bottom;
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <H>Position with flex</H>

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              width: 200px;
              height: 50px;
              padding: 10px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 200px;
              height: 50px;
              padding: 10px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: flex;
              justify-content: flex-end;
              align-items: flex-end;
              width: 200px;
              height: 50px;
              padding: 10px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: flex;
              justify-content: center;
              align-items: stretch;
              width: 200px;
              height: 50px;
              padding: 10px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
              width: 80%;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <H>Position with grid</H>

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: grid;
              place-items: start;
              height: 50px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: grid;
              place-items: center;
              height: 50px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: grid;
              place-items: end;
              height: 50px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: grid;
              place-items: start start;
              height: 50px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: grid;
              place-items: start center;
              height: 50px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: grid;
              place-items: start end;
              height: 50px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: grid;
              place-items: normal start;
              height: 50px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: grid;
              place-items: normal center;
              height: 50px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: grid;
              place-items: normal end;
              height: 50px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: grid;
              place-items: start normal;
              height: 50px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: grid;
              place-items: center normal;
              height: 50px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: grid;
              place-items: end normal;
              height: 50px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          <style>
            .outer {
              display: grid;
              place-items: stretch legacy;
              height: 50px;
              background: lightblue;
            }
            .inner {
              background: lightyellow;
            }
          </style>
          <div class="outer">
            <div class="inner">Inner text</div>
          </div>
        `}
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
