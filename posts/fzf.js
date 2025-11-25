'use client'


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
  title: 'fzf',
  date: '2025.01.29',
  tags: ['terminal', 'tools'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'fzf',
  body: (
    <>
      <H>FZF</H>

      <ul>
        <li>FZF - fuzzy finder for terminal</li>
        <li>
          <Lnk path="https://github.com/junegunn/fzf">https://github.com/junegunn/fzf</Lnk>
        </li>
      </ul>

      <H>FZF</H>

      <ul>
        <li>FZF - fuzzy finder for terminal</li>
        <li>
          <code>brew install fzf</code> install fzf
        </li>
        <li>
          <code>brew install fd</code> install fd
        </li>
        <li>
          <code>code ~/.zshrc</code> open terminal config
        </li>
        <li>
          add at the end <code>{'source <(fzf --zsh)'}</code>
        </li>
        <li>
          add{' '}
          <code>
            {
              "export FZF_DEFAULT_COMMAND='fd --type f --hidden --exclude .git --exclude node_modules'"
            }
          </code>
        </li>
        <li>
          <code>source ~/.zshrc</code> apply changes
        </li>
      </ul>

      <H>Shortcuts</H>

      <ul>
        <li>
          <kbd>CTRL+T</kbd> paste the selected files and directories onto the command-line
        </li>
        <li>
          <kbd>ALT+C</kbd> cd into the selected directory
        </li>
        <li>
          <kbd>CTRL-R</kbd> paste the selected command from history onto the command-line
        </li>
        <li>
          <code>{'COMMAND [DIRECTORY/][FUZZY_PATTERN]**<TAB>'}</code> fuzzy completion
        </li>
        <li>
          <code>{'open ../fzf**<TAB>'}</code>
        </li>
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
