import { useContext } from 'react'
import { ProfileContext } from '../../../Context/ProfileContextProvider'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '../../../../../utils/axiosSetup/AxiosInstance'
import { UserDataActions } from '../../../Context/ProfileReducer'

import { useAppDispatch } from '../../../../../utils/redux/store'
import { setCurrentImage } from '../../../../../utils/redux/slices/AuthSlice'

const useMutateSelectedPic = () => {
   const dispatch = useAppDispatch()
   const { profileDispatch } = useContext(ProfileContext)
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
         profileDispatch({
            type: UserDataActions.SET_USER_PROFILE_PICUTRES,
            payload: data.data.profilePicturePath,
         })
         const selectedPic = data.data.profilePicturePath.find((image) => image.isSelected)
         if (selectedPic) dispatch(setCurrentImage(selectedPic))
      },
   })
   return { mutate }
}

export default useMutateSelectedPic
