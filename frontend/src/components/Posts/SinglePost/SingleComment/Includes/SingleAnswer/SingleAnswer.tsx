import React, { useContext, useEffect } from 'react'
import moment from 'moment'

import useMoment from '../../Hooks/useMoment'
import useCreateAnswer from '../Hooks/useCreateAnswer'

import { CommentContext } from '../../Context/CommentContext'
import type { ICommentAnswers } from '@/src/types/LikeTypes'

import {
   StyledCommentPaper,
   StyledProfileImage,
   StyledCommentContainer,
   StyledListElement,
} from '../../Styles'
import { CommentFooterStyle, StyledCommentAnswerButton } from '../FooterSection/Styles'
import Collapse from '@mui/material/Collapse'
import Tooltip from '@mui/material/Tooltip'

import Likes from '../../../Like/Like'
import AddCommentBase from '@/src/components/Base/AddComment/AddCommentBase'
import Reactions from '../Reatcions/Reactions'

const SingleAnswer: React.FC<{ answer: ICommentAnswers }> = ({ answer }) => {
   const {
      commentReducer: { postId },
      getAnswerReplies,
   } = useContext(CommentContext)
   const currentTime = useMoment(answer.answeredAt)
   const {
      answerText,
      isAnswerOpen,
      isSendDisabled,
      reference,
      answerMutate,
      handleChangeText,
      handleSetAnswerOpen,
   } = useCreateAnswer(answer.commentDepth + 1, answer._id)

   useEffect(() => {
      console.log(getAnswerReplies(answer._id))
   }, [answer._id, getAnswerReplies])

   return (
      <StyledCommentContainer>
         <StyledListElement>
            <StyledProfileImage
               src={answer.userId.userDetails.profilePicturePath[0].path}
               alt='profil'
               width={20}
               height={20}
            />
            <StyledCommentPaper key={answer._id}>
               <p>{answer.comment}</p>
               <Reactions likes={answer.likes as []} />
            </StyledCommentPaper>
            <CommentFooterStyle>
               <Likes commentId={answer._id} isPostLike={false} postId={postId} postLikes={answer.likes}>
                  <StyledCommentAnswerButton onClick={handleSetAnswerOpen}>Válasz</StyledCommentAnswerButton>
               </Likes>
               <Tooltip arrow title={moment(answer.answeredAt).format('YYYY MMMM D dddd, kk:mm')}>
                  <span>{currentTime}</span>
               </Tooltip>
            </CommentFooterStyle>
            <Collapse in={isAnswerOpen} timeout={100}>
               <AddCommentBase
                  reference={reference as React.MutableRefObject<null>}
                  handleSendComment={() => {
                     answerMutate()
                  }}
                  commentText={answerText}
                  handleChangeText={handleChangeText}
                  isSendDisabled={isSendDisabled}
               />
            </Collapse>
            <p>IDE JÖN AZ ANSWERLIST COMPONENT A CHILD REPLIES-AL</p>
         </StyledListElement>
      </StyledCommentContainer>
   )
}

export default SingleAnswer
