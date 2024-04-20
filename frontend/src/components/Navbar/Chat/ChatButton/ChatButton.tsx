import Image from 'next/image'
import dynamic from 'next/dynamic'
import useOpenState from './Hooks/useOpenState'
import useFillMessageLabels from './Hooks/useFillMessageLabels'

import Fab from '@mui/material/Fab'
import ChatIcon from '@/assets/bubble-chat.png'

import { StyledButtonContainer, CustomizedTooltip } from './Styles'
const ChatModal = dynamic(() => import('../Modal/ChatModal'))

const ChatButton = () => {
   const { handleOpen } = useOpenState()
   useFillMessageLabels()

   return (
      <>
         <StyledButtonContainer>
            <CustomizedTooltip title='Chat' placement='top'>
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
            </CustomizedTooltip>
         </StyledButtonContainer>
         <ChatModal />
      </>
   )
}

export default ChatButton
