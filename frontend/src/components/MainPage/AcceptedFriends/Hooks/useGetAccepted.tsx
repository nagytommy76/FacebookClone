import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'
import type { IProfilePicture } from '@/src/types/PostTypes'

interface IFriendResponse {
   _id: string
   firstName: string
   sureName: string
   selectedProfilePicture: IProfilePicture[]
}

const useGetAccepted = () => {
   const [myFriends, setMyFriends] = useState<IFriendResponse[]>([])
   const queryFn = async () => {
      return (await axios.get('/friends/get-accepted-friends')) as AxiosResponse<{
         myFoundFriendsData: IFriendResponse[]
      }>
   }

   const { data } = useQuery({
      queryKey: ['getAcceptedFriends'],
      queryFn,
      onSuccess(data) {
         console.log(data.data.myFoundFriendsData[0])
         setMyFriends(data.data.myFoundFriendsData)
      },
   })

   return myFriends
}

export default useGetAccepted
