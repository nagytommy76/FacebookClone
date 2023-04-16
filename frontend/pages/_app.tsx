import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '../src/utils/redux/store'
import { Provider } from 'react-redux'

import type { AppProps } from 'next/app'
import { Work_Sans } from '@next/font/google'
import '../styles/globals.css'
import Layout from '../src/components/Layout/Layout'
import AxiosSetupProvider from '../src/utils/axiosSetup/AxiosInstance'

const work = Work_Sans({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
   const [queryClient] = useState(
      () =>
         new QueryClient({
            defaultOptions: {
               queries: {
                  // https://medium.com/in-the-weeds/fetch-a-query-only-once-until-page-refresh-using-react-query-a333d00b86ff
                  // Ki lehet kapcsolni ha ráklikkelsz újra az appra, lefusson újra a query
                  refetchOnWindowFocus: false,
                  refetchOnMount: false,
                  refetchOnReconnect: false,
                  retry: false,
               },
            },
         })
   )

   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <AxiosSetupProvider>
               <QueryClientProvider client={queryClient}>
                  <ReactQueryDevtools initialIsOpen={true} />
                  <Hydrate state={pageProps.dehydratedState}>
                     <Layout className={work.className}>
                        <Component {...pageProps} />
                     </Layout>
                  </Hydrate>
               </QueryClientProvider>
            </AxiosSetupProvider>
         </PersistGate>
      </Provider>
   )
}
