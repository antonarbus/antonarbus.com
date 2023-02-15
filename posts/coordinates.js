import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'coordinates',
  date: '2022.06.12',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/js.jpg',
  desc: 'coordinates in JavaScript',
  body: (
    <>
      <H><code>e.clientX</code> & <code>e.clientY</code></H>

      <ul>
        <li>Coordinates relative to window</li>
        <li>Calculated from the window top/left edge</li>
      </ul>

      <H><code>e.pageX</code> & <code>e.pageY</code></H>

      <ul>
        <li>Coordinates relative to the document</li>
        <li>Calculated from the document top/left edge</li>
        <li>Scroll is considered</li>
        <li><code>e.clientY = e.pageY</code> until page is scrolled</li>
      </ul>

      <H><code>e.screenX</code> & <code>e.screenY</code></H>

      <ul>
        <li>Coordinates relative to physical screen</li>
      </ul>

      <Code block jsx>{`
      document.documentElement.addEventListener("mousemove", function (e) {
        console.log(\`clientX \${e.clientX} / clientY \${e.clientY} \`) 
        console.log(\`pageX \${e.pageX} / pageY \${e.pageY}\`)
        console.log(\`screenX \${e.screenX} / screenY \${e.screenY}\`)
      })

      /*
        clientX 395 / clientY 231 
        pageX 395 / pageY 1263 // page is scrolled
        screenX 484 / screenY 378 // browser is away from the top left corner
      */
      `}</Code>

      <H>getBoundingClientRect()</H>

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

      <Code block jsx>{`
      function getCoords(el) {
        let box = el.getBoundingClientRect();
        return {
          top: box.top + window.pageYOffset,
          right: box.right + window.pageXOffset,
          bottom: box.bottom + window.pageYOffset,
          left: box.left + window.pageXOffset
        }
      }
      `}</Code>

      <H>Show message under element</H>

      <Code block jsx>{`
      function createMessageUnder(elem, html) {
        let message = document.createElement('div')
        message.style.cssText = "position:absolute; color: red"
        let coords = getCoords(elem)
        message.style.left = coords.left + "px"
        message.style.top = coords.bottom + "px"
      
        message.innerHTML = html
        return message
      }
      `}</Code>

      <Code block jsx>{`
      let elem = document.getElementById("innerDiv2")
      let message = createMessageUnder(elem, 'Hello, world!')
      document.body.append(message)
      setTimeout(() => message.remove(), 5000)
      `}</Code>

      <H>document.elementFromPoint(x, y)</H>

      <ul>
        <li>returns the most nested element at window coordinates (x, y)</li>
      </ul>

      <p>Return the tag of the element that is in the middle of the window</p>

      <Code block jsx>{`
      let centerX = document.documentElement.clientWidth / 2
      let centerY = document.documentElement.clientHeight / 2
      let elem = document.elementFromPoint(centerX, centerY)
      elem.style.background = "red"
      console.log(elem.tagName)
      
      // element may be different depending on the current scroll position
      // For out-of-window coordinates the elementFromPoint returns null
      `}</Code>

      <H>Coordinates relative to element</H>

      <ul>
        <li>Ones I needed to get distance (coordinates) of cursor from top & bottom of container</li>
        <li>At first we need to know the coordinates of our container relative to the screen with <Code>getBoundingClientRect()</Code> </li>
        <li>And then we need to know the cursor coordinates relative to the screen with <Code>e.clientY</Code></li>
        <li>And just calculate the distance</li>
      </ul>

      <Code block jsx>{`
      function movePasteTextAfterCursor(e: MouseEvent) {
        const item = (e.target as Element).closest('.item')
        if (!item) return
        const { height, top } = item.getBoundingClientRect()
        const yWithinElement = e.clientY - top
        const distToTop = yWithinElement
        const distToBottom = height - yWithinElement
        let pastePlace

        if (distToTop / height < 0.1) {
          pastePlace = { pastePos: 'top', itemId: item.id }
        } else if (distToBottom / height < 0.1) {
          pastePlace = { pastePos: 'bottom', itemId: item.id }
        } else {
          pastePlace = { pastePos: 'middle', itemId: item.id }
        }

        if (hash(prevPastePlace) === hash(pastePlace)) return

        store.dispatch(addPasteText(pastePlace))
        store.dispatch(savePastePlace(pastePlace))
        prevPastePlace = structuredClone(pastePlace)
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
