import dynamic from 'next/dynamic'
import React, { useContext, useEffect, useState } from 'react'

import { CommentContext } from '@/CommentContext/CommentContext'
import { AnswerContext } from '@/AnswersContext/AnswersContext'
import type { ICommentAnswers } from '@/src/types/LikeTypes'

import AnswerList from '../AnswerList/AnswerList'

const BaseAnswerComponent = dynamic(() => import('../Base/BaseAnswerAndComment'), {
   loading: () => <h1>BaseAnswerComponent TÖLT</h1>,
})

const SingleAnswer: React.FC<{ answer: ICommentAnswers }> = ({ answer }) => {
   const {
      commentReducer: {
         postId,
         singleComment: { _id },
      },
   } = useContext(CommentContext)
   const { getAnswerReplies } = useContext(AnswerContext)
   const [childAnswers, setChildAnswers] = useState<ICommentAnswers[] | null>(null)

   useEffect(() => {
      setChildAnswers(getAnswerReplies(answer._id))
   }, [answer.parentCommentId, getAnswerReplies, answer._id])

   return (
      <BaseAnswerComponent
         answer={answer}
         commentId={_id}
         postId={postId}
         isChild={true}
         isChildComment={true}
      >
         {childAnswers ? <AnswerList answer={childAnswers} /> : <></>}
      </BaseAnswerComponent>
   )
}

export default SingleAnswer
