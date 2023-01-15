import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Work_Sans } from '@next/font/google'

import Layout from '../components/Layout/Layout'

const work = Work_Sans({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
   return (
      <Layout className={work.className}>
         <Component {...pageProps} />
      </Layout>
   )
}
