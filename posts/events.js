import { Code, H, Hs, jsxToStr, Lnk } from '/components/post/reExport'

const postObj = {
  title: 'events',
  date: '2022.06.15',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'events in JavaScript',
  body: (
    <>

      <H>DOM events</H>

      <p>Most useful DOM events</p>

      <ul>
        <li><code>click</code> click or tap on an element</li>
        <li><code>dblclick</code> two clicks on the same element within a short time, rarely used</li>
        <li><code>contextmenu</code> mouse right-clicks on an element or special contextmenu keyboard key pressed</li>
        <li><code>mouseover</code>, <code>mouseout</code> mouse cursor comes over / leaves an element</li>
        <li><code>mousedown</code>, <code>mouseup</code> mouse button is pressed / released over an element</li>
        <li><code>mousemove</code> mouse is moved</li>
        <li><code>keydown</code>, <code>keyup</code> keyboard key is pressed and released</li>
        <li><code>submit</code> visitor submits a form</li>
        <li><code>focus</code> visitor focuses on an element, e.g. input, textarea</li>
        <li><code>DOMContentLoaded</code> the HTML is loaded and processed, DOM is fully built</li>
        <li><code>transitionend</code> CSS-animation finishes</li>
      </ul>

      <p>Take a closer look at <Lnk path='/posts/dom_events'>DOM events</Lnk>.</p>

      <H>Event handler in HTML-attribute</H>

      <p><i>Event handler</i> - a function that reacts on events</p>

      <Code block html>{`
      <input value="Click me" onclick="alert('Click!')" type="button"></input>
      <input type="button" oNcLiCk="countRabbits()" value="Count rabbits!"></input>
      `}</Code>

      <ul>
        <li>inside onclick we use single quotes, because the attribute itself is in double quotes</li>
        <li>HTML attribute names are not case-sensitive, so ONCLICK works as well as onClick and onCLICK… But usually attributes are lowercased</li>
      </ul>

      <Code block jsx>{`
      // !!! NOT working, coz value should be a string
      document.body.setAttribute('onclick', function() { alert(1) })
      `}</Code>

      <H>element.on</H>

      <Code block html>{`
      <input id="elem" type="button" value="Click me">
      `}</Code>

      <Code block jsx>{`
      elem.onclick = function() { alert('Thank you') }
      `}</Code>

      <p>or...</p>

      <Code block jsx>{`
      const sayThanks = () => alert('Thanks!')
      elem.onclick = sayThanks // no parentheses
      `}</Code>

      <ul>
        <li>Some handlers work only with <code>addEventListener</code>, for ex <i>DOMContentLoaded</i> event</li>
        <li><Code>elem.onclick = null</Code> remove a handler</li>
      </ul>

      <ul>
        <li>As there’s only one onclick property, we can’t assign more than one event handler</li>
        <li>Adding a new handler with JavaScript overwrites the existing handler</li>
        <li>DOM-property case matters</li>
      </ul>

      <H>addEventListener</H>

      <Code block jsx>{`
      element.addEventListener(event, handler, [options])
      `}</Code>

      <ul>
        <li><code>event</code> event name, e.g. "click"</li>
        <li><code>handler</code> handler function</li>
        <li><code>options</code> additional optional object with properties</li>
      </ul>

      <Code block jsx>{`
      element.addEventListener('click', func,  {
          capture: false,
          once: false
          passive: false
        })
      `}</Code>

      <ul>
        <li><code>capture: true</code> catch an event on the capturing phase</li>
        <li><code>once: true</code> fires an event only ones</li>
        <li><code>passive: true</code> tells the browser that the handler is not going to cancel scrolling, not going to call <code>preventDefault()</code></li>
        <li>Then browser scrolls immediately providing a maximally fluent experience</li>
        <li>For some browsers (Firefox, Chrome), passive is true by default for touchstart and touchmove events</li>
      </ul>

      <H>removeEventListener</H>

      <ul>
        <li>To remove a handler we should pass exactly the same function as was assigned</li>
        <li> if we don’t store the function in a variable, then we can’t remove it</li>
        <li>To remove the handler, removeEventListener needs to have identical parameters</li>
      </ul>

      <Code block jsx>{`
      function handler() { alert( 'Thanks!' ) }
      input.addEventListener("click", handler)
      input.removeEventListener("click", handler)
      `}</Code>

      <Code block jsx>{`
      el.addEventListener("event", fn, true)
      el.removeEventListener("event", fn, true)
      `}</Code>

      <p>Will not work, because technically they are different function objects</p>

      <Code block jsx>{`
      el.addEventListener( "click" , () => alert('Thanks!'))
      el.removeEventListener( "click", () => alert('Thanks!'))
      `}</Code>

      <H>Multiple handlers</H>

      <p>Multiple event handlers can be achieved by multiple addEventListeners.</p>

      <Code block jsx>{`
      function handler1() { alert('Thanks!') }
      function handler2() { alert('Thanks again!') }
      elem.onclick = () => alert("Hello")
      elem.addEventListener("click", handler1) // Thanks!
      elem.addEventListener("click", handler2) // Thanks again!
      `}</Code>

      <H>this</H>

      <p>The value of <code>this</code> inside a handler is the element, which has the handler on it.</p>

      <Code block html>{`
      <button onclick="alert(this.innerHTML)">Click me</button> // Click me
      `}</Code>

      <H>Event object</H>

      <ul>
        <li>when an event happens, event object is created and passes it as an argument to the handler</li>
        <li><code>event.type</code> event type, for ex. <i>click</i></li>
        <li><code>event.currentTarget</code> el where the handler is, same as <code>this</code> unless arrow func</li>
        <li><code>event.target</code> el that initiated the event</li>
        <li><code>event.clientX</code> window-relative coordinates of the cursor, for pointer events</li>
        <li><code>event.eventPhase</code> current phase (capturing=1, target=2, bubbling=3)</li>
        <li>There are more event properties, depending on the event type</li>
      </ul>

      <Code block jsx>{`
      elem.onclick = function(event) {
        event.type // Event type, here it’s "click".
        event.currentTarget // el where the handler is // same as 'this' unless arrow func
        event.target, // el that initiated the event
        event.clientX // window-relative coordinates of the cursor, for pointer events
        event.clientY
        event.eventPhase // current phase (capturing=1, target=2, bubbling=3)
      }
      `}</Code>

      <p>The event object is also available in HTML handlers</p>

      <Code block html>{`
      <input type="button" onclick="alert(event.type)" value="Event type">
      `}</Code>

      <H>object with handleEvent</H>

      <ul>
        <li>can assign not just a function, but an object as an event handler </li>
        <li>when an event occurs, its <code>handleEvent</code> method is called</li>
      </ul>

      <Code block jsx>{`
      const obj = {
        handleEvent(event) {
          alert(event.type + " at " + event.currentTarget)
        }
      }
      document.addEventListener('click', obj)

      // we can use class

      class Menu {
        handleEvent(event) {
          switch(event.type) {
            case 'mousedown':
              elem.innerHTML = "Mouse button pressed"
              break
            case 'mouseup':
              elem.innerHTML += "...and released."
              break
          }
        }
      }

      let menu = new Menu()
      elem.addEventListener('mousedown', menu)
      elem.addEventListener('mouseup', menu)

      // or even like that

      class Menu {
        handleEvent(event) {
          // mousedown -> onMousedown
          let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
          this[method](event);
        }
        onMousedown() { elem.innerHTML = "Mouse button pressed" }
        onMouseup() { elem.innerHTML += "...and released." }
      }

      let menu = new Menu()
      elem.addEventListener('mousedown', menu)
      elem.addEventListener('mouseup', menu)
      `}</Code>

      <H>Bubbling</H>

      <ul>
        <li>When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors</li>
        <li>{'span --> div --> body --> html --> document --> window'}</li>
        <li>some events reach 'window', not all</li>
        <li>Almost all events bubble</li>
        <li><code>focus</code> event does not bubble</li>
      </ul>

      <Code block html>{`
      <form onclick="alert('form')">FORM
        <div onclick="alert('div')">DIV
          <p onclick="alert('p')">P</p>
        </div>
      </form>
      `}</Code>

      <ul>
        <li>Click on <code>{'<p>'}</code> triggers 3 alerts due to bubbling</li>
        <li>bubbling happens  upwards till the document object</li>
        <li>if we have a single handler form.onclick, then it can “catch” all clicks inside the form</li>
      </ul>

      <H>e.target</H>

      <ul>
        <li>element that initiated the event</li>
        <li>The most deeply nested element that caused the event is called a target element</li>
        <li>handler on a parent el can get info where it actually happened</li>
      </ul>

      <H>e.currentTarget</H>

      <ul>
        <li>element from where cursor exited or where it is entered</li>
        <li>depends on the event</li>
        <li>for <code>mouseenter</code>, <code>mouseover</code>, <code>dragenter</code> - element exited from</li>
        <li>for <code>mouseleave</code>, <code>mouseout</code>, <code>dragleave</code> - element entered into</li>
      </ul>

      <H>e.relatedTarget</H>

      <ul>
        <li>el where the handler is</li>
        <li>same as <code>this</code></li>
      </ul>

      <H>e.stopPropagation()</H>

      <ul>
        <li>stop bubbling</li>
        <li>Don’t stop it w/o a real need</li>
        <li>we forever deny access to information about events for any outer code</li>
        <li><code>document.addEventListener('click', fn)</code> will not work on document level for stopped bubble events, it might be useful</li>
      </ul>

      <Code block jsx>{`
      <body onclick="alert(\`the bubbling doesn't reach here\`)">
        <button onclick="event.stopPropagation()">Click me</button>
      </body>
      `}</Code>

      <H>e.stopImmediatePropagation()</H>

      <ul>
        <li>stop the bubbling and prevent handlers on the current element</li>
        <li>After it no other handlers execute</li>
        <li>If an el has multiple event handlers on a single event, then even if one of them stops the bubbling, the other ones still execute</li>
        <li>but on the current element all other handlers will run</li>
      </ul>

      <H>Capturing</H>

      <p>Event propagation has 3 phases</p>

      <ul>
        <li><i>Capturing</i> - event goes down to the element</li>
        <li><i>Target</i> – event reached the target element</li>
        <li><i>Bubbling</i> – event bubbles up from the element</li>
      </ul>

      <ul>
        <li>Capturing phase is invisible to us normally</li>
        <li>rarely used in real code</li>
        <li>Capturing path example {'Window -> Document -> <html> -> <body> -> <table> -> <tbody> -> <tr> -> <td>'}</li>
      </ul>

      <p>Capturing path example {'Window -> Document -> <html> -> <body> -> <table> -> <tbody> -> <tr> -> <td>'}</p>

      <Code block jsx>{`
      el.addEventListener('click', fn, { capture: true })
      `}</Code>

      <p>Or..</p>
      <Code block jsx>{`
      el.addEventListener('click', fn, true)
      `}</Code>

      <ul>
        <li>if <code>false</code> (default), then the handler is set on the bubbling phase</li>
        <li>2nd phase (“target phase”: the event reached the element) is not handled separately</li>
        <li>handlers on both capturing and bubbling phases trigger at target phase</li>
      </ul>

      <H>Event delegation</H>

      <ul>
        <li>event delegation - a single handler on their common ancestor</li>
        <li>in the handler we get <code>event.target</code> to see where the event actually happened and handle it</li>
        <li>event must bubble</li>
      </ul>

      <Code block jsx>{`
      document.querySelector('#main').addEventListener('click', (e) => {
        if (!e.target.closest('#main selector')) return
        func()
      })
      `}</Code>

      <p>Highlight cells on click...</p>

      <Code block jsx>{`
      table.onclick = function(e) {
        let td = e.target.closest('td') // we may click on some tag inside td, so we find the nearest td
        if (!td) return // check if was inside any <td>
        if (!table.contains(td)) return // check if it is out table
        highlight(td) // do action
      }
      `}</Code>

      <p>Delegation via custom attributes...</p>

      <Code block jsx>{`
      <div id="menu">
        <button data-action="save">Save</button>
        <button data-action="load">Load</button>
        <button data-action="search">Search</button>
      </div>
      `}</Code>

      <Code block jsx>{`
      class Menu {
        constructor(elem) {
          this._elem = elem
          elem.onclick = this.onClick.bind(this)
        }

        save() { alert('saving') }
        load() { alert('loading') }
        search() { alert('searching') }

        onClick(event) {
          let action = event.target.dataset.action
          if (action) this[action]()
        }
      }

      new Menu(menu)
      `}</Code>

      <p>Another example... increase value on click</p>

      <Code block jsx>{`
      Counter: <input type="button" value="1" data-counter>
      One more counter: <input type="button" value="2" data-counter>
      `}</Code>

      <Code block jsx>{`
      document.addEventListener('click', function(e) {
        if (e.target.dataset.counter != undefined) e.target.value++
      })
      `}</Code>

      <H>e.preventDefault()</H>

      <ul>
        <li>stops default browser actions</li>
        <li>some events flow one into another, if we prevent the first event, there will be no second</li>
        <li>{'mousedown on an <input> field leads to focusing in it, and the focus event'}</li>
        <li>If we prevent the mousedown event, there’s no focus.</li>
        <li>The focusing is still possible with Tab key, But not with the mouse click any more</li>
      </ul>

      <Hs>e.defaultPrevented</Hs>

      <ul>
        <li><code>true</code> if the default action was prevented</li>
        <li>sometimes better to use than stopping bubbling by event.stopPropagation()</li>
        <li>we can use <code>event.defaultPrevented</code> instead, to signal other event handlers that the event was handled</li>
        <li>solution would be to check in the document handler if the default action was prevented</li>
      </ul>

      <Code block jsx>{`
      innerDiv.oncontextmenu = function(e) {
        e.preventDefault()
        alert("innerDiv context menu")
      }

      div.oncontextmenu = function(e) {
        if (e.defaultPrevented) return
        e.preventDefault()
        alert("div context menu")
      }

      outterDiv.oncontextmenu = function(e) {
        if (e.defaultPrevented) return
        e.preventDefault()
        alert("outterDiv context menu")
      }
      `}</Code>

      <H>return false</H>

      <ul>
        <li>stops default browser actions</li>
        <li>prevents the event from propagating (or “bubbling up”) the DOM.</li>
        <li>Stops callback execution and returns immediately when called</li>
      </ul>

      <Code block html>{`
      <ul id="menu" class="menu">
        <li><a href="/html">HTML</a></li>
        <li><a href="/javascript">JavaScript</a></li>
        <li><a href="/css">CSS</a></li>
      </ul>
      `}</Code>

      <Code block jsx>{`
      menu.onclick = function(event) {
        if (event.target.nodeName != 'A') return
        let href = event.target.getAttribute('href')
        alert( href ) // ...can be loading from the server, UI generation etc
        return false // prevent browser action (don't go to the URL)
      }
      `}</Code>

      <H>Custom events</H>

      <Code block jsx>{`
      const event = new Event(type, [options]);
      `}</Code>

      <ul>
        <li>create Event objects</li>
        <li><code>bubbles: true</code> event bubbles, <code>false</code> by default</li>
        <li><code>cancelable: true</code> “default action” may be prevented, <code>false</code> by default</li>
        <li><Code>elem.dispatchEvent(event)</Code> trigger event on an element</li>
        <li>handlers will react on it as if it were a regular browser event</li>
        <li>return <code>false</code> if event is cancelable and any handlers which received event called preventDefault()</li>
      </ul>

      <Code block jsx>{`
      const event = new Event("my-event")
      const event = new Event("click", { bubbles: true, cancelable: true })
      elem.dispatchEvent(event)
      `}</Code>

      <Hs>programmatic event trigger</Hs>

      <Code block jsx>{`
      let event = new Event("click")
      document.querySelector('button').dispatchEvent(event)
      `}</Code>

      <ul>
        <li><code>dispatchEvent</code> is processed immediately, synchronous</li>
      </ul>

      <Code block jsx>{`
      document.addEventListener('hi', () => alert('hi'))
      let textarea = document.querySelector('textarea')
      textarea.addEventListener('click', function () {
        alert(1)
        textarea.dispatchEvent(new CustomEvent("hi", { bubbles: true }))
        alert(2)
      })
      // 1 --> hi --> 2
      `}</Code>

      <Hs>isTrusted</Hs>

      <Code block jsx>{`
      event.isTrusted
      `}</Code>

      <ul>
        <li><code>true</code> for events that come from real user</li>
        <li><code>false</code> for script-generated events</li>
      </ul>

      <Hs>Built-in event classes</Hs>

      <Code block jsx>{`
      new MouseEvent("click")

      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        clientX: 100,
        clientY: 100
      })

      event.clientX // 100
      `}</Code>

      <ul>
        <li>use it instead of <code>new Event</code> </li>
        <li>The right constructor allows to specify standard properties for that type of event</li>
        <li>generic Event constructor does not allow that</li>
        <li>we can work around that by assigning directly <code>event.clientX=100</code></li>
      </ul>

      <p>List of some classes for UI Events...</p>

      <ul>
        <li><Code>new UIEvent()</Code></li>
        <li><Code>new FocusEvent()</Code></li>
        <li><Code>new MouseEvent()</Code></li>
        <li><Code>new WheelEvent()</Code></li>
        <li><Code>new KeyboardEvent()</Code></li>
        <li>others…</li>
      </ul>

      <Hs>Custom event</Hs>

      <Code block jsx>{`
      const helloEvent = new Event("hello", { bubbles: true })
      `}</Code>

      <p>Better way...</p>

      <Code block jsx>{`
      const helloEvent = new CustomEvent("hello", {
        bubbles: true,
        detail: { name: "John" }
      })
      document.querySelector('button').dispatchEvent(helloEvent) // Hello from BUTTON

      document.addEventListener("hello", function(e) {
        alert("Hello from " + e.detail.name + ' ' + e.target.tagName)
      })
      `}</Code>

      <ul>
        <li>We should use <code>addEventListener</code> for our custom events</li>
        <li><code>new CustomEvent</code> allows to add <code>detail</code> property</li>
      </ul>

      <Hs>preventDefault for custom events</Hs>

      <ul>
        <li>new custom events have no default browser action</li>
        <li>but a code that dispatches such event may have own plans what to do after triggering the event</li>
        <li>return <code>false</code> if event is cancelable and any handlers which received event called preventDefault()</li>
      </ul>

      <Code block jsx>{`
      const textarea = document.querySelector('textarea')
      textarea.addEventListener('hide', isPrevented)
      textarea.addEventListener('click', hide)

      function isPrevented(e) {
        if (confirm("Call preventDefault?")) e.preventDefault()
      }

      function hide() {
        const event = new CustomEvent("hide", { cancelable: true })
        if (!textarea.dispatchEvent(event)) {
          alert('The action was prevented by a handler')
          return
        }
        textarea.hidden = true
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
