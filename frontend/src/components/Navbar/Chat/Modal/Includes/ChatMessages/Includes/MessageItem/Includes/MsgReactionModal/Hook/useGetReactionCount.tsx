import { useAppSelector } from '@/reduxStore/store'

import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { IReactionCount } from '@/src/types/LikeTypes'

const useGetReactionCount = (messageId: string, isModalOpen: boolean) => {
   const chatId = useAppSelector((state) => state.chat.chatId)

   const getReactionFunction = async () => {
      return (await axios.get('/chat/get-message-like-count', {
         params: { messageId, chatId },
      })) as AxiosResponse<IReactionCount>
   }

   const { data } = useQuery({
      queryKey: ['getChatMsgReactionCount', messageId],
      queryFn: getReactionFunction,
      enabled: isModalOpen,
   })

   return data?.data
}

export default useGetReactionCount
