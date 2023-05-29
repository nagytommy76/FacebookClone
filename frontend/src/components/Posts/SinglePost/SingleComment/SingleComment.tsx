import React from 'react'
import type { IPostComment } from '../Like/Types'
import useMoment from './Hooks/useMoment'
import moment from 'moment'

import {
   StyledCommentContainer,
   StyledProfileImage,
   StyledListElement,
   StyledCommentPaper,
   CommentFooterStyle,
} from './Styles'
import Tooltip from '@mui/material/Tooltip'

import Likes from '../Like/Like'
// import ProfileCard from '../ProfileCard/DetailsTooltipTitle'
// import CustomTooltipTitle from '../../../Base/CustomTooltipTitle'

const SingleComment: React.FC<{ comment: IPostComment; postId: string }> = ({ comment, postId }) => {
   const currentTime = useMoment(comment.answeredAt)
   const getSelectedPicture = () => {
      const foundImage = comment.userId.userDetails?.profilePicturePath.find(
         (image) => image.isSelected
      )?.path
      return foundImage
   }

   return (
      <StyledCommentContainer>
         <StyledProfileImage src={getSelectedPicture() ?? ''} alt='profil' width={20} height={20} />
         <StyledListElement>
            <StyledCommentPaper>
               {/* <CustomTooltipTitle
                  title={
                     <ProfileCard
                        selectSelectedProfilePicture={() => {
                           return { _id: '', isSelected: false, path: '' }
                        }}
                        userInfo={comment.userId.userDetails as any}
                     />
                  }>
                  <p>
                     {comment.userId.firstName} {comment.userId.sureName}
                  </p>
               </CustomTooltipTitle> */}
               <p>
                  {comment.userId.firstName} {comment.userId.sureName}
               </p>
               <p>{comment.comment}</p>
            </StyledCommentPaper>
            <CommentFooterStyle>
               <Likes commentId={comment._id} isPostLike={false} postId={postId} postLikes={comment.likes}>
                  <p>Válasz</p>
               </Likes>
               <Tooltip arrow title={moment(comment.answeredAt).format('YYYY MMMM D dddd, kk:mm')}>
                  <span>{currentTime}</span>
               </Tooltip>
            </CommentFooterStyle>
         </StyledListElement>
      </StyledCommentContainer>
   )
}

export default SingleComment