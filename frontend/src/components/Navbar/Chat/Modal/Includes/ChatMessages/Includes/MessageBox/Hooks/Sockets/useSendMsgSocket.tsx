import { useEffect } from 'react'
import { socket } from '@/src/utils/socketIo'

import { useAppDispatch } from '@/reduxStore/store'
import { setChatMessage } from '@/reduxStore/slices/ChatSlice'
import type { IMessages } from '@/Chat/Types'

interface IChatArgs {
   addedMessages: IMessages
}

const useSendMsgSocket = () => {
   const dispatch = useAppDispatch()
   useEffect(() => {
      const sendChatMsg = (args: IChatArgs) => {
         console.log(args)
         dispatch(setChatMessage(args.addedMessages))
      }

      socket.on('chat:sendMsg', sendChatMsg)
      return () => {
         socket.off('chat:sendMsg', sendChatMsg)
      }
   }, [dispatch])

   return null
}

export default useSendMsgSocket
