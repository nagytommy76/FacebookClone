import useMessage from './useMessage'
import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { setChatMessage } from '@/reduxStore/slices/ChatSlice'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { IMessages } from '@/Chat/Types'

import useSendMsgSocket from './Sockets/useSendMsgSocket'

const useSendMsgMutation = () => {
   const dispatch = useAppDispatch()
   const { selectedChatWithUserId, chatId } = useAppSelector((state) => state.chat)
   const {
      chatMsg,
      chatRef,
      chatImagePath,
      setChatImagePath,
      handleChatMsg,
      handleChangeTextWithEmoji,
      restoreTextField,
   } = useMessage()
   useSendMsgSocket()

   const chatMutateFn = async () => {
      return (await axios.post('/chat/add-chat-msg', {
         chatMsg,
         selectedChatWithUserId,
         chatId,
      })) as AxiosResponse<{ addedMessages: IMessages }>
   }

   const { mutate } = useMutation({
      mutationKey: ['addChatMessage'],
      mutationFn: chatMutateFn,
      onSuccess(data, variables, context) {
         console.log(data.data)
         dispatch(setChatMessage(data.data.addedMessages))
         restoreTextField()
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
