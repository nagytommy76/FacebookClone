import React, { MutableRefObject } from 'react'
import Image from 'next/image'
import FacebookProfile from '@/assets/facebook-profile.jpg'

import { ChatMenuContainer } from '../Styles'
import Fade from '@mui/material/Fade'

import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

const ChatMenu: React.FC<{ anchorEl: HTMLElement | null; isOpen: boolean; handleClose: () => void }> = ({
   anchorEl,
   isOpen,
   handleClose,
}) => {
   return (
      <ChatMenuContainer
         anchorEl={anchorEl}
         open={isOpen}
         onClose={handleClose}
         TransitionComponent={Fade}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
         }}
         transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
         }}
      >
         <Typography variant='h4' align='center' letterSpacing={4} gutterBottom>
            Chat
         </Typography>
         <Typography gutterBottom>Ide jönnek az aktív Chatek</Typography>
         <MenuItem>
            <Image
               style={{ borderRadius: '50%', marginRight: 8 }}
               src={FacebookProfile}
               alt='NAME image'
               width={50}
               height={50}
            />
            Chat valakivel
         </MenuItem>
      </ChatMenuContainer>
   )
}

export default ChatMenu
