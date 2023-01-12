import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
   return (
      <>
         <Head>
            <title>Facebook Clone</title>
            <meta name='description' content='Hobby project, cloning facebook' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <main>
            <h1>Főoldal</h1>
         </main>
      </>
   )
}
