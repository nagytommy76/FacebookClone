import React, { useState } from 'react'

import ThemeSwitch from '../ThemeSwitch'
import AvatarIcon from './Includes/AvatarComponent'
import ImageAvatar from './Includes/ImageAvatar'
import Logout from './Includes/Logout'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'

const AvatarComponent = () => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const handleClose = () => {
      setAnchorEl(null)
   }

   return (
      <>
         <AvatarIcon setAnchorEl={setAnchorEl} />
         <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            PaperProps={{
               sx: {
                  width: 230,
               },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            <MenuItem onClick={handleClose}>
               <ImageAvatar />
            </MenuItem>
            <Divider />
            <Logout handleClose={handleClose} />
            <MenuItem disableRipple={true} disableTouchRipple={true}>
               <ThemeSwitch />
            </MenuItem>
         </Menu>
      </>
   )
}

export default AvatarComponent
