import { useContext } from 'react'
import { FriendContext } from '../../../Context/FriendContext'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

const useRemoveMutation = () => {
   const {
      friendReducer: { friendId },
   } = useContext(FriendContext)

   const removeFriendMutation = async () => {
      return (await axios.delete(`/friends/remove-friend`, {
         data: { friendId },
      })) as AxiosResponse<{
         loggedInUserFriends: any[]
      }>
   }

   return removeFriendMutation
}

export default useRemoveMutation
