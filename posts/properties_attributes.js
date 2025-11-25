'use client'


import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'properties & attributes',
  date: '2022.06.07',
  tags: ['JavaScript', 'basics'],
  desc: 'properties & attributes in JavaScript',
  body: (
    <>
      <H>innerHTML</H>

      <ul>
        <li>Content between html tags</li>
        <li>The innerHTML property allows to get the HTML inside the element as a string</li>
        <li>Can be modified</li>
        <li>{'If innerHTML inserts a <script> tag into the document – it becomes a part of HTML, but doesn’t execute'}</li>
      </ul>

      <Code block jsx>{`
        document.body.innerHTML = 'The new BODY!' // replace it
        document.body.innerHTML += " How goes?" // be careful, all images and other resources will be reloaded.
      `}</Code>

      <H>outerHTML</H>

      <ul>
        <li>full HTML of the element</li>
        <li>That’s like innerHTML plus the element itself</li>
        <li>outerHTML assignment does not modify the DOM element, but removes it from the DOM and inserts the new HTML in its place</li>
      </ul>

      <Code block jsx>{`
      let btn = document.querySelector('button')
      btn.innerHTML // "Test"
      btn.outerHTML // "<button id="start-test-btn" data-my-tip="... class="no-cursor">Test</button>"

      btn.outerHTML = '<p>A new element</p>'
      btn // #start-test-btn // still the same el, even it is removed from DOM and screen
      `}</Code>

      <H>data & nodeValue</H>

      <ul>
        <li>content of a non-html element node (text, comment)</li>
        <li>property is only valid for element nodes</li>
        <li>other node types, such as text nodes, have their counterpart: nodeValue and data properties</li>
        <li>can be modified</li>
        <li><code>data</code> & <code>nodeValue</code> are almost the same, we’ll use data, because it’s shorter.</li>
      </ul>

      <Code block jsx>{`
      document.body.childNodes[13].data // " tooltip for hovering an el " // comment node
      `}</Code>

      <H>textContent</H>

      <ul>
        <li>provides access to the text inside the element: only text without any tags</li>
        <li>writing into it puts the text inside the element, with all special characters and tags treated exactly as text</li>
        <li>reading such text is rarely needed</li>
        <li>Writing to textContent is much more useful, because it allows to write text the “safe way”</li>
      </ul>

      <Code block jsx>{`
      document.querySelector("#user-logged").textContent // "sherbsherb@gmail.com"
      document.querySelector("#user-logged").textContent = "3007887@gmail.com"
      `}</Code>

      <H>hidden</H>

      <p><span>elem.hidden = true</span> - same as <code>style="display:none"</code></p>

      <Code block jsx>{`
      document.querySelector("button").hidden = true // btn disappeared
      document.querySelector("button").hidden = false // btn appeared
      document.querySelector("button").hidden // false
      `}</Code>

      <H>value</H>

      <Code block jsx>{`
      input15.value // "xxx"
      `}</Code>

      <H>id</H>

      <ul>
        <li>Most standard HTML attributes of element nodes automatically become properties of DOM objects</li>
        <li>But the attribute-property mapping is not one-to-one!</li>
      </ul>

      <Code block jsx>{`
      // tag
      <body id="page"></body>
      // DOM object has 
      body.id="page"
      `}</Code>

      <H>type</H>

      <Code block jsx>{`
      input15.type // "text"
      `}</Code>

      <H>href</H>

      <Code block jsx>{`
      document.querySelectorAll('a')[2].href // "https://myvocab.org/"
      `}</Code>

      <H>Custom properties</H>

      <p>We can add custom properties & methods</p>

      <Code block jsx>{`
      document.body.myData = { title: 'Imperator' }
      document.body.myData.title // Imperator

      document.body.sayTagName = function() { alert(this.tagName) }
      document.body.sayTagName() // BODY
      `}</Code>

      <p>And even modify built-in prototypes</p>

      <Code block jsx>{`
      Element.prototype.sayHi = function() { alert(\`Hello, I'm \${this.tagName}\`) }
      document.documentElement.sayHi() // Hello, I'm HTML
      document.body.sayHi() // Hello, I'm BODY
      `}</Code>

      <H>HTML attributes</H>

      <ul>
        <li>HTML has tags with attributes</li>
        <li>browser parses a page & constructs the DOM tree (objects) for tags with properties</li>
        <li>browser recognizes STANDARD html attributes and creates DOM properties from them</li>
        <li>it is not the case for non-standard attributes</li>
        <li>standard attribute for one element can be unknown for another one</li>
        <li>but can be accessed by</li>
        <li>HTML attributes are case-insensitive getAttribute('id') = getAttribute('ID') </li>
        <li>values are always strings</li>
        <li>We can assign anything to an attribute, it becomes a string</li>
        <li>All attributes including ones that we set are visible in outerHTML</li>
      </ul>

      <Code block jsx>{`
      el.hasAttribute("name") // checks for existence
      el.getAttribute("name") // gets the value
      el.setAttribute("name", value) // sets the value
      el.removeAttribute("name") // removes the attribute
      el.attributes // collection of objects // 7 attributes // iterable
      `}</Code>

      <Hs>setAttribute</Hs>

      <ul>
        <li>attribute update leads to property update and backwards</li>
      </ul>

      <Code block jsx>{`
      let input = document.querySelector('input')
      input.setAttribute('id', 'xxx')
      input.id // xxx (updated)
      input.id = 'newId'
      input.getAttribute('id') // newId (updated)
      `}</Code>

      <li>Except for input.value</li>
      <li>synchronizes only from attribute → to property, but not back</li>

      <Code block jsx>{`
      let input = document.querySelector('input')
      input.setAttribute('value', 'text')
      input.value // text
      input.value = 'newValue'
      input.getAttribute('value') // text (not updated!)
      `}</Code>

      <Hs>Attribute types</Hs>

      <ul>
        <li>most properties are strings</li>
        <li>sometimes booleans or objects</li>
      </ul>

      <H>checked</H>

      <Code block jsx>{`
      let checkbox = document.querySelector('input[type="checkbox"]')
      checkbox.checked // true // boolean value
      checkbox.getAttribute('checked') // null
      `}</Code>

      <H>style</H>

      <Code block jsx>{`
      let div = document.getElementById('fixed-horizontally')
      div.getAttribute('style') // "left: 645px;"
      div.style // CSSStyleDeclaration {0: "left",  … , left: "645px", …} // object
      `}</Code>

      <H>DOM property vs HTML attribute</H>

      <ul>
        <li>sometimes DOM prop differs from HTML atr</li>
      </ul>

      <Code block jsx>{`
      let link = document.querySelector('#left-corner a')
      link.getAttribute('href') // "https://myvocab.org"
      link.href // "https://myvocab.org/"
      `}</Code>

      <H>dataset, data-*</H>

      <ul>
        <li>non-standard attributes are used to pass custom data from HTML to JS</li>
        <li>or to “mark” HTML-elements for JS</li>
        <li>to avoid conflicts with custom atr use data-*</li>
        <li>they are available in the dataset property</li>
        <li>for ex., if an el has an attr "data-about", it’s available as elem.dataset.about</li>
        <li>Multi word attributes like data-order-state become camel-cased: dataset.orderState</li>
      </ul>

      <Code block html>{`
      <span id="site-url" data-my-tip="Open in a new tab">
      `}</Code>

      <Code block jsx>{`
      let el = document.getElementById('site-url')
      el.dataset // DOMStringMap {myTip: "Open in a new tab"}
      el.dataset.myTip // "Open in a new tab"
      el.dataset.myTip = "xxx" // update
      el.dataset.myTip // "xxx"
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
