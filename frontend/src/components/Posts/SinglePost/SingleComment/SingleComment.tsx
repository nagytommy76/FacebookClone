import dynamic from 'next/dynamic'
import React, { useContext } from 'react'
import { CommentContext } from '@/CommentContext/CommentContext'
import { AnswerContext } from '@/AnswerContext/AnswerContext'

import SingleCommentSkeleton from '@/Skeletons/Comments/SingleComment'

const BaseCommentComponent = dynamic(() => import('./Includes/Base/BaseAnswerAndComment'), {
   loading: () => <SingleCommentSkeleton />,
})
const AnswerList = dynamic(() => import('./Includes/AnswerList/AnswerList'))
const OpenCommentAnswer = dynamic(() => import('./Includes/OpenCommentAnswers/OpenCommentAnswers'))

const SingleComment = () => {
   const {
      commentReducer: { singleComment, postId },
   } = useContext(CommentContext)
   const { parentRootAnswers } = useContext(AnswerContext)

   return (
      <BaseCommentComponent
         answer={singleComment}
         postId={postId}
         isChild={singleComment.commentAnswers && singleComment.commentAnswers?.length > 0}
         isChildComment={false}
      >
         <OpenCommentAnswer
            answerLength={singleComment.commentAnswers?.length}
            isFirstAnswer={singleComment.commentAnswers?.length > 0}
         >
            {parentRootAnswers ? <AnswerList answer={parentRootAnswers} /> : <></>}
         </OpenCommentAnswer>
      </BaseCommentComponent>
   )
}

export default SingleComment
