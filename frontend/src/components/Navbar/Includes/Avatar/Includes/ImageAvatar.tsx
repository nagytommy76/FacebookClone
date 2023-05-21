import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '../../../../../utils/axiosSetup/AxiosInstance'
import { useAppDispatch, useAppSelector } from '../../../../../utils/redux/store'
import { setCurrentImage } from '../../../../../utils/redux/slices/AuthSlice'
import type { IProfilePicture } from '../../../../Posts/Types'

import Avatar from '@mui/material/Avatar'
import OwnProfile from '../../../../../assets/facebook-profile.jpg'

const ImageAvatar: React.FC<{ displayText?: string }> = ({ displayText }) => {
   const dispatch = useAppDispatch()

   const { isLoading } = useQuery({
      queryKey: ['getCurrentPicture'],
      queryFn: async () => {
         const response = (await axios.get('/user//get-current-picture')) as AxiosResponse<{
            currentImage: IProfilePicture
         }>
         return response.data
      },
      onSuccess: (data) => {
         dispatch(setCurrentImage(data.currentImage))
      },
   })
   const currentPicture = useAppSelector((state) => state.auth.currentImage)

   return (
      <>
         <Avatar sx={{ bgcolor: 'orange', width: 45, height: 45 }}>
            {isLoading ? (
               <Image width={45} height={45} alt='Profile picture' src={OwnProfile} />
            ) : (
               <Image width={45} height={45} alt='Profile picture' src={currentPicture.path} />
            )}
         </Avatar>
         <p>{displayText}</p>
      </>
   )
}

export default ImageAvatar
