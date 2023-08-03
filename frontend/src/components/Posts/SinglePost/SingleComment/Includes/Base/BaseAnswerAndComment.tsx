import { useState } from 'react'
import dynamic from 'next/dynamic'
import moment from 'moment'
import type { ICommentAnswers, IPostComment } from '@/src/types/LikeTypes'

import useMoment from '@/src/hooks/useMoment'
import useCreateAnswer from '../Hooks/useCreateAnswer'
import useGetComment from '../Hooks/useGetComment'

import { StyledCommentPaper, CommentFooterStyle, StyledCommentAnswerButton } from './Styles/Styles'
import {
   StyledCommentContainer,
   StyledListElement,
   StyledRightSide,
   StyledLeftSide,
   HorizontalLineStyle,
} from './Styles/ContainerStyles'
import { StyledProfileImage } from '@/src/styles/BaseStyles'

import Collapse from '@mui/material/Collapse'
import Tooltip from '@mui/material/Tooltip'

const LikeModal = dynamic(() => import('../Reatcions/LikeModal/LikeModal'))
const Reactions = dynamic(() => import('../Reatcions/Reactions'))
const Likes = dynamic(() => import('../../../Like/Like'))
const AddCommentBase = dynamic(() => import('@/src/components/Base/AddComment/AddCommentBase'))

// Erre a mappa szintre áthozni a style-okat

const BaseAnswerAndComment: React.FC<{
   answer: ICommentAnswers | IPostComment
   children: React.ReactNode
   postId: string
   isChild?: boolean
}> = ({ answer, children, postId, isChild = false }) => {
   const currentTime = useMoment(answer.answeredAt)
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const functionParams = answer.hasOwnProperty('commentDepth')
      ? [answer.commentDepth + 1, answer._id]
      : [1, null]
   const { commentLikeCount } = useGetComment(answer._id, postId, isModalOpen)
   const {
      answerText,
      isAnswerOpen,
      isSendDisabled,
      reference,
      answerMutate,
      handleChangeText,
      handleSetAnswerOpen,
   } = useCreateAnswer(functionParams[0], functionParams[1])

   return (
      <StyledCommentContainer>
         <StyledListElement>
            <StyledLeftSide>
               <StyledProfileImage
                  src={answer.userId.userDetails.profilePicturePath[0].path}
                  alt='profil'
                  width={20}
                  height={20}
               />
               <HorizontalLineStyle isChildComment={isChild} />
            </StyledLeftSide>
            <StyledRightSide>
               <StyledCommentPaper key={answer._id}>
                  <p>{answer.comment}</p>
                  <Reactions likes={answer.likes as []} setIsModalOpen={setIsModalOpen}>
                     <LikeModal
                        isModalOpen={isModalOpen}
                        likeCount={commentLikeCount}
                        setIsModalOpen={setIsModalOpen}
                     />
                  </Reactions>
               </StyledCommentPaper>
               <CommentFooterStyle>
                  <Likes commentId={answer._id} isPostLike={false} postId={postId} postLikes={answer.likes}>
                     <StyledCommentAnswerButton onClick={handleSetAnswerOpen}>
                        Válasz
                     </StyledCommentAnswerButton>
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
            </StyledRightSide>
         </StyledListElement>
      </StyledCommentContainer>
   )
}

export default BaseAnswerAndComment
