import React from 'react'

import ProfilePic from '@/assets/facebook-profile.jpg'
import HomeIcon from '@mui/icons-material/Home'
import SchoolIcon from '@mui/icons-material/School'
import Typography from '@mui/material/Typography'
import { StyledProfileImage, StyledPaperContainer, StyledProfileBody, StyledIconParagraph } from './Styles'

import type { IPopulatedUserId } from '@/types/PostTypes'
import { IProfilePicture } from '@/types/PostTypes'

const DetailsTooltipTitle: React.FC<{
   userInfo: IPopulatedUserId
   selectSelectedProfilePicture: () => IProfilePicture | undefined
}> = ({ userInfo, selectSelectedProfilePicture }) => {
   return (
      <StyledPaperContainer elevation={10}>
         <StyledProfileImage
            alt='Profile image'
            src={selectSelectedProfilePicture()?.path || ProfilePic}
            width={75}
            height={75}
         />
         <StyledProfileBody>
            <Typography variant='h5'>
               {userInfo.firstName} {userInfo.sureName}
            </Typography>
            <StyledIconParagraph>
               <SchoolIcon sx={{ mr: 1 }} /> Tanulmányok:
               {userInfo.userDetails?.studies?.highSchool?.name ?? 'Nincs'}
            </StyledIconParagraph>
            <StyledIconParagraph>
               <HomeIcon sx={{ mr: 1 }} /> Lakhely: {userInfo.userDetails?.homeTown ?? 'Nincs'}
            </StyledIconParagraph>
         </StyledProfileBody>
      </StyledPaperContainer>
   )
}

export default DetailsTooltipTitle
