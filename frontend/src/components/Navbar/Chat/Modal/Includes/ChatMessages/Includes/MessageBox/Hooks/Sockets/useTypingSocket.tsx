import { Dispatch, SetStateAction, useEffect } from 'react'
import { socket } from '@/src/utils/socketIo'
import { useAppSelector } from '@/reduxStore/store'

const useTypingSocket = (setTypingStatus: Dispatch<SetStateAction<boolean>>) => {
   const chatId = useAppSelector((state) => state.chat.chatId)

   // Itt küldöm az üzit
   const handleTyping = (chatMsgLength: number) =>
      socket.emit('chat:typing', { isTyping: chatMsgLength > 0, chatMsgLength, chatId })

   useEffect(() => {
      // Itt pedig fogadom
      socket.on(
         'chat:typingResponse',
         (args: { isTyping: boolean; chatMsgLength: number; chatId: string }) => {
            console.log(args)
            if (args.chatId == chatId) setTypingStatus(args.chatMsgLength > 0)
         }
      )
      return () => {
         socket.off('chat:typing')
      }
   }, [setTypingStatus, chatId])

   return handleTyping
}

export default useTypingSocket
