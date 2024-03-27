import { useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import type { IConnectedFriends } from '../../Types'

import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'

import useFriendDelete from '../ButtonType/useFriendDelete'
import useConfirmSocket from '../Sockets/useConfirmSocket'

const useFriendCornfirmRequest = () => {
   const {
      friendReducer: { friendId, selectedConnectedFriend },
      friendDispatch,
      setLoading,
   } = useContext(FriendContext)
   const { setBtnTypeToDeleteFriend } = useFriendDelete()
   const confirmMutate = async () => {
      return (await axios.post('/friends/confirm-friendship', {
         connectedFriendId: selectedConnectedFriend?._id,
         friendId,
      })) as AxiosResponse<{ foundFriendsModel: IConnectedFriends }>
   }
   useConfirmSocket()

   const { mutate } = useMutation({
      mutationKey: ['confirmFriendship'],
      mutationFn: confirmMutate,
      onMutate(variables) {
         setLoading(true)
      },
      onSuccess(data) {
         setLoading(false)
         friendDispatch({ type: 'SET_SELECTED_CONNECTED_FRIEND', payload: data.data.foundFriendsModel })
         setBtnTypeToDeleteFriend(data.data.foundFriendsModel)
      },
   })

   return {
      friendConfrimMutate: mutate,
   }
}

export default useFriendCornfirmRequest
