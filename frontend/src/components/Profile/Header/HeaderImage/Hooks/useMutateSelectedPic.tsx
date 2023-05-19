import { useContext } from 'react'
import { ProfileContext } from '../../../Context/ProfileContextProvider'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '../../../../../utils/axiosSetup/AxiosInstance'
import { UserDataActions } from '../../../Context/ProfileReducer'

const useMutateSelectedPic = () => {
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
      },
   })
   return { mutate }
}

export default useMutateSelectedPic
