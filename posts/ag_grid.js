'use client'


/** @jsxImportSource @emotion/react */
import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { Example1 } from './ag-grid/Example1'
import { Example2 } from './ag-grid/Example2'
import { Example3 } from './ag-grid/Example3'
import { Example4 } from './ag-grid/Example4'
import { Example5 } from './ag-grid/Example5'
import { Example6 } from './ag-grid/Example6'
import { Example7 } from './ag-grid/Example7'
import { Example8 } from './ag-grid/Example8'
import { Example9 } from './ag-grid/Example9'
import { Example10 } from './ag-grid/Example10'
import { Example11 } from './ag-grid/Example11'
import { Example12 } from './ag-grid/Example12'
import { Example13 } from './ag-grid/Example13'
import { Example14 } from './ag-grid/Example14'
import { Example15 } from './ag-grid/Example15'
import { Example16 } from './ag-grid/Example16'
import { Example17 } from './ag-grid/Example17'
import { Example18 } from './ag-grid/Example18'
import { Example19 } from './ag-grid/Example19'

const postObj = {
  title: 'ag grid',
  date: '2022.12.19',
  tags: ['react', 'tool'],
  imgUrl: 'https://antonarbus.com/imgs/react.png',
  desc: 'AG Grid for react',
  body: (
    <>
      <H>About</H>

      <ul>
        <li><Lnk path='https://www.ag-grid.com/react-data-grid/getting-started/'>ag-grid</Lnk> website</li>
        <li><Code>npm i ag-grid-community</Code> free package</li>
        <li><Code>npm i ag-grid-react</Code> free package</li>
        <li><Code>npm i ag-grid-enterprise</Code> paid features</li>
      </ul>

      <H>useData</H>

      <ul>
        <li>In several examples we call for data from the api</li>
        <li>To avoid excessive api calls we can use caching via <i>useQuery</i> package</li>
      </ul>

      <Code block jsx>{`
      const { useQuery } = require('react-query')

        export function useData() {
          return useQuery({
            queryKey: ['ag-grid-data'],
            queryFn: () => fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
              .then((resp) => resp.json())
              .then(data => data)
          })
        }
      `}</Code>

      <H>Basics</H>

      <Code block jsx>{`
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
      `}</Code>

      <Example1 />

      <H>Consume data from complex object</H>

      <Code block jsx>{`
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
      `}</Code>

      <Example2 />

      <H>floatingFilter</H>

      <Code block jsx>{`
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
      `}</Code>

      <Example3 />

      <H>Add / remove columns programmatically</H>

      <Code block jsx>{`
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
            css={css\`
              .test-container {
                height: 400px;
              }
            \`}
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
      `}</Code>

      <Example4 />

      <H>Set column width</H>

      <Code block jsx>{`
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
            css={css\`
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
            \`}
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
      `}</Code>

      <Example5 />

      <H>Column events</H>

      <Code block jsx>{`
      /** @jsxImportSource @emotion/react */
      import { useCallback, useMemo, useRef, useState } from 'react'
      import { AgGridReact } from 'ag-grid-react'
      import 'ag-grid-enterprise'
      import 'ag-grid-community/styles/ag-grid.css'
      import 'ag-grid-community/styles/ag-theme-alpine.css'
      import { css } from '@emotion/react'
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
            css={css\`
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
            \`}
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
      `}</Code>

      <Example6 />

      <H>Multi column sort with command</H>

      <Code block jsx>{`
      /** @jsxImportSource @emotion/react */
      import { useCallback, useMemo, useState } from 'react'
      import { AgGridReact } from 'ag-grid-react'
      import 'ag-grid-community/styles/ag-grid.css'
      import 'ag-grid-community/styles/ag-theme-alpine.css'
      import { useData } from './useData'

      export const Example7 = () => {
        const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
        const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
        const { data: rowData } = useData()

        const [columnDefs, setColumnDefs] = useState([
          { field: 'athlete' },
          { field: 'age', width: 100 },
          { field: 'country' },
          { field: 'year', width: 100 },
          { field: 'date', sortingOrder: ['desc', null] },
          { field: 'sport', sortingOrder: ['asc'] },
          { field: 'gold', sortingOrder: ['asc', 'desc'] },
          { field: 'silver' },
          { field: 'bronze' },
          { field: 'total' }
        ])
        const defaultColDef = useMemo(() => {
          return {
            width: 170,
            sortable: true
          }
        }, [])

        const onGridReady = useCallback((params) => {
          const defaultSortModel = [
            { colId: 'country', sort: 'asc', sortIndex: 0 },
            { colId: 'athlete', sort: 'asc', sortIndex: 1 }
          ]
          params.columnApi.applyColumnState({ state: defaultSortModel })
        }, [])

        return (
          <div style={containerStyle}>
            <div style={gridStyle} className='ag-theme-alpine'>
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                multiSortKey='ctrl'
                onGridReady={onGridReady}
                animateRows
                // alwaysMultiSort
              />
            </div>
          </div>
        )
      }
      `}</Code>

      <Example7 />

      <H>Wrap text and auto height row</H>

      <Code block jsx>{`
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
      `}</Code>

      <Example8 />

      <H>Row drag</H>

      <Code block jsx>{`
      /** @jsxImportSource @emotion/react */
      import { useMemo, useState } from 'react'
      import { AgGridReact } from 'ag-grid-react'
      import 'ag-grid-community/styles/ag-grid.css'
      import 'ag-grid-community/styles/ag-theme-alpine.css'
      import { useData } from './useData'

      export const Example9 = () => {
        const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
        const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
        const { data: rowData } = useData()

        const [columnDefs, setColumnDefs] = useState([
          { field: 'athlete', rowDrag: true },
          { field: 'country' },
          { field: 'year', width: 100 },
          { field: 'date' },
          { field: 'sport' },
          { field: 'gold' },
          { field: 'silver' },
          { field: 'bronze' }
        ])
        const defaultColDef = useMemo(() => {
          return {
            width: 170,
            sortable: true,
            filter: true
          }
        }, [])

        return (
          <div style={containerStyle}>
            <div style={gridStyle} className='ag-theme-alpine'>
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowDragManaged
                animateRows
                // onGridReady={onGridReady}
              />
            </div>
          </div>
        )
      }
      `}</Code>

      <Example9 />

      <H>Data from selected row</H>

      <Code block jsx>{`
      /** @jsxImportSource @emotion/react */
      import { useCallback, useMemo, useRef, useState } from 'react'
      import { AgGridReact } from 'ag-grid-react'
      import 'ag-grid-community/styles/ag-grid.css'
      import 'ag-grid-community/styles/ag-theme-alpine.css'
      import { useData } from './useData'

      export const Example10 = () => {
        const gridRef = useRef()
        const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
        const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
        const { data: rowData } = useData()

        const [columnDefs, setColumnDefs] = useState([
          { field: 'athlete', minWidth: 150 },
          { field: 'age', maxWidth: 90 },
          { field: 'country', minWidth: 150 }
        ])
        const defaultColDef = useMemo(() => {
          return {
            flex: 1,
            minWidth: 100
          }
        }, [])

        const onSelectionChanged = useCallback(() => {
          const selectedRows = gridRef.current.api.getSelectedRows()
          document.querySelector('#selectedRows').innerHTML =
            selectedRows.length === 1 ? selectedRows[0].athlete : ''
        }, [])

        return (
          <div style={containerStyle}>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <div className='example-header'>
                Selection:
                <span id='selectedRows' />
              </div>

              <div style={gridStyle} className='ag-theme-alpine'>
                <AgGridReact
                  ref={gridRef}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  rowSelection='single'
                  // onGridReady={onGridReady}
                  onSelectionChanged={onSelectionChanged}
                />
              </div>
            </div>
          </div>
        )
      }
      `}</Code>

      <Example10 />

      <H>External filter</H>

      <Code block jsx>{`
      /** @jsxImportSource @emotion/react */
      import { useCallback, useMemo, useRef, useState } from 'react'
      import { AgGridReact } from 'ag-grid-react'
      import 'ag-grid-enterprise'
      import 'ag-grid-community/styles/ag-grid.css'
      import 'ag-grid-community/styles/ag-theme-alpine.css'
      import { css } from '@emotion/react'
      import { useData } from './useData'

      const dateFilterParams = {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          const cellDate = asDate(cellValue)
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) return 0
          if (cellDate < filterLocalDateAtMidnight) return -1
          if (cellDate > filterLocalDateAtMidnight) return 1
        }
      }

      let ageType = 'everyone'

      const asDate = (dateAsString) => {
        const splitFields = dateAsString.split('/')
        return new Date(
          Number.parseInt(splitFields[2]),
          Number.parseInt(splitFields[1]) - 1,
          Number.parseInt(splitFields[0])
        )
      }

      export const Example11 = () => {
        const gridRef = useRef()
        const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
        const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
        const { data: rowData } = useData()
        const [columnDefs, setColumnDefs] = useState([
          { field: 'athlete', minWidth: 180 },
          { field: 'age', filter: 'agNumberColumnFilter', maxWidth: 80 },
          { field: 'country' },
          { field: 'year', maxWidth: 90 },
          { field: 'date', filter: 'agDateColumnFilter', filterParams: dateFilterParams },
          { field: 'gold', filter: 'agNumberColumnFilter' },
          { field: 'silver', filter: 'agNumberColumnFilter' },
          { field: 'bronze', filter: 'agNumberColumnFilter' }
        ])
        const defaultColDef = useMemo(() => {
          return {
            flex: 1,
            minWidth: 120,
            filter: true
          }
        }, [])

        const externalFilterChanged = useCallback((newValue) => {
          ageType = newValue
          gridRef.current.api.onFilterChanged()
        }, [])

        const isExternalFilterPresent = useCallback(() => {
          // if ageType is not everyone, then we are filtering
          return ageType !== 'everyone'
        }, [])

        const doesExternalFilterPass = useCallback(
          (node) => {
            if (node.data) {
              switch (ageType) {
                case 'below25':
                  return node.data.age < 25
                case 'between25and50':
                  return node.data.age >= 25 && node.data.age <= 50
                case 'above50':
                  return node.data.age > 50
                case 'dateAfter2008':
                  return asDate(node.data.date) > new Date(2008, 1, 1)
                default:
                  return true
              }
            }
            return true
          },
          [ageType]
        )

        return (
          <div
            style={containerStyle}
            css={css\`
              .test-container {
                height: 100%;
                display: flex;
                flex-direction: column;
              }
              .test-header {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 13px;
                margin-bottom: 10px;
                display: flex;
                justify-content: space-around;
                border: 1px solid grey;
                padding: 10px;
                border-radius: 5px;
              }
            \`}
          >
            <div className='test-container'>
              <div className='test-header'>
                <label>
                  <input
                    type='radio'
                    name='filter'
                    id='everyone'
                    onChange={() => externalFilterChanged('everyone')}
                  />
                  Everyone
                </label>
                <label>
                  <input
                    type='radio'
                    name='filter'
                    id='below25'
                    onChange={() => externalFilterChanged('below25')}
                  />
                  Below 25
                </label>
                <label>
                  <input
                    type='radio'
                    name='filter'
                    id='between25and50'
                    onChange={() => externalFilterChanged('between25and50')}
                  />
                  Between 25 and 50
                </label>
                <label>
                  <input
                    type='radio'
                    name='filter'
                    id='above50'
                    onChange={() => externalFilterChanged('above50')}
                  />
                  Above 50
                </label>
                <label>
                  <input
                    type='radio'
                    name='filter'
                    id='dateAfter2008'
                    onChange={() => externalFilterChanged('dateAfter2008')}
                  />
                  After 01/01/2008
                </label>
              </div>

              <div style={gridStyle} className='ag-theme-alpine'>
                <AgGridReact
                  ref={gridRef}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  animateRows
                  isExternalFilterPresent={isExternalFilterPresent}
                  doesExternalFilterPass={doesExternalFilterPass}
                  // onGridReady={onGridReady}
                />
              </div>
            </div>
          </div>
        )
      }
      `}</Code>

      <Example11 />

      <H>Quick filter</H>

      <Code block jsx>{`
      /** @jsxImportSource @emotion/react */
      import { useCallback, useMemo, useRef, useState } from 'react'
      import { AgGridReact } from 'ag-grid-react'
      import 'ag-grid-community/styles/ag-grid.css'
      import 'ag-grid-community/styles/ag-theme-alpine.css'
      import { css } from '@emotion/react'

      function getData () {
        const rowData = [
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
        ]
        return rowData
      }

      const getMedalString = function ({ gold, silver, bronze }) {
        const goldStr = gold > 0 ? \`Gold: \${gold} \` : ''
        const silverStr = silver > 0 ? \`Silver: \${silver} \` : ''
        const bronzeStr = bronze > 0 ? \`Bronze: \${bronze}\` : ''
        return goldStr + silverStr + bronzeStr
      }

      const MedalRenderer = function (params) {
        return getMedalString(params.value)
      }

      export const Example12 = () => {
        const gridRef = useRef()
        const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
        const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
        const [rowData, setRowData] = useState(getData())
        const [columnDefs, setColumnDefs] = useState([
          // simple column, easy to understand
          { field: 'name' },
          // the grid works with embedded fields
          { headerName: 'Age', field: 'person.age' },
          // or use value getter, all works with quick filter
          { headerName: 'Country', valueGetter: 'data.person.country' },
          // or use the object value, so value passed around is an object
          {
            headerName: 'Results',
            field: 'medals',
            cellRenderer: MedalRenderer,
            // this is needed to avoid toString=[object,object] result with objects
            getQuickFilterText: (params) => {
              return getMedalString(params.value)
            }
          }
        ])
        const defaultColDef = useMemo(() => {
          return {
            flex: 1,
            editable: true
          }
        }, [])

        const onFilterTextBoxChanged = useCallback(() => {
          gridRef.current.api.setQuickFilter(
            document.getElementById('filter-text-box').value
          )
        }, [])

        const onPrintQuickFilterTexts = useCallback(() => {
          gridRef.current.api.forEachNode(function (rowNode, index) {
            console.log('Row ' + index + ' quick filter text is ' + rowNode.quickFilterAggregateText)
          })
        }, [])

        return (
          <div
            style={containerStyle}
            css={css\`
              .example-wrapper {
                display: flex;
                flex-direction: column;
                height: 100%;
              }

              #myGrid {
                flex: 1 1 0px;
                width: 100%;
              }

              .example-header {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 13px;
                margin-bottom: 5px;
              }
            \`}
          >
            <div className='example-wrapper'>
              <div className='example-header'>
                <input
                  type='text'
                  id='filter-text-box'
                  placeholder='Filter...'
                  onInput={onFilterTextBoxChanged}
                />
                <button
                  style={{ marginLeft: '20px' }}
                  onClick={onPrintQuickFilterTexts}
                >
                  Print Quick Filter Cache Texts
                </button>
              </div>

              <div style={gridStyle} className='ag-theme-alpine'>
                <AgGridReact
                  ref={gridRef}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  cacheQuickFilter
                />
              </div>
            </div>
          </div>
        )
      }
      `}</Code>

      <Example12 />

      <H>valueGetter</H>

      <Code block jsx>{`
      /** @jsxImportSource @emotion/react */
      import { useMemo, useState } from 'react'
      import { AgGridReact } from 'ag-grid-react'
      import 'ag-grid-community/styles/ag-grid.css'
      import 'ag-grid-community/styles/ag-theme-alpine.css'
      import { css } from '@emotion/css'

      const hashValueGetter = (params) => params.node ? params.node.rowIndex : null
      const abValueGetter = (params) => params.data.a + params.data.b
      const a1000ValueGetter = (params) => params.data.a * 1000
      const b137ValueGetter = (params) => params.data.b * 137
      const randomValueGetter = () => Math.floor(Math.random() * 1000)
      const chainValueGetter = (params) => params.getValue('a&b') * 1000
      const constValueGetter = () => 99999

      const createRowData = () => {
        const rowData = []
        for (let i = 0; i < 100; i++) {
          rowData.push({
            a: Math.floor(i % 4),
            b: Math.floor(i % 7)
          })
        }
        return rowData
      }

      export const Example13 = () => {
        const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
        const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
        const [rowData, setRowData] = useState(createRowData())
        const [columnDefs, setColumnDefs] = useState([
          {
            headerName: '#',
            maxWidth: 100,
            valueGetter: hashValueGetter
          },
          { field: 'a' },
          { field: 'b' },
          {
            headerName: 'A + B',
            colId: 'a&b',
            valueGetter: abValueGetter
          },
          {
            headerName: 'A * 1000',
            minWidth: 95,
            valueGetter: a1000ValueGetter
          },
          {
            headerName: 'B * 137',
            minWidth: 90,
            valueGetter: b137ValueGetter
          },
          {
            headerName: 'Random',
            minWidth: 90,
            valueGetter: randomValueGetter
          },
          {
            headerName: 'Chain',
            valueGetter: chainValueGetter
          },
          {
            headerName: 'Const',
            minWidth: 85,
            valueGetter: constValueGetter
          }
        ])
        const defaultColDef = useMemo(() => {
          return {
            flex: 1,
            minWidth: 75
            // cellClass: 'number-cell'
          }
        }, [])

        return (
          <div
            style={containerStyle}
            css={css\`
              .number-cell {
                text-align: right;
              }
            \`}
          >
            <div style={gridStyle} className='ag-theme-alpine-dark'>
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
              />
            </div>
          </div>
        )
      }
      `}</Code>

      <Example13 />

      <H>valueFormatter</H>

      <Code block jsx>{`
      /** @jsxImportSource @emotion/react */
      import { useMemo, useState } from 'react'
      import { AgGridReact } from 'ag-grid-react'
      import 'ag-grid-community/styles/ag-grid.css'
      import 'ag-grid-community/styles/ag-theme-alpine.css'

      const bracketsFormatter = (params) => {
        return '(' + params.value + ')'
      }
      const currencyFormatter = (params) => '£' + formatNumber(params.value)
      const formatNumber = (number) => {
        // this puts commas into the number eg 1000 goes to 1,000,
        // i pulled this from stack overflow, i have no idea how it works
        return Math.floor(number)
          .toString()
          .replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, '$1,')
      }

      const createRowData = () => {
        const rowData = []
        for (let i = 0; i < 100; i++) {
          rowData.push({
            a: Math.floor(((i + 2) * 173456) % 10000),
            b: Math.floor(((i + 7) * 373456) % 10000)
          })
        }
        return rowData
      }

      export const Example14 = () => {
        const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
        const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
        const [rowData, setRowData] = useState(createRowData())
        const [columnDefs, setColumnDefs] = useState([
          { headerName: 'A', field: 'a' },
          { headerName: 'B', field: 'b' },
          { headerName: '£A', field: 'a', valueFormatter: currencyFormatter },
          { headerName: '£B', field: 'b', valueFormatter: currencyFormatter },
          { headerName: '(A)', field: 'a', valueFormatter: bracketsFormatter },
          { headerName: '(B)', field: 'b', valueFormatter: bracketsFormatter }
        ])
        const defaultColDef = useMemo(() => {
          return {
            flex: 1,
            cellClass: 'number-cell',
            resizable: true
          }
        }, [])

        return (
          <div style={containerStyle}>
            <div style={gridStyle} className='ag-theme-alpine-dark'>
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
              />
            </div>
          </div>
        )
      }
      `}</Code>

      <Example14 />

      <H>SelectCellEditor, RichSelectCellEditor</H>

      <Code block jsx>{`
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
        return '£' + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
      `}</Code>

      <Example15 />

      <H>Specific editable cells with styles</H>

      <Code block jsx>{`
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
            css={css\`
              .example-wrapper {
                  display: flex;
                  flex-direction: column;
                  height: 100%;
                }

                #myGrid {
                  flex: 1 1 0px;
                  width: 100%;
                }
            \`}
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
      `}</Code>

      <Example16 />

      <H>Edit cell</H>

      <Code block jsx>{`
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
              css\`
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
              \`
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
      `}</Code>

      <Example17 />

      <H>Parse value during editing</H>

      <Code block jsx>{`
      /** @jsxImportSource @emotion/react */
      import { useCallback, useMemo, useRef, useState } from 'react'
      import { AgGridReact } from 'ag-grid-react'
      import 'ag-grid-community/styles/ag-grid.css'
      import 'ag-grid-community/styles/ag-theme-alpine.css'

      function getData () {
        const rowData = []
        const words = [
          'One',
          'Apple',
          'Moon',
          'Sugar',
          'Grid',
          'Banana',
          'Sunshine',
          'Stars',
          'Black',
          'White',
          'Salt',
          'Beach'
        ]

        for (let i = 0; i < 100; i++) {
          rowData.push({
            simple: words[i % words.length],
            number: Math.floor(((i + 2) * 173456) % 10000)
          })
        }

        return rowData
      }

      const numberParser = (params) => {
        return 'num is doubled after editing ' + 2 * Number(params.newValue)
      }

      export const Example18 = () => {
        const gridRef = useRef()
        const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
        const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
        const [rowData, setRowData] = useState(getData())
        const [columnDefs, setColumnDefs] = useState([
          { headerName: 'Name', field: 'simple' },
          {
            headerName: 'number',
            field: 'number',
            valueParser: numberParser
          }
        ])
        const defaultColDef = useMemo(() => {
          return {
            flex: 1,
            editable: true,
            resizable: true
          }
        }, [])

        const onGridReady = useCallback((params) => {
          gridRef.current.api.sizeColumnsToFit()
        }, [])

        const onCellValueChanged = useCallback((event) => {
          console.log('data after changes is: ', event.data)
        }, [])

        return (
          <div style={containerStyle}>
            <div style={gridStyle} className='ag-theme-alpine-dark'>
              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                onCellValueChanged={onCellValueChanged}
              />
            </div>
          </div>
        )
      }
      `}</Code>

      <Example18 />

      <H>Pagination + checkboxSelection</H>

      <Code block jsx>{`
      /** @jsxImportSource @emotion/react */
      import { useMemo, useState } from 'react'
      import { AgGridReact } from 'ag-grid-react'
      import 'ag-grid-enterprise'
      import 'ag-grid-community/styles/ag-grid.css'
      import 'ag-grid-community/styles/ag-theme-alpine.css'
      import { useData } from './useData'

      const checkboxSelection = function (params) {
        // we put checkbox on the name if we are not doing grouping
        return params.columnApi.getRowGroupColumns().length === 0
      }

      const headerCheckboxSelection = function (params) {
        // we put checkbox on the name if we are not doing grouping
        return params.columnApi.getRowGroupColumns().length === 0
      }

      export const Example19 = () => {
        const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
        const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
        const { data: rowData } = useData()
        const [columnDefs, setColumnDefs] = useState([
          {
            field: 'athlete',
            minWidth: 170,
            checkboxSelection,
            headerCheckboxSelection
          },
          { field: 'age' },
          { field: 'country' },
          { field: 'year' },
          { field: 'date' },
          { field: 'sport' },
          { field: 'gold' },
          { field: 'silver' },
          { field: 'bronze' },
          { field: 'total' }
        ])
        const autoGroupColumnDef = useMemo(() => {
          return {
            headerName: 'Group',
            minWidth: 170,
            field: 'athlete',
            valueGetter: (params) => {
              if (params.node.group) {
                return params.node.key
              } else {
                return params.data[params.colDef.field]
              }
            },
            headerCheckboxSelection: true,
            cellRenderer: 'agGroupCellRenderer',
            cellRendererParams: {
              checkbox: true
            }
          }
        }, [])
        const defaultColDef = useMemo(() => {
          return {
            editable: true,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true,
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
            minWidth: 100
          }
        }, [])

        return (
          <div style={containerStyle}>
            <div style={gridStyle} className='ag-theme-alpine'>
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                autoGroupColumnDef={autoGroupColumnDef}
                defaultColDef={defaultColDef}
                suppressRowClickSelection
                groupSelectsChildren
                rowSelection='multiple'
                rowGroupPanelShow='always'
                pivotPanelShow='always'
                pagination
                // onGridReady={onGridReady}
              />
            </div>
          </div>
        )
      }
      `}</Code>
      <Example19 />

      <H>Limit number of characters in cell</H>

      <Code block jsx>{`
        const columnDefs = [
          ...
          {
            field: 'value.name',
            headerName: 'Name',
            width: 250,
            minWidth: 250,
            wrapText: true,
            autoHeight: true,
            flex: 2,
            cellStyle: { justifyContent: 'center', textAlign: 'center' }

            // here we limit number of characters in editable cell
            editable: true,
            cellEditor: 'agTextCellEditor',
            cellEditorParams: { maxLength: 10 },
          },
        ]
      `}</Code>
    </>
  )
}

export default postObj

export const post = {
  title: postObj.title,
  date: postObj.date,
  tags: postObj.tags,
  desc: postObj.desc,
  imgUrl: postObj.imgUrl || null,
  bodyStr: jsxToStr(postObj.body)
}
