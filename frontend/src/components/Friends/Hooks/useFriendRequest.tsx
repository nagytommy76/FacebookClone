import { useState } from 'react'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import type { FriendButtonType, IFriendsResponse } from '../Types'

const useFriendRequest = (friendId: string) => {
   const [loading, setLoading] = useState<boolean>(false)
   const [cardButtonType, setCardButtonType] = useState<FriendButtonType>('makeFriend')

   const mutationFunction = async () => {
      return (await axios.post('/friends/make-friendship', { friendId })) as AxiosResponse<{
         receiverUser: IFriendsResponse
         senderUser: IFriendsResponse
      }>
   }

   const { mutate } = useMutation({
      mutationKey: ['makeFriendship'],
      mutationFn: mutationFunction,
      onMutate(variables) {
         setLoading(true)
         console.log('MUTATE INDUL')
      },
      onSuccess(data, variables, context) {
         console.log(data.data)
         setLoading(false)
      },
   })

   const friendRequestMutate = () => mutate()

   return { friendRequestMutate, loading, cardButtonType }
}

export default useFriendRequest
