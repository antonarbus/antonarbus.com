import { useEffect, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
const CustomRenderer = ({ value }) => (
  <>
    <img
      src='https://d1yk6z6emsz7qy.cloudfront.net/static/images/loading.gif'
      style={{
        width: '40px',
        position: 'absolute',
        top: '0px',
        left: '0px'
      }}
      alt='alt'
    />
    <span style={{ marginLeft: '20px' }}> {value + ' EUR'}</span>
  </>
)

export const Example1 = () => {
  const gridRef = useRef()
  useEffect(() => {
    console.log(gridRef.current)
  }, [])

  const [columnDefs] = useState([
    {
      field: 'make',
      editable: false,
      unSortIcon: true
    },
    {
      field: 'model',
      minWidth: 200
    },
    {
      field: 'price',
      cellRenderer: CustomRenderer
    }
  ])

  const getTableRows = () => {
    const array = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxster', price: 72000 },
      { make: 'Volvo', model: 'CX90', price: 45000 },
      { make: 'BMW', model: '3', price: 37000 },
      { make: 'Nissan', model: 'X-trail', price: 66000 }
    ]
    for (let i = 0; i < 999999; i++) {
      array.push({
        make: 'make ' + i, model: 'model ' + i, price: i
      })
    }
    return array
  }
  const [rowData] = useState(getTableRows())

  return (
    <div className='ag-theme-alpine' style={{ height: '400px', width: '100%', marginBottom: '30px' }}>
      <button
        onClick={() => {
          gridRef.current.api.selectAll()
        }}
      >
        Select all
      </button>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={{
          editable: true,
          sortable: true,
          flex: 1,
          minWidth: 100,
          filter: true,
          resizable: true
        }}
        // rowSelection='multiple'
        animateRows
        rowHeight={70}
        // pagination
        enableRangeSelection
        suppressContextMenu
        statusBar={{
          statusPanels: [
            { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
            { statusPanel: 'agTotalRowCountComponent', align: 'center' },
            { statusPanel: 'agFilteredRowCountComponent' },
            { statusPanel: 'agSelectedRowCountComponent' },
            { statusPanel: 'agAggregationComponent' }
          ]
        }}
        onRowClicked={(e) => console.log('row clicked', e)}
        onCellClicked={(e) => console.log('cell clicked', e)}
        onColumnResized={(e) => console.log('column resized', e)}
        onGridReady={(e) => {
          console.log({ 'gridRef.current': gridRef.current })
          console.log({ e })
        }}
      />
    </div>
  )
}
