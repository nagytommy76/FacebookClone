import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { addNewReactionsToMessage } from '@/reduxStore/slices/ChatSlice'
import { socket } from '@/src/utils/socketIo'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { ILike, LikeTypes } from '@/src/types/LikeTypes'
/**
 * A custom hook that handles mutation for liking a message.
 *
 * @param {string} messageId - The ID of the message to be liked.
 * @param {Function} setButtonColor - A function that sets the color of the like button.
 * @return {Object} An object containing the `handleLikeMutate` function for mutating the like.
 */
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
      onSuccess(data, variables) {
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

   return { handleLikeMutate: mutate }
}

export default useMutateLike
