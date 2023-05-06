import React from 'react'

import HomeIcon from '@mui/icons-material/Home'
import SchoolIcon from '@mui/icons-material/School'
import Typography from '@mui/material/Typography'
import { StyledProfileImage, StyledPaperContainer, StyledProfileBody, StyledIconParagraph } from './Styles'

import type { IPopulatedUserId } from '../Like/Types'

const DetailsTooltipTitle: React.FC<{ userInfo: IPopulatedUserId }> = ({ userInfo }) => {
   return (
      <StyledPaperContainer elevation={10}>
         <StyledProfileImage
            alt='Profile image'
            src={userInfo.userDetails.profilePicturePath}
            width={75}
            height={75}
         />
         <StyledProfileBody>
            <Typography variant='h5'>
               {userInfo.firstName} {userInfo.sureName}
            </Typography>
            <StyledIconParagraph>
               <SchoolIcon sx={{ mr: 1 }} /> Tanulmányok:{' '}
               {userInfo.userDetails?.studies?.highSchool?.name ?? 'Nincs'}
            </StyledIconParagraph>
            <StyledIconParagraph>
               <HomeIcon sx={{ mr: 1 }} /> Lakhely: {userInfo.userDetails.homeTown ?? 'Nincs'}
            </StyledIconParagraph>
         </StyledProfileBody>
      </StyledPaperContainer>
   )
}

export default DetailsTooltipTitle
