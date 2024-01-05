'use client'
import { useState } from 'react'
import { IProfilePicture } from '@/src/types/PostTypes'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

import { useQuery } from '@tanstack/react-query'

interface IFriends {
   firstName: string
   sureName: string
   _id: string
   email: string
   createdAt: string
   userDetails: { profilePicturePath: IProfilePicture[] }
}

const useGetFriends = () => {
   const [friends, setFriends] = useState<IFriends[]>([])
   const getFriendsFn = async () => {
      return (await axios.get('/friends/get-friends')) as AxiosResponse<IFriends[]>
   }
   const {} = useQuery({
      queryKey: ['getFreinds'],
      queryFn: getFriendsFn,
      onSuccess: (data) => {
         setFriends(data.data)
      },
   })
   return friends
}

export default useGetFriends
