import dynamic from 'next/dynamic'
import { useAppDispatch, useAppSelector } from '@/reduxStore/store'
import { setChatModalOpen, setTabValue } from '@/reduxStore/slices/ChatSlice'

import { StyledTab, StyledTabList, StyledPaper, StyledChatAside, StyledChatMessagesContainer } from './Styles'
import Modal from '@mui/material/Modal'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

const TabLabel = dynamic(() => import('./Includes/TabLabel'))

const ChatModal = () => {
   const chatModalOpen = useAppSelector((state) => state.chat.isChatModalOpen)
   const tabValue = useAppSelector((state) => state.chat.tabValue)
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)
   const dispatch = useAppDispatch()
   return (
      <Modal
         open={chatModalOpen}
         onClose={() => dispatch(setChatModalOpen(false))}
         aria-labelledby='modal-chat'
         aria-describedby='modal-modal-chat'
      >
         <StyledPaper>
            <TabContext value={tabValue}>
               <StyledChatAside>
                  <StyledTabList
                     variant='scrollable'
                     indicatorColor='primary'
                     orientation='vertical'
                     onChange={(event: React.SyntheticEvent, newValue: string) => {
                        dispatch(setTabValue(newValue))
                     }}
                     aria-label='lab API tabs example'
                  >
                     {messageLabels?.map((chatMenuItem) => (
                        <StyledTab
                           key={chatMenuItem._id}
                           value={chatMenuItem._id}
                           label={
                              <TabLabel
                                 captionText={chatMenuItem.captionText}
                                 fullName={chatMenuItem.fullName}
                                 selectedProfilePicturePath={chatMenuItem.selectedProfilePicturePath}
                              />
                           }
                        />
                     ))}
                  </StyledTabList>
               </StyledChatAside>
               <StyledChatMessagesContainer>
                  <TabPanel value='658569424d27aad220f6e887'>Teszt Béla</TabPanel>
                  <TabPanel value='64777ef1c3038faf5e1a41c6'>Teszt János</TabPanel>
               </StyledChatMessagesContainer>
            </TabContext>
         </StyledPaper>
      </Modal>
   )
}

export default ChatModal
