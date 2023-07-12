import dynamic from 'next/dynamic'
import React, { useContext } from 'react'
import { CommentContext } from './Context/CommentContext'

const BaseCommentComponent = dynamic(() => import('./Includes/Base/BaseAnswerAndComment'))
const AnswerList = dynamic(() => import('./Includes/AnswerList/AnswerList'))

const SingleComment = () => {
   const {
      commentReducer: { singleComment, postId },
      parentRootAnswers,
   } = useContext(CommentContext)

   return (
      <BaseCommentComponent
         answer={singleComment}
         postId={postId}
         isChild={singleComment.commentAnswers && singleComment.commentAnswers?.length > 0}
      >
         {parentRootAnswers ? <AnswerList answer={parentRootAnswers} /> : <></>}
      </BaseCommentComponent>
   )
}

export default SingleComment
