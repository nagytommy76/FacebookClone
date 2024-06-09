import { useEffect } from 'react'
import { socket } from '@/src/utils/socketIo'

import { useAppDispatch } from '@/reduxStore/store'
import { removeReactionFromMessage } from '@/reduxStore/slices/ChatSlice'
import type { IMessages } from '@/Chat/Types'

interface Args {
   updatedMessages: IMessages[]
   chatId: string
   messageId: string
   likeIdToDelete: string
   modifiedMessage: IMessages
}

const useDeleteLikeSocket = () => {
   const dispatch = useAppDispatch()

   useEffect(() => {
      const deleteChatMsg = (args: Args) => {
         dispatch(
            removeReactionFromMessage({
               chatId: args.chatId,
               messageId: args.messageId,
               modifiedMessage: args.modifiedMessage,
            })
         )
      }
      socket.on('chat:deleteLikeResponse', deleteChatMsg)

      return () => {
         socket.off('chat:deleteLikeResponse', deleteChatMsg)
      }
   }, [dispatch])

   return null
}

export default useDeleteLikeSocket
