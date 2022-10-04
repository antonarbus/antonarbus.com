import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'axios',
  date: '2021.10.16',
  tags: ['JavaScript'],
  desc: 'axios',
  body: (
    <>
      <H>Install</H>

      <ul>
        <li>npm <Lnk path='https://www.npmjs.com/package/axios'>package</Lnk> with description</li>
        <li>install with <Code bash>npm i axios</Code></li>
      </ul>

      <H>Usage</H>

      <Code block js>{`
      import axios from 'axios'
      // const axios = require('axios')
      
      axios({
        method: 'post',
        url: '/user/12345',
        data: {
          firstName: 'John',
          lastName: 'Dow'
        }
      })
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
      `}</Code>

      <H>Request parameters</H>

      <Code block js>{`
      {
        url: '/user', // server URL that will be used for the request
        method: 'get', // request method to be used when making the request
        baseURL: 'https://some-domain.com/api/', // will be prepended to url unless url is absolute
        transformRequest: [function (data, headers) { // allows changes to the request data before it is sent
          return data;
        }],
        transformResponse: [function (data) { // allows changes to the response data to be made before
          return data;
        }],
        headers: {'X-Requested-With': 'XMLHttpRequest'}, // custom headers to be sent
        params: { // URL parameters to be sent with the request
          ID: 12345
        },
        paramsSerializer: function (params) { // optional function in charge of serializing params
          return Qs.stringify(params, {arrayFormat: 'brackets'})
        },
        data: { // data to be sent as the request body
          firstName: 'Fred'
        },
        data: 'Country=Brasil&City=Belo Horizonte', // syntax alternative to send data into the body
        timeout: 1000, // default is 0 (no timeout) // specifies the number of milliseconds before the request times out and aborted
        withCredentials: false, // indicates whether or not cross-site Access-Control requests credentials
        adapter: function (config) { // allows custom handling of requests which makes testing easier.
          /* ... */
        },
        auth: { // indicates that HTTP Basic auth should be used, and supplies credentials.
          username: 'janedoe',
          password: 's00pers3cret'
        },
        responseType: 'json', // default //  indicates the type of data that the server will respond with
        responseEncoding: 'utf8', // default // indicates encoding to use for decoding responses (Node.js only)
        xsrfCookieName: 'XSRF-TOKEN', // default // name of the cookie to use as a value for xsrf token
        xsrfHeaderName: 'X-XSRF-TOKEN', // default // name of the http header that carries the xsrf token value
        onUploadProgress: function (progressEvent) { // allows handling of progress events for uploads // browser only
          // Do whatever you want with the native progress event
        },
        onDownloadProgress: function (progressEvent) { // allows handling of progress events for downloads // browser only
          // Do whatever you want with the native progress event
        },
        maxContentLength: 2000, // max size of the http response content in bytes allowed in node.js
        maxBodyLength: 2000, // (Node only option) defines the max size of the http request content in bytes allowed
        validateStatus: function (status) { // defines whether to resolve or reject the promise for a given HTTP response status code
          return status >= 200 && status < 300; // default
        },
        maxRedirects: 5, // default // maximum number of redirects to follow in node.js.
        socketPath: null, // default // defines a UNIX Socket to be used in node.js
        httpAgent: new http.Agent({ keepAlive: true }), // define a custom agent to be used when performing http
        httpsAgent: new https.Agent({ keepAlive: true }),  // define a custom agent to be used when performing http
        proxy: { // hostname, port, and protocol of the proxy server
          protocol: 'https',
          host: '127.0.0.1',
          port: 9000,
          auth: {
            username: 'mikeymike',
            password: 'rapunz3l'
          }
        },
        cancelToken: new CancelToken(function (cancel) { // specifies a cancel token that can be used to cancel the request
        }),
        signal: new AbortController().signal, // alternative way to cancel Axios requests using AbortController
        decompress: true // default // indicates whether or not the response body should be decompressed 
        insecureHTTPParser: undefined // default // Indicates where to use an insecure HTTP parser that accepts invalid HTTP headers.
        transitional: { // transitional options for backward compatibility
          silentJSONParsing: true, // default value for the current Axios version
          forcedJSONParsing: true,
          clarifyTimeoutError: false,
        }
      }
      `}</Code>

      <H>Response parameters</H>

      <Code block js>{`
      {
        data: {}, // response that was provided by the server
        status: 200, // HTTP status code from the server response
        statusText: 'OK', //  HTTP status message from the server response
        headers: {}, // HTTP headers that the server responded with
        config: {}, // config that was provided to axios for the request
        request: {} // request that generated this response
      }
      `}</Code>

      <H>Axios vs Fetch</H>

      <Hs>Axios</Hs>

      <Code block jsx>{`
      axios('https://jsonplaceholder.typicode.com/posts/1')
        .then(res => console.log(res.data.title))
      `}</Code>

      <Hs>Fetch</Hs>

      <Code block js>{`
      fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(res => res.json())
        .then(data => console.log(data.title))
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
