'use client'
import React from 'react'
import { useAppSelector } from '@/reduxStore/store'

import { ThemeProvider as Theme } from '@emotion/react'
import { lightTheme, darkTheme } from '@/theme/theme'
import { GlobalThemeProvider } from '@/theme/themeProvider'

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme)
   return (
      <GlobalThemeProvider>
         <Theme theme={isDarkTheme ? darkTheme : lightTheme}>{children}</Theme>
      </GlobalThemeProvider>
   )
}

export default ThemeProvider
