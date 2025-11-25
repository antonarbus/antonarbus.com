'use client'


/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useQuery } from 'react-query'
import { useData } from './useData'

const columnDefsMedalsIncluded = [
  { field: 'athlete' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
  { field: 'age' },
  { field: 'country' },
  { field: 'sport' },
  { field: 'year' },
  { field: 'date' }
]

const colDefsMedalsExcluded = [
  { field: 'athlete' },
  { field: 'age' },
  { field: 'country' },
  { field: 'sport' },
  { field: 'year' },
  { field: 'date' }
]

export const Example4 = () => {
  const gridRef = useRef()
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const [rowData, setRowData] = useState()
  const { data } = useData()
  useEffect(() => {
    setRowData(data)
  }, [data])
  const [columnDefs, setColumnDefs] = useState(columnDefsMedalsIncluded)

  const onBtExcludeMedalColumns = useCallback(() => {
    gridRef.current.api.setColumnDefs(colDefsMedalsExcluded)
  }, [])

  const onBtIncludeMedalColumns = useCallback(() => {
    gridRef.current.api.setColumnDefs(columnDefsMedalsIncluded)
  }, [])

  return (
    <div
      css={css`
        .test-container {
          height: 400px;
        }
      `}
    >
      <div className='test-container'>
        <div>
          <button onClick={onBtExcludeMedalColumns}> Exclude Medal Columns </button>
          <button onClick={onBtIncludeMedalColumns}> Include Medal Columns </button>
        </div>
        <div style={gridStyle} className='ag-theme-alpine'>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{
              initialWidth: 100,
              sortable: true,
              resizable: true
            }}
            // onGridReady={onGridReady}
          />
        </div>
      </div>
    </div>
  )
}
