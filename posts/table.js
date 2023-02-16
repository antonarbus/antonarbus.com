import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'table',
  date: '2023.02.16',
  tags: ['html'],
  imgUrl: 'https://antonarbus.com/imgs/html.png',
  desc: 'xxx',
  body: (
    <>
      <H>Fill whole cell</H>

      <ul>
        <li>Needed to make a link inside table cell</li>
        <li>Only link was clickable, but area around it within a sell was not clickable</li>
        <li>That is how I fixed that</li>
      </ul>

      <LazyImg path='/imgs/link_original.png' />
      <LazyImg path='/imgs/link_fixed.png'/>

      <Code block html>{`
      <Table
        sx={{
          minWidth: 700,
          height: 0,
          '& tr': {
            cursor: 'pointer',
            height: '100%'
          },
          '& td': {
            p: '0px',
            height: '100%'
          },
          '& a': {
            all: 'inherit',
            borderBottom: 'none',
            display: 'flex',
            alignItems: 'center',
            p: '16px',
            height: '100%'
          }
        }}
      >
        <TableHead>
          <TableRow>
            <ColumnHeader
            ....
      `}</Code>

      <H>traversal with javascript</H>

      <Code js>let tbl = document.querySelector('table')</Code>
      <ul>
        <li><Code js>tbl.caption</Code> {'<caption>'}</li>
        <li><Code js>tbl.tHead</Code> {'<thead>'}</li>
        <li><Code js>tbl.tBodies</Code> tBodies collection</li>
        <li><Code js>tbl.tBodies[0]</Code> {'<tbody>'}</li>
        <li><Code js>tbl.tFoot</Code> {'<tfoot>'}</li>
        <li><Code js>tbl.rows</Code> collection of table rows (tr)</li>
        <li><Code js>tbl.tHead.rows</Code> tr collection </li>
        <li><Code js>tbl.tBodies[0].rows</Code> tr collection</li>
        <li><Code js>tbl.tFoot.rows</Code> tr collection</li>
        <li><Code js>tbl.rows[1].sectionRowIndex</Code> 0, index of the given {'<tr>'} inside {'<thead>'}, {'<tbody>'}, {'<tfoot>'}</li>
        <li><Code js>tbl.rows[1].rowIndex</Code> 1, index of the given {'<tr>'} inside table</li>
        <li><Code js>tbl.tBodies[0].rows[1].cells</Code> collection of cells {'<td>'} in 2nd row </li>
        <li><Code js>tbl.tHead.rows[0].cells[3].cellIndex</Code> 3, cell index inside {'<tr>'}</li>
      </ul>
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
