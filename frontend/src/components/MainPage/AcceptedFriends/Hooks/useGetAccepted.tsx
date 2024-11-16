import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'
import { useAppDispatch } from '@/reduxStore/store'
import { setOnlineFriends } from '@/reduxStore/slices/ChatSlice'

import type { IProfilePicture } from '@/src/types/PostTypes'
import type { IIndexedRawOnlineFriendsRedis } from '@/types/FriendTypes'

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
         allOnlineFriends: IIndexedRawOnlineFriendsRedis
      }>
   }

   const { data } = useQuery({
      queryKey: ['getAcceptedFriends'],
      queryFn,
   })

   useEffect(() => {
      if (data) {
         Object.entries(data.data.allOnlineFriends).map(([key, value]) => {
            dispatch(
               setOnlineFriends({
                  isActive: value.isActive === '0' ? false : true,
                  lastSeen: Number(value.lastSeen),
                  userId: key,
                  socketId: value.socketId,
               })
            )
         })
         setMyFriends(data.data.myFoundFriendsData)
      }
   }, [data, dispatch])

   return myFriends
}

export default useGetAccepted
