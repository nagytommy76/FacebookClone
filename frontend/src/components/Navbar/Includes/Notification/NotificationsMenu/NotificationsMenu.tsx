import { SetStateAction } from 'react'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const NotificationsMenu: React.FC<{
   notifications: any[]
   anchorEl: HTMLElement | null
   setAnchorEl: (value: SetStateAction<HTMLElement | null>) => void
   handleClick: (event: React.MouseEvent<HTMLElement>) => void
}> = ({ notifications, anchorEl, setAnchorEl, handleClick }) => {
   const open = Boolean(anchorEl)
   const handleClose = () => {
      setAnchorEl(null)
   }
   return (
      <>
         {notifications.length > 0 && (
            <Menu
               anchorEl={anchorEl}
               id='notifications-menu'
               open={open}
               onClose={handleClose}
               onClick={handleClose}
               transformOrigin={{ horizontal: 'right', vertical: 'top' }}
               anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
               {notifications.map((notification, index) => (
                  <MenuItem key={index} onClick={handleClose}>
                     {notification.postData.description}
                  </MenuItem>
               ))}
            </Menu>
         )}
      </>
   )
}

export default NotificationsMenu
