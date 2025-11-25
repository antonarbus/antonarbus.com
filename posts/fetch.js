'use client'


import { Code, H, Hs, Lnk, jsxToStr, LazyImg } from '/components/post/reExport'

async function fetchPage() {
  const response = await fetch('/posts/fetch') // resolves with response headers
  const result = await response.text()
  console.log(result)
  return result
}

const FetchPage = () => <button onClick={fetchPage}>fetch this page content and put into console</button>

const postObj = {
  title: 'fetch',
  date: '2022.06.18',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/fetch.png',
  desc: 'fetch api in JavaScript',
  body: (
    <>
      <H>fetch()</H>

      <Code block jsx>{`
      const response = await fetch(url, options) // resolves with response headers
      const result = await response.json()
      `}</Code>

      <ul>
        <li>does network requests from JavaScript</li>
        <li>w/o options, it is a GET request, downloading the contents of the url</li>
        <li>fetch resolves with an object of the built-in <code>Response</code> class as soon as the server responds with headers</li>
        <li>At this stage we can check HTTP status, to see whether it is successful or not, check headers, but don’t have the body yet</li>
        <li>Abnormal HTTP-statuses, such as 404 or 500 do not cause an error</li>
        <li>to get the response body, we need to use an additional method call</li>
      </ul>

      <FetchPage />

      <Code block jsx>{`
      async function fetchPage() {
        const response = await fetch('/posts/fetch')
        const result = await response.text()
        console.log(result)
      }

      const FetchPage = () => <button onClick={fetchPage}>fetch this page content and put into console</button>
      
      <FetchPage />
      `}</Code>

      <H>Without <code>await</code></H>

      <Code block jsx>{`
      fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
        .then(response => response.json())
        .then(commits => alert(commits[0].author.login))
      `}</Code>

      <H>Response</H>

      <ul>
        <li><code>response.status</code> HTTP status code, e.g. 200</li>
        <li><code>response.ok</code> boolean, true if the HTTP status code is 200-299</li>
        <li><code>response.body</code> <i>ReadableStream</i> object, it allows you to read the body chunk-by-chunk</li>
        <li><code>response.text()</code> read the response and return as text</li>
        <li><code>response.json()</code> parse the response as JSON</li>
        <li>can choose only one body-reading method</li>
        <li><code>response.formData()</code> return the response as <i>FormData</i> object</li>
        <li><code>response.blob()</code> return the response as <i>Blob</i> (binary data with type)</li>
        <li><code>response.arrayBuffer()</code> return the response as <i>ArrayBuffer</i> (low-level representation of binary data)</li>
      </ul>

      <Code block jsx>{`
      const url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits'
      const response = await fetch(url)
      if (!response.ok) throw new Error("HTTP-Error: " + response.status) // if HTTP-status is 200-299
      const json = await response.json() // read response body and parse as JSON
      console.log(json[0].author.login)
      `}</Code>

      <H>Show image in Binary</H>

      <Code block jsx>{`
      const url = 'https://i.insider.com/5ec6a5772618b94ebe726e95'
      const response = await fetch(url)
      console.log(response)
      let blob = await response.blob() // download as Blob object
      let img = document.createElement('img')
      img.style = 'position:fixed; top:50px; left:50px; width:300px'
      document.body.append(img)
      img.src = URL.createObjectURL(blob) // show it
      `}</Code>

      <H>One body-reading method</H>

      <Code block jsx>{`
      let text = await response.text(); // response body consumed
      let parsed = await response.json(); // fails (already consumed)
      `}</Code>

      <H>response.headers</H>

      <ul>
        <li>response headers are available in a Map-like headers object in <code>response.headers</code></li>
        <li>it’s not exactly a Map, but it has similar methods</li>
      </ul>

      <Code block jsx>{`
      let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
      // get one header
      console.log(response.headers.get('Content-Type')) // application/json; charset=utf-8
      // iterate over all headers
      for (let [key, value] of response.headers) {
        console.log(\`\${key} = \${value}\`)
      }
      `}</Code>

      <H>request.headers</H>

      <ul>
        <li>To set a request header in fetch, we can use the headers option</li>
        <li>It has an object with outgoing headers, like this</li>
      </ul>

      <Code block jsx>{`
      let response = fetch(protectedUrl, {
        headers: {
          Authentication: 'secret'
        }
      })
      `}</Code>

      <p>List of forbidden HTTP headers which we can not set: <code>Accept-Charset</code>, <code>Accept-Encoding</code>, <code>Access-Control-Request-Headers</code>, <code>Access-Control-Request-Method</code>, <code>Connection</code>, <code>Content-Length</code>, <code>Cookie</code>, <code>Cookie2</code>, <code>Date</code>, <code>DNT</code>, <code>Expect</code>, <code>Host</code>, <code>Keep-Alive</code>, <code>Origin</code>, <code>Referer</code>, <code>TE</code>, <code>Trailer</code>, <code>Transfer-Encoding</code>, <code>Upgrade</code>, <code>Via</code>, <code>Proxy-*</code>, <code>Sec-*</code> </p>

      <H>POST request</H>

      <ul>
        <li>To make a POST request, or a request with another method, we need to use fetch options</li>
      </ul>

      <p><code>Content-Type</code> is usually...</p>

      <ul>
        <li><code>{"'Content-Type': 'text/plain;charset=UTF-8'"}</code> for string request body, default</li>
        <li><code>{"'Content-Type': 'application/json;charset=utf-8'"}</code> for json request body</li>
        <li><code>{"'Content-Type': 'multipart/form-data'"}</code> for form data</li>
      </ul>

      <Code block jsx>{`
      let user = { name: 'John', surname: 'Smith' }
      
      let response = await fetch('/article/fetch/post/user', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
      })
      let result = await response.json()
      console.log(result.message)
      `}</Code>

      <p>Request body can be...</p>

      <ul>
        <li>a string (e.g. JSON-encoded), used most of the times</li>
        <li><i>FormData</i> object, to submit the data as form/multipart</li>
        <li><i>Blob/BufferSource</i> to send binary data</li>
        <li><i>URLSearchParams</i>, to submit the data in x-www-form-urlencoded encoding, rarely used</li>
      </ul>

      <H>Send an image as blob</H>

      <ul>
        <li>can submit binary data with fetch using Blob or BufferSource objects</li>
        <li>{'there’s a <canvas> where we can draw by moving a mouse over it'}</li>
        <li>note, we don’t set <i>Content-Type</i> header manually, because a <i>Blob</i> object has a built-in type</li>
        <li><i>image/png</i>, as generated by <code>toBlob</code></li>
        <li>For <i>Blob</i> objects that type becomes the value of <i>Content-Type</i></li>
      </ul>

      <Code block html>{`
      <body style="margin:0">
      <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>
      <input type="button" value="Submit" onclick="submit()">
      `}</Code>

      <Code block jsx>{`
      canvasElem.onmousemove = function(e) {
        let ctx = canvasElem.getContext('2d')
        ctx.lineTo(e.clientX, e.clientY)
        ctx.stroke()
      }
  
      async function submit() {
        let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'))
        let response = await fetch('/article/fetch/post/image', {
          method: 'POST',
          body: blob
        })
  
        // the server responds with confirmation and the image size
        let result = await response.json()
        console.log(result.message)
      }
      `}</Code>

      <H>FormData</H>

      <ul>
        <li>it is an object to represent HTML form data, which can be sent with fetch as a body</li>
        <li>from the server point of view, that looks like a usual form submission</li>
        <li>if HTML form element is provided, it automatically captures its fields</li>
      </ul>

      <Code block html>{`
      <form id="formElem">
        <input type="text" name="name" value="John">
        <input type="text" name="surname" value="Smith">
        <input type="submit">
      </form>
      `}</Code>

      <Code block jsx>{`
      const formData = new FormData([form])
      formElem.onsubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/article/formdata/post/user', {
          method: 'POST',
          body: new FormData(formElem)
        })
        const result = await response.json()
        console.log(result.message) // User saved
      }
      `}</Code>

      <Hs>FormData methods</Hs>

      <ul>
        <li><Code js>formData.append(name, value)</Code> add a form field with the given name and value</li>
        <li><Code js>formData.append(name, blob, fileName)</Code> add a field as if it were {'<input type="file">'}, the third argument fileName sets file name (not form field name), as it were a name of the file in user’s filesystem</li>
        <li><Code js>formData.delete(name)</Code> remove the field with the given name</li>
        <li><Code js>formData.get(name)</Code> get the value of the field with the given name</li>
        <li><Code js>formData.has(name)</Code> if there exists a field with the given name, returns <code>true</code>, otherwise <code>false</code></li>
        <li><Code js>formData.set(name, value)</Code> difference is that .set removes all fields with the given name, and then appends a new field, it makes sure there’s only one field with such name</li>
        <li><Code js>formData.set(name, blob, fileName)</Code> same</li>
      </ul>

      <Code block jsx>{`
      for(let [name, value] of formData) {
        console.log(\`\${name} = \${value}\`) 
        // key1 = value1
        // key2 = value2
      }
  
      formData.forEach((x, y, z) => console.log(x,y,z)) 
      // value1 key1 FormData{}
      // value2 key2 FormData{}
      `}</Code>

      <H>File in a form</H>

      <ul>
        <li>The form is always sent as <code>{"'Content-Type': 'multipart/form-data'"}</code></li>
        <li>this encoding allows to send files</li>
      </ul>

      <Code block html>{`
      <form id="formElem">
        <input type="text" name="firstName" value="John">
        Picture: <input type="file" name="picture" accept="image/*">
        <input type="submit">
      </form>
      `}</Code>

      <Code block jsx>{`
      formElem.onsubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/article/formdata/post/user-avatar', {
          method: 'POST',
          body: new FormData(formElem)
        })
        const result = await response.json()
        alert(result.message) // User with picture, firstName: John, picture size:185123
      }
      `}</Code>

      <H>Blob in a form</H>

      <ul>
        <li>convenient to send an image as a part of the form, with additional fields, such as “name” and other metadata</li>
        <li>example submits an image from {'<canvas>'}, along with some other fields, as a form, using FormData</li>
      </ul>

      <Code block html>{`
      <body style="margin:0">
        <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>
        <input type="button" value="Submit" onclick="submit()">
      </body>
      `}</Code>

      <Code block jsx>{`
      canvasElem.onmousemove = function(e) {
        let ctx = canvasElem.getContext('2d')
        ctx.lineTo(e.clientX, e.clientY)
        ctx.stroke()
      }
  
      async function submit() {
        let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'))
        let formData = new FormData()
        formData.append("firstName", "John")
        formData.append("image", imageBlob, "image.png")
        let response = await fetch('/article/formdata/post/image-form', {
          method: 'POST',
          body: formData
        })
        let result = await response.json()
        alert(result.message)
      }
      `}</Code>

      <H>Download progress</H>

      <ul>
        <li><code>response.body</code> is an object of <i>ReadableStream</i> class and gives full control over the reading process</li>
        <li>it provides body chunk-by-chunk, as it comes</li>
        <li>no way to track upload progress</li>
      </ul>

      <ul>
        <li>instead of response.json() or other methods we obtain a reader </li>
        <li>we can’t use both these methods to read the same response</li>
        <li>then we get total length, it may be absent for cross-origin requests, but usually it’s at place</li>
        <li>then we read the data and add body chunks into the array</li>
        <li><code>done</code> is <code>true</code> for the last chunk</li>
        <li><code>value</code> is <i>Uint8Array</i> of the chunk bytes</li>
        <li>after the response is consumed, we won’t be able to “re-read” it using <code>response.json()</code> or another way</li>
        <li>then concatenate chunks into single <i>Uint8Array</i></li>
        <li>then we need to create a string from <code>chunksAll</code> byte array</li>
        <li>finally parse it into JSON</li>
      </ul>

      <Code block jsx>{`
      // Step 1: start the fetch
      const response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100')
      const reader = response.body.getReader()

      // Step 2: get total length
      const contentLength = +response.headers.get('Content-Length')

      // Step 3: read the data
      let receivedLength = 0 // received that many bytes at the moment
      let chunks = [] // array of received binary chunks (comprises the body)
      while(true) {
        const {done, value} = await reader.read()
        if (done) break
        chunks.push(value)
        receivedLength += value.length
        console.log(\`Received \${receivedLength} of \${contentLength}\`)
      }

      // Step 4: concatenate chunks into single Uint8Array
      let chunksAll = new Uint8Array(receivedLength)
      let position = 0
      for(let chunk of chunks) {
        chunksAll.set(chunk, position)
        position += chunk.length
      }

      // Step 5: decode into a string
      let result = new TextDecoder("utf-8").decode(chunksAll)

      // We're done!
      let commits = JSON.parse(result)
      console.log(commits[0].author.login)
      `}</Code>

      <p>Binary content instead of a string... just replace steps 4 and 5 with a single line that creates a <i>Blob</i> from chunks.</p>

      <Code block jsx>{`
      let blob = new Blob(chunks)
      `}</Code>

      <H>Abort object</H>

      <ul>
        <li>fetch returns a promise, no concept to abort it</li>
        <li>there is a special object <code>new AbortController()</code> that allows to abort asynchronous tasks</li>
        <li><Code js>const controller = new AbortController()</Code></li>
        <li><Code js>controller.abort()</Code> abort!</li>
        <li><Code js>controller.signal</Code> emits the "abort" event</li>
        <li><Code js>controller.signal.aborted</Code> property becomes <code>true</code></li>
      </ul>

      <p>The party that performs a cancelable operation gets the "signal" object and sets the listener to trigger when <code>controller.abort()</code> is called.</p>

      <Code block jsx>{`
      const signal = controller.signal
      signal.addEventListener('abort', () => alert("abort!"))
      `}</Code>

      <Hs>Abort fetch request</Hs>

      <ul>
        <li>to cancel fetch, pass the <code>signal</code> property of an <i>AbortController</i> as a fetch option</li>
        <li>fetch will listen to abort events on signal</li>
        <li>when a fetch is aborted, its promise rejects with an error <i>AbortError</i></li>
        <li>so we should handle it, e.g. in <code>try..catch</code></li>
        <li><i>AbortController</i> allows to cancel multiple fetches at once</li>
      </ul>

      <Code block jsx>{`
      let controller = new AbortController()
      // abort in 1 second
      setTimeout(() => controller.abort(), 1000)

      try {
        let response = await fetch('/article/fetch-abort/demo/hang', {
          signal: controller.signal
        })
      } catch(err) {
        if (err.name == 'AbortError') { // handle abort()
          alert("Aborted!")
        } else {
          throw err
        }
      }
      `}</Code>

      <p>Abort multiple fetches...</p>

      <Code block jsx>{`
      const urls = ['url1', 'url2', 'url3']
      const controller = new AbortController()

      const fetchJobs = urls.map(url => fetch(url, {
        signal: controller.signal
      }))

      const results = await Promise.all(fetchJobs)
      controller.abort() // if called from anywhere, it aborts all fetches
      `}</Code>

      <p>Abort asynchronous task together with fetches...</p>

      <Code block jsx>{`
      const urls = ['url1', 'url2', 'urlN'] 
      const controller = new AbortController()
      const ourJob = new Promise((resolve, reject) => {
        //...
        controller.signal.addEventListener('abort', reject)
      })

      const fetchJobs = urls.map(url => fetch(url, {
        signal: controller.signal
      }))

      const results = await Promise.all([...fetchJobs, ourJob])
      `}</Code>

      <H>Fetch API</H>

      <ul>
        <li><Lnk path='https://javascript.info/fetch'>https://javascript.info/fetch</Lnk></li>
        <li>Most of these options are used rarely</li>
      </ul>

      <Code block jsx>{`
      const promise = fetch(url, {
        method: "GET", // POST, PUT, DELETE, etc
        headers: {
          // the content type header value is usually auto-set depending on the request body
          "Content-Type": "text/plain;charset=UTF-8"
        },
        body: undefined, // string, FormData, Blob, BufferSource, or URLSearchParams
        referrer: "about:client", // or "" to send no Referer header, or an url from the current origin
        referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
        // This option may be useful when the URL for fetch comes from a 3rd-party
        mode: "cors", // same-origin, no-cors
        // whether fetch should send cookies and HTTP-Authorization headers with the request
        credentials: "same-origin", // omit, include
        // The cache options allows to ignore HTTP-cache or fine-tune its usage
        cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
        // Normally, fetch transparently follows HTTP-redirects, like 301, 302 etc.
        // The redirect option allows to change that: "follow" – the default, follow HTTP-redirects, "error" – error in case of HTTP-redirect, "manual" – allows to process HTTP-redirects manually.
        redirect: "follow", // manual, error
        // The integrity option allows to check if the response matches the known-ahead checksum.
        // Then fetch will calculate SHA-256 on its own and compare it with our string
        // In case of a mismatch, an error is triggered.
        integrity: "", // a hash, like "sha256-abcdef1234567890"
        // We can use the window.onunload event normally associated network requests are aborted
        // keepalive option tells the browser to perform the request in the background, even after it leaves the page
        keepalive: false, // true
        signal: undefined, // AbortController to abort request 
        window: window // null
      })
      `}</Code>

      <H>Long polling</H>

      <ul>
        <li>simplest way of having persistent connection with server</li>
        <li>no need to periodically request info, which is good performance wise</li>
        <li>no delay in messaging</li>
        <li>a request is sent from browser to the server</li>
        <li>connection hangs, the server doesn’t close the connection until it has a message to send</li>
        <li>when a message appears the server responds to the request with it</li>
        <li>connection is closed</li>
        <li>the browser makes a new request immediately</li>
        <li>and so on...</li>
        <li>long polling works great in situations when messages are rare</li>
        <li><code>subscribe()</code> function makes a fetch, then waits for the response, handles it and calls itself again</li>
        <li>server should be ok with many pending connections</li>
      </ul>

      <Code block jsx>{`
      async function subscribe() {
        let response = await fetch("/subscribe")
      
        if (response.status == 502) {
          // Status 502 is a connection timeout error,
          // may happen when the connection was pending for too long,
          // and the remote server or a proxy closed it
          // let's reconnect
          await subscribe()
        } else if (response.status != 200) {
          // An error - let's show it
          showMessage(response.statusText)
          // Reconnect in one second
          await new Promise(resolve => setTimeout(resolve, 1000));
          await subscribe()
        } else {
          // Get and show the message
          let message = await response.text()
          showMessage(message)
          // Call subscribe() again to get the next message
          await subscribe()
        }
      }
      
      subscribe()
      `}</Code>

      <H>Fetch not catching some errors</H>

      <p>For ex. it does not throw an 403 error and you need to manually check the response.</p>

      <LazyImg path='/imgs/network_error_with_fetch.jpg' />

      <p>Axios just throws an error.</p>

      <LazyImg path='/imgs/network_error_with_axios.jpg'/>
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
