import { useEffect, Dispatch, SetStateAction } from 'react'
import { socket } from '@/src/utils/socketIo'

import { useAppDispatch } from '@/reduxStore/store'
import { setChatMessage, incrementTotalUnreadMsgCount } from '@/reduxStore/slices/ChatSlice'
import type { IMessages } from '@/Chat/Types'

interface IChatArgs {
   addedMessage: IMessages
   foundChatId: string
   socketId?: string
}

const useSendMsgSocket = (setTypingStatus: Dispatch<SetStateAction<boolean>>) => {
   const dispatch = useAppDispatch()
   useEffect(() => {
      const sendChatMsg = (args: IChatArgs) => {
         setTypingStatus(false)
         dispatch(setChatMessage({ addedMessage: args.addedMessage, foundChatId: args.foundChatId }))
         dispatch(incrementTotalUnreadMsgCount({ count: 1, currentChatId: args.foundChatId }))
      }

      socket.on('chat:sendMsgResponse', sendChatMsg)

      return () => {
         socket.off('chat:sendMsgResponse', sendChatMsg)
      }
   }, [dispatch, setTypingStatus])

   return null
}

export default useSendMsgSocket
