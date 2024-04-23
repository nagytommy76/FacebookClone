import dynamic from 'next/dynamic'
import { useAppDispatch, useAppSelector } from '@/reduxStore/store'
import { setChatModalOpen } from '@/reduxStore/slices/ChatSlice'

import { StyledPaper } from './Styles'
import Modal from '@mui/material/Modal'
import TabContext from '@mui/lab/TabContext'

const ChatAside = dynamic(() => import('./Includes/ChatAside/ChatAside'))
const ChatMessages = dynamic(() => import('./Includes/ChatMessages/ChatMessages'))

const ChatModal = () => {
   const chatModalOpen = useAppSelector((state) => state.chat.isChatModalOpen)
   const chatId = useAppSelector((state) => state.chat.chatId)
   const dispatch = useAppDispatch()

   return (
      <Modal
         open={chatModalOpen}
         onClose={() => dispatch(setChatModalOpen(false))}
         aria-labelledby='modal-chat'
         aria-describedby='modal-modal-chat'
      >
         <StyledPaper>
            <TabContext value={chatId || ''}>
               <ChatAside />
               <ChatMessages />
            </TabContext>
         </StyledPaper>
      </Modal>
   )
}

export default ChatModal
