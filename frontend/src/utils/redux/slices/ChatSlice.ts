import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const TestLabelData = [
   {
      _id: '64777ef1c3038faf5e1a41c6',
      fullName: 'Teszt János',
      captionText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      selectedProfilePicturePath: '/_next/static/media/facebook-profile.6641f5ee.jpg',
   },
   {
      _id: '658569424d27aad220f6e887',
      fullName: 'Teszt Béla',
      captionText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      selectedProfilePicturePath: '/_next/static/media/facebook-profile.6641f5ee.jpg',
   },
]

type MessgaeLabels = {
   _id: string
   fullName: string
   captionText: string
   selectedProfilePicturePath: string
}

type ChatType = {
   isChatModalOpen: boolean
   tabValue: string
   messageLabels: MessgaeLabels[] | null
}

const initialState: ChatType = {
   isChatModalOpen: false,
   tabValue: '',
   messageLabels: null,
}

export const ChatSlice = createSlice({
   name: 'chat',
   initialState,
   reducers: {
      setChatModalOpen: (state, action: PayloadAction<boolean>) => {
         state.isChatModalOpen = action.payload
      },
      setTabValue: (state, action: PayloadAction<string>) => {
         state.tabValue = action.payload
      },
      setMessageLabels: (state, action: PayloadAction<MessgaeLabels[]>) => {
         state.messageLabels = action.payload
      },
      addSingleMessage: (state, action: PayloadAction<MessgaeLabels>) => {
         state.messageLabels?.push(action.payload)
      },
      openModalAndCreate: (
         state,
         action: PayloadAction<{
            _id: string
            fullName: string
            selectedProfilePicturePath: string
         }>
      ) => {
         // state.messageLabels?.push({})
         state.isChatModalOpen = true
      },
   },
})

export const { setChatModalOpen, setTabValue, openModalAndCreate, setMessageLabels, addSingleMessage } =
   ChatSlice.actions
export default ChatSlice.reducer
