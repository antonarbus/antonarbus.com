import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'github copilot',
  date: '2024.05.11',
  tags: ['ai', 'github', 'copilot'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'gotchas about github copilot',
  body: (
    <>
      <H>Shortcuts</H>

      <ul>
        <li><kbd>Tab</kbd> accept ghost text suggestion</li>
        <li><kbd>Cmd</kbd> + <kbd>Right Arrow</kbd> accept next word</li>
        <li><kbd>Ctrl</kbd> + <kbd>P</kbd> inline chat prompt (my custom keybinding)</li>
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
