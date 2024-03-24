import { useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'

import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'

import useFriendDelete from '../ButtonType/useFriendDelete'
import useConfirmSocket from '../Sockets/useConfirmSocket'

const useFriendCornfirmRequest = () => {
   const {
      friendReducer: { friendId, selectedConnectedFriend },
      setLoading,
   } = useContext(FriendContext)
   const { setCardTypeDeleteFriend, setCardTypeDeleteFriendReceiver } = useFriendDelete()
   const confirmMutate = async () => {
      return await axios.post('/friends/confirm-friendship', {
         connectedFriendId: selectedConnectedFriend?._id,
         friendId,
      })
   }
   useConfirmSocket(friendId, setCardTypeDeleteFriendReceiver)

   const { mutate } = useMutation({
      mutationKey: ['confirmFriendship'],
      mutationFn: confirmMutate,
      onMutate(variables) {
         setLoading(true)
      },
      onSuccess(data) {
         console.log(data.data)
         setLoading(false)
         // setCardTypeDeleteFriend(data.data.friends)
      },
   })

   return {
      friendConfrimMutate: mutate,
   }
}

export default useFriendCornfirmRequest
