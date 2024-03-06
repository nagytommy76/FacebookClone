import { useState } from 'react'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import type { FriendButtonType, IFriendResponse, IFriends } from '../Types'

import useFriendWithdraw from './ButtonType/useFriendWithdraw'
import useFriendConfirm from './ButtonType/useFriendConfirm'

const useFriendRequest = (friendId: string, friends: IFriends[]) => {
   const [loading, setLoading] = useState<boolean>(false)
   const [cardButtonType, setCardButtonType] = useState<FriendButtonType>('makeFriend')

   useFriendConfirm(friendId, friends, setCardButtonType)
   const setCardTypeToWithdraw = useFriendWithdraw(friends, setCardButtonType)

   const mutationFunction = async () => {
      return (await axios.post('/friends/make-friendship', { friendId })) as AxiosResponse<{
         receiverUser: IFriendResponse
         senderUser: IFriendResponse
      }>
   }
   const { mutate } = useMutation({
      mutationKey: ['makeFriendship'],
      mutationFn: mutationFunction,
      onMutate() {
         setLoading(true)
      },
      onSuccess(data) {
         setCardTypeToWithdraw(data.data.receiverUser.friends)
         setLoading(false)
      },
   })

   const friendRequestMutate = () => mutate()

   return { friendRequestMutate, loading, cardButtonType }
}

export default useFriendRequest
