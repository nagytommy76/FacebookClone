import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { setNewMessages } from '@/reduxStore/slices/ChatSlice'

import { socket } from '@/src/utils/socketIo'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { IMessages } from '@/Chat/Types'

const useDeleteMutate = (messageId: string) => {
   const chatId = useAppSelector((state) => state.chat.chatId)
   const dispatch = useAppDispatch()

   const deleteMutationFn = async () => {
      return (await axios.patch('/chat/delete-message', { messageId, chatId })) as AxiosResponse<{
         updatedMessages: IMessages[]
      }>
   }

   const { mutate } = useMutation({
      mutationKey: ['DeleteSingleMessage'],
      mutationFn: deleteMutationFn,
      onSuccess(data, variables, context) {
         if (chatId) {
            dispatch(setNewMessages({ updatedMessages: data.data.updatedMessages, chatId }))
            socket.emit('chat:deleteMsg', { updatedMessages: data.data.updatedMessages, chatId })
         }
      },
   })

   return mutate
}

export default useDeleteMutate
