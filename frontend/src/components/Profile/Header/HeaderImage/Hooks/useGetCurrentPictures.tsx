import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios } from '../../../../../utils/axiosSetup/AxiosInstance'
import type { IProfilePicture } from '../../../../Posts/Types'

const useGetCurrentPictures = () => {
   const [currentProfilePictures, setCurrentProfilePictures] = useState<IProfilePicture[]>()

   const { isLoading } = useQuery({
      queryKey: ['currentProfilePic'],
      queryFn: async () => {
         try {
            const response = await axios.get('/user/get-profile-pictures')
            setCurrentProfilePictures(response.data as { _id: string; path: string; isSelected: boolean }[])
            return response.data
         } catch (error) {
            return Promise.reject(new Error('some error'))
         }
      },
   })
   return { currentProfilePictures, isLoading, setCurrentProfilePictures }
}

export default useGetCurrentPictures
