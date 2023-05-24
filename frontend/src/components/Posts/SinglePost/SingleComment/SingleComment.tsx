import React from 'react'
import type { IPostComment } from '../Like/Types'
import moment from 'moment'
import 'moment/locale/hu'

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

const SingleComment: React.FC<{ comment: IPostComment }> = ({ comment }) => {
   const getSelectedPicture = () => {
      const foundImage = comment.userId.userDetails.profilePicturePath.find((image) => image.isSelected)?.path
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
               <Likes isPostLike={false} postId={comment._id} postLikes={comment.likes}>
                  <p>válasz</p>
               </Likes>
               <Tooltip arrow title={moment(comment.answeredAt).format('YYYY MMMM D dddd, kk:mm')}>
                  <p>{moment(comment.answeredAt).fromNow(true)}</p>
               </Tooltip>
            </CommentFooterStyle>
         </StyledListElement>
      </StyledCommentContainer>
   )
}

export default SingleComment
