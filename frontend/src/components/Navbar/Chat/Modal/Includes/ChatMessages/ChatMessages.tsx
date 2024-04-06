import dynamic from 'next/dynamic'
import { useAppSelector } from '@/src/utils/redux/store'

import TabPanel from '@mui/lab/TabPanel'
import { StyledChatMessagesContainer } from './Styles'

const MessgageBox = dynamic(() => import('./Includes/MessgageBox'))

const ChatMessages = () => {
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)

   return (
      <StyledChatMessagesContainer>
         {messageLabels?.map((message) => (
            <TabPanel key={message._id} value={message._id}>
               <MessgageBox
                  userData={{
                     _id: message._id,
                     fullName: message.fullName,
                     selectedProfilePicturePath: message.selectedProfilePicturePath,
                  }}
               />
            </TabPanel>
         ))}
      </StyledChatMessagesContainer>
   )
}

export default ChatMessages
