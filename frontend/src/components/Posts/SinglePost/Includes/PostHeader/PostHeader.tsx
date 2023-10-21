import React from 'react'
import { useAppSelector } from '@/reduxStore/store'
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

import CustomTooltipTitle from '@/Base/CustomTooltipTitle'
import DetailsTooltipTitle from '@/Base/ProfileCard/DetailsTooltipTitle'
import type { IPopulatedUserId } from '@/types/PostTypes'
import OptionsMenu from './Includes/OptionsMenu'

const PostHeader: React.FC<{
   userInfo: IPopulatedUserId
   createdAt: string
}> = ({ userInfo, createdAt }) => {
   const userId = useAppSelector((state) => state.auth.userId)

   return (
      <PostHeaderStyle>
         <StyledProfileImage
            alt='My picture'
            src={userInfo.userDetails.profilePicturePath[0].path || ProfilePic}
            width={45}
            height={45}
         />
         <HeaderRightTitleSection>
            <CustomTooltipTitle title={<DetailsTooltipTitle userInfo={userInfo} />}>
               <StyledClickableTypography variant='h6'>
                  {userInfo.firstName} {userInfo.sureName}
               </StyledClickableTypography>
            </CustomTooltipTitle>
            <Typography variant='caption'>{moment(createdAt).format('YYYY MMMM D dddd, kk:mm')}</Typography>
         </HeaderRightTitleSection>
         {userId === userInfo._id && <OptionsMenu />}
      </PostHeaderStyle>
   )
}

export default PostHeader
