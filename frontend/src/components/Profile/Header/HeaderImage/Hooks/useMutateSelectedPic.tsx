import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '../../../../../utils/axiosSetup/AxiosInstance'
import type { IProfilePicture } from '../../../../Posts/Types'

const useMutateSelectedPic = (
   setCurrentProfilePictures: React.Dispatch<React.SetStateAction<IProfilePicture[] | undefined>>
) => {
   const handleRequest = async (modifyPictureId: string) => {
      return (await axios.put('/user/edit-profile-picture', { modifyId: modifyPictureId })) as AxiosResponse<{
         profilePicturePath: { _id: string; path: string; isSelected: boolean }[]
      }>
   }
   const { mutate } = useMutation({
      mutationFn: handleRequest,
      onSuccess: (data) => {
         setCurrentProfilePictures(data.data.profilePicturePath)
      },
   })
   return { mutate }
}

export default useMutateSelectedPic
