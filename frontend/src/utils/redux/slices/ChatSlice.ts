import { createSlice } from '@reduxjs/toolkit'
import type { IChat, IMessages } from '@/src/components/Navbar/Chat/Types'
import type { PayloadAction } from '@reduxjs/toolkit'

// type MessageLabels = {
//    _id: string
//    fullName: string
//    // captionText: string
//    messages: IMessages
//    selectedProfilePicturePath: string
// }
interface IndexedMessageLabel {
   [key: string]: IChat
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
      setSingleMessageLabel: (state, action: PayloadAction<IChat>) => {
         const singleMessage: {
            [key: string]: IChat
         } = {}
         singleMessage[action.payload._id] = action.payload

         if (state.messageLabels) {
            state.messageLabels = Object.assign(state.messageLabels, singleMessage)
         } else {
            state.messageLabels = singleMessage
         }
      },
      setMessageLabels: (state, action: PayloadAction<IChat[]>) => {
         const messageLabels: {
            [key: string]: IChat
         } = {}
         action.payload.map((chat) => (messageLabels[chat._id] = chat))
         console.log(messageLabels)
         state.messageLabels = messageLabels
      },
   },
})

export const { setChatModalOpen, setChatWithUserId, setMessageLabels, setSingleMessageLabel, setChatId } =
   ChatSlice.actions
export default ChatSlice.reducer
