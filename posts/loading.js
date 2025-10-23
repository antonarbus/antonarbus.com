import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'Content loading in browser',
  date: '2022.06.15',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'loading in browser',
  body: (
    <>
      <H>script</H>

      <ul>
        <li>
          {
            'When the browser loads HTML and comes across a <script>...</script> tag, it can’t continue building the DOM'
          }
        </li>
        <li>{'<script> in HTML executes before continuing building the DOM'}</li>
        <li>{'<script async> does not block DOMContentLoaded event'}</li>
        <li>
          {
            '<script> generated dynamically with document.createElement("script") and then added to the webpage does not block DOMContentLoaded event'
          }
        </li>
      </ul>

      <H>styles</H>

      <ul>
        <li>external style sheets don’t affect DOM, DOMContentLoaded does not wait for them</li>
        <li>
          {
            'but <script> waits for external CSS, DOMContentLoaded waits for CSS in case of a <script>'
          }
        </li>
      </ul>

      <Code block html>{`
        <link type="text/css" rel="stylesheet" href="style.css">
        <script>
          // the script doesn't not execute until the stylesheet is loaded
          alert(getComputedStyle(document.body).marginTop);
        </script>
      `}</Code>

      <H>DOMContentLoaded</H>

      <ul>
        <li>event happens on the document object</li>
        <li>fully loaded HTML + DOM tree is built, but </li>
        <li>{'external resources <img> + css may not yet have loaded'}</li>
        <li>
          {
            'handler runs when the document is loaded, so it can see all the elements, including <img>'
          }
        </li>
        <li>but it doesn’t wait images to load</li>
        <li>we can apply JavaScript to elements at this stage</li>
        <li>{'waits for <script>'}</li>
        <li>{'<script async> does not block DOMContentLoaded event'}</li>
        <li>
          external style sheets don’t affect DOM loading, DOMContentLoaded does not wait for them
        </li>
        <li>
          autofill forms are triggered on DOMContentLoaded, if DOMContentLoaded is postponed by
          long-loading scripts, then autofill also awaits
        </li>
      </ul>

      <Code block jsx>{`
      document.addEventListener("DOMContentLoaded", func)
      // not "document.onDOMContentLoaded = func"

      function func() {
      alert('DOM is ready');
      // image is not yet loaded (unless it was cached), so the size is 0x0
        alert(\`Image size: \${img.offsetWidth}x\${img.offsetHeight}\`);
      }
      `}</Code>

      <H>onload</H>

      <ul>
        <li>event on the window object triggers when the whole page and resources are loaded</li>
        <li>including styles, images and other resources</li>
      </ul>

      <p>Message will show correct sizes...</p>

      <Code block jsx>{`
      window.addEventListener("load", () => {
        alert('Page is fully loaded');
        alert(\`Image size: \${img.offsetWidth}x\${img.offsetHeight}\`);
      })
      `}</Code>

      <H>beforeunload</H>

      <ul>
        <li>triggers before the page leave</li>
        <li>
          If we cancel the event, browser asks whether the user really wants to leave (e.g we have
          unsaved changes)
        </li>
        <li>
          get msg <i>Changes you made may not be saved</i>
        </li>
        <li>
          we can not customize it coz webmasters abused this event handler by showing annoying
          message in the past
        </li>
      </ul>

      <Code block jsx>{`
      window.onbeforeunload = function() {
        return "There are unsaved changes. Leave now?"
      }
      // browser shows 'Changes you made may not be saved.' instead of our text
      `}</Code>

      <p>Same result</p>

      <Code block jsx>{`
      window.onbeforeunload = function() {
        return false
      }
      `}</Code>

      <H>onunload</H>

      <ul>
        <li>When a visitor finally leaving the page, the 'unload' event triggers on window</li>
        <li>
          Naturally, 'unload' event is when the user leaves us, and we’d like to save the data on
          our server
        </li>
        <li>
          in the handler we can only do simple things that do not involve delays or asking a user
        </li>
        <li>
          There exists a special <Code js>navigator.sendBeacon(url, data)</Code> method for such
          needs
        </li>
        <li>
          It sends the data in background. The transition to another page is not delayed: the
          browser leaves the page, but still performs sendBeacon
        </li>
        <li>The request is sent as POST request</li>
        <li>We can send not only a string, but also forms and other formats</li>
        <li>The data is limited by 64kb</li>
      </ul>

      <Code block jsx>{`
      const analyticsData = { /* object with gathered data */ }
      window.addEventListener("unload", function() {
        navigator.sendBeacon("/analytics", JSON.stringify(analyticsData))
      })
      `}</Code>

      <H>readyState</H>

      <ul>
        <li>
          <code>document.readyState</code> property tells us about the current loading state
        </li>
        <code>"loading"</code> the document is loading
        <code>"interactive"</code> the document was fully read
        <code>"complete"</code> the document was fully read and all resources (like images) are
        loaded too
      </ul>

      <Code block jsx>{`
      function work() { /*...*/ }

      if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', work) // still loading, wait for the event
      } else {
        work() // DOM is ready!
      }
      `}</Code>

      <H>readystatechange</H>

      <ul>
        <li>event rarely used</li>
        <li>triggers when the state changes</li>
      </ul>

      <p>Print state changes...</p>

      <Code block jsx>{`
      document.addEventListener('readystatechange', () => console.log(document.readyState))
      `}</Code>

      <H>Events flow</H>

      <ol>
        <li>readyState:loading</li>
        <li>readyState:interactive</li>
        <li>DOMContentLoaded</li>
        <li>iframe onload</li>
        <li>img onload</li>
        <li>readyState:complete</li>
        <li>window onload</li>
      </ol>

      <ul>
        <li>
          <code>document.readyState</code> becomes interactive right before{' '}
          <code>DOMContentLoaded</code>, they are same things
        </li>
        <li>
          <code> document.readyState</code> becomes complete when all resources (iframe and img) are
          loaded
        </li>
        <li>
          it happens in about the same time as <code>img.onload</code> and{' '}
          <code>window.onload</code>
        </li>
        <li>
          switching to complete state means the same as <code>window.onload</code>
        </li>
        <li>
          difference is that <code>window.onload</code> always works after all other load handlers
        </li>
      </ul>

      <H>scripts: async, defer, dynamic</H>

      <ul>
        <li>{'When the browser hits <script> tag, it can’t continue building the DOM'}</li>
        <li>It must execute the script right now</li>
        <li>{'same happens for external scripts <script src="...">'}</li>
        <li>Scripts can’t see DOM elements below them</li>
        <li>bulky script at the top “blocks the page” till script downloads and executes</li>
        <li>{':( for long HTML documents, that may be a noticeable delay'}</li>
        <li>
          we can put a script at the bottom and it doesn’t block the page content from showing
        </li>
        <li>
          {
            '"defer", "async" script attributes that solve the problem, they do not block page rendering'
          }
        </li>
      </ul>

      <Hs>defer</Hs>

      <ul>
        <li>
          The <code>defer</code> attribute tells the browser not to wait for the script
        </li>
        <li>The script loads “in the background”, and then runs when the DOM is fully built</li>
        <li>
          Scripts with <code>defer</code> never block the page
        </li>
        <li>
          Scripts with <code>defer</code> execute when the DOM is ready (but before DOMContentLoaded
          event)
        </li>
        <li>
          <i>DOMContentLoaded</i> event handler waits for the deferred script
        </li>
        <li>
          Deferred scripts execution keep their relative order, even they are downloaded in parallel
        </li>
        <li>
          That's important if we need to load a JavaScript library and some script depends on it
        </li>
        <li>The defer attribute is only for external scripts</li>
        <li>
          <code>defer</code> attribute is ignored if {'<script>'} tag has no <code>src</code>{' '}
          attribute
        </li>
      </ul>

      <Hs>async</Hs>

      <ul>
        <li>
          <span>async</span> attribute is somewhat like <code>defer</code>
        </li>
        <li>
          The <span>async</span> attribute means that a script is completely independent
        </li>
        <li>async scripts load in the background and run when ready</li>
        <li>
          browser doesn’t block on <span>async</span> scripts (like defer)
        </li>
        <li>page content shows up immediately</li>
        <li>
          Other scripts don’t wait for <span>async</span> scripts, and <span>async</span> scripts
          don’t wait for them
        </li>
        <li>
          <i>DOMContentLoaded</i> and async scripts don’t wait for each other
        </li>
        <li>
          <i>DOMContentLoaded</i> may happen both before & after an async script
        </li>
        <li>
          Async scripts are great when we integrate an independent third-party script into the page
          like counters, ads and so on, where our scripts shouldn’t wait for them
        </li>
      </ul>

      <Hs>dynamic</Hs>

      <ul>
        <li>we can create a script and append it to the document dynamically using JavaScript</li>
        <li>
          dynamic scripts behave as <code>async</code> by default
        </li>
        <li>They don’t wait for anything, nothing waits for them</li>
        <li>The script that loads first – runs first</li>
        <li>
          <Code js>script.async = false </Code> scripts will be executed in the document order, just
          like <code>defer</code>
        </li>
      </ul>

      <Code block jsx>{`
      const script = document.createElement('script')
      script.src = "/article/script-async-defer/long.js"
      document.body.append(script)
      `}</Code>

      <Hs>In practice</Hs>

      <ul>
        <li>
          <code>defer</code> is used for scripts that need the whole DOM and/or their relative
          execution order is important
        </li>
        <li>
          <code>async</code> is used for independent scripts, like counters or ads
        </li>
        <li>
          By using <code>defer</code> or <code>async</code> you let a user see the the page before
          the script loads
        </li>
        <li>
          Don’t forget to put “loading” indication and disable buttons that aren’t functional yet.
        </li>
      </ul>

      <H>load & error</H>

      <ul>
        <li>may track the loading of external resources – scripts, iframes, pictures and so on.</li>
        <li>triggers after the script was loaded and executed</li>
        <li>For our own scripts we could use JavaScript 'modules' here</li>
        <li>but for external</li>
        <li>Errors that occur during the loading of the script can be tracked in an error event</li>
        <li>Events onload/onerror track only the loading itself.</li>
        <li>To track script errors, window.onerror global handler can be used</li>
        <li>Most resources start loading when they are added to the document.</li>
        <li>{'But <img> is an exception. It starts loading when it gets a src'}</li>
        <li>
          {
            'For <iframe>, the iframe.onload event triggers when the iframe loading finished both for successful load and in case of an error, that’s for historical reasons'
          }
        </li>
      </ul>

      <Code block jsx>{`
      let img = document.createElement('img')
      img.src = "https://js.cx/clipart/train.gif" // 
      img.onload = function() { alert(\`Image loaded, size \${img.width}x\${img.height}\`) }
      img.onerror = function() { alert("Error occurred while loading image") }
      `}</Code>

      <H>crossorigin</H>

      <ul>
        <li>scripts from one site can’t access contents of the other site</li>
        <li>
          actually, one origin (domain/port/protocol triplet) can’t access the content from another
          one.
        </li>
        <li>
          if we have a subdomain, or just another port, these are different origins with no access
          to each other
        </li>
        <li>we can’t get error details for a script from another domain</li>
        <li>
          {
            'To allow cross-origin access, the <script> needs to have the "crossorigin" attribute &  remote server must provide special headers'
          }
        </li>
        <li>There are three levels of cross-origin access:</li>
        <ol>
          <li>
            No <code>crossorigin</code> attribute – access prohibited
          </li>
          <li>
            <code>crossorigin="anonymous"</code> – access allowed if the server responds with the
            header <i>'Access-Control-Allow-Origin'</i> with <code>*</code> or our origin
          </li>
          <li>
            <code>crossorigin="use-credentials"</code> – access allowed if the server sends back the
            header <i>'Access-Control-Allow-Origin'</i> with our origin and{' '}
            <code>Access-Control-Allow-Credentials: true</code>. Browser sends authorization
            information and cookies to remote server.
          </li>
        </ol>
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
