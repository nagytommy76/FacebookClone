'use client'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import useCheckUrl from '@/hooks/useCheckUrl'
import { axiosInstance as axios } from '@/utils/axiosSetup/AxiosInstance'
import type { IUserPopulatedPosts } from '@/types/AuthTypes'
import type { IBaseListAction } from '../Context/ProfileReducer'

const useGetUserData = (profileDispatch: React.Dispatch<IBaseListAction>) => {
   const params = useParams() as { userId: string }
   const isUrlChanged = useCheckUrl()
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

   const { isLoading, isError } = useQuery({
      queryKey: ['userData', { isUrlChanged, userId: params.userId }],
      queryFn: getUserData,
      onSuccess(data) {
         profileDispatch({ payload: data, type: 'SET_INITIAL_USER_DATA' })
      },
   })
   return { isLoading, isError }
}

export default useGetUserData
