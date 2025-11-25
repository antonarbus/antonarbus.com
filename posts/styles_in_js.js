'use client'


import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'styles in JS',
  date: '2022.06.08',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/js.jpg',
  desc: 'styles in JS',
  body: (
    <>
      <p>CSS manipulation is preferable than style modification.</p>

      <H>className</H>

      <p>Replaces the whole string of classes.</p>

      <Code block jsx>{`
        $0.className // 'unhide font-weight-600'
        $0.className = 'new-class'
        $0.className // 'new-class'
      `}</Code>

      <H>classList</H>

      <ul>
        <li>special object with methods to add/remove/toggle a single class</li>
        <li>iterable, we can list all classes with <code>for..of</code></li>
      </ul>

      <Hs>classList.add()</Hs>

      <p>adds the class</p>

      <Code block>el.classList.add("class")</Code>

      <Hs>classList.remove()</Hs>

      <p>removes the class</p>

      <Code block>el.classList.remove("class")</Code>

      <Hs>classList.contains()</Hs>

      <p>checks for the given class, returns true/false</p>

      <Code block>el.classList.contains("class")</Code>

      <Hs>classList.toggle()</Hs>

      <p>adds the class if it doesn’t exist, otherwise removes it</p>

      <Code block>el.classList.toggle("class")</Code>

      <H>style</H>

      <ul>
        <li><code>el.style</code> is an object that corresponds to what’s written in the <code>style</code> attribute</li>
        <li>operates only on the value of the <code>style</code> attribute, w/o any CSS cascade</li>
        <li>For multi-word property the camelCase is used</li>
        <li>Browser-prefixed properties like -moz-border-radius also follow the same rule: a dash means upper case</li>
      </ul>

      <Code block jsx>{`
      elem.style.width = "100px"
      elem.style.backgroundColor // background-color 
      elem.style.zIndex // z-index
      elem.style.borderLeftWidth // border-left-width
      document.body.style.backgroundColor = prompt('background color?', 'green')
      button.style.MozBorderRadius = '5px';
      button.style.WebkitBorderRadius = '5px';
      `}</Code>

      <p>Mind the units.</p>

      <Code block jsx>{`
      document.body.style.margin = 20 // doesn't work!
      document.body.style.margin = '20px' // works
      // browser “unpacks” the property style.margin in the last lines and 
      // infers style.marginLeft and style.marginTop from it
      `}</Code>

      <H>style.cssText</H>

      <ul>
        <li>sets full style attribute</li>
        <li>rarely used</li>
        <li>removes all existing styles</li>
        <li>we can safely use it for new elements, when we know we won’t delete an existing style</li>
      </ul>

      <Code block jsx>{`
        div.style.cssText=\`color: red !important;
        background-color: yellow;
        width: 100px;
        text-align: center;
        \`
      `}</Code>

      <p>Same can be done via...</p>

      <Code block jsx>{`
      document.body.setAttribute('style', 'color: red; background-color: yellow;')
      `}</Code>

      <H>getComputedStyle()</H>

      <Code inline jsx>getComputedStyle(element, [pseudo])</Code>

      <ul>
        <li>the <code>style</code> property operates only on the value of the <code>style</code> attribute, w/o any CSS cascade</li>
        <li>we can’t read anything that comes from CSS classes</li>
        <li><code>getComputedStyle</code> requires the full property name</li>
        <li><code>getComputedStyle</code> actually returns the resolved value, usually in 'px'</li>
        <li>it is a a value after all CSS rules and CSS inheritance is applied</li>
        <li>A resolved style value is the one finally applied to the element</li>
        <li>units are fixed and absolute, for ex. <i>height:20px</i> or <i>font-size:16px</i></li>
        <li>does not give access to the color of :visited pseudo class due to privacy reason</li>
      </ul>

      <Code block jsx>{`
      getComputedStyle(document.body) // object with styles, like elem.style, but with respect to all CSS classes
      getComputedStyle(document.body).font // "300 14px Roboto, sans-serif"
      getComputedStyle(document.body).color // "rgb(0, 0, 0)"
      `}</Code>

      <H>setProperty / removeProperty</H>

      <ul>
        <li>You may add and delete css prop directly in styles object</li>
        <Code block jsx>{`
          element.style.zoom = '2'
          element.style.zoom = ''
        `}</Code>
        <li>Or via function <code>setProperty</code></li>
        <Code block jsx>{`
          element.style.setProperty('zoom', '2')
          element.style.getPropertyValue('zoom')
          element.style.removeProperty('zoom')
        `}</Code>
        <li>it is cool, coz you do not have to use kebab case and use same keys as in css</li>
        <Code block jsx>{`
          element.style.setProperty( 'background-color', '#fafafa' )
        `}</Code>
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
