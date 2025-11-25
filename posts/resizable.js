'use client'


import { Code, Lnk, useState, jsxToStr } from '/components/post/reExport'

import { Resizable } from 're-resizable'

function ResizableDiv () {
  const [resizedBy, setResizedBy] = useState({ width: 0, height: 0 })
  const [direction, setDirection] = useState('unknown')
  const [mouseCords, setMouseCords] = useState({ x: 0, y: 0 })
  const [width, setWidth] = useState('250px')
  const [height, setHeight] = useState('150px')

  return (
    <div>
      <Resizable
        id='resizable'
        className='resizable'
        defaultSize={{
          width: 'inherit',
          height: 'inherit'
        }}
        minWidth={200}
        minHeight={100}
        maxWidth={600}
        maxHeight={800}
        bounds={'window' || 'parent'}
        enable={{
          top: true, right: true, bottom: true, left: true, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false
        }}
        onResize={(event, direction, refToElement, delta) => {
          setDirection(direction)
          setResizedBy(delta)
          setMouseCords({ x: event.x, y: event.y })
          setWidth(refToElement.style.width)
          setHeight(refToElement.style.height)
        }}
        onResizeStart={() => { console.log('resize started') }}
        onResizeStop={() => { console.log('resize stopped') }}
      >
        <div className='grey left'>
          <span>Direction</span>
          <span>Mouse</span>
          <span>Resized by</span>
          <span>Width</span>
          <span>Height</span>
        </div>

        <div className='right' >
          <span>{direction}</span>
          <span>x={mouseCords.x} y={mouseCords.y}</span>
          <span>w={resizedBy.width} h={resizedBy.height}</span>
          <span>{width}</span>
          <span>{height}</span>
        </div>
      </Resizable>

      <style jsx global>{`
        .resizable {
          display: flex;
          justify-content: center;
          align-items: center;
          column-gap: 10px;
          margin: 20px auto;
          width: 250px;
          height: 150px;
          padding: 0.5em;
          border: 1px solid #ddd;
        }
        .resizable > div {
          display: flex;
          flex-direction: column;
        }
        .left {
          align-items: flex-end;
        }
        .right {
          align-items: flex-start;
        }
        .grey {
          color: grey;
        }
      `}</style>
    </div>
  )
}

const postObj = {
  title: 'resizable',
  date: '2022.05.01',
  tags: ['tools'],
  desc: 'resizable element',
  body: (
    <>
      <ul>
        <li>Resizable element</li>
        <li><Lnk path='https://www.npmjs.com/package/re-resizable'>https://www.npmjs.com/package/re-resizable</Lnk></li>
        <li><Code bash>npm i re-resizable</Code></li>

      </ul>
      <ResizableDiv />

      <Code block jsx>{`
      import { Resizable } from 're-resizable'

      function ResizableDiv() {
        const [resizedBy, setResizedBy] = useState({width: 0, height: 0})
        const [direction, setDirection] = useState('unknown')
        const [mouseCords, setMouseCords] = useState({x: 0, y: 0})
        const [width, setWidth] = useState('250px')
        const [height, setHeight] = useState('150px')

        return (
          <div>
            <Resizable 
              id='resizable'
              className='resizable'
              defaultSize={{
                width: 'inherit',
                height: 'inherit',
              }}
              minWidth={200}
              minHeight={100}
              maxWidth={600}
              maxHeight={800}
              bounds={'window' || 'parent'}
              enable={{ 
                top:true, right:true, bottom:true, left:true, 
                topRight:false, bottomRight:false, bottomLeft:false, topLeft:false 
              }}
              onResize={(event, direction, refToElement, delta) => {
                setDirection(direction)
                setResizedBy(delta)
                setMouseCords({x: event.x, y: event.y})
                setWidth(refToElement.style.width)
                setHeight(refToElement.style.height)
              }}
              onResizeStart={() => {console.log('resize started')}}
              onResizeStop={() => {console.log('resize stopped')}}
            >
              <div className='grey left'>
                <span>Direction</span> 
                <span>Mouse</span> 
                <span>Resized by</span> 
                <span>Width</span> 
                <span>Height</span> 
              </div>

              <div className='right' >
                <span>{direction}</span> 
                <span>x={mouseCords.x} y={mouseCords.y}</span>
                <span>w={resizedBy.width} h={resizedBy.height}</span>
                <span>{width}</span>
                <span>{height}</span>
              </div>
            </Resizable>

            <style jsx global>{\`
              .resizable {
                display: flex;
                justify-content: center;
                align-items: center;
                column-gap: 10px;
                margin: 20px auto;
                width: 250px;
                height: 150px;
                padding: 0.5em;
                border: 1px solid #ddd;
              }
              .resizable > div {
                display: flex;
                flex-direction: column;
              }
              .left {
                align-items: flex-end;
              }
              .right {
                align-items: flex-start;
              }
              .grey {
                color: grey;
              }
            \`}</style>
          </div>
        )
      }
      `}</Code>
    </>
  )
}

export default postObj

export const post = {
  title: postObj.title,
  date: postObj.date,
  tags: postObj.tags,
  desc: postObj.desc,
  imgUrl: postObj.imgUrl || null,
  bodyStr: jsxToStr(postObj.body)
}
