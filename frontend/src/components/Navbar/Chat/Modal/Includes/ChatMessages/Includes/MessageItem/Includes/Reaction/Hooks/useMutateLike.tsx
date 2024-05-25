import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { addNewReactionsToMessage } from '@/reduxStore/slices/ChatSlice'

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
               foundMessageIndex: data.data.foundMessageIndex,
               reactions: data.data.modifiedReaction,
            })
         )
         console.log(data.data)
      },
   })

   return mutate
}

export default useMutateLike
