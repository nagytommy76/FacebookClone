import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import type { ILike } from '@/src/types/LikeTypes'

import useGetComment from './Hook/useGetComment'

import { StyledCommentPaper, StyledCommentParagraph } from './Styles'

import ReactionsSkeleton from '@/src/skeletons/Comments/Includes/ReactionsSkeleton'

const Reactions = dynamic(() => import('@/Base/LikeReactions/Reactions'), {
   loading: () => <ReactionsSkeleton />,
})
const LikeModal = dynamic(() => import('@/Base/LikeReactions/LikeModal/LikeModal'))

const CommentBody: React.FC<{
   isDeleted?: boolean
   answerId: string
   commentId: string | undefined
   postId: string
   likes: ILike[]
   comment: string
   isChildComment?: boolean
}> = ({ answerId, postId, likes, comment, isChildComment = false, commentId, isDeleted = false }) => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const { commentLikeCount } = useGetComment(answerId, commentId, postId, isModalOpen, isChildComment)

   return (
      <StyledCommentPaper>
         {isDeleted ? (
            <StyledCommentParagraph color={'#b2babb'}>[ Törölt komment ]</StyledCommentParagraph>
         ) : (
            <StyledCommentParagraph>{comment}</StyledCommentParagraph>
         )}
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
