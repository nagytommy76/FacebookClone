import { useState } from 'react'
import moment from 'moment'
import dynamic from 'next/dynamic'
import type { IMessages } from '@/Chat/Types'

import { StyledTextContainer, StyledTextBox, StyledTextBoxContainer, StyledTypography } from './Styles'

import RemoveButton from './Includes/RemoveButton/RemoveButton'
import Reaction from './Includes/Reaction/Reaction'

import Fade from '@mui/material/Fade'
import Tooltip from '@mui/material/Tooltip'

const MsgReactionModal = dynamic(() => import('./Includes/MsgReactionModal/MsgReactionModal'))
const ImageDisplay = dynamic(() => import('./Includes/ImageDisplay'))
const MessageItemHead = dynamic(() => import('./Includes/SenderAvatar'))

const MessageItem: React.FC<{
   message: IMessages
   isRightContent?: boolean
}> = ({ message, isRightContent = false }) => {
   const [isReactionOpen, setIsReactionOpen] = useState<boolean>(false)

   return (
      <StyledTextContainer isRightContent={isRightContent}>
         {message.image.length > 1 && (
            <ImageDisplay imagePath={message.image} isRightContent={isRightContent} />
         )}
         {message.message.length !== 0 && (
            <Tooltip
               placement={isRightContent ? 'left' : 'right'}
               title={moment(message.createdAt).format('YYYY MMMM D k:mm:ss')}
            >
               <StyledTextBoxContainer
                  isRightContent={isRightContent}
                  onMouseEnter={() => setIsReactionOpen(true)}
                  onMouseLeave={() => setIsReactionOpen(false)}
               >
                  <Fade timeout={5} in={isReactionOpen}>
                     <div style={{ display: 'flex' }}>
                        <Reaction reactions={message.reaction} messageId={message._id} />
                        {isRightContent && (
                           <RemoveButton messageImage={message.image} messageId={message._id} />
                        )}
                     </div>
                  </Fade>
                  <StyledTextBox isRightContent={isRightContent}>
                     <StyledTypography variant='caption'>{message.message}</StyledTypography>
                  </StyledTextBox>
                  {!isRightContent && <MessageItemHead isRightContent={isRightContent} />}
               </StyledTextBoxContainer>
            </Tooltip>
         )}
         {message.reaction && <MsgReactionModal messageId={message._id} reactions={message.reaction} />}
      </StyledTextContainer>
   )
}

export default MessageItem
