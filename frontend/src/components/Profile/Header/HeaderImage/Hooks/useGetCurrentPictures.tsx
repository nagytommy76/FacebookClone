import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios } from '../../../../../utils/axiosSetup/AxiosInstance'

const useGetCurrentPictures = () => {
   const { data, isLoading } = useQuery({
      queryKey: ['currentProfilePic'],
      queryFn: async () => {
         try {
            const response = await axios.get('/user/get-profile-pictures')
            return response.data as { path: string; isSelected: boolean }[]
         } catch (error) {
            return Promise.reject(new Error('some error'))
         }
      },
   })
   return { currentProfilePictures: data, isLoading }
}

export default useGetCurrentPictures
