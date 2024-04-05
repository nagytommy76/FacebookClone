import dynamic from 'next/dynamic'

import TabPanel from '@mui/lab/TabPanel'
import { StyledChatMessagesContainer } from './Styles'

const AddTextBase = dynamic(() => import('@/Base/AddTextBase/AddTextBase'))

const ChatMessages = () => {
   return (
      <StyledChatMessagesContainer>
         <TabPanel value='658569424d27aad220f6e887'>
            <div>
               <h1>Teszt Béla</h1>
               <AddTextBase
                  value=''
                  placeholderText='...'
                  setImagePath={() => {}}
                  onClickFunction={() => {}}
                  handleChangeValue={() => {}}
                  handleChangeValueWithEmoji={() => {}}
               />
            </div>
         </TabPanel>
         <TabPanel value='64777ef1c3038faf5e1a41c6'>Teszt János</TabPanel>
      </StyledChatMessagesContainer>
   )
}

export default ChatMessages
