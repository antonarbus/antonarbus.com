import { useState } from 'react'
import root from 'react-shadow'

/**
 * @description
 * Textarea where you may add html element and it will be rendered below.\
 * Useful for playing with CSS.
 *
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
  const [html, setHtml] = useState(htmlString ?? '<div>hello</div>')

  return (
    <root.div>
      <textarea
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        style={{
          padding: '5px',
          width: '100%',
          fieldSizing: 'content',
          background: '#e3f1f4',
          borderRadius: '4px',
          overflowX: 'scroll'
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </root.div>
  )
}
