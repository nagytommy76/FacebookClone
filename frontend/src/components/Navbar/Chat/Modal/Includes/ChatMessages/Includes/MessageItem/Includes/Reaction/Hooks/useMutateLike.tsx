import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { addNewReactionsToMessage } from '@/reduxStore/slices/ChatSlice'
import { socket } from '@/src/utils/socketIo'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { ILike, LikeTypes } from '@/src/types/LikeTypes'

const useMutateLike = (messageId: string) => {
   const dispatch = useAppDispatch()
   const chatId = useAppSelector((state) => state.chat.chatId)

   const mutateLikeFn = async (likeType: LikeTypes) => {
      return (await axios.post('chat/like-message', { likeType, messageId, chatId })) as AxiosResponse<{
         modifiedReaction: ILike[]
         foundMessageIndex: number
      }>
   }

   const { mutate } = useMutation({
      mutationKey: ['likeMessage'],
      mutationFn: mutateLikeFn,
      onSuccess(data, variables, context) {
         dispatch(
            addNewReactionsToMessage({
               chatId: chatId,
               foundMessageIndex: data.data.foundMessageIndex,
               reactions: data.data.modifiedReaction,
            })
         )
         socket.emit('chat:addMessageReaction', {
            foundMessageIndex: data.data.foundMessageIndex,
            reactions: data.data.modifiedReaction,
            chatId,
         })
      },
   })

   return mutate
}

export default useMutateLike
