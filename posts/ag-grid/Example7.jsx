'use client'


/** @jsxImportSource @emotion/react */
import { useCallback, useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useData } from './useData'

export const Example7 = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const { data: rowData } = useData()

  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete' },
    { field: 'age', width: 100 },
    { field: 'country' },
    { field: 'year', width: 100 },
    { field: 'date', sortingOrder: ['desc', null] },
    { field: 'sport', sortingOrder: ['asc'] },
    { field: 'gold', sortingOrder: ['asc', 'desc'] },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ])
  const defaultColDef = useMemo(() => {
    return {
      width: 170,
      sortable: true
    }
  }, [])

  const onGridReady = useCallback((params) => {
    const defaultSortModel = [
      { colId: 'country', sort: 'asc', sortIndex: 0 },
      { colId: 'athlete', sort: 'asc', sortIndex: 1 }
    ]
    params.columnApi.applyColumnState({ state: defaultSortModel })
  }, [])

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className='ag-theme-alpine'>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          multiSortKey='ctrl'
          onGridReady={onGridReady}
          animateRows
          // alwaysMultiSort
        />
      </div>
    </div>
  )
}
