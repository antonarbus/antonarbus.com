/** @jsxImportSource @emotion/react */
import { useCallback, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useData } from './useData'

export const Example10 = () => {
  const gridRef = useRef()
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const { data: rowData } = useData()

  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', minWidth: 150 },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 }
  ])
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100
    }
  }, [])

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows()
    document.querySelector('#selectedRows').innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : ''
  }, [])

  return (
    <div style={containerStyle}>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div className='example-header'>
          Selection:
          <span id='selectedRows' />
        </div>

        <div style={gridStyle} className='ag-theme-alpine'>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection='single'
            // onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
          />
        </div>
      </div>
    </div>
  )
}
