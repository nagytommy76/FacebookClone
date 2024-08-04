import { useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'

import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'

const useFriendDeleteRequest = () => {
   const {
      friendReducer: { friendId },
      setLoading,
      setCardButtonType,
   } = useContext(FriendContext)

   const removeFriendMutation = async () => {
      return (await axios.delete(`/friends/remove-friend`, {
         data: { friendId },
      })) as AxiosResponse<{
         loggedInUserFriends: any[]
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
