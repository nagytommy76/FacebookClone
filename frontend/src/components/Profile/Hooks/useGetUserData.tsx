'use client'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/utils/axiosSetup/AxiosInstance'
import { IUserPopulatedPosts } from '@/types/AuthTypes'

const useGetUserData = () => {
   const params = useParams() as { userId: string }

   const getUserData = async () => {
      try {
         const response = await axios.get('/user/get-details', {
            params: { userId: params.userId },
         })
         return response.data as IUserPopulatedPosts
      } catch (error) {
         console.log(error)
         return Promise.reject(new Error())
      }
   }

   const { data, isLoading, isError } = useQuery({
      queryKey: ['userData'],
      queryFn: getUserData,
   })
   return { data, isLoading, isError }
}

export default useGetUserData
