'use client'


/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { css } from '@emotion/css'

const hashValueGetter = (params) => params.node ? params.node.rowIndex : null
const abValueGetter = (params) => params.data.a + params.data.b
const a1000ValueGetter = (params) => params.data.a * 1000
const b137ValueGetter = (params) => params.data.b * 137
const randomValueGetter = () => Math.floor(Math.random() * 1000)
const chainValueGetter = (params) => params.getValue('a&b') * 1000
const constValueGetter = () => 99999

const createRowData = () => {
  const rowData = []
  for (let i = 0; i < 100; i++) {
    rowData.push({
      a: Math.floor(i % 4),
      b: Math.floor(i % 7)
    })
  }
  return rowData
}

export const Example13 = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const [rowData, setRowData] = useState(createRowData())
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: '#',
      maxWidth: 100,
      valueGetter: hashValueGetter
    },
    { field: 'a' },
    { field: 'b' },
    {
      headerName: 'A + B',
      colId: 'a&b',
      valueGetter: abValueGetter
    },
    {
      headerName: 'A * 1000',
      minWidth: 95,
      valueGetter: a1000ValueGetter
    },
    {
      headerName: 'B * 137',
      minWidth: 90,
      valueGetter: b137ValueGetter
    },
    {
      headerName: 'Random',
      minWidth: 90,
      valueGetter: randomValueGetter
    },
    {
      headerName: 'Chain',
      valueGetter: chainValueGetter
    },
    {
      headerName: 'Const',
      minWidth: 85,
      valueGetter: constValueGetter
    }
  ])
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 75
      // cellClass: 'number-cell'
    }
  }, [])

  return (
    <div
      style={containerStyle}
      css={css`
        .number-cell {
          text-align: right;
        }
      `}
    >
      <div style={gridStyle} className='ag-theme-alpine-dark'>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  )
}
