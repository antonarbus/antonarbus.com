import { useEffect, useRef, useState } from 'react'
import { Copied } from './Copied'
import { useCopyToClipboard } from 'react-use'

export function Code(props) {
  const ref = useRef()
  let maxHeightVal

  // #region block, inline or just a code
  /*
    - but a 'block' attr to make it a block code
    - but language attr to set a language, otherwise 'jsx' is used
    - but a 'inline' attr to make it an inline code
    - may skip 'inline' attr if provide language attribute
    - do not put any attributes to use just a native <code> with copy function and it will follow your markup
    - use just <code> instead of <Code> to avoid copy function on click
  */
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

  const block = !!(false || props.block)
  const inline = !!(false || props.inline || (lang && !block))

  if (block && !lang) lang = 'jsx' // if no lang attr is provided for block code
  if (inline && !lang) lang = 'jsx' // if no lang attr is provided for inline code
  // #endregion

  // expand non-inline code
  useEffect(() => {
    if (!ref.current || inline) return

    function expandCode() {
      if (maxHeightVal) return
      maxHeightVal = getComputedStyle(ref.current).getPropertyValue('max-height')
      ref.current.style.maxHeight = 'none'
    }

    ref.current.addEventListener('click', expandCode)
    return () => { ref?.current?.removeEventListener('click', expandCode) }
  }, [])

  // shrink non-inline code
  useEffect(() => {
    if (!ref.current || inline) return

    function shrinkCode(e) {
      // do not shrink if clicked on any other code blocks, otherwise annoying jumps may happen
      const preEls = document.querySelectorAll('pre')
      const arrWithPreEls = [...preEls]
      const clickedEl = e.target
      if (arrWithPreEls.some(preEl => preEl.contains(clickedEl))) return
      if (!maxHeightVal) return
      ref.current.style.maxHeight = maxHeightVal
      maxHeightVal = null
    }

    document.addEventListener('click', shrinkCode)
    return () => { document.removeEventListener('click', shrinkCode) }
  }, [])

  // #region copy
  // eslint-disable-next-line no-unused-vars
  const [{ value, error, noUserInteraction }, copyToClipboard] = useCopyToClipboard()

  const [copiedFlag, setCopiedFlag] = useState(false)
  const codeRef = useRef('')

  function copy() {
    copyToClipboard(codeRef.current.textContent)
    setCopiedFlag(true)
    setTimeout(() => setCopiedFlag(false), 2000)
  }
  // #endregion

  return (
    <div className="code-container" onClick={copy} ref={codeRef}>
      {copiedFlag && <Copied />}

      {inline && <code ref={ref} className={`lang-${lang}`}>{props.children}</code>}
      {block && <pre ref={ref}> <code className={`lang-${lang}`}> {props.children} </code> </pre>}
      {!inline && !block && <code ref={ref}>{props.children}</code>}

      <style jsx>{`
        .code-container {
          display: ${block ? 'block' : 'inline'};
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
