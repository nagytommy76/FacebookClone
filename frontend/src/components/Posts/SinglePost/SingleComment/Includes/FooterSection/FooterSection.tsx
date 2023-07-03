import React, { useContext } from 'react'
import { CommentContext } from '../../Context/CommentContext'
import moment from 'moment'
import useMoment from '../../Hooks/useMoment'
import useCreateAnswer from '../Hooks/useCreateAnswer'

import { CommentFooterStyle, StyledCommentAnswerButton } from './Styles'
import Tooltip from '@mui/material/Tooltip'
import Collapse from '@mui/material/Collapse'

import Likes from '../../../Like/Like'
// import SingleAnswer from '../SingleAnswer/SingleAnswer'
import AddCommentBase from '@/src/components/Base/AddComment/AddCommentBase'
import AnswerList from '../AnswerList/AnswerList'

const FooterSection = () => {
   const {
      commentReducer: { singleComment, postId },
   } = useContext(CommentContext)
   const currentTime = useMoment(singleComment.answeredAt)
   const {
      answerMutate,
      answerText,
      isAnswerOpen,
      isSendDisabled,
      reference,
      handleChangeText,
      handleSetAnswerOpen,
   } = useCreateAnswer(1, null)

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
               handleSendComment={() => {
                  answerMutate()
               }}
               commentText={answerText}
               handleChangeText={handleChangeText}
               isSendDisabled={isSendDisabled}
            />
         </Collapse>
         {singleComment.commentAnswers ? <AnswerList answer={singleComment.commentAnswers} /> : <></>}
         {/* {singleComment.commentAnswers !== undefined ? (
            singleComment.commentAnswers.map((answer) => <SingleAnswer key={answer._id} answer={answer} />)
         ) : (
            <></>
         )} */}
      </>
   )
}

export default FooterSection
