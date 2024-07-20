import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/reduxStore/store'
import { deleteChat, setChatId } from '@/reduxStore/slices/ChatSlice'

import { socket } from '@/src/utils/socketIo'

const useDeleteChatSocket = () => {
   const dispatch = useAppDispatch()
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)

   useEffect(() => {
      const deleteChatFunction = (args: { chatId: string }) => {
         dispatch(deleteChat({ chatId: args.chatId }))
         if (messageLabels) dispatch(setChatId(Object.keys(messageLabels)[0]))
      }
      socket.on('chat:deleteChatResponse', deleteChatFunction)
      return () => {
         socket.off('chat:deleteChatResponse', deleteChatFunction)
      }
   }, [dispatch, messageLabels])
   return null
}

export default useDeleteChatSocket
