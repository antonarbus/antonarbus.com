import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

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
