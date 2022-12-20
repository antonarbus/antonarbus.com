import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useData } from './useData'

const columnDefs = [
  { field: 'athlete' },
  { field: 'sport' },
  { field: 'age', type: 'numberColumn' },
  { field: 'year', type: 'numberColumn' },
  { field: 'date', type: ['dateColumn', 'nonEditableColumn'], width: 220 },
  {
    headerName: 'Medals',
    groupId: 'medalsGroup',
    children: [
      { headerName: 'Gold', field: 'gold', type: 'medalColumn' },
      { headerName: 'Silver', field: 'silver', type: 'medalColumn' },
      { headerName: 'Bronze', field: 'bronze', type: 'medalColumn' },
      { headerName: 'Total', field: 'total', type: 'medalColumn', columnGroupShow: 'closed' }
    ]
  }
]

const defaultColDef = {
  width: 150,
  editable: true,
  filter: 'agTextColumnFilter', // make every column use 'text' filter by default
  floatingFilter: true,
  resizable: true
}

const defaultColGroupDef = {
  marryChildren: true
}

const columnTypes = {
  numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
  medalColumn: { width: 100, columnGroupShow: 'open', filter: false },
  nonEditableColumn: { editable: false },
  dateColumn: {
    // specify we want to use the date filter
    filter: 'agDateColumnFilter',
    // add extra parameters for the date filter
    filterParams: {
      // provide comparator function
      comparator: (filterLocalDateAtMidnight, cellValue) => {
        // In the example application, dates are stored as dd/mm/yyyy
        const dateParts = cellValue.split('/')
        const day = Number(dateParts[0])
        const month = Number(dateParts[1]) - 1
        const year = Number(dateParts[2])
        const cellDate = new Date(year, month, day)
        if (cellDate < filterLocalDateAtMidnight) return -1
        if (cellDate > filterLocalDateAtMidnight) return 1
        return 0
      }
    }
  }
}

const gridStyle = { height: '300px', width: '100%' }

export const Example3 = () => {
  const { data: rowData } = useData()

  return (
    <div style={gridStyle} className='ag-theme-alpine'>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        defaultColGroupDef={defaultColGroupDef}
        columnTypes={columnTypes}
        // onGridReady={onGridReady}
      />
    </div>
  )
}
