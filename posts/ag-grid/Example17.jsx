/** @jsxImportSource @emotion/react */
import { useCallback, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { css } from '@emotion/react'

function getData () {
  return [
    {
      firstName: 'Bob',
      lastName: 'Harrison',
      gender: 'Male',
      address:
        '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Mary',
      lastName: 'Wilson',
      gender: 'Female',
      age: 11,
      address: '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
      mood: 'Sad',
      country: 'Ireland'
    },
    {
      firstName: 'Zahid',
      lastName: 'Khan',
      gender: 'Male',
      age: 12,
      address:
        '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Jerry',
      lastName: 'Mane',
      gender: 'Male',
      age: 12,
      address:
        '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Bob',
      lastName: 'Harrison',
      gender: 'Male',
      address:
        '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Mary',
      lastName: 'Wilson',
      gender: 'Female',
      age: 11,
      address: '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
      mood: 'Sad',
      country: 'Ireland'
    },
    {
      firstName: 'Zahid',
      lastName: 'Khan',
      gender: 'Male',
      age: 12,
      address:
        '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Jerry',
      lastName: 'Mane',
      gender: 'Male',
      age: 12,
      address:
        '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Bob',
      lastName: 'Harrison',
      gender: 'Male',
      address:
        '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Mary',
      lastName: 'Wilson',
      gender: 'Female',
      age: 11,
      address: '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
      mood: 'Sad',
      country: 'Ireland'
    },
    {
      firstName: 'Zahid',
      lastName: 'Khan',
      gender: 'Male',
      age: 12,
      address:
        '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Jerry',
      lastName: 'Mane',
      gender: 'Male',
      age: 12,
      address:
        '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Bob',
      lastName: 'Harrison',
      gender: 'Male',
      address:
        '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Mary',
      lastName: 'Wilson',
      gender: 'Female',
      age: 11,
      address: '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
      mood: 'Sad',
      country: 'Ireland'
    },
    {
      firstName: 'Zahid',
      lastName: 'Khan',
      gender: 'Male',
      age: 12,
      address:
        '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Jerry',
      lastName: 'Mane',
      gender: 'Male',
      age: 12,
      address:
        '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Bob',
      lastName: 'Harrison',
      gender: 'Male',
      address:
        '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Mary',
      lastName: 'Wilson',
      gender: 'Female',
      age: 11,
      address: '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
      mood: 'Sad',
      country: 'Ireland'
    },
    {
      firstName: 'Zahid',
      lastName: 'Khan',
      gender: 'Male',
      age: 12,
      address:
        '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Jerry',
      lastName: 'Mane',
      gender: 'Male',
      age: 12,
      address:
        '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Bob',
      lastName: 'Harrison',
      gender: 'Male',
      address:
        '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Mary',
      lastName: 'Wilson',
      gender: 'Female',
      age: 11,
      address: '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
      mood: 'Sad',
      country: 'Ireland'
    },
    {
      firstName: 'Zahid',
      lastName: 'Khan',
      gender: 'Male',
      age: 12,
      address:
        '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
      mood: 'Happy',
      country: 'Ireland'
    },
    {
      firstName: 'Jerry',
      lastName: 'Mane',
      gender: 'Male',
      age: 12,
      address:
        '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
      mood: 'Happy',
      country: 'Ireland'
    }
  ]
}

const getPinnedTopData = () => {
  return [
    {
      firstName: '##',
      lastName: '##',
      gender: '##',
      address: '##',
      mood: '##',
      country: '##'
    }
  ]
}

const getPinnedBottomData = () => {
  return [
    {
      firstName: '##',
      lastName: '##',
      gender: '##',
      address: '##',
      mood: '##',
      country: '##'
    }
  ]
}

export const Example17 = () => {
  const gridRef = useRef()
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const [rowData, setRowData] = useState(getData())
  const [columnDefs, setColumnDefs] = useState([
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'gender' },
    { field: 'age' },
    { field: 'mood' },
    { field: 'country' },
    { field: 'address', minWidth: 550 }
  ])
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 110,
      editable: true,
      resizable: true
    }
  }, [])
  const pinnedTopRowData = useMemo(() => {
    return getPinnedTopData()
  }, [])
  const pinnedBottomRowData = useMemo(() => {
    return getPinnedBottomData()
  }, [])

  const onRowEditingStarted = useCallback((event) => {
    console.log('never called - not doing row editing')
  }, [])

  const onRowEditingStopped = useCallback((event) => {
    console.log('never called - not doing row editing')
  }, [])

  const onCellEditingStarted = useCallback((event) => {
    console.log('cellEditingStarted')
  }, [])

  const onCellEditingStopped = useCallback((event) => {
    console.log('cellEditingStopped')
  }, [])

  const onBtStopEditing = useCallback(() => {
    gridRef.current.api.stopEditing()
  }, [])

  const onBtStartEditing = useCallback((key, char, pinned) => {
    gridRef.current.api.setFocusedCell(0, 'lastName', pinned)
    gridRef.current.api.startEditingCell({
      rowIndex: 0,
      colKey: 'lastName',
      // set to 'top', 'bottom' or undefined
      rowPinned: pinned,
      key,
      charPress: char
    })
  }, [])

  const onBtNextCell = useCallback(() => {
    gridRef.current.api.tabToNextCell()
  }, [])

  const onBtPreviousCell = useCallback(() => {
    gridRef.current.api.tabToPreviousCell()
  }, [])

  const onBtWhich = useCallback(() => {
    const cellDefs = gridRef.current.api.getEditingCells()
    if (cellDefs.length > 0) {
      const cellDef = cellDefs[0]
      window.alert('editing cell is: row = ' + cellDef.rowIndex + ', col = ' + cellDef.column.getId() + ', floating = ' + cellDef.rowPinned)
    } else {
      window.alert('no cells are editing')
    }
  }, [])

  return (
    <div
      style={containerStyle}
      css={
        css`
          .example-wrapper {
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          .grid-wrapper {
            flex: 1 1 0px;
          }

          #myGrid {
            height: 100%;
            width: 100%;
          }
        `
      }
    >
      <div className='example-wrapper'>
        <div
          style={{
            marginBottom: '5px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <button onClick={() => onBtStartEditing(undefined)}>
              edit (0)
            </button>
            <button onClick={() => onBtStartEditing('Backspace')}>
              edit (0, Backspace)
            </button>
            <button onClick={() => onBtStartEditing(undefined, 'T')}>
              edit (0, 'T')
            </button>
            <button
              onClick={() => onBtStartEditing(undefined, undefined, 'top')}
            >
              edit (0, Top)
            </button>
            <button
              onClick={() => onBtStartEditing(undefined, undefined, 'bottom')}
            >
              edit (0, Bottom)
            </button>
          </div>
          <div>
            <button onClick={onBtStopEditing}>stop ()</button>
            <button onClick={onBtNextCell}>next ()</button>
            <button onClick={onBtPreviousCell}>previous ()</button>
          </div>
          <div>
            <button onClick={onBtWhich}>which ()</button>
          </div>
        </div>
        <div className='grid-wrapper'>
          <div style={gridStyle} className='ag-theme-alpine'>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pinnedTopRowData={pinnedTopRowData}
              pinnedBottomRowData={pinnedBottomRowData}
              onRowEditingStarted={onRowEditingStarted}
              onRowEditingStopped={onRowEditingStopped}
              onCellEditingStarted={onCellEditingStarted}
              onCellEditingStopped={onCellEditingStopped}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
