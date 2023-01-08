import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'react query',
  date: '2022.12.13',
  tags: ['react', 'package'],
  imgUrl: 'https://antonarbus.com/imgs/react.png',
  desc: 'react query example',
  body: (
    <>
      <H>Installation</H>

      <Code>npm i @tanstack/react-query</Code>

      <H>Configuration</H>

      <Code block jsx>{`
      import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
    
      const App = ({ routes, app }) => (
        <QueryClientProvider client={new QueryClient()}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <LocalizationProvider adapterLocale={momentLocale} dateAdapter={AdapterMoment}>
                <I18nextProvider i18n={i18n}>
                  <Suspense fallback={<ProgressIndicator indicator={IndicatorType.OVERLAY} />}>
                    <AppContent routes={routes} app={app} />
                  </Suspense>
                </I18nextProvider>
              </LocalizationProvider>
            </ThemeProvider>
          </StyledEngineProvider>
        </QueryClientProvider>
      )
      `}</Code>

      <H>Custom configuration</H>

      <p>We may provide default settings for whole app.</p>

      <Code block jsx>{`
      export const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 1000 * 60 * 60 * 24
          }
        }
      })
      `}</Code>

      <Code block jsx>{`
      const App = ({ routes, app }) => (
        <QueryClientProvider client={queryClient}>
          ...
        </QueryClientProvider>
      )
      `}</Code>

      <H>Query on mount + cache + never re-fetch + fallback data</H>

      <Code block jsx>{`
      // CurrencyInput.js
      import DropdownField from '../../../DropdownField'
      import { useTranslation } from 'react-i18next'
      import { Validator } from '../../../fields/validation'
      import { useCurrenciesQuery } from './useCurrenciesQuery'
      import { useSelector } from 'react-redux'
      import { useQuery } from '@tanstack/react-query'
      import { selectIsInvoiceFormDisabled } from '../../../../containers/selectors/invoice-selectors'

      const defaultCurrencies = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYR', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STD', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMK', 'ZWL']

      export const CurrencyInput = () => {
        const { t } = useTranslation()
        const isInvoiceFormDisabled = useSelector(selectIsInvoiceFormDisabled)
      
        const { data: currencies } = useQuery({
          queryKey: ['get currencies'],
          queryFn: () => resource.get(appSettings.currenciesUrl, false),
          select: (res) => [...new Set(Object.values(res.data))].map(code => code).filter(code => code !== '').sort(),
          staleTime: Infinity,
          cacheTime: Infinity
        })

        return (
          <DropdownField
            items={currencies || defaultCurrencies}
            name='sum.currency'
            label={t('label.details.currency')}
            validate={Validator.requiredField}
            fullWidth
            disabled={isInvoiceFormDisabled}
          />
        )
      }
      `}</Code>

      <H>Reusable query</H>

      <Code block jsx>{`
        // useCurrenciesQuery.js
        import { useQuery } from '@tanstack/react-query'
        import { appSettings } from '../../../../utils/app-settings'
        import resource from '../../../../utils/ResourceUtil'

        export const useCurrenciesQuery = () => {
          return useQuery({
            queryKey: ['get currencies'],
            queryFn: () => resource.get(appSettings.currenciesUrl, false),
            select: (res) => [...new Set(Object.values(res.data))].map(code => code).filter(code => code !== '').sort(),
            staleTime: Infinity,
            cacheTime: Infinity
          })
        }
      `}</Code>

      <Code block jsx>{`
      // CurrencyInput.js
      import DropdownField from '../../../DropdownField'
      import { useTranslation } from 'react-i18next'
      import { Validator } from '../../../fields/validation'
      import { useCurrenciesQuery } from './useCurrenciesQuery'
      import { useSelector } from 'react-redux'
      import { selectIsInvoiceFormDisabled } from '../../../../containers/selectors/invoice-selectors'

      const defaultCurrencies = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYR', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STD', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMK', 'ZWL']

      export const CurrencyInput = () => {
        const { t } = useTranslation()
        const isInvoiceFormDisabled = useSelector(selectIsInvoiceFormDisabled)
        const { data: currencies } = useCurrenciesQuery()

        return (
          <DropdownField
            items={currencies || defaultCurrencies}
            name='sum.currency'
            label={t('label.details.currency')}
            validate={Validator.requiredField}
            fullWidth
            disabled={isInvoiceFormDisabled}
          />
        )
      }
      `}</Code>

      <H>Fetch on click</H>

      <p>We need to disable the query and trigger the <code>refetch</code> function.</p>

      <Code block jsx>{`
        export const useCurrenciesQuery = () => {
          return useQuery({
            queryKey: ['get currencies'],
            queryFn: () => resource.get(appSettings.currenciesUrl, false),
            select: (res) => [...new Set(Object.values(res.data))].map(code => code).filter(code => code !== '').sort(),
            staleTime: Infinity,
            cacheTime: Infinity,
            enabled: false
          })
        }
      `}</Code>

      <Code block jsx>{`
      export const CurrencyInput = () => {
        const { data: currencies, isLoading, isFetching, isError, error, refetch  } = useCurrenciesQuery()

        return (
          <button onClick={refetch}>Fetch</button>
        )
      }
      `}</Code>

      <H>Side effects</H>

      <ul>
        <li>After successful or failed fetching we usually have to use <code>useEffect</code> to perform some action</li>
        <li>React-query provides <code>onSuccess</code> & <code>onError</code> callback parameters</li>
      </ul>

      <H>Parallel queries</H>

      <ul>
        <li>By default queries are executed in parallel</li>
        <li>Just add multiple useQuery hooks and dedicated name aliases</li>
      </ul>

      <Code block jsx>{`
      function App () {
        // The following queries will execute in parallel
        const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
        const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: fetchTeams })
        const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
        ...
      }
      `}</Code>

      <H>Sequential (dependent) queries</H>

      <p>Use the <code>enabled</code> option to tell a query when it is ready to run</p>

      <Code block jsx>{`
      // Get the user
      const { data: user } = useQuery({ queryKey: ['user', email], queryFn: getUserByEmail, })

      const userId = user?.id

      // Then get the user's projects
      const { status, fetchStatus, data: projects, } = useQuery({
        queryKey: ['projects', userId],
        queryFn: getProjectsByUser,
        // The query will not execute until the userId exists
        enabled: !!userId,
      })
      `}</Code>

      <H>Initial data</H>

      <Hs>Show init data & fetch actual data immediately</Hs>

      <Code block jsx>{`
      // Will show initialTodos immediately, but also immediately refetch todos after mount
      const result = useQuery({
        queryKey: ['todos'],
        queryFn: () => fetch('/todos'),
        initialData: initialTodos,
      })
      `}</Code>

      <Hs>Show init data & fetch actual data later</Hs>

      <Code block jsx>{`
      // Show initialTodos immediately, but won't refetch until another interaction event is encountered after 1000 ms
      const result = useQuery({
        queryKey: ['todos'],
        queryFn: () => fetch('/todos'),
        initialData: initialTodos,
        staleTime: 60 * 1000, // 1 minute
        // This could be 10 seconds ago or 10 minutes ago
        initialDataUpdatedAt: initialTodosUpdatedTimestamp, // eg. 1608412420052
      })
      `}</Code>

      <Hs>Initial data from cache</Hs>

      <p>We can access previously cached data by its query id via <code>queryClient.getQueryData()</code> method.</p>

      <Code block jsx>{`
      const result = useQuery({
        queryKey: ['todo', todoId],
        queryFn: () => fetch('/todos'),
        initialData: () => {
          // Use a todo from the 'todos' query as the initial data for this todo query
          return queryClient.getQueryData(['todos'])?.find((d) => d.id === todoId)
        },
      })
      `}</Code>

      <H>Pagination</H>

      <ul>
        <li>Page information should be in the query key array</li>
        <li>The UI jumps in and out of the success and loading states because each new page is treated like a brand new query</li>
        <li>This experience is not optimal</li>
        <li>Use <code>keepPreviousData: true</code> to persist previous data during loading new one</li>
      </ul>

      <Code block jsx>{`
      function Todos() {
        const [page, setPage] = useState(0)

        const fetchProjects = (page = 0) => fetch('/api/projects?page=' + page).then((res) => res.json())

        const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery({
          queryKey: ['projects', page],
          queryFn: () => fetchProjects(page),
          keepPreviousData: true
        })

        if (isLoading) return <div>Loading...</div>
        if (isError) return <div>Error: {error.message}</div>

        return (
          <>
            <div>
              {data.projects.map(project => <p key={project.id}>{project.name}</p>)}
            </div>

            <span>Current Page: {page + 1}</span>

            <button
              onClick={() => setPage(old => Math.max(old - 1, 0))}
              disabled={page === 0}
            >
              Previous Page
            </button>

            <button
              onClick={() => {
                if (!isPreviousData && data.hasMore) {
                  setPage(old => old + 1)
                }
              }}
              // Disable the Next Page button until we know a next page is available
              disabled={isPreviousData || !data?.hasMore}
            >
              Next Page
            </button>

            {isFetching ? <span> Loading...</span> : null}{' '}
          </>
        )
      }
      `}</Code>

      <H>Infinite queries (load more)</H>

      <ul>
        <li><code>useInfiniteQuery</code> injects the object with <code>pageParam</code> into the fetcher function</li>
        <li><code>getNextPageParam</code> & <code>getPreviousPageParam</code> options are available to determine if there is more data to load</li>
        <li><code>hasNextPage</code> boolean is <code>true</code> if <code>getNextPageParam</code> returns a value other than <code>undefined</code></li>
        <li>same logic works for <code>getPreviousPageParam</code></li>
        <li>get next data with <code>fetchNextPage</code> & <code>fetchPreviousPage</code> functions</li>
      </ul>

      <Code block jsx>{`
      function Projects() {
        const fetchProjects = async ({ pageParam = 0 }) => {
          const res = await fetch('/api/projects?cursor=' + pageParam)
          return res.json()
        }

        const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status, } = useInfiniteQuery({
          queryKey: ['projects'],
          queryFn: fetchProjects,
          getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
        })

        if (status === 'loading') return <p>Loading...</p>

        if (status === 'error') return <p>Error: {error.message}</p>

        return (
          <>
            {data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.projects.map((project) => <p key={project.id}>{project.name}</p>)}
              </React.Fragment>
            ))}

            <div>
              <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                {isFetchingNextPage && 'Loading more...'}
                {hasNextPage ? 'Load More' : 'Nothing more to load'}
              </button>
            </div>
        
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
          </>
        )
      }
      `}</Code>

      <H>Mutation</H>

      <ul>
        <li>For post/delete/update requests we may use <code>useMutation</code> hook</li>
        <li>All we pass into <code>mutate</code> function goes into our fetcher function</li>
        <li>Use <code>mutate</code> method to trigger the request</li>
      </ul>

      <Code block jsx>{`
      function App() {
        const {isLoading, isError, isSuccess, error, mutate} = useMutation({
          mutationFn: (newTodo) => axios.post('/todos', newTodo)
        })

        return (
          <>
            {isLoading && <div>Loading...</div>}
            {isError && <div>An error occurred: {error.message}</div>}
            {isSuccess ? <div>Todo added!</div> : null}

            <button onClick={() => mutate({ id: new Date(), title: 'Do Laundry' }) } >
              Create Todo
            </button>
          </>
        )
      }
      `}</Code>

      <H>Query invalidation (refetching after mutation)</H>

      <ul>
        <li>After data modification with <code>useMutate</code> hook we may need to manually update the cached data</li>
        <li>But we may also tell react-query to do that automatically</li>
        <li>We need to get queryClient instance which has access to our cache</li>
        <li>And provide desired query key we want to invalidate</li>
        <li>Refetching of new data will happen automatically</li>
      </ul>

      <Hs>Invalidate all queries</Hs>

      <Code block jsx>{`
      import { useQuery, useQueryClient } from '@tanstack/react-query'

      const queryClient = useQueryClient()

      queryClient.invalidateQueries({ queryKey: ['todos'] })

      // Both queries below will be invalidated
      const todoListQuery = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList, })
      const todoListQuery = useQuery({ queryKey: ['todos', { page: 1 }], queryFn: fetchTodoList, })
      `}</Code>

      <Hs>Invalidate specific query</Hs>

      <Code block jsx>{`
      queryClient.invalidateQueries({ queryKey: ['todos', { type: 'done' }], })

      // The query below will be invalidated
      const todoListQuery = useQuery({ queryKey: ['todos', { type: 'done' }], queryFn: fetchTodoList, })

      // However, the following query below will NOT be invalidated
      const todoListQuery = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList, })
      `}</Code>

      <H>Handling mutation response</H>

      <ul>
        <li>Invalidation is cool, but it requires additional http call</li>
        <li>Quite often we want manually update data & ui after successful mutation, because we already have all needed information</li>
        <li>Just use <code>onSuccess</code> callback for that</li>
        <li>And update the specific query cache with <code>queryClient.setQueryData()</code></li>
        <li>Do not mutate the cache, same way we do with state values</li>
      </ul>

      <Code block jsx>{`
      const queryClient = useQueryClient()

      const { mutate } = useMutation({
        mutationFn: editTodo,
        onSuccess: (data) => {
          queryClient.setQueryData(['todo', { id: 5 }], data)
        }
      })

      mutate({ id: 5, name: 'Do the laundry', })

      // The query below will be updated with the response from the
      // successful mutation
      const { status, data, error } = useQuery({
        queryKey: ['todo', { id: 5 }],
        queryFn: fetchTodoById,
      })
      `}</Code>

      <p><code>setQueryData</code> also accepts a callback to update the data with access to current cache</p>

      <Code block jsx>{`
      queryClient.setQueryData(
        ['posts', { id }],
        (oldData) => oldData ? {
          ...oldData,
          title: 'my new post title'
        } : oldData
      )
      `}</Code>

      <H>Optimistic Updates</H>

      <ul>
        <li>Optimistic update is the data update before performing a mutation with assumption nothing goes wrong</li>
        <li>It is done by <code>onMutate</code>, <code>onError</code> & <code>onSettled</code> callbacks</li>
        <li><code>onMutate</code> is called before <code>mutate()</code> function is fired</li>
        <li><code>onMutate</code> accepts the same parameters as <code>mutate()</code> function</li>
        <li>at the beginning we cancel any outgoing refetches with <code>queryClient.cancelQueries()</code>, they should not overwrite our optimistic update</li>
        <li>then we get hold of the previous cached data with <code>queryClient.getQueryData()</code> in case of an error and we need to roll back</li>
        <li>then we just update the cache the same way as we did above with <code>queryClient.setQueryData()</code></li>
        <li>at the end we return the previous query data in case of an error and a need to rollback (not very clear)</li>
        <li><code>onError</code> callback we return just rollback data by accessing previous cached data inside <code>context</code> argument</li>
        <li><code>onSettled</code> fires on success or error and we just re-fetch the data with <code>queryClient.invalidateQueries()</code></li>
      </ul>

      <Code block jsx>{`
      const queryClient = useQueryClient()

      useMutation({
        mutationFn: updateTodo,
        // When mutate is called:
        onMutate: async (newTodo) => {
          // Cancel any outgoing refetches
          // (so they don't overwrite our optimistic update)
          await queryClient.cancelQueries({ queryKey: ['todos'] })

          // Snapshot the previous value
          const previousTodos = queryClient.getQueryData(['todos'])

          // Optimistically update to the new value
          queryClient.setQueryData(['todos'], (old) => [...old, newTodo])

          // Return a context object with the snapshotted value
          return { previousTodos }
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (err, newTodo, context) => {
          queryClient.setQueryData(['todos'], context.previousTodos)
        },
        // Always refetch after error or success:
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
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
