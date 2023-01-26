import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import type { AppProps } from 'next/app'
import { Work_Sans } from '@next/font/google'
import { ThemeProvider } from '@emotion/react'
import '../styles/globals.css'
import theme from '../src/theme'
import Layout from '../components/Layout/Layout'

const work = Work_Sans({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
   const [queryClient] = useState(() => new QueryClient())

   return (
      <QueryClientProvider client={queryClient}>
         <ReactQueryDevtools initialIsOpen={true} />
         <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={theme}>
               <Layout className={work.className}>
                  <Component {...pageProps} />
               </Layout>
            </ThemeProvider>
         </Hydrate>
      </QueryClientProvider>
   )
}
