import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { setChatMessage } from '@/reduxStore/slices/ChatSlice'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { IMessages } from '@/Chat/Types'

const useSendMsgMutation = (chatMsg: string, restoreTextField: () => void) => {
   const dispatch = useAppDispatch()
   const { selectedChatWithUserId, chatId } = useAppSelector((state) => state.chat)

   const chatMutateFn = async (chatImagePath?: string) => {
      return (await axios.post('/chat/add-chat-msg', {
         chatMsg,
         selectedChatWithUserId,
         chatId,
         chatImagePath,
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
      handleAddChatMutate: (chatImagePath?: string) => mutate(chatImagePath),
   }
}

export default useSendMsgMutation
