import AxiosSetupProvider from '@/axios/AxiosInstance'
import ReduxProvider from '@/reduxStore/ReduxProvider'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import '../styles/globals.css'

import TanstackProvider from '@/components/Providers/TanstackProvider'
import ThemeProvider from '@/components/Providers/ThemeProvider'

import { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'

import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'

const work = Work_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Facebook Clone',
   description: 'Hobby project, cloning facebook',
   keywords: ['hobby project', 'next.js 13+', 'facebook clone application'],
   authors: [{ name: 'Nagy Tamás', url: 'https://nagytamas93.hu/' }],
   icons: '/facebook-96.svg',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html className={work.className} lang='hu'>
         {/* <head /> */}
         <body>
            <AppRouterCacheProvider>
               <ReduxProvider>
                  <AxiosSetupProvider>
                     <TanstackProvider>
                        <ThemeProvider>
                           <main>
                              <Navbar />
                              {children}
                              <Footer />
                           </main>
                        </ThemeProvider>
                     </TanstackProvider>
                  </AxiosSetupProvider>
               </ReduxProvider>
            </AppRouterCacheProvider>
         </body>
      </html>
   )
}
