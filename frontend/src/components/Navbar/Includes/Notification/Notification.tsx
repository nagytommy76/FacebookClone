import { useState, useContext } from 'react'
import { NotificationsContext } from './Context/NotificationContextProvider'

import useConnectSocket from './Hooks/useConnectSocket'

import IconButton from '@mui/material/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'

import NotificationsMenu from './NotificationsMenu/NotificationsMenu'

const Notification = () => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const {
      notificationsReducer: { activeNotifications },
   } = useContext(NotificationsContext)
   useConnectSocket()

   return (
      <>
         <Tooltip title='Értesítések' placement='bottom'>
            <IconButton
               onClick={(event) => setAnchorEl(event.currentTarget)}
               aria-label='notification'
               size='large'
            >
               <Badge badgeContent={activeNotifications} color='error'>
                  <NotificationsIcon fontSize='inherit' />
               </Badge>
            </IconButton>
         </Tooltip>
         <NotificationsMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </>
   )
}

export default Notification
