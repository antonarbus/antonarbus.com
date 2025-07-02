import {
  Code,
  H,
  Hs,
  LazyImg,
  Lnk,
  React,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  jsxToStr,
  ComponentFromHtmlString
} from '/components/post/reExport'

const postObj = {
  title: 'curl',
  date: '2025.03.23',
  tags: ['terminal'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'xxx',
  body: (
    <>
      <H>Curl</H>

      <ul>
        <li>
          <code>curl</code> (Client URL) is a command-line tool used for making HTTP requests
        </li>
        <li>Fast & lightweight, no GUI required like Postman</li>
        <li>Works on any system (Linux, macOS, Windows)</li>
      </ul>

      <Code block bash>{`
        # core
        curl \\ 
          -k \\
          -H "ltpa-token: AAECAzYЗRDkyNzVDNjdEfPluGUv4DJ2tMh/LTdU+/ywA==" \\
          -H "Content-Type: application/json" \\
          https://local.domain.com:3010/public/administration/tt88001la2F00345
      `}</Code>

      <Code block jsx>{`
        # hpi
        curl \\
          -k \\
          -H "cookie: LtpaToken=AAECAzY4NjRENzk0Njg2NTY0MzRDTj1BbnRvbjEgQXJidXMvTz1IZWVyb3OXI0hnSP7XOjg5aOG3AO4JKvm+iQ==" \\
          -H "Content-Type: application/json" \\
          "https://api.dev.heeros.com/anton-windmill-service-v1/automation-rule?tt=00001&la=00001"
      `}</Code>

      <H>Arguments</H>

      <ul>
        <li>
          <code>-X POST</code> → Specify HTTP method (GET, POST, PUT, DELETE). Default is GET.
        </li>
        <li>
          <code>-k</code> → ignore SSL certificate validation
        </li>
        <li>
          <code>-d "name=John"</code> → Send data in a request (use with -X POST or -X PUT).
        </li>
        <li>
          <code>-H "Authorization: Bearer YOUR_TOKEN"</code> → Add request headers.
        </li>
        <li>
          <code>-o response.json</code> → Save response to a file.
        </li>
        <li>
          <code>-s</code> → Silent mode (hides progress and errors).
        </li>
        <li>
          <code>-i</code> → Include response headers in output.
        </li>
        <li>
          <code>-v</code> → Verbose mode (shows full request details).
        </li>
        <li>
          <code>-L</code> → Follow redirects automatically.
        </li>
        <li>
          <code>-c cookies.txt</code> → Save cookies.
        </li>
        <li>
          <code>-b cookies.txt</code> → Use saved cookies.
        </li>
      </ul>

      <Code block jsx>{`
        curl \\
        -X POST https://api.example.com/upload \\
        -H "Authorization: Bearer YOUR_TOKEN" \\
        -H "Content-Type: application/json" \\
        -d @data.json \\
        -o response.json -v

        Explanation
        -X POST → Use the POST method.
        -H "Authorization: Bearer YOUR_TOKEN" → Include an authentication token.
        -H "Content-Type: application/json" → Specify JSON content type.
        -d @data.json → Send JSON data from a file (@ means "read from file").
        -o response.json → Save the response to response.json.
        -v → Enable verbose mode to debug the request
      `}</Code>

      <H>Sending a JSON Payload with Variables</H>

      <Code block jsx>{`
        TOKEN="your_api_token"
        USER_ID=123

        curl -X PUT "https://api.example.com/users/$USER_ID" \\
            -H "Authorization: Bearer $TOKEN" \\
            -H "Content-Type: application/json" \\
            -d '{"status":"active"}'
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
