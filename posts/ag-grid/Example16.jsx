'use client'


/** @jsxImportSource @emotion/react */
import { useCallback, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { css } from '@emotion/react'
import { useData } from './useData'

let editableYear = 2012

const isCellEditable = (params) => {
  return params.data.year === editableYear
}

export const Example16 = () => {
  const gridRef = useRef()
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const { data: rowData } = useData()

  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', type: 'editableColumn' },
    { field: 'age', type: 'editableColumn' },
    { field: 'year' },
    { field: 'country' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ])
  const columnTypes = useMemo(() => {
    return {
      editableColumn: {
        editable: (params) => {
          return isCellEditable(params)
        },
        cellStyle: (params) => {
          if (isCellEditable(params)) {
            return { backgroundColor: 'lightBlue' }
          }
        }
      }
    }
  }, [])

  const setEditableYear = useCallback((year) => {
    editableYear = year
    // Redraw to re-apply the new cell style
    gridRef.current.api.redrawRows()
  }, [])

  return (
    <div
      style={containerStyle}
      css={css`
        .example-wrapper {
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          #myGrid {
            flex: 1 1 0px;
            width: 100%;
          }
      `}
    >
      <div className='example-wrapper'>
        <div style={{ marginBottom: '5px' }}>
          <button
            style={{ fontSize: '12px' }}
            onClick={() => setEditableYear(2008)}
          >
            Enable Editing for 2008
          </button>
          <button
            style={{ fontSize: '12px' }}
            onClick={() => setEditableYear(2012)}
          >
            Enable Editing for 2012
          </button>
        </div>

        <div style={gridStyle} className='ag-theme-alpine'>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            columnTypes={columnTypes}
            // onGridReady={onGridReady}
          />
        </div>
      </div>
    </div>
  )
}
