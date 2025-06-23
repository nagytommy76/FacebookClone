'use client'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const TanstackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const queryClient = new QueryClient({
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

   return (
      <QueryClientProvider client={queryClient}>
         <ReactQueryDevtools initialIsOpen={false} />
         {children}
      </QueryClientProvider>
   )
}

export default TanstackProvider
