import dynamic from 'next/dynamic'
import React from 'react'
import moment from 'moment'
import useMoment from '@/src/hooks/useMoment'

import Tooltip from '@mui/material/Tooltip'
import type { ILike } from '@/src/types/LikeTypes'
import { CommentFooterStyle } from './Styles'
import Button from '@mui/material/Button'

const Likes = dynamic(() => import('../../../../../Like/Like'))

const CommentFooter: React.FC<{
   handleSetAnswerOpen: () => void
   answerId: string
   postId: string
   likes: ILike[]
   answeredAt: string
   isChildComment?: boolean
   isDeleted?: boolean
}> = ({
   handleSetAnswerOpen,
   answerId,
   likes,
   postId,
   answeredAt,
   isChildComment = false,
   isDeleted = false,
}) => {
   const currentTime = useMoment(answeredAt)

   return (
      <CommentFooterStyle>
         <Likes
            isChildComment={isChildComment}
            commentId={answerId}
            isPostLike={false}
            postId={postId}
            postLikes={likes}
            isDeleted={isDeleted}
         >
            <Button disabled={isDeleted} onClick={handleSetAnswerOpen}>
               Válasz
            </Button>
         </Likes>
         <Tooltip arrow title={moment(answeredAt).format('YYYY MMMM D dddd, kk:mm')}>
            <span>{currentTime}</span>
         </Tooltip>
      </CommentFooterStyle>
   )
}

export default CommentFooter
