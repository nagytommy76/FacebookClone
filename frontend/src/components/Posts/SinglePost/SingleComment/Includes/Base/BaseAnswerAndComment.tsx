import dynamic from 'next/dynamic'
import moment from 'moment'
import type { ICommentAnswers } from '@/src/types/LikeTypes'

import useMoment from '@/src/hooks/useMoment'
import useCreateAnswer from '../Hooks/useCreateAnswer'

import {
   StyledCommentContainer,
   StyledCommentPaper,
   StyledListElement,
   StyledProfileImage,
} from '../../Styles'
import { CommentFooterStyle, StyledCommentAnswerButton } from '../FooterSection/Styles'
import Collapse from '@mui/material/Collapse'
import Tooltip from '@mui/material/Tooltip'

const Reactions = dynamic(() => import('../Reatcions/Reactions'))
const Likes = dynamic(() => import('../../../Like/Like'))
const AddCommentBase = dynamic(() => import('@/src/components/Base/AddComment/AddCommentBase'))

const BaseAnswerAndComment: React.FC<{
   answer: ICommentAnswers
   children: React.ReactNode
   postId: string
}> = ({ answer, children, postId }) => {
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
            {children}
         </StyledListElement>
      </StyledCommentContainer>
   )
}

export default BaseAnswerAndComment
