import { useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
// import type { IConnectedFriends } from '../../Types'
import type { IFriends } from '../../Types'

import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'

// import useFriendDelete from '../ButtonType/useFriendDelete'
import useConfirmSocket from '../Sockets/useConfirmSocket'

const useFriendCornfirmRequest = () => {
   const {
      friendReducer: { friendId },
      friendDispatch,
      setCardButtonType,
      setLoading,
   } = useContext(FriendContext)
   // const { setBtnTypeToDeleteFriend } = useFriendDelete()
   const confirmMutate = async () => {
      return (await axios.post('/friends/confirm-friendship', {
         friendId,
      })) as AxiosResponse<{ receiverFriends: IFriends; receiverFriendId: string }>
   }
   useConfirmSocket()

   const { mutate } = useMutation({
      mutationKey: ['confirmFriendship'],
      mutationFn: confirmMutate,
      onMutate(variables) {
         setLoading(true)
      },
      onSuccess(data) {
         console.log(data.data.receiverFriendId)
         friendDispatch({ type: 'SET_SENDER_FRIENDS', payload: data.data })
         setCardButtonType('isFriend')
         setLoading(false)
         // setBtnTypeToDeleteFriend()
      },
   })

   return {
      friendConfrimMutate: mutate,
   }
}

export default useFriendCornfirmRequest
