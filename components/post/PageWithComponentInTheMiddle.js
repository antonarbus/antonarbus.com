'use client'

export default function PageWithComponentInTheMiddle(props) {
  return (
    <div className="container">
      <div>{props.text || props.component}</div>

      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          display: flex;
          padding-top: 30vh;
          flex-direction: column;
          align-items: center;
          height: 100vh;
          color: grey;
          font-size: 2rem;
          z-index: 1000;
          background: transparent;
        }
      `}</style>
    </div>
  )
}
