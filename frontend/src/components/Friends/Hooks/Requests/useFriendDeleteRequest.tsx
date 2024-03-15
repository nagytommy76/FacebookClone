import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'

const useFriendDeleteRequest = (friendId: string) => {
   const removeFriendMutation = async () => {
      await axios.delete('/friends/remove-friend', { data: { friendId } })
   }

   const { mutate } = useMutation({
      mutationKey: ['removeFriend'],
      mutationFn: removeFriendMutation,
   })

   return {
      deleteFriendMutate: () => mutate(),
   }
}

export default useFriendDeleteRequest
