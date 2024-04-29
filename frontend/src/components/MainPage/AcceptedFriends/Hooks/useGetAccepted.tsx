import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

import { useAppDispatch } from '@/reduxStore/store'
import { setOnlineFriends } from '@/reduxStore/slices/ChatSlice'
import type { IProfilePicture } from '@/src/types/PostTypes'

interface IFriendResponse {
   _id: string
   firstName: string
   sureName: string
   selectedProfilePicture: IProfilePicture[]
}

const useGetAccepted = () => {
   const dispatch = useAppDispatch()
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
         setMyFriends(data.data.myFoundFriendsData)
         data.data.myFoundFriendsData.map((friend) => {
            dispatch(setOnlineFriends({ friendId: friend._id }))
         })
      },
   })

   return myFriends
}

export default useGetAccepted
