import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'parallel fetch & abort',
  date: '2023.10.07',
  tags: ['fetch', 'JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'Parallel fetch & abort',
  body: (
    <>
      <H>Parallel fetch & abort</H>

      <ul>
        <li>Had a challenge, fetch thousands of items in batches</li>
        <li>Every batch is 5k lines</li>
        <li>If we reach the end, then next returned batch from api is an empty array</li>
        <li>Loading to be done in parallel to save time</li>
      </ul>

      <Hs>How solved</Hs>

      <ul>
        <li>launch 20 fetch functions at the same time, which is more than enough for my situation</li>
        <li>associate every fetch with abort controller</li>
        <li>track order of fetches and abort controllers</li>
        <li>as soon as fetch returns empty array all next fetches are aborted</li>
      </ul>

      <Code block jsx>{`
        const controllers: AbortController[] = []

        const maxQueries = 20
        const itemsPerQuery = 5000

        for (let i = 0; i <= maxQueries; i++) {
          controllers.push(new AbortController())
        }

        const fetchSmallBatch = async (): Promise<Receipt[]> => {
          const res = await fetch(url.receipts({ start: '0', count: '50' }), { credentials: 'include' })
          if (!res.ok) throw Error('Problem fetching receipts')
          const data: Receipt[] = await res.json()
          return data
        }

        type Props = {
          start: string
          count: string
          orderInQueue: number
        }

        const fetchBigBatch = async ({ start, count, orderInQueue }: Props): Promise<Receipt[]> => {
          const controller = controllers[orderInQueue]
          const signal = controller.signal

          const res = await fetch(url.receipts({ start, count }), {
            credentials: 'include',
            signal
          })

          if (!res.ok) throw Error('Problem fetching receipts')

          const data: Receipt[] = await res.json()

          if (data.length === 0) {
            for (let i = orderInQueue; i < controllers.length; i++) {
              const isAborted = controllers[i].signal.aborted
              if (!isAborted) {
                controllers[i].abort('no data in prev portion --> no need to fetch this on')
              }
            }
          }

          return data
        }

        await fetchSmallBatch()

        const promises = []
        for (let i = 0; i <= maxQueries; i++) {
          promises.push(fetchBigBatch({
            start: String(i * itemsPerQuery),
            count: String(itemsPerQuery),
            orderInQueue: i
          }))
        }

        const startTime = performance.now()
        await Promise.allSettled(promises).then(data => {
          console.log(data)
          const endTime = performance.now()
          console.log(\`Fetching took \${endTime - startTime} ms\`)
        }).catch(error => {
          console.log(error)
        })
      `}</Code>

      <H>Parallel queries with </H>

      <ul>
        <li><Lnk path='https://tanstack.com/query/v4/docs/react/guides/parallel-queries'>https://tanstack.com/query/v4/docs/react/guides/parallel-queries</Lnk></li>
        <li>We can make parallel queries with tanstack</li>
        <li>Nice thing to me is that queries in tanstack has retry mechanism, we do not have to take care of it</li>
      </ul>

      <Code block jsx>{`
      import 'ag-grid-community/styles/ag-grid.css'
      import 'ag-grid-community/styles/ag-theme-alpine.css'
      import { AgGridReact } from 'ag-grid-react'
      import { useEffect, useRef, useState } from 'react'
      import { Box, LinearProgress } from '@mui/material'
      import { columnDefs, defaultColDef } from './columnDefs'
      import { layoutSlice } from 'shared/layouts'
      import { AgGridCustomStyles } from './ui/AgGridCustomStyles'
      import { dispatch } from 'shared/clients'
      import type { JSX } from 'react'
      import { type Receipt } from 'shared/types/Receipt'
      import { useReceiptsQuery } from 'entities/receipts'
      import { useQueries, type UseQueryResult } from '@tanstack/react-query'
      import { url } from 'shared/url'

      const queryFn = async ({ start, count }: { start: string, count: string }): Promise<Receipt[]> => {
        const res = await fetch(url.receipts({ start, count }), { credentials: 'include' })
        if (!res.ok) throw Error('Problem fetching receipts')
        const data: Receipt[] = await res.json()
        return data
      }

      const useLoad10kItems = (queryNumber: number): Array<UseQueryResult<Receipt[], unknown>> => {
        const batchSize = 1000

        const queries = useQueries({
          queries: [...Array(10).keys()].map((number) => {
            const start = String(10 * batchSize * (queryNumber - 1) + batchSize * number)
            const count = String(batchSize)

            return {
              queryKey: ['receipts', { start, count }],
              queryFn: async () => await queryFn({ start, count }),
              staleTime: Infinity
            }
          })
        })

        return queries
      }

      export const ReceiptsTable = (): JSX.Element | null => {
        const gridRef = useRef(null)
        const { data: initReceipts, isLoading } = useReceiptsQuery({ start: '0', count: '10' })
        const [attemptNum, setAttemptNum] = useState(1)
        const queries = useLoad10kItems(attemptNum)
        const [allReceipts, setAllReceipts] = useState<Receipt[]>([])
        const areQueriesFetched = queries.every(query => query.isFetched)
        const accumulatedReceipts = useRef<Receipt[]>([])

        useEffect(() => {
          if (!areQueriesFetched) return

          const noMoreDataAvailable = queries.some(query => query.data !== undefined && query.data.length === 0)
          const thereIsMoreDataAvailable = !noMoreDataAvailable

          const receiptsFromQueries = queries.flatMap(query => query.data) as Receipt[]

          if (noMoreDataAvailable) {
            accumulatedReceipts.current.push(...receiptsFromQueries)
            console.log(accumulatedReceipts.current.length)
            setAllReceipts(accumulatedReceipts.current)
            return
          }

          if (thereIsMoreDataAvailable) {
            setAttemptNum(attemptNum + 1)
            accumulatedReceipts.current.push(...receiptsFromQueries)
          }
        }, [areQueriesFetched])

        return (
          <Box
            className='ag-theme-alpine ag-receipt-table'
            sx={{ flexGrow: 1, position: 'relative', overflow: 'visible', height: '100%' }}
          >
            <AgGridCustomStyles />
            {isLoading && <LinearProgress sx={{ height: '1px', top: '53px', zIndex: 2 }} />}
            <AgGridReact<Receipt>
              ref={gridRef}
              rowData={allReceipts.length === 0 ? initReceipts : allReceipts}
              animateRows
              rowSelection='multiple'
              suppressRowClickSelection
              enableCellTextSelection
              ensureDomOrder
              suppressCellFocus
              suppressContextMenu
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              suppressScrollOnNewData
              onSelectionChanged={(params) => {
                const selectedRows = params.api.getSelectedRows()
                const isRowSelected = selectedRows.length > 0

                if (isRowSelected) {
                  dispatch(layoutSlice.actions.showFooter())
                  return
                }

                dispatch(layoutSlice.actions.hideFooter())
              }}
            />
          </Box>
        )
      }
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
