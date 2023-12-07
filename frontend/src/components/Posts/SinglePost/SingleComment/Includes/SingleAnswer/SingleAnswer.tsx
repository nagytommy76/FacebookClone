import dynamic from 'next/dynamic'
import React, { useContext, useEffect, useState } from 'react'
import useAnswer from '../Hooks/useAnswer'

import { CommentContext } from '@/CommentContext/CommentContext'
import { AnswerContext } from '@/AnswersContext/AnswersContext'
import type { ICommentAnswers } from '@/src/types/LikeTypes'

import Collapse from '@mui/material/Collapse'
import AnswerList from '../AnswerList/AnswerList'

const BaseAnswerComponent = dynamic(() => import('../Base/BaseAnswerAndComment'), {
   loading: () => <h1>BaseAnswerComponent TÖLT</h1>,
})
const AddCommentBase = dynamic(() => import('../Base/AddComment/AddCommentBase'))

const SingleAnswer: React.FC<{ answer: ICommentAnswers }> = ({ answer }) => {
   const {
      saveAnswerMutate,
      updateCommentMutate,
      handleUpdateCommentAnswerMutate,
      handleChangeText,
      handleSetOpenForUpdate,
      handleChangeTextWithEmoji,
      setImagePath,
      handleSetOpen,
      imagePath,
      isOpen,
      text,
      isSendDisabled,
      isUpdate,
      isError,
      reference,
   } = useAnswer(answer.commentDepth, answer._id)
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
         handleSetOpen={handleSetOpen}
         handleSetOpenForUpdate={handleSetOpenForUpdate}
         isError={isError}
         isUpdate={isUpdate}
         commentId={_id}
         postId={postId}
         isChild={true}
         isChildComment={true}
         AddComment={
            <Collapse in={isOpen} timeout={100}>
               <AddCommentBase
                  isChildComment={true}
                  handleChangeTextWithEmoji={handleChangeTextWithEmoji}
                  handleChangeText={handleChangeText}
                  setCommentImagePath={setImagePath}
                  updateCommentMutate={updateCommentMutate}
                  handleSendCommentAnswer={saveAnswerMutate}
                  handleUpdateCommentAnswerMutate={handleUpdateCommentAnswerMutate}
                  handleAddSinglePostComment={() => {}}
                  commentImagePath={imagePath}
                  reference={reference}
                  commentText={text}
                  isUpdate={isUpdate}
                  isSendDisabled={isSendDisabled}
               />
            </Collapse>
         }
      >
         {childAnswers ? <AnswerList answer={childAnswers} /> : <></>}
      </BaseAnswerComponent>
   )
}

export default SingleAnswer
