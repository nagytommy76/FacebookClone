import dynamic from 'next/dynamic'
import { useAppSelector } from '@/reduxStore/store'
import { selectLastMessageById } from '@/reduxStore/slices/ChatSlice'
import useChangeFunction from './Hooks/useChangeFunction'

import { StyledChatAside, StyledTab, StyledTabList } from './Styles'

const TabLabel = dynamic(() => import('./TabLabel/TabLabel'))

const ChatAside = () => {
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)
   const lastMessageById = useAppSelector(selectLastMessageById)
   const onChangeFunction = useChangeFunction()

   return (
      <StyledChatAside>
         <StyledTabList
            variant='scrollable'
            indicatorColor='primary'
            orientation='vertical'
            onChange={onChangeFunction}
            aria-label='lab API tabs example'
         >
            {messageLabels &&
               Object.values(messageLabels).map((value) => (
                  <StyledTab
                     key={value._id}
                     value={value._id}
                     label={
                        <TabLabel
                           participant={value.chatWithParticipant}
                           captionText={lastMessageById[value._id]}
                           totalUnreadMsgCount={value.totalUnreadMsgCount}
                        />
                     }
                  />
               ))}
         </StyledTabList>
      </StyledChatAside>
   )
}

export default ChatAside
