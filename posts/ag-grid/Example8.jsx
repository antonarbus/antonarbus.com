'use client'


/** @jsxImportSource @emotion/react */
import { useCallback, useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

function getData () {
  const latinSentence =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.'
  const latinWords = latinSentence.split(' ')

  const rowData = []

  function generateRandomSentence (row, col) {
    const wordCount = ((row + 1) * (col + 1) * 733 * 19) % latinWords.length
    const parts = []
    for (let i = 0; i < wordCount; i++) {
      parts.push(latinWords[i])
    }
    const sentence = parts.join(' ')
    return sentence + '.'
  }

  // create 100 rows
  for (let i = 0; i < 100; i++) {
    const item = {
      rowNumber: 'Row ' + i,
      autoA: generateRandomSentence(i, 1),
      autoB: generateRandomSentence(i, 2),
      autoC: generateRandomSentence(i, 3)
    }
    rowData.push(item)
  }

  return rowData
}

export const Example8 = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const [rowData, setRowData] = useState()
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Row #',
      field: 'rowNumber',
      width: 120
    },
    {
      field: 'autoA',
      width: 300,
      wrapText: true,
      autoHeight: true,
      headerName: 'A) Auto Height'
    },
    {
      width: 300,
      field: 'autoB',
      wrapText: true,
      headerName: 'B) Normal Height'
    }
  ])
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true
    }
  }, [])
  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: {
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivots: true,
            suppressPivotMode: true,
            suppressSideButtons: true,
            suppressColumnFilter: true,
            suppressColumnSelectAll: true,
            suppressColumnExpandAll: true
          }
        }
      ],
      defaultToolPanel: 'columns'
    }
  }, [])

  const onGridReady = useCallback((params) => {
    // in this example, the CSS styles are loaded AFTER the grid is created,
    // so we put this in a timeout, so height is calculated after styles are applied.
    setTimeout(function () {
      setRowData(getData())
    }, 500)
  }, [])

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className='ag-theme-alpine'>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          sideBar={sideBar}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  )
}
