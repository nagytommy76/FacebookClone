import React from 'react'
import useMessage from './useMessage'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

const useSendMsgMutation = () => {
   const { chatMsg, chatRef, chatImagePath, setChatImagePath, handleChatMsg, handleChangeTextWithEmoji } =
      useMessage()

   const chatMutateFn = async () => {
      return await axios.post('/chat/add-chat-msg', { chatMsg })
   }

   const { mutate } = useMutation({
      mutationKey: ['addChatMessage'],
      mutationFn: chatMutateFn,
      onSuccess(data, variables, context) {
         console.log(data.data)
      },
   })

   return {
      chatMsg,
      chatRef,
      chatImagePath,
      setChatImagePath,
      handleChatMsg,
      handleChangeTextWithEmoji,
      handleAddChatMutate: () => mutate(),
   }
}

export default useSendMsgMutation
