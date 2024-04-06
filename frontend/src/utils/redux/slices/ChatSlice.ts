import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type MessageLabels = {
   _id: string
   fullName: string
   captionText: string
   selectedProfilePicturePath: string
}

// type IndexedMessageLabelArray = {
//    [key: string]: MessageLabels
// }

type ChatType = {
   isChatModalOpen: boolean
   tabValue: string
   messageLabels: MessageLabels[] | null
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
      setMessageLabels: (state, action: PayloadAction<MessageLabels[]>) => {
         // const singleMessage: IndexedMessageLabelArray = {}

         // singleMessage[action.payload._id] = action.payload

         // console.log(singleMessage)

         // state.messageLabelsMap[action.payload._id] = singleMessage

         // console.log(state.messageLabelsMap)

         state.messageLabels = action.payload
      },
      addSingleMessageLabel: (state, action: PayloadAction<MessageLabels>) => {
         // const singleMessage: {
         //    [key: string]: MessageLabels
         // } = {}

         // singleMessage[action.payload._id] = { ...action.payload }

         // console.log(singleMessage)

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

export const { setChatModalOpen, setTabValue, openModalAndCreate, setMessageLabels, addSingleMessageLabel } =
   ChatSlice.actions
export default ChatSlice.reducer
