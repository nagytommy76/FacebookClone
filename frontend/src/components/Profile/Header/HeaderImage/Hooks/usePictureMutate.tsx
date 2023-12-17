import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/utils/axiosSetup/AxiosInstance'
import type { IProfilePicture } from '@/types/PostTypes'

import { useAppDispatch } from '@/utils/redux/store'
import { setCurrentImage } from '@/utils/redux/slices/AuthSlice'
import { useContext } from 'react'
import { ProfileContext } from '../../../Context/ProfileContextProvider'

const usePictureMutate = () => {
   const dispatch = useAppDispatch()
   const { profileDispatch } = useContext(ProfileContext)
   const { mutate } = useMutation({
      mutationFn: async (profilePicturePath: string) => {
         return (await axios.post('/user/save-profile-picture', { profilePicturePath })) as AxiosResponse<{
            profilePicturePath: IProfilePicture[]
         }>
      },
      onSuccess: (data) => {
         const selectedPic = data.data.profilePicturePath.find((image) => image.isSelected)
         if (selectedPic) dispatch(setCurrentImage(selectedPic))
         profileDispatch({
            type: 'SET_USER_PROFILE_PICUTRES',
            payload: data.data.profilePicturePath,
         })
      },
   })
   return mutate
}

export default usePictureMutate
