import React, { useContext } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'
import { useAppSelector } from '@/reduxStore/store'

import ProfilePic from '@/assets/facebook-profile.jpg'
import {
   HeaderRightTitleSection,
   PostHeaderStyle,
   StyledClickableTypography,
   StyledProfileImage,
} from './HeaderStyles'

import CustomTooltipTitle from '@/Base/LikeTooltip/CustomTooltipTitle'
import DetailsTooltipTitle from '@/Base/ProfileCard/DetailsTooltipTitle'
import OptionsMenu from './Includes/OptionsMenu'
import TimeAgo from './Includes/TimeAgo'
import ButtonStack from './Includes/Buttons/ButtonStack'

const PostHeader = () => {
   const {
      postsReducer: {
         singlePost: { createdAt, userId: userInfo },
      },
   } = useContext(PostContext)

   const userId = useAppSelector((state) => state.auth.userId)
   const userProfileImage = useAppSelector((state) => state.auth.currentImage)

   return (
      <PostHeaderStyle>
         <StyledProfileImage
            alt='My picture'
            src={
               userInfo._id === userId
                  ? userProfileImage.path
                  : userInfo.userDetails.profilePicturePath[0].path || ProfilePic
            }
            width={45}
            height={45}
         />
         <HeaderRightTitleSection>
            <CustomTooltipTitle
               placement='bottom'
               title={
                  <DetailsTooltipTitle userInfo={userInfo}>
                     <ButtonStack />
                  </DetailsTooltipTitle>
               }
            >
               <StyledClickableTypography variant='h6'>
                  {userInfo.firstName} {userInfo.sureName}
               </StyledClickableTypography>
            </CustomTooltipTitle>
            <TimeAgo createdAt={createdAt} />
         </HeaderRightTitleSection>
         {userId === userInfo._id && <OptionsMenu />}
      </PostHeaderStyle>
   )
}

export default PostHeader
