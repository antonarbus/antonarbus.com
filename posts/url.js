'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'url',
  date: '2022.06.19',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'URL object in JavaScript',
  body: (
    <>
      <ul>
        <li><Code js> new URL(url, [base])</Code></li>
        <li><code>url</code> full URL or only path (if base is set)</li>
        <li><code>base</code> optional base URL: if set and <code>url</code> argument has only path, then the URL is generated relative to base</li>
        <li>built-in URL class provides a convenient interface for creating and parsing URLs</li>
        <li>sometimes it can be really helpful</li>
        <li>can pass URL objects to networking methods instead of a string</li>
      </ul>

      <H>Create</H>

      <Code block jsx>{`
      const url1 = new URL('https://javascript.info/profile/admin')
      // https://javascript.info/profile/admin

      const url2 = new URL('/profile/admin', 'https://javascript.info')
      // https://javascript.info/profile/admin

      const newUrl = new URL('tester', url1)
      // https://javascript.info/profile/tester
      `}</Code>

      <H>Properties</H>

      <Code block jsx>{`
      const url = new URL('https://site.com:8080/path/page?p1=v1&p2=v2#hash')
      `}</Code>

      <ul>
        <li><code>url.href</code> full url <i>{'"https://site.com:8080/path/page?p1=v1&p2=v2#hash"'}</i></li>
        <li><code>url.toString()</code> same</li>
        <li><code>url.protocol</code> <i>{'"https:"'}</i>, ends with the colon character :</li>
        <li><code>url.search</code> <i>{'"?p1=v1&p2=v2"'}</i>, a string of parameters, starts with the question mark ?</li>
        <li><code>url.host</code> <i>{'"site.com:8080"'}</i></li>
        <li><code>url.pathname</code> <i>{'"/path/page"'}</i></li>
        <li><code>url.hash</code> <i>{'"#hash"'}</i>, starts with the hash character #</li>
        <li><code>url.searchParams</code> iterable object with search parameters</li>
      </ul>

      <H>searchParams</H>

      <ul>
        <li><code>url.searchParams.append(name, value)</code> add the parameter by name</li>
        <li><code>url.searchParams.delete(name)</code> remove the parameter by name</li>
        <li><code>url.searchParams.get(name)</code> get the parameter by name</li>
        <li><code>url.searchParams.getAll(name)</code> get all parameters with the same name, e.g. <i>?user=John&user=Pete</i></li>
        <li><code>url.searchParams.has(name)</code> check for the existence of the parameter by name,</li>
        <li><code>url.searchParams.set(name, value)</code> set/replace the parameter, parameters are automatically encoded</li>
        <li><code>url.searchParams.sort()</code> sort parameters by name, rarely needed</li>
      </ul>

      <Code block jsx>{`
        const url = new URL('https://google.com/search')
        url.searchParams.set('q', 'test me!') 
        // https://google.com/search?q=test+me%21

        url.searchParams.set('tbs', 'qdr:y'); 
        // https://google.com/search?q=test+me%21&tbs=qdr%3Ay


        for(let [name, value] of url.searchParams) {
          alert(\`\${name}=\${value}\`) 
          // q=test me!
          // tbs=qdr:y
        }
      `}</Code>

      <H>Encoding</H>

      <ul>
        <li>RFC3986 standard defines which characters are allowed in URLs and which are not</li>
        <li>not allowed, must be encoded</li>
        <li>for instance non-latin letters and spaces – replaced with their UTF-8 codes, prefixed by %</li>
        <li>Use URL object not to think about encoding, it will take care of it automatically</li>
      </ul>

      <Code block jsx>{`
        const url = new URL('https://ru.wikipedia.org/wiki/Тест')
        url.searchParams.set('key', 'ъ')
        // https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
      `}</Code>

      <Code block jsx>{`
        const url = new URL('http://site.com/привет')
        url.toString() // "http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82"
      `}</Code>

      <ul>
        <li>If we use a string for URL, we need to encode/decode special characters manually</li>
        <li>There are built-in functions for that <code>encodeURI()</code>, <code>decodeURI()</code>, <code>encodeURIComponent()</code>, <code>decodeURIComponent()</code></li>
        <li><code>encodeURI()</code> encodes URL as a whole</li>
        <li><code>decodeURI()</code> decodes it back</li>
        <li><code>encodeURIComponent()</code> encodes a URL component, such as a search parameter, or a hash, or a pathname</li>
        <li><code>decodeURIComponent()</code> decodes it back</li>
        <li><code>encodeURI</code> encodes only characters that are totally forbidden in URL</li>
        <li><code>encodeURIComponent</code> encodes same characters, plus <i># $ & + , / : ; = ? @</i></li>
      </ul>

      <p>For a whole URL we can use <code>encodeURI</code>...</p>

      <Code block jsx>{`
        // correct
        encodeURI('http://site.com/привет') // "http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82"
        
        // incorrect
        encodeURIComponent('http://site.com/привет') // "http%3A%2F%2Fsite.com%2F%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82" 
      `}</Code>

      <p>For URL parameters we should use <code>encodeURIComponent</code> instead.</p>

      <Code block jsx>{`
        const music = encodeURIComponent('Rock&Roll')
        const url = \`https://google.com/search?q=\${music}\`
        // 'https://google.com/search?q=Rock%26Roll'
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
