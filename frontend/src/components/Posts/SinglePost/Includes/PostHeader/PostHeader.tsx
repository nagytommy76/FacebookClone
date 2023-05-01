import React from 'react'
import moment from 'moment'

import {
   HeaderRightTitleSection,
   PostHeaderStyle,
   StyledClickableTypography,
   StyledProfileImage,
} from './HeaderStyles'
import Typography from '@mui/material/Typography'

import ProfileCard from '../../ProfileCard/ProfileCard'

const PostHeader: React.FC<{ profilePicturePath: string; displayFullName: string; createdAt: string }> = ({
   profilePicturePath,
   displayFullName,
   createdAt,
}) => {
   return (
      <PostHeaderStyle>
         <StyledProfileImage alt='My picture' src={profilePicturePath} width={45} height={45} />
         <HeaderRightTitleSection>
            <ProfileCard>
               <StyledClickableTypography variant='h6'>{displayFullName}</StyledClickableTypography>
            </ProfileCard>
            <Typography variant='caption'>{moment(createdAt).format('YYYY MMMM D dddd, kk:mm')}</Typography>
         </HeaderRightTitleSection>
      </PostHeaderStyle>
   )
}

export default PostHeader
