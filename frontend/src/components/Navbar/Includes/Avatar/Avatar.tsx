import React, { useState } from 'react'

import ThemeSwitch from '../ThemeSwitch'
import AvatarIcon from './Includes/AvatarComponent'
import ProfileMenuLink from './Includes/ProfileMenuLink'
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
                  minHeight: 170,
                  filter: 'drop-shadow(0px 2px 6px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                     width: 45,
                     height: 45,
                     ml: -0.5,
                     mr: 1,
                  },
               },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            <ProfileMenuLink handleClose={handleClose} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Logout handleClose={handleClose} />
            <MenuItem disableRipple={true} disableTouchRipple={true}>
               <ThemeSwitch /> Téma
            </MenuItem>
         </Menu>
      </>
   )
}

export default AvatarComponent
