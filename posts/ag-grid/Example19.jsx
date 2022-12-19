/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useQuery } from 'react-query'
import { useData } from './useData'

const checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

const headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

export const Example19 = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const { data: rowData } = useData()
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'athlete',
      minWidth: 170,
      checkboxSelection,
      headerCheckboxSelection
    },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ])
  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: 'Group',
      minWidth: 170,
      field: 'athlete',
      valueGetter: (params) => {
        if (params.node.group) {
          return params.node.key
        } else {
          return params.data[params.colDef.field]
        }
      },
      headerCheckboxSelection: true,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        checkbox: true
      }
    }
  }, [])
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100
    }
  }, [])

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className='ag-theme-alpine'>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          autoGroupColumnDef={autoGroupColumnDef}
          defaultColDef={defaultColDef}
          suppressRowClickSelection
          groupSelectsChildren
          rowSelection='multiple'
          rowGroupPanelShow='always'
          pivotPanelShow='always'
          pagination
          // onGridReady={onGridReady}
        />
      </div>
    </div>
  )
}
