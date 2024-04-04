import dynamic from 'next/dynamic'
import { useAppDispatch, useAppSelector } from '@/reduxStore/store'
import { setTabValue } from '@/reduxStore/slices/ChatSlice'

import { StyledChatAside, StyledTab, StyledTabList } from './Styles'

const TabLabel = dynamic(() => import('../TabLabel/TabLabel'))

const ChatAside = () => {
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)
   const dispatch = useAppDispatch()

   return (
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
   )
}

export default ChatAside
