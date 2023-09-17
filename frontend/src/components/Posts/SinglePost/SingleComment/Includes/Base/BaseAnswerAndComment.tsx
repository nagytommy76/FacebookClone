import dynamic from 'next/dynamic'
import type { ICommentAnswers, IPostComment } from '@/src/types/LikeTypes'

import useAnswer from '../Hooks/useAnswer'

import { StyledRightContainer } from './Styles/Styles'
import { StyledCommentContainer, StyledListElement, StyledRightSide } from './Styles/ContainerStyles'
import Collapse from '@mui/material/Collapse'

import Options from './Includes/Options/Options'
const LeftSide = dynamic(() => import('./Includes/LeftImageSide/LeftImage'))
const CommentBody = dynamic(() => import('./Includes/CommentBody/CommentBody'))
const CommentFooter = dynamic(() => import('./Includes/CommentFooter/CommentFooter'))
const AddCommentBase = dynamic(() => import('./AddComment/AddCommentBase'))

// Erre a mappa szintre áthozni a style-okat

const BaseAnswerAndComment: React.FC<{
   answer: ICommentAnswers | IPostComment
   children: React.ReactNode
   postId: string
   isChildComment: boolean
   isChild?: boolean
}> = ({ answer, children, postId, isChild = false, isChildComment = false }) => {
   const functionParams = answer.hasOwnProperty('commentDepth')
      ? [answer.commentDepth + 1, answer._id]
      : [1, null]
   const {
      isUpdate,
      answerText,
      isAnswerOpen,
      isSendDisabled,
      reference,
      saveAnswerMutate,
      updateCommentMutate,
      handleChangeText,
      handleSetAnswerOpen,
      handleSetAnswerOpenForUpdate,
      handleUpdateCommentAnswerMutate,
   } = useAnswer(functionParams[0], functionParams[1])
   // Az isChildComment-et fel tudom használni, hogy eldöntsem answer-ről van-e szó, és úgy tudom módosítani
   return (
      <StyledCommentContainer isChildComment={isChildComment}>
         <StyledListElement>
            <LeftSide
               isChild={isChild}
               profilePicturePath={answer.userId.userDetails.profilePicturePath[0].path}
            />
            <StyledRightSide>
               <StyledRightContainer>
                  <CommentBody
                     answerId={answer._id}
                     comment={answer.comment}
                     likes={answer.likes}
                     postId={postId}
                  />
                  <Options
                     handleSetAnswerOpenForUpdate={() => handleSetAnswerOpenForUpdate(answer.comment)}
                     isChildComment={isChildComment}
                     answeredUserId={answer.userId._id}
                     commentId={answer._id}
                  />
               </StyledRightContainer>
               <CommentFooter
                  answerId={answer._id}
                  answeredAt={answer.answeredAt}
                  handleSetAnswerOpen={handleSetAnswerOpen}
                  likes={answer.likes}
                  postId={postId}
               />
               <Collapse in={isAnswerOpen} timeout={100}>
                  <AddCommentBase
                     handleUpdateCommentAnswerMutate={handleUpdateCommentAnswerMutate}
                     updateCommentMutate={updateCommentMutate}
                     handleSendCommentAnswer={saveAnswerMutate}
                     handleAddSinglePostComment={() => {}}
                     handleChangeText={handleChangeText}
                     commentAnswerId={answer._id}
                     reference={reference as React.MutableRefObject<null>}
                     commentText={answerText}
                     isUpdate={isUpdate}
                     isChildComment={isChildComment}
                     isSendDisabled={isSendDisabled}
                  />
               </Collapse>
               {children}
            </StyledRightSide>
         </StyledListElement>
      </StyledCommentContainer>
   )
}

export default BaseAnswerAndComment
