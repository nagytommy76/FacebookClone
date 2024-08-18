import { useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { useAppSelector } from '@/reduxStore/store'

import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import { socket } from '@/src/utils/socketIo'

import type { IFriendResponse } from '../../Types'

import useFriendWithdraw from '../ButtonType/useFriendWithdraw'
import useFriendConfirm from '../ButtonType/useFriendConfirm'
import useFriendDelete from '../ButtonType/useFriendDelete'

const useFriendRequest = () => {
   const userId = useAppSelector((state) => state.auth.userId)
   const {
      friendReducer: { friendId },
      friendDispatch,
      setLoading,
   } = useContext(FriendContext)
   useFriendDelete()
   useFriendConfirm()
   const setCardTypeToWithdraw = useFriendWithdraw()

   const mutationFunction = async () => {
      return (await axios.post('/friends/make-friendship', { friendId })) as AxiosResponse<{
         receiverUser: IFriendResponse
      }>
   }
   const { mutate } = useMutation({
      mutationKey: ['makeFriendship'],
      mutationFn: mutationFunction,
      onMutate() {
         setLoading(true)
      },
      onSuccess(data) {
         friendDispatch({ type: 'SET_FRIENDS_ARRAY', payload: data.data.receiverUser.friends })
         setCardTypeToWithdraw()
         socket.emit('friend:join_friend', { friendId: userId })
         setLoading(false)
      },
      onError(error, variables, context) {
         setLoading(false)
      },
   })

   const friendRequestMutate = () => mutate()

   return { friendRequestMutate }
}

export default useFriendRequest
