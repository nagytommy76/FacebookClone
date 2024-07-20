import dynamic from 'next/dynamic'
import { useAppSelector } from '@/reduxStore/store'
import { selectAllUnreadMessageCount } from '@/reduxStore/slices/ChatSlice'

import useOpenState from './Hooks/useOpenState'
import useFillMessageLabels from './Hooks/useFillMessageLabels'
import useCreateChatSocket from './Hooks/useCreateChatSocket'
import useSendMsgSocket from '../../Hooks/useSendMsgSocket'
import useDeleteChatSocket from './Hooks/useDeleteChatSocket'

import Badge from '@mui/material/Badge'
import ChatIcon from '@/assets/bubble-chat.png'
import { StyledButtonContainer, CustomizedTooltip, StyledFab, StyledFabImage } from './Styles'

const ChatModal = dynamic(() => import('../Modal/ChatModal'))

const ChatButton = () => {
   const allUnreadMsgCount = useAppSelector(selectAllUnreadMessageCount)
   const userLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
   const { handleOpen } = useOpenState()
   useFillMessageLabels()
   useCreateChatSocket()
   useSendMsgSocket()
   useDeleteChatSocket()

   return (
      <>
         {userLoggedIn === true && (
            <>
               <StyledButtonContainer>
                  <CustomizedTooltip title='Chat' placement='top'>
                     <Badge
                        anchorOrigin={{
                           vertical: 'top',
                           horizontal: 'left',
                        }}
                        color='error'
                        badgeContent={allUnreadMsgCount || 0}
                        max={9}
                     >
                        <StyledFab
                           aria-haspopup='true'
                           onClick={handleOpen}
                           color='primary'
                           aria-label='chat'
                           size='large'
                        >
                           <StyledFabImage src={ChatIcon} alt='Chat Icon Button' width={50} height={50} />
                        </StyledFab>
                     </Badge>
                  </CustomizedTooltip>
               </StyledButtonContainer>
               <ChatModal />
            </>
         )}
      </>
   )
}

export default ChatButton
