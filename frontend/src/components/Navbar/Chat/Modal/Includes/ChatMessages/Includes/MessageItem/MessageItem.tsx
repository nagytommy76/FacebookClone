import dynamic from 'next/dynamic'
import type { IMessages } from '@/Chat/Types'

import { StyledTextContainer, StyledTextBox, StyledTextBoxContainer, StyledTypography } from './Styles'

import RemoveButton from './Includes/RemoveButton/RemoveButton'
import Reaction from './Includes/Reaction/Reaction'

const MsgReactionModal = dynamic(() => import('./Includes/MsgReactionModal/MsgReactionModal'))
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
                  <Reaction reactions={message.reaction} messageId={message._id} />
                  {isRightContent && <RemoveButton messageImage={message.image} messageId={message._id} />}
                  <StyledTextBox isRightContent={isRightContent}>
                     <StyledTypography variant='caption'>{message.message}</StyledTypography>
                  </StyledTextBox>
               </StyledTextBoxContainer>
            )}
            {message.reaction && <MsgReactionModal messageId={message._id} reactions={message.reaction} />}
         </StyledTextContainer>
      </>
   )
}

export default MessageItem
