import dynamic from 'next/dynamic'
import React, { useContext, useEffect, useState } from 'react'

import { CommentContext } from '../../Context/CommentContext'
import type { ICommentAnswers } from '@/src/types/LikeTypes'

import AnswerList from '../AnswerList/AnswerList'

const BaseAnswerComponent = dynamic(() => import('../Base/BaseAnswerAndComment'), {
   loading: () => <h1>BaseAnswerComponent TÖLT</h1>,
})

const SingleAnswer: React.FC<{ answer: ICommentAnswers }> = ({ answer }) => {
   const {
      commentReducer: { postId },
      getAnswerReplies,
   } = useContext(CommentContext)
   const [childAnswers, setChildAnswers] = useState<ICommentAnswers[] | null>(null)

   useEffect(() => {
      setChildAnswers(getAnswerReplies(answer._id))
   }, [answer.parentCommentId, getAnswerReplies, answer._id])

   return (
      <BaseAnswerComponent answer={answer} postId={postId}>
         {childAnswers ? <AnswerList answer={childAnswers} /> : <></>}
      </BaseAnswerComponent>
   )
}

export default SingleAnswer
