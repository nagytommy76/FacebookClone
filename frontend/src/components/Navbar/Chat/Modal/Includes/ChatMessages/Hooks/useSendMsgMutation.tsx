import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

const useSendMsgMutation = () => {
   const chatMutateFn = async () => {
      return await axios.post('')
   }

   const {} = useMutation({
      mutationKey: ['addChatMessage'],
      mutationFn: chatMutateFn,
   })

   return null
}

export default useSendMsgMutation
