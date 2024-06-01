import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ITheme {
   isDarkTheme: boolean
   isMobileView: boolean
}

const initialState: ITheme = {
   isDarkTheme: true,
   isMobileView: false,
}

export const ThemeSlice = createSlice({
   name: 'theme',
   initialState,
   reducers: {
      setTheme: (state, action: PayloadAction<boolean>) => {
         state.isDarkTheme = action.payload
      },
      setMobileView: (state, action: PayloadAction<boolean>) => {
         state.isMobileView = action.payload
      },
   },
})

export const { setTheme, setMobileView } = ThemeSlice.actions
export default ThemeSlice.reducer
