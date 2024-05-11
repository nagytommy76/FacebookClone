import { useEffect } from 'react'
import { socket } from '@/src/utils/socketIo'

import { useAppDispatch } from '@/reduxStore/store'
import { setNewMessages } from '@/reduxStore/slices/ChatSlice'
import type { IMessages } from '@/Chat/Types'

interface IArgs {
   updatedMessages: IMessages[]
   chatId: string
}

const useDeleteSocket = () => {
   const dispatch = useAppDispatch()

   useEffect(() => {
      const deleteChatMsg = (args: IArgs) => {
         dispatch(setNewMessages({ chatId: args.chatId, updatedMessages: args.updatedMessages }))
      }
      socket.on('chat:deleteMsgResponse', deleteChatMsg)

      return () => {
         socket.off('chat:deleteMsgResponse', deleteChatMsg)
      }
   }, [dispatch])

   return null
}

export default useDeleteSocket
