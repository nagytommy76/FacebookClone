import { useState } from 'react'
import { useAppSelector } from '@/src/utils/redux/store'

import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

interface IMessages {
   _id: string
   createdAt: string
   updatedAt: string
   image: string
   isRead: boolean
   message: string
   userId: string
}

interface IChatResponse {
   _id: string
   createdAt: string
   updatedAt: string
   messages: IMessages[]
   participants: string[]
}

const useGetMessages = () => {
   const [messages, setMessages] = useState<IMessages[] | null>(null)
   const { chatWithUserId } = useAppSelector((state) => state.chat)

   const getMessagesFunction = async () => {
      return (await axios.get('/chat/get-user-chat', {
         params: { chatWithUserId },
      })) as AxiosResponse<IChatResponse | null>
   }

   const { data, isLoading } = useQuery({
      queryKey: ['getUsersChatMessgaes', { chatWithUserId }],
      queryFn: getMessagesFunction,
      onSuccess(data) {
         const receivedData = data.data
         // console.log(receivedData)
         if (receivedData) {
            console.log(receivedData.messages)
            setMessages(receivedData.messages)
         }
      },
   })

   return { messages, isLoading }
}

export default useGetMessages
