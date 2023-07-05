import React, { useContext } from 'react'
import { CommentContext } from './Context/CommentContext'

import { StyledCommentContainer, StyledProfileImage, StyledListElement, StyledCommentPaper } from './Styles'

import Reactions from './Includes/Reatcions/Reactions'
import FooterSection from './Includes/FooterSection/FooterSection'
// import ProfileCard from '../ProfileCard/DetailsTooltipTitle'
// import CustomTooltipTitle from '../../../Base/CustomTooltipTitle'

const SingleComment = () => {
   const {
      commentReducer: { singleComment },
   } = useContext(CommentContext)

   return (
      <StyledCommentContainer>
         <StyledListElement>
            <StyledProfileImage
               src={singleComment.userId.userDetails.profilePicturePath[0].path}
               alt='profil'
               width={20}
               height={20}
            />
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
            <FooterSection />
         </StyledListElement>
      </StyledCommentContainer>
   )
}

export default SingleComment
