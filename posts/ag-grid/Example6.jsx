/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { css } from '@emotion/react'
import { useQuery } from 'react-query'
import { useData } from './useData'

const colDefs = [
  { field: 'athlete' },
  { field: 'age' },
  { field: 'country' },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver', sort: 'desc' },
  { field: 'bronze' }
]

export const Example6 = () => {
  const gridRef = useRef()
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const { data: rowData } = useData()

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      width: 150,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true
    }
  }, [])
  const [columnDefs, setColumnDefs] = useState(colDefs)

  const onSortChanged = useCallback((e) => window.alert('Event Sort Changed', e), [])
  const onColumnResized = useCallback((e) => window.alert('Event Column Resized', e), [])
  const onColumnVisible = useCallback((e) => window.alert('Event Column Visible', e), [])
  const onColumnPivotChanged = useCallback((e) => window.alert('Event Pivot Changed', e), [])
  const onColumnRowGroupChanged = useCallback((e) => window.alert('Event Row Group Changed', e), [])
  const onColumnValueChanged = useCallback((e) => window.alert('Event Value Changed', e), [])
  const onColumnMoved = useCallback((e) => window.alert('Event Column Moved', e), [])
  const onColumnPinned = useCallback((e) => window.alert('Event Column Pinned', e), [])

  const onBtSortOn = useCallback(() => {
    colDefs.forEach(function (colDef) {
      if (colDef.field === 'age') colDef.sort = 'desc'
      if (colDef.field === 'athlete') colDef.sort = 'asc'
    })
    gridRef.current.api.setColumnDefs(colDefs)
  }, [])

  const onBtSortOff = useCallback(() => {
    colDefs.forEach(function (colDef) {
      colDef.sort = null
    })
    gridRef.current.api.setColumnDefs(colDefs)
  }, [])

  const onBtWidthNarrow = useCallback(() => {
    colDefs.forEach(function (colDef) {
      if (colDef.field === 'age' || colDef.field === 'athlete') {
        colDef.width = 100
      }
    })
    gridRef.current.api.setColumnDefs(colDefs)
  }, [])

  const onBtWidthNormal = useCallback(() => {
    colDefs.forEach(colDef => { colDef.width = 200 })
    gridRef.current.api.setColumnDefs(colDefs)
  }, [])

  const onBtHide = useCallback(() => {
    colDefs.forEach(function (colDef) {
      if (colDef.field === 'age' || colDef.field === 'athlete') {
        colDef.hide = true
      }
    })
    gridRef.current.api.setColumnDefs(colDefs)
  }, [])

  const onBtShow = useCallback(() => {
    colDefs.forEach(function (colDef) {
      colDef.hide = false
    })
    gridRef.current.api.setColumnDefs(colDefs)
  }, [])

  const onBtPivotOn = useCallback(() => {
    gridRef.current.columnApi.setPivotMode(true)
    colDefs.forEach(function (colDef) {
      if (colDef.field === 'country') {
        colDef.pivot = true
      }
    })
    gridRef.current.api.setColumnDefs(colDefs)
  }, [])

  const onBtPivotOff = useCallback(() => {
    gridRef.current.columnApi.setPivotMode(false)
    colDefs.forEach(function (colDef) {
      colDef.pivot = false
    })
    gridRef.current.api.setColumnDefs(colDefs)
  }, [])

  const onBtRowGroupOn = useCallback(() => {
    colDefs.forEach(function (colDef) {
      if (colDef.field === 'sport') {
        colDef.rowGroup = true
      }
    })
    gridRef.current.api.setColumnDefs(colDefs)
  }, [])

  const onBtRowGroupOff = useCallback(() => {
    colDefs.forEach(function (colDef) {
      colDef.rowGroup = false
    })
    gridRef.current.api.setColumnDefs(colDefs)
  }, [])

  const onBtAggFuncOn = useCallback(() => {
    colDefs.forEach(function (colDef) {
      if (colDef.field === 'gold' || colDef.field === 'silver' || colDef.field === 'bronze') {
        colDef.aggFunc = 'sum'
      }
    })
    gridRef.current.api.setColumnDefs(colDefs)
  }, [])

  const onBtAggFuncOff = useCallback(() => {
    colDefs.forEach(function (colDef) {
      colDef.aggFunc = null
    })
    gridRef.current.api.setColumnDefs(colDefs)
  }, [])

  const onBtPinnedOn = useCallback(() => {
    colDefs.forEach(function (colDef) {
      if (colDef.field === 'athlete') {
        colDef.pinned = 'left'
      }
      if (colDef.field === 'age') {
        colDef.pinned = 'right'
      }
    })
    gridRef.current.api.setColumnDefs(colDefs)
  }, [])

  const onBtPinnedOff = useCallback(() => {
    colDefs.forEach(function (colDef) {
      colDef.pinned = null
    })
    gridRef.current.api.setColumnDefs(colDefs)
  }, [])

  return (
    <div
      style={containerStyle}
      css={css`
        .test-container {
          height: 400px;
          display: flex;
          flex-direction: column;
        }

        .test-header {
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          font-size: 13px;
          margin-bottom: 0.5rem;
        }

        .test-header .example-section {
          margin-bottom: 0.5rem;
        }

        .test-button-group {
          display: inline-block;
          margin-right: 20px;
          margin-bottom: 10px;
        }

        .test-button-group button {
          margin: 4px;
        }

        #myGrid {
          flex: 1 1 0px;
        }
      `}
    >
      <div className='test-container'>
        <div className='test-header'>
          <div className='test-button-row'>
            <div className='test-button-group'>
              <button onClick={onBtSortOn}>Sort On</button> <br />
              <button onClick={onBtSortOff}>Sort Off</button>
            </div>
            <div className='test-button-group'>
              <button onClick={onBtWidthNarrow}>Width Narrow</button> <br />
              <button onClick={onBtWidthNormal}>Width Normal</button>
            </div>
            <div className='test-button-group'>
              <button onClick={onBtHide}>Hide Cols</button> <br />
              <button onClick={onBtShow}>Show Cols</button>
            </div>
            <div className='test-button-group'>
              <button onClick={onBtPivotOn}>Pivot On</button> <br />
              <button onClick={onBtPivotOff}>Pivot Off</button>
            </div>
            <div className='test-button-group'>
              <button onClick={onBtRowGroupOn}>Row Group On</button> <br />
              <button onClick={onBtRowGroupOff}>Row Group Off</button>
            </div>
            <div className='test-button-group'>
              <button onClick={onBtAggFuncOn}>Agg Func On</button> <br />
              <button onClick={onBtAggFuncOff}>Agg Func Off</button>
            </div>
            <div className='test-button-group'>
              <button onClick={onBtPinnedOn}>Pinned On</button> <br />
              <button onClick={onBtPinnedOff}>Pinned Off</button>
            </div>
          </div>
        </div>

        <div style={gridStyle} className='ag-theme-alpine'>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            // onGridReady={onGridReady}
            onSortChanged={onSortChanged}
            onColumnResized={onColumnResized}
            onColumnVisible={onColumnVisible}
            onColumnPivotChanged={onColumnPivotChanged}
            onColumnRowGroupChanged={onColumnRowGroupChanged}
            onColumnValueChanged={onColumnValueChanged}
            onColumnMoved={onColumnMoved}
            onColumnPinned={onColumnPinned}
          />
        </div>
      </div>
    </div>
  )
}
