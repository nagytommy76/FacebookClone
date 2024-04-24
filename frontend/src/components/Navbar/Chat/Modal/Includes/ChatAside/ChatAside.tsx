import dynamic from 'next/dynamic'
import { useAppDispatch, useAppSelector } from '@/reduxStore/store'
import { setChatId, setSelectedChatWithUserId } from '@/reduxStore/slices/ChatSlice'
import { selectLastMessageById } from '@/reduxStore/slices/ChatSlice'

import { StyledChatAside, StyledTab, StyledTabList } from './Styles'

const TabLabel = dynamic(() => import('./TabLabel/TabLabel'))

const ChatAside = () => {
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)
   const dispatch = useAppDispatch()
   const lastMessageById = useAppSelector(selectLastMessageById)

   const onChangeFunction = (event: React.SyntheticEvent, newValue: string) => {
      messageLabels && dispatch(setSelectedChatWithUserId(messageLabels[newValue].chatWithParticipant._id))
      dispatch(setChatId(newValue))
   }

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
                        />
                     }
                  />
               ))}
         </StyledTabList>
      </StyledChatAside>
   )
}

export default ChatAside
