import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { setNewMessages } from '@/reduxStore/slices/ChatSlice'
import { socket } from '@/src/utils/socketIo'

import useDeleteImage from '@/hooks/useDeleteImage'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { IMessages } from '@/Chat/Types'

const useDeleteMutate = (messageId: string, messageImage: string) => {
   const chatId = useAppSelector((state) => state.chat.chatId)
   const dispatch = useAppDispatch()
   const deleteImages = useDeleteImage()

   const deleteMutationFn = async () => {
      return (await axios.patch('/chat/delete-message', { messageId, chatId })) as AxiosResponse<{
         updatedMessages: IMessages[]
      }>
   }

   const { mutate } = useMutation({
      mutationKey: ['DeleteSingleMessage'],
      mutationFn: deleteMutationFn,
      onSuccess: async (data, variables, context) => {
         if (chatId) {
            await deleteImages([messageImage])
            dispatch(setNewMessages({ updatedMessages: data.data.updatedMessages, chatId }))
            socket.emit('chat:deleteMsg', { updatedMessages: data.data.updatedMessages, chatId })
         }
      },
   })

   return mutate
}

export default useDeleteMutate
