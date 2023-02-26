import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Istate {
   accessToken: string
}

const initialState: Istate = { accessToken: '' }

export const TokenSlice = createSlice({
   name: 'token',
   initialState,
   reducers: {
      setAccessToken: (state, action: PayloadAction<string>) => {
         state.accessToken = action.payload
      },
   },
})

export const { setAccessToken } = TokenSlice.actions
export default TokenSlice.reducer
