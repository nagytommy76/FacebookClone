import dynamic from 'next/dynamic'
import { useAppSelector } from '@/src/utils/redux/store'

import { StyledChatMessagesContainer, StyledTabPanel } from './Styles'

const MessgageBox = dynamic(() => import('./Includes/MessageBox/MessgageBox'))
const Profile = dynamic(() => import('./Includes/MessageBox/Profile/Profile'))

const ChatMessages = () => {
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)

   return (
      <StyledChatMessagesContainer>
         {messageLabels ? (
            Object.values(messageLabels).map((value) => (
               <StyledTabPanel sx={{ height: '100%' }} key={value._id} value={value._id}>
                  <MessgageBox
                     ProfileSection={
                        <Profile
                           chatFirendId={value.chatWithParticipant._id}
                           fullName={`${value.chatWithParticipant.firstName} ${value.chatWithParticipant.sureName}`}
                           selectedProfilePicturePath={
                              value.chatWithParticipant.selectedProfilePicture[0].path
                           }
                        />
                     }
                  />
               </StyledTabPanel>
            ))
         ) : (
            <h1>Nincs még aktív chat</h1>
         )}
      </StyledChatMessagesContainer>
   )
}

export default ChatMessages
