import Image from 'next/image'
import dynamic from 'next/dynamic'
import type { IMessages } from '@/Chat/Types'

import { StyledTextContainer, StyledTextBox } from './Styles'
import Typography from '@mui/material/Typography'

const MessageItemHead = dynamic(() => import('./Includes/MessageItemHead'))

const MessageItem: React.FC<{
   message: IMessages
   isRightContent?: boolean
}> = ({ message, isRightContent = false }) => {
   return (
      <StyledTextContainer isRightContent={isRightContent}>
         <MessageItemHead isRightContent={isRightContent} msgCreatedAt={message.createdAt} />
         {message.image.length > 1 && (
            <div
               style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: isRightContent ? 'end' : 'start',
               }}
            >
               <Image
                  style={{ objectFit: 'cover' }}
                  src={message.image}
                  alt='Message image'
                  width={300}
                  height={250}
               />
            </div>
         )}
         {message.message.length !== 0 && (
            <StyledTextBox isRightContent={isRightContent}>
               <Typography fontWeight={350} fontSize={13} variant='caption'>
                  {message.message}
               </Typography>
            </StyledTextBox>
         )}
      </StyledTextContainer>
   )
}

export default MessageItem
