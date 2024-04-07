import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type MessageLabels = {
   _id: string
   fullName: string
   captionText: string
   selectedProfilePicturePath: string
}
interface IndexedMessageLabel {
   [key: string]: MessageLabels
}

type ChatType = {
   isChatModalOpen: boolean
   tabValue: string
   messageLabels: IndexedMessageLabel | null
}

const initialState: ChatType = {
   isChatModalOpen: false,
   tabValue: '',
   messageLabels: null,
}
// https://www.linkedin.com/pulse/typescript-index-signatures-4-examples-type-safe-dynamic-efimenko-u0ivf/
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
      setMessageLabels: (state, action: PayloadAction<MessageLabels>) => {
         const singleMessage: {
            [key: string]: MessageLabels
         } = {}
         singleMessage[action.payload._id] = action.payload

         if (state.messageLabels) {
            state.messageLabels = Object.assign(state.messageLabels, singleMessage)
         } else {
            state.messageLabels = singleMessage
         }
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

export const { setChatModalOpen, setTabValue, openModalAndCreate, setMessageLabels } = ChatSlice.actions
export default ChatSlice.reducer
