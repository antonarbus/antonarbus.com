import { useRef, useState } from 'react'
import root from 'react-shadow'

/**
 * @description
 * Textarea where you may add html element and it will be rendered below.\
 * Useful for playing with CSS.
 *
 * htmlString={\`\
 *   \</html>\
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
      <pre
        contentEditable
        style={{
          maxHeight: 'initial',
          border: '3px dashed #68bbe1',
          background: '#edfdff'
        }}
        onInput={() => {
          console.log(codeRef.current.innerText)
          setHtml(codeRef.current.innerText)
        }}
      >
        <code ref={codeRef} className={'lang-html'}>
          {htmlString}
        </code>
      </pre>
      <root.div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </root.div>
    </>
  )
}
