import React from 'react'
import Link from 'next/link'

import ProfilePic from '@/assets/facebook-profile.jpg'
import HomeIcon from '@mui/icons-material/Home'
import SchoolIcon from '@mui/icons-material/School'
import Typography from '@mui/material/Typography'
import {
   StyledTopSection,
   StyledProfileImage,
   StyledPaperContainer,
   StyledProfileBody,
   StyledIconParagraph,
} from './Styles'

import type { IPopulatedUserId } from '@/types/PostTypes'

const DetailsTooltipTitle: React.FC<{
   userInfo: IPopulatedUserId
   children?: React.ReactNode
}> = ({ userInfo, children }) => {
   return (
      <StyledPaperContainer elevation={10}>
         <StyledTopSection>
            <StyledProfileImage
               alt='Profile image'
               src={userInfo.userDetails.profilePicturePath[0].path || ProfilePic}
               width={130}
               height={130}
            />
            <StyledProfileBody>
               <Typography variant='h5'>
                  <Link href={`/${userInfo._id}`}>
                     {userInfo.firstName} {userInfo.sureName}
                  </Link>
               </Typography>
               <StyledIconParagraph>
                  <SchoolIcon sx={{ mr: 1 }} /> Tanulmányok:
                  {userInfo.userDetails?.studies?.highSchool?.name ?? 'Nincs'}
               </StyledIconParagraph>
               <StyledIconParagraph>
                  <HomeIcon sx={{ mr: 1 }} /> Lakhely: {userInfo.userDetails?.homeTown ?? 'Nincs'}
               </StyledIconParagraph>
            </StyledProfileBody>
         </StyledTopSection>
         {children}
      </StyledPaperContainer>
   )
}

export default DetailsTooltipTitle
