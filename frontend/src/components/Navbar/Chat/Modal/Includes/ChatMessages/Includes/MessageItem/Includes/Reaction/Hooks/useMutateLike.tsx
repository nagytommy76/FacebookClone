import React from 'react'
import { useAppSelector } from '@/reduxStore/store'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { LikeTypes } from '@/src/types/LikeTypes'

const useMutateLike = (messageId: string) => {
   const chatId = useAppSelector((state) => state.chat.chatId)

   const mutateLikeFn = async (likeType: LikeTypes) => {
      return await axios.post('chat/like-message', { likeType, messageId, chatId })
   }

   const { mutate } = useMutation({
      mutationKey: ['likeMessage'],
      mutationFn: mutateLikeFn,
      onSuccess(data, variables, context) {
         console.log(data.data)
      },
   })

   return mutate
}

export default useMutateLike
