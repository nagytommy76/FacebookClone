'use client'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/utils/axiosSetup/AxiosInstance'

import type { IUserPopulatedPosts } from '@/types/AuthTypes'
import type { IBaseListAction } from '../Context/Types'

const useGetUserData = (profileDispatch: React.Dispatch<IBaseListAction>) => {
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

   const { isLoading, isError, data } = useQuery({
      queryKey: ['get-user-data'],
      queryFn: getUserData,
   })

   useEffect(() => {
      if (data) profileDispatch({ type: 'SET_INITIAL_USER_DATA', payload: data })
   }, [data, profileDispatch])

   return { isLoading, isError }
}

export default useGetUserData
