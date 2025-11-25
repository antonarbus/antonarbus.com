import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import '/styles/globals.css'
import '/styles/prism.css'

const queryClient = new QueryClient({
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

export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
        <meta name="apple-mobile-web-app-title" content="antonarbus.com" />
        <link rel="apple-touch-icon" href="/favicon.png?v999" />
        <meta name="msapplication-TileImage" content="/favicon.png?v999" />
        <meta name="msapplication-TileColor" content="#fff" />
        <meta key="og-type" property="og:type" content="website" />
        <meta key="og-image" property="og:image" content="https://antonarbus.com/favicon.png?v999" />
        <link rel="icon" type="image/x-icon" href="/favicon.png?v999"></link>
        <meta key="author" name="author" content="Anton Arbus" />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
