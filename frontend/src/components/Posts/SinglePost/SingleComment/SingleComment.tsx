import React, { useContext } from 'react'
import { CommentContext } from './Context/CommentContext'

import { StyledCommentContainer, StyledProfileImage, StyledListElement, StyledCommentPaper } from './Styles'

import Reactions from './Includes/Reatcions/Reactions'
import FooterSection from './FooterSection/FooterSection'
// import ProfileCard from '../ProfileCard/DetailsTooltipTitle'
// import CustomTooltipTitle from '../../../Base/CustomTooltipTitle'

const SingleComment: React.FC<{ postId: string }> = ({ postId }) => {
   const {
      commentReducer: { singleComment },
   } = useContext(CommentContext)
   const getSelectedPicture = () => {
      const foundImage = singleComment.userId?.userDetails?.profilePicturePath.find(
         (image) => image.isSelected
      )?.path
      return foundImage
   }

   return (
      <StyledCommentContainer>
         <StyledListElement>
            <StyledProfileImage src={getSelectedPicture() ?? ''} alt='profil' width={20} height={20} />
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
            <FooterSection postId={postId} />
         </StyledListElement>
      </StyledCommentContainer>
   )
}

export default SingleComment
