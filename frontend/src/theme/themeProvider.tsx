import { css, Global } from '@emotion/react'
import { CSSInterpolation } from '@mui/material'
import { useAppSelector } from '../utils/redux/store'

const lightGlobalTheme = {
   main: '#EEE',
   text: '#000',
   toggleBorder: '#FFF',
   backgroundImage: 'linear-gradient(to left, #39598A, #79D7ED)',
   scrollbarThumbColor: '#717171',
   scrollbarThumbColorHover: '#BBB9B9',
}

const darkGlobalTheme = {
   main: '#333',
   text: '#FFF',
   toggleBorder: '#BBB',
   backgroundImage: 'linear-gradient(to right, #091236, #1E215D)',
   scrollbarThumbColor: '#BBB9B9',
   scrollbarThumbColorHover: '#717171',
}

const globalStyleBase = (
   mainColor: string,
   scrollbarThumbColor: string,
   scrollbarThumbColorHover: string
) => {
   return {
      body: {
         backgroundColor: mainColor,
         width: '100%',
         fontFamily: 'Work Sans, sans-serif',
         WebkitFontSmoothing: 'antialiased',
         MozOsxFontSmoothing: 'grayscale',
         margin: 0,
         scrollbarGutter: 'stable',
      },
      html: {
         scrollBehavior: 'smooth',
      },
      '&::-webkit-scrollbar': {
         width: '9px',
         transition: 'all .2s ease',
      },
      '&::-webkit-scrollbar-track': {
         background: mainColor,
      },
      '&::-webkit-scrollbar-thumb': {
         bordeRadius: '5px',
         background: scrollbarThumbColor,
      },
      '&::-webkit-scrollbar-thumb:hover': {
         background: scrollbarThumbColorHover,
      },
   }
}
// egyelőre any, megoldani!
const darkGlobalStyles = css(
   globalStyleBase(
      darkGlobalTheme.main,
      darkGlobalTheme.scrollbarThumbColor,
      darkGlobalTheme.scrollbarThumbColorHover
   ) as any
)

const lgihtGlobalStyles = css(
   globalStyleBase(
      lightGlobalTheme.main,
      lightGlobalTheme.scrollbarThumbColor,
      lightGlobalTheme.scrollbarThumbColorHover
   ) as any
)

export const GlobalThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme)

   return (
      <>
         <Global styles={isDarkTheme ? darkGlobalStyles : lgihtGlobalStyles} />
         {children}
      </>
   )
}
