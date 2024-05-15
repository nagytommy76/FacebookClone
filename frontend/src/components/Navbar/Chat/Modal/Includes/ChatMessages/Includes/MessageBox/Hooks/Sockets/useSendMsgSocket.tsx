import { useEffect, Dispatch, SetStateAction, useState } from 'react'
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
   const [chatAudio] = useState(new Audio('/sounds/facebook_messenger.mp3'))
   const dispatch = useAppDispatch()

   useEffect(() => {
      const sendChatMsg = (args: IChatArgs) => {
         setTypingStatus(false)
         dispatch(setChatMessage({ addedMessage: args.addedMessage, foundChatId: args.foundChatId }))
         dispatch(incrementTotalUnreadMsgCount({ count: 1, currentChatId: args.foundChatId }))
         chatAudio.play()
      }

      socket.on('chat:sendMsgResponse', sendChatMsg)

      return () => {
         socket.off('chat:sendMsgResponse', sendChatMsg)
      }
   }, [dispatch, setTypingStatus, chatAudio])

   return null
}

export default useSendMsgSocket
