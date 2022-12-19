import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

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

      <H>Example</H>

      <ul>
        <li>Did fetch with caching vai <Lnk path='https://tanstack.com/query/v4/docs/reference/useQuery'>useQuery</Lnk> at work and want just to store the way it worked for me.</li>
        <li>At this implementation we populate dropdown autocomplete list</li>
        <li>Before fetch is completed the list is filled with <code>initialData</code></li>
        <li>Ones it is fetched the data is cached forever and swapped (refetchOnMount) with <code>initialData</code></li>
      </ul>

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

      <Code block jsx>{`
      export const CurrencyInput = ({ disabled }) => {
        const { t } = useTranslation()

        const { data, dataUpdatedAt, isLoading, isRefetching, isError } = useQuery({
          queryKey: ['currency'],
          queryFn: () => resource.get(appSettings.currenciesUrl, false).then(res => res.data),
          initialData: defaultCurrencies.map(code => code.code).filter(code => code !== '').sort(),
          select: (data) => [...new Set(Object.values(data))].map(code => code).filter(code => code !== '').sort(),
          refetchOnMount: true,
          staleTime: 0
        })

        dataUpdatedAt && console.log({ dataUpdatedAt })
        isLoading && console.log({ isLoading })
        isRefetching && console.log({ isRefetching })
        isError && console.log({ isError })

        return (
          <DropdownField
            items={data}
            name='sum.currency'
            label={t('label.details.currency')}
            validate={Validator.requiredField}
            fullWidth
            disabled={disabled}
          />
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
