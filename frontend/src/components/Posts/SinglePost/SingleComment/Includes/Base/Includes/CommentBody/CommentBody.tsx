import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import type { IPostLike } from '@/src/types/LikeTypes'

import useGetComment from './Hook/useGetComment'

import { StyledCommentPaper, StyledCommentParagraph } from './Styles'

const Reactions = dynamic(() => import('../../../Reatcions/Reactions'))
const LikeModal = dynamic(() => import('../../../Reatcions/LikeModal/LikeModal'))

const CommentBody: React.FC<{
   answerId: string
   commentId: string | undefined
   postId: string
   likes: IPostLike[]
   comment: string
   isChildComment?: boolean
}> = ({ answerId, postId, likes, comment, isChildComment = false, commentId }) => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const { commentLikeCount } = useGetComment(answerId, commentId, postId, isModalOpen, isChildComment)

   return (
      <StyledCommentPaper>
         <StyledCommentParagraph>{comment}</StyledCommentParagraph>
         {likes.length !== 0 && (
            <Reactions likes={likes} setIsModalOpen={setIsModalOpen}>
               <LikeModal
                  isModalOpen={isModalOpen}
                  likeCount={commentLikeCount}
                  setIsModalOpen={setIsModalOpen}
               />
            </Reactions>
         )}
      </StyledCommentPaper>
   )
}

export default CommentBody
