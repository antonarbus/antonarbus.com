import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'dom events',
  date: '2022.06.18',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'dom events in JavaScript',
  body: (
    <>
      <H>Mouse events order</H>

      <p>{'mousedown --> mouseup --> click --> mousedown --> mouseup --> click --> dblclick'}</p>

      <H>e.button</H>

      <ul>
        <li><code>e.button</code> get the exact clicked mouse button</li>
        <li><code>e.button = 0</code> Left button (primary)</li>
        <li><code>e.button = 1</code> Middle button (auxiliary)</li>
        <li><code>e.button = 2</code> Right button (secondary)</li>
        <li><code>e.button = 3</code> X1 button (back)</li>
        <li><code>e.button = 4</code> X2 button (forward)</li>
        <li><code>e.which</code> same, but old non-standard way</li>
      </ul>

      <Code block jsx>{`
      document.addEventListener('click', (e) => console.log(e.button)) // 0
      document.addEventListener('contextmenu', (e) => console.log(e.button)) // 2
      `}</Code>

      <H>e.modifiers</H>

      <ul>
        <li><code>e.shiftKey</code> Shift</li>
        <li><code>e.altKey</code> Alt (or Opt for Mac)</li>
        <li><code>e.ctrlKey</code> Ctrl</li>
        <li><code>e.metaKey</code> Cmd for Mac</li>
        <li><code>true</code> if the key was pressed during the event</li>
      </ul>

      <p>Detect if press <kbd>alt+shift</kbd> during a click...</p>

      <Code block jsx>{`
      document.addEventListener('click', function (e) {
        if (e.altKey && e.shiftKey) alert('Hooray!')
      })
      `}</Code>

      <H>mouseover, mouseout</H>

      <ul>
        <li><i>mouseover</i> triggers when pointer comes over an element</li>
        <li><code>e.target</code> - element where the mouse came over</li>
        <li><code>e.relatedTarget</code> - element from which the mouse came</li>
        <li><i>mouseout</i> triggers when pointer leaves an element</li>
        <li><code>e.target</code> - element that the mouse left</li>
        <li><code>e.relatedTarget</code> - new under-the-pointer element, that mouse left for </li>
        <li><code>relatedTarget</code> can be <code>null</code> if mouse came from out of the window or left the window</li>
        <li>If <i>mouseover</i> triggered, there must be <i>mouseout</i></li>
        <li>mousemove doesn't trigger on every pixel, that’s good for performance</li>
        <li>but some DOM-elements may be skipped</li>
        <li>it’s possible that the pointer jumps right inside the middle of the page from out of the window</li>
        <li>In that case <code>relatedTarget</code> is null, because it came from “nowhere”</li>
        <li><i>mouseover</i> event bubbles up</li>
        <li>if parent has <i>mouseover</i> handler, it may seem that the mouse pointer left #parent element, and then immediately came back over it</li>
        <li>to avoid such mess we need to examine <code>event.target</code> and <code>relatedTarget</code> and if the mouse is still inside the element, then ignore such event</li>
        <li>or better to use <i>mouseenter</i> & <i>mouseleave</i> events</li>
      </ul>

      <Code block jsx>{`
      outterDiv.onmouseover = outterDiv.onmouseout = handler
      function handler(e) {
        console.log(\`\${e.type}: target=\${e.target.id}, relatedTarget=\${e.relatedTarget.id}\`)
      }
      `}</Code>

      <H>mouseenter, mouseleave</H>

      <ul>
        <li>events are similar to <i>mouseover</i> & <i>mouseout</i></li>
        <li>triggers when the mouse pointer enters/leaves an element</li>
        <li>no bubbling</li>
        <li>transitions inside the element, to/from descendants, are not counted</li>
        <li>event delegation not possible</li>
      </ul>

      <Code block jsx>{`
      div.onmouseenter = div.onmouseleave = handler
      function handler(e) {
        console.log(\`\${e.type}: target=\${e.target.id}, relatedTarget=\${e.relatedTarget.id}\`)
      }
      `}</Code>

      <H>Event delegation</H>

      <p>Highlight cells on click...</p>

      <Code block jsx>{`
      table.onclick = function(e) {
        let td = e.target.closest('td') // we may click on some tag inside td, so we find the nearest td
        if (!td) return // check if was inside any <td>
        if (!table.contains(td)) return // check if it is out table
        highlight(td) // do action
      }
      `}</Code>

      <p>Highlight all els in table under mouse...</p>

      <Code block jsx>{`
      tbl.onmouseover = e => e.target.style.background = 'pink'
      tbl.onmouseout = e => e.target.style.background = ''
      `}</Code>

      <p>Highlight only TDs...</p>

      <Code block jsx>{`
      let curEl = null

      tbl.onmouseover = function(e) {
        if (curEl) return // if currentElem is set, we didn't leave the previous <td>
        let target = e.target.closest('td')
        if (!target) return // we moved not into a <td>
        if (!tbl.contains(target)) return // moved into <td>, but outside of our table (possible in case of nested tables)
        curEl = target // hooray! we entered a new <td> 
        curEl.style.background = 'pink'
      }

      tbl.onmouseout = function(e) {
        if (!curEl) return // if we're outside of any <td> now
        let relatedTarget = e.relatedTarget // we're leaving the element – where to? Maybe to a descendant?
        while (relatedTarget) { // go up the parent chain and check – if we're still inside currentElem
          if (relatedTarget == curEl) return // internal transition
          relatedTarget = relatedTarget.parentNode
        }
        curEl.style.background = '' // we left the <td>. really
        curEl = null
      }
      `}</Code>

      <H>Pointer events</H>

      <ul>
        <li>Pointer events allow handling mouse, touch, pen events simultaneously, with a single piece of code</li>
        <li>We can replace "mouse" with "pointer" in event names and expect our code to continue working for mouse</li>
      </ul>

      <Hs>Pointer events types</Hs>

      <ul>
        <li><i>touchstart</i>, <i>touchend</i>, <i>touchmove</i></li>
        <li><i>pointerdown</i> similar to <i>mousedown</i></li>
        <li><i>pointerup</i> similar to <i>mouseup</i></li>
        <li><i>pointermove</i> similar to <i>mousemove</i></li>
        <li><i>pointerover</i> similar to <i>mouseover</i></li>
        <li><i>pointerout</i> similar to <i>mouseout</i></li>
        <li><i>pointerenter</i> similar to <i>mouseenter</i></li>
        <li><i>pointerleave</i> similar to <i>mouseleave</i></li>
        <li><i>pointercancel</i></li>
        <li><i>gotpointercapture</i> fires when an element uses el.setPointerCapture(pointerId) to enable capturing</li>
        <li><i>lostpointercapture</i> fires when the capture is released</li>
      </ul>

      <Hs>Pointer events properties</Hs>

      <p>Pointer events have the same properties as mouse events, plus...</p>

      <ul>
        <li><code>pointerId</code> the unique identifier of the pointer causing the event</li>
        <li><code>pointerType</code> pointing device type, “mouse”, “pen” or “touch”, we can use this property to react differently on various pointer types</li>
        <li><code>isPrimary = true</code> for the primary pointer (the first finger in multi-touch)</li>
        <li><code>width</code> width of the area where the pointer (e.g. a finger) touches the device. Where unsupported, e.g. for a mouse, it’s always 1</li>
        <li><code>height</code> the height of the area where the pointer touches the device. Where unsupported, it’s always 1</li>
        <li><code>pressure</code> the pressure of the pointer tip, in range from 0 to 1. For devices that don’t support pressure must be either 0.5 (pressed) or 0</li>
        <li><code>tangentialPressure</code> the normalized tangential pressure</li>
        <li><code>tiltX</code>, <code>tiltY</code>, <code>twist</code> pen-specific properties that describe how the pen is positioned relative the surface.</li>
      </ul>

      <H>Multi-touch</H>

      <ul>
        <li>handling multi-touch can be done with the help of the <code>pointerId</code> and <code>isPrimary</code> properties</li>
        <li>if we use 5 fingers simultaneously, we have 5 pointerdown events</li>
        <li>with their respective coordinates and a different <code>pointerId</code></li>
        <li>when the user moves and then removes a finger, we get <i>pointermove</i> and <i>pointerup</i> events with the same <code>pointerId</code> as we had in <code>pointerdown</code></li>
        <li><code>isPrimary = true</code> events associated with the first finger and <code>isPrimary = false</code> for others</li>
        <li><code>pointerId</code> assigned for each touching finger</li>
      </ul>

      <Code block jsx>{`
      document.onpointerdown = document.onpointerup = log
      function log(e) {
        console.log( \`\${e.type} isPrimary=\${e.isPrimary} pointerId=\${e.pointerId}\`)
      }
      `}</Code>

      <Hs>pointercancel</Hs>

      <ul>
        <li>event fires when ongoing pointer interaction is aborted</li>
        <li>...or pointer device hardware was physically disabled</li>
        <li>...or device orientation changed</li>
        <li>...or browser decided to handle the interaction on its own</li>
        <li>Prevent the default browser action to avoid <i>pointercancel</i></li>
        <li>after this browser won’t hijack the process and doesn’t emit pointercancel</li>
      </ul>

      <p>Set CSS to <Code css>{'{ touch-action: none }'}</Code></p>

      <Code block jsx>{`
      ball.ondragstart = () => false
      `}</Code>

      <Hs>setPointerCapture</Hs>

      <ul>
        <li><Code js>el.setPointerCapture(pointerId)</Code> binds events with the given pointerId to el</li>
        <li>all pointer events with the same pointerId will have elem as the target</li>
        <li>no matter where in document they really happened</li>
        <li>in other words, re-targets all subsequent events with the given pointerId to el</li>
        <li>The binding is removed when <i>pointerup</i> or <i>pointercancel</i> events occur</li>
        <li>or elem is removed from the document</li>
        <li>or <Code>el.releasePointerCapture(pointerId)</Code> called</li>
        <li>Pointer capturing can be used to simplify drag’n’drop kind of interactions</li>
        <li>we use <i>pointerdown</i> and <i>pointermove</i> on thumb, but there is a problem</li>
        <li>…As the pointer moves, it may leave the slider thumb: go above or below it</li>
        <li>then we need to assign <i>pointermove</i> on the whole document</li>
        <li>if we do it on document level, there might be some side effects, trigger other event handlers</li>
        <li>and here the magic comes...</li>
        <li>We can call <Code js>thumb.setPointerCapture(event.pointerId)</Code> in <i>pointerdown</i> handler</li>
        <li>Then future pointer events will be re-targeted to thumb</li>
        <li>When <i>pointerup</i> happens (dragging complete), the binding is removed automatically, we don’t need to care about it</li>
        <li>if a user moves the pointer around the whole document, events handlers will be called on thumb</li>
      </ul>

      <Code block html>{`
      <div id="slider">
        <div id="thumb"></div>
      </div>
      `}</Code>

      <Code block jsx>{`
      let shiftX

      thumb.onpointerdown = function(e) {
        e.preventDefault() // prevent selection start (browser action)
        shiftX = e.clientX - thumb.getBoundingClientRect().left
        thumb.setPointerCapture(e.pointerId)
      }

      thumb.onpointermove = function(e) {
        if(!e.target.hasPointerCapture(e.pointerId)) return
        let newLeft = e.clientX - shiftX - slider.getBoundingClientRect().left

        // if the pointer is out of slider => adjust left to be within the bounaries
        if (newLeft < 0) newLeft = 0
        let rightEdge = slider.offsetWidth - thumb.offsetWidth
        if (newLeft > rightEdge) newLeft = rightEdge

        thumb.style.left = newLeft + 'px'
      }

      thumb.ondragstart = () => false
      `}</Code>

      <H>keydown, keyup</H>

      <ul>
        <li>keyboard events should be used to handle keyboard actions (virtual keyboard also)</li>
        <li>use <i>input</i> event to track input into an <code>{'<input>'}</code> field </li>
        <li>keyboard events are not enough coz there are also speech recognition, copy/paste with mouse etc...</li>
      </ul>

      <Hs>Event types</Hs>

      <ul>
        <li><code>e.key</code> get the character, language layout specific</li>
        <li><code>e.code</code> get the “physical key code”, for hotkey</li>
        <li><code>e.keypress</code>, <code>e.keyCode</code>, <code>e.charCode</code>, <code>e.which</code> - legacy, many browser incompatibilities</li>
        <li><code>e.repeat</code> - <code>true</code> if an event is triggered by auto-repeat</li>
      </ul>

      <Code block jsx>{`
      document.addEventListener('keydown', (e) => {
        console.log('e.key', e.key)
        console.log('e.code', e.code)
        console.log('e.repeat', e.repeat)
      })
      // hold shift+D
      // e.key D
      // e.code KeyD
      // e.repeat true
      `}</Code>

      <Hs>Default actions</Hs>

      <p>{'<input>'} expects a tel number, does not accept keys except <kbd>digits</kbd>, <kbd>+</kbd>, <kbd>-</kbd>, <kbd>(</kbd>, <kbd>)</kbd></p>

      <Code block html>{`
      <input id="inp" onkeydown="return checkPhoneKey(event.key)" placeholder="Phone, please" type="tel">
      `}</Code>

      <Code block jsx>{`
      function checkPhoneKey(key) {
        return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-'
          key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
      }
      `}</Code>

      <p>Or...</p>

      <Code block jsx>{`
      inp.addEventListener('keydown',  e => {
        if ( 
          !( (e.key >= '0' && e.key <= '9') || e.key == '+' || e.key == '(' || e.key == ')' 
          || e.key == '-' || e.key == 'ArrowLeft' || e.key == 'ArrowRight' 
          || e.key == 'Delete' || e.key == 'Backspace' ) 
        ) e.preventDefault()
      })
      `}</Code>

      <p>Right-click + paste still work, we can track the <i>input</i> event to prevent it.</p>

      <Hs>Mobile</Hs>

      <ul>
        <li>for virtual keyboards <code>e.keyCode = 229</code> and <code>e.key = "Unidentified"</code></li>
        <li>some of these keyboards might still use the right values</li>
        <li>keyboard logic might not always work on mobile devices</li>
        <li>logic for tracking mobile keyboards may be following...</li>
      </ul>

      <Code block jsx>{`
      function runOnKeys(func, ...codes) {
        let pressed = new Set()
        document.addEventListener('keydown', function(e) {
          pressed.add(e.code)
          for (let code of codes) {
            if (!pressed.has(code)) return
          }
          pressed.clear()
          func()
        })

        document.addEventListener('keyup', e => pressed.delete(e.code))
      }

      runOnKeys(
        () => alert("Hello!"),
        "KeyQ",
        "KeyW"
      )
      `}</Code>

      <H>scroll</H>

      <p><i>scroll</i> event works both on the window and on scrollable elements</p>

      <Hs>Show the current scroll</Hs>

      <Code block jsx>{`
      window.addEventListener('scroll', () => console.log(window.pageYOffset + 'px'))
      `}</Code>

      <Hs>Prevent scrolling</Hs>

      <ul>
        <li>Scroll triggers after the scroll has already happened</li>
        <li>That's why <code>e.preventDefault()</code> in onscroll listener does not work</li>
        <li>Use CSS, <code>overflow</code> property</li>
      </ul>

      <H>focus, blur</H>

      <ul>
        <li><i>focus</i> event is called on focusing</li>
        <li><i>blur</i> – when an element loses the focus</li>
        <li>element receives the focus when clicked or "Tabbed" from keyboard</li>
        <li><i>autofocus</i> - HTML attribute that puts the focus by default when a page load</li>
        <li>doesn’t bubble up & triggers on input only</li>
        <li>but they propagate on capturing phase, trange historical thing</li>
      </ul>

      <Code block jsx>{`
      form.addEventListener("focus", () => alert('focused')) // do not work
      form.addEventListener("blur", () => alert('blured')) // do not work

      form.addEventListener("focus", () => alert('focused'), true) // works
      form.addEventListener("blur", () => alert('blured'), true) // works

      form.addEventListener("focusin", () => alert('focused')) // works
      form.addEventListener("focusout", () => alert('blured')) // works
      `}</Code>

      <Hs>Mail validation</Hs>

      <ul>
        <li><i>blur</i> handler checks if the field has an email entered, and if not – shows an error</li>
        <li><i>focus</i> handler hides the error message (on <i>blur</i> it will be checked again)</li>
        <li>can’t “prevent losing focu by <code>e.preventDefault()</code> in on <i>blur</i></li>
        <li>because on <i>blur</i> works after the element lost the focus</li>
      </ul>

      <Code block html>{`
      Your email please: <input type="email" id="input">
      <div id="error"></div>
      `}</Code>

      <Code block jsx>{`
        input.onblur = function() {
          if (!input.value.includes('@')) {
            input.classList.add('invalid')
            error.innerHTML = 'Please enter a correct email.'
          }
        }
        
        input.onfocus = function() {
          if (this.classList.contains('invalid')) {
            this.classList.remove('invalid')
            error.innerHTML = ""
          }
        }
      `}</Code>

      <H>focus(), blur()</H>

      <ul>
        <li><code>elem.focus()</code> set the focus on the element</li>
        <li><code>elem.blur()</code> unset the focus on the element</li>
        <li><code>alert()</code> causes focus loose</li>
        <li>when alert is dismissed, the focus comes back (focus event)</li>
        <li>If an element is removed from DOM, then it also causes the focus loss</li>
        <li>If it is reinserted later, then the focus doesn’t return</li>
      </ul>

      <p>Do not leave input if mail in invalid...</p>

      <Code block jsx>{`
        input.onblur = function() {
          if (!this.value.includes('@')) { 
            alert("mail is incorrect")
            input.focus() // ...and put the focus back
            return
          }
            
          this.classList.remove("error")
        }
      `}</Code>

      <H>tabindex</H>

      <ul>
        <li>{'focus is supported by <button>, <input>, <select>, <a>'}</li>
        <li>By default, many elements do not support focusing</li>
        <li>This can be changed using HTML-attribute <i>tabindex</i></li>
        <li>The switch order is: elements with tabindex from 1 and above go first </li>
        <li>then elements w/o <i>tabindex</i> (e.g. a regular {'<input>'})</li>
        <li>Elements w/o <i>tabindex</i> are switched in the document source order</li>
        <li><code>tabindex="0"</code> - special value´, puts an element among those w/o <i>tabindex</i></li>
        <li>Usually it’s used to make an element focusable, but keep the default switching order</li>
        <li><code>tabindex="-1"</code> allows only programmatic focusing on an element</li>
        <li><kbd>Tab</kbd> ignores such elements, but method <code>elem.focus()</code> works</li>
        <li><code>elem.tabIndex</code> works too</li>
        <li>We can add <i>tabindex</i> from JavaScript by using the <code>elem.tabIndex</code> property</li>
      </ul>

      <H>focusin, focusout</H>

      <p>Exactly the same as focus/blur, but they bubble</p>

      <Code block jsx>{`
      form.addEventListener("focusin", () => alert('focused')) // works
      form.addEventListener("focusout", () => alert('blured')) // works
      `}</Code>

      <H>change</H>

      <ul>
        <li><i>change</i> event triggers when the element has finished changing</li>
        <li>for text inputs that means that the event occurs when it loses focus</li>
        <li>for {'<select>'}, {'<input type="checkbox">'}, {'<input type="radio">'} it triggers right after the selection changes</li>
      </ul>

      <Code block jsx>{`
      input.addEventListener('change', function () {
        console.log(this.value) // comes only on focus loose
      })
      `}</Code>

      <Code block html>{`
      <select onchange="alert(this.value)">
        <option value="">Select something</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
      `}</Code>

      <H>input</H>

      <ul>
        <li><i>input</i> event triggers every time after a value is modified by user</li>
        <li>triggers on any value change, pasting with a mouse or using speech recognition</li>
        <li><i>input</i> event doesn’t trigger on not value change, e.g. arrow keys ⇦ ⇨ </li>
        <li><code>e.preventDefault()</code> not working, coz event occurs after the value is modified</li>
      </ul>

      <H>cut, copy, paste</H>

      <ul>
        <li>events occur on cutting/copying/pasting a value</li>
        <li>belong to the <code>ClipboardEvent</code> class and provide access to the data that is copied/pasted</li>
        <li>it’s possible to copy/paste not just text, but everything (file)</li>
        <li>The clipboard is a “global” OS-level thing</li>
        <li>for safety reason clipboard usually accessed only on user action (e.g. <i>onclick</i>)</li>
        <li><Lnk path='https://developer.mozilla.org/en-US/docs/Web/API/Clipboard'>https://developer.mozilla.org/en-US/docs/Web/API/Clipboard</Lnk></li>
      </ul>

      <Code block jsx>{`
      e.preventDefault() // works to abort copied/paste

      input.oncut = input.oncopy = input.onpaste = function(e) {
        alert(e.type + ' - ' + e.clipboardData.getData('text/plain'))
        return false
      }
      `}</Code>

      <Hs>Prevent copy, selection</Hs>

      <Code block jsx>{`
      el.addEventListener('copy', e => e.preventDefault())
      el.addEventListener('mousedown', e => e.preventDefault())
      `}</Code>

      <H>submit</H>

      <ul>
        <li><i>submit</i> event triggers when the form is submitted</li>
        <li><code>e.preventDefault()</code> prevents automatic submission and redirection</li>
      </ul>

      <Code block html>{`
      <form onsubmit="alert('submit!'); return false">
        Submit can be done by:
        First: Enter in the input field <input type="text" value="text"><br>
        Second: Click "submit": <input type="submit" value="Submit">
      </form>
      `}</Code>

      <ul>
        <li>When a form is sent using <kbd>Enter</kbd> on an input field</li>
        <li>a <i>click</i> event triggers on the {'<input type="submit">'}</li>
      </ul>

      <Code block html>{`
      <form onsubmit="return false">
        <input type="text" size="30" value="Focus here and press enter">
        <input type="submit" value="Submit" onclick="alert('click')">
      </form>
      `}</Code>

      <Code block jsx>{`
      form.submit() {
        const form = document.createElement('form')
        form.action = 'https://google.com/search'
        form.method = 'GET'
        form.innerHTML = '<input name="q" value="test">'
        document.body.append(form) // the form must be in the document to submit it
        form.submit()

        // the submit event is not generated
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
