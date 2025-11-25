'use client'


import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'XMLHttpRequest',
  date: '2022.06.20',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'XMLHttpRequest in JavaScript',
  body: (
    <>
      <ul>
        <li>XMLHttpRequest is a built-in browser object that allows to make HTTP requests in JavaScript</li>
        <li>Can operate on any data, not only in XML</li>
        <li>Can upload/download files, track progress and much more</li>
        <li><Lnk path='/posts/fetch'>Fetch</Lnk> somewhat deprecates XMLHttpRequest</li>
      </ul>

      <H>Used for</H>

      <ul>
        <li>support existing scripts with XMLHttpRequest</li>
        <li>support old browsers</li>
        <li>need something that fetch can’t do yet, e.g. to track upload progress</li>
      </ul>

      <H>Create</H>

      <Code block jsx>{`
      const xhr = new XMLHttpRequest() // create
      xhr.open(method, URL, [async, user, password]) // initialize 
      xhr.open('GET', 'https://google.com') 
      `}</Code>

      <ul>
        <li><code>method</code> HTTP-method. Usually "GET" or "POST"</li>
        <li><code>URL</code> the URL to request, a string, can be URL object</li>
        <li><code>async</code> if explicitly set to false, then the request is synchronous, we’ll cover that a bit later</li>
        <li><code>user</code>, <code>password</code> login and password for basic HTTP auth (if required)</li>
      </ul>

      <Code block jsx>{`
      const url = new URL('https://google.com/search')
      url.searchParams.set('q', 'test me!') // https://google.com/search?q=test+me%21
      xhr.open('GET', url) 
      `}</Code>

      <H>Start connection</H>

      <Code block jsx>{`
      xhr.send([body])
      `}</Code>

      <ul>
        <li><code>body</code> parameter contains the request body</li>
        <li>Some request methods like GET do not have a body</li>
      </ul>

      <H>Events for response</H>

      <ul>
        <li>Listen to xhr events for response, events are the most widely used</li>
        <li><i>{"'load'"}</i> request is complete (even if HTTP status is like 400 or 500), and the response is fully downloaded</li>
        <li><i>{"'error'"}</i> request couldn’t be made, e.g. network down or invalid URL.</li>
        <li><i>{"'progress'"}</i> triggers periodically while the response is being downloaded, reports how much has been downloaded.</li>
        <li><i>{"'readystatechange'"}</i> old event, do not use it</li>
      </ul>

      <H>Properties</H>

      <ul>
        <li><Code>xhr.status</Code> HTTP status code (a number): 200, 404, 403 and so on, can be 0 in case of a non-HTTP failure</li>
        <li><Code>xhr.statusText</Code> HTTP status message: usually 'OK' for 200, 'Not Found' for 404, 'Forbidden' for 403 and so on</li>
        <li><Code>xhr.response</Code> server response body</li>
        <li><Code>xhr.responseText</Code> same, used in old scripts</li>
        <li><Code>xhr.responseXML</Code> used in old scripts</li>
        <li><Code>xhr.timeout = 10000</Code> timeout in ms, if the request does not succeed in 10s, it gets canceled and timeout event triggers</li>
        <li><Code>xhr.responseType = ''</Code> property to set the response format, get as string - (default)</li>
        <li><Code>xhr.responseType = 'text'</Code> get as string</li>
        <li><Code>xhr.responseType = 'arraybuffer'</Code> get as ArrayBuffer (for binary data)</li>
        <li><Code>xhr.responseType = 'blob'</Code> get as Blob (for binary data)</li>
        <li><Code>xhr.responseType = 'document'</Code> get as XML document (can use XPath and other XML methods) or HTML document (based on the MIME type of the received data)</li>
        <li><Code>xhr.responseType = 'json'</Code> get as JSON (parsed automatically)</li>
        <li><Code>xhr.readyState</Code> XMLHttpRequest changes between states as it progresses</li>
        <li><Code js>xhr.setRequestHeader(name, value)</Code> sets the request header with the given name and value</li>
        <li><Code js>xhr.getResponseHeader(name)</Code> gets the response header with the given name (except Set-Cookie and Set-Cookie2)</li>
        <li><Code js>xhr.getAllResponseHeaders()</Code> returns all response headers, except Set-Cookie and Set-Cookie2</li>
        <li><Code js>xhr.withCredentials = true</Code> send cookies and HTTP-authorization to another origin</li>
      </ul>

      <H>Examples</H>

      <Code block jsx>{`
      const xhr = new XMLHttpRequest() // 1. Create a new XMLHttpRequest object
      xhr.open('GET', '/article/xmlhttprequest/example/load') // 2. Configure it: GET-request for the URL /article/.../load
      xhr.send() // 3. Send the request over the network
      xhr.onload = function() { // 4. This will be called after the response is received
        if (xhr.status != 200) { // analyze HTTP status of the response
          alert(\`Error \${xhr.status}: \${xhr.statusText}\`); return; // e.g. 404: Not Found
        } 
        
        alert(\`Done, got \${xhr.response.length} bytes\`) // response is the server response
        // get the response from xhr.response
      }

      xhr.onprogress = function(event) {
        if (event.lengthComputable) {
          alert(\`Received \${event.loaded} of \${event.total} bytes\`)
        } else {
          alert(\`Received \${event.loaded} bytes\`) // no Content-Length
        }
      }

      xhr.onerror = function() {
        alert("Request failed")
      }
      `}</Code>

      <Code block jsx>{`
      const xhr = new XMLHttpRequest()
      xhr.open('GET', '/article/xmlhttprequest/example/json')
      xhr.responseType = 'json'
      xhr.send()
      xhr.onload = function() {
        let responseObj = xhr.response // {"message": "Hello, world!"}
        alert(responseObj.message) // Hello, world!
      }
      `}</Code>

      <H>xhr.readyState</H>

      <p><Code>xhr.readyState</Code> XMLHttpRequest changes between states as it progresses</p>

      <ul>
        <li><Code>xhr.readyState = 0</Code> initial state</li>
        <li><Code>xhr.readyState = 1</Code> open called</li>
        <li><Code>xhr.readyState = 2</Code> response headers received</li>
        <li><Code>xhr.readyState = 3</Code> response is loading (a data packet is received)</li>
        <li><Code>xhr.readyState = 4</Code> request complete</li>
        <li>We can track state using readystatechange event</li>
        <li>It is an old approach, do not use it</li>
      </ul>

      <Code block jsx>{`
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 3) {
          // loading
        }
        if (xhr.readyState == 4) {
          // request finished
        }
      }
      `}</Code>

      <Code block jsx>{`
      const xhr = new XMLHttpRequest();
  
      xhr.onreadystatechange = () => {
        switch (xhr.readyState) {
          case 0:
            // UNSENT, Client has been created. open() not called yet.
            console.log('0 UNSENT', xhr.statusText);
            break;
          case 1:
            // OPENED, open() has been called.
            console.log('1 OPENED', xhr.statusText);
            break;
          case 2:
            // HEADERS_RECEIVED, send() has been called, and headers and status are available.
            console.log('2 HEADERS_RECEIVED', xhr.statusText);
            break;
          case 3:
            // LOADING, Downloading; responseText holds partial data.
            console.log('3 LOADING', xhr.statusText);
            console.log('interactive... ' + xhr.responseText.length + ' bytes.');
            break;
          case 4:
            // DONE, The operation is complete.
            console.log('4 DONE', xhr.statusText);
      
            const header = xhr.getResponseHeader('Content-Type');
            const headers = xhr.getAllResponseHeaders();
      
            if (xhr.status == 200 || xhr.status == 304) {
              var data = xhr.responseText;
              console.log('COMPLETE!');
              console.dir(data);
            } else {
              console.log('Failed. HttpStatus: ' + xhr.statusText);
            }
            break;
        }
      };
      xhr.withCredentials = true;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.open('GET', '/server');
      xhr.send(null);
      `}</Code>

      <H>Synchronous requests</H>

      <ul>
        <li>3rd param 'async' is set to 'false', the request is made synchronously</li>
        <li>JavaScript pauses at send() and resumes when the response is received</li>
      </ul>

      <Code block jsx>{`
      const xhr = new XMLHttpRequest()
      xhr.open('GET', '/article/xmlhttprequest/hello.txt', false)

      try {
        xhr.send()
        if (xhr.status != 200) {
          alert(\`Error \${xhr.status}: \${xhr.statusText}\`)
        } else {
          alert(xhr.response)
        }
      } catch(err) { // instead of onerror
        alert("Request failed")
      }
      `}</Code>

      <H>HTTP-headers</H>

      <Hs>setRequestHeader</Hs>

      <Code block jsx>{`
      xhr.setRequestHeader(name, value)
      `}</Code>

      <ul>
        <li>Sets the request header with the given name and value.</li>
        <li>Several headers are managed exclusively by the browser, e.g. 'Referer' and 'Host'</li>
        <li>Once the header is set, it’s set, can not overwrite it after</li>
      </ul>

      <Code block jsx>{`
      xhr.setRequestHeader('Content-Type', 'application/json')
      `}</Code>

      <Hs>getResponseHeader</Hs>

      <Code block jsx>{`
      xhr.getResponseHeader(name)
      `}</Code>

      <p>Gets the response header with the given name (except Set-Cookie and Set-Cookie2).</p>

      <Code block jsx>{`
      xhr.getResponseHeader('Content-Type')
      `}</Code>

      <Hs>getAllResponseHeaders</Hs>

      <ul>
        <li>Returns all response headers, except Set-Cookie and Set-Cookie2</li>
        <li>Headers are returned as a single line</li>
        <li>The line break between headers is always "\r\n"</li>
        <li>we can easily split it into individual headers</li>
        <li>The separator between the name and the value is always a colon followed by a space ": "</li>
      </ul>

      <Code block jsx>{`
      let headers = xhr
        .getAllResponseHeaders()
        .split('\r\n')
        .reduce((result, current) => {
          let [name, value] = current.split(': ')
          result[name] = value
          return result
        }, {}) 
      // headers['Content-Type'] = 'image/png'
      `}</Code>

      <H>POST with FormData</H>

      <p>To make a POST request, we can use the built-in FormData object.</p>

      <Code block html>{`
      <form name="person">
        <input name="name" value="John">
        <input name="surname" value="Smith">
      </form>
      `}</Code>

      <Code block jsx>{`
      const formData = new FormData(document.forms.person) // pre-fill FormData from the form
      formData.append("middle", "Lee") // add one more field
      const xhr = new XMLHttpRequest()
      xhr.open("POST", "/article/xmlhttprequest/post/user")
      xhr.send(formData)
      xhr.onload = () => alert(xhr.response)

      // The form is sent with multipart/form-data encoding
      // if we like JSON, then JSON.stringify and send as a string
      const xhr = new XMLHttpRequest()
      const json = JSON.stringify({ name: "John", surname: "Smith" })
      xhr.open("POST", '/submit')
      xhr.setRequestHeader('Content-type', 'application/json charset=utf-8')
      xhr.send(json)

      // send(body) method can send almost any body, including Blob and BufferSource objects
      `}</Code>

      <H>Upload progress</H>

      <ul>
        <li><code>xhr.upload</code> generates events and triggers them on uploading</li>
        <li><code>xhr.upload = 'loadstart'</code> upload started</li>
        <li><code>xhr.upload = 'progress'</code> triggers periodically during the upload</li>
        <li><code>xhr.upload = 'abort'</code> upload aborted</li>
        <li><code>xhr.upload = 'error'</code> non-HTTP error</li>
        <li><code>xhr.upload = 'load'</code> upload finished successfully</li>
        <li><code>xhr.upload = 'timeout'</code> upload timed out (if timeout property is set)</li>
        <li><code>xhr.upload = 'loadend'</code> upload finished with either success or error</li>
      </ul>

      <Code block jsx>{`
      xhr.upload.onprogress = (e) => alert(\`Uploaded \${e.loaded} of \${e.total} bytes\`)
      xhr.upload.onload = () => alert(\`Upload finished successfully.\`)
      xhr.upload.onerror = () => alert(\`Error during the upload: \${xhr.status}\`)
      `}</Code>

      <Code block html>{`
      <input type="file" onchange="upload(this.files[0])">
      `}</Code>

      <Code block jsx>{`
      function upload(file) {
        let xhr = new XMLHttpRequest()

        // track upload progress
        xhr.upload.onprogress = function(e) {
          console.log(\`Uploaded \${e.loaded} of \${e.total}\`)
        }

        // track completion: both successful or not
        xhr.onloadend = function() {
          if (xhr.status == 200) {
            console.log("success")
          } else {
            console.log("error " + this.status)
          }
        }

        xhr.open("POST", "/article/xmlhttprequest/post/upload")
        xhr.send(file)
      }
      `}</Code>

      <H>Cross-origin requests</H>

      <ul>
        <li><i>XMLHttpRequest</i> can make cross-origin requests, using the same CORS policy as fetch</li>
        <li>Just like fetch, it doesn’t send cookies and HTTP-authorization to another origin by default</li>
        <li>To enable them, set xhr.withCredentials to true</li>
      </ul>

      <Code block jsx>{`
      const xhr = new XMLHttpRequest()
      xhr.withCredentials = true
      xhr.open('POST', 'http://anywhere.com/request')
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
