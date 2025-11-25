'use client'

export function Tag(props) {
  return (
    <div className='tag'>
      {props.tag}

      <style jsx>{`
        .tag { 
          display: inline-block;
          position: relative;
          top: -6px;
          padding: 3px 8px 3px 20px;
          margin-top: 7px;
          margin-left: 5px;
          background: grey;
          border-radius: 3px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          color: white;
          font-size: 12px;
          font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, sans-serif;
          text-decoration: none;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          font-weight: bold;
          cursor: pointer;
          vertical-align: middle;
          user-select: none;
        }
        .tag:before {
          content: '';
          position: absolute;
          top: 10px;
          left: 8px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #fff;
          box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.4);
        }
        .tag:hover {
          background: #5a5a5a;
        }
      `}</style>
    </div>
  )
}
