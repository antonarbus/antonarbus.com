/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useData } from './useData'

export const Example9 = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const { data: rowData } = useData()

  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', rowDrag: true },
    { field: 'country' },
    { field: 'year', width: 100 },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' }
  ])
  const defaultColDef = useMemo(() => {
    return {
      width: 170,
      sortable: true,
      filter: true
    }
  }, [])

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className='ag-theme-alpine'>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowDragManaged
          animateRows
          // onGridReady={onGridReady}
        />
      </div>
    </div>
  )
}
