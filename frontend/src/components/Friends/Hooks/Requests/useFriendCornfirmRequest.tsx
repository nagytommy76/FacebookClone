import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import type { FriendButtonType, IFriends } from '../../Types'

import useFriendDelete from '../ButtonType/useFriendDelete'
import useConfirmSocket from '../Sockets/useConfirmSocket'

const useFriendCornfirmRequest = (
   friendId: string,
   friends: IFriends[],
   setLoading: React.Dispatch<React.SetStateAction<boolean>>,
   setCardButtonType: React.Dispatch<React.SetStateAction<FriendButtonType>>
) => {
   const { setCardTypeDeleteFriend, setCardTypeDeleteFriendReceiver } = useFriendDelete(
      friendId,
      friends,
      setCardButtonType
   )
   const confirmMutate = async () => {
      return await axios.post('/friends/confirm-friendship', { friendId })
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
         setCardTypeDeleteFriend(data.data.friends)
      },
   })

   return {
      friendConfrimMutate: mutate,
   }
}

export default useFriendCornfirmRequest
