import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IAuthState {
   userId: string
   userName: string
   isLoggedIn: boolean
}

const initialState: IAuthState = {
   userId: '',
   userName: '',
   isLoggedIn: false,
}

export const AuthSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setUserId: (state, action: PayloadAction<string>) => {
         state.userId = action.payload
      },
      setUserName: (state, action: PayloadAction<string>) => {
         state.userName = action.payload
      },
      setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
         state.isLoggedIn = action.payload
      },
      setLogoutUser: (state) => {
         state.userId = ''
         state.userName = ''
         state.isLoggedIn = false
      },
   },
})

export const { setUserId, setUserName, setIsLoggedIn, setLogoutUser } = AuthSlice.actions
export default AuthSlice.reducer
