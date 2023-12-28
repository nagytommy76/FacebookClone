import { SetStateAction } from 'react'
import Link from 'next/link'
import type { NotificationType } from '../Types'

import { StyledImage, StyledMenuItem, StyledIsActive, StyledTextArea } from './Style'
import Menu from '@mui/material/Menu'
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
      <Menu
         anchorEl={anchorEl}
         id='notifications-menu'
         open={open}
         onClose={handleClose}
         onClick={handleClose}
         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
         {notifications.map((notification) => (
            <Link key={notification._id} href={`#${notification.postData.postId}`}>
               <StyledMenuItem key={notification._id} onClick={handleClose} sx={{ maxWidth: '400px' }}>
                  <StyledImage
                     src={notification.userDetails.profilePicture}
                     alt='Profile IMG'
                     height={65}
                     width={65}
                  />
                  <StyledTextArea>
                     <Typography variant='h6' gutterBottom>
                        {notification.userDetails.firstName} {notification.userDetails.sureName}
                     </Typography>
                     <Typography variant='caption' gutterBottom>
                        Likeolta a bejegyzésedet:
                     </Typography>
                     <Typography variant='caption' noWrap sx={{ width: '280px' }}>
                        {notification.postData.description}
                     </Typography>
                  </StyledTextArea>
                  <StyledIsActive isRead={notification.isRead} />
               </StyledMenuItem>
            </Link>
         ))}
      </Menu>
   )
}

export default NotificationsMenu
