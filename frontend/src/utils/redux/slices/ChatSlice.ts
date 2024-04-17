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
   chatId: string | null
   isChatModalOpen: boolean
   chatWithUserId: string
   messageLabels: IndexedMessageLabel | null
}

const initialState: ChatType = {
   chatId: null,
   isChatModalOpen: false,
   chatWithUserId: '',
   messageLabels: null,
}
// https://www.linkedin.com/pulse/typescript-index-signatures-4-examples-type-safe-dynamic-efimenko-u0ivf/
export const ChatSlice = createSlice({
   name: 'chat',
   initialState,
   reducers: {
      setChatId: (state, action: PayloadAction<string>) => {
         state.chatId = action.payload
      },
      setChatModalOpen: (state, action: PayloadAction<boolean>) => {
         state.isChatModalOpen = action.payload
      },
      setChatWithUserId: (state, action: PayloadAction<string>) => {
         state.chatWithUserId = action.payload
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
   },
})

export const { setChatModalOpen, setChatWithUserId, setMessageLabels, setChatId } = ChatSlice.actions
export default ChatSlice.reducer
