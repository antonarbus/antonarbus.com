import { Code, H, Hs, Lnk, React, jsxToStr } from '/components/post/reExport'
import styled from 'styled-components'

function Cmpt() {
  const ref = React.useRef(null)
  const [selectorState, setSelectorState] = React.useState('span.cl.cl2')
  const [isInvalidSelectorState, setIsInvalidSelectorState] = React.useState(false)
  const [areNoElsFoundState, setAreNoElsFoundState] = React.useState(false)

  function isSelectorValid(selector) {
    const queryCheck = (s) => document.createDocumentFragment().querySelector(s)
    try {
      queryCheck(selector)
    } catch {
      return false
    }
    return true
  }

  function removeColorFromAllEls(container) {
    container.querySelectorAll('*').forEach((el) => {
      el.style.background = ''
      el.style.boxShadow = 'none'
    })
  }

  function insertSelector(selector) {
    setSelectorState(selector)
    document.querySelector('#input932').scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    const container = ref.current
    removeColorFromAllEls(container)
    isSelectorValid(selectorState) ? setIsInvalidSelectorState(false) : setIsInvalidSelectorState(true)
    if (!isSelectorValid(selectorState)) return
    const selectedEls = Array.from(container.querySelectorAll(selectorState))
    setAreNoElsFoundState(false)
    const noFoundEls = !selectedEls.length
    if (noFoundEls) setAreNoElsFoundState(true)
    selectedEls.forEach(el => {
      el.style.background = 'green'
      el.style.boxShadow = ' 0 0 1px 1px red'
    })
  }, [selectorState])

  return (
    <>
      <div style={{ color: 'grey' }}>
        {'box.querySelectorAll(\' '}
          <input
            id='input932'
            value={selectorState}
            onChange={e => setSelectorState(e.target.value)}
            contentEditable
            style={{ borderColor: 'rgb(82 168 236/ 80%)', outline: 'none' }}
          />
        {' \')'}
      </div>
      {isInvalidSelectorState ? <span style={{ color: 'red' }}>Invalid selector!</span> : null}
      {(areNoElsFoundState && !isInvalidSelectorState) ? <span style={{ color: 'red' }}>Not found!</span> : null}
      <br />
      box
      <Container ref={ref}>
        div.outer <br />
        <div className='outer'>
          <span id='id1' className='cl cl1'>span#id1.cl.cl1</span>
          <span id='id2' className='cl cl1'>span#id2.cl.cl1</span>
          <span id='id3' className='cl cl1'>span#id3.cl.cl1</span>
          <span id='id4' className='cl cl1'>span#id4.cl.cl1</span>
          <span id='id5' className='cl cl1'>span#id5.cl.cl1</span>
          <span className='cl cl2'>span.cl.cl2</span>
          <span className='cl cl2'>span.cl.cl2</span>
          <span className='cl cl2'>span.cl.cl2</span>
          <span className='cl cl2'>span.cl.cl2</span>
          <span className='cl cl2'>span.cl.cl2</span>
          <span myattr='1'>span[myattr='1']</span>
          <span myattr='123'>span[myattr='123']</span>
          <span myattr='1 2 3'>span[myattr='1 2 3']</span>
          <span myattr='1-2-3'>span[myattr='1-2-3']</span>
          <span lang='it'>span[lang='it']</span>
          <span><span>span in span</span></span>
          <div><div>div in div</div></div>
          <span id='before'>span with ::before</span>
          <span id='after'>span with ::after</span>
          <span>span</span>
          <input type="text" required value="required" onChange={() => { }}/>
          <input type="text" disabled value="disabled" onChange={() => { }}/>
          <input type="text" readOnly value="readonly" onChange={() => { }}/>
          <input type="checkbox" checked value="checked" onChange={() => { }}/>
          <input type="checkbox" value="not checked" onChange={() => { }}/>
          <input type="number" min='1' max='5' value='3' onChange={() => { }}/>
          <input type="number" min='1' max='5' value='10' onChange={() => { }}/>
          <input type="text" placeholder='placeholder' onChange={() => { }}/>
          <a href="https://google.com" target={'_blank'} rel="noreferrer">google</a>
          <div><p>first line</p> <p>second line</p> <p>third line</p></div>
          <span></span>
          <ul><li>li 1</li><li>li 2</li><li>li 3</li></ul>
        </div>
      </Container>

      <SelectorDiv>
        <>
          <Hs>Basic</Hs>
          <div className='grid'>
            <code onClick={() => insertSelector('*')}>*</code> <div>all</div>
            <code onClick={() => insertSelector('span')}>span</code> <div>tag</div>
            <code onClick={() => insertSelector('#id3')}>#id</code> <div>id</div>
            <code onClick={() => insertSelector('.cl2')}>.cl</code> <div>class</div>
            <code onClick={() => insertSelector('.cl.cl1')}>.cl1.cl2</code> <div>.cl1 and .cl2</div>
            <code onClick={() => insertSelector('#id1, #id3')}>.cl1, .cl2</code> <div>.cl1 or .cl2</div>
          </div>
        </>

        <>
          <Hs>Relations</Hs>
          <div className='grid'>
            <code onClick={() => insertSelector('.outer span')}>{'div p'}</code> <div>all <i>p</i> in <i>div</i></div>
            <code onClick={() => insertSelector('.outer > span')}>{'div > p'}</code> <div><i>p</i> children of <i>div</i></div>
            <code onClick={() => insertSelector('#id2 ~ span')}>{'div ~ p'}</code> <div> <i>p</i> siblings after <i>div</i></div>
            <code onClick={() => insertSelector('#id2 + span')}>{'div + p'}</code> <div>next <i>p</i> sibling after <i>div</i></div>
          </div>
        </>

        <>
          <Hs>Attributes</Hs>
          <div className='grid'>
            <code onClick={() => insertSelector('[id]')}>[attr]</code> <div>has attr</div>
            <code onClick={() => insertSelector('[id="id3"]')}>[attr='val']</code> <div>exact</div>
            <code onClick={() => insertSelector('[myattr^="1"]')}>[attr^='val']</code> <div>begins</div>
            <code onClick={() => insertSelector('[myattr$="3"]')}>[attr$='val']</code> <div>ends</div>
            <code onClick={() => insertSelector('[myattr*="2"]')}>[attr*='val']</code> <div>contains</div>
            <code onClick={() => insertSelector('[myattr~="2"]')}>[attr~='val']</code> <div>contains word</div>
            <code onClick={() => insertSelector('[myattr|="1"]')}>[attr|='val']</code> <div>exact or starts from 'val-'</div>
            <code onClick={() => insertSelector('span:lang(it)')}>:lang(language)</code> <div>element with a lang attribute</div>
          </div>
        </>

        <>
          <Hs>Filter siblings</Hs>
          <div className='grid'>
            <code onClick={() => insertSelector('.outer *:first-child')}>:first-child</code> <div>first child</div>
            <code onClick={() => insertSelector('.outer *:last-child')}>:last-child</code> <div>last</div>
            <code onClick={() => insertSelector('.outer *:only-child')}>:only-child</code> <div>sole</div>
            <code onClick={() => insertSelector('.outer *:nth-child(5)')}>:nth-child(n)</code> <div>n-th</div>
            <code onClick={() => insertSelector('.outer *:nth-last-child(5)')}>:nth-last-child(n)</code> <div>...from the end</div>
            <code onClick={() => insertSelector('.outer *:nth-child(2n)')}>:nth-child(2n)</code> <div>2, 4, 6</div>
            <code onClick={() => insertSelector('.outer > *:nth-child(n+3)')}>:nth-child(n+3)</code> <div>3, 4, 5, ...</div>
            <code onClick={() => insertSelector('.outer > *:nth-child(-n+9)')}>:nth-child(-n+9)</code> <div>..., 7, 8, 9</div>
            <code onClick={() => insertSelector('.outer *:nth-child(2n+1)')}>:nth-child(2n+1)</code> <div>1, 3, 5</div>
            <code onClick={() => insertSelector('.outer *:nth-child(3n+2)')}>:nth-child(3n+2)</code> <div>2, 5, 8</div>
            <code onClick={() => insertSelector('.outer > *:nth-child(n+3):nth-child(-n+5)')}>:nth-child(n+3):nth-child(-n+5)</code> <div>3, 4, 5</div>
            <code onClick={() => insertSelector('.outer *:nth-child(odd)')}>:nth-child(odd)</code> <div>odd</div>
            <code onClick={() => insertSelector('.outer *:nth-child(even)')}>:nth-child(even)</code> <div>even</div>
          </div>
        </>

        <>
          <Hs>Filter siblings of same tag</Hs>
          <div className='grid'>
            <code onClick={() => insertSelector('.outer span:first-of-type')}>:first-of-type</code> <div>first child</div>
            <code onClick={() => insertSelector('.outer span:last-of-type')}>:last-of-type</code> <div>last</div>
            <code onClick={() => insertSelector('.outer span:only-of-type')}>:only-of-type</code> <div>sole</div>
            <code onClick={() => insertSelector('.outer span:nth-of-type(5)')}>:nth-of-type(n)</code> <div>n-th</div>
            <code onClick={() => insertSelector('.outer span:nth-last-of-type(5)')}>:nth-last-of-type(n)</code> <div>from the end</div>
          </div>
        </>

        <>
          <Hs>Pseudo elements</Hs>
          <div>They do not exist in DOM, use <Code js>const styles = window.getComputedStyle(element,':after')</Code> to get data by JS.</div>
          <div className='grid'>
            <code onClick={() => insertSelector('span::before')}>::before</code> <div>creates empty element before children (css only)</div>
            <code onClick={() => insertSelector('span::after')}>::after</code> <div>after children (css only)</div>
            <code onClick={() => insertSelector('::selection')}>::selection</code> <div>portion of an element that is selected by a user (css only)</div>
            <code onClick={() => insertSelector('::marker')}>::marker</code> <div>markers of list items (css only)</div>
            <code onClick={() => insertSelector('::placeholder')}>::placeholder</code><div>placeholder (css only)</div>
            <code onClick={() => insertSelector('::first-letter')}>::first-letter</code> <div>first letter (css only)</div>
            <code onClick={() => insertSelector('::first-line')}>::first-line</code> <div>first line (css only)</div>
          </div>
        </>

        <>
          <Hs>Pseudo class state</Hs>
          <div className='grid'>
            <code onClick={() => insertSelector(':hover')}>:hover</code> <div>elements currently hovered</div>
            <code onClick={() => insertSelector(':focus')}>:focus</code> <div>elements currently focused</div>
          </div>
        </>

        <>
          <Hs>Input</Hs>
          <div className='grid'>
            <code onClick={() => insertSelector(':required')}>:required</code> <div>'required' attr</div>
            <code onClick={() => insertSelector('input:optional')}>:optional</code> <div>inputs with no "required" attr</div>
            <code onClick={() => insertSelector(':checked')}>:checked</code> <div>'checked' attr</div>
            <code onClick={() => insertSelector(':disabled')}>:disabled</code> <div>'disabled' attr</div>
            <code onClick={() => insertSelector(':enabled')}>:enabled</code> <div>no 'disabled' attr</div>
            <code onClick={() => insertSelector(':in-range')}>:in-range</code> <div>value within a range</div>
            <code onClick={() => insertSelector(':out-of-range')}>:out-of-range</code> <div>value out of a range</div>
            <code onClick={() => insertSelector(':valid')}>:valid</code> <div>valid values</div>
            <code onClick={() => insertSelector(':invalid')}>:invalid</code> <div>invalid values</div>
            <code onClick={() => insertSelector('input:read-only')}>:read-only</code><div>inputs with "readonly" attr</div>
            <code onClick={() => insertSelector('input:read-write')}>:read-write</code><div>inputs without "readonly" attr</div>
            <code onClick={() => insertSelector(':default')}>:default</code> <div>default checkbox</div>
          </div>
        </>

        <>
          <Hs>Link</Hs>
          <div className='grid'>
            <code onClick={() => insertSelector('a:visited')}>:visited</code> <div>visited links (css only)</div>
            <code onClick={() => insertSelector('a:active')}>:active</code> <div>when element under click (css only)</div>
            <code onClick={() => insertSelector(':target')}>:target</code> <div>for ex. el has <i>id="intro"</i>, selector will match if url is <i>http://...#intro</i></div>
            <code onClick={() => insertSelector(':link')}>:link</code> <div>unvisited links</div>
          </div>
        </>

        <>
          <Hs>Other</Hs>
          <div className='grid'>
            <code onClick={() => insertSelector('.outer *:not([id]):not(div)')}>:not(selector)</code> <div>all except selector</div>
            <code onClick={() => insertSelector('span:empty')}>:empty</code> <div>w/o children & text nodes</div>
            <code onClick={() => insertSelector(':root')}>:root</code> <div>document's html root element, works on <i>document</i></div>
          </div>
        </>
      </SelectorDiv>
    </>
  )
}
const Container = styled.div`
  border: 1px solid grey;
  padding: 5px;
  border-radius: 5px;

  .outer {
    padding: 5px;
    
  }
  div, span, ul, a {
    border: 1px solid #e9a7a7;
    border-radius: 5px;
    
  }
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px 5px;
    min-height: 50px;
    width: 100%;
  }
  .outer span, .outer div {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: .8em;
    padding: 5px;
  }
  .outer div {
    max-width: 100px;
    display: inline;
  }
  #before::before {
    content: "♥";
    color: red;
    font-size: 14px;
  }
  #after::after {
    content: "♥";
    color: green;
    font-size: 14px;
  }
`
const SelectorDiv = styled.div`
  code {
    cursor: pointer;
    padding: 0px 4px;
  }
  .grid {
    display: inline-grid;
    grid-template-columns: auto 1fr;
    justify-items: start;
    align-items: start;
    grid-gap: 5px 20px;
    ${'' /* border: 1px solid grey; */}
    ${'' /* border-radius: 8px; */}
    padding: 10px;
    margin-right: 10px; 
    margin-bottom: 20px;
  }
`

