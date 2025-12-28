'use client'

import React from 'react'
import idFromPropsChildrenWithJSX from '../../helpers/idFromPropsChildrenWithJSX'

export function Hs(props) {
  const ref = React.useRef(null)

  React.useEffect(() => {
    ref.current.id = idFromPropsChildrenWithJSX(props.children)
  }, [])

  function addHashToUrl(e) {
    history.pushState({}, '', '#' + idFromPropsChildrenWithJSX(props.children))
    ref.current.scrollIntoView({ behavior: 'smooth', alignToTop: true })
  }

  return (
    <h5 className="Hs" ref={ref} onClick={addHashToUrl}>
      {props.children}

      <style jsx>{`
        h5,
        h5 * {
          color: #5e5c5c;
          cursor: pointer;
          font-size: 20px;
          margin-top: 20px;
          text-align: center;
          font-weight: 400;
        }
      `}</style>
    </h5>
  )
}
