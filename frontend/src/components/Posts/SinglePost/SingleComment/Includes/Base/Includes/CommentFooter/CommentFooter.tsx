import dynamic from 'next/dynamic'
import React from 'react'
import moment from 'moment'
import useMoment from '@/src/hooks/useMoment'

import Tooltip from '@mui/material/Tooltip'
import type { IPostLike } from '@/src/types/LikeTypes'
import { CommentFooterStyle, StyledCommentAnswerButton } from './Styles'

const Likes = dynamic(() => import('../../../../../Like/Like'))

const CommentFooter: React.FC<{
   handleSetAnswerOpen: () => void
   answerId: string
   postId: string
   likes: IPostLike[]
   answeredAt: string
   isChildComment?: boolean
}> = ({ handleSetAnswerOpen, answerId, likes, postId, answeredAt, isChildComment = false }) => {
   const currentTime = useMoment(answeredAt)

   return (
      <CommentFooterStyle>
         <Likes
            isChildComment={isChildComment}
            commentId={answerId}
            isPostLike={false}
            postId={postId}
            postLikes={likes}
         >
            <StyledCommentAnswerButton onClick={handleSetAnswerOpen}>Válasz</StyledCommentAnswerButton>
         </Likes>
         <Tooltip arrow title={moment(answeredAt).format('YYYY MMMM D dddd, kk:mm')}>
            <span>{currentTime}</span>
         </Tooltip>
      </CommentFooterStyle>
   )
}

export default CommentFooter
