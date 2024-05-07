import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { IChat, IMessages } from '@/Chat/Types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface IndexedMessageLabel {
   [key: string]: IChat
}

type ChatType = {
   chatId: string | null
   selectedChatWithUserId: string | null
   isChatModalOpen: boolean
   messageLabels: IndexedMessageLabel | null
   isOnlineFriends: { [friendId: string]: boolean } | null
}

const initialState: ChatType = {
   chatId: null,
   isChatModalOpen: false,
   selectedChatWithUserId: null,
   messageLabels: null,
   isOnlineFriends: null,
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
      setSelectedChatWithUserId: (state, action: PayloadAction<string>) => {
         state.selectedChatWithUserId = action.payload
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
         action.payload.map((chat) => {
            messageLabels[chat._id] = chat
         })
         state.messageLabels = messageLabels
      },
      setChatMessage: (state, action: PayloadAction<{ addedMessage: IMessages; foundChatId: string }>) => {
         const { addedMessage, foundChatId } = action.payload
         if (state.messageLabels) {
            state.messageLabels[foundChatId].messages.push(addedMessage)
         } else {
            console.log('NULL a messageLabels vagy chatId')
         }
      },
      setOnlineFriends: (state, action: PayloadAction<{ friendId: string }>) => {
         const friendId = action.payload.friendId
         const onlineFriends: {
            [key: string]: boolean
         } = {}

         onlineFriends[friendId] = false
         if (state.isOnlineFriends) {
            state.isOnlineFriends = Object.assign(state.isOnlineFriends, onlineFriends)
         } else {
            state.isOnlineFriends = onlineFriends
         }
      },
      setOnlineStatus: (state, action: PayloadAction<{ friendId: string; status: boolean }>) => {
         if (state.isOnlineFriends) {
            state.isOnlineFriends[action.payload.friendId] = action.payload.status
         }
      },
      setTotalUnreadMsgCount: (state, action: PayloadAction<{ currentChatId: string; count: number }>) => {
         if (state.messageLabels) {
            state.messageLabels[action.payload.currentChatId].totalUnreadMsgCount = action.payload.count
         }
      },
   },
})

export const {
   setChatModalOpen,
   setSelectedChatWithUserId,
   setMessageLabels,
   setSingleMessageLabel,
   setChatId,
   setChatMessage,
   setOnlineFriends,
   setOnlineStatus,
   setTotalUnreadMsgCount,
} = ChatSlice.actions
export default ChatSlice.reducer

const messageLabels = (state: RootState) => state.chat.messageLabels
const chatId = (state: RootState) => state.chat.chatId

export const selectLastMessageById = createSelector([messageLabels, chatId], (messageLabels, chatId) => {
   const lastMessage: {
      [key: string]: string | null
   } = {}
   if (messageLabels && chatId) {
      Object.entries(messageLabels).map(([key, chat]) => {
         const selectedChat = chat.messages[chat.messages.length - 1]
         lastMessage[key] = selectedChat ? selectedChat.message : null
      })
   }
   return lastMessage
})

export const selectMessagesByChatId = createSelector([messageLabels, chatId], (messageLabels, chatId) => {
   let messages: IMessages[] | null = null
   if (messageLabels && chatId) {
      messages = messageLabels[chatId].messages
   }
   return messages
})

export const selectAllUnreadMessageCount = createSelector([messageLabels], (messageLabels) => {
   let AllCountedMsg: number = 0
   if (messageLabels) {
      Object.values(messageLabels).map((value) => {
         AllCountedMsg += value.totalUnreadMsgCount
      })
   }
   return AllCountedMsg
})
