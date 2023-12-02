import dynamic from 'next/dynamic'
import type { ICommentAnswers, IPostComment } from '@/src/types/LikeTypes'

import useAnswer from '../Hooks/useAnswer'

import { StyledRightContainer } from './Styles/Styles'
import { StyledCommentContainer, StyledListElement, StyledRightSide } from './Styles/ContainerStyles'
import Collapse from '@mui/material/Collapse'

import LeftSideSkeleton from '@/Skeletons/Comments/Includes/LeftSideSkeleton'
import BodySkeleton from '@/src/skeletons/Comments/Includes/BodySkeleton'
import FooterSkeleton from '@/src/skeletons/Comments/Includes/FooterSkeleton'

import Options from './Includes/Options/Options'
import ErrorSnackbar from './Includes/Error/ErrorSnackbar'
const LeftSide = dynamic(() => import('./Includes/LeftImageSide/LeftImage'), {
   loading: () => <LeftSideSkeleton />,
})
const CommentBody = dynamic(() => import('./Includes/CommentBody/CommentBody'), {
   loading: () => <BodySkeleton />,
})
const CommentFooter = dynamic(() => import('./Includes/CommentFooter/CommentFooter'), {
   loading: () => <FooterSkeleton />,
})
const AddCommentBase = dynamic(() => import('./AddComment/AddCommentBase'))
const CommentImage = dynamic(() => import('./Includes/CommentImage/CommentImage'))
// Erre a mappa szintre áthozni a style-okat

const BaseAnswerAndComment: React.FC<{
   commentId?: string
   answer: ICommentAnswers | IPostComment
   children: React.ReactNode
   postId: string
   isChildComment: boolean
   isChild?: boolean
}> = ({ commentId, answer, children, postId, isChild = false, isChildComment = false }) => {
   const functionParams = answer.hasOwnProperty('commentDepth')
      ? [answer.commentDepth + 1, answer._id]
      : [1, null]
   const {
      isError,
      isUpdate,
      answerText,
      isAnswerOpen,
      isSendDisabled,
      reference,
      commentImagePath,
      setCommentImagePath,
      saveAnswerMutate,
      updateCommentMutate,
      handleChangeText,
      handleSetAnswerOpen,
      handleSetAnswerOpenForUpdate,
      handleUpdateCommentAnswerMutate,
      handleChangeTextWithEmoji,
   } = useAnswer(functionParams[0], functionParams[1])
   // Az isChildComment-et fel tudom használni, hogy eldöntsem answer-ről van-e szó, és úgy tudom módosítani
   return (
      <>
         <StyledCommentContainer isChildComment={isChildComment}>
            <StyledListElement>
               <LeftSide
                  isChild={isChild}
                  profilePicturePath={answer.userId.userDetails.profilePicturePath[0].path}
               />
               <StyledRightSide>
                  <StyledRightContainer>
                     <CommentBody
                        commentId={commentId}
                        answerId={answer._id}
                        comment={answer.comment}
                        likes={answer.likes}
                        postId={postId}
                        isChildComment={isChildComment}
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
                     isChildComment={isChildComment}
                  />
                  <CommentImage commentImage={answer.commentImage} isUpdateActive={isUpdate} />
                  <Collapse in={isAnswerOpen} timeout={100}>
                     <AddCommentBase
                        handleUpdateCommentAnswerMutate={handleUpdateCommentAnswerMutate}
                        updateCommentMutate={updateCommentMutate}
                        handleSendCommentAnswer={saveAnswerMutate}
                        handleChangeTextWithEmoji={handleChangeTextWithEmoji}
                        handleAddSinglePostComment={() => {}}
                        handleChangeText={handleChangeText}
                        commentImagePath={commentImagePath}
                        setCommentImagePath={setCommentImagePath}
                        commentAnswerId={answer._id}
                        reference={reference}
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
         <ErrorSnackbar isError={isError} />
      </>
   )
}

export default BaseAnswerAndComment
