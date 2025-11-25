'use client'


/** @jsxImportSource @emotion/react */
import { useCallback, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

function getData () {
  const rowData = []
  const words = [
    'One',
    'Apple',
    'Moon',
    'Sugar',
    'Grid',
    'Banana',
    'Sunshine',
    'Stars',
    'Black',
    'White',
    'Salt',
    'Beach'
  ]

  for (let i = 0; i < 100; i++) {
    rowData.push({
      simple: words[i % words.length],
      number: Math.floor(((i + 2) * 173456) % 10000)
    })
  }

  return rowData
}

const numberParser = (params) => {
  return 'num is doubled after editing ' + 2 * Number(params.newValue)
}

export const Example18 = () => {
  const gridRef = useRef()
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const [rowData, setRowData] = useState(getData())
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Name', field: 'simple' },
    {
      headerName: 'number',
      field: 'number',
      valueParser: numberParser
    }
  ])
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
      resizable: true
    }
  }, [])

  const onGridReady = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit()
  }, [])

  const onCellValueChanged = useCallback((event) => {
    console.log('data after changes is: ', event.data)
  }, [])

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className='ag-theme-alpine-dark'>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  )
}
