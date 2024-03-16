import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import type { FriendButtonType, IFriends } from '../../Types'

const useFriendDeleteRequest = (
   friendId: string,
   setLoading: React.Dispatch<React.SetStateAction<boolean>>,
   setCardButtonType: React.Dispatch<React.SetStateAction<FriendButtonType>>
) => {
   const removeFriendMutation = async (isFriendRequestWithdraw: boolean = false) => {
      return (await axios.delete(`/friends/remove-friend`, {
         data: { friendId, isFriendRequestWithdraw },
      })) as AxiosResponse<{
         loggedInUserFriends: IFriends[]
      }>
   }

   const { mutate } = useMutation({
      mutationKey: ['removeFriend'],
      mutationFn: removeFriendMutation,
      onMutate: () => {
         setLoading(true)
      },
      onSuccess(data, variables, context) {
         setLoading(false)
         setCardButtonType('makeFriend')
      },
   })

   const deleteFriendMutate = (isFriendRequestWithdraw?: boolean) => mutate(isFriendRequestWithdraw)

   return {
      deleteFriendMutate,
   }
}

export default useFriendDeleteRequest
