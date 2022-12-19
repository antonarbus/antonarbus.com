/** @jsxImportSource @emotion/react */
import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { Example1 } from './ag-grid/Example1'
import { Example2 } from './ag-grid/Example2'
import { Example3 } from './ag-grid/Example3'
import { Example4 } from './ag-grid/Example4'
import { Example5 } from './ag-grid/Example5'
import { Example6 } from './ag-grid/Example6'
import { Example7 } from './ag-grid/Example7'
import { Example8 } from './ag-grid/Example8'
import { Example9 } from './ag-grid/Example9'
import { Example10 } from './ag-grid/Example10'
import { Example11 } from './ag-grid/Example11'
import { Example12 } from './ag-grid/Example12'
import { Example13 } from './ag-grid/Example13'
import { Example14 } from './ag-grid/Example14'
import { Example15 } from './ag-grid/Example15'
import { Example16 } from './ag-grid/Example16'
import { Example17 } from './ag-grid/Example17'
import { Example18 } from './ag-grid/Example18'
import { Example19 } from './ag-grid/Example19'

const postObj = {
  title: 'ag grid',
  date: '2022.12.19',
  tags: ['react', 'tool'],
  imgUrl: 'https://antonarbus.com/imgs/react.png',
  desc: 'AG Grid for react',
  body: (
    <>
      <H>About</H>

      <ul>
        <li><Lnk path='https://www.ag-grid.com/react-data-grid/getting-started/'>ag-grid</Lnk> website</li>
        <li><Code>npm i ag-grid-community</Code> free package</li>
        <li><Code>npm i ag-grid-react</Code> free package</li>
        <li><Code>npm i ag-grid-enterprise</Code> paid features</li>
      </ul>

      <H>Basics</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example1 />

      <H>Consume data from complex object</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example2 />

      <H>floatingFilter</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example3 />

      <H>Add / remove columns programmatically</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example4 />

      <H>Set column width</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example5 />

      <H>Column events</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example6 />

      <H>Multi column sort with command</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example7 />

      <H>Wrap text and auto height row</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example8 />

      <H>Row drag</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example9 />

      <H>Data from selected row</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example10 />

      <H>External filter</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example11 />

      <H>Quick filter</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example12 />

      <H>valueGetter</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example13 />

      <H>valueFormatter</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example14 />

      <H>SelectCellEditor, RichSelectCellEditor</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example15 />

      <H>Specific editable cells with styles</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example16 />

      <H>Edit cell</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example17 />

      <H>Parse value during editing</H>

      <Code block jsx>{`
        xxx
      `}</Code>

      <Example18 />

      <H>Pagination + checkboxSelection</H>

      <Code block jsx>{`
        xxx
      `}</Code>
      <Example19 />
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
