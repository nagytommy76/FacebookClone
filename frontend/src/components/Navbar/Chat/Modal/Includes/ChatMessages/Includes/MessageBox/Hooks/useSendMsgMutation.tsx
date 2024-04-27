import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { setChatMessage } from '@/reduxStore/slices/ChatSlice'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { IMessages } from '@/Chat/Types'

import useMessage from './useMessage'
import useSendMsgSocket from './Sockets/useSendMsgSocket'

const useSendMsgMutation = () => {
   const dispatch = useAppDispatch()
   const { selectedChatWithUserId, chatId, messageLabels } = useAppSelector((state) => state.chat)
   const {
      chatMsg,
      chatRef,
      messageBoxRef,
      chatImagePath,
      setChatImagePath,
      handleChatMsg,
      handleChangeTextWithEmoji,
      restoreTextField,
   } = useMessage()
   useSendMsgSocket()

   useEffect(() => {
      const element = messageBoxRef.current
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' })
         element.scrollTop = element.scrollHeight
      }
   }, [messageBoxRef, messageLabels])

   const chatMutateFn = async () => {
      return (await axios.post('/chat/add-chat-msg', {
         chatMsg,
         selectedChatWithUserId,
         chatId,
      })) as AxiosResponse<{ addedMessages: IMessages; foundChatId: string }>
   }

   const { mutate } = useMutation({
      mutationKey: ['addChatMessage'],
      mutationFn: chatMutateFn,
      onSuccess(data, variables, context) {
         console.log(data.data)
         dispatch(
            setChatMessage({ addedMessage: data.data.addedMessages, foundChatId: data.data.foundChatId })
         )
         restoreTextField()
      },
   })

   return {
      chatMsg,
      chatRef,
      messageBoxRef,
      chatImagePath,
      setChatImagePath,
      handleChatMsg,
      handleChangeTextWithEmoji,
      handleAddChatMutate: () => mutate(),
   }
}

export default useSendMsgMutation
