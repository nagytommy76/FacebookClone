import React, { useContext, useRef, useState } from 'react'
import moment from 'moment'
import useMoment from '../../Hooks/useMoment'
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
   } = useContext(CommentContext)
   const reference = useRef<null | HTMLInputElement>(null)
   const [answerText, setAnswerText] = useState<string>('')
   const [isSendDisabled, setIsSendDisabled] = useState<boolean>(true)
   const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false)
   const currentTime = useMoment(answer.answeredAt)

   const handleSetAnswerOpen = () => {
      setIsAnswerOpen(true)
      setTimeout(() => {
         if (reference) reference.current?.focus()
      }, 200)
   }

   const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length === 0) setIsSendDisabled(true)
      else setIsSendDisabled(false)
      setAnswerText(event.target.value)
   }

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
                  handleSendComment={() => {}}
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
