import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

import { useAppDispatch, useAppSelector } from '@/reduxStore/store'
import { setMessageLabels, setChatId, setSelectedChatWithUserId } from '@/reduxStore/slices/ChatSlice'
import { useQuery } from '@tanstack/react-query'

import type { IChat } from '@/src/components/Navbar/Chat/Types'

const useFillMessageLabels = () => {
   const dispatch = useAppDispatch()
   const { isLoggedIn, userId } = useAppSelector((state) => state.auth)

   const queryFunction = async () => {
      return (await axios.get('/chat/get-all-chats')) as AxiosResponse<{ foundChat: IChat[] }>
   }
   useQuery({
      queryKey: ['getMessageLabels', userId],
      queryFn: queryFunction,
      enabled: isLoggedIn,
      onSuccess(data) {
         const foundChat = data.data.foundChat
         if (foundChat.length === 0) return null
         dispatch(setChatId(foundChat[0]._id))
         dispatch(setSelectedChatWithUserId(foundChat[0].chatWithParticipant._id))
         dispatch(setMessageLabels(foundChat))
      },
   })
   return null
}

export default useFillMessageLabels
