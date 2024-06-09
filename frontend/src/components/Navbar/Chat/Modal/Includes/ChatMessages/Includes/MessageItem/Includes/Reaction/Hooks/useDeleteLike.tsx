import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { removeReactionFromMessage } from '@/reduxStore/slices/ChatSlice'
import { socket } from '@/src/utils/socketIo'

import type { IMessages } from '@/Chat/Types'
import type { Dispatch, SetStateAction } from 'react'
import type { LikeTypes } from '@/types/LikeTypes'

import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/axios/AxiosInstance'

// Route -> /delete-message-like
const useDeleteLike = (
   messageId: string,
   likeIdToDelete: string,
   setLike: Dispatch<SetStateAction<LikeTypes | undefined>>
) => {
   const dispatch = useAppDispatch()
   const chatId = useAppSelector((state) => state.chat.chatId)

   const deleteReaction = async () => {
      return (await axios.delete('chat/delete-message-like', {
         data: {
            chatId,
            messageId,
            likeIdToDelete,
         },
      })) as AxiosResponse<{ modifiedMessage: IMessages }>
   }

   const { mutate } = useMutation({
      mutationKey: ['deleteLike'],
      mutationFn: deleteReaction,
      onSuccess: (data) => {
         if (data.status === 200) {
            console.log(data.data)
            dispatch(
               removeReactionFromMessage({ chatId, messageId, modifiedMessage: data.data.modifiedMessage })
            )
            setLike(undefined)
            socket.emit('chat:deleteLike', {
               chatId,
               messageId,
               likeIdToDelete,
               modifiedMessage: data.data.modifiedMessage,
            })
         }
      },
   })

   return mutate
}

export default useDeleteLike
