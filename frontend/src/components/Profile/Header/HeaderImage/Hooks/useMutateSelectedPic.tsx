import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

import { ProfileContext } from '../../../Context/ProfileContextProvider'
import { useAppDispatch } from '@/reduxStore/store'
import { setCurrentImage } from '@/reduxStore/slices/AuthSlice'

const useMutateSelectedPic = () => {
   const { profileDispatch } = useContext(ProfileContext)
   const dispatch = useAppDispatch()

   const handleRequest = async (modifyPictureId: string) => {
      return (await axios.put('/user/edit-profile-picture', {
         modifyId: modifyPictureId,
      })) as AxiosResponse<{
         profilePicturePath: { _id: string; path: string; isSelected: boolean }[]
      }>
   }

   const { mutate } = useMutation({
      mutationFn: handleRequest,
      onSuccess: (data) => {
         const selectedPic = data.data.profilePicturePath.find((image) => image.isSelected)
         if (selectedPic) dispatch(setCurrentImage(selectedPic))
         profileDispatch({ type: 'SET_SELECTED_IMG', payload: data.data.profilePicturePath })
      },
   })
   return { mutate }
}

export default useMutateSelectedPic
