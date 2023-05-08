import React, { useContext } from 'react'
import { ProfileContext } from '../Context/ProfileContextProvider'

import {
   ProfileHeader,
   HeaderImage,
   HeadTitleSection,
   ProfileModifySection,
   HeaderTop,
} from './Styles/HeaderStyle'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const { userData } = useContext(ProfileContext)

   return (
      <ProfileHeader elevation={1}>
         <HeaderTop>
            <HeaderImage
               src={userData.userDetails.profilePicturePath}
               alt='Profil kép'
               width={100}
               height={100}
            />
            <HeadTitleSection>
               <Typography variant='h4' fontWeight='50px' color='text.primary'>
                  {userData.firstName} {userData.sureName}
               </Typography>
               <Typography variant='body1' fontWeight='42px' color='text.primary'>
                  {userData.friends.length} ismerős
               </Typography>
               <Typography variant='body2' fontWeight='42px' color='text.primary'>
                  Itt majd az ismerősökre tudsz menni
               </Typography>
            </HeadTitleSection>
            <ProfileModifySection>
               <Button variant='contained' startIcon={<ModeEditOutlineIcon />}>
                  Profil módosítása
               </Button>
            </ProfileModifySection>
         </HeaderTop>
         <Divider sx={{ marginTop: 4, marginBottom: 2 }} />
         {children}
      </ProfileHeader>
   )
}

export default Header
