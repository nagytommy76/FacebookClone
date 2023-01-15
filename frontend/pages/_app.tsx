import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Work_Sans } from '@next/font/google'

import { ThemeProvider } from '@emotion/react'
import theme from '../src/theme'
import Layout from '../components/Layout/Layout'

const work = Work_Sans({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
   return (
      <ThemeProvider theme={theme}>
         <Layout className={work.className}>
            <Component {...pageProps} />
         </Layout>
      </ThemeProvider>
   )
}
