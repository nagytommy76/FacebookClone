import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IProfilePicture } from '@/types/PostTypes'
import AltProfileImg from '@/assets/facebook-profile.jpg'

interface IAuthState {
   userId: string | null
   userName: string
   isLoggedIn: boolean
   currentImage: IProfilePicture
}

const initialState: IAuthState = {
   userId: null,
   userName: '',
   isLoggedIn: false,
   currentImage: { _id: '', isSelected: false, path: AltProfileImg.src },
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
      setCurrentImage: (state, action: PayloadAction<IProfilePicture>) => {
         state.currentImage = action.payload
      },
      setLogoutUser: (state) => {
         state.userId = ''
         state.userName = ''
         state.isLoggedIn = false
         state.currentImage = { _id: '', isSelected: false, path: AltProfileImg.src }
      },
   },
})

export const { setUserId, setUserName, setIsLoggedIn, setLogoutUser, setCurrentImage } = AuthSlice.actions
export default AuthSlice.reducer
