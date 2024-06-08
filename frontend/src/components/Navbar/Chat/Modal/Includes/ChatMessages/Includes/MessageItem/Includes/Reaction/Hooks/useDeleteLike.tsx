import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { removeReactionFromMessage } from '@/reduxStore/slices/ChatSlice'
import { socket } from '@/src/utils/socketIo'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/axios/AxiosInstance'

// Route -> /delete-message-like
const useDeleteLike = (messageId: string, likeIdToDelete: string) => {
   const dispatch = useAppDispatch()
   const chatId = useAppSelector((state) => state.chat.chatId)

   const deleteReaction = async () => {
      return await axios.delete('chat/delete-message-like', {
         data: {
            chatId,
            messageId,
            likeIdToDelete,
         },
      })
   }

   const { mutate } = useMutation({
      mutationKey: ['deleteLike'],
      mutationFn: deleteReaction,
      onSuccess: (data) => {
         if (data.status === 200) {
            console.log(data.data)
            dispatch(removeReactionFromMessage({ chatId, likeIdToDelete, messageId }))
            // socket.emit('deleteLike', {
            //    messageId: 'messageId',
            //    likeId: 'likeId',
            // })
         }
      },
   })

   return mutate
}

export default useDeleteLike
