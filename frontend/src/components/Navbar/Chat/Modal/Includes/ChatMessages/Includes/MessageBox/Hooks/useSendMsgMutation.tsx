import useMessage from './useMessage'
import { useAppSelector } from '@/src/utils/redux/store'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

const useSendMsgMutation = () => {
   const chatUserId = useAppSelector((state) => state.chat.selectedChatWithUserId)
   const { chatMsg, chatRef, chatImagePath, setChatImagePath, handleChatMsg, handleChangeTextWithEmoji } =
      useMessage()

   const chatMutateFn = async () => {
      return await axios.post('/chat/add-chat-msg', { chatMsg, chatUserId })
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
