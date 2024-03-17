import React, { SetStateAction } from 'react'

import Menu from '@mui/material/Menu'
import Fade from '@mui/material/Fade'

const BaseMenu: React.FC<{
   anchorEl: HTMLElement | null
   setAnchorEl: (value: SetStateAction<HTMLElement | null>) => void
   children: React.ReactNode
}> = ({ anchorEl, setAnchorEl, children }) => {
   const open = Boolean(anchorEl)
   const handleClose = () => {
      setAnchorEl(null)
   }

   return (
      <Menu
         anchorEl={anchorEl}
         id='notifications-menu'
         open={open}
         onClose={handleClose}
         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         TransitionComponent={Fade}
      >
         {children}
      </Menu>
   )
}

export default BaseMenu
