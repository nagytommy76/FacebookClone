import { useEffect, Dispatch, SetStateAction } from 'react'
import { socket } from '@/src/utils/socketIo'

import { useAppDispatch, useAppSelector } from '@/reduxStore/store'
import { setChatMessage, incrementTotalUnreadMsgCount } from '@/reduxStore/slices/ChatSlice'
import type { IMessages } from '@/Chat/Types'

interface IChatArgs {
   addedMessages: IMessages
   foundChatId: string
   socketId?: string
}

const useSendMsgSocket = (setTypingStatus: Dispatch<SetStateAction<boolean>>) => {
   const dispatch = useAppDispatch()
   const loggedInUserId = useAppSelector((state) => state.auth.userId)
   useEffect(() => {
      const sendChatMsg = (args: IChatArgs) => {
         // loggedInUserId == args.addedMessages.receiverUserId -> azért kell, hogy ha egyezik csak akkor dispatch->setChatMessage
         // Különben 2szer írja be a msg-t, broadcast-tel backenden megoldani!!!
         // A fogadó félnek állítom be ->
         if (loggedInUserId == args.addedMessages.receiverUserId) {
            setTypingStatus(false)
            dispatch(setChatMessage({ addedMessage: args.addedMessages, foundChatId: args.foundChatId }))
            dispatch(incrementTotalUnreadMsgCount({ count: 1, currentChatId: args.foundChatId }))
         }
      }

      socket.on('chat:sendMsg', sendChatMsg)
      return () => {
         socket.off('chat:sendMsg', sendChatMsg)
      }
   }, [dispatch, loggedInUserId, setTypingStatus])

   return null
}

export default useSendMsgSocket
