import { SetStateAction } from 'react'
import Link from 'next/link'
import type { NotificationType } from '../Types'

import { StyledImage } from './Style'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

const NotificationsMenu: React.FC<{
   notifications: NotificationType[]
   anchorEl: HTMLElement | null
   setAnchorEl: (value: SetStateAction<HTMLElement | null>) => void
}> = ({ notifications, anchorEl, setAnchorEl }) => {
   const open = Boolean(anchorEl)

   const handleClose = () => {
      setAnchorEl(null)
   }

   return (
      <>
         {notifications && notifications.length > 0 && (
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
                  <Link key={index} href={`#${notification.postData._id}`}>
                     <MenuItem key={index} onClick={handleClose} sx={{ maxWidth: '400px' }}>
                        <StyledImage
                           src={notification.userId.userDetails?.profilePicturePath[0].path}
                           alt='Profile IMG'
                           height={65}
                           width={65}
                        />
                        <Typography variant='caption'>
                           <Typography variant='h6' gutterBottom>
                              {notification.userId.firstName} {notification.userId.sureName}
                           </Typography>{' '}
                           Likeolta a bejegyzésedet:
                           <Typography noWrap sx={{ width: '300px' }}>
                              {notification.postData.description}
                           </Typography>
                        </Typography>
                     </MenuItem>
                  </Link>
               ))}
            </Menu>
         )}
      </>
   )
}

export default NotificationsMenu
