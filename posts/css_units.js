'use client'


import { H, jsxToStr, Lnk } from '/components/post/reExport'

const postObj = {
  title: 'css units',
  date: '2022.06.09',
  tags: ['css', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/css_units.png',
  desc: 'css units',
  body: (
    <>
      <p>Good <Lnk path='https://dev.to/matthias/units-in-css-em-rem-pt-px-vw-vh-vmin-vmax-ex-ch-53l0'>post</Lnk> about units.</p>

      <H>px</H>

      <ul>
        <li>pixels</li>
        <li>absolute value</li>
      </ul>

      <H>em</H>

      <ul>
        <li>relative from parent</li>
        <li>1, 1.2, 2, 5...</li>
      </ul>

      <H>rem</H>

      <ul>
        <li>relative from root(html) font-size</li>
        <li>1rem, 0.8rem</li>
        <li>default html font size is 16px</li>
        <li>do not depend on other elements</li>
        <li>good for zooming</li>
      </ul>

      <H>%</H>

      <ul>
        <li>relative from parent's same property</li>
        <li>for <code>margin</code> % is taken from parent's width</li>
        <li>for <code>line-height</code> % is taken from current font-size</li>
        <li>for <code>width</code> & <code>height</code> % is taken from parent's w/h</li>
        <li>for <code>width</code> & <code>height</code> with <code>position:fixed</code> % is taken from window's w/h</li>
        <li>for <code>width</code> & <code>height</code> with <code>position:absolute</code> %  % is taken from window's w/h if there is no parent</li>
        <li>for <code>top</code> <code>right</code> <code>bottom</code> <code>left</code> % is taken from parents height & width (as understood)</li>
      </ul>

      <H>vw & vh</H>

      <ul>
        <li>1% from window width & height</li>
        <li>50% means the half of the viewport width & height</li>
      </ul>

      <H>vmin & vmax</H>

      <ul>
        <li>min & max from <code>vw</code> & <code>vh</code></li>
        <li><code>vmin</code> is 1% of viewport's smaller side</li>
        <li><code>vmax</code> is 1% of viewport's larger side</li>
        <li>scalable for screen sizes</li>
        <li>good for phones</li>
      </ul>

      <H>ex & ch</H>

      <p>Smth like <code>em</code>, not used widely, just forget it.</p>

      <H>mm, cm, pt, pc</H>

      <p>Outdated, also forget it.</p>
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
