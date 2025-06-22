import { axiosInstance as axios } from '@/axios/AxiosInstance'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import type { IFriendsResponse } from '@/components/Friends/Types'

export default function useGetMyFriends() {
   const params = useParams<{ userId: string }>()
   async function getAllUsers(): Promise<IFriendsResponse[]> {
      const res = await axios.get('/friends/get-users-friends', {
         params: { userId: params.userId },
      })
      return res.data
   }

   const { data } = useQuery({
      queryKey: ['friends'],
      queryFn: getAllUsers,
   })
   return data
}
