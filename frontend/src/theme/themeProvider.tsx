import { css, Global } from '@emotion/react'
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

const darkGlobalStyles = css({
   body: {
      backgroundColor: darkGlobalTheme.main,
      width: '100%',
      fontFamily: 'Work Sans, sans-serif',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      margin: 0,
      scrollbarGutter: 'stable',
   },
   html: {
      scrollBehavior: 'smooth',
      overflowY: 'scroll',
   },
   '&::-webkit-scrollbar': {
      width: '9px',
      transition: 'all .2s ease',
   },
   '&::-webkit-scrollbar-track': {
      background: darkGlobalTheme.main,
   },
   '&::-webkit-scrollbar-thumb': {
      bordeRadius: '5px',
      background: darkGlobalTheme.scrollbarThumbColor,
   },
   '&::-webkit-scrollbar-thumb:hover': {
      background: darkGlobalTheme.scrollbarThumbColorHover,
   },
})
const lgihtGlobalStyles = css({
   body: {
      backgroundColor: lightGlobalTheme.main,
      width: '100%',
      fontFamily: 'Work Sans, sans-serif',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      margin: 0,
      scrollbarGutter: 'stable',
   },
   html: {
      scrollBehavior: 'smooth',
      overflowY: 'scroll',
   },
   '&::-webkit-scrollbar': {
      width: '9px',
      transition: 'all .2s ease',
   },
   '&::-webkit-scrollbar-track': {
      background: lightGlobalTheme.main,
   },
   webkitBorderRadius: {
      bordeRadius: '5px',
      background: lightGlobalTheme.scrollbarThumbColor,
   },
   // '&::-webkit-scrollbar-thumb': {
   //    bordeRadius: '5px',
   //    background: lightGlobalTheme.scrollbarThumbColor,
   // },
   '&::-webkit-scrollbar-thumb:hover': {
      background: lightGlobalTheme.scrollbarThumbColorHover,
   },
})

export const GlobalThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme)

   return (
      <>
         <Global styles={isDarkTheme ? darkGlobalStyles : lgihtGlobalStyles} />
         {children}
      </>
   )
}
