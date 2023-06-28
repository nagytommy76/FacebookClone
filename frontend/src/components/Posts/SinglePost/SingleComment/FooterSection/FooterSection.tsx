import React, { useContext, useState, useRef } from 'react'
import { CommentContext } from '../Context/CommentContext'
import useMoment from '../Hooks/useMoment'
import moment from 'moment'

import Tooltip from '@mui/material/Tooltip'
import { CommentFooterStyle, StyledCommentAnswerButton } from './Styles'
import Collapse from '@mui/material/Collapse'

import Likes from '../../Like/Like'
import AddCommentBase from '@/src/components/Base/AddComment/AddCommentBase'

const FooterSection: React.FC<{
   postId: string
}> = ({ postId }) => {
   const {
      commentReducer: { singleComment },
   } = useContext(CommentContext)
   const currentTime = useMoment(singleComment.answeredAt)
   const reference = useRef<null | HTMLInputElement>(null)
   const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false)
   const [answerText, setAnswerText] = useState<string>('')
   const [isSendDisabled, setIsSendDisabled] = useState<boolean>(true)

   const handleSetAnswerOpen = () => {
      setIsAnswerOpen(true)
      // Azért kell, hogy miután kinyílik a collapse, az után állítsa be.
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
      <>
         <CommentFooterStyle>
            <Likes
               commentId={singleComment._id}
               isPostLike={false}
               postId={postId}
               postLikes={singleComment.likes}
            >
               <StyledCommentAnswerButton onClick={handleSetAnswerOpen}>Válasz</StyledCommentAnswerButton>
            </Likes>
            <Tooltip arrow title={moment(singleComment.answeredAt).format('YYYY MMMM D dddd, kk:mm')}>
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
      </>
   )
}

export default FooterSection
