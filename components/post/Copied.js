'use client'

export function Copied() {
  return (
    <span>
      copied

      <style jsx>{`
        span {
          background: rgba(0, 0, 0, 0.459);
          color: white;
          padding: 2px 5px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          position: absolute;
          top: -25px;
          right: -10px;
          box-shadow: #80808073 0px 0px 10px;
        }
      `}</style>
    </span>
  )
}
