import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import useFriendDelete from './ButtonType/useFriendDelete'

import type { FriendButtonType, IFriendResponse, IFriends } from '../Types'

const useFriendCornfirmRequest = (
   friendId: string,
   setLoading: React.Dispatch<React.SetStateAction<boolean>>,
   setCardButtonType: React.Dispatch<React.SetStateAction<FriendButtonType>>
) => {
   const { setCardTypeDeleteFriend } = useFriendDelete(setCardButtonType)
   const confirmMutate = async () => {
      return await axios.post('/friends/confirm-friendship', { friendId })
   }

   const { mutate } = useMutation({
      mutationKey: ['confirmFriendship'],
      mutationFn: confirmMutate,
      onMutate(variables) {
         setLoading(true)
      },
      onSuccess(data) {
         console.log(data.data)
         setLoading(false)
         setCardTypeDeleteFriend(data.data.friends)
      },
   })

   return {
      friendConfrimMutate: mutate,
   }
}

export default useFriendCornfirmRequest
