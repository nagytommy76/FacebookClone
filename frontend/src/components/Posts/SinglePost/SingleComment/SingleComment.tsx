import React from 'react'
import type { IPostComment } from '../Like/Types'

import { StyledListElement, StyledCommentContainer } from './Styles'

import Likes from '../Like/Like'

const SingleComment: React.FC<{ comment: IPostComment }> = ({ comment }) => {
   return (
      <ul>
         <StyledListElement>
            <StyledCommentContainer>
               <p>
                  {comment.userId.firstName} {comment.userId.sureName}
               </p>
               <p>{comment.comment}</p>
               <Likes postId={comment._id} postLikes={comment.likes} />
            </StyledCommentContainer>
         </StyledListElement>
      </ul>
   )
}

export default SingleComment
