import { useAppDispatch } from '@/reduxStore/store'
import {
   setChatModalOpen,
   setSelectedChatWithUserId,
   setSingleMessageLabel,
   setChatId,
} from '@/reduxStore/slices/ChatSlice'
import { socket } from '@/src/utils/socketIo'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { IChat } from '@/src/components/Navbar/Chat/Types'

const useChatModal = () => {
   const dispatch = useAppDispatch()

   const mutationFunction = async ({ userId }: { userId: string }) => {
      return (await axios.post('/chat/create-chat', { chatUserId: userId })) as AxiosResponse<{
         createdChatModel: IChat
      }>
   }

   const { mutate } = useMutation({
      mutationKey: ['createNewChat'],
      mutationFn: mutationFunction,
      onSuccess(data, variables, context) {
         if (data.status === 200) {
            dispatch(setChatModalOpen(true))
            dispatch(setChatId(data.data.createdChatModel._id))
            dispatch(setSelectedChatWithUserId(variables.userId))
         } else if (data.status === 201) {
            dispatch(setSingleMessageLabel(data.data.createdChatModel))
            dispatch(setChatId(data.data.createdChatModel._id))
            dispatch(setSelectedChatWithUserId(variables.userId))
            dispatch(setChatModalOpen(true))
            socket.emit('chat:createChat', {
               createdChatModel: data.data.createdChatModel,
               createdChatId: data.data.createdChatModel._id,
               toUserId: data.data.createdChatModel.chatWithParticipant._id,
            })
         }
      },
   })

   return mutate
}

export default useChatModal
