import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useAppSelector } from '@/reduxStore/store'
import { selectAllUnreadMessageCount } from '@/reduxStore/slices/ChatSlice'

import useOpenState from './Hooks/useOpenState'
import useFillMessageLabels from './Hooks/useFillMessageLabels'

import Badge from '@mui/material/Badge'
import Fab from '@mui/material/Fab'
import ChatIcon from '@/assets/bubble-chat.png'
import { StyledButtonContainer, CustomizedTooltip } from './Styles'

const ChatModal = dynamic(() => import('../Modal/ChatModal'))

const ChatButton = () => {
   const allUnreadMsgCount = useAppSelector(selectAllUnreadMessageCount)
   const { handleOpen } = useOpenState()
   useFillMessageLabels()

   return (
      <>
         <StyledButtonContainer>
            <CustomizedTooltip title='Chat' placement='top'>
               <Badge
                  anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'left',
                  }}
                  color='error'
                  badgeContent={allUnreadMsgCount}
                  max={9}
               >
                  <Fab
                     aria-haspopup='true'
                     onClick={handleOpen}
                     sx={{ width: 60, height: 60 }}
                     color='primary'
                     aria-label='chat'
                     size='large'
                  >
                     <Image src={ChatIcon} alt='Chat Icon Button' width={50} height={50} />
                  </Fab>
               </Badge>
            </CustomizedTooltip>
         </StyledButtonContainer>
         <ChatModal />
      </>
   )
}

export default ChatButton
