import { useAppSelector } from '@/reduxStore/store'

import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { ILike, LikeTypes } from '@/src/types/LikeTypes'

const useGetReactionCount = (messageId: string, isModalOpen: boolean) => {
   const chatId = useAppSelector((state) => state.chat.chatId)

   const getReactionFunction = async () => {
      return (await axios.get('/chat/get-message-like-count', {
         params: { messageId, chatId },
      })) as AxiosResponse
   }

   const { data } = useQuery({
      queryKey: ['getChatMsgReactionCount', isModalOpen],
      queryFn: getReactionFunction,
      onSuccess(data) {
         console.log(data)
      },
   })

   return null
}

export default useGetReactionCount
