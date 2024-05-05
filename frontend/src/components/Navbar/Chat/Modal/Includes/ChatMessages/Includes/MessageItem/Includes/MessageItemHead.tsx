import moment from 'moment'
import dynamic from 'next/dynamic'
import { useAppSelector } from '@/reduxStore/store'

import { StyledTextBoxHead } from '../Styles'
import Typography from '@mui/material/Typography'

const ChatAvatar = dynamic(() => import('@/Base/ChatAvatar/ChatAvatar'))

const MessageItemHead: React.FC<{
   isRightContent?: boolean
   msgCreatedAt?: string
}> = ({ msgCreatedAt, isRightContent = false }) => {
   const loggedInUserImg = useAppSelector((state) => state.auth.currentImage)
   const chatId = useAppSelector((state) => state.chat.chatId)
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)

   const chatWithParticipantImage =
      messageLabels && chatId && messageLabels[chatId].chatWithParticipant.selectedProfilePicture[0].path

   return (
      <StyledTextBoxHead isRightContent={isRightContent}>
         <Typography variant='caption'>{moment(msgCreatedAt).format('MMM D ddd H:mm')}</Typography>
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
   )
}

export default MessageItemHead
