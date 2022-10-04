import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

function FetchComponent() {
  return (
    <div>
      <button onClick={fetchPage}>Fetch this page content and put into console</button>
    </div>
  )
}

async function fetchPage() {
  const response = await fetch('/posts/fetch') // resolves with response headers
  const result = await response.text()
  console.log(result)
}

const postObj = {
  title: 'CORS',
  date: '2022.06.18',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/fetch.png',
  desc: 'fetch api in JavaScript',
  body: (
    <>
      <H>Cross-Origin requests</H>

      <ul>
        <li>fetch request to another web-site probably fails</li>
        <li><i>origin</i> – a domain/port/protocol</li>
        <li><i>Cross-origin requests</i> are sent to another domain (even a subdomain) or protocol or port</li>
        <li>Cross-origin requests are allowed, but with explicit allowance by the server, expressed in special headers</li>
        <li>that policy is called <i>CORS</i>: <b>C</b>ross-<b>O</b>rigin <b>R</b>esource <b>S</b>haring</li>
        <li>CORS exists to protect the internet from  hackers</li>
        <li>There are two types of cross-origin requests: safe requests & all others</li>
      </ul>

      <H>Safe requests</H>

      <ul>
        <li>A request is safe if it satisfies two conditions...</li>
        <li>has one of methods: GET or POST or HEAD</li>
        <li>allowed custom headers: <code>Accept</code>, <code>Accept-Language</code>, <code>Content-Language</code>, <code>Content-Type</code> with the value <code>application/x-www-form-urlencoded</code>, <code>multipart/form-data</code> or <code>text/plain</code></li>
        <li>'safe' requests are sent right away, with the Origin header</li>
        <li>For requests w/o credentials (not sent by default), the server sets: <code>Access-Control-Allow-Origin</code> to <code>*</code> or same value as <code>Origin</code></li>
        <li>For requests with credentials, the server should set: <code>Access-Control-Allow-Origin</code> to same value as <code>Origin</code> and <code>Access-Control-Allow-Credentials</code> to <code>true</code></li>
        <li>JS automatically get access to response headers  <code>Cache-Control</code>, <code>Content-Language</code>, <code>Content-Type</code>, <code>Expires</code>, <code>Last-Modified</code> or <code>Pragma</code></li>
        <li>Additional headers should be listed by server in <code>Access-Control-Expose-Headers</code> header</li>
        <li>Safe request can be made with a {'<form>'} or a {'<script>'}, w/o any special methods</li>
      </ul>

      <H>CORS for safe requests</H>

      <ul>
        <li>If a request is cross-origin, the browser always adds the <code>Origin</code> header</li>
        <li><code>Origin: https://javascript.info</code> for HTTP-request</li>
        <li><code>Access-Control-Allow-Origin: *</code> for HTTP-response</li>
      </ul>

      <H>Response headers</H>

      <ul>
        <li>For cross-origin request, by default JS may access “safe” response headers</li>
        <li><code>Cache-Control</code>, <code>Content-Language</code>, <code>Content-Type</code>, <code>Expires</code>, <code>Last-Modified</code>, <code>Pragma</code></li>
        <li>There’s no <code>Content-Length</code> header in the list</li>
        <li>Additional permission is required to access that header to track the percentage of progress</li>
        <li>To grant JavaScript access to any other response header, the server must send the <code>Access-Control-Expose-Headers</code> header</li>
        <li>It contains a comma-separated list of unsafe header names that should be made accessible</li>
        <li>Bellow script is allowed to read the <code>Content-Length</code> and <code>API-Key</code> headers of the response</li>
      </ul>

      <Code block none>{`
      200 OK
      Content-Type:text/html; charset=UTF-8
      Content-Length: 12345
      API-Key: 2c9de507f2c54aa1
      Access-Control-Allow-Origin: https://javascript.info
      Access-Control-Expose-Headers: Content-Length,API-Key
      `}</Code>

      <H>Unsafe requests</H>

      <ul>
        <li>for “unsafe” requests browser firstly sends “preflight” request, to ask for permission</li>
        <li>Preflight request occurs “behind the scenes”, it’s invisible to JavaScript</li>
        <li>JS only gets the response to the main request or an error if there’s no server permission</li>
        <li>A preflight request uses the method 'OPTIONS', no body and two headers:</li>
        <li><code>Access-Control-Request-Method</code> method of the unsafe request</li>
        <li><code>Access-Control-Request-Headers</code> provides a comma-separated list of its unsafe HTTP-headers</li>
      </ul>

      <p>If the server agrees to serve the requests, it should respond with empty body, status 200 and headers...</p>

      <ul>
        <li><code>Access-Control-Allow-Origin</code> must be either <code>*</code> or the requesting origin to allow it</li>
        <li><code>Access-Control-Allow-Methods</code> must have the allowed method</li>
        <li><code>Access-Control-Allow-Headers</code> must have a list of allowed headers</li>
        <li><code>Access-Control-Max-Age</code> header may specify a number of seconds to cache the permissions. So the browser won’t have to send a preflight for subsequent requests that satisfy given permissions.</li>
      </ul>

      <p>Take a look at step-by-step example <Lnk path='https://javascript.info/fetch-crossorigin'>https://javascript.info/fetch-crossorigin</Lnk></p>

      <H>Credentials</H>

      <ul>
        <li>A cross-origin request from JavaScript by default does not bring credentials (cookies or HTTP authentication)</li>
        <li>but HTTP requests have them</li>
        <li>to include credentials in fetch and send cookies need to use <code>credentials: "include"</code> property option</li>
        <li>If the server agrees to accept the request with credentials, it should add...</li>
        <li>header <code>Access-Control-Allow-Credentials: true</code> to the response, in addition to <code>Access-Control-Allow-Origin</code></li>
        <li><code>Access-Control-Allow-Origin</code> is prohibited from using a star <code>*</code> for requests with credentials, must provide the exact origin there</li>
      </ul>

      <Code block jsx>{`
      fetch('http://another.com', { credentials: "include" })
      `}</Code>

      <H>Fetch page content</H>

      <FetchComponent />

      <Code block jsx>{`
      function FetchComponent() {
        return (
          <div>
            <button onClick={fetchPage}>Fetch this page content and put into console</button>
          </div>
        )
      }

      async function fetchPage() {
        const response = await fetch('/posts/fetch') // resolves with response headers
        const result = await response.text()
        console.log(result)
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
