import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { IChat, IMessages } from '@/Chat/Types'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export const InfoSnackSlice = createSlice({
   name: 'infoSnack',
   initialState: {
      isInfoSnackOpen: true,
   },
   reducers: {
      setInfoSnack: (state, action: PayloadAction<boolean>) => {
         state.isInfoSnackOpen = action.payload
      },
   },
})

export const { setInfoSnack } = InfoSnackSlice.actions
export default InfoSnackSlice.reducer
