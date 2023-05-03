import React from 'react'
import moment from 'moment'

import {
   HeaderRightTitleSection,
   PostHeaderStyle,
   StyledClickableTypography,
   StyledProfileImage,
} from './HeaderStyles'
import Typography from '@mui/material/Typography'

import CustomTooltipTitle from '../../../../Base/CustomTooltipTitle'
import DetailsTooltipTitle from '../../ProfileCard/DetailsTooltipTitle'
import { IPopulatedUserId } from '../../Like/Types'

const PostHeader: React.FC<{ userInfo: IPopulatedUserId; createdAt: string }> = ({ userInfo, createdAt }) => {
   return (
      <PostHeaderStyle>
         <StyledProfileImage
            alt='My picture'
            src={userInfo.userDetails.profilePicturePath}
            width={45}
            height={45}
         />
         <HeaderRightTitleSection>
            <CustomTooltipTitle open={true} title={<DetailsTooltipTitle userInfo={userInfo} />}>
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
