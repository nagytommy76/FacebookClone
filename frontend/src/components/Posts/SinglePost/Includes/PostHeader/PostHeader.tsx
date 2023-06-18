import React from 'react'
import moment from 'moment'
import 'moment/locale/hu'

import ProfilePic from '@/assets/facebook-profile.jpg'
import {
   HeaderRightTitleSection,
   PostHeaderStyle,
   StyledClickableTypography,
   StyledProfileImage,
} from './HeaderStyles'
import Typography from '@mui/material/Typography'

import CustomTooltipTitle from '../../../../Base/CustomTooltipTitle'
import DetailsTooltipTitle from '../../ProfileCard/DetailsTooltipTitle'
import type { IPopulatedUserId, IProfilePicture } from '@/types/PostTypes'

const PostHeader: React.FC<{
   userInfo: IPopulatedUserId
   createdAt: string
   selectSelectedProfilePicture: () => IProfilePicture | undefined
}> = ({ userInfo, createdAt, selectSelectedProfilePicture }) => {
   return (
      <PostHeaderStyle>
         <StyledProfileImage
            alt='My picture'
            src={selectSelectedProfilePicture()?.path || ProfilePic}
            width={45}
            height={45}
         />
         <HeaderRightTitleSection>
            <CustomTooltipTitle
               title={
                  <DetailsTooltipTitle
                     selectSelectedProfilePicture={selectSelectedProfilePicture}
                     userInfo={userInfo}
                  />
               }>
               <StyledClickableTypography variant='h6'>
                  {userInfo.firstName} {userInfo.sureName}
               </StyledClickableTypography>
            </CustomTooltipTitle>
            <Typography variant='caption'>{moment(createdAt).format('YYYY MMMM D dddd, kk:mm')}</Typography>
         </HeaderRightTitleSection>
      </PostHeaderStyle>
   )
}

export default PostHeader
