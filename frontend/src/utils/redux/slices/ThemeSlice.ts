import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ITheme {
   isDarkTheme: boolean
}

const initialState: ITheme = {
   isDarkTheme: true,
}

export const ThemeSlice = createSlice({
   name: 'theme',
   initialState,
   reducers: {
      setTheme: (state, action: PayloadAction<boolean>) => {
         state.isDarkTheme = action.payload
      },
   },
})

export const { setTheme } = ThemeSlice.actions
export default ThemeSlice.reducer
