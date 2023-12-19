import React, { useContext } from 'react'
import { PostContext } from '@/src/components/MainPage/Context/PostContextProvider'
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
import OptionsMenu from './Includes/OptionsMenu'

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
