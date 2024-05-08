import dynamic from 'next/dynamic'
import type { IMessages } from '@/Chat/Types'

import { StyledTextContainer, StyledTextBox, StyledTextBoxContainer } from './Styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

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
                  {isRightContent && (
                     <IconButton aria-label='delete' size='small'>
                        <MoreHorizIcon fontSize='inherit' />
                     </IconButton>
                  )}
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
