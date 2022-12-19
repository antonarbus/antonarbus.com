import { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
const rows = [
  {
    name: 'Michael Phelps',
    person: {
      age: 23,
      country: 'United States'
    },
    medals: {
      gold: 8,
      silver: 0,
      bronze: 0
    }
  },
  {
    name: 'Michael Phelps',
    person: {
      age: 19,
      country: 'United States'
    },
    medals: {
      gold: 6,
      silver: 0,
      bronze: 2
    }
  },
  {
    name: 'Michael Phelps',
    person: {
      age: 27,
      country: 'United States'
    },
    medals: {
      gold: 4,
      silver: 2,
      bronze: 0
    }
  },
  {
    name: 'Natalie Coughlin',
    person: {
      age: 25,
      country: 'United States'
    },
    medals: {
      gold: 1,
      silver: 2,
      bronze: 3
    }
  },
  {
    name: 'Ryan Lochte',
    person: {
      age: 24,
      country: 'United States'
    },
    medals: {
      gold: 2,
      silver: 0,
      bronze: 2
    }
  },
  {
    name: 'Inge de Bruijn',
    person: {
      age: 30,
      country: 'Netherlands'
    },
    medals: {
      gold: 1,
      silver: 1,
      bronze: 2
    }
  }
]
const gridStyle = { height: '300px', width: '100%' }

export const Example2 = () => {
  const [rowData, setRowData] = useState(rows)
  const [columnDefs, setColumnDefs] = useState([
    { field: 'name' },
    { field: 'medals.gold', headerName: 'Gold' },
    { field: 'person.age' }
  ])

  return (
    <div style={gridStyle} className='ag-theme-alpine'>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  )
}
