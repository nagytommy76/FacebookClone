import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/axios/AxiosInstance'
import { deleteChat, setChatId } from '@/reduxStore/slices/ChatSlice'
import { socket } from '@/src/utils/socketIo'
import type { Dispatch, SetStateAction } from 'react'

const useDeleteChat = (setIsDialogOpen: Dispatch<SetStateAction<boolean>>) => {
   const dispatch = useAppDispatch()
   const { chatId, messageLabels } = useAppSelector((state) => state.chat)
   const deleteChatAxios = async () => {
      const response = await axios.delete(`/chat/delete-chat`, { data: { chatId } })
      return response
   }

   const { mutate } = useMutation({
      mutationKey: ['deleteChat'],
      mutationFn: deleteChatAxios,
      onSuccess: async () => {
         setIsDialogOpen(false)
         if (messageLabels) {
            dispatch(setChatId(Object.keys(messageLabels)[0]))
         }
         if (chatId) dispatch(deleteChat({ chatId }))
         socket.emit('chat:deleteChat', { chatId })
      },
   })

   return mutate
}

export default useDeleteChat
