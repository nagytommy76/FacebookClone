import dynamic from 'next/dynamic'
import { useAppSelector } from '@/reduxStore/store'

const ChatAvatar = dynamic(() => import('@/Base/ChatAvatar/ChatAvatar'))

const SenderAvatar: React.FC<{
   isRightContent?: boolean
}> = ({ isRightContent = false }) => {
   const loggedInUserImg = useAppSelector((state) => state.auth.currentImage)
   const chatId = useAppSelector((state) => state.chat.chatId)
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)

   const chatWithParticipantImage =
      messageLabels && chatId && messageLabels[chatId].chatWithParticipant.selectedProfilePicture[0].path

   return (
      <ChatAvatar
         isRead={true}
         fullName='Saját Neve'
         selectedProfilePicturePath={isRightContent ? loggedInUserImg.path : chatWithParticipantImage || ''}
         width={35}
         height={35}
      />
   )
}

export default SenderAvatar
