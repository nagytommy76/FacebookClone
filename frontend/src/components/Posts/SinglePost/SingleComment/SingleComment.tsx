import React, { useContext } from 'react'
import { CommentContext } from './Context/CommentContext'
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
import Reactions from './Includes/Reatcions/Reactions'
// import ProfileCard from '../ProfileCard/DetailsTooltipTitle'
// import CustomTooltipTitle from '../../../Base/CustomTooltipTitle'

const SingleComment: React.FC<{ postId: string }> = ({ postId }) => {
   const {
      commentReducer: { singleComment },
   } = useContext(CommentContext)
   const currentTime = useMoment(singleComment?.answeredAt)
   if (!singleComment) return <h1>SingleComment suspense jön ide</h1>
   const getSelectedPicture = () => {
      const foundImage = singleComment.userId?.userDetails?.profilePicturePath.find(
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
                  {singleComment.userId.firstName} {singleComment.userId.sureName}
               </p>
               <p>{singleComment.comment}</p>
               <Reactions likes={singleComment.likes} />
            </StyledCommentPaper>
            <CommentFooterStyle>
               <Likes
                  commentId={singleComment._id}
                  isPostLike={false}
                  postId={postId}
                  postLikes={singleComment.likes}>
                  <p>Válasz</p>
               </Likes>
               <Tooltip arrow title={moment(singleComment.answeredAt).format('YYYY MMMM D dddd, kk:mm')}>
                  <span>{currentTime}</span>
               </Tooltip>
            </CommentFooterStyle>
         </StyledListElement>
      </StyledCommentContainer>
   )
}

export default SingleComment