const postObj = {
  title: 'dom traversal',
  date: '2022.01.09',
  tags: ['JavaScript', 'basics', 'css', 'jQuery'],
  imgUrl: 'https://antonarbus.com/imgs/dom traversal.png',
  desc: 'DOM traversal with CSS & JavaScript & jQuery',
  body: (
    <>
      <H>Glossary</H>

      <ul>
        <li><i>DOM</i> - document object model which represents a web page.</li>
        <li> DOM tree consists of different Nodes: <i>document</i>, <i>documentFragment</i>, <i>documentType</i>, <i>element</i>, <i>text</i>, <i>comment</i>.</li>
        <li><i>Element</i> - <i>Node</i> object, which represents html tag.</li>
        <li><i>Ancestors</i> - all elements up the DOM tree</li>
        <li><i>Descendants</i> - all elements down the DOM tree</li>
        <li><i>Children</i> - all elements 1 level down the DOM tree</li>
        <li><i>Siblings</i> - elements on the same DOM level (children of the same parent)</li>
      </ul>

      <H>Selection</H>

      <p>DOM elements can be selected by CSS selectors via following methods</p>
      <ul>
        <li><Code js>el.querySelectorAll('selector')</Code> <i>static</i> Collection of els or or an empty NodeList if no matches.</li>
        <li><Code js>el.querySelector('selector')</Code> <i>static</i> element, <code>null</code> if no matches, same as <Code js>el.querySelectorAll('selector')[0]</Code></li>
        <li><Code js>document.getElementById('id')</Code> element with <code>id</code> or <code>null</code> if no matches.</li>
        <li><Code js>el.getElementsByClassName('className')</Code> <i>live</i> Collection of elements with the given class name.</li>
        <li><Code js>el.getElementsByTagName('tagName')</Code> <i>live</i> Collection of elements with the given tag name or <code>null</code> if no matches. Tag can be <code>*</code> for any tags.</li>
        <li><Code js>document.getElementsByName('nameVal')</Code> <i>live</i> Collection of elements with a given name attribute.</li>
      </ul>

      <H>Main DOM objects & shortcuts</H>

      <ul>
        <li><Code js>window</Code> global parent object, which contains DOM</li>
        <li><Code js>document</Code>, same as <Code js>window.document</Code>, top node, entry point into DOM</li>
        <li><Code js>document.documentElement</Code>, same as <Code js>document.querySelector('HTML')</Code>, {'<html>'} element</li>
        <li><Code js>document.head</Code>, same as <Code js>document.querySelector('head')</Code>, {'<head>'} element</li>
        <li><Code js>document.body</Code>, same as <Code js>document.querySelector('body')</Code>, {'<body>'} element</li>
      </ul>

      <H id='css-selectors'>CSS selectors</H>

      <Cmpt />

      <H>Testing</H>

      <ul>
        <li><Code js>el.matches('selectorStr')</Code> <code>true</code> if the <code>el</code> matches <code>selectorStr</code></li>
        <li><Code js>node.contains(otherNode)</Code> <code>true</code> if the <code>node</code> contains <code>otherNode</code> or if they are same nodes</li>
        <li><Code js>node.hasChildNodes()</Code> <code>true</code> if node has child nodes</li>
        <li><Code js>node.isEqualNode(otherNode)</Code> <code>true</code> if the two nodes are alike</li>
        <li><Code js>node.isSameNode(otherNode)</Code> <code>true</code> if the two nodes are same object</li>
      </ul>

      <H>Navigation</H>

      <Hs>HTML elements</Hs>

      <ul>
        <li><Code js>el.parentElement</Code> parent element one level up the DOM</li>
        <li><Code js>el.children</Code> elements one level down the DOM</li>
        <li><Code js>el.childElementCount</Code> number of children</li>
        <li><Code js>el.firstElementChild</Code> first child</li>
        <li><Code js>el.lastElementChild</Code> last child</li>
        <li><Code js>el.nextElementSibling</Code> next element on the same DOM level</li>
        <li><Code js>el.previousElementSibling</Code> previous element on the same DOM level</li>
        <li><Code js>el.closest('selector')</Code> first matching element starting from itself and upwards, <code>null</code> if no matches</li>
        <li><Code js>el.shadowRoot</Code> shadow root el that is hosted by the element, or null</li>
      </ul>

      <Hs>Nodes</Hs>

      <ul>
        <li><Code js>node.parentNode</Code></li>
        <li><Code js>node.parentElement</Code></li>
        <li><Code js>node.childNodes</Code> <b>live</b> NodeList with all children (one level down)</li>
        <li><Code js>node.firstChild = Node.childNodes[0]</Code></li>
        <li><Code js>node.lastChild = Node.childNodes[Node.childNodes.length - 1]</Code></li>
        <li><Code js>node.nextSibling</Code></li>
        <li><Code js>node.previousSibling</Code></li>
        <li><Code js>node.getRootNode()</Code> - return HTMLDocument or ShadowRoot</li>
      </ul>

      <Hs>Table</Hs>

      <Code js>let tbl = document.querySelector('table')</Code>
      <ul>
        <li><Code js>tbl.caption</Code> {'<caption>'}</li>
        <li><Code js>tbl.tHead</Code> {'<thead>'}</li>
        <li><Code js>tbl.tBodies</Code> tBodies collection</li>
        <li><Code js>tbl.tBodies[0]</Code> {'<tbody>'}</li>
        <li><Code js>tbl.tFoot</Code> {'<tfoot>'}</li>
        <li><Code js>tbl.rows</Code> collection of table rows (tr)</li>
        <li><Code js>tbl.tHead.rows</Code> tr collection </li>
        <li><Code js>tbl.tBodies[0].rows</Code> tr collection</li>
        <li><Code js>tbl.tFoot.rows</Code> tr collection</li>
        <li><Code js>tbl.rows[1].sectionRowIndex</Code> 0, index of the given {'<tr>'} inside {'<thead>'}, {'<tbody>'}, {'<tfoot>'}</li>
        <li><Code js>tbl.rows[1].rowIndex</Code> 1, index of the given {'<tr>'} inside table</li>
        <li><Code js>tbl.tBodies[0].rows[1].cells</Code> collection of cells {'<td>'} in 2nd row </li>
        <li><Code js>tbl.tHead.rows[0].cells[3].cellIndex</Code> 3, cell index inside {'<tr>'}</li>
      </ul>

      <Hs>Form</Hs>

      <p>Forms are members of the special collection <code>document.forms</code></p>
      <ul>
        <li><Code js>document.forms</Code> collection of forms</li>
        <li><Code js>document.forms[0]</Code> first form in the document</li>
        <li><Code js>document.forms.login</Code> form with attribute <code>name="login"</code></li>
        <li><Code js>document.forms["login"]</Code> same</li>
        <li><Code js>document.forms["login"].elements</Code> collection of elements in the form</li>
        <li><Code js>document.forms["login"].elements.password</Code> collection of elements with attribute <code>name="password"</code></li>
        <li><Code js>document.forms["login"].elements["password"]</Code> same</li>
        <li><Code js>document.forms["login"].password</Code> same, short notation</li>
      </ul>

      <p>Forms are members of the special collection <code>document.forms</code></p>

      <ul>
        <li><Code js>input.value = "new value"</Code> xxx</li>
      </ul>

      <H><Lnk path="https://jquery.com/download/">jQuery</Lnk></H>

      <Hs>Select</Hs>

      <ul>
        <li><Code js>jQuery('selector')</Code>, same as <Code js>$('selector')</Code>, searches in DOM and returns a new jQuery obj with found elements <br /></li>
        <li><Code js>$('span', this)</Code>, same as <Code js>$(this).find('span')</Code></li>
        <li><Code js>$(el)</Code> can feed html element into jQuery to make it a jQ object</li>
        <li><Code js>$("div").get()</Code> - returns array instead of jQ object</li>
        <li><Code js>$("div").get(0)</Code>, same as <Code js>$("div")[0]</Code> - returns first DOM element</li>
        <li>All CSS selectors works for jQ</li>
      </ul>

      <Hs>Additional selectors</Hs>

      <ul>
        <li><Code js>$("[attr!='val']")</Code> elements without attr value <Code js>{'// $("textarea[placeholder!=\'Word\']")'}</Code></li>
        <li><Code js>$(":hidden")</Code> hidden elements </li>
        <li><Code js>$(":visible")</Code> not hidden elements, elements with <code>visibility: hidden;</code> & <code>opacity: 0</code> are also <i>visible</i></li>
        <li><Code js>$(":eq(index)")</Code> element at index within the matched set. <span style={{ color: 'red' }}>Deprecated</span>, <code>.eq()</code> is better.</li>
        <li><Code js>$(":first")</Code> first matched DOM element. <span style={{ color: 'red' }}>Deprecated</span>, <code>.first()</code> is better.</li>
        <li><Code js>$(":last")</Code> last one. <span style={{ color: 'red' }}>Deprecated</span>, <code>.last()</code> is better.</li>
        <li><Code js>$(":even")</Code> 1st, 3rd element, and so on. <span style={{ color: 'red' }}>Deprecated</span>, <code>.even()</code> is better.</li>
        <li><Code js>$(":odd")</Code> 2nd, 4th element, and so. <span style={{ color: 'red' }}>Deprecated</span>, <code>.odd()</code> is better.</li>
        <li><Code js>$(":gt(index)")</Code> elements at an index greater than. <span style={{ color: 'red' }}>Deprecated</span>, <code>.slice(4)</code> is better.</li>
        <li><Code js>$(":lt(index)")</Code> elements at an index less than. <span style={{ color: 'red' }}>Deprecated</span>, <code>.slice(0, 3)</code> is better.</li>
        <li><Code js>$(":header")</Code>  elements that are headers, like h1, h2, H and so on. Better to use <code>.filter(":header")</code></li>
        <li><Code js>$(":animated")</Code> elements that are in the progress of an animation. Better to use <code>.filter(":animated")</code></li>
        <li><Code js>$(":contains(text)")</Code> elements that contain the specified text</li>
        <li><Code js>$(":has(selector)")</Code> elements which contain at least one element. Better to use <code>.has()</code></li>
        <li><Code js>$(":parent")</Code> elements that have at least one child node</li>
        <li><Code js>$(":checkbox")</Code> inputs of type 'checkbox'</li>
        <li><Code js>$(":radio")</Code> inputs of type 'radio'</li>
        <li><Code js>$(":selected")</Code> options that are selected</li>
        <li><Code js>$(":button")</Code> button elements and elements of type 'button'</li>
        <li><Code js>$(":file")</Code> elements of type 'file'</li>
        <li><Code js>$(":input")</Code> input, textarea, select and button elements</li>
        <li><Code js>$(":image")</Code>  elements of type 'image'</li>
        <li><Code js>$(":submit")</Code> elements of type 'submit'</li>
        <li><Code js>$(":password")</Code> elements of type 'password'</li>
        <li><Code js>$(":reset")</Code> elements of type 'reset'</li>
        <li><Code js>$(":text")</Code> inputs of type 'text' + inputs without type</li>
      </ul>

      <Hs>Traverse up</Hs>

      <ul>
        <li><Code js>$().parent()</Code> first parent element</li>
        <li><Code js>$().offsetParent()</Code> first positioned element up in the DOM tree</li>
        <li><Code js>$().parents()</Code> all parents in the DOM tree up to {'<html>'}</li>
        <li><Code js>$().parentsUntil(selector)</Code> all parents until <code>selector</code></li>
        <li><Code js>$().closest(selector)</Code> first element up in the DOM tree</li>
      </ul>

      <Hs>Traverse down</Hs>

      <ul>
        <li><Code js>$().children()</Code> elements one level down the DOM</li>
        <li><Code js>$().children('span')</Code> same, but filters</li>
        <li><Code js>$().find('span');</Code> searches all the way down</li>
      </ul>

      <Hs>Traverse sideways</Hs>

      <ul>
        <li><Code js>$().siblings()</Code> elements around on the same DOM level</li>
        <li><Code js>$().next()</Code> next element</li>
        <li><Code js>$().prev()</Code> previous element</li>
        <li><Code js>$().nextAll()</Code> next elements</li>
        <li><Code js>$().prevAll()</Code> previous elements</li>
        <li><Code js>$().nextUntil(selector)</Code> next elements until <code>selector</code></li>
        <li><Code js>$().prevUntil(selector)</Code> previous elements until <code>selector</code></li>
      </ul>

      <Hs>Reduce</Hs>

      <ul>
        <li><Code js>$().first()</Code> first element from jQ object</li>
        <li><Code js>$().last()</Code> last element from jQ object</li>
        <li><Code js>$().filter(selector)</Code> reduce the list to match the selector</li>
        <li><Code js>$().eq(1)</Code> elements with specified index</li>
        <li><Code js>$().eq(-1)</Code> negative index is possible</li>
        <li><Code js>$().even()</Code> even ones, numbered from zero</li>
        <li><Code js>$().odd()</Code> odd ones, numbered from zero</li>
        <li><Code js>$().slice(6, 8)</Code> els from start to optional end</li>
        <li><Code js>$().has(selector)</Code> els having matching descendants</li>
        <li><Code js>$().not(selector)</Code> els not matching selector</li>
      </ul>

      <Hs>Expand</Hs>

      <ul>
        <li><Code js>$().add(selector)</Code> union of elements</li>
        <li><Code js>$('#th2').next().addBack()</Code> add previous set of elements on the stack <code>{'// th#th2, th#tH'}</code></li>
        <li><Code js>$('textarea').first().end()</Code> restores previous filtering</li>
      </ul>

      <Hs>Test</Hs>

      <ul>
        <li><Code js>$().has(selector).length</Code> check if an element is inside another</li>
        <li><Code js>$().is(selector)</Code> test against selector or el</li>
      </ul>

      <Hs>Index</Hs>

      <ul>
        <li><Code js>$().eq(1).index()</Code> 1, returns index</li>
        <li><Code js>$('span').eq(0).index('*')</Code> 56, returns index of 1st span from collection of all elements</li>
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
