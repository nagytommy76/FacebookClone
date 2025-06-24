import { useContext } from 'react'
import { ProfileContext } from '../../Context/ProfileContextProvider'
import Image from 'next/image'

import Typography from '@mui/material/Typography'

export default function ProfileImg() {
   const {
      profileReducer: {
         initialUserDataState: {
            userDetails: { profilePicturePath },
         },
      },
   } = useContext(ProfileContext)
   return (
      <>
         <Typography variant='h4' align='center' gutterBottom>
            Profil képek
         </Typography>
         {profilePicturePath.map((image) => (
            <Image key={image._id} src={image.path} alt={image.path} width={200} height={200} />
         ))}
      </>
   )
}
