import Head from 'next/head'
import { useAppSelector } from '../../utils/redux/store'

import { ThemeProvider } from '@emotion/react'
import { lightTheme, darkTheme } from '../../theme/theme'
import { GlobalThemeProvider } from '../../theme/themeProvider'

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Layout: React.FC<{ children: React.ReactNode; className: string }> = ({ children, className }) => {
   const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme)
   return (
      <>
         <Head>
            <title>Facebook Clone</title>
            <meta name='description' content='Hobby project, cloning facebook' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='author' content='Nagy Tamás' />
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <GlobalThemeProvider>
            <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
               <main className={className}>
                  <Navbar />
                  {children}
                  <Footer />
               </main>
            </ThemeProvider>
         </GlobalThemeProvider>
      </>
   )
}

export default Layout