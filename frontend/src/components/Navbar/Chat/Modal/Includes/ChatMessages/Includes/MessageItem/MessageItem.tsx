import dynamic from 'next/dynamic'
import type { IMessages } from '@/Chat/Types'

import { StyledTextContainer, StyledTextBox, StyledTextBoxContainer } from './Styles'
import Typography from '@mui/material/Typography'

import RemoveButton from './Includes/RemoveButton/RemoveButton'
import Reaction from './Includes/Reaction/Reaction'

const ImageDisplay = dynamic(() => import('./Includes/ImageDisplay'))
const MessageItemHead = dynamic(() => import('./Includes/MessageItemHead'))

const MessageItem: React.FC<{
   message: IMessages
   isRightContent?: boolean
}> = ({ message, isRightContent = false }) => {
   return (
      <>
         <StyledTextContainer isRightContent={isRightContent}>
            <MessageItemHead isRightContent={isRightContent} msgCreatedAt={message.createdAt} />
            {message.image.length > 1 && (
               <ImageDisplay imagePath={message.image} isRightContent={isRightContent} />
            )}
            {message.message.length !== 0 && (
               <StyledTextBoxContainer isRightContent={isRightContent}>
                  <Reaction messageId={message._id} />
                  {isRightContent && <RemoveButton messageId={message._id} />}
                  <StyledTextBox isRightContent={isRightContent}>
                     <Typography fontWeight={350} fontSize={13} variant='caption'>
                        {message.message}
                     </Typography>
                  </StyledTextBox>
               </StyledTextBoxContainer>
            )}
         </StyledTextContainer>
      </>
   )
}

export default MessageItem
