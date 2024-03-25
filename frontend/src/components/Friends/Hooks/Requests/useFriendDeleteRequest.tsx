import { useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'

import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import type { IFriends } from '../../Types'

const useFriendDeleteRequest = () => {
   const {
      friendReducer: { friendId, selectedConnectedFriend },
      setLoading,
      setCardButtonType,
   } = useContext(FriendContext)

   const removeFriendMutation = async () => {
      return (await axios.delete(`/friends/remove-friend`, {
         data: { friendId, connectedFriendId: selectedConnectedFriend?._id },
      })) as AxiosResponse<{
         loggedInUserFriends: IFriends[]
      }>
   }

   const { mutate } = useMutation({
      mutationKey: ['removeFriend'],
      mutationFn: removeFriendMutation,
      onMutate: () => {
         setLoading(true)
      },
      onSuccess(data, variables, context) {
         setLoading(false)
         setCardButtonType('makeFriend')
      },
   })

   const deleteFriendMutate = () => mutate()

   return {
      deleteFriendMutate,
   }
}

export default useFriendDeleteRequest
