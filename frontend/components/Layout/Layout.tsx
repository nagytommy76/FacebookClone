import Head from 'next/head'

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Layout: React.FC<{ children: React.ReactNode; className: string }> = ({ children, className }) => {
   return (
      <>
         <Head>
            <title>Facebook Clone</title>
            <meta name='description' content='Hobby project, cloning facebook' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='author' content='Nagy Tamás' />
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <main className={className}>
            <Navbar />
            {children}
            <Footer />
         </main>
      </>
   )
}

export default Layout
