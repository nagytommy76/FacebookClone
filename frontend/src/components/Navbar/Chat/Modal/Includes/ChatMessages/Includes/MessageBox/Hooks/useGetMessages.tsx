import { useAppSelector } from '@/src/utils/redux/store'

import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

const useGetMessages = () => {
   const { chatWithUserId } = useAppSelector((state) => state.chat)

   const getMessagesFunction = async () => {
      return await axios.get('/chat/get-user-chat', { params: { chatWithUserId } })
   }

   const {} = useQuery({
      queryKey: ['getUsersChatMessgaes', chatWithUserId],
      queryFn: getMessagesFunction,
      onSuccess(data) {
         console.log(data.data)
      },
   })

   return null
}

export default useGetMessages
