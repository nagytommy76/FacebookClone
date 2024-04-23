import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

import { useAppDispatch } from '@/reduxStore/store'
import { setMessageLabels, setChatId, setSelectedChatWithUserId } from '@/reduxStore/slices/ChatSlice'
import { useQuery } from '@tanstack/react-query'

import type { IChat } from '@/src/components/Navbar/Chat/Types'

const useFillMessageLabels = () => {
   const dispatch = useAppDispatch()

   const queryFunction = async () => {
      return (await axios.get('/chat/get-all-chats')) as AxiosResponse<{ foundChat: IChat[] }>
   }

   const {} = useQuery({
      queryKey: ['getMessageLabels'],
      queryFn: queryFunction,
      onSuccess(data) {
         const foundChat = data.data.foundChat
         dispatch(setChatId(foundChat[0]._id))
         dispatch(setSelectedChatWithUserId(foundChat[0].chatWithParticipant._id))
         dispatch(setMessageLabels(foundChat))
      },
   })
   return null
}

export default useFillMessageLabels
