import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import type { FriendButtonType, IFriendResponse, IFriends } from '../Types'

const useFriendCornfirmRequest = (
   friendId: string,
   setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
      },
   })

   return {
      friendConfrimMutate: mutate,
   }
}

export default useFriendCornfirmRequest
