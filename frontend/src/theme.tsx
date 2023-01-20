import { Work_Sans } from '@next/font/google'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

export const work_sans = Work_Sans({
   weight: ['300', '400', '500', '700'],
   subsets: ['latin'],
   display: 'swap',
   fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

// Create a theme instance.
const theme = createTheme({
   palette: {
      mode: 'light',
      primary: {
         main: '#556cd6',
      },
      secondary: {
         main: '#19857b',
      },
      error: {
         main: red.A400,
      },
   },
   typography: {
      fontFamily: work_sans.style.fontFamily,
   },
})

export default theme
