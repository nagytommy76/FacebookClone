import { useEffect } from 'react'
import { socket } from '@/src/utils/socketIo'

import { useAppDispatch, useAppSelector } from '@/reduxStore/store'
import { setChatMessage } from '@/reduxStore/slices/ChatSlice'
import type { IMessages } from '@/Chat/Types'

interface IChatArgs {
   addedMessages: IMessages
   foundChatId: string
   socketId?: string
}

const useSendMsgSocket = () => {
   const dispatch = useAppDispatch()
   const loggedInUserId = useAppSelector((state) => state.auth.userId)
   useEffect(() => {
      const sendChatMsg = (args: IChatArgs) => {
         // loggedInUserId == args.addedMessages.receiverUserId -> azért kell, hogy ha egyezik csak akkor dispatch->setChatMessage
         // Különben 2szer írja be a msg-t, broadcast-tel backenden megoldani!!!
         if (loggedInUserId == args.addedMessages.receiverUserId) {
            dispatch(setChatMessage({ addedMessage: args.addedMessages, foundChatId: args.foundChatId }))
         }
      }

      socket.on('chat:sendMsg', sendChatMsg)
      return () => {
         socket.off('chat:sendMsg', sendChatMsg)
      }
   }, [dispatch, loggedInUserId])

   return null
}

export default useSendMsgSocket
