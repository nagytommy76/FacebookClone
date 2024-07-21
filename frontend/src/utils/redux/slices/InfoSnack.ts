import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type InfoSnackType = {
   isInfoSnackOpen: boolean
   imageSrc: string | null
   headText: string
   message: string
}

const initialState: InfoSnackType = {
   isInfoSnackOpen: false,
   imageSrc: '',
   headText: '',
   message: '',
}

export const InfoSnackSlice = createSlice({
   name: 'infoSnack',
   initialState,
   reducers: {
      setIsInfoSnackOpen: (state, action: PayloadAction<boolean>) => {
         state.isInfoSnackOpen = action.payload
      },
      setImageSrc: (state, action: PayloadAction<string>) => {
         state.imageSrc = action.payload
      },
      setHeadText: (state, action: PayloadAction<string>) => {
         state.headText = action.payload
      },
      setMessage: (state, action: PayloadAction<string>) => {
         state.message = action.payload
      },
   },
})

export const { setIsInfoSnackOpen, setImageSrc, setHeadText, setMessage } = InfoSnackSlice.actions
export default InfoSnackSlice.reducer
