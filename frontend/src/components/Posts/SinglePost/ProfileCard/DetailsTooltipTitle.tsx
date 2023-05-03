import React from 'react'

import HomeIcon from '@mui/icons-material/Home'
import SchoolIcon from '@mui/icons-material/School'
import Typography from '@mui/material/Typography'
import { StyledProfileImage, StyledPaperContainer, StyledProfileBody, StyledIconParagraph } from './Styles'

import type { IPopulatedUserId } from '../Like/Types'

const DetailsTooltipTitle: React.FC<{ userInfo: IPopulatedUserId }> = ({ userInfo }) => {
   return (
      <StyledPaperContainer>
         <StyledProfileImage
            alt='Profile image'
            src={userInfo.userDetails.profilePicturePath}
            width={75}
            height={75}
         />
         <StyledProfileBody>
            <Typography variant='h5'>Tamás Nagy</Typography>
            <StyledIconParagraph>
               <SchoolIcon /> Tanulmányok: Verebély László SZKI
            </StyledIconParagraph>
            <StyledIconParagraph>
               <HomeIcon /> Lakhely: Budapest
            </StyledIconParagraph>
         </StyledProfileBody>
      </StyledPaperContainer>
   )
}

export default DetailsTooltipTitle
