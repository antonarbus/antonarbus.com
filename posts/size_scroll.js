import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'size & scroll',
  date: '2022.06.09',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/js.jpg',
  desc: 'size and scroll in JavaScript',
  body: (
    <>
      <ul>
        <li>Values of these properties are technically numbers w/o "px"</li>
        <li>Geometry properties are zero/null for elements that are not displayed</li>
      </ul>

      <H><code>.offsetParent</code></H>

      <ul>
        <li>returns nearest <i>positioned</i> ancestor or <code>td</code>, <code>th</code>, <code>table</code>, <code>body</code></li>
        <li>returns <code>null</code> for not displayed elements, <code>{'<body>'}</code>, <code>{'<html>'}</code>, elements with <code>{'position:fixed'}</code></li>
        <li><i>Positioned</i> element is an element with <code>position</code> equals to <code>absolute</code>, <code>relative</code>, <code>fixed</code> or <code>sticky</code></li>
      </ul>

      <Code block jsx>{`
      document.querySelector('#add-shortcut').offsetParent // div#add-box
      `}</Code>

      <H><code>.offsetTop</code> & <code>.offsetLeft</code></H>

      <ul>
        <li>x/y coordinates relative to <code>offsetParent</code> upper-left corner</li>
      </ul>

      <Code block jsx>{`
      document.querySelector('#add-shortcut').offsetTop // 53
      document.querySelector('#add-shortcut').offsetLeft // 72
      `}</Code>

      <H><code>.offsetHeight</code> & <code>.offsetWidth</code></H>

      <ul>
        <li>outer width/height of an element including borders</li>
        <li>full size including borders</li>
      </ul>

      <Code block jsx>{`
      document.querySelector('#btns-box').offsetWidth // 647
      document.querySelector('#btns-box').offsetHeight // 52
      `}</Code>

      <H><code>.clientTop</code> & <code>.clientLeft</code></H>

      <ul>
        <li>borders width/height</li>
        <li>relative coordinates of the inner side from the outer side</li>
        <li>the distances from the upper-left outer corner to the upper-left inner (content + padding) corner</li>
        <li>For left-to-right OS they are always the widths of left/top borders</li>
        <li>For right-to-left OS the vertical scrollbar is on the left so clientLeft includes its width too</li>
      </ul>

      <Code block jsx>{`
      document.querySelector('header').clientTop // 1 // css style: border-top: 1px solid #e0e0e0
      `}</Code>

      <H><code>.clientHeight</code> & <code>.clientWidth</code></H>

      <ul>
        <li>size of the area inside the element borders</li>
        <li>the width/height of the content including paddings</li>
        <li>w/o scrollbar</li>
        <li>scrolled content below is not included</li>
        <li>if no paddings, then clientWidth/Height is the content area, inside the borders and the scrollbar (if any)</li>
      </ul>

      <Code block jsx>{`
      document.querySelector('#btns-box').clientWidth // 105
      document.querySelector('#btns-box').clientHeight // 42
      `}</Code>

      <Code block jsx>{`
      document.documentElement.clientWidth // 670 // whole page width 680 // 10px is scrollbar
      document.documentElement.clientHeight  // 937 // scrolled content below is not included
      `}</Code>

      <H><code>.scrollHeight</code> & <code>.scrollWidth</code></H>

      <ul>
        <li>full inner height of the content area including the scrolled out parts</li>
        <li>like clientWidth/clientHeight, but also include scrolled-out, invisible part of the element</li>
      </ul>

      <Code block jsx>{`
      document.querySelector('html').clientHeight // 937
      document.querySelector('html').scrollHeight // 3502
      `}</Code>

      <p>Expand element's width to its full width/height.</p>

      <Code block jsx>{`
      el.style.height = \`\${element.scrollHeight}px\`
      `}</Code>

      <H><code>.scrollTop</code> & <code>.scrollLeft</code></H>

      <ul>
        <li>width/height of the hidden, scrolled out part of the element</li>
        <li>in other words, scrollTop is “how much is scrolled up”</li>
      </ul>

      <Code block jsx>{`
      document.querySelector('html').scrollTop // 0
      document.querySelector('html').scrollTop // 1166 // after small scroll
      `}</Code>

      <p>Can be modified & browser will scroll the element</p>

      <Code block jsx>{`
      document.querySelector('html').scrollTop = 10
      `}</Code>

      <Code block jsx>{`
      const html = document.querySelector('html')
      html.scrollTop = 10
      html.scrollTop = 0
      html.scrollTop = 1e9
      html.scrollTop += 10
      `}</Code>

      <H>isHidden()</H>

      <ul>
        <li>Can check if an element is hidden</li>
        <li> returns true for elements that are on-screen, but have zero sizes, like an empty div</li>
      </ul>

      <Code block jsx>{`
      function isHidden(elem) {
        return !elem.offsetWidth && !elem.offsetHeight
      }
      `}</Code>

      <H>scrollbar width</H>

      <Code block jsx>{`
      const scrollBarWidth = (el) => el.offsetWidth - el.clientWidth
      `}</Code>

      <H>put element in the middle</H>

      <p>Code won’t work reliably while ball has no width/height.</p>

      <Code block jsx>{`
        const toMiddle = (el, container) => {
          el.style.left = Math.round(container.clientWidth / 2 - el.offsetWidth / 2) + 'px';
          el.style.top = Math.round(container.clientHeight / 2 - el.offsetHeight / 2) + 'px';
        }
      `}</Code>

      <H>window width/height</H>

      <Hs>Without scrollbar</Hs>

      <Code block jsx>{`
      document.documentElement.clientHeight 
      document.documentElement.clientWidth 
      `}</Code>

      <Hs>With scrollbar</Hs>

      <p>More useful...</p>

      <Code block jsx>{`
      window.innerHeight
      window.innerWidth
      `}</Code>

      <H>DOCTYPE</H>

      <p>{'Odd things are possible w/o <!DOCTYPE HTML>'}</p>

      <H>document width/height</H>

      <p>Due to some inconsistency from the past the most reliable way to get full height and width...</p>

      <Code block jsx>{`
      const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      )
      `}</Code>

      <H><code>.pageYOffset</code> & <code>.pageXOffset</code></H>

      <p>Scroll position.</p>

      <Code block jsx>{`
      window.pageYOffset
      window.pageXOffset
      `}</Code>

      <H><code>.scrollY</code> & <code>.scrollX</code></H>

      <p>Same scroll position.</p>

      <Code block jsx>{`
      window.scrollY
      window.scrollX
      `}</Code>

      <H><code>.scrollLeft</code> & <code>.scrollTop</code></H>

      <p>Same, but can be buggy.</p>

      <Code block js>{`
      document.documentElement.scrollLeft
      document.documentElement.scrollTop
      `}</Code>

      <H>scrollTo()</H>

      <p>Scrolls the page to absolute coordinates...</p>

      <Code block jsx>{`
      window.scrollTo(pageX, pageY)
      scrollTo(0, 0) // scroll to the top
      `}</Code>

      <H>scrollBy()</H>

      <p>Scrolls the page relative to its current position...</p>

      <Code block jsx>{`
      window.scrollBy(x, y)
      scrollBy(0,10) // scroll a bit down
      `}</Code>

      <H>scrollIntoView()</H>

      <p>Scrolls the page to make el visible on the top of the window...</p>

      <Code block jsx>{`
      el.scrollIntoView(true) // scrolls the page to make el visible on the top // true is default, not mandatory
      el.scrollIntoView(false) // scrolls the page to make el appear at the bottom
      `}</Code>

      <Code block jsx>{`
      document.querySelector('table').scrollIntoView() // table on the top
      document.querySelector('table').scrollIntoView(false) // scroll the whole table
      `}</Code>

      <H>Forbid the scrolling</H>

      <ul>
        <li>page will “freeze” at its current scroll position</li>
        <li>drawback of the method is that the scrollbar disappear and page jumps</li>
        <li>can be tackled, by comparing clientWidth before and after the freeze and adding padding to document.body</li>
      </ul>

      <Code block jsx>{`
      document.body.style.overflow = "hidden"
      document.body.style.overflow = ""
      `}</Code>

      <H>getComputedStyle()</H>

      <ul>
        <li>width/height depends on <code>box-sizing</code> property that defines “what is” CSS width and height</li>
        <li>CSS width/height may be auto, for instance for an inline element</li>
        <li>scrollbar may have an impact</li>
        <li>do not use <code>getComputedStyle(el)</code></li>
      </ul>

      <H>el.getBoundingClientRect()</H>

      <ul>
        <li>Window relative coordinates for a minimal rectangle that encloses an element</li>
        <li>has properties bottom <code>height</code>, <code>left</code>, <code>right</code>, <code>top</code>, <code>width</code>, <code>x</code>, <code>y</code></li>
        <li><code>.bottom</code> from top window side to bottom el's edge</li>
        <li><code>.bottom</code> from left window side to right el edge</li>
        <li>same coordinates as in clientX/Y</li>
        <li>don’t have to round coordinates when setting to <code>style.left</code> & <code>style.top</code></li>
      </ul>

      <Code block jsx>{`
        const rect = document.querySelector('button').getBoundingClientRect()
        rect.bottom // 411.296875 // from top window side to bottom el edge // not as "bottom" CSS with position "fixed"
        rect.height // 40
        rect.left // 265.5
        rect.right // 370.5 // from left window side to right el edge // not as "right" CSS with position "fixed"
        rect.top // 371.296875
        rect.width // 105
        rect.x // 265.5 // no support by IE
        rect.y // 371.296875 // no support by IE
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
