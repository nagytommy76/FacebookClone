import dynamic from 'next/dynamic'
import React, { useContext } from 'react'
import { CommentContext } from '@/CommentContext/CommentContext'
import { AnswerContext } from '@/AnswersContext/AnswersContext'
import useComment from './Includes/Hooks/useComment'

import Collapse from '@mui/material/Collapse'
import SingleCommentSkeleton from '@/Skeletons/Comments/SingleComment'

const BaseCommentComponent = dynamic(() => import('./Includes/Base/BaseAnswerAndComment'), {
   loading: () => <SingleCommentSkeleton />,
})
const AnswerList = dynamic(() => import('./Includes/AnswerList/AnswerList'))
const OpenCommentAnswer = dynamic(() => import('./Includes/OpenCommentAnswers/OpenCommentAnswers'))
const AddCommentBase = dynamic(() => import('./Includes/Base/AddComment/AddCommentBase'))

const SingleComment = () => {
   const {
      isSendDisabled,
      reference,
      imagePath,
      isUpdate,
      isError,
      isOpen,
      text,
      setImagePath,
      handleSetOpen,
      handleChangeText,
      handleSetOpenForUpdate,
      handleChangeTextWithEmoji,
      updateCommentMutate,
      saveAnswerMutate,
   } = useComment()
   const {
      commentReducer: { singleComment, postId },
   } = useContext(CommentContext)
   const { parentRootAnswers } = useContext(AnswerContext)

   return (
      <BaseCommentComponent
         isError={isError}
         isUpdate={isUpdate}
         handleSetOpenForUpdate={handleSetOpenForUpdate}
         handleSetOpen={handleSetOpen}
         answer={singleComment}
         postId={postId}
         isChild={singleComment.commentAnswers && singleComment.commentAnswers?.length > 0}
         isChildComment={false}
         AddComment={
            <Collapse in={isOpen} timeout={100}>
               <AddCommentBase
                  handleChangeTextWithEmoji={handleChangeTextWithEmoji}
                  handleChangeText={handleChangeText}
                  setCommentImagePath={setImagePath}
                  updateCommentMutate={updateCommentMutate}
                  handleSendCommentAnswer={saveAnswerMutate}
                  handleUpdateCommentAnswerMutate={() => {}}
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
