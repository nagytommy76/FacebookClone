import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import type { IPostLike } from '@/src/types/LikeTypes'

import useGetComment from './Hook/useGetComment'

import { StyledCommentPaper } from './Styles'

const Reactions = dynamic(() => import('../../../Reatcions/Reactions'))
const LikeModal = dynamic(() => import('../../../Reatcions/LikeModal/LikeModal'))

const CommentBody: React.FC<{ answerId: string; postId: string; likes: IPostLike[]; comment: string }> = ({
   answerId,
   postId,
   likes,
   comment,
}) => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const { commentLikeCount } = useGetComment(answerId, postId, isModalOpen)

   return (
      <StyledCommentPaper>
         <p>{comment}</p>
         <Reactions likes={likes} setIsModalOpen={setIsModalOpen}>
            <LikeModal
               isModalOpen={isModalOpen}
               likeCount={commentLikeCount}
               setIsModalOpen={setIsModalOpen}
            />
         </Reactions>
      </StyledCommentPaper>
   )
}

export default CommentBody
