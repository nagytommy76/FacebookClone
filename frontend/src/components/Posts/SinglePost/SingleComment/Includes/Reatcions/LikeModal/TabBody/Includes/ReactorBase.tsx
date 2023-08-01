import React from 'react'
import dynamic from 'next/dynamic'
import type { IReactors } from '@/src/types/LikeTypes'

import { ReactorElement, StyledImageContainer, StyledIconImage } from '../Style'
import { StyledProfileImage } from '@/styles/BaseStyles'
import Typography from '@mui/material/Typography'

import CustomTooltipTitle from '@/Base/CustomTooltipTitle'
const ProfileCard = dynamic(() => import('@/Base/ProfileCard/DetailsTooltipTitle'))

const ReactorBase: React.FC<{ reactor: IReactors; children: React.ReactNode }> = ({ reactor, children }) => {
   return (
      <ReactorElement>
         <StyledImageContainer>
            <StyledProfileImage
               alt={`profileImage-${reactor.sureName}-${reactor.firstName}`}
               src={reactor.userDetails.profilePicturePath[0].path}
               width={75}
               height={75}
            />
            <StyledIconImage>{children}</StyledIconImage>
         </StyledImageContainer>
         <CustomTooltipTitle title={<ProfileCard userInfo={reactor as any} />}>
            <Typography variant='h6'>
               {reactor.firstName} {reactor.sureName}
            </Typography>
         </CustomTooltipTitle>
      </ReactorElement>
   )
}

export default ReactorBase
