import React from 'react'
import dynamic from 'next/dynamic'
import moment from 'moment'

import { StyledTextContainer, StyledTextBox, StyledTextBoxHead } from './Styles'
import Typography from '@mui/material/Typography'

const ChatAvatar = dynamic(() => import('@/Base/ChatAvatar/ChatAvatar'))

const MessageItem: React.FC<{
   message: {
      _id: string
      createdAt: string
      updatedAt: string
      isRead: boolean
      userId: string
      message: string
      image: string
   }
   isRightContent?: boolean
}> = ({ message, isRightContent = false }) => {
   return (
      <StyledTextContainer isRightContent={isRightContent}>
         <StyledTextBoxHead isRightContent={isRightContent}>
            <Typography variant='caption'>{moment(message.createdAt).format('MMM D ddd h:mm')}</Typography>
            <ChatAvatar
               isRead={true}
               fullName='Saját Neve'
               selectedProfilePicturePath={message.image}
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
