import React from 'react'
import dynamic from 'next/dynamic'
import moment from 'moment'
import { useAppSelector } from '@/reduxStore/store'
import type { IMessages } from '@/Chat/Types'

import { StyledTextContainer, StyledTextBox, StyledTextBoxHead } from './Styles'
import Typography from '@mui/material/Typography'

const ChatAvatar = dynamic(() => import('@/Base/ChatAvatar/ChatAvatar'))

const MessageItem: React.FC<{
   message: IMessages
   isRightContent?: boolean
}> = ({ message, isRightContent = false }) => {
   const loggedInUserImg = useAppSelector((state) => state.auth.currentImage)
   const chatId = useAppSelector((state) => state.chat.chatId)
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)
   const chatWithParticipantImage =
      messageLabels && chatId && messageLabels[chatId].chatWithParticipant.selectedProfilePicture[0].path

   return (
      <StyledTextContainer isRightContent={isRightContent}>
         <StyledTextBoxHead isRightContent={isRightContent}>
            <Typography variant='caption'>{moment(message.createdAt).format('MMM D ddd H:mm')}</Typography>
            <ChatAvatar
               isRead={true}
               fullName='Saját Neve'
               selectedProfilePicturePath={
                  isRightContent ? loggedInUserImg.path : chatWithParticipantImage || ''
               }
               width={30}
               height={30}
            />
         </StyledTextBoxHead>
         <StyledTextBox isRightContent={isRightContent}>
            <Typography fontWeight={350} variant='caption'>
               {message.message}
            </Typography>
         </StyledTextBox>
      </StyledTextContainer>
   )
}

export default MessageItem
