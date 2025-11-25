'use client'


import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'dom',
  date: '2022.10.26',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/dom.jpg',
  desc: 'what is dom',
  body: (
    <>
      <H>DOM</H>

      <ul>
        <li><Lnk path='https://dom.spec.whatwg.org/'>DOM</Lnk> - <b>D</b>ocument <b>O</b>bject <b>M</b>odel</li>
        <li>browser loads and “parses” the HTML and generates DOM nodes</li>
        <li>each DOM node is an object</li>
        <li>DOM consists of a hierarchy of DOM node</li>
        <li>Nodes are html tags + text nodes + comment nodes + ... others (12 node types)</li>
        <li>Element is a node of a specific element type - <code>Node.ELEMENT_NODE</code></li>
        <li>comments & text nodes aren't elements</li>
        <li>Node is constructor of a node, HTMLElement is a constructor of an element in JavaScript DOM</li>
        <li>element is a subtype of a node</li>
        <li>every HTML tag is an object acc. to DOM</li>
        <li>text inside a tag is an object as well</li>
        <li><code>document.body</code> - object representing the {'<body>'} tag</li>
        <li>most standard HTML attributes of element nodes automatically become properties of DOM objects</li>
        <li>DOM is a tree structure of tags, where every tree node is an object</li>
        <li>Tags are element nodes (or just elements) and form the tree structure</li>
        <li>Text inside forms text nodes and contains only a string</li>
        <li>Spaces and newlines form text nodes become a part of the DOM</li>
        <li>Browser tools do not show spaces at the start/end of the text and line-breaks between tags</li>
        <li>Developer tools shows DOM, but w/o "blanks" and text nodes are shown as a text</li>
      </ul>

      <H>Auto correction</H>

      <ul>
        <li>Spaces and newlines before {'<head>'} are ignored for historical reasons</li>
        <li>something after {'</body>'} automatically moved inside the body</li>
        <li>malformed HTML is automatically corrected when DOM is being made</li>
        <li>if {'<html>'} {'<body>'} don't exist, it will exist in the DOM</li>
        <li>browser closes tags automatically</li>
        <li>tables always have {'<tbody>'}</li>
      </ul>

      <H>Node types</H>

      <ul>
        <li>Everything in HTML, even comments, become a part of the DOM, but in practice we usually work with 4 node types</li>
        <li><code>document</code> the “entry point” into DOM</li>
        <li><code>element nodes</code> HTML-tags, the tree building blocks</li>
        <li><code>text nodes</code> contain text</li>
        <li><code>comments</code> sometimes we can put information there, it won't be shown, but JS can read it from the DOM</li>
        <li>There are 12 <Lnk path='https://www.w3schools.com/xml/dom_nodetype.asp'>node types</Lnk></li>
      </ul>

      <H>Node classes</H>

      <ul>
        <li>Each DOM node belongs to the corresponding built-in class</li>
        <li>The classes form a hierarchy</li>
        <li>The root of the hierarchy is <code>EventTarget</code> - <code>Node</code> - ... other DOM nodes </li>
        <li>The full set of properties and methods come as the result of inheritance</li>
      </ul>

      <Hs>EventTarget</Hs>

      <ul>
        <li><code>EventTarget</code> is the root “abstract” class</li>
        <li>Objects of this class are never created, they are served as a base</li>
        <li><code>Node</code> class inherits from it</li>
      </ul>

      <Hs>Node</Hs>

      <ul>
        <li><code>Node</code> is also an “abstract” class, serving as a base for DOM nodes</li>
        <li>It provides the core tree functionality: parentNode, nextSibling, childNodes and so on (they are getters)</li>
        <li>Objects of Node class are never created.</li>
        <li>"Text", "Element", "Comment" inherit from it</li>
      </ul>

      <Hs>Element</Hs>

      <ul>
        <li><code>Element</code> is a base class for DOM elements</li>
        <li>It provides element-level navigation like nextElementSibling, children and searching methods like getElementsByTagName, querySelector</li>
        <li>"HTMLElement" inherit from it</li>
      </ul>

      <Hs>HTMLElement</Hs>

      <ul>
        <li><code>HTMLElement</code> is finally the basic class for all HTML elements</li>
        <li>It is inherited by HTML elements</li>
        <li><code>HTMLInputElement</code> the class for {'<input>'} elements</li>
        <li><code>HTMLBodyElement</code> the class for {'<body>'} elements</li>
        <li><code>HTMLAnchorElement</code> the class for {'<a>'} elements</li>
        <li>…and so on, each tag has its own class that may provide specific properties and methods</li>
      </ul>

      <Code block jsx>{`
      input.constructor.name // "HTMLInputElement"
      input instanceof HTMLElement  // true
      input instanceof EventTarget  // true
      `}</Code>

      <H>console.dir(inputElem)</H>

      <ul>
        <li>let's console some input element with <Code>console.dir(inputElem)</Code></li>
        <li>in DOM object tree in <code>__proto__</code> we can see hierarchy</li>
        <li><code>HTMLInputElement</code> this class provides input-specific properties</li>
        <li><code>HTMLElement</code> it provides common HTML element methods (and getters/setters)</li>
        <li><code>Element</code> provides generic element methods</li>
        <li><code>Node</code> provides common DOM node properties</li>
        <li><code>EventTarget</code> gives the support for events</li>
        <li><code>Object</code> plain object methods available, like hasOwnProperty etc...</li>
      </ul>

      <H>elem.nodeType</H>

      <Code block jsx>{`
      elem.nodeType == 1 // for element nodes
      elem.nodeType == 3 // for text nodes
      elem.nodeType == 9 // for the document object
      `}</Code>

      <p>In modern scripts, we can use <code>instanceof</code> and other class-based tests.</p>

      <H>elem.nodeName</H>

      <ul>
        <li>we can read node tag name from nodeName or tagName properties</li>
        <li>nodeName is defined for any Node</li>
      </ul>

      <Code block jsx>{`
      document.body.nodeName // BODY
      input.nodeName // INPUT
      `}</Code>

      <H>elem.tagName</H>

      <p>The <code>tagName</code> property exists only for <code>Element</code> nodes.</p>

      <Code block jsx>{`
      document.body.tagName // BODY
      `}</Code>

      <H>Browser</H>

      <ul>
        <li>host environment - browser, web-server, or another host (even coffee machine), where JavaScript runs</li>
        <li>each host environment provides platform-specific functionality</li>
        <li>host environment provides own objects and functions additional to the language core</li>
        <li>in browser the DOM is kept in <code>window</code> object - root object for a web-browser</li>
        <li>browser (or other host environment) provides additional objects for working with everything except the document</li>
      </ul>

      <Code block jsx>{`
      // window object
      function sayHi() { alert("Hello") }
      sayHi()
      window.sayHi() // same, function is located in window object
      window.innerHeight // inner window height
      `}</Code>

      <Code block jsx>{`
        // BOM
        location.href // shows current URL
        location.href = "https://wikipedia.org"; // redirect the browser to another URL
        alert/confirm/prompt/navigator/screen/location/frames/history/XMLHttpRequest
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
