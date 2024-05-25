import { useEffect } from 'react'
import { socket } from '@/src/utils/socketIo'

import { useAppDispatch } from '@/reduxStore/store'
import { addNewReactionsToMessage } from '@/reduxStore/slices/ChatSlice'
import { ILike } from '@/types/LikeTypes'

interface IArgs {
   reactions: ILike[]
   foundMessageIndex: number
   chatId: string
}

const useReactionSocket = () => {
   const dispatch = useAppDispatch()

   useEffect(() => {
      const deleteChatMsg = (args: IArgs) => {
         dispatch(
            addNewReactionsToMessage({
               chatId: args.chatId,
               foundMessageIndex: args.foundMessageIndex,
               reactions: args.reactions,
            })
         )
      }
      socket.on('chat:addMessageReactionResponse', deleteChatMsg)

      return () => {
         socket.off('chat:addMessageReactionResponse', deleteChatMsg)
      }
   }, [dispatch])

   return null
}

export default useReactionSocket
