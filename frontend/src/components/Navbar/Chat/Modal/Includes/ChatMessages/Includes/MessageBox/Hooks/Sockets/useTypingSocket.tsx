import { Dispatch, SetStateAction, useEffect } from 'react'
import { socket } from '@/src/utils/socketIo'
import { useAppSelector } from '@/reduxStore/store'

const useTypingSocket = (setTypingStatus: Dispatch<SetStateAction<boolean>>) => {
   const chatId = useAppSelector((state) => state.chat.chatId)

   // Itt küldöm az üzit a backen felé -> mint füldő user
   const handleTyping = (chatMsgLength: number) => {
      // Csak akkor küldöm ha a szöveg = 1, vagy kevesebb
      if (chatMsgLength <= 1) {
         socket.emit('chat:typing', { isTyping: chatMsgLength > 0, chatMsgLength, chatId })
      }
   }

   useEffect(() => {
      const handleSetTypingStatus = (chatMsgLength: number) => {
         setTypingStatus(chatMsgLength > 0)
      }
      // Itt pedig fogadom a backendről -> mint fogadó user
      socket.on(
         'chat:typingResponse',
         (args: { isTyping: boolean; chatMsgLength: number; chatId: string }) => {
            if (args.chatId == chatId) handleSetTypingStatus(args.chatMsgLength)
         }
      )
      return () => {
         socket.off('chat:typing', handleSetTypingStatus)
      }
   }, [setTypingStatus, chatId])

   return handleTyping
}

export default useTypingSocket
