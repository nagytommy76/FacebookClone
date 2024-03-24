import { useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'

import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'

import type { IFriendResponse } from '../../Types'

import useFriendWithdraw from '../ButtonType/useFriendWithdraw'
import useFriendConfirm from '../ButtonType/useFriendConfirm'

const useFriendRequest = () => {
   const {
      friendReducer: { friendId },
      setLoading,
   } = useContext(FriendContext)
   useFriendConfirm()
   const setCardTypeToWithdraw = useFriendWithdraw()

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
         setCardTypeToWithdraw()
         console.log(data)
         setLoading(false)
      },
   })

   const friendRequestMutate = () => mutate()

   return { friendRequestMutate }
}

export default useFriendRequest
