'use client'


/** @jsxImportSource @emotion/react */
import { useCallback, useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

// data from server
const dataFromServer = [
  { make: 'tyt', exteriorColour: 'fg', interiorColour: 'bw', price: 35000 },
  { make: 'frd', exteriorColour: 'bw', interiorColour: 'cb', price: 32000 },
  { make: 'prs', exteriorColour: 'cb', interiorColour: 'fg', price: 72000 },
  { make: 'tyt', exteriorColour: 'fg', interiorColour: 'bw', price: 35000 },
  { make: 'frd', exteriorColour: 'bw', interiorColour: 'cb', price: 32000 },
  { make: 'prs', exteriorColour: 'cb', interiorColour: 'fg', price: 72000 },
  { make: 'tyt', exteriorColour: 'fg', interiorColour: 'bw', price: 35000 },
  { make: 'frd', exteriorColour: 'bw', interiorColour: 'cb', price: 32000 },
  { make: 'prs', exteriorColour: 'cb', interiorColour: 'fg', price: 72000 },
  { make: 'tyt', exteriorColour: 'fg', interiorColour: 'bw', price: 35000 },
  { make: 'frd', exteriorColour: 'bw', interiorColour: 'cb', price: 32000 },
  { make: 'prs', exteriorColour: 'cb', interiorColour: 'fg', price: 72000 },
  { make: 'tyt', exteriorColour: 'fg', interiorColour: 'bw', price: 35000 },
  { make: 'frd', exteriorColour: 'bw', interiorColour: 'cb', price: 32000 },
  { make: 'prs', exteriorColour: 'cb', interiorColour: 'fg', price: 72000 },
  { make: 'prs', exteriorColour: 'cb', interiorColour: 'fg', price: 72000 },
  { make: 'tyt', exteriorColour: 'fg', interiorColour: 'bw', price: 35000 },
  { make: 'frd', exteriorColour: 'bw', interiorColour: 'cb', price: 32000 }
]

const removeSpaces = (str) => str ? str.replace(/\s/g, '') : str

const ColourCellRenderer = ({ value, valueFormatted }) => (
  <>
    {
      value === '(Select All)'
        ? <div>{value}</div>
        : <span style={{ color: removeSpaces(valueFormatted) }}>{valueFormatted}</span>
    }
  </>
)

const carMappings = {
  tyt: 'Toyota',
  frd: 'Ford',
  prs: 'Porsche',
  nss: 'Nissan'
}

const colourMappings = {
  cb: 'Cadet Blue',
  bw: 'Burlywood',
  fg: 'Forest Green'
}

const carBrands = Object.keys(carMappings)
const colours = Object.keys(colourMappings)

const lookupValue = (mappings, key) => mappings[key]

const lookupKey = (mappings, name) => {
  const keys = Object.keys(mappings)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (mappings[key] === name) return key
  }
}

const currencyFormatter = (params) => {
  const value = Math.floor(params.value)
  if (isNaN(value)) return ''
  return '£' + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const numberValueSetter = (params) => {
  if (isNaN(parseFloat(params.newValue)) || !isFinite(params.newValue)) {
    return false // don't set invalid numbers!
  }
  params.data.price = params.newValue
  return true
}

export const Example15 = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const [rowData, setRowData] = useState(dataFromServer)
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'make',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: carBrands
      },
      filterParams: {
        valueFormatter: (params) => lookupValue(carMappings, params.value)
      },
      valueFormatter: (params) => lookupValue(carMappings, params.value)
    },
    {
      field: 'exteriorColour',
      minWidth: 150,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorPopup: true,
      cellEditorParams: {
        values: colours,
        cellRenderer: ColourCellRenderer
      },
      filter: 'agSetColumnFilter',
      filterParams: {
        values: colours,
        valueFormatter: (params) => lookupValue(colourMappings, params.value),
        cellRenderer: ColourCellRenderer
      },
      valueFormatter: (params) => lookupValue(colourMappings, params.value),
      valueParser: (params) => lookupKey(colourMappings, params.newValue),
      cellRenderer: ColourCellRenderer
    },
    {
      field: 'interiorColour',
      minWidth: 150,
      cellEditor: 'agTextCellEditor',
      cellEditorParams: {
        useFormatter: true
      },
      filter: 'agSetColumnFilter',
      filterParams: {
        values: colours,
        valueFormatter: (params) => lookupValue(colourMappings, params.value),
        cellRenderer: ColourCellRenderer
      },
      valueFormatter: (params) => lookupValue(colourMappings, params.value),
      valueParser: (params) => lookupKey(colourMappings, params.newValue),
      cellRenderer: ColourCellRenderer
    },
    {
      headerName: 'Retail Price',
      field: 'price',
      minWidth: 140,
      colId: 'retailPrice',
      valueGetter: (params) => params.data.price,
      valueFormatter: currencyFormatter,
      valueSetter: numberValueSetter
    },
    {
      headerName: 'Retail Price (incl Taxes)',
      minWidth: 205,
      editable: false,
      valueGetter: (params) => {
        // example of chaining value getters
        return params.getValue('retailPrice') * 1.2
      },
      valueFormatter: currencyFormatter
    }
  ])
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      editable: true
    }
  }, [])

  const onCellValueChanged = useCallback((params) => {
    // notice that the data always contains the keys rather than values after editing
    console.log('onCellValueChanged: ', params)
  }, [])

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className='ag-theme-alpine-dark'>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  )
}
