import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'dom modification',
  date: '2022.06.05',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/dom.jpg',
  desc: 'dom modification in JavaScript',
  body: (
    <>
      <H>Create</H>

      <Hs>createElement</Hs>

      <Code block jsx>{`
      document.createElement('tag')
      `}</Code>

      <Hs>createTextNode</Hs>

      <Code block jsx>{`
      document.createTextNode('text')
      `}</Code>

      <H>Add</H>

      <Hs>Append</Hs>

      <p>Append at the end of node</p>

      <Code block jsx>{`
      el.append(nodes, 'strings')
      `}</Code>

      <Hs>Prepend</Hs>

      <p>Insert at the beginning of node</p>

      <Code block jsx>{`
      el.prepend(nodes, 'strings')
      `}</Code>

      <Hs>Before</Hs>

      <p>Insert before node</p>

      <Code block jsx>{`
      el.before(nodes, 'strings')
      `}</Code>

      <Hs>After</Hs>

      <p>Insert after node</p>

      <Code block jsx>{`
      el.after(nodes, 'strings') 
      `}</Code>

      <Hs>Comment</Hs>

      <ul>
        <li>Arguments are DOM nodes to insert, or text strings</li>
        <li>Text strings become text nodes automatically</li>
        <li>May add multiple args</li>
      </ul>

      <Code block jsx>{`
      let div = document.createElement("div")
      let p = document.createElement("p")
      div.append(p)
      `}</Code>

      <Code block jsx>{`
      let div = document.createElement("div")
      div.append("Some text")
      `}</Code>

      <Code block jsx>{`
      let div = document.createElement("div")
      let p = document.createElement("p")
      div.append("Some text", p)
      `}</Code>

      <H>replaceWith</H>

      <p>Replaces node</p>

      <Code block jsx>{`
      node.replaceWith(nodes, 'strings')
      `}</Code>

      <H>insertAdjacentHTML</H>

      <p>Method inserts HTML.</p>

      <p>insertion methods remove the node from the old place.</p>

      <Code block jsx>{`
      el.insertAdjacentHTML(where, "HTML string")
      `}</Code>

      <Hs>beforebegin</Hs>

      <p>Insert html immediately before elem</p>

      <Code block jsx>{`
      el.insertAdjacentHTML("beforebegin", "HTML string")
      `}</Code>

      <Hs>afterbegin</Hs>

      <p>Insert html into elem, at the beginning</p>

      <Code block jsx>{`
      el.insertAdjacentHTML("afterbegin", "HTML string")
      `}</Code>

      <Hs>beforeend</Hs>

      <p>insert html into elem, at the end</p>

      <Code block jsx>{`
      el.insertAdjacentHTML("beforeend", "HTML string") 
      `}</Code>

      <Hs>afterend</Hs>

      <p>Insert html immediately after elem</p>

      <Code block jsx>{`
      el.insertAdjacentHTML("afterend", "HTML string") 
      `}</Code>

      <Hs>Example</Hs>

      <Code block jsx>{`
      document.body.insertAdjacentHTML("afterbegin", \`<div class="alert">
        <strong>Hi there!</strong> You've read an important message.
      </div>\`)
      `}</Code>

      <H>insertAdjacentText</H>

      <p>String of text is inserted “as text”.</p>

      <p>Rarely used methods, usually append/prepend/before/after are used</p>

      <Code block jsx>{`
      el.insertAdjacentText("beforebegin", "text")
      el.insertAdjacentText("afterbegin", "text")
      el.insertAdjacentText("beforeend", "text")
      el.insertAdjacentText("afterend", "text")
      `}</Code>

      <H>insertAdjacentElement</H>

      <p>Element is inserted.</p>

      <p>Rarely used methods, usually append/prepend/before/after are used</p>

      <Code block jsx>{`
      el.insertAdjacentElement("beforebegin", element)
      el.insertAdjacentElement("afterbegin", element)
      el.insertAdjacentElement("beforeend", element)
      el.insertAdjacentElement("afterend", element)
      `}</Code>

      <H>Remove</H>

      <Code block jsx>{`
      node.remove()
      `}</Code>

      <p>Example</p>

      <Code block jsx>{`
      let div = document.createElement('div')
      document.body.append(div)
      setTimeout(() => div.remove(), 1000)
      `}</Code>

      <H>cloneNode</H>

      <Code block jsx>{`
      el.cloneNode()
      `}</Code>

      <p>Creates a “deep” clone of the element – with all attributes and sub elements</p>

      <Code block jsx>{`
      el.cloneNode(true)
      `}</Code>

      <p>Clone is made w/o child elements</p>

      <Code block jsx>{`
      el.cloneNode(false)
      `}</Code>

      <p>Example</p>

      <Code block html>{`
      <div class="alert" id="div">
        <strong>Hi there!</strong> You've read an important message.
      </div>
      `}</Code>

      <Code block jsx>{`
      let div2 = div.cloneNode(true) // clone the message
      div2.querySelector('strong').innerHTML = 'Bye there!' // change the clone
      div.after(div2) // show the clone after the existing div
      `}</Code>

      <H>Old-school methods</H>

      <p><Code>appendChild()</Code>, <Code>insertBefore()</Code>, <Code>replaceChild()</Code>, <Code>removeChild()</Code></p>

      <ul>
        <li>All these methods return the inserted/removed node</li>
        <li>usually the returned value is not used, we just run the method</li>
      </ul>

      <Code block jsx>{`
      parentElem.appendChild(node) // Appends node as the last child of parentElem
      parentElem.insertBefore(node, nextSibling) // Inserts node before nextSibling into parentElem.
      parentElem.replaceChild(node, oldChild) // Replaces oldChild with node among children of parentElem.
      parentElem.removeChild(node) // Removes node from parentElem (assuming node is its child).
      `}</Code>

      <p><Code>document.write()</Code></p>

      <ul>
        <li>ancient method of adding something to a web-page</li>
        <li>string can be dynamically generated</li>
        <li>only works while the page is loading</li>
        <li>if we call it afterwards, the existing document content is erased</li>
        <li>it works fast, because there’s no DOM modification involved</li>
        <li>if we need to add a lot of text into HTML dynamically, and we’re at page loading phase, and the speed matters, it may help</li>
      </ul>

      <Code block jsx>{`
      document.write('<b>Hello from JS</b>')
      `}</Code>

      <H>DocumentFragment</H>

      <ul>
        <li>do not use, use array instead</li>
        <li>special DOM node that serves as a wrapper to pass around lists of nodes</li>
        <li>we can append nodes to it</li>
        <li>when we insert it somewhere, then its content is inserted</li>
      </ul>

      <Code block html>{`
      <ul id="ul"></ul>
      `}</Code>

      <Code block jsx>{`
      function getListContent() {
        let fragment = new DocumentFragment()
      
        for(let i=1; i<=3; i++) {
          let li = document.createElement('li')
          li.append(i)
          fragment.append(li)
        }
        return fragment
      }
      
      ul.append(getListContent())
      `}</Code>

      <p>Output</p>

      <Code block html>{`
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
      `}</Code>

      <p>Proper array version</p>

      <Code block jsx>{`
      function getListContent() {
        let result = []
        for(let i=1; i<=3; i++) {
          let li = document.createElement('li')
          li.append(i)
          result.push(li)
        }
        return result
      }
      ul.append(...getListContent())
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
