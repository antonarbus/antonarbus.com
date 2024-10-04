import { Resizable } from 're-resizable'
import { useEffect, useRef, useState } from 'react'

export function Code(props) {
  const contentRef = useRef()
  const [height, setHeight] = useState('auto')

  const handleResizeStop = (e, direction, ref, d) => {
    setHeight(ref.style.height)
  }

  useEffect(() => {
    if (contentRef.current) {
      setTimeout(() => {
        const contentHeight = contentRef.current.clientHeight
        setHeight(contentHeight > 250 ? '250px' : 'auto')
      }, 0)
    }
  }, [])

  const lang = getLang({ props })

  const isBlock = Boolean(false || props.block)
  const isInline = Boolean(false || props.inline || (lang && !isBlock))

  return (
    <div className="code-container">
      {isInline && <code className={`lang-${lang}`}>{props.children}</code>}
      {isBlock && (
        <Resizable
          className="resizable"
          enable={{
            bottom: true
          }}
          defaultSize={{
            width: 'auto',
            height
          }}
          style={{
            marginBottom: '20px'
          }}
          size={{
            height
          }}
          onResizeStop={handleResizeStop}
        >
          <pre ref={contentRef} style={{ height: '100%' }}>
            <code className={`lang-${lang}`}>{props.children}</code>
          </pre>
        </Resizable>
      )}
      {!isInline && !isBlock && <code>{props.children}</code>}

      <style jsx>{`
        .code-container {
          display: ${isBlock ? 'block' : 'inline'};
          position: relative;
        }
        pre {
          margin: 20px 0px;
        }
        code {
          word-break: break-all;
        }
      `}</style>
    </div>
  )
}

function getLang({ props }) {
  let lang
  if (props.js) lang = 'js'
  if (props.jsx) lang = 'jsx'
  if (props.json) lang = 'json'
  if (props.bash) lang = 'bash'
  if (props.css) lang = 'css'
  if (props.scss) lang = 'scss'
  if (props.html) lang = 'html'
  if (props.php) lang = 'php'
  if (props.python) lang = 'python'
  if (props.py) lang = 'py'
  if (props.ruby) lang = 'ruby'
  if (props.ts) lang = 'ts'
  if (props.tsx) lang = 'tsx'
  if (props.typescript) lang = 'typescript'
  if (props.ignore) lang = 'ignore'
  if (props.markup) lang = 'markup'
  if (props.yaml) lang = 'yaml'
  if (props.none) lang = 'none'

  const isBlock = Boolean(false || props.block)
  const isInline = Boolean(false || props.inline || (lang && !isBlock))

  if (isBlock && !lang) lang = 'jsx' // if no lang attr is provided for block code
  if (isInline && !lang) lang = 'jsx' // if no lang attr is provided for inline code

  return lang
}
