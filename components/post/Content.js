'use client'

import Link from 'next/link'
import idFromPropsChildrenWithJSX from '../../helpers/idFromPropsChildrenWithJSX'

export function Content({ headings }) {
  return (
    <>
      <h3>Content</h3>
      <div className="container">
        {headings.map((heading, index) => (
          <span key={heading}>
            <Link href={'#' + idFromPropsChildrenWithJSX(heading)} legacyBehavior>
              <a>
                {' '}
                {index + 1}. {heading}{' '}
              </a>
            </Link>
          </span>
        ))}
      </div>

      <style jsx>{`
        h3 {
          font-size: 20px;
          margin-top: 20px;
          margin-bottom: 30px;
          text-align: center;
          font-weight: 400;
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 5px;
        }
        span {
          padding: 1px 5px;
          border: 1px solid rgba(118, 118, 118, 0.332);
          border-radius: 4px;
        }
      `}</style>
    </>
  )
}
