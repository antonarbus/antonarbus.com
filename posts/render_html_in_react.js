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
  title: 'render html in react',
  date: '2024.09.27',
  tags: ['react'],
  imgUrl: 'https://antonarbus.com/imgs/react.png',
  desc: 'render raw html string in react',
  body: (
    <>
      <H>dangerouslySetInnerHTML</H>

      <ul>
        <li>
          <Code>dangerouslySetInnerHTML</Code> is a special react prop
        </li>
        <li>
          it overrides the <code>innerHTML</code> property of the DOM node and displays the passed
          HTML string
        </li>
      </ul>

      <Code block jsx>{`
        import { useRef, useState } from 'react'
        import root from 'react-shadow'
        import { Resizable } from 're-resizable'

        
        export const ComponentFromHtmlString = ({ htmlString }) => {
          const codeRef = useRef()
          const [html, setHtml] = useState(htmlString ?? '<div>hello</div>')

          return (
            <>
              <Resizable
                enable={{
                  bottom: true
                }}
                defaultSize={{
                  width: 'inherit',
                  height: '300px'
                }}
                style={{
                  marginBottom: '10px'
                }}
              >
                <pre
                  style={{
                    maxHeight: 'initial',
                    border: '3px dashed #68bbe1',
                    background: '#edfdff',
                    height: '100%',
                    cursor: 'text'
                  }}
                  onInput={() => {
                    setHtml(codeRef.current.textContent)
                  }}
                >
                  <code
                    ref={codeRef}
                    className={'lang-html'}
                    contentEditable
                    style={{
                      outline: 'none'
                    }}
                  >
                    {htmlString}
                  </code>
                </pre>
              </Resizable>
              <root.div>
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </root.div>
            </>
          )
        }
      `}</Code>

      <ComponentFromHtmlString
        htmlString={`
          <html>
            <head>
              <style>
                .parent {
                  display: flex;
                  gap: 5px;
                }
                .contents {
                  display: contents;
                }
                .child {
                  border: 1px solid grey;
                  padding: 10px;
                }
              </style>
            </head>
            <body>      
              <div class='parent'>
                <div class='child'>1</div>
                <div class='child'>2</div>
                <div class='child'>3</div>
                <div>
                  <div class='child'>4</div>
                  <div class='child'>5</div>
                  <div class='child'>6</div>
                </div>
                <div class='contents'>
                  <div class='child'>7</div>
                  <div class='child'>8</div>
                  <div class='child'>9</div>
                </div>
              </div>
            </body>
          </html>
        `}
      />
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
