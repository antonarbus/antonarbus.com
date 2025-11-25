'use client'


/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useData } from './useData'

const getColumnDefs = () => {
  return [
    { field: 'athlete', width: 150, sort: 'asc' },
    { field: 'age' },
    { field: 'country', pinned: 'left' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ]
}

export const Example5 = () => {
  const gridRef = useRef()
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const { data: rowData } = useData()

  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 100,
      width: 100,
      sortable: true,
      resizable: true,
      pinned: null,
      sort: null // important - clears sort if not specified in col def
    }
  }, [])
  const [columnDefs, setColumnDefs] = useState(getColumnDefs())

  const onBtWithState = useCallback(() => {
    gridRef.current.api.setColumnDefs(getColumnDefs())
  }, [])

  const onBtRemove = useCallback(() => {
    gridRef.current.api.setColumnDefs([])
  }, [])

  return (
    <div
      css={css`
        .test-grid {
          flex-grow: 1;
        }

        .test-container {
          height: 300px;
          display: flex;
          flex-direction: column;
        }

        .test-header {
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          font-size: 13px;
          margin-bottom: 1rem;
        }
      `}
    >
      <div className='test-container'>
        <div className='test-header'>
          <button onClick={onBtWithState}>Set Columns with State</button>
          <button onClick={onBtRemove}>Remove Columns</button>
        </div>

        <div style={gridStyle} className='ag-theme-alpine'>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
          />
        </div>
      </div>
    </div>
  )
}
