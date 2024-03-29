import { H, Lnk, Code, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'display',
  date: '2022.02.11',
  tags: ['css', 'property'],
  desc: 'Display & float property in CSS',
  body: (
    <>
      <H>display: inline</H>
      <ul>
        <li>Inline elements are elements with <Code>display: inline</Code>, such as <Code html>{'<a>'}</Code>, <Code html>{'<input>'}</Code>, <Code html>{'<span>'}</Code>, <Code html>{'<img>'}</Code> and others</li>
        <li>Text is inline element</li>
        <li>Inline elements go on the same line one by one</li>
        <li>Inline elements jumps to the next line if there is no space anymore</li>
        <li>Width / height fits the content & can not be set</li>
        <li>Top & bottom margins can not be set</li>
        <li>Left & right margins can be set</li>
        <li>Padding can be set</li>
        <li>Line break in html between inline elements is considered as a space</li>
      </ul>
      <H>display: block</H>
      <ul>
        <li>Block elements go one under another (if there is no "float" property)</li>
        <li>Block tends to expand to the whole width</li>
        <li>Height / width can be set</li>
        <li>Block elements stick to each other w/o gaps (if there is no margin)</li>
        <li>Most of elements are block els by default</li>
        <li>Block element is a rectangle</li>
      </ul>
      <H>display: inline-block</H>
      <ul>
        <li>It is a block element with few exceptions</li>
        <li>Elements go on the same line one by one</li>
        <li>Width & height fits the content</li>
        <li>Width & height can be set</li>
        <li>Usually used to show block els in one line</li>
        <li>Line break in html (between tags for ex) considered as a space</li>
      </ul>
      <H>display: table</H>
      <ul>
        Can make a table from any element with following properties
        <li><Code css>{'display: table'}</Code></li>
        <li><Code css>{'display: table-row'}</Code></li>
        <li><Code css>{'display: table-header-group'}</Code></li>
        <li><Code css>{'display: table-row-group'}</Code></li>
        <li><Code css>{'display: table-footer-group'}</Code></li>
        <li><Code css>{'display: table-column'}</Code></li>
        <li><Code css>{'display: table-column-group'}</Code></li>
        <li><Code css>{'display: table-cell'}</Code></li>
        <li><Code css>{'display: table-caption'}</Code></li>
      </ul>
      <H>display: flex</H>
      <ul>
        <li>Flex container expands or shrinks items to fill available free.</li>
        <li>Flex layout is direction-agnostic</li>
        <li>Check my <Lnk path="/post/display:-flex">playground</Lnk> for flex properties</li>
      </ul>
      <H>display: list-item</H>
      <p>Makes like a <Code html>{'<li>'}</Code> bullet point list element.</p>
      <H>display: run-in</H>
      <p>Element becomes the first inline element of next block element</p>
      <H>float: left</H>
      <ul>
        <li><Code css>float: left | right | none | inherit</Code></li>
        <li>With <Code css>float</Code> property element is extracted from the normal css flow</li>
        <li>It is moved to left/right until touches the parent's edge or another <i>floating</i> element</li>
        <li>Float makes element automatically <Code css>display: block</Code></li>
        <li>If there is no space to fit the element on a line, then it goes to the next line</li>
        <li>Other non-positioned block elements w/o <i>float</i> acts like floating element does not exist</li>
        <li>Inline elements know about floating element and go around it</li>
        <li>There is no vertical margin collapsing between floating and neighboring elements</li>
        <li>Float block can be a container and include other elements</li>
        <li>Widely used in text with images</li>
        <li>Parent does not reserve space for floating element, to fix it may add element after with <Code css>clear: left | right | both</Code></li>
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
