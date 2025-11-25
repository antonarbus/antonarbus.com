'use client'

import { useRef, useState } from 'react'
import root from 'react-shadow'
import { Resizable } from 're-resizable'

/**
 * @description
 * Textarea where you may add html element and it will be rendered below.\
 * Useful for playing with CSS.
 *
 * htmlString={\`\
 *   \<html>\
 *    &nbsp;&nbsp;\<head>\
 *      &nbsp;&nbsp;&nbsp;&nbsp;\<style>\
 *        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;div {\
 *          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;display: flex;\
 *        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}\
 *      &nbsp;&nbsp;&nbsp;&nbsp;\</style>\
 *    &nbsp;&nbsp;\</head>\
 *    &nbsp;&nbsp;\<body>\
 *      &nbsp;&nbsp;&nbsp;&nbsp;\<div>hello\</div>\
 *    &nbsp;&nbsp;\</body>\
 *  \</html>\
 * \`}
 */
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
          width: 'auto',
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
        <div dangerouslySetInnerHTML={{ __html: html }} style={{ all: 'unset' }} />
      </root.div>
    </>
  )
}
