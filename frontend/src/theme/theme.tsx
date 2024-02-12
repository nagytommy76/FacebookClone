import { Work_Sans } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

export const work_sans = Work_Sans({
   subsets: ['latin'],
   // display: 'swap',
   fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

const transitions = { create: () => 'all .1s linear' }
// Create a theme instance.
export const lightTheme = createTheme({
   transitions,
   palette: {
      mode: 'light',
      primary: {
         // main: '#2596be',
         // main: '#1b74e4',
         main: '#154c79',
      },
      secondary: {
         main: '#f0f0f0',
      },
      error: {
         main: red.A400,
      },
   },
   typography: {
      fontFamily: work_sans.style.fontFamily,
      h2: {
         color: 'green',
      },
   },
})

export const darkTheme = createTheme({
   components: {
      MuiPaper: {
         styleOverrides: {
            root: {
               background: '#242526',
            },
         },
      },
   },
   transitions,
   palette: {
      mode: 'dark',
      primary: {
         main: '#FFF',
      },
      secondary: {
         main: '#444444',
      },
   },
   typography: {
      fontFamily: work_sans.style.fontFamily,
      h2: {
         color: 'palegreen',
      },
   },
})
